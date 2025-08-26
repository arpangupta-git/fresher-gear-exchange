import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/home/hero-section";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedListings } from "@/components/home/featured-listings";
import { CTASection } from "@/components/home/cta-section";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <FeaturedListings />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;