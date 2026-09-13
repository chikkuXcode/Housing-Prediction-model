const FACILITY_CONFIG = {
  hospitals: {
    label: 'Hospitals & Healthcare',
    code: 'MED',
    icon: '🏥',
  },
  schools: {
    label: 'Schools & Colleges',
    code: 'EDU',
    icon: '🏫',
  },
  malls: {
    label: 'Shopping Malls & Retail',
    code: 'RTL',
    icon: '🛍️',
  },
  police_stations: {
    label: 'Police & Emergency',
    code: 'SEC',
    icon: '👮',
  },
};

export default function FacilityCard({ type, places }) {
  const config = FACILITY_CONFIG[type] || { label: type, code: 'FAC', icon: '📍' };

  return (
    <div className="facility-card-mod">
      <div className="facility-card-header">
        <div className="facility-title-group">
          <div className="facility-category-badge">{config.icon}</div>
          <div>
            <h4 className="facility-title-text">{config.label}</h4>
            <span className="facility-count-tag">Top Nearby Places</span>
          </div>
        </div>
        <span className="label-md">{config.code}</span>
      </div>

      {!places || places.length === 0 ? (
        <div className="facility-empty-state">No places found within this area</div>
      ) : (
        places.map((place, i) => (
          <div className="facility-row-item" key={i}>
            <div>
              <a
                href={place.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="facility-name-link"
              >
                {place.name || 'Unnamed Location'} ↗
              </a>
            </div>
            <div className="facility-dist-chip tnum">{place.distance_km} km</div>
          </div>
        ))
      )}
    </div>
  );
}
