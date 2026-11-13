import { useState, useEffect, useCallback } from 'react';
import { fetchNearbyPlaces } from '../api/predict';
import FacilityCard from './FacilityCard';

export default function NearbySection({ coordinates, location, radius = 5 }) {
  const [places, setPlaces] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPlaces = useCallback(async () => {
    if (!coordinates?.latitude || !coordinates?.longitude) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await fetchNearbyPlaces({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        location,
        radius: radius * 1000,
      });
      setPlaces(data);
    } catch (err) {
      console.warn('Nearby places error:', err);
      setError(
        err.message ||
          'Nearby map services took too long or are temporarily resting.'
      );
    } finally {
      setLoading(false);
    }
  }, [coordinates?.latitude, coordinates?.longitude, location, radius]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  return (
    <div className="nearby-section-container">
      <div className="section-header-block">
        <div>
          <h3 className="section-title-main">Nearby Facilities &amp; Amenities</h3>
          <p className="section-subtitle-main">
            Hospitals, schools, malls, and police stations within {radius} km of{' '}
            <strong>{location}</strong>
          </p>
        </div>

        <div className="nearby-header-badge-wrapper">
          {loading ? (
            <span className="nearby-status-badge loading">
              <span className="radar-dot"></span>
              Scanning Live Map...
            </span>
          ) : error ? (
            <span className="nearby-status-badge error">
              <span>💤</span>
              Map Scout Resting
            </span>
          ) : (
            <span className="nearby-status-badge success">
              <span>✓</span>
              Amenities Loaded
            </span>
          )}
        </div>
      </div>

      {loading && !places && (
        <div className="nearby-loading-wrapper">
          <div className="nearby-scanning-banner">
            <div className="scanner-radar">
              <div className="radar-ring"></div>
              <span className="radar-icon">🧭</span>
            </div>
            <div className="scanner-text">
              <h4>Scouting Neighborhood Amenities...</h4>
              <p>
                Querying live OpenStreetMap for healthcare, education, retail,
                and safety facilities around {location}. This may take a few seconds.
              </p>
            </div>
          </div>

          <div className="facilities-grid skeleton-grid">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="facility-skeleton-card">
                <div className="skeleton-header">
                  <div className="skeleton-icon-box"></div>
                  <div className="skeleton-line-title"></div>
                </div>
                <div className="skeleton-item-row"></div>
                <div className="skeleton-item-row"></div>
                <div className="skeleton-item-row"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="cute-error-box">
          <div className="cute-error-mascot">
            <div className="mascot-avatar-circle">
              <span className="mascot-emoji">🐱💤</span>
            </div>
            <span className="cute-tag">Map Scout Took A Break</span>
          </div>

          <div className="cute-error-content">
            <h4 className="cute-error-heading">
              Oops! Nearby places are taking a little nap...
            </h4>
            <p className="cute-error-text">
              The public map service is currently busy or taking a quick chai
              break. <strong>Don&apos;t worry!</strong> Your house price valuation
              and 5-year growth trajectory are 100% calculated and ready above.
            </p>

            <div className="cute-error-actions">
              <button
                type="button"
                className="btn-cute-retry"
                onClick={loadPlaces}
              >
                <span className="btn-retry-icon">🔄</span>
                <span>Retry Fetching Nearby Places</span>
              </button>

              <a
                href={`https://www.google.com/maps/search/amenities+near+${encodeURIComponent(
                  location
                )}+Bengaluru`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cute-secondary"
              >
                <span>Search on Google Maps</span>
                <span className="btn-arrow">↗</span>
              </a>

              {coordinates && (
                <a
                  href={`https://www.openstreetmap.org/?mlat=${coordinates.latitude}&mlon=${coordinates.longitude}#map=16/${coordinates.latitude}/${coordinates.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cute-secondary"
                >
                  <span>OpenStreetMap</span>
                  <span className="btn-arrow">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {places && (
        <>
          <div className="facilities-grid">
            {['hospitals', 'schools', 'malls', 'police_stations'].map((type) => (
              <FacilityCard key={type} type={type} places={places[type]} />
            ))}
          </div>

          <div className="nearby-footer-refresh-bar">
            <span className="footer-meta-note">
              Found verified nearby amenities within {radius} km
            </span>
          </div>
        </>
      )}
    </div>
  );
}
