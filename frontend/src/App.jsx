import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PredictPage from './pages/PredictPage';
import AnalyticsPage from './pages/AnalyticsPage';
import MethodologyPage from './pages/MethodologyPage';
import ContactPage from './pages/ContactPage';
import { usePredict } from './hooks/usePredict';
import './index.css';

export default function App() {
  const { result, loading, error, predict, clear } = usePredict();

  return (
    <div className="app-shell">
      <Navbar />

      <main className="container main-content-area">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/predict"
            element={
              <PredictPage
                result={result}
                loading={loading}
                error={error}
                predict={predict}
                onClearResult={clear}
              />
            }
          />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
