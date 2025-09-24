import { AnimatedReveal } from "./AnimatedReveal";

const steps = [
  {
    title: "Discover",
    description: "We learn about your celebration, guest list, and venue logistics, then align on the vibe you want to create.",
    duration: "Timeline: within 48 hours of inquiry"
  },
  {
    title: "Design",
    description: "Our mixologists craft a custom menu with seasonal ingredients, mocktail options, and presentation concepts.",
    duration: "Includes optional tasting in Canmore or virtual mixology kit"
  },
  {
    title: "Deliver",
    description: "We coordinate staffing, rentals, and day-of logistics. Onsite, our team manages setup, service, and teardown flawlessly.",
    duration: "Event-day concierge with planner collaboration"
  }
];

export function ExperiencePlanner() {
  return (
    <section id="process" style={{ background: "var(--section-process-bg)" }}>
      <AnimatedReveal as="div" className="container" variant="fade-up">
        <AnimatedReveal as="h2" className="section-title" variant="fade-down">
          How We Elevate Every Pour
        </AnimatedReveal>
        <AnimatedReveal as="p" className="section-subtitle" delay={0.1}>
          From your first inquiry to final cheers, our process is designed to make bar planning seamless, transparent, and inspired by the Rockies.
        </AnimatedReveal>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {steps.map((step, index) => (
            <AnimatedReveal key={step.title} as="div" className="card" delay={0.15 + index * 0.1} variant="fade-up">
              <span className="badge">Step {index + 1}</span>
              <h3 style={{ marginTop: "1rem" }}>{step.title}</h3>
              <p style={{ color: "var(--color-ink-soft)" }}>{step.description}</p>
              <p style={{ fontSize: "0.9rem", color: "var(--color-gold)", fontWeight: 600 }}>{step.duration}</p>
            </AnimatedReveal>
          ))}
        </div>
      </AnimatedReveal>
    </section>
  );
}
