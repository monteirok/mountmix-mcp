import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X } from "lucide-react";
import cocktail1 from "@/assets/cocktail-1.jpg";
import cocktail2 from "@/assets/cocktail-2.jpg";
import cocktail3 from "@/assets/cocktail-3.jpg";

// Mock gallery data with enhanced metadata
const galleryImages = [
  { 
    id: 1, 
    src: cocktail1, 
    category: "cocktails", 
    alt: "Signature cocktail presentation",
    title: "Mountain Mist Martini",
    description: "Our signature creation with alpine gin and mountain herbs"
  },
  { 
    id: 2, 
    src: cocktail2, 
    category: "weddings", 
    alt: "Wedding cocktail service",
    title: "Wedding Reception Bar",
    description: "Elegant cocktail service for a mountain wedding"
  },
  { 
    id: 3, 
    src: cocktail1, 
    category: "corporate", 
    alt: "Corporate event bar setup",
    title: "Corporate Mixology Event",
    description: "Team building through craft cocktail making"
  },
  { 
    id: 4, 
    src: cocktail3, 
    category: "cocktails", 
    alt: "Craft cocktail with garnish",
    title: "Artisan Old Fashioned",
    description: "Classic cocktail with our unique mountain twist"
  },
  { 
    id: 5, 
    src: cocktail2, 
    category: "private", 
    alt: "Private party mixology",
    title: "Intimate Gathering",
    description: "Personalized cocktail experience for close friends"
  },
  { 
    id: 6, 
    src: cocktail1, 
    category: "weddings", 
    alt: "Elegant wedding bar",
    title: "Mountain Wedding Bar",
    description: "Stunning backdrop for your special day"
  },
];

const categories = [
  { id: "all", label: "All Events", color: "bg-primary" },
  { id: "weddings", label: "Weddings", color: "bg-pink-500" },
  { id: "corporate", label: "Corporate", color: "bg-blue-500" },
  { id: "private", label: "Private Parties", color: "bg-purple-500" },
  { id: "cocktails", label: "Cocktails", color: "bg-amber-500" },
];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const nextSlide = () => {
    const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    setActiveCategory(categories[nextIndex].id);
    setCurrentSlide(0);
  };

  const prevSlide = () => {
    const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
    const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
    setActiveCategory(categories[prevIndex].id);
    setCurrentSlide(0);
  };

  const selectedImageData = selectedImage ? galleryImages.find(img => img.id === selectedImage) : null;

  return (
    <section id="gallery" className="py-24 px-6 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-accent to-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-gold to-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header with modern typography */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all duration-300">
            Our Portfolio
          </Badge>
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            Event Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: "400ms" }}>
            Step into our world of mountain mixology. Each image tells a story of craftsmanship, 
            celebration, and the magic that happens when great drinks meet breathtaking views.
          </p>
        </div>

        {/* Interactive category filters with liquid glass design */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in" style={{ animationDelay: "600ms" }}>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="glass"
              onClick={() => {
                setActiveCategory(category.id);
                setCurrentSlide(0);
              }}
              className={`
                relative group overflow-hidden px-8 py-4 text-lg font-medium rounded-full transition-all duration-500 hover:scale-105 hover:shadow-2xl
                ${activeCategory === category.id 
                  ? "bg-primary/90 text-primary-foreground shadow-2xl backdrop-blur-xl border border-primary/30 liquid-reflection" 
                  : "bg-secondary/80 text-secondary-foreground backdrop-blur-xl border border-border/60 hover:bg-accent/80 hover:border-primary/50 liquid-reflection"
                }
              `}
            >
              <span className="relative z-10">{category.label}</span>
              {activeCategory === category.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 opacity-90 animate-liquid-shimmer"></div>
              )}
            </Button>
          ))}
        </div>

        {/* Main gallery with masonry-inspired layout */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredImages.map((image, index) => (
            <Card 
              key={`${activeCategory}-${image.id}`}
              className={`
                group relative overflow-hidden bg-card/50 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 
                cursor-pointer transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fade-in
                ${index % 3 === 0 ? 'lg:row-span-2' : ''}
              `}
              style={{ 
                animationDelay: `${index * 150}ms`,
                aspectRatio: index % 3 === 0 ? '3/4' : '4/3'
              }}
              onClick={() => openLightbox(image.id)}
            >
              <div className="relative h-full overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-xl mb-2">{image.title}</h3>
                  <p className="text-sm text-foreground/80 mb-3">{image.description}</p>
                  <Badge className="bg-primary/20 text-primary-foreground border-primary/30">
                    {categories.find(cat => cat.id === image.category)?.label}
                  </Badge>
                </div>

                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-foreground/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/80">
                  <Maximize2 className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>

      {/* Modern lightbox modal */}
      {selectedImage && selectedImageData && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 z-10 w-12 h-12 bg-foreground/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-foreground/20 transition-colors duration-300"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
            
            <div className="w-full h-full max-h-[90vh] flex flex-col lg:flex-row gap-8 items-center">
              <div className="flex-1 relative">
                <img 
                  src={selectedImageData.src} 
                  alt={selectedImageData.alt}
                  className="w-full h-full object-contain rounded-lg animate-scale-in"
                />
              </div>
              
              <div className="lg:w-96 text-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
                <Badge className="mb-4 bg-primary/20 text-primary-foreground border-primary/30">
                  {categories.find(cat => cat.id === selectedImageData.category)?.label}
                </Badge>
                <h3 className="text-3xl font-bold mb-4">{selectedImageData.title}</h3>
                <p className="text-lg text-foreground/80 leading-relaxed">{selectedImageData.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
