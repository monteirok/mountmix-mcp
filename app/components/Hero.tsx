import Link from "next/link";

import { AnimatedReveal } from "./AnimatedReveal";

const stats = [
  {
    heading: "320+",
    copy: "Mountain celebrations elevated with handcrafted cocktails."
  },
  {
    heading: "Canmore · Banff · Calgary",
    copy: "Serving the Rockies with portable bars, licensed bartenders, and reliable logistics."
  },
  {
    heading: "$13–$17",
    copy: "Per-signature cocktail pricing to anchor your planning and budgeting."
  }
];

export function Hero() {
  return (
    <header className="hero" id="top">
      <AnimatedReveal as="div" className="container" variant="fade-down" distance={32}>
        <AnimatedReveal as="span" className="badge" variant="fade" delay={0.1}>
          Premium craft cocktail catering
        </AnimatedReveal>
        <AnimatedReveal as="h1" variant="fade-down" delay={0.2} distance={40}>
          Elevated Cocktails, Mountain Views
        </AnimatedReveal>
        <AnimatedReveal as="p" variant="fade" delay={0.3}>
          Mountain Mixology brings bespoke cocktail bars to weddings, corporate galas, and private celebrations across the Canadian Rockies. We combine
          locally sourced ingredients, expert technique, and warm hospitality to turn every pour into a moment worth remembering.
        </AnimatedReveal>
        <AnimatedReveal as="div" className="hero-cta" delay={0.35} variant="fade-up">
          <Link href="#contact" className="btn-primary">
            Get My Custom Quote
          </Link>
          <Link href="#menu" className="btn-secondary">
            View Signature Menu
          </Link>
        </AnimatedReveal>
        <div className="hero-stats">
          {stats.map((stat, index) => (
            <AnimatedReveal key={stat.heading} as="div" className="hero-stat" delay={0.45 + index * 0.1} variant="scale">
              <h3>{stat.heading}</h3>
              <p>{stat.copy}</p>
            </AnimatedReveal>
          ))}
        </div>
      </AnimatedReveal>
    </header>
  );
}
