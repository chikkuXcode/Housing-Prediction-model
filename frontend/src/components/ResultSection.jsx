import { useEffect, useRef } from 'react';
import PriceProjection from './PriceProjection';
import NearbySection from './NearbySection';

export default function ResultSection({ data }) {
  const sectionRef = useRef(null);
  const { predicted_prices, location, coordinates } = data;

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [data]);

  return (
    <section ref={sectionRef} className="results-container">
      <PriceProjection prices={predicted_prices} />

      <NearbySection
        coordinates={coordinates}
        location={location}
        radius={data.search_radius_km || 5}
      />

    </section>
  );
}
