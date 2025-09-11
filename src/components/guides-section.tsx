import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Shield, 
  Award,
  MessageCircle,
  Calendar,
  Search,
  Filter,
  Languages,
  Mountain,
  Camera
} from "lucide-react";

export function GuidesSection() {
  const [selectedGuide, setSelectedGuide] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const specialties = [
    { id: "all", label: "All Guides", icon: Users },
    { id: "nature", label: "Nature & Wildlife", icon: Mountain },
    { id: "photography", label: "Photography", icon: Camera },
    { id: "cultural", label: "Cultural Tours", icon: Award },
  ];

  const guides = [
    {
      id: 1,
      name: "Ramesh Kumar Oraon",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=ramesh",
      specialty: "nature",
      rating: 4.9,
      reviews: 156,
      experience: "8 years",
      languages: ["Hindi", "English", "Oraon", "Kurukh"],
      location: "Netarhat Hills",
      price: "₹1,500/day",
      verified: true,
      certified: true,
      tours: 340,
      description: "Expert wildlife photographer and nature guide with deep knowledge of Jharkhand's flora and fauna.",
      specializations: ["Wildlife Photography", "Bird Watching", "Tribal Culture", "Trekking"],
      achievements: ["Wildlife Photography Award 2023", "Best Guide - Netarhat 2022"],
      availability: "Available"
    },
    {
      id: 2,
      name: "Sunita Munda",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=sunita",
      specialty: "cultural",
      rating: 4.8,
      reviews: 98,
      experience: "6 years",
      languages: ["Hindi", "English", "Mundari", "Santali"],
      location: "Ranchi",
      price: "₹1,200/day",
      verified: true,
      certified: true,
      tours: 210,
      description: "Cultural heritage specialist with expertise in tribal traditions, handicrafts, and folk performances.",
      specializations: ["Tribal Heritage", "Handicraft Workshops", "Folk Dance", "Traditional Cuisine"],
      achievements: ["Cultural Ambassador 2023", "Heritage Preservation Award"],
      availability: "Available"
    },
    {
      id: 3,
      name: "Arjun Singh",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=arjun",
      specialty: "photography",
      rating: 4.7,
      reviews: 73,
      experience: "5 years",
      languages: ["Hindi", "English", "Bhojpuri"],
      location: "Hundru Falls",
      price: "₹1,800/day",
      verified: true,
      certified: true,
      tours: 145,
      description: "Professional photographer specializing in waterfall and landscape photography across Jharkhand.",
      specializations: ["Landscape Photography", "Waterfall Tours", "Adventure Photography", "Drone Photography"],
      achievements: ["Photography Excellence Award", "National Geographic Feature"],
      availability: "Busy until Jan 15"
    },
    {
      id: 4,
      name: "Priya Kumari Ho",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=priya",
      specialty: "nature",
      rating: 4.9,
      reviews: 127,
      experience: "7 years",
      languages: ["Hindi", "English", "Ho"],
      location: "Betla National Park",
      price: "₹1,600/day",
      verified: true,
      certified: true,
      tours: 285,
      description: "Wildlife conservation expert and safari guide with extensive knowledge of Betla's ecosystem.",
      specializations: ["Wildlife Safari", "Conservation Education", "Jungle Tracking", "Eco-tourism"],
      achievements: ["Conservation Leadership Award", "Wildlife Expert Certification"],
      availability: "Available"
    },
    {
      id: 5,
      name: "Manoj Tirkey",
      avatar: "https://api.dicebear.com/7.x/avatars/svg?seed=manoj",
      specialty: "cultural",
      rating: 4.6,
      reviews: 89,
      experience: "4 years",
      languages: ["Hindi", "English", "Kurukh"],
      location: "Deoghar",
      price: "₹1,000/day",
      verified: true,
      certified: false,
      tours: 156,
      description: "Spiritual tourism guide with deep knowledge of temples and religious practices in Jharkhand.",
      specializations: ["Temple Tours", "Spiritual Guidance", "Religious Festivals", "Pilgrimage"],
      achievements: ["Pilgrimage Guide Certificate", "Community Service Award"],
      availability: "Available"
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const specialtyMatch = selectedSpecialty === "all" || guide.specialty === selectedSpecialty;
    const searchMatch = guide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       guide.specializations.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    return specialtyMatch && searchMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Local Guides
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Connect with verified local experts for authentic and personalized experiences
        </p>
      </div>

      {/* Verification Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center space-x-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <div className="text-center">
            <h3 className="font-semibold text-lg">Blockchain-Verified Guides</h3>
            <p className="text-sm text-gray-600">
              All guides are background-checked • Licensed • Insured • Digitally certified
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search guides, specialties, or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {specialties.map((specialty) => {
            const Icon = specialty.icon;
            return (
              <Button
                key={specialty.id}
                variant={selectedSpecialty === specialty.id ? "default" : "outline"}
                onClick={() => setSelectedSpecialty(specialty.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span>{specialty.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={guide.avatar} alt={guide.name} />
                  <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-lg">{guide.name}</h3>
                    {guide.verified && (
                      <Shield className="h-4 w-4 text-blue-600" />
                    )}
                    {guide.certified && (
                      <Award className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{guide.rating}</span>
                      <span>({guide.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{guide.experience}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-600 mt-1">
                    <MapPin className="h-3 w-3" />
                    <span>{guide.location}</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">
                {guide.description}
              </p>

              {/* Languages */}
              <div className="flex items-center space-x-2">
                <Languages className="h-4 w-4 text-gray-500" />
                <div className="flex flex-wrap gap-1">
                  {guide.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Specializations */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
                <div className="flex flex-wrap gap-1">
                  {guide.specializations.slice(0, 3).map((spec) => (
                    <Badge key={spec} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                  {guide.specializations.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{guide.specializations.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 py-3 border-t border-gray-100">
                <div className="text-center">
                  <div className="font-semibold text-lg">{guide.tours}</div>
                  <div className="text-xs text-gray-500">Tours Completed</div>
                </div>
                <div className="text-center">
                  <div className={`font-semibold text-lg ${
                    guide.availability === "Available" ? "text-green-600" : "text-orange-600"
                  }`}>
                    {guide.availability === "Available" ? "Available" : "Busy"}
                  </div>
                  <div className="text-xs text-gray-500">Status</div>
                </div>
              </div>

              {/* Pricing and Actions */}
              <div className="flex items-center justify-between pt-2 border-t">
                <div>
                  <span className="text-xl font-bold text-green-600">{guide.price}</span>
                  <span className="text-sm text-gray-500 ml-1">per day</span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedGuide(guide.id)}
                  >
                    View Profile
                  </Button>
                  <Button size="sm">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGuides.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No guides found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Detailed Guide Profile Modal/Expanded View */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {(() => {
                    const guide = guides.find(g => g.id === selectedGuide)!;
                    return (
                      <>
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={guide.avatar} alt={guide.name} />
                          <AvatarFallback>{guide.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h2 className="text-2xl font-bold flex items-center space-x-2">
                            <span>{guide.name}</span>
                            {guide.verified && <Shield className="h-5 w-5 text-blue-600" />}
                            {guide.certified && <Award className="h-5 w-5 text-green-600" />}
                          </h2>
                          <div className="flex items-center space-x-4 text-gray-600 mt-1">
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{guide.rating} ({guide.reviews} reviews)</span>
                            </div>
                            <span>•</span>
                            <span>{guide.experience} experience</span>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <Button variant="outline" onClick={() => setSelectedGuide(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              {(() => {
                const guide = guides.find(g => g.id === selectedGuide)!;
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3">About</h3>
                        <p className="text-gray-600">{guide.description}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">Specializations</h3>
                        <div className="flex flex-wrap gap-2">
                          {guide.specializations.map((spec) => (
                            <Badge key={spec} variant="outline">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {guide.languages.map((lang) => (
                            <Badge key={lang} variant="secondary">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">Achievements</h3>
                        <ul className="space-y-1">
                          {guide.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-center space-x-2">
                              <Award className="h-4 w-4 text-green-600" />
                              <span className="text-sm">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-lg mb-3">Booking Information</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span>Daily Rate:</span>
                            <span className="font-semibold text-green-600">{guide.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Location:</span>
                            <span>{guide.location}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Availability:</span>
                            <span className={guide.availability === "Available" ? "text-green-600" : "text-orange-600"}>
                              {guide.availability}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tours Completed:</span>
                            <span>{guide.tours}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button className="w-full" size="lg">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book This Guide
                        </Button>
                        <Button variant="outline" className="w-full" size="lg">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Guide Statistics */}
      <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Trusted by Travelers Worldwide</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold">150+</div>
            <div className="text-sm opacity-80">Verified Guides</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">5,000+</div>
            <div className="text-sm opacity-80">Tours Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.8</div>
            <div className="text-sm opacity-80">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm opacity-80">Support Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}