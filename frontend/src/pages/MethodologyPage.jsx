import { useEffect } from 'react';
import { HouseArt, Icon } from '../components/Design';
import './MethodologyPage.css';

function PropertyPreview() {
  return <div className="process-property-preview" aria-hidden="true">{['pin', 'home', 'sofa'].map((icon, index) => <div key={icon}><Icon name={icon} /><span style={{ width: `${[95, 75, 100][index]}%` }} /></div>)}</div>;
}

function ProjectionPreview() {
  return <div className="process-projection-preview" aria-hidden="true"><span className="projection-preview-label">Growth projections</span><svg viewBox="0 0 180 90" fill="none"><defs><linearGradient id="process-chart-wash" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#0868f9" stopOpacity=".2" /><stop offset="1" stopColor="#0868f9" stopOpacity="0" /></linearGradient></defs><path d="M10 76C27 66 31 58 48 61S72 52 88 51 111 40 128 35 148 24 170 12V87H10Z" fill="url(#process-chart-wash)" /><path d="M10 76C27 66 31 58 48 61S72 52 88 51 111 40 128 35 148 24 170 12" stroke="#0868f9" strokeWidth="2" />{[[10,76],[48,61],[88,51],[128,35],[170,12]].map(([x,y]) => <circle key={x} cx={x} cy={y} r="3" fill="white" stroke="#0868f9" strokeWidth="1.5" />)}</svg></div>;
}

function NeighbourhoodPreview() {
  return <div className="process-map-preview" aria-hidden="true"><svg className="process-map-streets" viewBox="0 0 200 120" fill="none"><path d="m-10 20 220 67M-10 76 210 25M25-10l51 150M171-10 94 140M-10 105l220-2M-10 48h220" stroke="white" strokeWidth="8" /></svg><span className="map-home"><Icon name="home" /></span><span className="map-school"><Icon name="school" /></span><span className="map-hospital"><Icon name="heart" /></span><span className="map-shopping"><Icon name="bag" /></span><span className="map-safety"><Icon name="shield" /></span></div>;
}

const steps = [
  { icon: 'key', title: 'Tell Us About the Property', description: 'Enter the location, area, BHK and other basic details.', Preview: PropertyPreview },
  { icon: 'layers', title: 'We Estimate the Price', description: 'A model trained on housing data calculates a property estimate and shows future price projections.', Preview: ProjectionPreview },
  { icon: 'pin', title: 'Explore the Neighbourhood', description: 'See places like schools, hospitals, shopping areas and police stations near the property.', Preview: NeighbourhoodPreview },
];

export default function MethodologyPage() {
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);

  return <div className="how-page">
    <section className="how-introduction" aria-labelledby="how-heading">
      <span className="how-eyebrow">How It Works</span>
      <h1 id="how-heading">A Simple Process<br />from Details to<br /><span>Property Insights</span></h1>
      <p>Enter a few details about a property and get an estimated price along with information about the surrounding area.</p>
      <div className="how-illustration" aria-hidden="true"><div className="how-art-backdrop" /><HouseArt variant="process" /><div className="how-amenities-note">{[['school','Schools'],['heart','Hospitals'],['bag','Shopping'],['shield','Police']].map(([icon,label]) => <span key={icon}><Icon name={icon} />{label}</span>)}</div><div className="how-model-note"><Icon name="chart" /><span>Property<br /><strong>Insights</strong></span></div></div>
    </section>

    <section className="how-timeline" aria-label="Property prediction process">
      <ol>{steps.map(({ icon, title, description, Preview }, index) => <li className={`how-step how-step-${index + 1}`} key={title}><span className="how-timeline-icon"><Icon name={icon} /></span><article className="how-step-card"><div className="how-step-copy"><h2>{index + 1}. {title}</h2><p>{description}</p></div><Preview /></article></li>)}</ol>
      <div className="how-results"><span className="how-timeline-icon how-complete"><Icon name="check" /></span><div className="how-results-card"><span className="how-results-icon"><Icon name="chart" /></span><div><h2>Get Your Results</h2><p>A property estimate with growth projections and nearby facilities — all in one place.</p></div></div></div>
    </section>
  </div>;
}
