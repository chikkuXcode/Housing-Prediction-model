import { Link } from 'react-router-dom';
import { Icon, IconTile } from '../components/Design';
import dusk from '../assets/home/bengaluru-dusk.jpg';
import lake from '../assets/home/bengaluru-lake.jpg';
import street from '../assets/home/bengaluru-street.jpg';
import night from '../assets/home/bengaluru-night.jpg';
import './HomePage.css';

const steps = [
  ['home', 'Enter Property Details', 'Area, bedrooms, bathrooms, balconies and locality.'],
  ['layers', 'Market Analysis', 'The trained model evaluates your property details.'],
  ['chart', 'Get Estimate', 'View your prediction, growth projections and nearby amenities.'],
];

const features = [
  ['bolt', 'Instant Valuation', 'Get a property estimate based on the details you provide.'],
  ['pin', 'Neighbourhood Insights', 'Explore schools, hospitals, shopping and daily conveniences.'],
  ['chart', 'Growth Trends', 'View growth projections for your predicted property value.'],
  ['layers', '240+ Localities', 'Explore established and emerging areas across Bengaluru.'],
];

// Neighbourhood photographs are illustrative Bengaluru views, not property listings.
const localities = [
  ['Whitefield', 'Explore the neighbourhood', lake, 'photo-lake'],
  ['Indira Nagar', 'Discover nearby amenities', street, 'photo-street'],
  ['HSR Layout', 'Start a property estimate', dusk, 'photo-city'],
  ['Koramangala', 'Explore the neighbourhood', night, 'photo-city-alt'],
];

export default function HomePage() {
  return <div className="photo-home">
    <section className="photo-hero" aria-labelledby="home-heading">
      <div className="home-inner hero-layout">
        <div className="photo-hero-copy">
          <span className="intelligence-badge"><Icon name="pin" />Bengaluru Real Estate Intelligence</span>
          <h1 id="home-heading">Know the <span>Right Price</span><br />for Any Property</h1>
          <p>Property price prediction, growth projections,<br className="desktop-break" /> and neighbourhood insights for smarter<br className="desktop-break" /> real estate decisions in Bengaluru.</p>
          <Link className="photo-white-button" to="/predict">Get Property Estimate <span aria-hidden="true">→</span></Link>
        </div>

        <aside className="intelligence-card" aria-label="About your property estimate">
          <div className="intelligence-card-top"><span className="glass-icon"><Icon name="home" /></span><span className="glass-live"><span />Property Intelligence</span></div>
          <h2>Your property. <br />Your personalised estimate.</h2>
          <p>Built around your location, area<br />and property configuration.</p>
          <div className="glass-details"><span><Icon name="pin" />Locality</span><span><Icon name="home" />Property details</span></div>
          <Link to="/predict" className="glass-link">Enter details to get started <span aria-hidden="true">↗</span></Link>
        </aside>

        <div className="photo-hero-stats" aria-label="Platform features">
          {[['chart', '13,000+', 'Properties Analyzed'], ['pin', '240+', 'Localities'], ['chart', '5-Year', 'Growth Projections']].map(([icon, value, label]) => <div className="photo-stat" key={label}><span className="photo-stat-icon"><Icon name={icon} /></span><div><strong>{value}</strong><span>{label}</span></div></div>)}
        </div>
      </div>
    </section>

    <section className="photo-trust-strip" aria-label="Platform approach"><div className="home-inner"><strong>Built for smarter real estate decisions</strong><span><Icon name="layers" />Model-Based</span><span><Icon name="shield" />Data Driven</span><span><Icon name="bolt" />Easy to Use</span></div></section>

    <section className="photo-workflow" id="home-how-it-works"><div className="home-inner home-section-split">
      <div className="photo-section-intro"><span className="blue-eyebrow">How It Works</span><h2>Get a Property Estimate <br />in 3 Simple Steps</h2><p>A simple process to explore your property’s estimated value in Bengaluru.</p></div>
      <div className="photo-step-grid">{steps.map(([icon, title, text], index) => <article className="photo-step" key={title}><span className={`photo-step-number step-tone-${index}`}>{index + 1}</span><Icon name={icon} /><h3>{title}</h3><p>{text}</p>{index < 2 && <span className="photo-step-arrow" aria-hidden="true">→</span>}</article>)}</div>
    </div></section>

    <section className="photo-features" id="home-features"><div className="home-inner home-section-split">
      <div className="photo-section-intro"><span className="blue-eyebrow">Why RealEstate</span><h2>More Than Just a <br />Price Estimate</h2><p>A neighbourhood view to help you buy, sell, or explore with confidence.</p></div>
      <div className="photo-feature-grid">{features.map(([icon, title, text], index) => <article className="photo-feature" key={title}><IconTile name={icon} tone={index === 1 || index === 2 ? 'green' : 'blue'} /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    </div></section>

    <section className="photo-localities" id="home-localities"><div className="home-inner">
      <span className="blue-eyebrow">Explore</span><div className="photo-locality-heading"><div><h2>Popular Localities in Bengaluru</h2><p>Choose a neighbourhood to begin your own property prediction.</p></div></div>
      <div className="photo-locality-grid">{localities.map(([name, description, image, imageClass]) => <Link to={`/predict?location=${encodeURIComponent(name)}`} className="photo-locality" key={name} aria-label={`Predict a property price in ${name}`}><img className={imageClass} src={image} alt="" loading="lazy" width="600" height="400" /><span className="photo-locality-copy"><strong>{name}</strong><span>{description}</span></span><span className="photo-locality-arrow" aria-hidden="true">→</span></Link>)}</div>
    </div></section>
  </div>;
}
