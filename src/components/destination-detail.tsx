import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Camera, 
  Share2, 
  Heart,
  Calendar,
  Users,
  Thermometer,
  TreePine,
  Mountain,
  Building,
  Waves,
  Info,
  Navigation,
  Phone,
  Globe,
  BookOpen,
  Compass
} from "lucide-react";

interface DestinationDetailProps {
  destinationId: number;
  onBack: () => void;
}

export function DestinationDetail({ destinationId, onBack }: DestinationDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLiked, setIsLiked] = useState(false);

  // Comprehensive destination data with historical and cultural information
  const destinationData: Record<number, any> = {
    1: {
      id: 1,
      name: "Hundru Falls",
      category: "waterfalls",
      images: [
        "https://images.unsplash.com/photo-1735567065045-97ba386867ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqaGFya2hhbmQlMjB3YXRlcmZhbGwlMjBuYXR1cmUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3NDA5OTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBtaXN0JTIwZm9yZXN0fGVufDF8fHx8MTc1NzQxMDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1569163139394-de4e4f43e4e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjByb2NrcyUyMG5hdHVyZXxlbnwxfHx8fDE3NTc0MTA1ODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      rating: 4.8,
      duration: "4-6 hours",
      distance: "45 km from Ranchi",
      bestTime: "October to March",
      description: "One of Jharkhand's most spectacular natural wonders, Hundru Falls cascades 98 meters down rocky cliffs, creating a mesmerizing spectacle of nature's power and beauty.",
      
      history: {
        title: "Ancient Legacy of Hundru Falls",
        content: `Hundru Falls, known locally as "Hundru Ghagh," holds deep cultural significance in the folklore of Jharkhand's tribal communities. The name "Hundru" is derived from the Mundari word meaning "thunderous roar," reflecting the powerful sound of water crashing against the rocks below.

Historical records from the British colonial period mention this waterfall as a sacred site for the Munda and Oraon tribes, who believed the falls were blessed by their ancestral spirits. Local legends speak of Birsa Munda, the great tribal leader and freedom fighter, who often found solace and inspiration near these falls during his struggle against British rule in the late 19th century.

The geological formation of Hundru Falls dates back millions of years, carved by the Subarnarekha River as it cuts through the Chotanagpur Plateau's ancient granite and gneiss rocks. The falls have served as a natural landmark for centuries, guiding travelers and traders along the ancient routes connecting different tribal territories.

During the monsoon season, the tribal communities traditionally conducted harvest festivals and water worship ceremonies at the base of the falls, a practice that continues today in modified forms. The British geological surveys of the 1900s documented the falls as part of their extensive mapping of Jharkhand's natural resources, recognizing its potential for hydroelectric development, though such plans were never realized to preserve its natural beauty.`
      },

      highlights: [
        "98-meter high waterfall",
        "Spectacular photography spots", 
        "Tribal cultural significance",
        "Trekking trails",
        "Natural swimming pools",
        "Bird watching opportunities"
      ],

      practicalInfo: {
        entryFee: "₹20 per person",
        timings: "6:00 AM - 6:00 PM",
        parking: "₹50 for cars, ₹20 for bikes",
        facilities: ["Parking", "Basic restrooms", "Food stalls", "Guide services"],
        safety: "Swimming not recommended during monsoon",
        accessibility: "Moderate trek required (30 minutes)",
        contact: "+91-651-2234567"
      },

      weather: {
        current: "Pleasant, 24°C",
        recommendation: "Perfect for visiting",
        seasonal: {
          winter: "Cool and pleasant (15-25°C)",
          summer: "Warm but manageable (25-35°C)", 
          monsoon: "Heavy rainfall, best water flow but risky"
        }
      },

      activities: [
        "Photography",
        "Nature walks",
        "Rock climbing",
        "Picnicking", 
        "Bird watching",
        "Meditation"
      ],

      localGuides: [
        {
          name: "Ramesh Oraon",
          specialty: "Nature & Photography",
          rating: 4.9,
          price: "₹800/day",
          languages: ["Hindi", "English", "Oraon"]
        },
        {
          name: "Sunita Munda",
          specialty: "Tribal Culture & History",
          rating: 4.8,
          price: "₹1000/day", 
          languages: ["Hindi", "English", "Mundari"]
        }
      ]
    },

    2: {
      id: 2,
      name: "Betla National Park",
      category: "wildlife",
      images: [
        "https://images.unsplash.com/photo-1634320248323-39f8f937019f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMG5hdGlvbmFsJTIwcGFyayUyMHRpZ2VyfGVufDF8fHx8MTc1NzQwOTk5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1549366021-9f761d040a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHdpbGRsaWZlJTIwbmF0dXJlfGVufDF8fHx8MTc1NzQxMDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3Jlc3QlMjB3aWxkbGlmZSUyMG5hdHVyZXxlbnwxfHx8fDE3NTc0MTA1ODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      rating: 4.6,
      duration: "Full Day",
      distance: "170 km from Ranchi", 
      bestTime: "November to April",
      description: "A pristine wilderness sanctuary home to Bengal tigers, Asian elephants, and over 200 bird species, offering an authentic wildlife experience in the heart of Jharkhand.",

      history: {
        title: "From Royal Hunting Ground to Conservation Haven",
        content: `Betla National Park, established in 1986, was originally part of the hunting reserves of the princely state of Chota Nagpur. The area has been known for its rich wildlife for centuries, with historical records from the 16th century Mughal period mentioning the abundance of tigers and elephants in these forests.

The name "Betla" comes from the local Kurukh language, meaning "place of many bamboos," reflecting the dense bamboo groves that form a significant part of the ecosystem. During the British Raj, this area was designated as a Reserved Forest in 1935, primarily to protect the timber resources and maintain the ecological balance of the Palamau region.

The transformation from a hunting ground to a conservation area began in the 1970s under the Project Tiger initiative launched by the Government of India. Betla became one of the first tiger reserves in Jharkhand, playing a crucial role in the conservation of the Bengal tiger population in Central India.

Archaeological evidence suggests that this region has been inhabited for over 2,000 years, with ancient cave paintings found in the nearby Kaimur Hills depicting hunting scenes and wildlife that once roamed these forests. The Chero dynasty, which ruled parts of this region from the 12th to 18th centuries, considered these forests sacred and implemented some of the earliest known wildlife protection measures.

Local tribal communities like the Korwa and Birhor have coexisted with the wildlife for generations, developing sustainable practices that helped maintain the ecological balance. Their traditional knowledge of animal behavior and forest ecology continues to assist modern conservation efforts.`
      },

      highlights: [
        "Bengal Tiger sightings",
        "Asian Elephant herds",
        "200+ bird species",
        "Ancient cave paintings", 
        "Watchtowers and hides",
        "Night safari experiences"
      ],

      practicalInfo: {
        entryFee: "₹200 Indians, ₹1500 Foreigners",
        timings: "6:00 AM - 5:00 PM",
        safariCharges: "₹2000 for jeep safari (up to 6 people)",
        facilities: ["Rest house", "Cafeteria", "Nature interpretation center", "Library"],
        bestSafariTime: "Early morning (6-9 AM) and late afternoon (3-5 PM)",
        bookingRequired: "Yes, advance booking recommended",
        contact: "+91-6565-244242"
      },

      weather: {
        current: "Cool and dry, 22°C",
        recommendation: "Excellent for wildlife viewing",
        seasonal: {
          winter: "Perfect weather (12-25°C), best wildlife activity",
          summer: "Hot (25-40°C), animals near water sources",
          monsoon: "Park closed for safety"
        }
      },

      activities: [
        "Tiger safari",
        "Elephant spotting", 
        "Bird watching",
        "Nature photography",
        "Trekking",
        "Night safari"
      ],

      localGuides: [
        {
          name: "Priya Kumar Ho",
          specialty: "Wildlife Safari & Photography",
          rating: 4.9,
          price: "₹1600/day",
          languages: ["Hindi", "English", "Ho"]
        },
        {
          name: "Mahesh Tirkey",
          specialty: "Bird Watching & Nature Trails",
          rating: 4.7,
          price: "₹1200/day",
          languages: ["Hindi", "English", "Kurukh"]
        }
      ]
    },

    3: {
      id: 3,
      name: "Netarhat Hill Station",
      category: "hills",
      images: [
        "https://images.unsplash.com/photo-1734883502990-c002b4e47026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpbGwlMjBzdGF0aW9uJTIwc2NlbmljJTIwdmlld3xlbnwxfHx8fDE3NTc0MDk5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwbW91bnRhaW4lMjBtaXN0fGVufDF8fHx8MTc1NzQxMDU4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaW5lJTIwZm9yZXN0JTIwbW91bnRhaW58ZW58MXx8fHwxNzU3NDEwNTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
      ],
      rating: 4.7,
      duration: "2-3 days",
      distance: "156 km from Ranchi",
      bestTime: "October to March",
      description: "Known as the 'Queen of Chotanagpur,' Netarhat offers breathtaking panoramic views, spectacular sunrises and sunsets, and a cool climate that provides respite from the plains.",

      history: {
        title: "The Crown Jewel of Chotanagpur Plateau",
        content: `Netarhat, situated at an elevation of 1,128 meters, derives its name from the Hindi words "Netar" (leader) and "Hat" (market), signifying its historical importance as a central trading hub in the Chotanagpur Plateau. This hill station has been known for its strategic location and pleasant climate for over two centuries.

The area gained prominence during the British colonial period when it was developed as a summer retreat for British officials stationed in the hot plains of Bihar and Bengal. In 1894, the British established a residential school here, which later became the renowned Netarhat Residential School, often called the "Eton of the East."

Local tribal legends speak of Netarhat as a sacred place where the gods would come to rest. The Ho and Munda tribes considered the highest peak of Netarhat as the abode of their mountain spirits, and many tribal festivals were traditionally celebrated here during the harvest season.

During the Indian independence movement, Netarhat served as a hideout for freedom fighters. The dense forests and difficult terrain provided perfect cover for revolutionaries planning their activities against British rule. Many secret meetings of tribal leaders were held in the caves and forests surrounding Netarhat.

The geological formation of Netarhat dates back to the Precambrian era, making it one of the oldest landforms in India. The plateau was formed through volcanic activity and subsequent erosion over millions of years, creating the unique undulating landscape that characterizes the region today.

The establishment of the Netarhat Field Firing Range by the Indian Army in 1958 further increased the strategic importance of this region. However, the military presence has also helped in preserving the natural ecosystem by restricting unauthorized access to large areas of forest.`
      },

      highlights: [
        "Spectacular sunrise and sunset views",
        "Pine forests and natural trails",
        "Magnolia Point viewpoint",
        "Cool mountain climate",
        "Historical residential school",
        "Tribal cultural sites"
      ],

      practicalInfo: {
        entryFee: "Free entry",
        timings: "24 hours (viewpoints best at sunrise/sunset)",
        accommodation: "₹1500-5000 per night (various options)",
        facilities: ["Tourist lodge", "Restaurants", "Guide services", "Trek routes"],
        viewpoints: ["Sunrise Point", "Sunset Point", "Magnolia Point"],
        trekking: "Multiple trails available",
        contact: "+91-6564-267890"
      },

      weather: {
        current: "Cool and pleasant, 18°C",
        recommendation: "Perfect hill station weather",
        seasonal: {
          winter: "Cool and misty (8-20°C), best for sightseeing",
          summer: "Pleasant (15-28°C), ideal escape from heat",
          monsoon: "Heavy rainfall, lush greenery but limited visibility"
        }
      },

      activities: [
        "Sunrise/sunset viewing",
        "Nature walks",
        "Photography",
        "Trekking",
        "Camping",
        "Star gazing"
      ],

      localGuides: [
        {
          name: "Anita Lakra",
          specialty: "Mountain Trekking & Photography",
          rating: 4.8,
          price: "₹1000/day",
          languages: ["Hindi", "English", "Ho"]
        },
        {
          name: "David Topno",
          specialty: "History & Cultural Tours",
          rating: 4.9,
          price: "₹1200/day",
          languages: ["Hindi", "English", "Kurukh"]
        }
      ]
    }
  };

  // Related destinations based on category and proximity
  const relatedDestinations = [
    {
      id: 4,
      name: "Jonha Falls",
      category: "waterfalls",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmZhbGwlMjBtaXN0JTIwZm9yZXN0fGVufDF8fHx8MTc1NzQxMDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.5,
      distance: "30 km from Ranchi",
      description: "A beautiful 43-meter waterfall perfect for trekking and picnics."
    },
    {
      id: 5,
      name: "Patratu Valley",
      category: "hills", 
      image: "https://images.unsplash.com/photo-1734883502990-c002b4e47026?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhpbGwlMjBzdGF0aW9uJTIwc2NlbmljJTIwdmlld3xlbnwxfHx8fDE3NTc0MDk5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.3,
      distance: "40 km from Ranchi",
      description: "Scenic valley with dam views and adventure activities."
    },
    {
      id: 6,
      name: "Birsa Zoological Park",
      category: "wildlife",
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHdpbGRsaWZlJTIwbmF0dXJlfGVufDF8fHx8MTc1NzQxMDU4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      rating: 4.2,
      distance: "15 km from Ranchi",
      description: "Well-maintained zoo with diverse wildlife species."
    }
  ];

  const destination = destinationData[destinationId];
  
  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Destination Not Found</h2>
        <Button onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Destinations
        </Button>
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "history", label: "History & Culture", icon: BookOpen },
    { id: "planning", label: "Plan Your Visit", icon: Calendar },
    { id: "guides", label: "Local Guides", icon: Users }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Destinations
        </Button>
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsLiked(!isLiked)}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden mb-8">
        <ImageWithFallback
          src={destination.images[0]}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Badge className="bg-white/20 text-white border-white/30">
              {destination.category}
            </Badge>
            <div className="flex items-center space-x-1 bg-white/20 rounded-full px-2 py-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{destination.rating}</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">{destination.name}</h1>
          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{destination.distance}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{destination.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Thermometer className="h-4 w-4" />
              <span>{destination.weather.current}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {destination.description}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {destination.highlights.map((highlight, index) => (
                    <Badge key={index} variant="secondary" className="p-2 text-center">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Photo Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {destination.images.slice(1).map((image, index) => (
                    <div key={index} className="relative h-40 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={image}
                        alt={`${destination.name} ${index + 2}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Activities</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.activities.map((activity, index) => (
                    <Badge key={index} variant="outline" className="p-2">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">{destination.history.title}</h2>
                <div className="prose prose-lg max-w-none">
                  {destination.history.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "planning" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Practical Information</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          Entry & Timing
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Entry Fee:</strong> {destination.practicalInfo.entryFee}</p>
                          <p><strong>Timings:</strong> {destination.practicalInfo.timings}</p>
                          {destination.practicalInfo.safariCharges && (
                            <p><strong>Safari:</strong> {destination.practicalInfo.safariCharges}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          Contact & Facilities
                        </h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Contact:</strong> {destination.practicalInfo.contact}</p>
                          <p><strong>Facilities:</strong> {destination.practicalInfo.facilities.join(", ")}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Weather & Best Time</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(destination.weather.seasonal).map(([season, weather]) => (
                        <div key={season} className="text-center p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium capitalize mb-2">{season}</h4>
                          <p className="text-sm text-gray-600">{weather}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "guides" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Local Guides</h2>
                <div className="space-y-4">
                  {destination.localGuides.map((guide, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{guide.name}</h3>
                            <p className="text-gray-600 mb-2">{guide.specialty}</p>
                            <div className="flex items-center space-x-2 mb-2">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{guide.rating}</span>
                              <span className="text-sm text-gray-500">•</span>
                              <span className="text-sm text-gray-600">{guide.languages.join(", ")}</span>
                            </div>
                            <p className="font-medium text-green-600">{guide.price}</p>
                          </div>
                          <Button size="sm">Book Guide</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Quick Actions</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Add to Itinerary
              </Button>
              <Button variant="outline" className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                AR Preview
              </Button>
              <Button variant="outline" className="w-full">
                <Navigation className="mr-2 h-4 w-4" />
                Get Directions
              </Button>
            </CardContent>
          </Card>

          {/* Weather Widget */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">Current Weather</h3>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">{destination.weather.current}</div>
                <p className="text-sm text-gray-600 mb-3">{destination.weather.recommendation}</p>
                <Badge variant="secondary">{destination.bestTime}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Related Destinations */}
          <Card>
            <CardHeader>
              <h3 className="font-semibold">You Might Also Like</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {relatedDestinations.map((related) => (
                <div key={related.id} className="flex space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={related.image}
                      alt={related.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{related.name}</h4>
                    <p className="text-xs text-gray-600 mb-1">{related.distance}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs">{related.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}