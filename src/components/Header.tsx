import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 10);

      if (location.pathname !== "/") {
        setHasScrolledPastHero(true);
        return;
      }

      const heroElement = document.getElementById("hero");
      if (!heroElement) {
        setHasScrolledPastHero(false);
        return;
      }

      const heroHeight = heroElement.offsetHeight;
      setHasScrolledPastHero(currentScroll >= Math.max(heroHeight - 80, 0));
    };

    handleScroll();
    const timeoutId = window.setTimeout(handleScroll, 120);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, [location.pathname]);

  const handleNavClick = (section: string) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(section);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(section);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGalleryClick = () => {
    setIsOpen(false);
    navigate('/gallery');
  };

  const handleBookingClick = () => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('booking');
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById('booking');
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    setIsOpen(false);

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const hasLiquidBackground = location.pathname !== "/" || hasScrolledPastHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-700 ease-out ${
        hasLiquidBackground
          ? "header-liquid border-border"
          : "bg-transparent border-transparent"
      } ${isScrolled ? "shadow-lg" : ""}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold text-gold cursor-pointer hover-scale transition-all duration-300"
            onClick={handleLogoClick}
          >
            Mountain Mixology
          </div>
          
          {/* Desktop Navigation - moved to right */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('about')} 
                className="text-foreground hover:text-gold transition-all duration-300 hover-scale"
              >
                About
              </button>
              <button 
                onClick={() => handleNavClick('services')} 
                className="text-foreground hover:text-gold transition-all duration-300 hover-scale"
              >
                Services
              </button>
              <button 
                onClick={() => handleNavClick('cocktails')} 
                className="text-foreground hover:text-gold transition-all duration-300 hover-scale"
              >
                Cocktails
              </button>
              <button 
                onClick={() => handleNavClick('gallery')} 
                className="text-foreground hover:text-gold transition-all duration-300 hover-scale"
              >
                Gallery
              </button>
            </nav>
            
            {/* Desktop Book Button */}
            <div className="flex items-center">
              <Button
                onClick={handleBookingClick}
                className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-glow hover-scale transition-all duration-300"
              >
                Book Event
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gold hover:text-gold/80">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-md">
                <nav className="flex flex-col items-center space-y-6 mt-8">
                  <button 
                    onClick={() => handleNavClick('about')} 
                    className="text-left text-lg text-foreground hover:text-gold transition-all duration-300 hover:translate-x-2"
                  >
                    About
                  </button>
                  <button 
                    onClick={() => handleNavClick('services')} 
                    className="text-left text-lg text-foreground hover:text-gold transition-all duration-300 hover:translate-x-2"
                  >
                    Services
                  </button>
                  <button 
                    onClick={() => handleNavClick('cocktails')} 
                    className="text-left text-lg text-foreground hover:text-gold transition-all duration-300 hover:translate-x-2"
                  >
                    Cocktails
                  </button>
                  <button 
                    onClick={() => handleNavClick('gallery')} 
                    className="text-left text-lg text-foreground hover:text-gold transition-all duration-300 hover:translate-x-2"
                  >
                    Gallery
                  </button>
                  <Button 
                    onClick={handleBookingClick}
                    className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-glow transition-all duration-300 mt-4"
                  >
                    Book Event
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
