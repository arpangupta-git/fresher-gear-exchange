import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { useListings } from "@/hooks/useListings";
import { useCategories } from "@/hooks/useCategories";
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

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
  return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''} ago`;
};

const Browse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const { listings, loading: listingsLoading } = useListings();
  const { categories, loading: categoriesLoading } = useCategories();

  const conditions = ["all", "new", "like_new", "good", "fair", "poor"];

  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (listing.description && listing.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || listing.category_id === selectedCategory;
    const matchesCondition = selectedCondition === "all" || listing.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesCondition;
  });

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  if (listingsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Browse Listings</h1>
            <p className="text-muted-foreground">Find great deals on textbooks, electronics, and more</p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Listings</h1>
          <p className="text-muted-foreground">Find great deals on textbooks, electronics, and more</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-card rounded-lg border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Conditions</SelectItem>
                  {conditions.slice(1).map(condition => (
                    <SelectItem key={condition} value={condition}>
                      {formatCondition(condition)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {sortedListings.length} listing{sortedListings.length !== 1 ? 's' : ''} found
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Listings Grid/List */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {sortedListings.map((listing) => (
            <Card key={listing.id} className={`overflow-hidden hover:shadow-md transition-shadow ${
              viewMode === "list" ? "flex flex-col sm:flex-row" : ""
            }`}>
              <div className={`relative ${viewMode === "list" ? "sm:w-48 sm:flex-shrink-0" : ""}`}>
                <img 
                  src={listing.images?.[0] || "/placeholder.svg"} 
                  alt={listing.title}
                  className={`object-cover ${
                    viewMode === "list" ? "w-full h-32 sm:h-full" : "w-full h-48"
                  }`}
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
              
              <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex flex-col h-full">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                    {listing.title}
                  </h3>
                  {listing.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-1">
                      {listing.description}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-primary">
                      ${listing.price}
                    </span>
                    <div className="text-right">
                      {listing.seller && (
                        <p className="text-xs text-muted-foreground">
                          by {listing.seller.full_name || 'Anonymous'}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatTimeAgo(listing.created_at)}
                      </p>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedListings.length === 0 && !listingsLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No listings found matching your criteria.</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Browse;