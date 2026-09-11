const API_URL = 'http://127.0.0.1:8000';

export async function fetchLocations() {
  let res;
  try {
    res = await fetch(`${API_URL}/locations`);
  } catch {
    throw new Error('Cannot reach the backend server. Make sure FastAPI is running on port 8000.');
  }
  if (!res.ok) {
    throw new Error(`Failed to load locations (HTTP ${res.status}).`);
  }
  return res.json(); // returns string[]
}

/**
 * Extract a human-readable error message from a FastAPI error response.
 *
 * FastAPI validation errors (422) return:
 *   { "detail": [ { "loc": [...], "msg": "...", "type": "..." }, ... ] }
 *
 * Other errors return:
 *   { "detail": "Some string message" }
 */
function extractErrorMessage(status, data) {
  switch (status) {
    case 422: {
      // Pydantic / FastAPI validation error — extract every msg field
      if (Array.isArray(data.detail) && data.detail.length > 0) {
        return data.detail.map((e) => e.msg).join(' | ');
      }
      return 'Validation failed. Please check your inputs.';
    }
    case 404:
      return (
        (typeof data.detail === 'string' ? data.detail : null) ||
        'Location not found. The selected area may not be indexed by the geocoding service.'
      );
    case 503:
      return (
        (typeof data.detail === 'string' ? data.detail : null) ||
        'An external service (geocoding or nearby places) is temporarily unavailable. Please try again later.'
      );
    case 400:
      return (
        (typeof data.detail === 'string' ? data.detail : null) ||
        'Invalid request. Please check your inputs.'
      );
    case 500:
      return 'An unexpected server error occurred. Please try again or contact support.';
    default:
      return (
        (typeof data.detail === 'string' ? data.detail : null) ||
        `Prediction failed (HTTP ${status}).`
      );
  }
}

export async function predictHouse(payload) {
  let res;
  try {
    res = await fetch(`${API_URL}/predict`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Cannot reach the backend server. Make sure FastAPI is running on port 8000.');
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(extractErrorMessage(res.status, data));
  }

  return data;
}
