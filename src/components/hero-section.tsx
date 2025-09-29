import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  Star, 
  Calendar, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Globe, 
  Compass, 
  Zap, 
  Eye, 
  Camera, 
  Brain, 
  Shield, 
  Heart,
  Navigation,
  Mountain,
  Trees,
  Waves,
  Sun,
  Moon,
  Cloud,
  Wind,
  Target,
  Users,
  ChevronDown,
  Volume2,
  VolumeX,
  RotateCcw,
  Share2,
  BookOpen,
  Gift
} from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onPlanTripClick: () => void;
  onDestinationSelect?: (destinationId: number) => void;
}

export function HeroSection({ onExploreClick, onPlanTripClick, onDestinationSelect }: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherEffect, setWeatherEffect] = useState('sunny');
  const [isLoaded, setIsLoaded] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]));
  
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const isInView = useInView(heroRef, { once: true });

  // Enhanced destination data
  const featuredDestinations = [
    {
      id: 1,
      name: "Hundru Falls",
      image: "https://images.unsplash.com/photo-1735567065045-97ba386867ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFya2hhbmQlMjB3YXRlcmZhbGwlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3NDA5OTk1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.8,
      type: "Waterfall",
      height: "98m",
      bestTime: "Post-Monsoon",
      activities: ["Photography", "Trekking", "Nature Walk"],
      distance: "45 km from Ranchi",
      icon: Waves,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Betla National Park",
      image: "https://images.unsplash.com/photo-1634320248323-39f8f937019f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMG5hdGlvbmFsJTIwcGFyayUyMHRpZ2VyfGVufDF8fHx8MTc1NzQwOTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.6,
      type: "Wildlife",
      area: "979 sq km",
      bestTime: "Nov-Mar",
      activities: ["Safari", "Bird Watching", "Wildlife Photography"],
      distance: "25 km from Latehar",
      icon: Trees,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "Netarhat Hill Station",
      image: "https://images.unsplash.com/photo-1734883502990-c002b4e47026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpbGwlMjBzdGF0aW9uJTIwc2NlbmljJTIwdmlld3xlbnwxfHx8fDE3NTc0MDk5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.7,
      type: "Hill Station",
      elevation: "1128m",
      bestTime: "Oct-Apr",
      activities: ["Sunrise View", "School Visit", "Nature Walk"],
      distance: "156 km from Ranchi",
      icon: Mountain,
      color: "from-purple-500 to-pink-500"
    },
  ];

  const backgroundSlides = [
    {
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjBuYXR1cmUlMjBsYW5kc2NhcGUlMjBmb3Jlc3R8ZW58MXx8fHwxNzU3NDA5OTk1fDA&ixlib=rb-4.1.0&q=80&w=1920&utm_source=figma&utm_medium=referral",
      title: "Pristine Forests",
      subtitle: "Dense Wildlife Sanctuaries"
    },
    {
      image: "https://images.unsplash.com/photo-1571295825108-731506d6b24e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXN0eSUyMG1vdW50YWlucyUyMHN1bnJpc2V8ZW58MXx8fHwxNzU5MDI5ODQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Misty Mountains",
      subtitle: "Sunrise Above Clouds"
    },
    {
      image: "https://images.unsplash.com/photo-1625023455567-09b002682d1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGxzJTIwZm9yZXN0JTIwaW5kaWF8ZW58MXx8fHwxNzU5MDI5ODM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Thundering Waterfalls",
      subtitle: "Cascading Natural Wonder"
    }
  ];

  const floatingElements = [
    { icon: Sparkles, position: { top: '15%', left: '10%' }, delay: 0 },
    { icon: Compass, position: { top: '25%', right: '15%' }, delay: 0.5 },
    { icon: Globe, position: { bottom: '35%', left: '8%' }, delay: 1 },
    { icon: Zap, position: { top: '45%', right: '20%' }, delay: 1.5 },
    { icon: Heart, position: { bottom: '25%', right: '12%' }, delay: 2 },
    { icon: Star, position: { top: '35%', left: '25%' }, delay: 2.5 },
  ];

  const weatherEffects = ['sunny', 'cloudy', 'misty'];
  
  useEffect(() => {
    setIsLoaded(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const weatherTimer = setInterval(() => {
      setWeatherEffect(weatherEffects[Math.floor(Math.random() * weatherEffects.length)]);
    }, 8000);

    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % backgroundSlides.length);
    }, 6000);

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
      clearInterval(slideTimer);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  return (
    <div 
      className="relative overflow-hidden min-h-screen perspective-1000 bg-black text-white select-none my-40px"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Dynamic Background - Static */}
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
      >
        <AnimatePresence mode="wait">
          {backgroundSlides.map((slide, index) => (
            index === activeSlide && (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.1, rotateY: 15 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                  transition: { duration: 2, ease: "easeOut" }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  rotateY: -15,
                  transition: { duration: 1.5 }
                }}
              >
                <ImageWithFallback
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Weather Effects */}
                <div className="absolute inset-0">
                  {weatherEffect === 'misty' && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/30"
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  )}
                  
                  {weatherEffect === 'cloudy' && (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute bg-white/15 rounded-full"
                          style={{
                            width: Math.random() * 100 + 40,
                            height: Math.random() * 50 + 20,
                            top: `${Math.random() * 40}%`,
                            left: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            opacity: [0.15, 0.4, 0.15]
                          }}
                          transition={{
                            duration: 8 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 3
                          }}
                        />
                      ))}
                    </>
                  )}
                </div>

                {/* Static Particles */}
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/30 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
        
        {/* Multi-layer Overlays */}
        <motion.div 
          className="absolute inset-0 bg-black/50"
          animate={{ opacity: isHovering ? 0.3 : 0.5 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-transparent to-blue-900/40" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={index}
              className="absolute"
              style={element.position}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0.2, 0.4, 0],
                scale: [0, 1, 0.8, 1, 0],
                rotate: [0, 45, 90, 135, 180]
              }}
              transition={{
                duration: 8,
                delay: element.delay,
                repeat: Infinity,
                repeatDelay: 4
              }}
            >
              <Icon className="h-6 w-6 text-white/30" />
            </motion.div>
          );
        })}
      </div>

      {/* Mouse Follower */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="fixed pointer-events-none z-50 mix-blend-difference"
            style={{
              left: mousePosition.x - 20,
              top: mousePosition.y - 20,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
          >
            <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 min-h-screen flex items-center"
        ref={heroRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Status Bar */}
          <motion.div
            className="flex justify-between items-center mt-8 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -20 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="flex items-center space-x-6">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                <span className="text-white text-sm">
                  {currentTime.toLocaleTimeString('en-IN', { 
                    timeZone: 'Asia/Kolkata',
                    hour12: true,
                    hour: '2-digit',
                    minute: '2-digit'
                  })} IST
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 flex items-center space-x-2">
                {weatherEffect === 'sunny' && <Sun className="h-4 w-4 text-yellow-400" />}
                {weatherEffect === 'cloudy' && <Cloud className="h-4 w-4 text-gray-300" />}
                {weatherEffect === 'misty' && <Wind className="h-4 w-4 text-blue-300" />}
                <span className="text-white text-sm capitalize">{weatherEffect}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsVideoMuted(!isVideoMuted)}
              >
                {isVideoMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </motion.button>
              <motion.button
                className="bg-white/10 backdrop-blur-md rounded-full p-3 border border-white/20 text-white hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveSlide((prev) => (prev + 1) % backgroundSlides.length)}
              >
                <RotateCcw className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge 
                  variant="secondary" 
                  className="mb-6 bg-gradient-to-r from-white/95 to-white/85 text-gray-800 backdrop-blur-md text-sm px-6 py-3 border-0 shadow-2xl"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI-Powered Tourism Platform
                  <Zap className="ml-2 h-4 w-4" />
                </Badge>
              </motion.div>

              {/* Title */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-white drop-shadow-2xl leading-tight"
                  style={{ 
                    background: 'linear-gradient(45deg, #ffffff, #a7f3d0, #ffffff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                >
                  {"Discover the Heart of".split(' ').map((word, index) => (
                    <motion.span
                      key={index}
                      className="inline-block mr-4"
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.5 + index * 0.15,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.h1>
                
                <motion.div
                  className="relative inline-block"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 1.2, type: "spring", stiffness: 200 }}
                >
                  <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-green-400 bg-clip-text text-transparent drop-shadow-2xl">
                    Jharkhand
                  </h1>
                  
                  <motion.div
                    className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-green-400 to-emerald-300 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                  />
                  
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        rotate: [0, 360]
                      }}
                      transition={{
                        duration: 3,
                        delay: 1.5 + i * 0.3,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <Sparkles className="h-4 w-4 text-green-300" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                <p className="text-xl lg:text-2xl text-gray-100 leading-relaxed drop-shadow-lg backdrop-blur-sm bg-black/20 rounded-2xl p-6 border border-white/10">
                  Experience the pristine beauty of cascading waterfalls, rich tribal heritage, ancient forests, 
                  and diverse wildlife sanctuaries with our revolutionary AI-powered travel companion.
                </p>
              </motion.div>
              
              {/* Action Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    className="text-xl px-10 py-4 bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 hover:from-green-700 hover:via-green-600 hover:to-emerald-700 shadow-2xl transform transition-all duration-300 border-0"
                    onClick={onExploreClick}
                  >
                    <Eye className="mr-3 h-6 w-6" />
                    Explore Destinations
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-6 w-6" />
                    </motion.div>
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-xl px-10 py-4 bg-white/95 hover:bg-white text-gray-800 border-2 border-white/80 hover:border-white shadow-2xl backdrop-blur-md"
                    onClick={onPlanTripClick}
                  >
                    <Brain className="mr-3 h-6 w-6" />
                    AI Trip Planner
                    <Sparkles className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Live Stats */}
              <motion.div
                className="grid grid-cols-3 gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.5 }}
              >
                {[
                  { icon: MapPin, value: "72+", label: "Destinations", color: "text-green-400" },
                  { icon: Users, value: "12K+", label: "Travelers", color: "text-blue-400" },
                  { icon: Heart, value: "32", label: "Communities", color: "text-purple-400" }
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center"
                      whileHover={{ scale: 1.05, y: -2 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 2.5 + index * 0.1 }}
                    >
                      <Icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                      <div className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>

            {/* Right Panel */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400/50 via-blue-400/50 to-purple-400/50"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ filter: 'blur(2px)' }}
                />
                
                <div className="relative space-y-6">
                  <div className="bg-black/30 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-semibold">Live Conditions</h3>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Target className="h-5 w-5 text-green-400" />
                      </motion.div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl text-white">23°C</div>
                        <div className="text-sm text-gray-300">Temperature</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl text-white">65%</div>
                        <div className="text-sm text-gray-300">Humidity</div>
                      </div>
                    </div>
                  </div>

                  <motion.div
                    key={activeSlide}
                    className="bg-black/30 rounded-2xl p-4 backdrop-blur-sm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="text-white font-semibold mb-2">
                      {backgroundSlides[activeSlide].title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {backgroundSlides[activeSlide].subtitle}
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Camera, label: "360° View", color: "from-blue-500 to-cyan-500" },
                      { icon: Play, label: "Virtual Tour", color: "from-green-500 to-emerald-500" },
                      { icon: BookOpen, label: "Learn More", color: "from-purple-500 to-pink-500" },
                      { icon: Share2, label: "Share", color: "from-orange-500 to-red-500" }
                    ].map((item, index) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={index}
                          className={`bg-gradient-to-r ${item.color} p-4 rounded-xl text-white shadow-lg transform transition-all duration-300`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 3 + index * 0.1 }}
                        >
                          <Icon className="h-5 w-5 mx-auto mb-2" />
                          <div className="text-xs">{item.label}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Featured Destinations */}
          <motion.div
            className="relative mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full mb-6 border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <Compass className="h-5 w-5" />
                <span>Featured Destinations</span>
                <Sparkles className="h-5 w-5" />
              </motion.div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
                Immersive Experiences Await
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Step into Jharkhand's most breathtaking destinations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000">
              {featuredDestinations.map((destination, index) => {
                const IconComponent = destination.icon;
                return (
                  <motion.div
                    key={destination.id}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, y: 50, rotateY: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      rotateY: 5, 
                      rotateX: -2,
                      scale: 1.02,
                      transition: { duration: 0.3 }
                    }}
                    onClick={() => onDestinationSelect?.(destination.id)}
                  >
                    <motion.div
                      className="relative bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform-gpu"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${destination.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                        animate={{ scale: [1, 1.05, 1], opacity: [0, 0.3, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ filter: 'blur(10px)', transform: 'scale(1.1)' }}
                      />

                      <div className="relative h-64 overflow-hidden">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="h-full"
                        >
                          <ImageWithFallback
                            src={destination.image}
                            alt={destination.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        <motion.div
                          className={`absolute top-4 left-4 bg-gradient-to-r ${destination.color} backdrop-blur-sm rounded-full px-4 py-2 text-white shadow-xl`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                        >
                          <div className="flex items-center space-x-2">
                            <IconComponent className="h-4 w-4" />
                            <span className="text-sm font-medium">{destination.type}</span>
                          </div>
                        </motion.div>

                        <motion.div
                          className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-xl"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                        >
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-bold text-gray-800">{destination.rating}</span>
                          </div>
                        </motion.div>
                      </div>

                      <CardContent className="p-6 space-y-4">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <h3 className="font-bold text-2xl text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                            {destination.name}
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>{destination.distance}</span>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-3">
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <Mountain className="h-4 w-4" />
                                <span>{destination.elevation || destination.height || destination.area}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {destination.activities.slice(0, 2).map((activity, idx) => (
                              <motion.span
                                key={idx}
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                                whileHover={{ scale: 1.05 }}
                              >
                                {activity}
                              </motion.span>
                            ))}
                            {destination.activities.length > 2 && (
                              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                +{destination.activities.length - 2} more
                              </span>
                            )}
                          </div>

                          <div className="flex gap-3">
                            <motion.button
                              className={`flex-1 bg-gradient-to-r ${destination.color} text-white py-3 px-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300`}
                              whileHover={{ scale: 1.02, y: -1 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onDestinationSelect?.(destination.id);
                              }}
                            >
                              Explore Now
                            </motion.button>
                            
                            <motion.button
                              className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-xl transition-colors duration-300"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Gift className="h-5 w-5" />
                            </motion.button>
                          </div>
                        </motion.div>
                      </CardContent>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            className="relative mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full mb-6 border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="h-5 w-5" />
                <span>AI-Powered Features</span>
                <Brain className="h-5 w-5" />
              </motion.div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
                Next-Generation Tourism Technology
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                Experience the future of travel with blockchain security, AI intelligence, and immersive technology
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 perspective-1000">
              {[
                {
                  icon: Navigation,
                  title: "AR Navigation",
                  description: "Augmented reality-powered real-time navigation with voice guidance",
                  color: "from-green-500 to-emerald-500",
                  bgColor: "bg-green-500/20",
                  borderColor: "border-green-300/30",
                  textColor: "text-green-300",
                  features: ["GPS Integration", "Voice Navigation", "Offline Maps", "AR Overlays"]
                },
                {
                  icon: Brain,
                  title: "AI Trip Planning",
                  description: "Machine learning algorithms create personalized journeys",
                  color: "from-blue-500 to-cyan-500",
                  bgColor: "bg-blue-500/20",
                  borderColor: "border-blue-300/30",
                  textColor: "text-blue-300",
                  features: ["Smart Recommendations", "Weather Integration", "Budget Planning", "Real-time Updates"]
                },
                {
                  icon: Users,
                  title: "Local Experiences",
                  description: "Connect with verified tribal communities and local guides",
                  color: "from-purple-500 to-pink-500",
                  bgColor: "bg-purple-500/20",
                  borderColor: "border-purple-300/30",
                  textColor: "text-purple-300",
                  features: ["Verified Guides", "Cultural Immersion", "Homestays", "Local Crafts"]
                },
                {
                  icon: Shield,
                  title: "Blockchain Security",
                  description: "Decentralized transactions ensure secure bookings",
                  color: "from-orange-500 to-red-500",
                  bgColor: "bg-orange-500/20",
                  borderColor: "border-orange-300/30",
                  textColor: "text-orange-300",
                  features: ["Secure Payments", "Guide Verification", "Smart Contracts", "Digital Identity"]
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative group cursor-pointer"
                    initial={{ opacity: 0, y: 50, rotateY: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ 
                      duration: 0.8, 
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      rotateY: 8, 
                      rotateX: -5,
                      scale: 1.05,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div
                      className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl transform-gpu min-h-[350px] flex flex-col"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                        animate={{ scale: [1, 1.05, 1], opacity: [0, 0.1, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ filter: 'blur(8px)' }}
                      />

                      <motion.div
                        className={`${feature.bgColor} backdrop-blur-sm rounded-2xl w-20 h-20 flex items-center justify-center mx-auto mb-6 border ${feature.borderColor} relative overflow-hidden`}
                        whileHover={{ 
                          scale: 1.2, 
                          rotateY: 180,
                          transition: { duration: 0.6 }
                        }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <IconComponent className={`h-10 w-10 ${feature.textColor}`} />
                        </motion.div>
                        
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ 
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)"
                          }}
                        >
                          <Sparkles className={`h-10 w-10 ${feature.textColor}`} />
                        </motion.div>
                      </motion.div>

                      <div className="text-center flex-1 flex flex-col">
                        <motion.h3 
                          className="font-bold text-xl text-white mb-4 group-hover:text-green-300 transition-colors duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                        >
                          {feature.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-gray-200 text-sm leading-relaxed mb-6 flex-1"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        >
                          {feature.description}
                        </motion.p>

                        <motion.div
                          className="space-y-2"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                        >
                          {feature.features.slice(0, 2).map((feat, idx) => (
                            <motion.div
                              key={idx}
                              className="bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-gray-300 border border-white/20"
                              whileHover={{ scale: 1.05 }}
                            >
                              {feat}
                            </motion.div>
                          ))}
                          <motion.div
                            className={`bg-gradient-to-r ${feature.color} text-white rounded-full px-3 py-1 text-xs font-medium shadow-lg`}
                            whileHover={{ scale: 1.05 }}
                          >
                            +{feature.features.length - 2} more features
                          </motion.div>
                        </motion.div>

                        <motion.button
                          className="mt-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-2 px-4 rounded-xl border border-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn More
                          <ArrowRight className="inline ml-2 h-4 w-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={onExploreClick}
              >
                <span className="flex items-center space-x-3">
                  <Compass className="h-6 w-6" />
                  <span>Start Your Jharkhand Journey</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="h-6 w-6" />
                  </motion.div>
                </span>
              </motion.button>

              <motion.div
                className="mt-12 flex flex-col items-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-white/60 text-sm mb-2">Scroll to explore more</span>
                <motion.div
                  className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
                >
                  <motion.div
                    className="w-1 h-3 bg-white/50 rounded-full mt-2"
                    animate={{ y: [0, 15, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}