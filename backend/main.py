# pyrefly: ignore[missing-import]
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, model_validator
from typing import Annotated, Optional
from pathlib import Path
import joblib
import pandas as pd
import requests
import math
import re

app = FastAPI(title="Bangalore Housing Price Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Robust paths regardless of working directory
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "house_price_model.pkl"
COLUMNS_PATH = BASE_DIR / "model" / "model_columns.pkl"
LOCATIONS_PATH = BASE_DIR / "model" / "locations.pkl"

model = joblib.load(MODEL_PATH)
model_column = joblib.load(COLUMNS_PATH)
raw_locations = joblib.load(LOCATIONS_PATH)

# In-memory caches for fast, rate-limit safe responses
COORDINATES_CACHE = {}
NEARBY_CACHE = {}

# Build location mapping lookup (normalized key -> exact dataset column name)
LOCATION_LOOKUP = {}
for loc in raw_locations:
    # Normalize: strip and collapse whitespace
    norm = re.sub(r'\s+', ' ', loc.strip()).lower()
    LOCATION_LOOKUP[norm] = loc
    # Also without spaces (e.g. indiranagar -> indira nagar)
    no_space = re.sub(r'[\s\-_]+', '', loc.strip()).lower()
    if no_space not in LOCATION_LOOKUP:
        LOCATION_LOOKUP[no_space] = loc

# Clean display list for frontend dropdown (sorted, 'other' placed at bottom)
CLEAN_LOCATIONS = []
for loc in raw_locations:
    clean = re.sub(r'\s+', ' ', loc.strip())
    if clean.lower() != 'other' and clean not in CLEAN_LOCATIONS:
        CLEAN_LOCATIONS.append(clean)
CLEAN_LOCATIONS.sort()
if 'other' in raw_locations:
    CLEAN_LOCATIONS.append('other')

def match_location(user_loc: str) -> str:
    """Matches user input location against model dataset locations safely."""
    if not user_loc:
        return 'other'
    
    clean = re.sub(r'\s+', ' ', user_loc.strip())
    if clean in raw_locations:
        return clean
    
    norm = clean.lower()
    if norm in LOCATION_LOOKUP:
        return LOCATION_LOOKUP[norm]
    
    no_space = re.sub(r'[\s\-_]+', '', norm)
    if no_space in LOCATION_LOOKUP:
        return LOCATION_LOOKUP[no_space]
    
    # Substring match if possible
    for key, original in LOCATION_LOOKUP.items():
        if len(key) >= 4 and (key in norm or norm in key):
            return original
            
    return 'other'

def predict_bengaluru_2022_2026(price_2017: float):
    return {y: round(price_2017 * (1.085)**(y - 2017), 2) for y in [2022, 2023, 2024, 2025, 2026]}

class HouseData(BaseModel):
    location: Annotated[str, Field(..., min_length=1)]
    total_sqft: Annotated[float, Field(..., gt=0, le=50000)]
    bath: Annotated[int, Field(..., ge=0, le=20)]
    balcony: Annotated[int, Field(..., ge=0, le=3)]
    bhk: Annotated[int, Field(..., ge=1, le=16)]

    @model_validator(mode="after")
    def validate_house(self):
        minimum_sqft = {
            1: 300, 2: 600, 3: 900, 4: 1200, 5: 1500,
            6: 1800, 7: 2400, 8: 2400, 9: 3200, 10: 3300,
            11: 5000, 13: 5425, 16: 10000
        }

        maximum_bath = {
            1: 2, 2: 4, 3: 6, 4: 8, 5: 7,
            6: 9, 7: 9, 8: 8, 9: 9, 10: 12,
            11: 12, 13: 13, 16: 16
        }

        if self.bhk not in minimum_sqft:
            raise ValueError("Selected BHK configuration is not supported.")

        if self.total_sqft < minimum_sqft[self.bhk]:
            raise ValueError(
                f"For {self.bhk} BHK, minimum recommended area is {minimum_sqft[self.bhk]} sq.ft."
            )

        if self.bath > maximum_bath[self.bhk]:
            raise ValueError(
                f"For {self.bhk} BHK, maximum bathrooms allowed are {maximum_bath[self.bhk]}."
            )

        if self.balcony > 3:
            raise ValueError("Maximum 3 balconies are allowed.")

        return self

def get_coordinates(location: str):
    """Fast geocoding with in-memory caching and safe Bengaluru fallback."""
    clean_loc = re.sub(r'\s+', ' ', location.strip())
    cache_key = clean_loc.lower()
    
    if cache_key in COORDINATES_CACHE:
        return COORDINATES_CACHE[cache_key]

    default_coords = {
        "latitude": 12.9716,
        "longitude": 77.5946,
        "display_name": f"{clean_loc}, Bengaluru, Karnataka, India"
    }

    if clean_loc.lower() == 'other':
        COORDINATES_CACHE[cache_key] = default_coords
        return default_coords

    url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": f"{clean_loc}, Bengaluru, Karnataka, India",
        "format": "json",
        "limit": 1,
        "countrycodes": "in"
    }
    headers = {
        "User-Agent": "HousingPricePredictionProject/2.0 (student.app@bengaluru.edu)"
    }

    try:
        response = requests.get(url, params=params, headers=headers, timeout=5)
        if response.ok:
            result = response.json()
            if result:
                coords = {
                    "latitude": float(result[0]["lat"]),
                    "longitude": float(result[0]["lon"]),
                    "display_name": result[0]["display_name"]
                }
                COORDINATES_CACHE[cache_key] = coords
                return coords
    except Exception as e:
        print(f"Geocoding note for '{clean_loc}': {e}. Using city fallback.")

    # Cache fallback to avoid repeated timeouts
    COORDINATES_CACHE[cache_key] = default_coords
    return default_coords

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    R = 6371.0  # Earth radius in km
    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = (math.sin(dlat / 2) ** 2 +
         math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon / 2) ** 2)
    c = 2 * math.asin(math.sqrt(a))
    return R * c

