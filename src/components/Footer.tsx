import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-darker-surface border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-gold mb-4">
              Mountain Mixology
            </h3>
            <p className="text-mountain-muted text-sm leading-relaxed mb-4">
              Premium craft cocktail catering in the heart of the Canadian Rockies. 
              Elevating your celebrations with exceptional service and unforgettable drinks.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="p-2 rounded-full bg-gold/10 hover:bg-gold/20 transition-all duration-300 hover-scale"
              >
                <Instagram className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="text-mountain-muted hover:text-gold transition-all duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-mountain-muted hover:text-gold transition-all duration-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#cocktails" className="text-mountain-muted hover:text-gold transition-all duration-300">
                  Our Cocktails
                </a>
              </li>
              <li>
                <a href="/gallery" className="text-mountain-muted hover:text-gold transition-all duration-300">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#booking" className="text-mountain-muted hover:text-gold transition-all duration-300">
                  Book Event
                </a>
              </li>
              <li>
                <a href="/admin/login" className="text-mountain-muted hover:text-gold transition-all duration-300">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-mountain-muted hover:text-gold transition-colors">
                  Wedding Cocktails
                </a>
              </li>
              <li>
                <a href="#" className="text-mountain-muted hover:text-gold transition-colors">
                  Corporate Events
                </a>
              </li>
              <li>
                <a href="#" className="text-mountain-muted hover:text-gold transition-colors">
                  Private Parties
                </a>
              </li>
              <li>
                <a href="#" className="text-mountain-muted hover:text-gold transition-colors">
                  Full Bar Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="font-medium text-foreground">Service Area:</p>
                <p className="text-mountain-muted">
                  Canmore, Banff, Calgary & Rockies
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground">Email:</p>
                <p className="text-mountain-muted">
                  mountainmixologyca@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-mountain-muted">
              © 2025 Mountain Mixology. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-mountain-muted hover:text-gold transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-mountain-muted hover:text-gold transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-mountain-muted hover:text-gold transition-colors">
                Liquor License
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
