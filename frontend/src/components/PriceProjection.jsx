import { useState } from 'react';
import { IconTile } from './Design';
function formatPrice(price) {
  if (price >= 100) {
    return `₹${(price / 100).toFixed(2)} Cr`;
  }
  return `₹${price.toFixed(2)} Lakh`;
}

export default function PriceProjection({ prices }) {
  const [view, setView] = useState('chart');
  const entries = Object.entries(prices);
  const values = entries.map(([, v]) => v);
  const maxVal = Math.max(...values);

  return (
    <div className="card-level-1 projection-card">
      <div className="section-header-block">
        <div className="projection-title"><IconTile name="chart" /><div>
          <h3 className="section-title-main">Price Trend</h3>
          <p className="section-subtitle-main">Explore the growth projections for your property estimate.</p>
        </div></div>
        <div className="view-tabs" role="tablist" aria-label="Price trend view">
          {['chart', 'table'].map(mode => <button key={mode} type="button" role="tab" aria-selected={view === mode} aria-controls={`price-${mode}`} id={`tab-${mode}`} onClick={() => setView(mode)}>{mode === 'chart' ? 'Chart' : 'Table'}</button>)}
        </div>
      </div>

      <div role="tabpanel" id="price-chart" aria-labelledby="tab-chart" hidden={view !== 'chart'}><div className="projection-chart-container">
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

      </div>
      <div className="table-scroll" role="tabpanel" id="price-table" aria-labelledby="tab-table" hidden={view !== 'table'}><table className="data-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>Growth from 2022</th>
            <th>Estimated Price</th>
            <th>Notes</th>
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
                    {isTarget ? 'Current Value' : 'Past Trend'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table></div>
    </div>
  );
}
