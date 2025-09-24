import { AnimatedReveal } from "./AnimatedReveal";

const reasons = [
  {
    title: "Licensed & Insured",
    description: "Fully covered for events in Alberta and British Columbia with experienced, ProServe-certified bartenders."
  },
  {
    title: "Local Sourcing",
    description: "Partnerships with Rocky Mountain distilleries, farmers, and foragers keep ingredients fresh and regional."
  },
  {
    title: "Professional Equipment",
    description: "Portable backbars, ice wells, glassware, and power solutions tailored to indoor and outdoor venues."
  },
  {
    title: "Custom Menu Design",
    description: "Collaborative tastings and concept boards ensure every sip aligns with your story and brand."
  },
  {
    title: "Flexible Packages",
    description: "Scale staffing, bar size, and beverage offerings based on guest count, venue, and season."
  },
  {
    title: "Dedicated Planning",
    description: "Timeline reviews, vendor coordination, and responsive communication within 24 hours."
  }
];

export function WhyChooseUs() {
  return (
    <section id="why-us" style={{ background: "var(--section-why-bg)" }}>
      <AnimatedReveal as="div" className="container" variant="fade-up">
        <AnimatedReveal as="h2" className="section-title" variant="fade-down">
          Why Mountain Mixology
        </AnimatedReveal>
        <AnimatedReveal as="p" className="section-subtitle" delay={0.1}>
          We treat every event like a once-in-a-lifetime summit. Your guests deserve an experience that feels intentional, luxurious, and uniquely Rocky Mountain.
        </AnimatedReveal>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          {reasons.map((reason, index) => (
            <AnimatedReveal key={reason.title} as="div" className="card" style={{ minHeight: "200px" }} delay={0.12 + index * 0.08}>
              <h3 style={{ marginTop: 0 }}>{reason.title}</h3>
              <p style={{ color: "var(--color-ink-soft)" }}>{reason.description}</p>
            </AnimatedReveal>
          ))}
        </div>
      </AnimatedReveal>
    </section>
  );
}
