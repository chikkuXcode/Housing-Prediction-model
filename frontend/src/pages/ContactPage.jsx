import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const USE_CASES = [
  {
    icon: '🏠',
    title: 'For Home Buyers',
    desc: 'Verify if a property is fairly priced before negotiating with builders or brokers, avoiding overpriced listings.'
  },
  {
    icon: '💼',
    title: 'For Property Sellers & Owners',
    desc: 'Set competitive and realistic asking prices based on actual neighborhood rates to attract serious buyers faster.'
  },
  {
    icon: '🔑',
    title: 'For Tenants & Renters',
    desc: 'Evaluate the capital value of an apartment to negotiate fair rental yields (typically 3.5% – 4.5% annual yield in Bangalore).'
  },
  {
    icon: '🧭',
    title: 'For Families Relocating to Bangalore',
    desc: 'Explore unfamiliar areas and instantly check nearby schools, hospitals, and shopping centers before deciding where to live.'
  }
];

const POLICIES = [
  {
    icon: '🔒',
    title: 'Privacy-First Experience',
    desc: 'We never ask for your name, phone number, or email. You can browse, evaluate properties, and search localities with complete anonymity.'
  },
  {
    icon: '🆓',
    title: '100% Free Access',
    desc: 'No subscription fees, no locked features, and no paywalls. All valuation tools and neighborhood directories are free for everyone.'
  },
  {
    icon: '🛡️',
    title: 'Zero Spam & No Lead Selling',
    desc: 'Unlike traditional property portals, we do not sell your search queries to third-party telemarketers, agents, or spam calling lists.'
  }
];

const TERMS = [
  {
    title: 'Informational Purpose Only',
    text: 'All valuations displayed on this website are algorithmic approximations based on historical market trends. They are designed for preliminary research and do not substitute a certified property appraisal or bank valuation.'
  },
  {
    title: 'Individual Property Variables',
    text: 'Actual real estate transaction prices vary based on floor height, view, society maintenance, builder brand, layout efficiency, interior work, and mutual seller-buyer negotiations.'
  },
  {
    title: 'Independent Due Diligence',
    text: 'Users are strongly advised to perform independent legal verification, title deed audits, and physical inspections with qualified professionals prior to any financial commitment or real estate transaction.'
  }
];

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-badge-row">
          <span className="label-badge">About Us &amp; Guidelines</span>
          <span className="status-pill-live">User Guide</span>
        </div>
        <h1 className="page-title">About the Platform, Use Cases &amp; Policies</h1>
        <p className="page-subtitle">
          Everything you need to know about HousePrice: who it is for, how it helps you make better property decisions, privacy policies, and terms of use.
        </p>
      </div>

      <section className="home-section">
        <div className="card-level-1 methodology-card full-width-card">
          <div className="card-header-bar">
            <div>
              <span className="label-badge">Overview</span>
              <h2 className="card-header-title">About HousePrice</h2>
            </div>
            <span className="meta-pill">Bangalore Property Guide</span>
          </div>

          <p className="methodology-text">
            <strong>HousePrice</strong> is a free, transparent property valuation platform built specifically for Bangalore. Real estate pricing in this city can often be confusing and opaque, with different agents quoting wildly different prices for identical properties. Our goal is to empower everyday buyers, sellers, and renters with clear, honest market estimates based on historical transaction data and verified neighborhood benchmarks.
          </p>

          <div className="contact-spec-list" style={{ borderBottom: 'none', paddingBottom: 0 }}>
            <div className="spec-item">
              <span className="spec-icon">🎯</span>
              <div>
                <strong>Our Core Mission</strong>
                <p>Bringing transparency and clarity to Bangalore residential property valuation</p>
              </div>
            </div>

            <div className="spec-item">
              <span className="spec-icon">📍</span>
              <div>
                <strong>Localities Covered</strong>
                <p>Over 240 residential micro-markets across Central, South, North, and East Bangalore</p>
              </div>
            </div>

            <div className="spec-item">
              <span className="spec-icon">💡</span>
              <div>
                <strong>Key Features</strong>
                <p>Instant price calculation, 5-year appreciation projections, and 3 km neighborhood amenity scan</p>
              </div>
            </div>

            <div className="spec-item">
              <span className="spec-icon">✨</span>
              <div>
                <strong>Completely Free</strong>
                <p>No account required, no login wall, and zero hidden charges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-header-block">
          <div>
            <span className="label-badge">Practical Utility</span>
            <h2 className="section-title-main">How This Platform Helps You</h2>
            <p className="section-subtitle-main">
              Tailored insights whether you are buying your first home, selling, or relocating
            </p>
          </div>
        </div>

        <div className="capabilities-grid">
          {USE_CASES.map((item, idx) => (
            <div key={idx} className="card-level-1 capability-card">
              <div className="capability-icon">{item.icon}</div>
              <h3 className="capability-title">{item.title}</h3>
              <p className="capability-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header-block">
          <div>
            <span className="label-badge">Commitment to You</span>
            <h2 className="section-title-main">Privacy &amp; Usage Policies</h2>
            <p className="section-subtitle-main">
              Our clear guidelines on your privacy, data security, and platform access
            </p>
          </div>
        </div>

        <div className="capabilities-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {POLICIES.map((pol, idx) => (
            <div key={idx} className="card-level-1 capability-card">
              <div className="capability-icon">{pol.icon}</div>
              <h3 className="capability-title">{pol.title}</h3>
              <p className="capability-desc">{pol.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="card-level-1 methodology-card full-width-card disclaimer-card">
          <div className="disclaimer-content">
            <div className="card-header-bar" style={{ marginBottom: 12, borderBottom: 'none', padding: 0 }}>
              <div>
                <span className="label-badge" style={{ backgroundColor: '#fed7aa', color: '#9a3412', borderColor: '#fdba74' }}>
                  Important Notice
                </span>
                <h3 className="section-title-main" style={{ marginTop: 6 }}>Terms of Use &amp; Disclaimer</h3>
              </div>
            </div>

            <ul className="methodology-list" style={{ marginTop: 8 }}>
              {TERMS.map((term, idx) => (
                <li key={idx}>
                  <strong>{term.title}:</strong> {term.text}
                </li>
              ))}
            </ul>

            <div className="disclaimer-actions" style={{ marginTop: 24 }}>
              <Link to="/predict" className="btn-primary-action">
                Calculate a House Price &rarr;
              </Link>
              <Link to="/analytics" className="btn-secondary-action">
                Explore Localities &amp; Rates
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
