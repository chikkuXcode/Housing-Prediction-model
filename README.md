# Housing Price Prediction

A machine learning based housing price prediction system for Bengaluru, built with a FastAPI backend and a React frontend. Given a property's location, area, and configuration, it predicts a base price, projects it forward from 2022–2026, and shows nearby amenities (hospitals, schools, malls, police stations) using OpenStreetMap.

## Features

- Housing price prediction (Linear Regression model)
- Location based prediction across 240+ Bengaluru sub-markets
- 2022–2026 price projection (8.5% annual compounding)
- Nearby hospitals, schools, malls, and police stations
- Distance calculation to each amenity
- Map links for property location and nearby places

## Tech Stack

### Backend
- Python
- FastAPI
- Scikit-learn (Linear Regression)
- Pandas

### Frontend
- React 19
- Vite

### External APIs
- OpenStreetMap Nominatim (geocoding)
- OpenStreetMap Overpass (nearby amenities)

## Project Structure

```
├── backend/
│   ├── main.py         FastAPI app
│   ├── requirements.txt
│   └── model/          Trained model & artifacts (.pkl)
├── frontend/           React + Vite web app
├── data/                Source dataset used for model training
├── notebooks/           Exploratory data analysis / model training notebook
```

## Running the Project

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs on `http://127.0.0.1:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173`.

The frontend expects the backend to be running on `http://127.0.0.1:8000`.
