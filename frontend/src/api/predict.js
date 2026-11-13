const API_URL = 'http://127.0.0.1:8000';

export async function fetchLocations() {
  const res = await fetch(`${API_URL}/locations`);
  if (!res.ok) throw new Error('Failed to load Bangalore locations from server');
  return res.json();
}

export async function predictHouse(payload) {
  const res = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    let msg = 'Prediction failed';
    if (typeof data.detail === 'string') {
      msg = data.detail;
    } else if (Array.isArray(data.detail) && data.detail[0]?.msg) {
      msg = data.detail[0].msg;
    }
    throw new Error(msg);
  }
  return data;
}

export async function fetchNearbyPlaces({ latitude, longitude, location, radius = 5000 }) {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    radius: radius.toString(),
  });
  if (location) params.append('location', location);

  const res = await fetch(`${API_URL}/nearby-places?${params.toString()}`);
  const data = await res.json();
  if (!res.ok) {
    const errorMsg = data.detail || 'Nearby places service is busy right now';
    throw new Error(errorMsg);
  }
  return data;
}
