import { Link } from 'react-router-dom';
import { Icon } from './Design';
export default function Footer() {
  return <footer className="footer"><div className="footer-content">
    <Link to="/" className="navbar-brand"><span className="navbar-logo-mark"><Icon name="home" /></span><span className="brand-copy"><strong className="navbar-title">RealEstate</strong><span className="brand-subtitle">Price Prediction with Neighbourhood Analytics</span></span></Link>
    <span className="footer-legal">© {new Date().getFullYear()} RealEstate. All rights reserved.</span>
  </div></footer>;
}
