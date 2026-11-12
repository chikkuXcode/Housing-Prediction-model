export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-meta-badge">
        Property Valuation &amp; Neighbourhood Analytics &middot; Bengaluru
      </div>

      <h1 className="hero-title">
        Real Estate Price Prediction <span>with Neighbourhood Analytics</span>
      </h1>

      <p className="hero-description">
        Find out the fair market value of any residential property in Bangalore.
        Get instant price estimates, 5-year value projections, and nearby facilities like schools, hospitals, and shopping centers.
      </p>

      <div className="metrics-strip">
        <div className="metric-item">
          <span className="metric-value tnum">13,000+</span>
          <span className="metric-label">Properties Analyzed</span>
        </div>
        <div className="metric-item">
          <span className="metric-value tnum">240+</span>
          <span className="metric-label">Bangalore Localities</span>
        </div>
        <div className="metric-item">
          <span className="metric-value tnum">Instant</span>
          <span className="metric-label">Free Valuation Output</span>
        </div>
      </div>
    </section>
  );
}
