import Link from "next/link";

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
      <div className="nav-inner">
        <Link href="#top" aria-label="Mountain Mixology home" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
          Mountain Mixology
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="#contact" className="btn-primary" style={{ padding: "0.65rem 1.3rem" }}>
            Get My Quote
          </Link>
        </div>
      </div>
    </nav>
  );
}
