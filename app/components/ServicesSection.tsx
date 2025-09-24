const services = [
  {
    title: "Weddings & Elopements",
    description:
      "Ceremony to last call, our team supports your entire celebration with welcome cocktails, dinner pairings, and late-night service for guests from 20 to 400.",
    highlights: ["Custom his & hers cocktails", "Champagne towers", "Mini welcome bar for photo sessions"],
    image:
      "https://images.unsplash.com/photo-1527169402691-feff5539e52c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Corporate & Gala Events",
    description:
      "Wow clients and colleagues with interactive cocktail stations, brand-inspired signatures, and efficient bar logistics for conferences, galas, and retreats.",
    highlights: ["Branded ice & garnishes", "Lead capture bar experiences", "Non-alcoholic elixirs"],
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Private Parties & Celebrations",
    description:
      "From milestone birthdays to après-ski soirées, we bring full bar service, premium glassware, and the mountain mood to your home, chalet, or rental property.",
    highlights: ["Curated spirits list", "Food pairing recommendations", "Professional bar setup & teardown"],
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Destination & Outdoor Venues",
    description:
      "Helicopter landings, mountaintop vows, or lakeside lodges—we design portable bars and backup plans for high-altitude celebrations in every season.",
    highlights: ["Weather-ready equipment", "Power & water logistics", "Scalable staffing"],
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
  }
];

const packages = [
  {
    name: "Summit Essentials",
    description: "Signature cocktail duo, beer & wine service, curated garnish kit, and two certified bartenders for up to 125 guests.",
    price: "Starting at $2,450",
    perks: ["Menu planning consultation", "Premium ice & glassware", "Full setup + teardown"],
    badge: "Most Popular"
  },
  {
    name: "Alpine Signature",
    description: "Expanded craft menu with four signatures, deluxe spirit list, bar styling elements, and cocktail hour activation.",
    price: "Starting at $3,600",
    perks: ["Custom-branded menu", "Interactive garnish bar", "Lead bartender + support team"],
    badge: "Signature Experience"
  },
  {
    name: "Pinnacle Bespoke",
    description: "A fully bespoke bar with experiential cocktail theatre, rare spirits, sommelier-selected wine, and lounge enhancements.",
    price: "Custom proposals",
    perks: ["On-site tasting", "Luxury glassware collection", "Logistics coordinator"],
    badge: "Limited Availability"
  }
];

export function ServicesSection() {
  return (
    <section id="services" style={{ background: "linear-gradient(180deg, #f8fafc 0%, #e0f2fe 100%)" }}>
      <div className="container">
        <h2 className="section-title">Services Designed for Every Peak Moment</h2>
        <p className="section-subtitle">
          Choose the service style that fits your celebration, then tailor the cocktail program, staffing, and presentation details with our team.
        </p>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {services.map((service) => (
            <div key={service.title} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                style={{
                  borderRadius: "14px",
                  overflow: "hidden",
                  aspectRatio: "4 / 3",
                  background: `url(${service.image}) center/cover`
                }}
              />
              <div>
                <h3 style={{ marginTop: 0 }}>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <ul style={{ margin: "0 0 0.5rem", paddingLeft: "1.2rem" }}>
                {service.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "4rem" }}>
          <h3 style={{ fontSize: "1.75rem", marginBottom: "1.5rem", textAlign: "center" }}>Package Pathways</h3>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {packages.map((tier) => (
              <div key={tier.name} className="card" style={{ position: "relative", paddingTop: "2.5rem" }}>
                {tier.badge ? (
                  <span
                    className="badge"
                    style={{
                      position: "absolute",
                      top: "1.25rem",
                      right: "1.25rem",
                      background: "rgba(20, 83, 45, 0.18)",
                      color: "var(--color-forest)",
                      fontWeight: 600
                    }}
                  >
                    {tier.badge}
                  </span>
                ) : null}
                <h4 style={{ margin: "0 0 0.75rem" }}>{tier.name}</h4>
                <p style={{ color: "var(--color-ink-soft)", marginTop: 0 }}>{tier.description}</p>
                <p style={{ fontWeight: 700, fontSize: "1.1rem" }}>{tier.price}</p>
                <ul style={{ margin: "1rem 0 0", paddingLeft: "1.1rem", display: "grid", gap: "0.4rem" }}>
                  {tier.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
