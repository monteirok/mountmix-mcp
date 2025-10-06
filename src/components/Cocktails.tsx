import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import cocktail1 from "@/assets/cocktail-1.jpg";
import cocktail2 from "@/assets/cocktail-2.jpg";
import cocktail3 from "@/assets/cocktail-3.jpg";

const cocktails = [
  {
    image: cocktail2,
    name: "Rocky Mountain Old Fashioned",
    description: "Premium Canadian whiskey, maple syrup, angostura bitters, with a smoked cedar garnish.",
    price: "$16"
  },
  {
    image: cocktail1,
    name: "Alpine Gin Garden",
    description: "Craft gin, elderflower liqueur, fresh herbs, cucumber, and mountain spring water.",
    price: "$14"
  },
  {
    image: cocktail3,
    name: "Sunset Peak Margarita",
    description: "Premium tequila, fresh lime, agave nectar, blood orange, with Himalayan salt rim.",
    price: "$15"
  },
  {
    image: cocktail1,
    name: "Glacier Fizz",
    description: "Prosecco, wild berry liqueur, fresh mint, lemon twist, with crystallized sugar rim.",
    price: "$13"
  },
  {
    image: cocktail2,
    name: "Summit Punch",
    description: "Aged rum, passion fruit, pineapple, lime, with toasted coconut and mountain honey.",
    price: "$15"
  },
  {
    image: cocktail3,
    name: "Winter's Edge Martini",
    description: "Premium vodka, white chocolate liqueur, vanilla, with candied ginger garnish.",
    price: "$16"
  },
  {
    image: cocktail1,
    name: "Campfire Sour",
    description: "Bourbon, amouetto, lemon juice, egg white, with mesquite smoke and charred orange.",
    price: "$17"
  },
  {
    image: cocktail2,
    name: "Mountain Spring Mocktail",
    description: "Fresh herb infusion, elderflower, cucumber, lime, sparkling water with mountain minerals.",
    price: "$8"
  }
];

const features = [
  {
    title: "Fresh Ingredients",
    description: "Locally sourced herbs, fruits, and premium spirits"
  },
  {
    title: "Custom Creations", 
    description: "Personalized cocktails designed for your event"
  },
  {
    title: "Award-Winning",
    description: "Recognized mixology techniques and presentation"
  }
];

const Cocktails = () => {
  return (
    <section id="cocktails" className="py-20 px-6 bg-darker-surface">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Signature Cocktails
          </h2>
          <p className="text-xl text-mountain-muted max-w-3xl mx-auto">
            Crafted with premium spirits, fresh ingredients, and mountain-inspired flair. 
            Each cocktail tells a story of the Canadian Rockies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {cocktails.map((cocktail, index) => (
            <Card 
              key={index} 
              className="bg-dark-surface border-border hover:shadow-card transition-all duration-500 overflow-hidden group hover-scale animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={cocktail.image} 
                  alt={cocktail.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {cocktail.name}
                  </h3>
                  <Badge variant="secondary" className="bg-gold text-gold-foreground">
                    {cocktail.price}
                  </Badge>
                </div>
                <p className="text-sm text-mountain-muted leading-relaxed">
                  {cocktail.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="space-y-3 animate-fade-in hover-scale transition-all duration-300"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="w-12 h-12 mx-auto bg-gold/10 rounded-full flex items-center justify-center hover:bg-gold/20 transition-colors duration-300">
                <div className="w-6 h-6 bg-gold rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-mountain-muted">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cocktails;