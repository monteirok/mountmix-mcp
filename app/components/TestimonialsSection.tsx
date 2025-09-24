import { AnimatedReveal } from "./AnimatedReveal";

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
    <section id="testimonials" style={{ background: "var(--section-testimonials-bg)", color: "white" }}>
      <AnimatedReveal as="div" className="container" variant="fade-up">
        <AnimatedReveal as="h2" className="section-title" style={{ color: "white" }} variant="fade-down">
          Praise from the Peaks
        </AnimatedReveal>
        <AnimatedReveal as="p" className="section-subtitle" style={{ color: "rgba(241, 245, 249, 0.8)" }} delay={0.1}>
          Trusted by couples, planners, and corporate hosts throughout the Rockies.
        </AnimatedReveal>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
          {testimonials.map((testimonial, index) => (
            <AnimatedReveal
              key={testimonial.name}
              as="blockquote"
              className="card"
              style={{
                background: "var(--testimonial-card-bg)",
                border: "1px solid var(--testimonial-card-border)",
                color: "white"
              }}
              delay={0.15 + index * 0.1}
            >
              <p style={{ fontSize: "1.05rem", fontStyle: "italic" }}>“{testimonial.quote}”</p>
              <footer style={{ marginTop: "1.5rem", fontWeight: 600 }}>{testimonial.name}</footer>
              <span style={{ color: "rgba(241, 245, 249, 0.75)" }}>{testimonial.event}</span>
            </AnimatedReveal>
          ))}
        </div>
      </AnimatedReveal>
    </section>
  );
}
