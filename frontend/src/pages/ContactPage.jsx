import { useEffect } from 'react';
import { HouseArt, Icon } from '../components/Design';
import './ContactPage.css';

function AboutMark({ name }) {
  return <span className="about-section-icon">{name === 'database' ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></svg> : name === 'document' ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 12h8M8 16h8" /></svg> : <Icon name={name} />}</span>;
}

const terms = [
  ['Use of Service', 'This tool is for general informational purposes only.'],
  ['Accuracy', 'Predictions use historical data and a trained model, and may differ from actual market values.'],
  ['Data Usage', 'Property details are used to generate predictions and look up nearby facilities.'],
  ['Limitations', 'Estimates do not replace a professional appraisal or legal, financial or tax advice.'],
  ['Updates', 'Model information, data sources and service details may be updated over time.'],
];

export default function ContactPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  return <div className="about-compact-page">
    <header className="about-page-heading"><h1>About &amp; <span>Terms</span></h1><p>Learn about RealEstate and the terms for using our service.</p></header>

    <section className="about-panel about-overview" aria-labelledby="about-overview-heading"><AboutMark name="home" /><div className="about-overview-copy"><h2 id="about-overview-heading">About RealEstate</h2><p>RealEstate estimates a property’s value using a machine learning model and provides neighbourhood information, including nearby schools, hospitals, shopping areas and police stations, to help you make more informed real estate decisions.</p></div><div className="about-house-illustration" aria-hidden="true"><HouseArt variant="process" /></div></section>

    <section className="about-panel about-model" aria-labelledby="about-model-heading"><AboutMark name="database" /><div className="about-panel-body"><h2 id="about-model-heading">Our Prediction Model</h2><dl className="about-model-statistics"><div className="about-model-stat"><span className="about-stat-icon"><Icon name="layers" /></span><div><dt>Source housing records</dt><dd>13,320</dd></div></div><div className="about-model-stat"><span className="about-stat-icon"><Icon name="pin" /></span><div><dt>Location categories</dt><dd>242</dd></div></div><div className="about-model-stat about-model-name"><span className="about-stat-icon"><Icon name="chart" /></span><div><dt>Model used for price prediction</dt><dd>Linear Regression</dd></div></div></dl></div></section>

    <section className="about-panel about-terms" aria-labelledby="about-terms-heading"><AboutMark name="document" /><div className="about-panel-body"><h2 id="about-terms-heading">Terms &amp; Conditions</h2><ul>{terms.map(([title, description]) => <li key={title}><strong>{title}:</strong> {description}</li>)}</ul></div></section>
  </div>;
}
