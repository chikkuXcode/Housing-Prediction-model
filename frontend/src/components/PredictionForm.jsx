import { useState, useEffect } from 'react';
import { useLocations } from '../hooks/usePredict';

const SELECT_OPTIONS = {
  bhk: [1, 2, 3, 4, 5],
  bath: [0, 1, 2, 3, 4],
  balcony: [0, 1, 2, 3, 4],
};

const INITIAL = { location: '', total_sqft: '', bhk: '', bath: '', balcony: '' };

export default function PredictionForm({ onPredict, loading }) {
  const { locations, loading: locsLoading, error: locsError, load } = useLocations();
  const [form, setForm] = useState(INITIAL);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    load();
  }, [load]);

  const handle = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    if (!form.location) return 'Property location selection is required.';
    if (!form.total_sqft || Number(form.total_sqft) <= 0)
      return 'Valid total built-up area (sq.ft) is required.';
    if (form.bhk === '') return 'Bedroom (BHK) configuration is required.';
    if (form.bath === '') return 'Bathroom count selection is required.';
    if (form.balcony === '') return 'Balcony count selection is required.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setValidationError(err);
      return;
    }
    setValidationError('');
    onPredict({
      location: form.location,
      total_sqft: Number(form.total_sqft),
      bath: Number(form.bath),
      balcony: Number(form.balcony),
      bhk: Number(form.bhk),
    });
  };

  return (
    <div className="card-level-1 form-card">
      <div className="card-header-bar">
        <div className="card-header-left">
          <h2 className="card-header-title">Asset Parameters</h2>
          <p className="card-header-subtitle">Specify spatial and structural attributes for regression analysis</p>
        </div>
        <span className="label-md">Model Input</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Location */}
          <div className="form-group full">
            <label className="form-label" htmlFor="location">
              <span>Sub-market / Location</span>
              {locsLoading && <span className="form-label-hint">Loading sub-markets...</span>}
            </label>
            <div className="input-container">
              <select
                id="location"
                className="select-field"
                value={form.location}
                onChange={handle('location')}
                disabled={locsLoading}
              >
                <option value="">
                  {locsLoading
                    ? 'Catalog loading...'
                    : locsError
                      ? 'Catalog unavailable (backend offline)'
                      : 'Select geographic zone...'}
                </option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
            {locsError && (
              <span className="helper-error-text">
                Notice: Could not connect to the backend server (127.0.0.1:8000). Ensure the API is active.
              </span>
            )}
          </div>

          {/* Area */}
          <div className="form-group">
            <label className="form-label" htmlFor="total_sqft">
              <span>Total Area</span>
              <span className="form-label-hint">sq.ft</span>
            </label>
            <div className="input-container">
              <input
                id="total_sqft"
                type="number"
                className="input-field tnum"
                placeholder="e.g. 1450"
                value={form.total_sqft}
                onChange={handle('total_sqft')}
                min="1"
              />
            </div>
          </div>

          {/* BHK */}
          <div className="form-group">
            <label className="form-label" htmlFor="bhk">
              <span>Configuration</span>
              <span className="form-label-hint">Bedrooms</span>
            </label>
            <div className="input-container">
              <select id="bhk" className="select-field" value={form.bhk} onChange={handle('bhk')}>
                <option value="">Select BHK</option>
                {SELECT_OPTIONS.bhk.map((n) => (
                  <option key={n} value={n}>
                    {n} BHK
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bathrooms */}
          <div className="form-group">
            <label className="form-label" htmlFor="bath">
              <span>Bathrooms</span>
              <span className="form-label-hint">Count</span>
            </label>
            <div className="input-container">
              <select id="bath" className="select-field" value={form.bath} onChange={handle('bath')}>
                <option value="">Select Bathrooms</option>
                {SELECT_OPTIONS.bath.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Bath' : 'Baths'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Balcony */}
          <div className="form-group">
            <label className="form-label" htmlFor="balcony">
              <span>Balconies</span>
              <span className="form-label-hint">Count</span>
            </label>
            <div className="input-container">
              <select id="balcony" className="select-field" value={form.balcony} onChange={handle('balcony')}>
                <option value="">Select Balconies</option>
                {SELECT_OPTIONS.balcony.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Balcony' : 'Balconies'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {validationError && (
          <div className="error-banner">
            <span>&bull;</span> {validationError}
          </div>
        )}

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner-clean" />
              <span>Calculating Model Output...</span>
            </>
          ) : (
            <span>Run Valuation Model</span>
          )}
        </button>

        {loading && (
          <div className="loading-indicator">
            <span>Executing regression solver and querying geospatial amenity matrix...</span>
          </div>
        )}
      </form>
    </div>
  );
}
