import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PredictionForm from './components/PredictionForm';
import ResultSection from './components/ResultSection';
import Footer from './components/Footer';
import { usePredict } from './hooks/usePredict';
import './index.css';

export default function App() {
  const { result, loading, error, predict } = usePredict();

  return (
    <>
      <Navbar />

      <main className="container">
        <HeroSection />
        <PredictionForm onPredict={predict} loading={loading} />

        {error && (
          <div className="error-banner">
            <span>&bull;</span> {error}
          </div>
        )}

        {result && <ResultSection data={result} />}
      </main>

      <Footer />
    </>
  );
}
