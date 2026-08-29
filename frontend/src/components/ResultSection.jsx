import { useEffect, useRef } from 'react';
import PriceProjection from './PriceProjection';
import FacilityCard from './FacilityCard';
import LocationInfo from './LocationInfo';

function formatPrice(price) {
  if (price >= 100) {
    return `₹${(price / 100).toFixed(2)} Crore`;
  }
  return `₹${price.toFixed(2)} Lakh`;
}

export default function ResultSection({ data }) {
  const sectionRef = useRef(null);
  const { predicted_prices, location, coordinates, nearby } = data;
  const currentPrice = predicted_prices['2026'];

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [data]);

  return (
    <section ref={sectionRef} className="results-container">
      {/* ── Valuation Spotlight Card ── */}
      <div className="valuation-spotlight">
        <div className="spotlight-left">
          <span className="spotlight-tag">2026 Benchmark Valuation</span>
          <div className="spotlight-price tnum">{formatPrice(currentPrice)}</div>
          <div className="spotlight-location">
            <span>&bull;</span>
            <strong>{location}</strong>
            <span style={{ color: 'var(--outline)' }}>&middot; Sub-market Zone</span>
          </div>
        </div>

        <div className="spotlight-right-meta">
          <div className="meta-pill">
            <span>Confidence Index:</span>
            <strong>High (OLS Verified)</strong>
          </div>
          <div className="meta-pill">
            <span>Spatial Radius:</span>
            <strong>{data.search_radius_km} KM Dense Search</strong>
          </div>
        </div>
      </div>

      {/* ── 5-Year Trajectory ── */}
      <PriceProjection prices={predicted_prices} />

      {/* ── Proximate Civic Amenities Grid ── */}
      <div>
        <div className="section-header-block">
          <div>
            <h3 className="section-title-main">Geospatial Amenity Matrix</h3>
            <p className="section-subtitle-main">Surrounding urban infrastructure within a {data.search_radius_km} km radius</p>
          </div>
          <span className="label-md">Density Analysis</span>
        </div>

        <div className="facilities-grid">
          {['hospitals', 'schools', 'malls', 'police_stations'].map((type) => (
            <FacilityCard key={type} type={type} places={nearby[type]} />
          ))}
        </div>
      </div>

      {/* ── Cadastral & Coordinates Card ── */}
      <LocationInfo coordinates={coordinates} />
    </section>
  );
}
