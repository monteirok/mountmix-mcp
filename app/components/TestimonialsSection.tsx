const testimonials = [
  {
    quote:
      "Our guests are still raving about the Campfire Sour station. Mountain Mixology managed bar logistics in a remote lodge with zero stress for our planning team.",
    name: "Sierra & Nate",
    event: "Heli-elopement reception, Banff"
  },
  {
    quote:
      "They built three custom cocktails around our brand story and even incorporated our company colours into the garnish bar. Professional, efficient, and memorable.",
    name: "RBC Wealth Management",
    event: "Corporate retreat welcome night, Lake Louise"
  },
  {
    quote:
      "From the tasting to the final pour, we felt supported. Their team coordinated with our caterer, provided contingency plans for the weather, and kept the bar buzzing all night.",
    name: "Amelia & Priya",
    event: "300-guest wedding, Canmore"
  }
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ background: "linear-gradient(160deg, #0f172a, #1e293b)", color: "white" }}>
      <div className="container">
        <h2 className="section-title" style={{ color: "white" }}>
          Praise from the Peaks
        </h2>
        <p className="section-subtitle" style={{ color: "rgba(241, 245, 249, 0.8)" }}>
          Trusted by couples, planners, and corporate hosts throughout the Rockies.
        </p>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {testimonials.map((testimonial) => (
            <blockquote
              key={testimonial.name}
              className="card"
              style={{
                background: "rgba(15, 23, 42, 0.3)",
                border: "1px solid rgba(148, 163, 184, 0.35)",
                color: "white"
              }}
            >
              <p style={{ fontSize: "1.05rem", fontStyle: "italic" }}>“{testimonial.quote}”</p>
              <footer style={{ marginTop: "1.5rem", fontWeight: 600 }}>{testimonial.name}</footer>
              <span style={{ color: "rgba(241, 245, 249, 0.75)" }}>{testimonial.event}</span>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
