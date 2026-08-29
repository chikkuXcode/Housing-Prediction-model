function formatPrice(price) {
  if (price >= 100) {
    return `₹${(price / 100).toFixed(2)} Cr`;
  }
  return `₹${price.toFixed(2)} Lakh`;
}

export default function PriceProjection({ prices }) {
  const entries = Object.entries(prices);
  const values = entries.map(([, v]) => v);
  const maxVal = Math.max(...values);

  return (
    <div className="card-level-1 projection-card">
      <div className="section-header-block">
        <div>
          <h3 className="section-title-main">Appreciation Trajectory</h3>
          <p className="section-subtitle-main">5-Year compound extrapolation based on 8.5% annual capital index</p>
        </div>
        <span className="label-md">Projection Series</span>
      </div>

      {/* Architectural Bar Chart */}
      <div className="projection-chart-container">
        {entries.map(([year, price]) => {
          const pct = Math.round((price / maxVal) * 100);
          const isTarget = year === '2026';
          return (
            <div className="chart-bar-column" key={year}>
              <span className="chart-val-label tnum">{formatPrice(price)}</span>
              <div className="bar-track">
                <div
                  className={`bar-fill ${isTarget ? 'target-year' : ''}`}
                  style={{ '--bar-height': `${pct}%` }}
                />
              </div>
              <span className={`chart-year-label ${isTarget ? 'active' : ''}`}>{year}</span>
            </div>
          );
        })}
      </div>

      {/* Data Table */}
      <table className="data-table">
        <thead>
          <tr>
            <th>Fiscal Year</th>
            <th>Appreciation Index</th>
            <th>Estimated Asset Valuation</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([year, price]) => {
            const isTarget = year === '2026';
            const base2022 = prices['2022'] || price;
            const growthFromBase = (((price - base2022) / base2022) * 100).toFixed(1);
            return (
              <tr key={year}>
                <td className="tnum" style={{ fontWeight: 600 }}>
                  {year}
                </td>
                <td className="tnum" style={{ color: 'var(--on-surface-variant)' }}>
                  {year === '2022' ? 'Baseline' : `+${growthFromBase}%`}
                </td>
                <td className="tnum" style={{ fontWeight: isTarget ? 700 : 500, color: isTarget ? 'var(--secondary)' : 'var(--on-surface)' }}>
                  {formatPrice(price)}
                </td>
                <td>
                  <span className="label-sm" style={{ color: isTarget ? 'var(--secondary)' : 'var(--outline)' }}>
                    {isTarget ? 'Target Horizon' : 'Historical Trend'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
