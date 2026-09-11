function formatPrice(price) {
  if (!price && price !== 0) return '₹ --.--';
  if (price >= 100) {
    return `₹${(price / 100).toFixed(2)} Crore`;
  }
  return `₹${Number(price).toFixed(2)} Lakh`;
}

export default function EstimatedPriceCard({ result, loading }) {
  if (!result) {
    return (
      <div className="re-card estimate-result-card">
        <div>
          <span className="estimate-top-badge">Estimated Property Price</span>
          <div className="estimate-placeholder">
            <div className="placeholder-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
              </svg>
            </div>
            <h3 className="placeholder-title">Ready for Valuation</h3>
            <p className="placeholder-desc">
              Select your location and property details on the left, then click <strong>Get Price Estimate</strong> to see valuation and neighbourhood analytics.
            </p>
          </div>
        </div>

        <div className="estimate-address-card">
          <div className="address-header-row">
            <div className="address-icon-badge">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div className="address-meta">
              <span className="address-label">Neighbourhood Area</span>
              <p className="address-text" style={{ color: 'var(--slate-400)', fontWeight: 400 }}>
                Area details and location will be displayed here after valuation.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { predicted_prices, location, coordinates } = result;
  const currentPrice = predicted_prices?.['2026'] ?? 0;
  const areaAddress = coordinates?.display_name || location;
  // OpenStreetMap search query highlights the entire boundary/polygon of the area instead of a single point marker
  const mapUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(location + ', Bengaluru, Karnataka')}`;

  return (
    <div className="re-card estimate-result-card">
      <div>
        <span className="estimate-top-badge">Estimated Property Price</span>

        <div className="estimate-price-main tnum">
          {loading ? 'Calculating...' : formatPrice(currentPrice)}
        </div>

        <div className="estimate-location-block">
          <div className="estimate-location-row">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>{location}</span>
          </div>
          <span className="estimate-location-note">Based on similar properties in this area</span>
        </div>
      </div>

      {/* Area details block */}
      <div className="estimate-address-card">
        <div className="address-header-row">
          <div className="address-icon-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </div>
          <div className="address-meta">
            <span className="address-label">Neighbourhood Area</span>
            <p className="address-text">{areaAddress}</p>
          </div>
        </div>

        {coordinates && (
          <div className="address-coords-strip">
            <span className="coords-pill tnum">Area Center: {Number(coordinates.latitude).toFixed(3)}, {Number(coordinates.longitude).toFixed(3)}</span>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="address-map-link"
            >
              Explore Area on Map ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
