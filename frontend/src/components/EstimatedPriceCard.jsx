import LocationInfo from './LocationInfo';
import { IconTile } from './Design';
function formatPrice(price) {
  if (price >= 100) {
    return `₹${(price / 100).toFixed(2)} Crore`;
  }
  return `₹${price.toFixed(2)} Lakh`;
}

export default function EstimatedPriceCard({ result, loading }) {
  return <aside className="card-level-1 estimate-card" aria-label="Property estimate" aria-live="polite">
    <div className="estimate-top"><IconTile name="chart" tone="purple" /><span className="estimate-top-badge">Estimated Property Price</span></div>
    {result ? <><div className="estimate-price tnum">{formatPrice(result.predicted_prices['2026'])}</div><strong className="estimate-locality">{result.location}</strong><p className="estimate-note">Estimated value · 2026</p><LocationInfo coordinates={result.coordinates} /></> : <div className="estimate-placeholder"><IconTile name="home" /><h2>{loading ? 'Preparing Your Estimate' : 'Ready for Valuation'}</h2><p>{loading ? 'Calculating from your property details. Your estimate will appear here.' : 'Enter the property details and select Predict House Price to see your estimate and neighbourhood insights.'}</p><span className="estimate-helper">No price is shown until you request a prediction.</span></div>}
  </aside>;
}
