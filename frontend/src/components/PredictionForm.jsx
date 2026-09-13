import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocations } from '../hooks/usePredict';

const SELECT_OPTIONS = {
  bhk: [1, 2, 3, 4, 5],
  bath: [0, 1, 2, 3, 4],
  balcony: [0, 1, 2, 3, 4],
};

const INITIAL = { location: '', total_sqft: '', bhk: '', bath: '', balcony: '' };

export default function PredictionForm({ onPredict, loading }) {
  const [searchParams] = useSearchParams();
  const locParam = searchParams.get('location') || '';

  const { locations, loading: locsLoading, error: locsError, load } = useLocations();

  const [form, setForm] = useState(() => ({ ...INITIAL, location: locParam }));
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    load();
  }, [load]);

  const handle = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    if (!form.location) return 'Please select a location in Bangalore.';
    if (!form.total_sqft || Number(form.total_sqft) <= 0)
      return 'Please enter a valid total area in sq.ft.';
    if (form.bhk === '') return 'Please select the BHK configuration.';
    if (form.bath === '') return 'Please select the number of bathrooms.';
    if (form.balcony === '') return 'Please select the number of balconies.';
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
          <h2 className="card-header-title">Enter House Details</h2>
          <p className="card-header-subtitle">Provide property details like area, bedrooms, and location to predict the price</p>
        </div>
        <span className="label-md">Input Form</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group full">
            <label className="form-label" htmlFor="location">
              <span>Select Location / Area</span>
              {locsLoading && <span className="form-label-hint">Loading locations...</span>}
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
                    ? 'Loading Bangalore localities...'
                    : locsError
                      ? 'Localities temporarily unavailable'
                      : 'Select a location in Bangalore...'}
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
                Notice: Could not load the localities list. Please ensure the server is running or refresh the page.
              </span>
            )}
          </div>

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

          <div className="form-group">
            <label className="form-label" htmlFor="bhk">
              <span>Bedrooms (BHK)</span>
              <span className="form-label-hint">Layout</span>
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
              <span>Predicting House Price...</span>
            </>
          ) : (
            <span>Predict House Price</span>
          )}
        </button>

        {loading && (
          <div className="loading-indicator">
            <span>Calculating estimated market price and loading nearby facilities...</span>
          </div>
        )}
      </form>
    </div>
  );
}
