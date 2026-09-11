import { useState, useEffect } from 'react';
import { useLocations } from '../hooks/usePredict';

// ---------------------------------------------------------------------------
// Valid BHK values that exist in the training dataset.
// These must stay in sync with _VALID_BHK in backend/main.py.
// Configured dropdown options: BHK up to 5, Bathrooms up to 4, Balconies up to 3
const VALID_BHK = [1, 2, 3, 4, 5];
const BATH_OPTIONS = [1, 2, 3, 4];
const BALCONY_OPTIONS = [0, 1, 2, 3];

// ---------------------------------------------------------------------------
// Cross-field validation rules — mirrors backend rules exactly
// ---------------------------------------------------------------------------
const MIN_SQFT_PER_BHK = {
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
};

const MAX_BATH_PER_BHK = {
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
};

const INITIAL = {
  location: '',
  total_sqft: '',
  bhk: '',
  bath: '',
  balcony: '',
};

function validate(form) {
  const { location, total_sqft, bhk, bath, balcony } = form;

  if (!location) return 'Property location selection is required.';

  const sqft = Number(total_sqft);
  if (!total_sqft || !Number.isFinite(sqft) || sqft <= 0)
    return 'Valid total built-up area (sq.ft) is required.';
  if (sqft > 50000)
    return 'Area cannot exceed 50,000 sq.ft.';

  if (bhk === '') return 'Bedroom (BHK) configuration is required.';
  const bhkNum = Number(bhk);
  if (!VALID_BHK.includes(bhkNum))
    return `BHK ${bhkNum} is not available in the training data. Valid options: ${VALID_BHK.join(', ')}.`;

  const minSqft = MIN_SQFT_PER_BHK[bhkNum];
  if (sqft < minSqft)
    return `For ${bhkNum} BHK, minimum area should be ${minSqft} sq.ft. (provided: ${sqft} sq.ft.)`;

  if (bath === '') return 'Bathroom count selection is required.';
  const bathNum = Number(bath);
  if (bathNum > 20) return 'Maximum 20 bathrooms are allowed.';

  const maxBath = MAX_BATH_PER_BHK[bhkNum];
  if (bathNum > maxBath)
    return `For ${bhkNum} BHK, maximum bathrooms allowed are ${maxBath} (provided: ${bathNum}).`;

  if (balcony === '') return 'Balcony count selection is required.';
  const balconyNum = Number(balcony);
  if (balconyNum > 3) return 'Maximum 3 balconies are allowed.';

  return '';
}

export default function PredictionForm({ onPredict, loading }) {
  const { locations, loading: locsLoading, error: locsError, load } = useLocations();
  const [form, setForm] = useState(INITIAL);
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    load();
  }, [load]);

  const handle = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(form);
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
    <div className="re-card form-card-re" id="predict">
      <div className="section-card-header">
        <div className="section-icon-badge">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
          </svg>
        </div>
        <div className="section-title-wrap">
          <h2>Enter Property Details</h2>
          <p>Fill in the basic details to get an estimated price.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-layout">
        {/* Location Dropdown */}
        <div className="input-field-group full-width">
          <label className="input-label-clean" htmlFor="location">
            <span>Location</span>
            {locsLoading && <span className="input-label-hint">Loading areas...</span>}
          </label>
          <div className="control-wrap">
            <select
              id="location"
              className="re-select"
              value={form.location}
              onChange={handle('location')}
              disabled={locsLoading}
            >
              <option value="">
                {locsLoading
                  ? 'Loading areas...'
                  : locsError
                    ? 'Areas unavailable (backend offline)'
                    : 'Select location...'}
              </option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          {locsError && (
            <div className="alert-box-clean" style={{ marginTop: '4px', padding: '6px 10px', fontSize: '12px' }}>
              Backend server is offline (127.0.0.1:8000). Ensure the API is running.
            </div>
          )}
        </div>

        {/* Row 1: Total Area + Bedrooms */}
        <div className="input-row-split">
          <div className="input-field-group">
            <label className="input-label-clean" htmlFor="total_sqft">
              <span>Total Area (sq ft)</span>
            </label>
            <div className="control-wrap">
              <input
                id="total_sqft"
                type="number"
                className="re-input tnum"
                placeholder="e.g. 1450"
                value={form.total_sqft}
                onChange={handle('total_sqft')}
                min="1"
                max="50000"
              />
            </div>
          </div>

          <div className="input-field-group">
            <label className="input-label-clean" htmlFor="bhk">
              <span>Number of Bedrooms</span>
            </label>
            <div className="control-wrap">
              <select id="bhk" className="re-select" value={form.bhk} onChange={handle('bhk')}>
                <option value="">Select Bedrooms</option>
                {VALID_BHK.map((n) => (
                  <option key={n} value={n}>
                    {n} BHK
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Bathrooms + Balconies */}
        <div className="input-row-split">
          <div className="input-field-group">
            <label className="input-label-clean" htmlFor="bath">
              <span>Number of Bathrooms</span>
            </label>
            <div className="control-wrap">
              <select id="bath" className="re-select" value={form.bath} onChange={handle('bath')}>
                <option value="">Select Bathrooms</option>
                {BATH_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Bathroom' : 'Bathrooms'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-field-group">
            <label className="input-label-clean" htmlFor="balcony">
              <span>Balconies</span>
            </label>
            <div className="control-wrap">
              <select id="balcony" className="re-select" value={form.balcony} onChange={handle('balcony')}>
                <option value="">Select Balconies</option>
                {BALCONY_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Balcony' : 'Balconies'}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>


        {/* Validation Error Message */}
        {validationError && (
          <div className="alert-box-clean">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn-primary-estimate" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner-blue" />
              <span>Estimating Price...</span>
            </>
          ) : (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
              <span>Get Price Estimate</span>
            </>
          )}
        </button>

        {loading && (
          <div className="loading-state-row">
            <span>Calculating valuation based on location and neighbourhood amenities...</span>
          </div>
        )}
      </form>
    </div>
  );
}
