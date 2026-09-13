export default function LocationInfo({ coordinates }) {
  const { latitude, longitude, display_name } = coordinates;
  const mapsUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;

  return (
    <div className="card-level-1 location-intel-card">
      <div className="location-intel-main">
        <span className="label-md" style={{ color: 'var(--secondary)' }}>
          Map Details
        </span>
        <h4 className="location-intel-title">Area Coordinates</h4>
        <p className="location-intel-address">{display_name}</p>

        <div className="coords-strip">
          <div className="coord-tag">
            <span>Latitude:</span>
            <strong className="tnum">{latitude.toFixed(6)}</strong>
          </div>
          <div className="coord-tag">
            <span>Longitude:</span>
            <strong className="tnum">{longitude.toFixed(6)}</strong>
          </div>
        </div>
      </div>

      <div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary"
        >
          View on Map ↗
        </a>
      </div>
    </div>
  );
}
