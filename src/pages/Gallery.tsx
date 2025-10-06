import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import cocktail1 from "@/assets/cocktail-1.jpg";
import cocktail2 from "@/assets/cocktail-2.jpg";
import cocktail3 from "@/assets/cocktail-3.jpg";

// Mock gallery data - in a real app, this would come from a CMS or database
const galleryImages = [
  { id: 1, src: cocktail1, category: "cocktails", alt: "Signature cocktail presentation" },
  { id: 2, src: cocktail2, category: "weddings", alt: "Wedding cocktail service" },
  { id: 3, src: cocktail1, category: "corporate", alt: "Corporate event bar setup" },
  { id: 4, src: cocktail3, category: "cocktails", alt: "Craft cocktail with garnish" },
  { id: 5, src: cocktail2, category: "private", alt: "Private party mixology" },
  { id: 6, src: cocktail1, category: "weddings", alt: "Elegant wedding bar" },
  { id: 7, src: cocktail3, category: "corporate", alt: "Professional cocktail service" },
  { id: 8, src: cocktail2, category: "private", alt: "Intimate gathering cocktails" },
];

const categories = [
  { id: "all", label: "All Events" },
  { id: "weddings", label: "Weddings" },
  { id: "corporate", label: "Corporate" },
  { id: "private", label: "Private Parties" },
  { id: "cocktails", label: "Cocktails" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 text-center">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-gold mb-6 animate-fade-in">
              Event Gallery
            </h1>
            <p className="text-xl text-mountain-muted animate-fade-in" style={{ animationDelay: "200ms" }}>
              Explore our portfolio of memorable events, stunning cocktail presentations, and 
              the beautiful mountain venues we've had the pleasure to serve.
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="px-6 mb-12">
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={
                    activeCategory === category.id
                      ? "bg-gold text-gold-foreground hover:bg-gold/90"
                      : "border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="px-6 pb-20">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image, index) => (
                <Card 
                  key={`${activeCategory}-${image.id}`}
                  className="overflow-hidden border-border hover-scale group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-darker-surface text-center">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 animate-fade-in">
              Want to see your event featured in our gallery?
            </h2>
            <p className="text-xl text-mountain-muted mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Let's create something beautiful together
            </p>
            <Button 
              className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-glow text-lg px-8 py-6 animate-fade-in hover-scale"
              style={{ animationDelay: "400ms" }}
            >
              Plan Your Event
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Gallery;