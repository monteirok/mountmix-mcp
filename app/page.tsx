import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { ExperiencePlanner } from "./components/ExperiencePlanner";
import { Footer } from "./components/Footer";
import { GallerySection } from "./components/GallerySection";
import { Hero } from "./components/Hero";
import { Navigation } from "./components/Navigation";
import { ServiceArea } from "./components/ServiceArea";
import { ServicesSection } from "./components/ServicesSection";
import { SignatureMenu } from "./components/SignatureMenu";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { WhyChooseUs } from "./components/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <AboutSection />
      <ServicesSection />
      <SignatureMenu />
      <GallerySection />
      <ExperiencePlanner />
      <TestimonialsSection />
      <WhyChooseUs />
      <ServiceArea />
      <ContactSection />
      <Footer />
    </main>
  );
}
