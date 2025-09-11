import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Star, Calendar, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onPlanTripClick: () => void;
  onDestinationSelect?: (destinationId: number) => void;
}

export function HeroSection({ onExploreClick, onPlanTripClick, onDestinationSelect }: HeroSectionProps) {
  const featuredDestinations = [
    {
      id: 1,
      name: "Hundru Falls",
      image: "https://images.unsplash.com/photo-1735567065045-97ba386867ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFya2hhbmQlMjB3YXRlcmZhbGwlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3NDA5OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      type: "Waterfall"
    },
    {
      id: 2,
      name: "Betla National Park",
      image: "https://images.unsplash.com/photo-1634320248323-39f8f937019f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMG5hdGlvbmFsJTIwcGFyayUyMHRpZ2VyfGVufDF8fHx8MTc1NzQwOTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.6,
      type: "Wildlife"
    },
    {
      id: 3,
      name: "Netarhat Hill Station",
      image: "https://images.unsplash.com/photo-1734883502990-c002b4e47026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpbGwlMjBzdGF0aW9uJTIwc2NlbmljJTIwdmlld3xlbnwxfHx8fDE3NTc0MDk5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      type: "Hill Station"
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGUlMjBmb3Jlc3R8ZW58MXx8fHwxNzU3NDA5OTk1fDA&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral"
        >
          {/* Multiple video sources for better compatibility */}
          <source
            src="/jharkhand_hero.mp4"
            type="video/mp4"
          />
          <source
            src=""
            type="video/mp4"
          />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Gradient overlay for enhanced visual appeal */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-transparent to-blue-900/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-white/90 text-gray-800">
              AI-Powered Tourism Platform
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Discover the Heart of{" "}
              <span className="text-green-400">Jharkhand</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto drop-shadow-md">
              Experience the pristine beauty of waterfalls, rich tribal culture, historical landmarks, 
              and wildlife sanctuaries with our AI-powered personalized travel companion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="text-lg px-8 bg-green-600 hover:bg-green-700 shadow-lg"
                onClick={onExploreClick}
              >
                Explore Destinations
                <MapPin className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 bg-white/90 hover:bg-white text-gray-800 border-white/50 shadow-lg"
                onClick={onPlanTripClick}
              >
                Plan Your Trip
                <Calendar className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Featured Destinations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {featuredDestinations.map((destination, index) => (
              <Card 
                key={destination.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/95 backdrop-blur-sm cursor-pointer"
                onClick={() => onDestinationSelect?.(destination.id)}
              >
                <div className="relative h-48">
                  <ImageWithFallback
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800">
                    {destination.type}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{destination.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{destination.rating}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="bg-green-500/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-green-300/30">
                <MapPin className="h-8 w-8 text-green-300" />
              </div>
              <h3 className="font-semibold mb-2 text-white">Interactive Maps</h3>
              <p className="text-sm text-gray-200">Real-time navigation and location tracking</p>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="bg-blue-500/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-blue-300/30">
                <Calendar className="h-8 w-8 text-blue-300" />
              </div>
              <h3 className="font-semibold mb-2 text-white">AI Trip Planning</h3>
              <p className="text-sm text-gray-200">Personalized itineraries based on preferences</p>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="bg-purple-500/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-purple-300/30">
                <Star className="h-8 w-8 text-purple-300" />
              </div>
              <h3 className="font-semibold mb-2 text-white">Local Experiences</h3>
              <p className="text-sm text-gray-200">Connect with verified local guides</p>
            </div>
            
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <div className="bg-orange-500/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 border border-orange-300/30">
                <ArrowRight className="h-8 w-8 text-orange-300" />
              </div>
              <h3 className="font-semibold mb-2 text-white">Secure Booking</h3>
              <p className="text-sm text-gray-200">Blockchain-verified transactions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}