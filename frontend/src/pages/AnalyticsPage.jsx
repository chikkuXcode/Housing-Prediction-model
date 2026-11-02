import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MARKET_SEGMENTS = [
  {
    tier: 'Luxury / Central Areas',
    range: '₹14,000 – ₹24,000 / sq.ft',
    areas: ['Indira Nagar', 'Malleshwaram', 'Koramangala', 'Rajaji Nagar'],
    character: 'Premium central Bangalore localities with top restaurants, shopping, and high property rates.'
  },
  {
    tier: 'Major IT / Tech Hubs',
    range: '₹7,500 – ₹13,000 / sq.ft',
    areas: ['Whitefield', 'HSR Layout', 'Bellandur', 'Marathahalli', 'Sarjapur'],
    character: 'Areas near tech parks and offices with high rental demand from software professionals.'
  },
  {
    tier: 'Affordable / Mid-Range Areas',
    range: '₹5,000 – ₹7,500 / sq.ft',
    areas: ['Electronic City', 'Thanisandra', 'Uttarahalli', 'Hennur Road'],
    character: 'Ideal for families and first-time homebuyers with upcoming metro connectivity.'
  },
  {
    tier: 'Developing / Airport Corridor',
    range: '₹3,500 – ₹5,000 / sq.ft',
    areas: ['Yelahanka', 'Devanahalli', 'Hebbal', 'Yelahanka New Town'],
    character: 'North Bangalore near Kempegowda International Airport with great long-term growth potential.'
  }
];

const BHK_DISTRIBUTION = [
  { bhk: '1 BHK', areaRange: '450 – 650 sq.ft', medianPrice: '₹35 – ₹55 Lakh', demand: 'Singles, students, working professionals' },
  { bhk: '2 BHK', areaRange: '950 – 1,250 sq.ft', medianPrice: '₹65 Lakh – ₹1.15 Crore', demand: 'Most popular option for small families' },
  { bhk: '3 BHK', areaRange: '1,450 – 2,100 sq.ft', medianPrice: '₹1.20 – ₹2.35 Crore', demand: 'Spacious apartments for medium/large families' },
  { bhk: '4+ BHK', areaRange: '2,400 – 4,500+ sq.ft', medianPrice: '₹2.50 – ₹6.00+ Crore', demand: 'Luxury apartments and independent villas' }
];

export default function AnalyticsPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-badge-row">
          <span className="label-badge">Bangalore Market Trends</span>
          <span className="status-pill-live">Data Insights</span>
        </div>
        <h1 className="page-title">Bangalore Localities &amp; Price Trends</h1>
        <p className="page-subtitle">
          Explore typical price ranges across Bangalore, average BHK budgets, and price brackets across major residential zones.
        </p>
      </div>

      <div className="metrics-strip analytics-stats-strip">
        <div className="metric-item">
          <span className="metric-value tnum">₹7,150</span>
          <span className="metric-label">Average Price per Sq.Ft</span>
        </div>
        <div className="metric-item">
          <span className="metric-value tnum">8.5%</span>
          <span className="metric-label">Annual Price Growth (CAGR)</span>
        </div>
        <div className="metric-item">
          <span className="metric-value tnum">2 BHK</span>
          <span className="metric-label">Most In-Demand Layout</span>
        </div>
        <div className="metric-item">
          <span className="metric-value tnum">240+</span>
          <span className="metric-label">Localities Analyzed</span>
        </div>
      </div>

      <section className="home-section">
        <div className="section-header-block">
          <div>
            <h2 className="section-title-main">Bangalore Area Categories</h2>
            <p className="section-subtitle-main">Localities categorized by budget and property price range</p>
          </div>
        </div>

        <div className="segments-grid">
          {MARKET_SEGMENTS.map((seg, idx) => (
            <div key={idx} className="card-level-1 segment-card">
              <div className="segment-tier-header">
                <span className="segment-tier-badge">{seg.tier}</span>
                <span className="segment-tier-range tnum">{seg.range}</span>
              </div>
              <p className="segment-character">{seg.character}</p>
              <div className="segment-areas-tag-list">
                {seg.areas.map((area) => (
                  <Link
                    key={area}
                    to={`/predict?location=${encodeURIComponent(area)}`}
                    className="segment-area-chip"
                    title={`Check price in ${area}`}
                  >
                    {area} &rarr;
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header-block">
          <div>
            <h2 className="section-title-main">Typical Prices by BHK Layout</h2>
            <p className="section-subtitle-main">Standard built-up area and estimated budget for 1, 2, 3, and 4 BHK homes</p>
          </div>
        </div>

        <div className="table-responsive-card">
          <table className="analytics-table">
            <thead>
              <tr>
                <th>Configuration</th>
                <th>Typical Area Range</th>
                <th>Estimated Budget</th>
                <th>Common Target Buyer</th>
              </tr>
            </thead>
            <tbody>
              {BHK_DISTRIBUTION.map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.bhk}</strong></td>
                  <td className="tnum">{row.areaRange}</td>
                  <td className="tnum font-medium">{row.medianPrice}</td>
                  <td><span className="meta-pill">{row.demand}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="home-action-banner" style={{ marginTop: 12 }}>
        <div className="action-banner-text">
          <h2 className="action-banner-title">Ready to calculate a specific property price?</h2>
          <p className="action-banner-subtitle">
            Enter area in sq.ft, BHK configuration, and location to get an immediate market price estimate.
          </p>
        </div>
        <div className="action-banner-buttons">
          <Link to="/predict" className="btn-primary-action">
            <span>Calculate House Price</span>
            <span className="btn-arrow">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
