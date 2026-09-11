export default function LocationInfo({ coordinates }) {
  const mapsUrl = coordinates
    ? `https://www.openstreetmap.org/?mlat=${coordinates.latitude}&mlon=${coordinates.longitude}#map=15/${coordinates.latitude}/${coordinates.longitude}`
    : 'https://www.openstreetmap.org/';

  return (
    <div className="re-card datasource-card">
      <div className="datasource-left">
        <div className="datasource-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
        </div>
        <div>
          <h4 className="datasource-title">Data Source</h4>
          <p className="datasource-text">
            This analysis is based on publicly available real estate data, government records and neighbourhood information.
          </p>
        </div>
      </div>

      <div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="datasource-btn"
        >
          <span>Learn More</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>
  );
}
