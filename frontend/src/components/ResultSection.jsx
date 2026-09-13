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
      <div className="valuation-spotlight">
        <div className="spotlight-left">
          <span className="spotlight-tag">Estimated House Price (2026)</span>
          <div className="spotlight-price tnum">{formatPrice(currentPrice)}</div>
          <div className="spotlight-location">
            <span>&bull;</span>
            <strong>{location}</strong>
            <span style={{ color: 'var(--outline)' }}>&middot; Bengaluru, Karnataka</span>
          </div>
        </div>

        <div className="spotlight-right-meta">
          <div className="meta-pill">
            <span>Valuation Basis:</span>
            <strong>Bengaluru Market Index</strong>
          </div>
          <div className="meta-pill">
            <span>Radius Analyzed:</span>
            <strong>{data.search_radius_km} KM Surrounding Area</strong>
          </div>
        </div>
      </div>

      <PriceProjection prices={predicted_prices} />

      <div>
        <div className="section-header-block">
          <div>
            <h3 className="section-title-main">Nearby Facilities &amp; Amenities</h3>
            <p className="section-subtitle-main">Hospitals, schools, malls, and police stations within {data.search_radius_km} km</p>
          </div>
          <span className="label-md">Verified Amenities</span>
        </div>

        <div className="facilities-grid">
          {['hospitals', 'schools', 'malls', 'police_stations'].map((type) => (
            <FacilityCard key={type} type={type} places={nearby[type]} />
          ))}
        </div>
      </div>

      <LocationInfo coordinates={coordinates} />
    </section>
  );
}
