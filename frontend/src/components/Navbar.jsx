import { useState } from 'react';
import { Icon } from './Design';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobile}>
          <div className="navbar-logo-mark"><Icon name="home" /></div>
          <span className="brand-copy"><span className="navbar-title">RealEstate</span><span className="brand-subtitle">Price Prediction with Neighbourhood Analytics</span></span>
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

          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-menu" id="mobile-navigation">
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
