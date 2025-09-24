import { AnimatedReveal } from "./AnimatedReveal";

export function AboutSection() {
  return (
    <section id="about">
      <AnimatedReveal as="div" className="container grid" style={{ gap: "3rem", alignItems: "center" }}>
        <AnimatedReveal as="div" variant="fade-up" distance={36}>
          <AnimatedReveal as="h2" className="section-title" variant="fade-down">
            Crafted in the Canadian Rockies
          </AnimatedReveal>
          <AnimatedReveal as="p" className="section-subtitle" delay={0.1}>
            Based in Canmore, Mountain Mixology was born from a love of alpine adventures and artfully balanced cocktails. Our bartenders bring Michelin-level
            attention to detail to remote mountain lodges, lakeside elopements, and downtown rooftops alike.
          </AnimatedReveal>
          <div className="grid" style={{ gap: "1.5rem" }}>
            <AnimatedReveal as="div" className="card" style={{ background: "var(--surface-card)" }} delay={0.15}>
              <h3 style={{ marginTop: 0 }}>Local ingredients, global technique</h3>
              <p>
                We highlight Rocky Mountain botanicals, house-made syrups, and spirits from Alberta and British Columbia distilleries. Every menu is designed to
                echo the season, venue, and story of your celebration.
              </p>
            </AnimatedReveal>
            <AnimatedReveal as="div" className="card" style={{ background: "var(--surface-card)" }} delay={0.25}>
              <h3 style={{ marginTop: 0 }}>Premium logistics in any terrain</h3>
              <p>
                From portable bar builds to power, ice, and glassware, we handle all bar logistics so you can focus on your guests. Licensed, insured, and prepared
                with weather contingency plans for alpine environments.
              </p>
            </AnimatedReveal>
          </div>
        </AnimatedReveal>
        <AnimatedReveal
          as="div"
          className="card"
          style={{ background: "var(--about-manifesto-bg)", color: "var(--about-manifesto-text)" }}
          variant="fade-up"
          delay={0.2}
        >
          <h3 style={{ marginTop: 0 }}>The Mountain Mixology Manifesto</h3>
          <ul style={{ margin: "1.5rem 0", paddingLeft: "1.2rem", lineHeight: 1.8 }}>
            <li>Hospitality first: every guest feels seen, celebrated, and expertly cared for.</li>
            <li>Craftsmanship always: clarified juices, double-shaken sours, crystal-clear ice, and flawless garnishes.</li>
            <li>Sense of place: cocktails inspired by alpine botanicals, glacier-fed waters, and local producers.</li>
            <li>Flexibility: intimate elopements to 500-guest galas with scalable staffing and bar setups.</li>
          </ul>
          <p style={{ marginBottom: 0 }}>
            We design experiences that mirror the grandeur of the Rockies—polished, memorable, and infused with natural wonder.
          </p>
        </AnimatedReveal>
      </AnimatedReveal>
    </section>
  );
}