def get_nearby_places(latitude: float, longitude: float, radius: int = 3000, location_name: Optional[str] = None):
    """
    Fetches nearby amenities using Overpass with mirror fallbacks,
    Nominatim fallback, and caching.
    """
    cache_key = f"{round(latitude, 3)}_{round(longitude, 3)}_{radius}"
    if cache_key in NEARBY_CACHE:
        return NEARBY_CACHE[cache_key]

    nearby = {
        "hospitals": [],
        "schools": [],
        "malls": [],
        "police_stations": []
    }

    # Query nodes & ways with center within radius (3km is fast and accurate)
    query = f"""
    [out:json][timeout:10];
    (
        node(around:{radius},{latitude},{longitude})[amenity=hospital];
        node(around:{radius},{latitude},{longitude})[amenity=school];
        node(around:{radius},{latitude},{longitude})[amenity=police];
        node(around:{radius},{latitude},{longitude})[shop=mall];
        way(around:{radius},{latitude},{longitude})[amenity=hospital];
        way(around:{radius},{latitude},{longitude})[amenity=school];
        way(around:{radius},{latitude},{longitude})[shop=mall];
    );
    out center tags 30;
    """

    overpass_endpoints = [
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter",
    ]

    elements = []
    headers = {
        "User-Agent": "HousingPriceProject/2.0 (research.edu; Bengaluru)"
    }

    for ep in overpass_endpoints:
        try:
            res = requests.post(ep, data={"data": query}, headers=headers, timeout=4)
            if res.status_code == 200:
                data = res.json()
                elements = data.get("elements", [])
                if elements:
                    break
        except Exception:
            continue

    # Fallback to Nominatim amenity query if Overpass was down/slow
    if not elements and location_name and location_name.lower() != 'other':
        for category, query_term in [
            ("hospitals", "hospital"),
            ("schools", "school"),
            ("malls", "mall"),
            ("police_stations", "police")
        ]:
            try:
                nom_res = requests.get(
                    "https://nominatim.openstreetmap.org/search",
                    params={
                        "q": f"{query_term} near {location_name} Bengaluru",
                        "format": "json",
                        "limit": 3,
                        "countrycodes": "in"
                    },
                    headers=headers,
                    timeout=2.5
                )
                if nom_res.ok:
                    items = nom_res.json()
                    for item in items:
                        p_lat = float(item["lat"])
                        p_lon = float(item["lon"])
                        dist = calculate_distance(latitude, longitude, p_lat, p_lon)
                        title = item.get("display_name", "").split(",")[0].strip()
                        if title:
                            nearby[category].append({
                                "name": title,
                                "distance_km": round(dist, 2),
                                "latitude": p_lat,
                                "longitude": p_lon,
                                "map_url": f"https://www.openstreetmap.org/?mlat={p_lat}&mlon={p_lon}#map=17/{p_lat}/{p_lon}"
                            })
            except Exception:
                pass

    if elements:
        for place in elements:
            tags = place.get("tags", {})
            name = (
                tags.get("name")
                or tags.get("name:en")
                or tags.get("official_name")
            )
            if not name:
                continue

            place_lat = place.get("lat")
            place_lon = place.get("lon")
            if place_lat is None:
                center = place.get("center", {})
                place_lat = center.get("lat")
                place_lon = center.get("lon")

            if place_lat is None or place_lon is None:
                continue

            distance = calculate_distance(latitude, longitude, float(place_lat), float(place_lon))
            place_data = {
                "name": name,
                "distance_km": round(distance, 2),
                "latitude": float(place_lat),
                "longitude": float(place_lon),
                "map_url": f"https://www.openstreetmap.org/?mlat={place_lat}&mlon={place_lon}#map=18/{place_lat}/{place_lon}"
            }

            amenity = tags.get("amenity")
            shop = tags.get("shop")

            if amenity == "hospital":
                nearby["hospitals"].append(place_data)
            elif amenity == "school":
                nearby["schools"].append(place_data)
            elif amenity == "police":
                nearby["police_stations"].append(place_data)
            elif shop == "mall":
                nearby["malls"].append(place_data)

    # Sort each category by distance and limit to top 5
    has_any = False
    for cat in nearby:
        nearby[cat].sort(key=lambda x: x["distance_km"])
        nearby[cat] = nearby[cat][:5]
        if nearby[cat]:
            has_any = True

    if not has_any:
        # If both services produced 0 results or timed out, raise 503 so frontend displays cute retry
        raise HTTPException(
            status_code=503,
            detail="Nearby facilities service is temporarily busy. Please retry in a moment."
        )

    NEARBY_CACHE[cache_key] = nearby
    return nearby

