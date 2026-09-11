import { useEffect, useRef } from 'react';
import PriceProjection from './PriceProjection';
import FacilityCard from './FacilityCard';

export default function ResultSection({ data }) {
  const sectionRef = useRef(null);
  const { predicted_prices, nearby } = data;

  const mapsUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent((data.location || '') + ', Bengaluru, Karnataka')}`;

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [data]);

  return (
    <div ref={sectionRef} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ── Price Trend Section (Chart & Table) ── */}
      <PriceProjection prices={predicted_prices} />

      {/* ── Neighbourhood Insights Section ── */}
      <div className="re-card neighbourhood-card">
        <div className="neighbourhood-header-row">
          <div className="section-card-header" style={{ marginBottom: 0 }}>
            <div className="section-icon-badge pin">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div className="section-title-wrap">
              <h3>Neighbourhood Insights</h3>
              <p>Explore what makes this area valuable.</p>
            </div>
          </div>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-view-map"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <span>View on Map</span>
          </a>
        </div>

        {/* 4 Category Cards in Row */}
        <div className="amenities-4col-grid">
          {['hospitals', 'schools', 'malls', 'police_stations'].map((type) => (
            <FacilityCard key={type} type={type} places={nearby?.[type]} />
          ))}
        </div>
      </div>
    </div>
  );
}
