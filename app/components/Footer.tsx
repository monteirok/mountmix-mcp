import Link from "next/link";

import { AnimatedReveal } from "./AnimatedReveal";

export function Footer() {
  return (
    <footer style={{ background: "var(--section-footer-bg)", color: "rgba(248, 250, 252, 0.85)" }}>
      <AnimatedReveal as="div" className="container" style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <AnimatedReveal as="div" variant="fade-up">
          <h3 style={{ marginTop: 0, color: "white" }}>Mountain Mixology</h3>
          <p>
            Premium craft cocktail catering for weddings, corporate events, and private celebrations across the Canadian Rockies.
          </p>
          <p style={{ marginBottom: 0 }}>
            Based in Canmore, Alberta · Serving Canmore, Banff, Lake Louise, Calgary, and destination venues.
          </p>
        </AnimatedReveal>
        <AnimatedReveal as="div" variant="fade-up" delay={0.1}>
          <h4 style={{ marginTop: 0, color: "white" }}>Connect</h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.5rem" }}>
            <li>
              <Link href="mailto:hello@mountainmixology.ca">hello@mountainmixology.ca</Link>
            </li>
            <li>
              <Link href="tel:+14035550023">+1 (403) 555-0023</Link>
            </li>
            <li>Instagram · @mountainmixology</li>
          </ul>
        </AnimatedReveal>
        <AnimatedReveal as="div" variant="fade-up" delay={0.2}>
          <h4 style={{ marginTop: 0, color: "white" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.5rem" }}>
            <li>
              <Link href="#services">Services</Link>
            </li>
            <li>
              <Link href="#menu">Signature Menu</Link>
            </li>
            <li>
              <Link href="#contact">Get My Custom Quote</Link>
            </li>
          </ul>
        </AnimatedReveal>
      </AnimatedReveal>
      <AnimatedReveal as="div" style={{ marginTop: "2.5rem", textAlign: "center", fontSize: "0.85rem", color: "rgba(248, 250, 252, 0.65)" }}>
        © {new Date().getFullYear()} Mountain Mixology. All rights reserved.
      </AnimatedReveal>
    </footer>
  );
}