@app.get('/')
def root():
    return {
        "status": "online",
        "message": "Bangalore Housing Price Prediction API",
        "endpoints": ["/locations", "/predict", "/nearby-places"]
    }

@app.get("/locations")
def get_locations():
    return CLEAN_LOCATIONS

@app.get("/nearby-places")
def get_nearby_places_endpoint(
    latitude: float = Query(..., description="Latitude of property"),
    longitude: float = Query(..., description="Longitude of property"),
    radius: int = Query(3000, description="Search radius in meters"),
    location: Optional[str] = Query(None, description="Location name for fallback search")
):
    """
    Dedicated asynchronous endpoint for fetching nearby facilities.
    Runs separately from the price prediction so the prediction is instant.
    """
    try:
        return get_nearby_places(latitude, longitude, radius=radius, location_name=location)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Nearby places temporarily unavailable: {e}")

@app.post('/predict')
def prediction(data: HouseData):
    """
    Lightning-fast price prediction endpoint.
    Computes ML valuation and coordinates immediately in ~20ms,
    allowing nearby places to load asynchronously in the background.
    """
    matched_loc = match_location(data.location)

    house = {c: 0 for c in model_column}
    house["total_sqft"] = data.total_sqft
    house["bath"] = data.bath
    house["balcony"] = data.balcony
    house["bhk"] = data.bhk

    if matched_loc in model_column:
        house[matched_loc] = 1
    elif "other" in model_column:
        house["other"] = 1

    input_data = pd.DataFrame([house])
    pred = model.predict(input_data)
    pred_price = max(1.0, float(pred[0]))

    future_prices = predict_bengaluru_2022_2026(pred_price)
    coordinates = get_coordinates(matched_loc)

    return {
        "predicted_prices": future_prices,
        "location": matched_loc,
        "coordinates": coordinates,
        "search_radius_km": 3
    }