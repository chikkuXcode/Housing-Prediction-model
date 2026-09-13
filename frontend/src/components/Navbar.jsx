import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <div className="navbar-logo-mark">HP</div>
          <span className="navbar-title">HousePrice</span>
          <span className="navbar-tag">Bengaluru</span>
        </Link>

        <nav className="navbar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/predict"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Predict Price
          </NavLink>
          <NavLink
            to="/analytics"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Localities &amp; Trends
          </NavLink>
          <NavLink
            to="/methodology"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            How It Works
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            About &amp; Terms
          </NavLink>
        </nav>

        <div className="navbar-meta">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">2026 Market Index</span>
          </div>

          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-menu">
          <NavLink
            to="/"
            end
            onClick={closeMobile}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/predict"
            onClick={closeMobile}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            Predict Price
          </NavLink>
          <NavLink
            to="/analytics"
            onClick={closeMobile}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            Localities &amp; Trends
          </NavLink>
          <NavLink
            to="/methodology"
            onClick={closeMobile}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            How It Works
          </NavLink>
          <NavLink
            to="/contact"
            onClick={closeMobile}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            About &amp; Terms
          </NavLink>
        </div>
      )}
    </header>
  );
}
