import { Link } from 'react-router-dom';

const paths = {
  home: 'm3 10 9-7 9 7M5 9v12h5v-7h4v7h5V9',
  pin: 'M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0ZM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6',
  chart: 'M5 20V12m7 8V4m7 16V8',
  layers: 'm3 7 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 17l9 5 9-5',
  bolt: 'm13 2-9 12h7l-1 8 10-13h-8l1-7Z',
  users: 'M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3M16 4a4 4 0 0 1 0 8m6 9v-3a4 4 0 0 0-3-4M9 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8',
  building: 'M4 22V6h10v16M14 12h6v10M7 10h4m-4 4h4m-4 4h4M17 16h1m-1 3h1',
  shield: 'm12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6l9-4Zm-4 10 3 3 5-6',
  key: 'M14 3a6 6 0 1 0 4 10L8 23H3v-5l8-8m6-3h.01',
  briefcase: 'M3 7h18v14H3V7Zm5 0V3h8v4M3 12l9 3 9-3',
  school: 'm2 8 10-5 10 5-10 5L2 8Zm4 3v7c4 3 8 3 12 0v-7M22 8v8',
  heart: 'M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-5 5 8 16 8 16S25 10 20 5Z',
  bag: 'M4 7h16l1 15H3L4 7Zm4 0V5a4 4 0 0 1 8 0v2',
  info: 'M12 11v6m0-10h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  crown: 'm2 5 5 5 5-7 5 7 5-5-3 14H5L2 5Z',
  plane: 'm22 2-8 20-3-9-9-3L22 2ZM11 13l6-6',
  sofa: 'M5 11V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4M4 20v-3m16 3v-3M2 10h4v5h12v-5h4v8H2v-8',
  award: 'M8 14 6 22l6-3 6 3-2-8M19 8A7 7 0 1 1 5 8a7 7 0 0 1 14 0',
  lock: 'M5 10h14v12H5V10Zm3 0V6a4 4 0 0 1 8 0v4',
  check: 'm5 12 4 4L19 6',
};

export function Icon({ name = 'home', className = '', ...props }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`ui-icon ${className}`} aria-hidden="true" {...props}><path d={paths[name] || paths.home} /></svg>;
}

export function IconTile({ name, tone = 'blue' }) {
  return <span className={`icon-tile tone-${tone}`}><Icon name={name} /></span>;
}

export function HouseArt({ variant = 'home' }) {
  return <div className={`house-art art-${variant}`} aria-hidden="true">
    <svg viewBox="0 0 500 300" fill="none">
      <path fill="#e4edfc" d="M70 265V128h46v137M125 265V88h44v177M337 265V102h40v163M386 265V145h35v120" />
      <path fill="#dae7fc" d="M185 265V64h46v201M310 265V133h30v132" />
      <path d="M30 268h440" stroke="#d4e1f2" strokeWidth="5" strokeLinecap="round" />
      <path fill="#f8fbff" stroke="#1671ff" strokeWidth="4" d="M153 167h98v98h-98z" />
      <path fill="#1572ff" d="m133 168 69-65 68 65H133Z" />
      <path fill="#f8fbff" stroke="#1268f4" strokeWidth="4" d="M248 111h106v154H248z" />
      <path fill="#1554df" d="m226 113 76-74 76 74H226Z" />
      <path d="M341 80V49h14v46" fill="#1671ff" />
      <rect x="282" y="207" width="30" height="59" rx="6" fill="#1671ff" />
      <path d="M303 235h1" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <g fill="#d7e9ff" stroke="#1671ff" strokeWidth="3"><rect x="167" y="187" width="21" height="30" rx="4" /><rect x="211" y="187" width="21" height="30" rx="4" /><rect x="265" y="138" width="23" height="31" rx="4" /><rect x="315" y="138" width="23" height="31" rx="4" /></g>
      <path d="M276 138v31m-11-16h23m39-15v31m-12-16h23" stroke="#1671ff" strokeWidth="2" />
      <circle cx="301" cy="88" r="9" fill="#b5d4ff" /><path d="M301 79v18m-9-9h18" stroke="#1554df" strokeWidth="2" />
      <g><ellipse cx="99" cy="220" rx="37" ry="43" fill="#5be58b" /><ellipse cx="82" cy="221" rx="25" ry="31" fill="#7ceda0" /><path d="M99 223v44" stroke="#81b18c" strokeWidth="8" strokeLinecap="round" /><ellipse cx="406" cy="217" rx="37" ry="46" fill="#64e590" /><ellipse cx="390" cy="214" rx="24" ry="32" fill="#83eda6" /><path d="M406 222v45" stroke="#81b18c" strokeWidth="8" strokeLinecap="round" /></g>
      <ellipse cx="236" cy="264" rx="18" ry="11" fill="#20d56c" /><ellipse cx="344" cy="264" rx="17" ry="10" fill="#36df7c" />
      {variant === 'about' ? <g transform="translate(335 170)"><path d="m0 0 44-14L88 0v40c0 30-44 51-44 51S0 70 0 40V0Z" fill="white" stroke="#1bce79" strokeWidth="7" /><path d="m25 36 14 14 25-29" stroke="#1671ff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" /></g> : <g transform="translate(280 4)"><path d="M21 0a21 21 0 0 0-21 21c0 17 21 39 21 39s21-22 21-39A21 21 0 0 0 21 0Z" fill="#1671ff" /><circle cx="21" cy="20" r="8" fill="white" /></g>}
      {variant === 'methodology' && <g transform="translate(345 92)"><circle r="35" fill="#f8fbff" stroke="#1671ff" strokeWidth="8" /><path d="m25 25 30 30" stroke="#1671ff" strokeWidth="13" strokeLinecap="round" /><path d="M-15 11V0M0 11V-14M15 11V-22" stroke="#24d77e" strokeWidth="7" /></g>}
    </svg>
    {variant === 'home' && <div className="art-caption">Better Insights<span>Brighter Decisions</span></div>}
  </div>;
}

export function PageHero({ title, accent, description, variant, children, badge }) {
  return <section className={`page-hero ${variant === 'home' ? 'home-hero' : ''}`}>
    <div className="hero-copy">{badge && <span className="eyebrow"><Icon name="pin" />{badge}</span>}<h1>{title} {accent && <span>{accent}</span>}</h1><p>{description}</p>{children}</div>
    <HouseArt variant={variant} />
  </section>;
}

export function Actions({ primary = 'Calculate House Price' }) {
  return <div className="action-row"><Link to="/predict" className="btn-primary-action"><Icon name="chart" />{primary}</Link></div>;
}
