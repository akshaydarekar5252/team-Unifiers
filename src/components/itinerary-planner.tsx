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
  Trash2
} from "lucide-react";

export function ItineraryPlanner() {
  const [step, setStep] = useState(1);
  const [plannerData, setPlannerData] = useState({
    destination: "",
    duration: "",
    budget: "",
    groupSize: "",
    interests: [] as string[],
    accommodationType: "",
    preferences: ""
  });

  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const interests = [
    "Nature & Wildlife", "Adventure Sports", "Cultural Heritage", 
    "Photography", "Trekking", "Spiritual Tourism", 
    "Tribal Culture", "Waterfalls", "Hill Stations"
  ];

  const sampleItinerary = {
    title: "3-Day Jharkhand Adventure",
    days: [
      {
        day: 1,
        title: "Ranchi to Hundru Falls",
        activities: [
          { time: "08:00 AM", activity: "Departure from Ranchi", location: "Hotel" },
          { time: "09:30 AM", activity: "Visit Hundru Falls", location: "Hundru Falls" },
          { time: "01:00 PM", activity: "Lunch at local restaurant", location: "Nearby Restaurant" },
          { time: "03:00 PM", activity: "Photography & Nature Walk", location: "Falls Area" },
          { time: "06:00 PM", activity: "Return to Ranchi", location: "Hotel Check-in" }
        ]
      },
      {
        day: 2,
        title: "Netarhat Hill Station",
        activities: [
          { time: "06:00 AM", activity: "Early departure to Netarhat", location: "Ranchi" },
          { time: "09:00 AM", activity: "Sunrise Point visit", location: "Netarhat" },
          { time: "11:00 AM", activity: "Pine Forest exploration", location: "Forest Area" },
          { time: "02:00 PM", activity: "Local tribal village tour", location: "Village" },
          { time: "06:00 PM", activity: "Sunset viewing", location: "Sunset Point" }
        ]
      },
      {
        day: 3,
        title: "Cultural Immersion",
        activities: [
          { time: "09:00 AM", activity: "Local handicraft market visit", location: "Market" },
          { time: "11:00 AM", activity: "Tribal art workshop", location: "Cultural Center" },
          { time: "02:00 PM", activity: "Traditional cuisine experience", location: "Local Home" },
          { time: "04:00 PM", activity: "Folk dance performance", location: "Community Hall" },
          { time: "06:00 PM", activity: "Departure preparations", location: "Hotel" }
        ]
      }
    ],
    cost: {
      accommodation: "₹2,400",
      meals: "₹1,800",
      transport: "₹3,200",
      activities: "₹1,200",
      total: "₹8,600"
    },
    includes: ["Accommodation", "All meals", "Local transport", "Guide services", "Entry fees"]
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
    setGeneratedItinerary(sampleItinerary);
    setIsGenerating(false);
    setStep(4);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Bot className="h-8 w-8 text-blue-600 mr-2" />
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">AI Trip Planner</h2>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Let our AI create a personalized itinerary based on your preferences
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
                          Generate AI Itinerary
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
        </div>
      </div>

      {/* Generated Itinerary */}
      {generatedItinerary && (
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{generatedItinerary.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Itinerary Details */}
                <div className="lg:col-span-2 space-y-6">
                  {generatedItinerary.days.map((day: any) => (
                    <Card key={day.day}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Day {day.day}: {day.title}</CardTitle>
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
                            </div>
                          ))}
                        </div>
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
                          <span>{generatedItinerary.cost.accommodation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Meals</span>
                          <span>{generatedItinerary.cost.meals}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transport</span>
                          <span>{generatedItinerary.cost.transport}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Activities</span>
                          <span>{generatedItinerary.cost.activities}</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>{generatedItinerary.cost.total}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <h4 className="font-medium">Includes:</h4>
                        {generatedItinerary.includes.map((item: string, index: number) => (
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
                          Customize Further
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
    </div>
  );
}