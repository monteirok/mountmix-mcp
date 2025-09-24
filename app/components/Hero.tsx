import Link from "next/link";

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="container">
        <span className="badge">Premium craft cocktail catering</span>
        <h1>Elevated Cocktails, Mountain Views</h1>
        <p>
          Mountain Mixology brings bespoke cocktail bars to weddings, corporate galas, and private celebrations across the Canadian Rockies. We combine
          locally sourced ingredients, expert technique, and warm hospitality to turn every pour into a moment worth remembering.
        </p>
        <div className="hero-cta">
          <Link href="#contact" className="btn-primary">
            Get My Custom Quote
          </Link>
          <Link href="#menu" className="btn-secondary">
            View Signature Menu
          </Link>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <h3>320+</h3>
            <p>Mountain celebrations elevated with handcrafted cocktails.</p>
          </div>
          <div className="hero-stat">
            <h3>Canmore · Banff · Calgary</h3>
            <p>Serving the Rockies with portable bars, licensed bartenders, and reliable logistics.</p>
          </div>
          <div className="hero-stat">
            <h3>$13–$17</h3>
            <p>Per-signature cocktail pricing to anchor your planning and budgeting.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
