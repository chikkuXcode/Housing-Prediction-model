export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo-mark">EI</div>
        <span className="navbar-title">Estate Intel</span>
        <span className="navbar-tag">Terminal</span>
      </div>

      <div className="navbar-meta">
        <div className="status-indicator">
          <span className="status-dot"></span>
          <span>Bengaluru Model v2.4</span>
        </div>
      </div>
    </header>
  );
}
