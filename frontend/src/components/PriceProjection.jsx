import { useState } from 'react';

function formatShortPrice(price) {
  if (price >= 100) {
    const cr = price / 100;
    return cr % 1 === 0 ? `₹${cr} Cr` : `₹${cr.toFixed(cr >= 10 ? 1 : 2)} Cr`;
  }
  return `₹${price.toFixed(1)} L`;
}

function formatFullPrice(price) {
  if (price >= 100) {
    return `₹${(price / 100).toFixed(2)} Crore`;
  }
  return `₹${price.toFixed(2)} Lakh`;
}

export default function PriceProjection({ prices }) {
  const [activeTab, setActiveTab] = useState('chart');

  if (!prices || Object.keys(prices).length === 0) return null;

  const entries = Object.entries(prices);
  const values = entries.map(([, v]) => v);
  const maxVal = Math.max(...values);
  const base2022 = prices['2022'] || values[0];

  return (
    <div className="re-card price-trend-card">
      <div className="trend-header-row">
        <div className="section-card-header" style={{ marginBottom: 0 }}>
          <div className="section-icon-badge chart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="20" x2="18" y2="10" />
              <line x1="12" y1="20" x2="12" y2="4" />
              <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
          </div>
          <div className="section-title-wrap">
            <h3>Price Trend</h3>
            <p>See how property prices are expected to change in the coming years.</p>
          </div>
        </div>

        {/* Chart / Table View Switcher */}
        <div className="tab-pill-group" role="tablist">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'chart' ? 'active' : ''}`}
            onClick={() => setActiveTab('chart')}
            role="tab"
            aria-selected={activeTab === 'chart'}
          >
            Chart
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'table' ? 'active' : ''}`}
            onClick={() => setActiveTab('table')}
            role="tab"
            aria-selected={activeTab === 'table'}
          >
            Table
          </button>
        </div>
      </div>

      {activeTab === 'chart' ? (
        /* ── Clean Vertical Bar Chart Matching Reference ── */
        <div className="chart-columns-wrap">
          {entries.map(([year, price]) => {
            const isTarget = year === '2026';
            const pct = Math.max(15, Math.round((price / maxVal) * 100));
            return (
              <div className="chart-bar-item" key={year}>
                <span className="chart-price-tag tnum">{formatShortPrice(price)}</span>
                <div className="chart-pillar-track">
                  <div
                    className={`chart-pillar-bar ${isTarget ? 'target-year' : ''}`}
                    style={{ '--bar-height': `${pct}%` }}
                  />
                </div>
                <span className={`chart-year-tag ${isTarget ? 'active' : ''}`}>{year}</span>
              </div>
            );
          })}
        </div>
      ) : (
        /* ── Friendly Clean Data Table ── */
        <div className="clean-table-container">
          <table className="clean-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Price Growth</th>
                <th>Estimated Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {entries.map(([year, price]) => {
                const isTarget = year === '2026';
                const growth = (((price - base2022) / base2022) * 100).toFixed(1);
                return (
                  <tr key={year}>
                    <td className="tnum" style={{ fontWeight: 700 }}>
                      {year}
                    </td>
                    <td className="tnum" style={{ color: 'var(--slate-500)' }}>
                      {year === '2022' ? 'Baseline' : `+${growth}%`}
                    </td>
                    <td className="tnum" style={{ fontWeight: isTarget ? 800 : 600, color: isTarget ? 'var(--primary-blue)' : 'var(--navy-900)' }}>
                      {formatFullPrice(price)}
                    </td>
                    <td>
                      <span className={`tag-clean-status ${isTarget ? 'current' : 'past'}`}>
                        {isTarget ? 'Target Forecast' : 'Historical Trend'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
