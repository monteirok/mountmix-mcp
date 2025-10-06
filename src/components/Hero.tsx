import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mountain-bg.jpg";

const Hero = () => {
  const handleScrollTo = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mountain skyline at sunrise"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">
          <p
            className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground animate-fade-in"
            style={{ animationDelay: "150ms" }}
          >
            Mountain Mixology
          </p>
          <h1 className="text-5xl font-bold leading-tight text-foreground drop-shadow-2xl animate-fade-in md:text-7xl">
            <span className="block">Elevated Cocktails,</span>
            <span className="block text-gold">Mountain Views</span>
          </h1>

          <p
            className="mt-6 text-lg leading-relaxed text-muted-foreground animate-fade-in md:text-2xl"
            style={{ animationDelay: "350ms" }}
          >
            Transform your event with our signature mixology experience in the heart of the Rockies.
          </p>

          <div
            className="mt-10 flex flex-col items-center gap-4 animate-fade-in sm:flex-row sm:justify-center lg:items-center lg:justify-start"
            style={{ animationDelay: "600ms" }}
          >
            <Button
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-glow text-lg px-8 py-6 hover-scale transition-all duration-300"
              onClick={() => handleScrollTo("booking")}
            >
              Book Your Event
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border border-border/60 bg-background/70 text-foreground hover:border-border hover:bg-background/80 text-lg px-8 py-6 hover-scale transition-all duration-300"
              onClick={() => handleScrollTo("services")}
            >
              View Services
            </Button>
          </div>
        </div>
      </div>

      {/* Compass detail */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(241,192,74,0.18),transparent_55%)]" />
    </section>
  );
};

export default Hero;
