const CATEGORY_CONFIG = {
  hospitals: {
    title: 'Hospitals & Healthcare',
    colorTheme: 'pink',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        <path d="M12 7v6" />
        <path d="M9 10h6" />
      </svg>
    ),
  },
  schools: {
    title: 'Education',
    colorTheme: 'green',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  malls: {
    title: 'Shopping & Services',
    colorTheme: 'blue',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  police_stations: {
    title: 'Safety & Others',
    colorTheme: 'orange',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
};

export default function FacilityCard({ type, places }) {
  const config = CATEGORY_CONFIG[type] || {
    title: type,
    colorTheme: 'blue',
    icon: '📍',
  };

  return (
    <div className="amenity-category-box">
      <div className={`category-header-strip ${config.colorTheme}`}>
        <div className="cat-icon-chip">{config.icon}</div>
        <span className="cat-title-text">{config.title}</span>
      </div>

      <div className="category-items-list">
        {!places || places.length === 0 ? (
          <div className="amenity-empty-notice">No places listed within 10 km</div>
        ) : (
          places.map((place, idx) => (
            <div className="amenity-row-entry" key={idx}>
              <a
                href={place.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="amenity-name-link"
                title={place.name}
              >
                {place.name || 'Nearby Facility'}
              </a>
              <span className="amenity-dist-badge tnum">{place.distance_km} km</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
