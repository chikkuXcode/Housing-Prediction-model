export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="re-footer">
      <div className="re-footer-inner">
        <div className="footer-brand-side">
          <span className="footer-brand-title">RealEstate</span>
          <span className="footer-brand-subtitle">Price Prediction with Neighbourhood Analytics</span>
        </div>


        <div className="footer-copyright">
          &copy; {currentYear} RealEstate. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
