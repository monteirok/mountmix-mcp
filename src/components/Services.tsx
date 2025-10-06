import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Building, Mountain, Utensils } from "lucide-react";

const services = [
  {
    icon: Heart,
    title: "Wedding Cocktail Service",
    description: "Signature cocktail menus, professional bartending, and elegant presentation for your special day in the mountains.",
    features: [
      "Custom cocktail menu design",
      "Professional bartending staff", 
      "Premium glassware & setup"
    ],
    gradient: "from-pink-600/20 to-rose-500/20",
    border: "border-pink-500/30",
    iconBg: "bg-pink-500/20"
  },
  {
    icon: Building,
    title: "Corporate Events",
    description: "Sophisticated cocktail experiences for conferences, galas, and corporate celebrations with professional service.",
    features: [
      "Scalable service options",
      "Brand-customized cocktails",
      "Event coordination support"
    ],
    gradient: "from-blue-600/20 to-cyan-500/20",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/20"
  },
  {
    icon: Users,
    title: "Private Parties",
    description: "Intimate cocktail experiences for birthdays, anniversaries, and special celebrations in your home or venue.",
    features: [
      "Personalized menu consultation",
      "Mobile bar setup",
      "Flexible service packages"
    ],
    gradient: "from-emerald-600/20 to-green-500/20",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20"
  },
  {
    icon: Mountain,
    title: "Destination Events",
    description: "Specialized cocktail catering for mountain lodges, ski chalets, and outdoor celebrations.",
    features: [
      "Weather-adapted service",
      "Portable bar solutions",
      "Mountain-themed cocktails"
    ],
    gradient: "from-purple-600/20 to-violet-500/20",
    border: "border-purple-500/30",
    iconBg: "bg-purple-500/20"
  },
  {
    icon: Utensils,
    title: "Full Bar Service",
    description: "Complete beverage service including wine, beer, and premium spirits alongside our signature cocktails.",
    features: [
      "Curated wine selection",
      "Local craft beer options",
      "Premium spirit collection"
    ],
    gradient: "from-amber-600/20 to-yellow-500/20",
    border: "border-amber-500/30",
    iconBg: "bg-amber-500/20"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Premium Catering Services
          </h2>
          <p className="text-xl text-mountain-muted max-w-3xl mx-auto">
            From intimate cocktail parties to grand celebrations, we provide comprehensive 
            beverage services tailored to your vision and venue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.slice(0, 5).map((service, index) => (
            <Card 
              key={index} 
              className={`
                bg-gradient-to-br ${service.gradient} 
                backdrop-blur-sm border ${service.border} 
                hover:shadow-2xl transition-all duration-500 group 
                hover:scale-105 hover:-translate-y-2 animate-fade-in 
                liquid-reflection rounded-3xl
              `}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="text-center pb-4">
                <div className={`mx-auto mb-4 p-4 rounded-2xl ${service.iconBg} group-hover:scale-110 transition-all duration-300`}>
                  <service.icon className="w-8 h-8 text-foreground group-hover:scale-110 transition-transform duration-300" />
                </div>
                <CardTitle className="text-xl text-foreground mb-2">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 text-sm text-foreground/70">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl p-8 hover:scale-105 transition-all duration-500 liquid-reflection animate-fade-in" style={{ animationDelay: "800ms" }}>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Ready to Plan Your Event?
              </h3>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Let's discuss how we can make your celebration extraordinary.
              </p>
            </div>
            <Button className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-glow text-lg px-8 py-6 hover-scale transition-all duration-300">
              Get Custom Quote
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
