import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to find your academic essentials?
          </h2>
          
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already saving money and connecting 
            with their campus community through Freshers Bazaar.
          </p>

          <Button 
            variant="secondary" 
            size="lg" 
            className="shadow-hero hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
            asChild
          >
            <Link to="/signup">Get Started Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}