import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "motion/react";
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
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  Play,
  Heart,
  Share2,
  Eye,
  Calendar,
  Award,
  Globe,
  Compass,
  Zap,
  Sparkles,
  Navigation,
  Map
} from "lucide-react";
import { Input } from "./ui/input";

interface DestinationsSectionProps {
  onDestinationSelect?: (destinationId: number) => void;
}

export function DestinationsSection({ onDestinationSelect }: DestinationsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredDestination, setHoveredDestination] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'immersive'>('immersive');
  const [showFloatingStats, setShowFloatingStats] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const categories = [
    { id: "all", label: "All", icon: MapPin },
    { id: "waterfalls", label: "Waterfalls", icon: Waves },
    { id: "wildlife", label: "Wildlife", icon: TreePine },
    { id: "hills", label: "Hill Stations", icon: Mountain },
    { id: "heritage", label: "Heritage", icon: Building },
    { id: "cultural", label: "Cultural", icon: Users },
  ];

  const heroSlides = [
    {
      id: 1,
      title: "Majestic Hills of Jharkhand",
      subtitle: "Where mist meets mountains",
      image: "https://images.unsplash.com/photo-1583477041518-b244705d89e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBoaWxscyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTkwMjk4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Experience the breathtaking beauty of rolling hills and pristine valleys",
      color: "from-blue-900/80 to-purple-800/60",
      stats: { destinations: 12, avgRating: 4.8, visitors: "2.3K" }
    },
    {
      id: 2,
      title: "Thundering Waterfalls",
      subtitle: "Nature's power unleashed",
      image: "https://images.unsplash.com/photo-1625023455567-09b002682d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGxzJTIwZm9yZXN0JTIwaW5kaWF8ZW58MXx8fHwxNzU5MDI5ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Discover cascading waterfalls hidden in lush green forests",
      color: "from-green-900/80 to-teal-800/60",
      stats: { destinations: 8, avgRating: 4.9, visitors: "1.8K" }
    },
    {
      id: 3,
      title: "Sunrise in the Clouds",
      subtitle: "Golden moments above the world",
      image: "https://images.unsplash.com/photo-1571295825108-731506d6b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXN0eSUyMG1vdW50YWlucyUyMHN1bnJpc2V8ZW58MXx8fHwxNzU5MDI5ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Witness spectacular sunrises from Jharkhand's highest peaks",
      color: "from-orange-900/80 to-red-800/60",
      stats: { destinations: 5, avgRating: 4.7, visitors: "950" }
    },
    {
      id: 4,
      title: "Emerald Forest Canopy",
      subtitle: "Dense wilderness awaits",
      image: "https://images.unsplash.com/photo-1758609554836-6c5ef5de9de2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW5zZSUyMGdyZWVuJTIwZm9yZXN0JTIwY2Fub3B5fGVufDF8fHx8MTc1OTAyOTg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Explore the biodiversity of ancient forests and tribal lands",
      color: "from-emerald-900/80 to-green-800/60",
      stats: { destinations: 15, avgRating: 4.6, visitors: "3.1K" }
    },
    {
      id: 5,
      title: "Cultural Heritage Villages",
      subtitle: "Living traditions",
      image: "https://images.unsplash.com/photo-1676386615569-82e519779625?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjB2aWxsYWdlJTIwc3Vuc2V0JTIwaW5kaWF8ZW58MXx8fHwxNzU5MDI5ODQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Immerse yourself in the rich traditions of tribal communities",
      color: "from-amber-900/80 to-yellow-800/60",
      stats: { destinations: 32, avgRating: 4.9, visitors: "4.2K" }
    }
  ];

  const floatingElements = [
    { icon: Sparkles, delay: 0, position: { top: '20%', left: '10%' } },
    { icon: Compass, delay: 0.5, position: { top: '60%', right: '15%' } },
    { icon: Globe, delay: 1, position: { bottom: '30%', left: '20%' } },
    { icon: Zap, delay: 1.5, position: { top: '40%', right: '25%' } },
  ];

  const interactiveStats = [
    { 
      icon: MapPin, 
      value: "72+", 
      label: "Destinations", 
      color: "text-green-600",
      gradient: "from-green-100 to-emerald-50"
    },
    { 
      icon: Star, 
      value: "4.8★", 
      label: "Avg Rating", 
      color: "text-yellow-600",
      gradient: "from-yellow-100 to-amber-50"
    },
    { 
      icon: Users, 
      value: "12K+", 
      label: "Happy Travelers", 
      color: "text-blue-600",
      gradient: "from-blue-100 to-sky-50"
    },
    { 
      icon: Award, 
      value: "32", 
      label: "Tribal Communities", 
      color: "text-purple-600",
      gradient: "from-purple-100 to-violet-50"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

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
      image: "https://images.unsplash.com/photo-1734883502990-c002b4e47026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpbGwlMjBzdGF0aW9uJTIwc2NlbmljJTIwdmlld3hlbnwxfHx8fDE3NTc0MDk5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      duration: "2-3 days",
      description: "Queen of Chotanagpur with breathtaking sunrise and sunset views.",
      highlights: ["Sunrise Point", "Sunset Views", "Pine Forests"],
      distance: "156 km from Ranchi"
    },
    {
      id: 4,
      name: "Santhal Pargana Cultural Village",
      category: "cultural",
      image: "https://images.unsplash.com/photo-1611262360544-af37696056b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjB2aWxsYWdlJTIwaW5kaWElMjBjdWx0dXJhbCUyMGhlcml0YWdlfGVufDF8fHx8MTc1ODA4NjE0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.9,
      duration: "1-2 days",
      description: "Experience authentic Santhal tribal culture through village stays and traditional arts.",
      highlights: ["Village Homestay", "Traditional Crafts", "Folk Performances"],
      distance: "280 km from Ranchi"
    },
    {
      id: 5,
      name: "Tribal Heritage Museum",
      category: "cultural",
      image: "https://images.unsplash.com/photo-1580467469359-91a73a6e92ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhhbmRpY3JhZnRzJTIwdHJpYmFsJTIwYXJ0JTIwaW5kaWF8ZW58MXx8fHwxNzU4MDg2MTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      duration: "Half day",
      description: "Comprehensive showcase of Jharkhand's 32 tribal communities and their heritage.",
      highlights: ["32 Tribal Communities", "Live Demonstrations", "Cultural Workshops"],
      distance: "12 km from Ranchi"
    },
    {
      id: 6,
      name: "Sarjom Jangal Sacred Grove",
      category: "cultural",
      image: "https://images.unsplash.com/photo-1633617127680-18229ebb1b94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWNyZWQlMjBncm92ZSUyMHRlbXBsZSUyMHRyaWJhbCUyMHdvcnNoaXAlMjBpbmRpYXxlbnwxfHx8fDE3NTgwODYxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      duration: "4-6 hours",
      description: "Ancient sacred grove where tribal communities have practiced ancestral worship for 1,000+ years.",
      highlights: ["Sacred Grove", "Tribal Ceremonies", "Medicinal Plants"],
      distance: "85 km from Ranchi"
    },
  ];

  const filteredDestinations = destinations.filter(dest => {
    const categoryMatch = selectedCategory === "all" || dest.category === selectedCategory;
    const searchMatch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       dest.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="overflow-hidden" ref={containerRef}>
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={index}
              className="absolute"
              style={element.position}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ 
                opacity: [0, 0.1, 0, 0.1, 0],
                scale: [0, 1, 1.2, 1, 0],
                rotate: [0, 180, 360],
                y: [0, -20, 0]
              }}
              transition={{
                duration: 8,
                delay: element.delay,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <Icon className="h-8 w-8 text-green-300/30" />
            </motion.div>
          );
        })}
      </div>

      {/* Grand Hero Carousel with 3D Effects */}
      <div className="relative h-screen perspective-1000">
        {/* Image Slides with Parallax */}
        <motion.div 
          className="absolute inset-0"
          style={{ y }}
        >
          {heroSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1, rotateX: 5 }}
              animate={{ 
                opacity: index === currentSlide ? 1 : 0,
                scale: index === currentSlide ? 1 : 1.05,
                rotateX: index === currentSlide ? 0 : 5
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <ImageWithFallback
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.color}`} />
              
              {/* Animated Particles */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100, -200],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Content Overlay with 3D Effects */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 50, rotateX: 10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Badge variant="secondary" className="mb-4 bg-white/90 text-gray-800 backdrop-blur-md">
                    {heroSlides[currentSlide].subtitle}
                  </Badge>
                  <motion.h1 
                    className="text-5xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {heroSlides[currentSlide].title.split(' ').map((word, index) => (
                      <motion.span
                        key={index}
                        className="inline-block mr-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h1>
                  <motion.p 
                    className="text-xl lg:text-2xl text-gray-100 mb-8 max-w-2xl drop-shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    {heroSlides[currentSlide].description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg" 
                        className="text-lg px-8 bg-white text-gray-900 hover:bg-gray-100 shadow-2xl transform transition-all duration-300"
                        onClick={() => {
                          const destinationsSection = document.getElementById('destinations-content');
                          destinationsSection?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        <Sparkles className="mr-2 h-5 w-5" />
                        Explore Now
                        <Camera className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-gray-900 shadow-2xl backdrop-blur-md"
                      >
                        <Navigation className="mr-2 h-5 w-5" />
                        Virtual Tour
                        <Play className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Interactive Stats Panel */}
              <div className="lg:col-span-1">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  {/* Live Stats for Current Slide */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <Eye className="mr-2 h-5 w-5" />
                      Live Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div 
                          className="text-2xl font-bold text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.5 }}
                        >
                          {heroSlides[currentSlide].stats.destinations}
                        </motion.div>
                        <div className="text-sm text-gray-300">Destinations</div>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div 
                          className="text-2xl font-bold text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.7 }}
                        >
                          {heroSlides[currentSlide].stats.avgRating}
                        </motion.div>
                        <div className="text-sm text-gray-300">Rating</div>
                      </motion.div>
                      <motion.div 
                        className="text-center col-span-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div 
                          className="text-2xl font-bold text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.9 }}
                        >
                          {heroSlides[currentSlide].stats.visitors}
                        </motion.div>
                        <div className="text-sm text-gray-300">Monthly Visitors</div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Quick Action Panel */}
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-semibold mb-4 flex items-center">
                      <Zap className="mr-2 h-5 w-5" />
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <motion.button
                        className="w-full bg-white/20 hover:bg-white/30 text-white rounded-lg p-3 text-sm transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Map className="mr-2 h-4 w-4" />
                        View on Map
                      </motion.button>
                      <motion.button
                        className="w-full bg-white/20 hover:bg-white/30 text-white rounded-lg p-3 text-sm transition-all duration-300 flex items-center justify-center"
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-110' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        {/* Play/Pause Control */}
        <div className="absolute bottom-8 right-8 z-20">
          <Button
            variant="ghost"
            size="sm"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/30"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </Button>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.div 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="text-white text-sm">Discover More</div>
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center relative overflow-hidden">
              <motion.div 
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 15, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interactive Stats Banner */}
      <motion.div 
        className="relative z-20 -mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {interactiveStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className={`bg-gradient-to-br ${stat.gradient} backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl cursor-pointer`}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setShowFloatingStats(true)}
                  onHoverEnd={() => setShowFloatingStats(false)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                    <motion.div
                      animate={{ rotate: showFloatingStats ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sparkles className="h-4 w-4 text-gray-400" />
                    </motion.div>
                  </div>
                  <motion.div 
                    className={`text-3xl font-bold ${stat.color} mb-1`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.1 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Immersive Destinations Content */}
      <div id="destinations-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Compass className="h-4 w-4" />
            <span className="text-sm font-medium">Discover Jharkhand</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Immersive Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Discover Jharkhand's cultural heritage, natural wonders, and vibrant tribal traditions through immersive experiences powered by AI and AR technology
          </p>

          {/* View Mode Toggle */}
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-100 p-1 rounded-xl">
              {[
                { id: 'immersive', label: 'Immersive', icon: Eye },
                { id: 'grid', label: 'Grid', icon: Filter },
                { id: 'map', label: 'Map', icon: Map }
              ].map((mode) => {
                const Icon = mode.icon;
                return (
                  <motion.button
                    key={mode.id}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      viewMode === mode.id 
                        ? 'bg-white shadow-lg text-green-600' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setViewMode(mode.id as any)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{mode.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Search and Filter */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative flex-1 max-w-md mx-auto lg:mx-0">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search destinations, activities, culture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl shadow-sm"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Button
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 h-12 px-6 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id 
                        ? 'bg-green-600 hover:bg-green-700 shadow-lg scale-105' 
                        : 'hover:scale-105 hover:shadow-md border-2'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{category.label}</span>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Interactive Map Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <Card className="overflow-hidden bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 border-2 border-transparent bg-clip-border">
            <CardContent className="p-12 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-100/50 via-blue-100/50 to-purple-100/50" />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block mb-6"
                >
                  <MapPin className="h-20 w-20 text-green-600" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Interactive AR Map Experience
                </h3>
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Explore destinations with augmented reality previews, real-time location data, and immersive 360° virtual tours
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 shadow-lg">
                    <Camera className="mr-2 h-5 w-5" />
                    Launch AR Experience
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 hover:bg-gray-50">
                    <MapPin className="mr-2 h-5 w-5" />
                    View Interactive Map
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Destinations Display */}
        <AnimatePresence mode="wait">
          {viewMode === 'immersive' && (
            <motion.div
              key="immersive"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, y: 50, rotateY: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  onHoverStart={() => setHoveredDestination(destination.id)}
                  onHoverEnd={() => setHoveredDestination(null)}
                  className="perspective-1000"
                >
                  <motion.div
                    whileHover={{ 
                      rotateY: 5,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    className="transform-gpu"
                  >
                    <Card 
                      className="overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer group bg-white border-0 shadow-lg relative"
                      onClick={() => onDestinationSelect?.(destination.id)}
                    >
                      {/* 3D Card Effect */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-white/20 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        animate={{
                          background: hoveredDestination === destination.id 
                            ? "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), rgba(255,255,255,0.3))"
                            : "linear-gradient(45deg, transparent, rgba(255,255,255,0.05), rgba(255,255,255,0.2))"
                        }}
                      />

                      <div className="relative h-72 overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.15 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="h-full"
                        >
                          <ImageWithFallback
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                        
                        {/* Dynamic Overlay */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        {/* Floating Elements */}
                        <AnimatePresence>
                          {hoveredDestination === destination.id && (
                            <>
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-2 h-2 bg-white/40 rounded-full"
                                  initial={{ 
                                    x: Math.random() * 300,
                                    y: Math.random() * 200,
                                    opacity: 0 
                                  }}
                                  animate={{ 
                                    y: [0, -50, -100],
                                    opacity: [0, 1, 0],
                                    scale: [0, 1, 0]
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: i * 0.2,
                                    ease: "easeOut"
                                  }}
                                />
                              ))}
                            </>
                          )}
                        </AnimatePresence>
                        
                        {/* Enhanced Category Badge */}
                        <motion.div 
                          className="absolute top-4 left-4"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Badge className="bg-white/95 text-gray-800 backdrop-blur-md border-0 shadow-xl">
                            {categories.find(c => c.id === destination.category)?.label}
                          </Badge>
                        </motion.div>
                        
                        {/* Enhanced Rating */}
                        <motion.div 
                          className="absolute top-4 right-4"
                          whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="bg-white/95 backdrop-blur-md rounded-full px-3 py-2 flex items-center space-x-1 shadow-xl">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-semibold">{destination.rating}</span>
                          </div>
                        </motion.div>

                        {/* Interactive Action Panel */}
                        <motion.div 
                          className="absolute bottom-4 right-4 flex flex-col gap-2"
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {[
                            { icon: Heart, color: "text-red-500" },
                            { icon: Share2, color: "text-blue-500" },
                            { icon: Camera, color: "text-green-500" },
                            { icon: Navigation, color: "text-purple-500" }
                          ].map((action, idx) => {
                            const Icon = action.icon;
                            return (
                              <motion.button
                                key={idx}
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.8 }}
                                className="bg-white/95 backdrop-blur-md p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
                                onClick={(e) => e.stopPropagation()}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                <Icon className={`h-4 w-4 ${action.color}`} />
                              </motion.button>
                            );
                          })}
                        </motion.div>

                        {/* Hover Info Panel */}
                        <AnimatePresence>
                          {hoveredDestination === destination.id && (
                            <motion.div
                              className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-lg p-4 shadow-xl max-w-xs"
                              initial={{ opacity: 0, y: 20, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 20, scale: 0.8 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="text-sm text-gray-800 space-y-1">
                                <div className="flex items-center space-x-2">
                                  <Eye className="h-3 w-3 text-blue-500" />
                                  <span>View Details</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-3 w-3 text-green-500" />
                                  <span>{destination.distance}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-3 w-3 text-orange-500" />
                                  <span>{destination.duration}</span>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <CardHeader className="pb-4">
                        <motion.div 
                          className="flex justify-between items-start mb-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <h3 className="font-bold text-xl group-hover:text-green-600 transition-colors duration-300">
                            {destination.name}
                          </h3>
                        </motion.div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {destination.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-6">
                          {destination.highlights.map((highlight, idx) => (
                            <motion.div
                              key={idx}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge 
                                variant="secondary" 
                                className="text-xs bg-green-50 text-green-700 hover:bg-green-100 transition-colors cursor-pointer"
                              >
                                {highlight}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex gap-3">
                          <motion.div 
                            className="flex-1"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button 
                              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg transform transition-all duration-300"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDestinationSelect?.(destination.id);
                              }}
                            >
                              <Sparkles className="mr-2 h-4 w-4" />
                              Explore Now
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-2 hover:bg-green-50 hover:border-green-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Play className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredDestinations.map((destination, index) => (
                <motion.div
                  key={destination.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="cursor-pointer"
                  onClick={() => onDestinationSelect?.(destination.id)}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <div className="relative h-40">
                      <ImageWithFallback
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className="text-xs">
                          {destination.rating}★
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{destination.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{destination.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          {viewMode === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center"
            >
              <div className="text-center">
                <Map className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Map View</h3>
                <p className="text-gray-600 mb-4">Coming Soon - 3D Interactive Map with AR Integration</p>
                <Button>
                  <Globe className="mr-2 h-4 w-4" />
                  Launch Map
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredDestinations.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Filter className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-3">No destinations found</h3>
            <p className="text-gray-500 text-lg mb-6">Try adjusting your search or filter criteria</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="border-2"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}