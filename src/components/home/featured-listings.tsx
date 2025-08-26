import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useListings } from "@/hooks/useListings";
import { Skeleton } from "@/components/ui/skeleton";

const getConditionColor = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'new':
      return 'bg-green-100 text-green-800';
    case 'like_new':
      return 'bg-emerald-100 text-emerald-800';
    case 'good':
      return 'bg-blue-100 text-blue-800';
    case 'fair':
      return 'bg-yellow-100 text-yellow-800';
    case 'poor':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatCondition = (condition: string) => {
  return condition.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export function FeaturedListings() {
  const { listings, loading } = useListings();
  
  // Show first 6 listings as featured
  const featuredListings = listings.slice(0, 6);

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Recently Listed Items
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out what your fellow students are selling
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-2" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Recently Listed Items
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out what your fellow students are selling
          </p>
        </div>
        
        {featuredListings.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredListings.map((listing) => (
                <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={listing.images?.[0] || "/placeholder.svg"} 
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                    {listing.category && (
                      <Badge 
                        variant="secondary" 
                        className="absolute top-2 left-2 bg-primary/90 text-primary-foreground"
                      >
                        {listing.category.name}
                      </Badge>
                    )}
                    <Badge 
                      variant="outline" 
                      className={`absolute top-2 right-2 ${getConditionColor(listing.condition)}`}
                    >
                      {formatCondition(listing.condition)}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                      {listing.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xl font-bold text-primary">
                        ${listing.price}
                      </span>
                      {listing.seller && (
                        <span className="text-xs text-muted-foreground">
                          by {listing.seller.full_name || 'Anonymous'}
                        </span>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="default" size="lg" asChild>
                <Link to="/browse">View All Listings</Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              No listings available yet. Be the first to post an item!
            </p>
            <Button variant="default" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}