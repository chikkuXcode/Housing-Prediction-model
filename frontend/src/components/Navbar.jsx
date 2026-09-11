export default function Navbar() {
  return (
    <header className="re-navbar">
      <div className="re-navbar-inner">
        <a href="/" className="re-brand">
          <div className="re-logo-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
            </svg>
          </div>
          <div className="re-brand-text">
            <span className="re-brand-name">RealEstate</span>
            <span className="re-brand-subtitle">Price Prediction with Neighbourhood Analytics</span>
          </div>
        </a>
      </div>
    </header>
  );
}
