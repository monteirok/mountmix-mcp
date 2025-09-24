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
      <div className="container grid" style={{ gap: "3rem", alignItems: "center" }}>
        <div>
          <h2 className="section-title">Service Area & Logistics</h2>
          <p className="section-subtitle">
            Mountain Mixology serves the Canadian Rockies and Calgary region with swift communication and thoughtful planning. Expect a response within 24 hours
            and a collaborative discovery call to align on vision, guest count, and venue logistics.
          </p>
          <div className="card" style={{ background: "linear-gradient(135deg, #0f766e, #134e4a)", color: "white" }}>
            <h3 style={{ marginTop: 0 }}>What We Handle</h3>
            <ul style={{ margin: "1rem 0", paddingLeft: "1.2rem", lineHeight: 1.8 }}>
              <li>Venue compliance, permits, and insurance documentation</li>
              <li>Bar schematics, power requirements, and equipment transport</li>
              <li>Ice management, water sourcing, and waste removal in remote sites</li>
              <li>Backup plans for weather shifts, altitude, and outdoor restrictions</li>
            </ul>
            <p style={{ marginBottom: 0 }}>You focus on the view—we’ll keep every glass full.</p>
          </div>
        </div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          {locations.map((location) => (
            <div key={location.area} className="card">
              <h3 style={{ marginTop: 0 }}>{location.area}</h3>
              <p style={{ color: "var(--color-ink-soft)" }}>{location.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
