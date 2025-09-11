import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  MapPin, 
  Star, 
  Clock, 
  Camera, 
  TreePine, 
  Mountain, 
  Building, 
  Waves,
  Filter,
  Search
} from "lucide-react";
import { Input } from "./ui/input";

interface DestinationsSectionProps {
  onDestinationSelect?: (destinationId: number) => void;
}

export function DestinationsSection({ onDestinationSelect }: DestinationsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All", icon: MapPin },
    { id: "waterfalls", label: "Waterfalls", icon: Waves },
    { id: "wildlife", label: "Wildlife", icon: TreePine },
    { id: "hills", label: "Hill Stations", icon: Mountain },
    { id: "heritage", label: "Heritage", icon: Building },
  ];

  const destinations = [
    {
      id: 1,
      name: "Hundru Falls",
      category: "waterfalls",
      image: "https://images.unsplash.com/photo-1735567065045-97ba386867ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjB3YXRlcmZhbGwlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3NDA5OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      duration: "4-6 hours",
      description: "A spectacular 98-meter high waterfall, perfect for nature photography and trekking.",
      highlights: ["Photography", "Trekking", "Picnic Spots"],
      distance: "45 km from Ranchi"
    },
    {
      id: 2,
      name: "Betla National Park",
      category: "wildlife",
      image: "https://images.unsplash.com/photo-1634320248323-39f8f937019f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMG5hdGlvbmFsJTIwcGFyayUyMHRpZ2VyfGVufDF8fHx8MTc1NzQwOTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.6,
      duration: "Full Day",
      description: "Home to tigers, elephants, and diverse wildlife in their natural habitat.",
      highlights: ["Tiger Safari", "Elephant Spotting", "Bird Watching"],
      distance: "170 km from Ranchi"
    },
    {
      id: 3,
      name: "Netarhat Hill Station",
      category: "hills",
      image: "https://images.unsplash.com/photo-1734883502990-c002b4e47026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpbGwlMjBzdGF0aW9uJTIwc2NlbmljJTIwdmlld3xlbnwxfHx8fDE3NTc0MDk5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      duration: "2-3 days",
      description: "Queen of Chotanagpur with breathtaking sunrise and sunset views.",
      highlights: ["Sunrise Point", "Sunset Views", "Pine Forests"],
      distance: "156 km from Ranchi"
    },
    {
      id: 4,
      name: "Deoghar Temple Complex",
      category: "heritage",
      image: "https://images.unsplash.com/photo-1721532865728-7ee780270309?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGUlMjBoaXN0b3JpY2FsJTIwbW9udW1lbnR8ZW58MXx8fHwxNzU3NDA5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      duration: "Half Day",
      description: "Sacred pilgrimage site with ancient Shiva temple and spiritual significance.",
      highlights: ["Ancient Architecture", "Spiritual Experience", "Cultural Tours"],
      distance: "250 km from Ranchi"
    },
    {
      id: 5,
      name: "Patratu Valley",
      category: "hills",
      image: "https://images.unsplash.com/photo-1734883502990-c002b4e47026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpbGwlMjBzdGF0aW9uJTIwc2NlbmljJTIwdmlld3xlbnwxfHx8fDE3NTc0MDk5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.5,
      duration: "Full Day",
      description: "Scenic valley known for its dam, boating, and adventure activities.",
      highlights: ["Dam Views", "Boating", "Adventure Sports"],
      distance: "40 km from Ranchi"
    },
  ];

  const filteredDestinations = destinations.filter(dest => {
    const categoryMatch = selectedCategory === "all" || dest.category === selectedCategory;
    const searchMatch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Explore Destinations
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover Jharkhand's natural wonders, from cascading waterfalls to ancient temples
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search destinations..."
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
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{category.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <Card className="mb-8 bg-gradient-to-r from-green-100 to-blue-100">
        <CardContent className="p-8 text-center">
          <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Interactive Map View</h3>
          <p className="text-gray-600 mb-4">
            Explore destinations with AR previews and real-time location data
          </p>
          <Button>
            <Camera className="mr-2 h-4 w-4" />
            Launch AR Map Experience
          </Button>
        </CardContent>
      </Card>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDestinations.map((destination) => (
          <Card 
            key={destination.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => onDestinationSelect?.(destination.id)}
          >
            <div className="relative h-48">
              <ImageWithFallback
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-white text-gray-800">
                  {categories.find(c => c.id === destination.category)?.label}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <div className="bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold">{destination.rating}</span>
                </div>
              </div>
            </div>

            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg">{destination.name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {destination.duration}
                </div>
              </div>
              <p className="text-sm text-gray-500">{destination.distance}</p>
            </CardHeader>

            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {destination.description}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {destination.highlights.map((highlight, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {highlight}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => onDestinationSelect?.(destination.id)}
                >
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No destinations found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}