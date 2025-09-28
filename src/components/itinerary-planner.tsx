import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Wallet, 
  Clock, 
  Bot,
  Sparkles,
  CheckCircle,
  Plus,
  Trash2,
  Car,
  Train,
  Bus,
  Bike,
  Mountain,
  TreePine,
  Camera,
  Edit,
  Star,
  Route
} from "lucide-react";

interface ItineraryBatch {
  id: string;
  title: string;
  description: string;
  region: string;
  difficulty: "Easy" | "Moderate" | "Adventurous";
  totalDistance: string;
  highlights: string[];
  rating: number;
  days: any[];
  cost: {
    accommodation: string;
    meals: string;
    transport: string;
    activities: string;
    total: string;
  };
  transportNote: string;
  includes: string[];
}

export function ItineraryPlanner() {
  const [step, setStep] = useState(1);
  const [plannerData, setPlannerData] = useState({
    destination: "",
    duration: "",
    budget: "",
    groupSize: "",
    interests: [] as string[],
    accommodationType: "",
    transportationMode: "",
    preferences: ""
  });

  const [itineraryBatches, setItineraryBatches] = useState<ItineraryBatch[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showManualCreator, setShowManualCreator] = useState(false);
  const [isEditingBatch, setIsEditingBatch] = useState(false);

  const interests = [
    "Nature & Wildlife", "Adventure Sports", "Cultural Heritage", 
    "Photography", "Trekking", "Spiritual Tourism", 
    "Tribal Culture", "Waterfalls", "Hill Stations"
  ];

  // Generate multiple itinerary batches based on different routes and regions
  const generateItineraryBatches = () => {
    const baseCosts = {
      accommodation: "₹2,400",
      meals: "₹1,800", 
      activities: "₹1,200"
    };

    // Adjust transport costs based on selected mode
    let transportCostMultiplier = 1;
    let transportNote = "Standard local transport";
    
    switch (plannerData.transportationMode) {
      case "self-drive":
        transportCostMultiplier = 1.4;
        transportNote = "Self-drive car rental with fuel";
        break;
      case "hired-cab":
        transportCostMultiplier = 1.6;
        transportNote = "Private cab with experienced local driver";
        break;
      case "public-transport":
        transportCostMultiplier = 0.6;
        transportNote = "Bus/train tickets + local auto/shared transport";
        break;
      case "motorcycle":
        transportCostMultiplier = 0.8;
        transportNote = "Motorcycle rental with safety gear";
        break;
      case "shared-jeep":
        transportCostMultiplier = 0.9;
        transportNote = "Shared jeep for hill station routes";
        break;
      case "train-local":
        transportCostMultiplier = 0.7;
        transportNote = "Train + local transport combination";
        break;
    }

    const batches: ItineraryBatch[] = [
      {
        id: "ranchi-circuit",
        title: "Ranchi Urban & Falls Circuit",
        description: "Perfect for first-time visitors focusing on Ranchi and nearby waterfalls",
        region: "Central Jharkhand",
        difficulty: "Easy",
        totalDistance: "120 km",
        highlights: ["Hundru Falls", "Rock Garden", "Tagore Hill", "Tribal Museum"],
        rating: 4.5,
        days: [
          {
            day: 1,
            title: "Ranchi City Exploration",
            activities: [
              { time: "09:00 AM", activity: "Visit Tagore Hill & Museum", location: "Morabadi, Ranchi" },
              { time: "11:30 AM", activity: "Rock Garden exploration", location: "Rock Garden" },
              { time: "01:00 PM", activity: "Traditional lunch", location: "Local Restaurant" },
              { time: "03:00 PM", activity: "Tribal Research Institute visit", location: "Research Institute" },
              { time: "05:30 PM", activity: "Local market shopping", location: "Main Road Market" }
            ]
          },
          {
            day: 2,
            title: "Waterfall Adventure",
            activities: [
              { time: "08:00 AM", activity: "Departure to Hundru Falls", location: "Hotel Ranchi" },
              { time: "10:00 AM", activity: "Hundru Falls visit", location: "Hundru Falls" },
              { time: "01:00 PM", activity: "Picnic lunch by falls", location: "Falls Area" },
              { time: "03:00 PM", activity: "Photography & nature walk", location: "Surrounding Area" },
              { time: "06:00 PM", activity: "Return to Ranchi", location: "Hotel" }
            ]
          },
          {
            day: 3,
            title: "Cultural Immersion",
            activities: [
              { time: "09:00 AM", activity: "Tribal handicraft workshop", location: "Cultural Center" },
              { time: "11:30 AM", activity: "Traditional cooking class", location: "Local Home" },
              { time: "02:00 PM", activity: "Folk dance performance", location: "Community Hall" },
              { time: "04:00 PM", activity: "Souvenir shopping", location: "Handicraft Market" },
              { time: "06:00 PM", activity: "Farewell dinner", location: "Traditional Restaurant" }
            ]
          }
        ],
        cost: {
          accommodation: baseCosts.accommodation,
          meals: baseCosts.meals,
          transport: `₹${Math.round(2800 * transportCostMultiplier)}`,
          activities: baseCosts.activities,
          total: `₹${Math.round((2800 * transportCostMultiplier) + 2400 + 1800 + 1200)}`
        },
        transportNote,
        includes: ["Accommodation", "All meals", "Local transport", "Guide services", "Entry fees"]
      },
      {
        id: "netarhat-hills",
        title: "Netarhat Hills & Tribal Villages",
        description: "Mountain adventure with tribal cultural experiences",
        region: "Western Jharkhand",
        difficulty: "Moderate", 
        totalDistance: "280 km",
        highlights: ["Netarhat Sunrise", "Pine Forests", "Tribal Villages", "Sunset Point"],
        rating: 4.7,
        days: [
          {
            day: 1,
            title: "Journey to Hills",
            activities: [
              { time: "06:00 AM", activity: "Early departure to Netarhat", location: "Ranchi" },
              { time: "10:00 AM", activity: "Breakfast stop", location: "Highway Dhaba" },
              { time: "12:00 PM", activity: "Arrival & check-in", location: "Netarhat Resort" },
              { time: "03:00 PM", activity: "Pine forest exploration", location: "Forest Area" },
              { time: "05:30 PM", activity: "Sunset viewing", location: "Sunset Point" }
            ]
          },
          {
            day: 2,
            title: "Tribal Village Experience",
            activities: [
              { time: "05:30 AM", activity: "Sunrise photography", location: "Sunrise Point" },
              { time: "08:00 AM", activity: "Traditional breakfast", location: "Resort" },
              { time: "10:00 AM", activity: "Tribal village visit", location: "Local Village" },
              { time: "01:00 PM", activity: "Community lunch", location: "Village" },
              { time: "03:00 PM", activity: "Traditional craft learning", location: "Artisan Workshop" },
              { time: "06:00 PM", activity: "Cultural evening", location: "Village Square" }
            ]
          },
          {
            day: 3,
            title: "Adventure & Return",
            activities: [
              { time: "08:00 AM", activity: "Nature trekking", location: "Hill Trails" },
              { time: "11:00 AM", activity: "Local waterfall visit", location: "Hidden Falls" },
              { time: "01:00 PM", activity: "Packed lunch", location: "Scenic Spot" },
              { time: "03:00 PM", activity: "Return journey begins", location: "Netarhat" },
              { time: "07:00 PM", activity: "Arrival in Ranchi", location: "Ranchi" }
            ]
          }
        ],
        cost: {
          accommodation: "₹3,600",
          meals: "₹2,400",
          transport: `₹${Math.round(4200 * transportCostMultiplier)}`,
          activities: "₹1,800",
          total: `₹${Math.round((4200 * transportCostMultiplier) + 3600 + 2400 + 1800)}`
        },
        transportNote,
        includes: ["Hill resort accommodation", "All meals", "Transport", "Tribal guide", "Cultural activities"]
      },
      {
        id: "adventure-circuit",
        title: "Complete Jharkhand Adventure",
        description: "Comprehensive tour covering forests, waterfalls, and tribal heartlands",
        region: "Multi-region",
        difficulty: "Adventurous",
        totalDistance: "450 km",
        highlights: ["Betla National Park", "Dassam Falls", "Tribal Villages", "Temple circuits"],
        rating: 4.8,
        days: [
          {
            day: 1,
            title: "Ranchi to Betla Wildlife",
            activities: [
              { time: "07:00 AM", activity: "Departure to Betla", location: "Ranchi" },
              { time: "11:00 AM", activity: "Betla National Park safari", location: "Betla NP" },
              { time: "01:00 PM", activity: "Jungle lunch", location: "Forest Rest House" },
              { time: "03:30 PM", activity: "Wildlife photography", location: "Park Areas" },
              { time: "06:00 PM", activity: "Evening at forest lodge", location: "Forest Lodge" }
            ]
          },
          {
            day: 2,
            title: "Waterfalls & Temples",
            activities: [
              { time: "08:00 AM", activity: "Travel to Dassam Falls", location: "From Betla" },
              { time: "10:30 AM", activity: "Dassam Falls exploration", location: "Dassam Falls" },
              { time: "01:00 PM", activity: "Riverside lunch", location: "Falls Area" },
              { time: "03:00 PM", activity: "Ancient temple visit", location: "Local Temple" },
              { time: "05:00 PM", activity: "Local village stay", location: "Tribal Homestay" }
            ]
          },
          {
            day: 3,
            title: "Cultural Deep Dive",
            activities: [
              { time: "08:00 AM", activity: "Traditional breakfast with family", location: "Homestay" },
              { time: "10:00 AM", activity: "Participate in daily village life", location: "Village" },
              { time: "12:00 PM", activity: "Learn traditional crafts", location: "Village Workshop" },
              { time: "02:00 PM", activity: "Community feast", location: "Village" },
              { time: "04:00 PM", activity: "Return journey to Ranchi", location: "Village to Ranchi" },
              { time: "08:00 PM", activity: "Arrival & celebration dinner", location: "Ranchi" }
            ]
          }
        ],
        cost: {
          accommodation: "₹4,200",
          meals: "₹2,800",
          transport: `₹${Math.round(5800 * transportCostMultiplier)}`,
          activities: "₹2,400",
          total: `₹${Math.round((5800 * transportCostMultiplier) + 4200 + 2800 + 2400)}`
        },
        transportNote,
        includes: ["Mixed accommodation", "All meals", "Safari fees", "Tribal homestay", "All activities"]
      }
    ];

    return batches;
  };

  const handleInterestToggle = (interest: string) => {
    setPlannerData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    const batches = generateItineraryBatches();
    setItineraryBatches(batches);
    setIsGenerating(false);
    setStep(4);
  };

  const selectBatch = (batchId: string) => {
    setSelectedBatchId(batchId);
    setStep(5);
  };

  const selectedBatch = itineraryBatches.find(batch => batch.id === selectedBatchId);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Bot className="h-8 w-8 text-blue-600 mr-2" />
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">AI Trip Planner</h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Let our AI create personalized itinerary options based on your preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Planning Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span>Trip Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration">Trip Duration</Label>
                      <Select onValueChange={(value) => setPlannerData(prev => ({...prev, duration: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="2-3">2-3 Days</SelectItem>
                          <SelectItem value="4-7">4-7 Days</SelectItem>
                          <SelectItem value="week+">1 Week+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="budget">Budget Range (₹)</Label>
                      <Select onValueChange={(value) => setPlannerData(prev => ({...prev, budget: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="budget">Budget (₹2,000-5,000)</SelectItem>
                          <SelectItem value="mid">Mid-range (₹5,000-15,000)</SelectItem>
                          <SelectItem value="luxury">Luxury (₹15,000+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="groupSize">Group Size</Label>
                      <Input
                        id="groupSize"
                        type="number"
                        placeholder="Number of travelers"
                        value={plannerData.groupSize}
                        onChange={(e) => setPlannerData(prev => ({...prev, groupSize: e.target.value}))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="accommodation">Accommodation Type</Label>
                      <Select onValueChange={(value) => setPlannerData(prev => ({...prev, accommodationType: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="homestay">Homestay</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="resort">Resort</SelectItem>
                          <SelectItem value="camping">Camping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="transportation">Transportation Mode</Label>
                      <Select onValueChange={(value) => setPlannerData(prev => ({...prev, transportationMode: value}))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select transport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="self-drive">
                            <div className="flex items-center space-x-2">
                              <Car className="h-4 w-4" />
                              <span>Self-Drive Car/SUV</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="hired-cab">
                            <div className="flex items-center space-x-2">
                              <Car className="h-4 w-4" />
                              <span>Hired Cab with Driver</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="public-transport">
                            <div className="flex items-center space-x-2">
                              <Bus className="h-4 w-4" />
                              <span>Public Transport</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="motorcycle">
                            <div className="flex items-center space-x-2">
                              <Bike className="h-4 w-4" />
                              <span>Motorcycle/Bike</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="shared-jeep">
                            <div className="flex items-center space-x-2">
                              <Car className="h-4 w-4" />
                              <span>Shared Jeep</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="train-local">
                            <div className="flex items-center space-x-2">
                              <Train className="h-4 w-4" />
                              <span>Train + Local Transport</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500 mt-1">
                        Choose based on your comfort, budget and adventure preference
                      </p>
                    </div>
                  </div>

                  <Button onClick={() => setStep(2)} className="w-full">
                    Next: Select Interests
                  </Button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <Label className="text-base font-semibold">What interests you most?</Label>
                    <p className="text-sm text-gray-600 mb-4">Select all that apply</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {interests.map((interest) => (
                        <Button
                          key={interest}
                          variant={plannerData.interests.includes(interest) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInterestToggle(interest)}
                          className="justify-start"
                        >
                          {plannerData.interests.includes(interest) && (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          )}
                          {interest}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Next: Additional Preferences
                    </Button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <Label htmlFor="preferences">Additional Preferences</Label>
                    <Textarea
                      id="preferences"
                      placeholder="Any specific requirements, dietary restrictions, accessibility needs, or special requests..."
                      value={plannerData.preferences}
                      onChange={(e) => setPlannerData(prev => ({...prev, preferences: e.target.value}))}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button 
                      onClick={generateItinerary} 
                      className="flex-1"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Bot className="h-4 w-4 mr-2" />
                          Generate AI Itinerary Options
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview/Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Trip Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{plannerData.duration || "Not selected"}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Wallet className="h-4 w-4 text-gray-500" />
                  <span>{plannerData.budget || "Not selected"}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{plannerData.groupSize ? `${plannerData.groupSize} travelers` : "Not specified"}</span>
                </div>
                
                {plannerData.transportationMode && (
                  <div className="flex items-center space-x-2 text-sm">
                    {plannerData.transportationMode === "self-drive" && <Car className="h-4 w-4 text-gray-500" />}
                    {plannerData.transportationMode === "hired-cab" && <Car className="h-4 w-4 text-gray-500" />}
                    {plannerData.transportationMode === "public-transport" && <Bus className="h-4 w-4 text-gray-500" />}
                    {plannerData.transportationMode === "motorcycle" && <Bike className="h-4 w-4 text-gray-500" />}
                    {plannerData.transportationMode === "shared-jeep" && <Car className="h-4 w-4 text-gray-500" />}
                    {plannerData.transportationMode === "train-local" && <Train className="h-4 w-4 text-gray-500" />}
                    <span>
                      {plannerData.transportationMode === "self-drive" && "Self-Drive Car/SUV"}
                      {plannerData.transportationMode === "hired-cab" && "Hired Cab with Driver"}
                      {plannerData.transportationMode === "public-transport" && "Public Transport"}
                      {plannerData.transportationMode === "motorcycle" && "Motorcycle/Bike"}
                      {plannerData.transportationMode === "shared-jeep" && "Shared Jeep"}
                      {plannerData.transportationMode === "train-local" && "Train + Local Transport"}
                    </span>
                  </div>
                )}
                
                {plannerData.interests.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Interests:</p>
                    <div className="flex flex-wrap gap-1">
                      {plannerData.interests.map((interest) => (
                        <Badge key={interest} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {step >= 3 && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Custom Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="outline" 
                  className="w-full mb-2"
                  onClick={() => setShowManualCreator(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Manual Itinerary
                </Button>
                <p className="text-xs text-gray-600 text-center">
                  Build your own custom itinerary from scratch
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Itinerary Batches Selection */}
      {step === 4 && itineraryBatches.length > 0 && (
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Perfect Itinerary</h3>
            <p className="text-gray-600">Select from AI-generated routes based on different experiences and distances</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {itineraryBatches.map((batch) => (
              <Card key={batch.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{batch.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{batch.region}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{batch.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">{batch.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Route className="h-4 w-4 mr-1 text-gray-500" />
                        Distance
                      </span>
                      <span>{batch.totalDistance}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Mountain className="h-4 w-4 mr-1 text-gray-500" />
                        Difficulty
                      </span>
                      <Badge variant={
                        batch.difficulty === "Easy" ? "secondary" : 
                        batch.difficulty === "Moderate" ? "default" : "destructive"
                      }>
                        {batch.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Total Cost</span>
                      <span className="font-semibold text-lg">{batch.cost.total}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Highlights:</p>
                    <div className="flex flex-wrap gap-1">
                      {batch.highlights.map((highlight, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => selectBatch(batch.id)}
                    className="w-full"
                  >
                    Select This Route
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" onClick={() => setStep(3)}>
              <Edit className="h-4 w-4 mr-2" />
              Modify Preferences
            </Button>
          </div>
        </div>
      )}

      {/* Selected Batch Details */}
      {step === 5 && selectedBatch && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>{selectedBatch.title}</span>
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditingBatch(!isEditingBatch)}>
                    <Edit className="h-4 w-4 mr-1" />
                    {isEditingBatch ? "Save Changes" : "Customize"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setStep(4)}>
                    Back to Options
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Itinerary Details */}
                <div className="lg:col-span-2 space-y-6">
                  {selectedBatch.days.map((day: any) => (
                    <Card key={day.day}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Day {day.day}: {day.title}</CardTitle>
                        {isEditingBatch && (
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit Day
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {day.activities.map((activity: any, index: number) => (
                            <div key={index} className="flex space-x-3 pb-3 border-b last:border-b-0">
                              <div className="text-sm font-medium text-blue-600 min-w-[70px]">
                                {activity.time}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{activity.activity}</p>
                                <p className="text-sm text-gray-600 flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {activity.location}
                                </p>
                              </div>
                              {isEditingBatch && (
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        {isEditingBatch && (
                          <Button size="sm" variant="outline" className="w-full mt-3">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Activity
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Cost Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Accommodation</span>
                          <span>{selectedBatch.cost.accommodation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Meals</span>
                          <span>{selectedBatch.cost.meals}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transport</span>
                          <span>{selectedBatch.cost.transport}</span>
                        </div>
                        {selectedBatch.transportNote && (
                          <p className="text-xs text-gray-500 -mt-1 ml-0">
                            {selectedBatch.transportNote}
                          </p>
                        )}
                        <div className="flex justify-between">
                          <span>Activities</span>
                          <span>{selectedBatch.cost.activities}</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>{selectedBatch.cost.total}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <h4 className="font-medium">Includes:</h4>
                        {selectedBatch.includes.map((item: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 space-y-2">
                        <Button className="w-full">
                          Book This Itinerary
                        </Button>
                        <Button variant="outline" className="w-full">
                          Download PDF
                        </Button>
                        <Button variant="outline" className="w-full">
                          Share Itinerary
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Manual Itinerary Creator Modal/Section */}
      {showManualCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Create Manual Itinerary</span>
                <Button variant="ghost" size="sm" onClick={() => setShowManualCreator(false)}>
                  ×
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Itinerary Title</Label>
                  <Input placeholder="My Custom Jharkhand Trip" />
                </div>
                
                <div>
                  <Label>Number of Days</Label>
                  <Input type="number" placeholder="3" />
                </div>

                <div>
                  <Label>Starting Location</Label>
                  <Input placeholder="Ranchi" />
                </div>

                <div>
                  <Label>Destinations to Include</Label>
                  <Textarea placeholder="List places you want to visit..." rows={3} />
                </div>

                <div>
                  <Label>Special Requirements</Label>
                  <Textarea placeholder="Any specific needs or preferences..." rows={2} />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">
                    Create Itinerary
                  </Button>
                  <Button variant="outline" onClick={() => setShowManualCreator(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}