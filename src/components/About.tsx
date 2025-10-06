import { Card } from "@/components/ui/card";
import cocktailImage from "@/assets/cocktail-1.jpg";

const About = () => {
  const stats = [
    { number: "200+", label: "EVENTS\nCATERED" },
    { number: "5", label: "YEARS\nEXPERIENCE" },
    { number: "50+", label: "SIGNATURE\nCOCKTAILS" }
  ];

  return (
    <section id="about" className="py-20 px-6 bg-darker-surface">
      <div className="container mx-auto max-w-7xl">
        <div className="animate-fade-in">
          <Card className="bg-card/80 backdrop-blur-xl border border-border/60 rounded-3xl p-8 lg:p-12 hover-scale transition-all duration-500 liquid-reflection overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center min-h-[600px]">
              {/* Content - Takes up 3 columns */}
              <div className="lg:col-span-3 space-y-8 flex flex-col justify-between h-full">
                <div className="space-y-8">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold mb-6 leading-tight">
                    Crafting Memorable<br />
                    Moments
                  </h2>
                  
                  <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
                    <p>
                      Founded in the breathtaking mountain town of Canmore, 
                      Mountain Mixology brings together the artistry of craft 
                      cocktails with the stunning backdrop of the Canadian 
                      Rockies. Our passion for premium ingredients and innovative 
                      techniques creates unforgettable beverage experiences for 
                      your most important celebrations.
                    </p>
                    
                    <p>
                      From intimate gatherings to grand celebrations, we believe 
                      every event deserves exceptional service and extraordinary 
                      drinks. Our team of skilled mixologists combines traditional 
                      techniques with modern innovation to deliver cocktails that 
                      are as beautiful as they are delicious.
                    </p>
                  </div>
                </div>

                {/* Stats - Positioned at bottom */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  {stats.map((stat, index) => (
                    <Card 
                      key={index} 
                      className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-2xl p-6 text-center hover-scale transition-all duration-300 liquid-reflection"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="text-3xl md:text-4xl font-bold text-gold mb-2">
                        {stat.number}
                      </div>
                      <div className="text-xs text-foreground/60 font-medium whitespace-pre-line uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Image - Takes up 2 columns */}
              <div className="lg:col-span-2 relative animate-fade-in h-full" style={{ animationDelay: "300ms" }}>
                <Card className="overflow-hidden border border-border/60 rounded-3xl hover-scale transition-all duration-500 liquid-reflection bg-background/60 backdrop-blur-sm h-full">
                  <img 
                    src={cocktailImage} 
                    alt="Craft cocktail with fresh ingredients"
                    className="w-full h-full object-cover min-h-[500px]"
                  />
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
