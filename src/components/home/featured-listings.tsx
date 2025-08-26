import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sampleListings = [
  {
    id: 1,
    title: "Calculus I Textbook",
    price: "$15",
    condition: "Like New",
    image: "/placeholder.svg",
    category: "Textbooks"
  },
  {
    id: 2,
    title: "Scientific Calculator TI-84",
    price: "$45",
    condition: "Good",
    image: "/placeholder.svg",
    category: "Electronics"
  },
  {
    id: 3,
    title: "Organic Chemistry Lab Kit",
    price: "$25",
    condition: "Excellent",
    image: "/placeholder.svg",
    category: "Lab Equipment"
  },
  {
    id: 4,
    title: "Engineering Notebook Set",
    price: "$8",
    condition: "Very Good",
    image: "/placeholder.svg",
    category: "Supplies"
  }
];

export function FeaturedListings() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recently Listed Items
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover great deals on textbooks, calculators, and more from your fellow students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleListings.map((item) => (
            <Card key={item.id} className="bg-card border-border shadow-card hover:shadow-hero transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="p-0">
                <div className="aspect-square bg-gradient-card rounded-t-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      item.condition === 'Like New' ? 'text-secondary border-secondary' :
                      item.condition === 'Excellent' ? 'text-secondary border-secondary' :
                      'text-muted-foreground'
                    }`}
                  >
                    {item.condition}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <div className="text-2xl font-bold text-primary">
                  {item.price}
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0">
                <Button variant="outline" className="w-full" size="sm">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <a href="/browse">View All Listings</a>
          </Button>
        </div>
      </div>
    </section>
  );
}