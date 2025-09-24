import { AnimatedReveal } from "./AnimatedReveal";

const locations = [
  {
    area: "Canmore & Kananaskis",
    details: "Home base with rapid response and venue walk-throughs available."
  },
  {
    area: "Banff & Lake Louise",
    details: "Permits, park regulations, and supplier coordination handled for you."
  },
  {
    area: "Calgary & Foothills",
    details: "Corporate towers, private estates, and urban rooftops with ease."
  },
  {
    area: "Beyond the Rockies",
    details: "Inquire about travel for Golden, Revelstoke, and other destination venues."
  }
];

export function ServiceArea() {
  return (
    <section id="service-area">
      <AnimatedReveal as="div" className="container grid" style={{ gap: "3rem", alignItems: "center" }}>
        <AnimatedReveal as="div" variant="fade-up" distance={36}>
          <AnimatedReveal as="h2" className="section-title" variant="fade-down">
            Service Area & Logistics
          </AnimatedReveal>
          <AnimatedReveal as="p" className="section-subtitle" delay={0.1}>
            Mountain Mixology serves the Canadian Rockies and Calgary region with swift communication and thoughtful planning. Expect a response within 24 hours
            and a collaborative discovery call to align on vision, guest count, and venue logistics.
          </AnimatedReveal>
          <AnimatedReveal
            as="div"
            className="card"
            style={{ background: "var(--service-area-feature-bg)", color: "var(--service-area-feature-text)" }}
            delay={0.2}
          >
            <h3 style={{ marginTop: 0 }}>What We Handle</h3>
            <ul style={{ margin: "1rem 0", paddingLeft: "1.2rem", lineHeight: 1.8 }}>
              <li>Venue compliance, permits, and insurance documentation</li>
              <li>Bar schematics, power requirements, and equipment transport</li>
              <li>Ice management, water sourcing, and waste removal in remote sites</li>
              <li>Backup plans for weather shifts, altitude, and outdoor restrictions</li>
            </ul>
            <p style={{ marginBottom: 0 }}>You focus on the view—we’ll keep every glass full.</p>
          </AnimatedReveal>
        </AnimatedReveal>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {locations.map((location, index) => (
            <AnimatedReveal key={location.area} as="div" className="card" delay={0.15 + index * 0.1}>
              <h3 style={{ marginTop: 0 }}>{location.area}</h3>
              <p style={{ color: "var(--color-ink-soft)" }}>{location.details}</p>
            </AnimatedReveal>
          ))}
        </div>
      </AnimatedReveal>
    </section>
  );
}
