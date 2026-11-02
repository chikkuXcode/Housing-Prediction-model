import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const FEATURED_LOCALITIES = [
  { name: 'Whitefield', tag: 'IT Hub', avgSqft: '₹7,800/sqft', desc: 'Major tech corridor in East Bangalore with top IT parks & metro connectivity' },
  { name: 'Indira Nagar', tag: 'Central', avgSqft: '₹14,500/sqft', desc: 'Prime neighborhood known for top dining, boutique shopping, and high demand' },
  { name: 'Koramangala', tag: 'Commercial', avgSqft: '₹13,200/sqft', desc: 'Vibrant hub with startup offices, cafes, and premium residential spaces' },
  { name: 'Electronic City', tag: 'South Bangalore', avgSqft: '₹5,400/sqft', desc: 'Affordable IT belt with major corporate campuses like Infosys & Wipro' },
  { name: 'HSR Layout', tag: 'Popular', avgSqft: '₹11,000/sqft', desc: 'Modern planned layout with parks, schools, and seamless access to ORR' },
  { name: 'Sarjapur', tag: 'Fast Growing', avgSqft: '₹6,900/sqft', desc: 'Rapidly developing corridor with leading international schools & townships' },
];

const PLATFORM_FEATURES = [
  {
    icon: '⚡',
    title: 'Instant Fair Value',
    desc: 'Get an immediate, data-driven estimate of any house price in Bangalore based on square footage, BHK, and locality.'
  },
  {
    icon: '📍',
    title: '240+ Localities Covered',
    desc: 'From prime central Bangalore to emerging airport corridors, explore verified price benchmarks for over 240 neighborhoods.'
  },
  {
    icon: '🏫',
    title: 'Nearby Amenities Check',
    desc: 'Discover schools, multi-specialty hospitals, shopping malls, and emergency services located within 3 km of the property.'
  },
  {
    icon: '📈',
    title: '5-Year Value Trajectory',
    desc: 'Explore projected annual capital growth curves up to 2026 to make confident long-term buying or selling decisions.'
  }
];

export default function HomePage() {
  return (
    <div className="page-container">
      <HeroSection />

      <div className="home-action-banner">
        <div className="action-banner-text">
          <h2 className="action-banner-title">Planning to buy, sell, or rent a home?</h2>
          <p className="action-banner-subtitle">
            Enter your property details to get an instant market price estimate and discover nearby neighborhood amenities.
          </p>
        </div>
        <div className="action-banner-buttons">
          <Link to="/predict" className="btn-primary-action">
            <span>Calculate House Price</span>
            <span className="btn-arrow">&rarr;</span>
          </Link>
          <Link to="/analytics" className="btn-secondary-action">
            <span>Explore Localities</span>
          </Link>
        </div>
      </div>

      <section className="home-section workflow-section" style={{ borderTop: 'none', paddingTop: 0 }}>
        <div className="section-header-block">
          <div>
            <span className="label-badge">How It Works</span>
            <h2 className="section-title-main">Calculate Price in 3 Easy Steps</h2>
            <p className="section-subtitle-main">Fast, simple, and completely free to use</p>
          </div>
        </div>

        <div className="workflow-steps-grid">
          <div className="workflow-step-card">
            <div className="step-number">01</div>
            <h4 className="step-title">Enter Property Details</h4>
            <p className="step-desc">
              Choose your Bangalore locality, total built-up square feet, number of bedrooms (BHK), bathrooms, and balconies.
            </p>
          </div>
          <div className="workflow-step-card">
            <div className="step-number">02</div>
            <h4 className="step-title">Intelligent Price Analysis</h4>
            <p className="step-desc">
              Our valuation engine evaluates actual historic market sales across 240+ areas to calculate fair market pricing.
            </p>
          </div>
          <div className="workflow-step-card">
            <div className="step-number">03</div>
            <h4 className="step-title">Get Estimate &amp; Facilities</h4>
            <p className="step-desc">
              View the current estimated price, multi-year appreciation projections, and nearby schools, hospitals, and malls.
            </p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-header-block">
          <div>
            <span className="label-badge">Why Use HousePrice</span>
            <h2 className="section-title-main">Everything You Need for Smart Decisions</h2>
            <p className="section-subtitle-main">
              Transparent market data to help you evaluate properties with confidence
            </p>
          </div>
        </div>

        <div className="capabilities-grid">
          {PLATFORM_FEATURES.map((item, idx) => (
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
            <span className="label-badge">Popular Neighborhoods</span>
            <h2 className="section-title-main">Explore Top Areas in Bangalore</h2>
            <p className="section-subtitle-main">
              Click any area to pre-fill the form and view estimated property rates
            </p>
          </div>
          <Link to="/analytics" className="text-link">
            See all 240+ locations &rarr;
          </Link>
        </div>

        <div className="featured-localities-grid">
          {FEATURED_LOCALITIES.map((loc) => (
            <div key={loc.name} className="locality-preview-card">
              <div className="locality-preview-header">
                <span className="locality-tag">{loc.tag}</span>
                <span className="locality-growth tnum">{loc.avgSqft}</span>
              </div>
              <h4 className="locality-name">{loc.name}</h4>
              <p style={{ fontSize: 13, color: 'var(--on-surface-variant)', lineHeight: '18px' }}>
                {loc.desc}
              </p>
              <Link
                to={`/predict?location=${encodeURIComponent(loc.name)}`}
                className="locality-action-link"
              >
                Check Price in {loc.name} &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
