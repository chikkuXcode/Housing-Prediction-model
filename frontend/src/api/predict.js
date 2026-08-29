const API_URL = 'http://127.0.0.1:8000';

export async function fetchLocations() {
  const res = await fetch(`${API_URL}/locations`);
  if (!res.ok) throw new Error('Failed to load locations');
  return res.json(); // returns string[]
}

export async function predictHouse(payload) {
  const res = await fetch(`${API_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.detail || 'Prediction failed');
  return data;
}
