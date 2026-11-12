import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MethodologyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-badge-row">
          <span className="label-badge">Valuation Guide</span>
          <span className="status-pill-live">Market Methodology</span>
        </div>
        <h1 className="page-title">How Our Valuation Works</h1>
        <p className="page-subtitle">
          Learn how Real Estate Price Prediction with Neighbourhood Analytics estimates property values across Bangalore, what factors influence pricing, and how neighborhood infrastructure is evaluated.
        </p>
      </div>

      <div className="methodology-grid">
        <div className="card-level-1 methodology-card">
          <div className="card-header-bar">
            <div>
              <span className="label-badge">Factor 1</span>
              <h2 className="card-header-title">Neighborhood &amp; Locality</h2>
            </div>
            <span className="meta-pill">240+ Zones</span>
          </div>

          <p className="methodology-text">
            Location is the single biggest factor in real estate pricing. Central areas like Indiranagar command premium rates, while emerging zones like North Bangalore offer affordable entry points with high appreciation potential.
          </p>

          <ul className="methodology-list">
            <li>
              <strong>Verified Price Baselines:</strong> Evaluates historical residential sales across 240+ Bangalore sub-markets.
            </li>
            <li>
              <strong>Localized Demand:</strong> Accounts for tech corridor proximity, public transport access, and commercial vitality.
            </li>
          </ul>
        </div>

        <div className="card-level-1 methodology-card">
          <div className="card-header-bar">
            <div>
              <span className="label-badge">Factor 2</span>
              <h2 className="card-header-title">Area &amp; Configuration</h2>
            </div>
            <span className="meta-pill">Built-up Dimensions</span>
          </div>

          <p className="methodology-text">
            Total super built-up square footage forms the base value of any apartment or house. Structural layout attributes further refine the estimate:
          </p>

          <ul className="methodology-list">
            <li>
              <strong>Square Footage (sq.ft):</strong> Direct baseline price calculation based on verified average rates per square foot.
            </li>
            <li>
              <strong>BHK Configuration:</strong> Bedroom count defines space utility and matches typical household demand.
            </li>
            <li>
              <strong>Bathrooms &amp; Balconies:</strong> Extra bathrooms and balcony spaces provide enhanced convenience and contribute to final market valuation.
            </li>
          </ul>
        </div>

        <div className="card-level-1 methodology-card">
          <div className="card-header-bar">
            <div>
              <span className="label-badge">Factor 3</span>
              <h2 className="card-header-title">Annual Market Growth</h2>
            </div>
            <span className="meta-pill">8.5% Benchmark</span>
          </div>

          <p className="methodology-text">
            Bangalore&apos;s residential real estate has shown strong long-term resilience driven by IT employment and infrastructure expansion:
          </p>

          <ul className="methodology-list">
            <li>
              <strong>Compound Growth Index:</strong> We calibrate valuations using an 8.5% average annual compounding growth trajectory.
            </li>
            <li>
              <strong>Multi-Year Horizon:</strong> Displays estimates through 2026 so buyers and sellers can visualize equity growth and capital appreciation.
            </li>
          </ul>
        </div>

        <div className="card-level-1 methodology-card">
          <div className="card-header-bar">
            <div>
              <span className="label-badge">Factor 4</span>
              <h2 className="card-header-title">Surrounding Facilities</h2>
            </div>
            <span className="meta-pill">3 KM Scan</span>
          </div>

          <p className="methodology-text">
            A property&apos;s livability and rental demand depend heavily on day-to-day civic conveniences within quick driving distance:
          </p>

          <div className="spatial-steps-row">
            <div className="spatial-step-col">
              <h4>🏫 Education</h4>
              <p>Top schools and colleges within 3 km for family convenience.</p>
            </div>
            <div className="spatial-step-col">
              <h4>🏥 Healthcare</h4>
              <p>Hospitals, clinics, and emergency medical centers.</p>
            </div>
            <div className="spatial-step-col">
              <h4>🛍️ Retail &amp; Safety</h4>
              <p>Shopping malls, supermarkets, and local police stations.</p>
            </div>
          </div>
        </div>

        <div className="card-level-1 methodology-card full-width-card">
          <div className="card-header-bar">
            <div>
              <span className="label-badge">Buyer &amp; Seller Guide</span>
              <h2 className="card-header-title">Additional Factors That Influence Final Price</h2>
            </div>
            <span className="meta-pill">Important Advice</span>
          </div>

          <p className="methodology-text">
            While our valuation provides an accurate market benchmark, real-world closing transactions can vary based on individual property conditions:
          </p>

          <div className="workflow-steps-grid" style={{ marginTop: 8 }}>
            <div className="workflow-step-card">
              <h4 className="step-title">Floor Rise &amp; Facing</h4>
              <p className="step-desc">
                Higher floors, corner units, and park/lake-facing apartments typically command a 5% to 15% premium.
              </p>
            </div>
            <div className="workflow-step-card">
              <h4 className="step-title">Builder Reputation</h4>
              <p className="step-desc">
                Tier-1 developers (e.g. Prestige, Brigade, Sobha) usually trade at higher rates due to construction quality and amenities.
              </p>
            </div>
            <div className="workflow-step-card">
              <h4 className="step-title">Interior Furnishing</h4>
              <p className="step-desc">
                Semi-furnished or fully furnished homes with modular kitchens and wardrobes fetch higher rental and resale prices.
              </p>
            </div>
          </div>

          <div className="disclaimer-actions" style={{ marginTop: 24 }}>
            <Link to="/predict" className="btn-primary-action">
              Calculate Your Property Price &rarr;
            </Link>
            <Link to="/analytics" className="btn-secondary-action">
              Browse Bangalore Localities
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
