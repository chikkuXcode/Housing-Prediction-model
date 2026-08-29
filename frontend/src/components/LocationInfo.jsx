export default function LocationInfo({ coordinates }) {
  const { latitude, longitude, display_name } = coordinates;
  const mapsUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;

  return (
    <div className="card-level-1 location-intel-card">
      <div className="location-intel-main">
        <span className="label-md" style={{ color: 'var(--secondary)' }}>
          Geospatial Intelligence
        </span>
        <h4 className="location-intel-title">Geocoded Cadastral Reference</h4>
        <p className="location-intel-address">{display_name}</p>
        <div className="coords-strip">
          <div className="coord-tag">
            <span>LAT:</span>
            <strong className="tnum">{latitude.toFixed(6)}</strong>
          </div>
          <div className="coord-tag">
            <span>LON:</span>
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
          Open Cartography ↗
        </a>
      </div>
    </div>
  );
}
