import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";

const Browse = () => {
  const sampleListings = [
    {
      id: 1,
      title: "Advanced Calculus Textbook - Stewart",
      price: "$35",
      condition: "Good",
      category: "Textbooks",
      seller: "Sarah M.",
      description: "Well-maintained textbook with minimal highlighting. Perfect for Calc III course."
    },
    {
      id: 2,
      title: "TI-84 Plus CE Graphing Calculator",
      price: "$85",
      condition: "Like New",
      category: "Electronics",
      seller: "Mike R.",
      description: "Barely used calculator in excellent condition. Includes all original accessories."
    },
    {
      id: 3,
      title: "Chemistry Lab Goggles & Apron Set",
      price: "$12",
      condition: "Excellent",
      category: "Safety Equipment",
      seller: "Emma L.",
      description: "Complete safety set required for Chem 101 labs. Clean and sanitized."
    },
    {
      id: 4,
      title: "Introduction to Psychology - Myers",
      price: "$28",
      condition: "Very Good",
      category: "Textbooks",
      seller: "David K.",
      description: "13th edition with some notes in margins. Great for Psych 101."
    },
    {
      id: 5,
      title: "Scientific Calculator HP 35s",
      price: "$45",
      condition: "Good",
      category: "Electronics",
      seller: "Lisa P.",
      description: "Reliable calculator for engineering courses. Shows minor wear but works perfectly."
    },
    {
      id: 6,
      title: "Organic Chemistry Model Kit",
      price: "$22",
      condition: "Like New",
      category: "Lab Equipment",
      seller: "Jason T.",
      description: "Complete molecular model kit with all pieces. Essential for O-Chem visualization."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse Listings
          </h1>
          <p className="text-lg text-muted-foreground">
            Find the academic items you need from fellow students on campus.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for textbooks, calculators, lab equipment..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">All Categories</Button>
            <Button variant="ghost" size="sm">Textbooks</Button>
            <Button variant="ghost" size="sm">Electronics</Button>
            <Button variant="ghost" size="sm">Lab Equipment</Button>
            <Button variant="ghost" size="sm">Supplies</Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            Showing {sampleListings.length} results
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Grid className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {sampleListings.map((item) => (
            <Card key={item.id} className="bg-card border-border shadow-card hover:shadow-hero transition-all duration-300 hover:-translate-y-1 group">
              <CardHeader className="p-0">
                <div className="aspect-video bg-gradient-card rounded-t-lg overflow-hidden flex items-center justify-center">
                  <div className="text-6xl opacity-20">📚</div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      item.condition === 'Like New' || item.condition === 'Excellent' 
                        ? 'text-secondary border-secondary' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.condition}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-primary">
                    {item.price}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    by {item.seller}
                  </div>
                </div>
                
                <Button className="w-full" size="sm">
                  Contact Seller
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Listings
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;