from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, model_validator
from typing import Annotated
import joblib
import pandas as pd
import sklearn
import requests
import math

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ML model, feature columns, and location list
model = joblib.load("model/house_price_model.pkl")
model_column = joblib.load("model/model_columns.pkl")
locations = joblib.load("model/locations.pkl")


def predict_bengaluru_2022_2026(price_2017):
    return {y: round(price_2017 * (1.085) ** (y - 2017), 2) for y in [2022, 2023, 2024, 2025, 2026]}


@app.get("/")
def hello():
    return "Welcome to my API"


@app.get("/locations")
def get_locations():
    return locations


# ---------------------------------------------------------------------------
# Validation dictionaries — derived from the trained dataset's BHK distribution
# ---------------------------------------------------------------------------
# Minimum livable area (sq.ft) per BHK configuration
_MIN_SQFT_PER_BHK = {
    1: 300,
    2: 600,
    3: 900,
    4: 1200,
    5: 1500,
    6: 1800,
    7: 2400,
    8: 2400,
    9: 3200,
    10: 3300,
    11: 5000,
    13: 5425,
    16: 10000,
}

# Maximum reasonable bathroom count per BHK configuration
_MAX_BATH_PER_BHK = {
    1: 2,
    2: 4,
    3: 6,
    4: 8,
    5: 7,
    6: 9,
    7: 9,
    8: 8,
    9: 9,
    10: 12,
    11: 12,
    13: 13,
    16: 16,
}

# BHK values that actually exist in the training data
_VALID_BHK = set(_MIN_SQFT_PER_BHK.keys())


class HouseData(BaseModel):
    location: Annotated[str, Field(..., min_length=1)]

    # Area must be positive and within a realistic upper bound for Bengaluru listings
    total_sqft: Annotated[float, Field(..., gt=0, le=50000)]

    # Bathrooms: 0 is valid (studio), cap at 20 as an absolute maximum
    bath: Annotated[int, Field(..., ge=0, le=20)]

    # Balconies: 0–3 are the only values present in the dataset
    balcony: Annotated[int, Field(..., ge=0, le=3)]

    # BHK: must be at least 1; 16 is the highest value in the training data
    bhk: Annotated[int, Field(..., ge=1, le=16)]

    @model_validator(mode="after")
    def validate_house(self):
        # Reject BHK values that were never seen during model training
        if self.bhk not in _VALID_BHK:
            raise ValueError(
                f"BHK {self.bhk} is not available in the training data. "
                f"Valid options: {sorted(_VALID_BHK)}"
            )

        # BHK ↔ area consistency
        min_sqft = _MIN_SQFT_PER_BHK[self.bhk]
        if self.total_sqft < min_sqft:
            raise ValueError(
                f"For {self.bhk} BHK, minimum area should be {min_sqft} sq.ft. "
                f"(provided: {self.total_sqft} sq.ft.)"
            )

        # BHK ↔ bathroom consistency
        max_bath = _MAX_BATH_PER_BHK[self.bhk]
        if self.bath > max_bath:
            raise ValueError(
                f"For {self.bhk} BHK, maximum bathrooms allowed are {max_bath} "
                f"(provided: {self.bath})."
            )

        return self


# ---------------------------------------------------------------------------
# Geocoding — 3-step Bengaluru-specific fallback chain (root implementation)
# Raises HTTPException(503) when the service is unreachable.
# Raises HTTPException(404) when no coordinates can be found after all fallbacks.
# ---------------------------------------------------------------------------
def get_coordinates(location: str):
    clean_loc = location.strip()
    url = "https://nominatim.openstreetmap.org/search"
    headers = {"User-Agent": "HousingPricePredictionProject/1.0"}

    # Handle generic 'other' category by querying Bengaluru center directly
    if clean_loc.lower() == "other":
        search_queries = ["Bengaluru, Karnataka"]
    else:
        search_queries = [
            f"{clean_loc}, Bengaluru, Karnataka",  # primary
            f"{clean_loc}, Bangalore",              # fallback 1
            "Bengaluru, Karnataka",                 # fallback 2 — city centre
        ]

    result = None

    try:
        for query in search_queries:
            resp = requests.get(
                url,
                params={"q": query, "format": "json", "limit": 1, "countrycodes": "in"},
                headers=headers,
                timeout=15,
            )
            resp.raise_for_status()
            data = resp.json()
            if data:
                result = data
                break

    except requests.RequestException:
        # The geocoding service itself is unreachable (network error, timeout, etc.)
        raise HTTPException(
            status_code=503,
            detail="Location service is currently unavailable. Please try again later.",
        )

    if not result:
        # Service responded but could not find coordinates for this location
        raise HTTPException(
            status_code=404,
            detail=f"Coordinates not found for location '{clean_loc}'. "
                   "The location may not be indexed by the geocoding service.",
        )

    return {
        "latitude": float(result[0]["lat"]),
        "longitude": float(result[0]["lon"]),
        "display_name": result[0]["display_name"],
    }


# ---------------------------------------------------------------------------
# Haversine distance helper
# ---------------------------------------------------------------------------
def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371
    lat1 = math.radians(lat1)
    lat2 = math.radians(lat2)
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.asin(math.sqrt(a))
    return R * c


# ---------------------------------------------------------------------------
# Nearby places via Overpass API
# Raises HTTPException(503) when the Overpass service is unreachable.
# ---------------------------------------------------------------------------
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
            headers={"User-Agent": "HousingPricePredictionProject/1.0"},
            timeout=40,
        )
        response.raise_for_status()
        data = response.json()

    except requests.RequestException:
        raise HTTPException(
            status_code=503,
            detail="Nearby places service is currently unavailable. "
                   "Price prediction is still valid; please try again later for amenity data.",
        )

    nearby = {
        "hospitals": [],
        "schools": [],
        "malls": [],
        "police_stations": [],
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
            latitude, longitude, float(place_lat), float(place_lon)
        )

        place_data = {
            "name": name,
            "distance_km": round(distance, 2),
            "latitude": float(place_lat),
            "longitude": float(place_lon),
            "map_url": (
                f"https://www.openstreetmap.org/?mlat={place_lat}"
                f"&mlon={place_lon}#map=18/{place_lat}/{place_lon}"
            ),
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
        nearby[category] = [p for p in nearby[category] if p["name"]]
        nearby[category].sort(key=lambda x: x["distance_km"])
        nearby[category] = nearby[category][:5]

    return nearby


# ---------------------------------------------------------------------------
# Prediction endpoint
# ---------------------------------------------------------------------------
@app.post("/predict")
def prediction(data: HouseData):
    house = {}
    for c in model_column:
        house[c] = 0

    house["total_sqft"] = data.total_sqft
    house["bath"] = data.bath
    house["balcony"] = data.balcony
    house["bhk"] = data.bhk

    selected_location = data.location

    if selected_location not in locations:
        raise HTTPException(status_code=400, detail="Invalid location selected.")

    if selected_location in model_column:
        house[selected_location] = 1

    input_data = pd.DataFrame([house])
    pred = model.predict(input_data)
    pred_price = pred[0]

    future_prices = predict_bengaluru_2022_2026(pred_price)

    # get_coordinates raises 503/404 on failure — exceptions propagate automatically
    coordinates = get_coordinates(selected_location)

    # get_nearby_places raises 503 on failure — exceptions propagate automatically
    nearby = get_nearby_places(coordinates["latitude"], coordinates["longitude"])

    return {
        "predicted_prices": future_prices,
        "location": selected_location,
        "coordinates": coordinates,
        "nearby": nearby,
        "search_radius_km": 10,
    }