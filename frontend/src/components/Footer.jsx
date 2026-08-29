export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="navbar-logo-mark" style={{ width: 24, height: 24, fontSize: 11 }}>
            EI
          </div>
          <span className="footer-text">
            <strong>Estate Intel</strong> &mdash; Algorithmic Asset Valuation &amp; Spatial Intelligence
          </span>
        </div>

        <div className="footer-legal">
          &copy; {new Date().getFullYear()} Estate Intel. OpenStreetMap &middot; Linear Regression Kernel.
        </div>
      </div>
    </footer>
  );
}
