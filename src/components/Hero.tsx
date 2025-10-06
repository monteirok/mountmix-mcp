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
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/20 to-white/10 dark:from-black/50 dark:via-black/20 dark:to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-white/10 dark:from-black/40 dark:via-transparent dark:to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">
          <p
            className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-muted-foreground dark:text-white/70 animate-fade-in"
            style={{ animationDelay: "150ms" }}
          >
            Mountain Mixology
          </p>
          <h1 className="text-5xl font-bold leading-tight text-foreground dark:text-white drop-shadow-2xl animate-fade-in md:text-7xl">
            <span className="block">Elevated Cocktails,</span>
            <span className="block text-gold">Mountain Views</span>
          </h1>

          <p
            className="mt-6 text-lg leading-relaxed text-muted-foreground dark:text-white/80 animate-fade-in md:text-2xl"
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
              className="border border-black/15 bg-white/60 text-foreground hover:border-black/25 hover:bg-white/80 hover:text-foreground text-lg px-8 py-6 hover-scale transition-all duration-300 dark:border-white/40 dark:bg-white/5 dark:text-white dark:hover:border-white/60 dark:hover:bg-white/10 dark:hover:text-white"
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
