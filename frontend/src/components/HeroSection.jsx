export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-meta-badge">
        Editorial Intelligence &middot; Geospatial Valuation
      </div>

      <h1 className="hero-title">
        Institutional Real Estate <span>Valuation Engine</span>
      </h1>

      <p className="hero-description">
        Algorithmic property pricing driven by localized regression modeling,
        historical annual compounding trends, and real-time OpenStreetMap amenity density.
      </p>

      <div className="metrics-strip">
        <div className="metric-item">
          <span className="metric-value tnum">8.50%</span>
          <span className="metric-label">Benchmark Compound Rate</span>
        </div>
        <div className="metric-item">
          <span className="metric-value tnum">240+</span>
          <span className="metric-label">Cataloged Sub-markets</span>
        </div>
        <div className="metric-item">
          <span className="metric-value tnum">2022 &ndash; 2026</span>
          <span className="metric-label">Forecast Horizon</span>
        </div>
      </div>
    </section>
  );
}
