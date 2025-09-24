const galleryItems = [
  {
    title: "Banff Springs Wedding",
    description: "Champagne tower and dual signature cocktails with mountain view terrace.",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Lake Louise Corporate Retreat",
    description: "Interactive garnish market featuring alpine botanicals and mocktail pairings.",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Canmore Chalet Après",
    description: "Campfire Sour bar with smoked cocktails and cozy lounge setup.",
    image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Calgary Rooftop Launch",
    description: "Branded Alpine Gin Garden with skyline views and live ice carving.",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80"
  }
];

export function GallerySection() {
  return (
    <section id="gallery" style={{ background: "var(--color-snow)" }}>
      <div className="container">
        <h2 className="section-title">Portfolio Highlights</h2>
        <p className="section-subtitle">
          From mountaintop vows to urban soirées, Mountain Mixology curates cocktail environments that photograph as beautifully as they taste.
        </p>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {galleryItems.map((item) => (
            <figure
              key={item.title}
              className="card"
              style={{
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ aspectRatio: "4/3", background: `url(${item.image}) center/cover` }} />
              <figcaption style={{ padding: "1.5rem" }}>
                <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                <p style={{ color: "var(--color-ink-soft)" }}>{item.description}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
