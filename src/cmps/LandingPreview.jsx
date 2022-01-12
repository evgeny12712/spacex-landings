import { Link } from 'react-router-dom';

export function LandingPreview({ landing }) {
  return (
    <article className="landing-preview">
      <Link to={`/landing/${landing.id}`} className="info flex column auto-center">
        <img src={landing.tagUrl} alt="landing-img" />
        <h2>{landing.name}</h2>
      </Link>
    </article>
  );
}
