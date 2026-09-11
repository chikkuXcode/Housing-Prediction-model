import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PredictionForm from './components/PredictionForm';
import EstimatedPriceCard from './components/EstimatedPriceCard';
import ResultSection from './components/ResultSection';
import Footer from './components/Footer';
import { usePredict } from './hooks/usePredict';
import './index.css';

export default function App() {
  const { result, loading, error, predict } = usePredict();

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <HeroSection />

        {/* 2-Column Row: Property Details + Estimated Price */}
        <section className="main-interaction-grid" aria-label="Property Valuation Area">
          <PredictionForm onPredict={predict} loading={loading} />
          <EstimatedPriceCard result={result} loading={loading} />
        </section>

        {error && (
          <div className="alert-box-clean" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {result && <ResultSection data={result} />}
      </main>

      <Footer />
    </div>
  );
}
