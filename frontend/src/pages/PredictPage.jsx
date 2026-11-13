import { useEffect } from 'react';
import PredictionForm from '../components/PredictionForm';
import ResultSection from '../components/ResultSection';
import EstimatedPriceCard from '../components/EstimatedPriceCard';
import { PageHero } from '../components/Design';

export default function PredictPage({ result, loading, error, predict, onClearResult }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="page-container">
      <PageHero variant="predict" title="Calculate Your" accent="Property Value" description="Get an estimated property price based on its location, size and key details. Explore the neighbourhood around it." />

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

      <div className="prediction-grid">
        <PredictionForm onPredict={predict} loading={loading} />
        <EstimatedPriceCard result={result} loading={loading} />
      </div>

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
