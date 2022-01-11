import { LandingPreview } from './LandingPreview';

export function LandingList({ landings }) {
  return (
    <section className="landing-list simple-cards-grid">
      {landings.map((landing) => (
        <LandingPreview landing={landing} key={landing.id} />
      ))}
    </section>
  );
}
