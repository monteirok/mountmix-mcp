import Link from "next/link";

import { AnimatedReveal } from "./AnimatedReveal";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { href: "#about", label: "Our Story" },
  { href: "#services", label: "Services" },
  { href: "#menu", label: "Signature Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Book Us" }
];

export function Navigation() {
  return (
    <nav>
      <AnimatedReveal as="div" className="nav-inner" variant="fade-down" distance={16} once>
        <Link href="#top" aria-label="Mountain Mixology home" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
          Mountain Mixology
        </Link>
        <div className="nav-groups">
          <div className="nav-links">
            {links.map((link, index) => (
              <Link key={link.href} href={link.href} style={{ transitionDelay: `${index * 0.05}s` }} className="nav-link-item">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="nav-actions">
            <Link href="#contact" className="btn-primary" style={{ padding: "0.65rem 1.3rem" }}>
              Get My Quote
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </AnimatedReveal>
    </nav>
  );
}
