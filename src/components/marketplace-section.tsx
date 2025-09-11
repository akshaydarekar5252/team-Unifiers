import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ShoppingBag, 
  Star, 
  Heart, 
  MapPin, 
  Calendar,
  Home,
  Palette,
  Mountain,
  Search,
  Filter,
  Shield
} from "lucide-react";

export function MarketplaceSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All", icon: ShoppingBag },
    { id: "handicrafts", label: "Handicrafts", icon: Palette },
    { id: "homestays", label: "Homestays", icon: Home },
    { id: "experiences", label: "Experiences", icon: Mountain },
  ];

  const marketplaceItems = [
    {
      id: 1,
      type: "handicraft",
      category: "handicrafts",
      title: "Traditional Dokra Art",
      vendor: "Kumari Devi",
      location: "Jharkhand Tribal Village",
      price: "₹1,200",
      originalPrice: "₹1,500",
      rating: 4.8,
      reviews: 23,
      image: "https://images.unsplash.com/photo-1652355045956-41665ecf16fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMHRyYWRpdGlvbmFsJTIwYXJ0fGVufDF8fHx8MTc1NzQwOTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      verified: true,
      description: "Authentic tribal metalwork using traditional lost-wax technique",
      features: ["Handmade", "Eco-friendly", "Cultural Heritage"]
    },
    {
      id: 2,
      type: "homestay",
      category: "homestays",
      title: "Tribal Heritage Homestay",
      vendor: "Santhali Family",
      location: "Netarhat Hills",
      price: "₹2,800/night",
      originalPrice: "₹3,200/night",
      rating: 4.9,
      reviews: 47,
      image: "https://images.unsplash.com/photo-1702453757229-1ce6a9c78ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lc3RheSUyMHJ1cmFsJTIwYWNjb21tb2RhdGlvbnxlbnwxfHx8fDE3NTc0MDk5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      verified: true,
      description: "Experience authentic tribal culture with organic meals",
      features: ["Organic Food", "Cultural Activities", "Mountain Views"]
    },
    {
      id: 3,
      type: "experience",
      category: "experiences",
      title: "Traditional Dance Workshop",
      vendor: "Cultural Center Ranchi",
      location: "Ranchi Cultural Hub",
      price: "₹800/person",
      originalPrice: "₹1,000/person",
      rating: 4.7,
      reviews: 31,
      image: "https://images.unsplash.com/photo-1652355045956-41665ecf16fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMHRyYWRpdGlvbmFsJTIwYXJ0fGVufDF8fHx8MTc1NzQwOTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      verified: true,
      description: "Learn traditional Santhali and Mundari folk dances",
      features: ["Traditional Costumes", "Live Music", "Certificate"]
    },
    {
      id: 4,
      type: "handicraft",
      category: "handicrafts",
      title: "Bamboo Craft Collection",
      vendor: "Tribal Artisan Group",
      location: "Chaibasa",
      price: "₹450",
      originalPrice: "₹600",
      rating: 4.6,
      reviews: 18,
      image: "https://images.unsplash.com/photo-1652355045956-41665ecf16fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmliYWwlMjBoYW5kaWNyYWZ0cyUyMHRyYWRpdGlvbmFsJTIwYXJ0fGVufDF8fHx8MTc1NzQwOTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      verified: true,
      description: "Sustainable bamboo baskets and decorative items",
      features: ["Eco-friendly", "Lightweight", "Durable"]
    },
    {
      id: 5,
      type: "experience",
      category: "experiences",
      title: "Wildlife Photography Tour",
      vendor: "Nature Guide Collective",
      location: "Betla National Park",
      price: "₹3,500/day",
      originalPrice: "₹4,000/day",
      rating: 4.9,
      reviews: 52,
      image: "https://images.unsplash.com/photo-1634320248323-39f8f937019f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMG5hdGlvbmFsJTIwcGFyayUyMHRpZ2VyfGVufDF8fHx8MTc1NzQwOTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      verified: true,
      description: "Professional wildlife photography with expert guides",
      features: ["Expert Guide", "Equipment Provided", "Digital Gallery"]
    },
    {
      id: 6,
      type: "homestay",
      category: "homestays",
      title: "Eco-Village Stay",
      vendor: "Green Tourism Initiative",
      location: "Patratu Valley",
      price: "₹2,200/night",
      originalPrice: "₹2,800/night",
      rating: 4.8,
      reviews: 35,
      image: "https://images.unsplash.com/photo-1702453757229-1ce6a9c78ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lc3RheSUyMHJ1cmFsJTIwYWNjb21tb2RhdGlvbnxlbnwxfHx8fDE3NTc0MDk5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      verified: true,
      description: "Sustainable living experience with solar power and organic farming",
      features: ["Solar Powered", "Organic Farm", "Valley Views"]
    }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.location.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Local Marketplace
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Support local artisans and experience authentic Jharkhand culture
        </p>
      </div>

      {/* Blockchain Security Badge */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center space-x-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <div className="text-center">
            <h3 className="font-semibold text-lg">Blockchain-Secured Transactions</h3>
            <p className="text-sm text-gray-600">All vendors are verified • Secure payments • Digital receipts</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search products, vendors, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative h-48">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-white text-gray-800 capitalize">
                  {item.type}
                </Badge>
                {item.verified && (
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              
              <Button
                size="sm"
                variant="outline"
                className="absolute top-3 right-3 bg-white hover:bg-gray-50"
              >
                <Heart className="h-4 w-4" />
              </Button>

              {item.originalPrice !== item.price && (
                <Badge className="absolute bottom-3 left-3 bg-red-500">
                  Sale
                </Badge>
              )}
            </div>

            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>by {item.vendor}</span>
                  {item.verified && <Shield className="h-3 w-3 text-green-600" />}
                </div>
                
                <div className="flex items-center space-x-1 text-sm text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span>{item.location}</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1 mt-2">
                  {item.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-xs text-gray-500">({item.reviews})</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-green-600">{item.price}</span>
                    {item.originalPrice !== item.price && (
                      <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                    )}
                  </div>
                  
                  <Button size="sm">
                    {item.type === "homestay" ? "Book Now" : 
                     item.type === "experience" ? "Book Experience" : 
                     "Add to Cart"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Support Local Community Banner */}
      <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Supporting Local Communities</h3>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
          Every purchase directly supports tribal artisans, local families, and sustainable tourism initiatives in Jharkhand.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold">500+</div>
            <div className="text-sm opacity-80">Local Vendors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">₹12L+</div>
            <div className="text-sm opacity-80">Community Earnings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">95%</div>
            <div className="text-sm opacity-80">Customer Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}