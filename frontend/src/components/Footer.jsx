import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="navbar-logo-mark" style={{ width: 28, height: 28, fontSize: 12 }}>
            HP
          </div>
          <div className="footer-text-group">
            <span className="footer-text">
              <strong>HousePrice</strong> &mdash; Bangalore Property Valuation &amp; Neighborhood Guide
            </span>
            <p className="footer-subtext">
              Empowering home buyers, sellers, and tenants with instant market price estimates and surrounding public amenities.
            </p>
          </div>
        </div>

        <div className="footer-links">
          <Link to="/" className="footer-nav-link">Home</Link>
          <Link to="/predict" className="footer-nav-link">Predict Price</Link>
          <Link to="/analytics" className="footer-nav-link">Localities &amp; Trends</Link>
          <Link to="/methodology" className="footer-nav-link">How It Works</Link>
          <Link to="/contact" className="footer-nav-link">About &amp; Terms</Link>
        </div>

        <div className="footer-legal">
          &copy; {new Date().getFullYear()} HousePrice &middot; Bengaluru Residential Market Guide &middot; All estimates are for general guidance.
        </div>
      </div>
    </footer>
  );
}
