from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel,Field
from typing import Annotated
import joblib
import pandas as pd
import sklearn
import requests
import math

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model, feature columns, and location list
model = joblib.load("model/house_price_model.pkl")
model_column = joblib.load("model/model_columns.pkl")
locations = joblib.load("model/locations.pkl")

def predict_bengaluru_2022_2026(price_2017):
    return {y: round(price_2017 * (1.085)**(y-2017), 2) for y in [2022,2023,2024,2025,2026]}

@app.get('/')
def hello():
    return "Welcome to my API"

@app.get("/locations")
def get_locations():
    return locations


class HouseData(BaseModel):
    location: Annotated[str,Field(...)]
    total_sqft: Annotated[float,Field(...,gt=0)]
    bath: Annotated[int, Field(...,ge=0)]
    balcony: Annotated[int,Field(...,ge=0)]
    bhk: Annotated[int,Field(...,ge=0)]


def get_coordinates(location):
    clean_loc = location.strip()
    
    # Handle generic 'other' category by querying Bengaluru center
    if clean_loc.lower() == 'other':
        search_query = "Bengaluru, Karnataka"
    else:
        search_query = f"{clean_loc}, Bengaluru, Karnataka"

    url = "https://nominatim.openstreetmap.org/search"
    headers = {
        "User-Agent": "HousingPricePredictionProject/1.0"
    }

    try:
        response = requests.get(
            url,
            params={
                "q": search_query,
                "format": "json",
                "limit": 1,
                "countrycodes": "in"
            },
            headers=headers,
            timeout=15
        )
        response.raise_for_status()
        result = response.json()

        # Fallback if specific phrase returned empty
        if not result and clean_loc.lower() != 'other':
            fallback_res = requests.get(
                url,
                params={
                    "q": f"{clean_loc}, Bangalore",
                    "format": "json",
                    "limit": 1,
                    "countrycodes": "in"
                },
                headers=headers,
                timeout=15
            )
            if fallback_res.ok:
                result = fallback_res.json()

        # Final fallback to Bengaluru center if still not found
        if not result:
            city_res = requests.get(
                url,
                params={
                    "q": "Bengaluru, Karnataka",
                    "format": "json",
                    "limit": 1,
                    "countrycodes": "in"
                },
                headers=headers,
                timeout=15
            )
            if city_res.ok:
                result = city_res.json()

    except requests.RequestException:
        return None

    if not result:
        return None

    return {
        "latitude": float(result[0]["lat"]),
        "longitude": float(result[0]["lon"]),
        "display_name": result[0]["display_name"]
    }


def calculate_distance(lat1, lon1, lat2, lon2):

    R = 6371

    lat1 = math.radians(lat1)
    lat2 = math.radians(lat2)

    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = (
        math.sin(dlat / 2) ** 2
        +
        math.cos(lat1)
        * math.cos(lat2)
        * math.sin(dlon / 2) ** 2
    )

    c = 2 * math.asin(math.sqrt(a))

    return R * c


def get_nearby_places(latitude, longitude):

    radius = 10000

    query = f"""
    [out:json][timeout:30];

    (
        node(around:{radius},{latitude},{longitude})[amenity=hospital];
        way(around:{radius},{latitude},{longitude})[amenity=hospital];

        node(around:{radius},{latitude},{longitude})[amenity=school];
        way(around:{radius},{latitude},{longitude})[amenity=school];

        node(around:{radius},{latitude},{longitude})[amenity=police];
        way(around:{radius},{latitude},{longitude})[amenity=police];

        node(around:{radius},{latitude},{longitude})[shop=mall];
        way(around:{radius},{latitude},{longitude})[shop=mall];
    );

    out center tags;
    """

    try:

        response = requests.post(
            "https://overpass-api.de/api/interpreter",
            data=query,
            headers={
                "User-Agent": "HousingPricePredictionProject/1.0"
            },
            timeout=40
        )

        response.raise_for_status()

        data = response.json()

    except requests.RequestException:
        return {"hospitals": [], "schools": [], "malls": [], "police_stations": []}

    nearby = {
        "hospitals": [],
        "schools": [],
        "malls": [],
        "police_stations": []
    }

    for place in data.get("elements", []):

        tags = place.get("tags", {})

        name = (
            tags.get("name")
            or tags.get("name:en")
            or tags.get("official_name")
        )

        place_lat = place.get("lat")
        place_lon = place.get("lon")

        if place_lat is None:

            center = place.get("center", {})

            place_lat = center.get("lat")
            place_lon = center.get("lon")

        if place_lat is None or place_lon is None:
            continue

        distance = calculate_distance(
            latitude,
            longitude,
            float(place_lat),
            float(place_lon)
        )

        place_data = {
            "name": name,
            "distance_km": round(distance, 2),
            "latitude": float(place_lat),
            "longitude": float(place_lon),
            "map_url": f"https://www.openstreetmap.org/?mlat={place_lat}&mlon={place_lon}#map=18/{place_lat}/{place_lon}"
        }

        if tags.get("amenity") == "hospital":

            nearby["hospitals"].append(place_data)

        elif tags.get("amenity") == "school":

            nearby["schools"].append(place_data)

        elif tags.get("amenity") == "police":

            nearby["police_stations"].append(place_data)

        elif tags.get("shop") == "mall":

            nearby["malls"].append(place_data)

    for category in nearby:

        nearby[category] = [
            place
            for place in nearby[category]
            if place["name"]
        ]

        nearby[category].sort(
            key=lambda x: x["distance_km"]
        )

        nearby[category] = nearby[category][:5]

    return nearby


@app.post('/predict')
def prediction(data:HouseData):

    house={}

    for c in model_column:
        house[c]=0

    house["total_sqft"] = data.total_sqft
    house["bath"] = data.bath
    house["balcony"] = data.balcony
    house["bhk"] = data.bhk

    selected_location=data.location

    if selected_location not in locations:
        raise HTTPException(status_code=400, detail="Invalid Location")

    if selected_location in model_column:
        house[selected_location] = 1

    input_data=pd.DataFrame([house])

    pred=model.predict(input_data)
    pred_price=pred[0]

    future_prices = predict_bengaluru_2022_2026(pred_price)

    coordinates = get_coordinates(selected_location)

    if coordinates:
        nearby = get_nearby_places(
            coordinates["latitude"],
            coordinates["longitude"]
        )
    else:
        nearby = {"hospitals": [], "schools": [], "malls": [], "police_stations": []}

    return {
        "predicted_prices": future_prices,

        "location": selected_location,

        "coordinates": coordinates,

        "nearby": nearby,

        "search_radius_km": 10
    }