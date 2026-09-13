import { useEffect } from 'react';
import PredictionForm from '../components/PredictionForm';
import ResultSection from '../components/ResultSection';

export default function PredictPage({ result, loading, error, predict, onClearResult }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-badge-row">
          <span className="label-badge">Property Valuation</span>
          <span className="status-pill-live">Instant Estimate</span>
        </div>
        <h1 className="page-title">Calculate House Price</h1>
        <p className="page-subtitle">
          Fill in the property details below to calculate the estimated market price and explore surrounding facilities like schools, hospitals, and shopping centers.
        </p>
      </div>

      {result && (
        <div className="valuation-banner-bar">
          <div className="banner-bar-left">
            <span className="banner-dot"></span>
            <span>Price Estimated Successfully for <strong>{result.location}</strong></span>
          </div>
          <button
            type="button"
            className="btn-text-action"
            onClick={onClearResult}
          >
            Calculate Another House &times;
          </button>
        </div>
      )}

      <PredictionForm onPredict={predict} loading={loading} />

      {error && (
        <div className="error-banner" role="alert">
          <span>&bull;</span> {error}
        </div>
      )}

      {result && (
        <div className="results-wrapper">
          <ResultSection data={result} />
        </div>
      )}
    </div>
  );
}
