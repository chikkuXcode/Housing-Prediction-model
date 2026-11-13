import { PageHero, Actions, IconTile } from './Design';
export default function HeroSection() {
  return <><PageHero variant="home" badge="Bengaluru" title={<>Find the <span>Right Price</span> for Your Property</>} description="Get property estimates, growth projections, and nearby amenities for your home in Bengaluru. Make smarter real estate decisions."><Actions /></PageHero>
  <section className="metrics-strip" aria-label="Platform features">{[['building','13,000+','Properties Analyzed'],['users','240+','Localities Covered'],['bolt','Instant Estimates','Free property valuation']].map(([icon,value,label],i)=><div className="metric-item" key={label}><IconTile name={icon} tone={['blue','green','purple'][i]}/><div><span className="metric-value">{value}</span><span className="metric-label">{label}</span></div></div>)}</section></>;
}
