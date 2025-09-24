import { AnimatedReveal } from "./AnimatedReveal";

const cocktails = [
  {
    name: "Rocky Mountain Old Fashioned",
    description:
      "Smoked Alberta rye, spruce tip bitters, maple demerara, charred orange. Served over a glacier-clear hand-cut cube.",
    price: "$17"
  },
  {
    name: "Alpine Gin Garden",
    description:
      "Park Distillery gin, cucumber cordial, alpine herb syrup, citrus mist, wildflower garnish for an aromatic sip.",
    price: "$16"
  },
  {
    name: "Summit Punch",
    description:
      "Huckleberry-infused vodka, sparkling rosé, yuzu, mountain berries, and edible blooms. Perfect for receptions.",
    price: "$15"
  },
  {
    name: "Campfire Sour",
    description:
      "Smoked bourbon, roasted marshmallow syrup, lemon, aquafaba foam, and cedar smoke finish for cozy evenings.",
    price: "$16"
  },
  {
    name: "Glacier Garden Zero-Proof",
    description:
      "Evergreen tonic, alpine botanicals, citrus, and clarified apple. Proof-free and packed with mountain character.",
    price: "$13"
  },
  {
    name: "Canmore Espresso Trail",
    description:
      "Local espresso, vanilla bean vodka, maple cream, cacao bitters, finished with grated chocolate and pine sugar.",
    price: "$16"
  }
];

const enhancements = [
  "Custom cocktail concepting & tastings",
  "Premium glassware upgrade suites",
  "Seasonal garnish station & edible florals",
  "Coffee & dessert bar integration",
  "Wine, beer, and spirit curation"
];

export function SignatureMenu() {
  return (
    <section id="menu">
      <AnimatedReveal as="div" className="container" variant="fade-up">
        <AnimatedReveal as="h2" className="section-title" variant="fade-down">
          Signature Cocktail Collection
        </AnimatedReveal>
        <AnimatedReveal as="p" className="section-subtitle" delay={0.1}>
          Our menus rotate with the seasons and your story. Explore guest favourites below, then collaborate with us to craft a bespoke lineup for your event.
        </AnimatedReveal>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {cocktails.map((cocktail, index) => (
            <AnimatedReveal
              key={cocktail.name}
              as="div"
              className="card"
              style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
              delay={0.15 + index * 0.07}
            >
              <h3 style={{ margin: "0 0 0.5rem" }}>{cocktail.name}</h3>
              <p style={{ color: "var(--color-ink-soft)", flexGrow: 1 }}>{cocktail.description}</p>
              <span style={{ fontWeight: 700, color: "var(--color-forest)" }}>{cocktail.price}</span>
            </AnimatedReveal>
          ))}
        </div>
        <AnimatedReveal as="div" className="card" style={{ marginTop: "3rem", background: "var(--enhancement-card-bg)" }} delay={0.3}>
          <h3 style={{ marginTop: 0 }}>Enhance the Experience</h3>
          <p style={{ color: "var(--color-ink-soft)" }}>Layer in the details that make your bar unforgettable:</p>
          <ul style={{ display: "grid", gap: "0.5rem", margin: 0, paddingLeft: "1.2rem" }}>
            {enhancements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </AnimatedReveal>
      </AnimatedReveal>
    </section>
  );
}
