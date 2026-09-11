export default function HeroSection() {
  return (
    <div id="home" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── Hero Main Banner ── */}
      <section className="re-hero">
        <div className="re-hero-content">
          <h1 className="re-hero-title">
            Find the <span className="highlight-blue">Right Price</span> for
            <br />
            Your Property
          </h1>

          <p className="re-hero-subtitle">
            Get an estimated property price based on location, features and neighbourhood details.
            Make smarter real estate decisions.
          </p>
        </div>

        <div className="re-hero-visual">
          <div className="hero-art-container">
            {/* Floating Trust Badge */}
            <div className="hero-floating-badge">
              <span className="badge-headline">Better Insights</span>
              <span className="badge-tagline">Brighter Decisions</span>
            </div>

            {/* Clean Modern Architectural Illustration matching reference */}
            <svg
              viewBox="0 0 420 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            >
              {/* Soft sky backdrop & city skyline silhouettes */}
              <path
                d="M40 220 V110 H75 V220 M85 220 V80 H120 V220 M130 220 V130 H160 V220 M310 220 V95 H345 V220 M355 220 V125 H385 V220"
                fill="#E8EEF8"
                opacity="0.8"
              />
              <rect x="20" y="218" width="380" height="4" rx="2" fill="#E2E8F0" />

              {/* Foliage / Soft Trees */}
              <circle cx="95" cy="190" r="32" fill="#86EFAC" opacity="0.85" />
              <circle cx="115" cy="175" r="28" fill="#4ADE80" opacity="0.9" />
              <rect x="100" y="195" width="8" height="25" rx="3" fill="#64748B" opacity="0.6" />

              <circle cx="340" cy="190" r="36" fill="#86EFAC" opacity="0.85" />
              <circle cx="355" cy="170" r="28" fill="#4ADE80" opacity="0.9" />
              <rect x="344" y="195" width="8" height="25" rx="3" fill="#64748B" opacity="0.6" />

              {/* Left House Wing */}
              <rect x="155" y="150" width="70" height="70" rx="3" fill="#F8FAFC" stroke="#0D6EFD" strokeWidth="2.5" />
              <polygon points="150,150 190,115 230,150" fill="#0D6EFD" stroke="#0D6EFD" strokeWidth="2.5" />
              {/* Windows left */}
              <rect x="168" y="165" width="18" height="22" rx="3" fill="#BFDBFE" stroke="#0D6EFD" strokeWidth="1.5" />
              <rect x="194" y="165" width="18" height="22" rx="3" fill="#BFDBFE" stroke="#0D6EFD" strokeWidth="1.5" />

              {/* Main Central House */}
              <rect x="215" y="125" width="95" height="95" rx="3" fill="#FFFFFF" stroke="#0D6EFD" strokeWidth="3" />
              {/* Main Gable Roof */}
              <polygon points="205,126 262,75 320,126" fill="#1D4ED8" stroke="#1D4ED8" strokeWidth="3" />
              {/* Chimney */}
              <rect x="290" y="85" width="14" height="25" rx="2" fill="#0D6EFD" />

              {/* Top Attic Window */}
              <circle cx="262" cy="105" r="8" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2" />
              <line x1="262" y1="97" x2="262" y2="113" stroke="#1D4ED8" strokeWidth="1.5" />
              <line x1="254" y1="105" x2="270" y2="105" stroke="#1D4ED8" strokeWidth="1.5" />

              {/* Front Windows */}
              <rect x="228" y="138" width="22" height="26" rx="3" fill="#BFDBFE" stroke="#0D6EFD" strokeWidth="2" />
              <line x1="239" y1="138" x2="239" y2="164" stroke="#0D6EFD" strokeWidth="1.5" />
              <line x1="228" y1="151" x2="250" y2="151" stroke="#0D6EFD" strokeWidth="1.5" />

              <rect x="278" y="138" width="22" height="26" rx="3" fill="#BFDBFE" stroke="#0D6EFD" strokeWidth="2" />
              <line x1="289" y1="138" x2="289" y2="164" stroke="#0D6EFD" strokeWidth="1.5" />
              <line x1="278" y1="151" x2="300" y2="151" stroke="#0D6EFD" strokeWidth="1.5" />

              {/* Front Door */}
              <rect x="252" y="180" width="22" height="40" rx="3" fill="#0D6EFD" />
              <circle cx="268" cy="200" r="2" fill="#FFFFFF" />

              {/* Bush in front */}
              <ellipse cx="215" cy="216" rx="14" ry="10" fill="#22C55E" />
              <ellipse cx="310" cy="216" rx="16" ry="11" fill="#22C55E" />

              {/* Prominent Location Pin floating above roof */}
              <g transform="translate(262, 50)">
                <path
                  d="M0 -30 C-10 -30 -18 -22 -18 -12 C-18 2 0 16 0 16 C0 16 18 2 18 -12 C18 -22 10 -30 0 -30 Z"
                  fill="#0D6EFD"
                />
                <circle cx="0" cy="-14" r="6" fill="#FFFFFF" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      {/* ── 3 Summary Metric Cards ── */}
      <section className="re-summary-strip" aria-label="Key Market Metrics">
        {/* Card 1 */}
        <div className="re-summary-card">
          <div className="summary-icon-circle blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="summary-details">
            <span className="summary-number tnum">8.50%</span>
            <span className="summary-label">Average Price Growth</span>
            <span className="summary-subtext">(Past Years)</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="re-summary-card">
          <div className="summary-icon-circle green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="summary-details">
            <span className="summary-number tnum">240+</span>
            <span className="summary-label">Areas Analyzed</span>
            <span className="summary-subtext">Across the city</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="re-summary-card">
          <div className="summary-icon-circle purple">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="summary-details">
            <span className="summary-number tnum">2022 – 2026</span>
            <span className="summary-label">Price Forecast</span>
            <span className="summary-subtext">Based on market trends</span>
          </div>
        </div>
      </section>
    </div>
  );
}
