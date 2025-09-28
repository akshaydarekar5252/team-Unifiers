import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Calendar,
  MapPin,
  Clock,
  Users,
  Music,
  Palette,
  Flower,
  Droplets,
  Sun,
  Snowflake,
  ChevronRight,
  ArrowRight,
  Utensils,
  Shirt,
  Heart,
  Sparkles,
  Leaf,
  Home,
  BookOpen,
  Star
} from "lucide-react";

export function CulturalCalendar() {
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedFestival, setSelectedFestival] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const seasons = [
    { id: "all", label: "All Seasons", icon: Calendar },
    { id: "spring", label: "Spring (Mar-May)", icon: Flower },
    { id: "monsoon", label: "Monsoon (Jun-Sep)", icon: Droplets },
    { id: "autumn", label: "Autumn (Oct-Nov)", icon: Sun },
    { id: "winter", label: "Winter (Dec-Feb)", icon: Snowflake },
  ];

  const culturalEvents = [
    {
      id: 1,
      name: "Sarhul Festival",
      season: "spring",
      month: "March-April",
      tribe: "Munda, Ho, Oraon",
      image: "https://images.unsplash.com/photo-1710983165044-0cc32d1aab4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHJpbmclMjBmZXN0aXZhbCUyMGZsb3dlcnMlMjBjZWxlYnJhdGlvbiUyMGluZGlhfGVufDF8fHx8MTc1ODE3NjY0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "The most important festival celebrating the Sal tree blossoming, marking the beginning of the New Year.",
      significance: "Worship of nature spirits and thanksgiving for the harvest",
      activities: ["Sal flower offerings", "Traditional dance", "Community feasts", "Sacred grove visits"],
      locations: ["Ranchi", "Khunti", "Gumla", "Simdega"],
      duration: "3 days",
      bestExperience: "Participate in dawn rituals at sacred groves"
    },
    {
      id: 2,
      name: "Baha Festival",
      season: "spring",
      month: "February-March",
      tribe: "Santhal",
      image: "https://images.unsplash.com/photo-1756304599151-74e8de6d4c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmliYWwlMjBmZXN0aXZhbCUyMGNlbGVicmF0aW9uJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU4MTc2NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Festival of flowers celebrating the arrival of spring and new life in nature.",
      significance: "Honoring the Sal and Mahua trees, seeking blessings for fertility and prosperity",
      activities: ["Flower decorations", "Traditional Santhal dance", "Music with Dhol and Madal", "Poetry recitation"],
      locations: ["Dumka", "Deoghar", "Pakur", "Sahebganj"],
      duration: "2 days",
      bestExperience: "Watch the traditional Dong dance performances"
    },
    {
      id: 3,
      name: "Karma Festival",
      season: "monsoon",
      month: "August-September",
      tribe: "Oraon, Munda, Ho",
      image: "https://images.unsplash.com/photo-1560756687-ea7ed4b598bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zb29uJTIwcml0dWFsJTIwdHJpYmFsJTIwY2VyZW1vbnklMjByYWlufGVufDF8fHx8MTc1ODE3NjY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Worship of the Karma tree (Shea tree) for prosperity, fertility, and protection from evil.",
      significance: "Seeking divine blessings for good harvest and family welfare",
      activities: ["Karma tree worship", "Rain ceremonies", "Group singing", "Traditional storytelling"],
      locations: ["Ranchi", "Chaibasa", "Jamshedpur", "Hazaribagh"],
      duration: "1 day",
      bestExperience: "Join the midnight ritual at village centers"
    },
    {
      id: 4,
      name: "Karam Puja",
      season: "monsoon",
      month: "July-August",
      tribe: "Kurmi, Oraon",
      image: "https://images.unsplash.com/photo-1643283162742-40c6f4751676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2ZXN0JTIwZmVzdGl2YWwlMjB0cmliYWwlMjBkYW5jZSUyMGluZGlhfGVufDF8fHx8MTc1ODE3NjYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Dedicated to Lord Vishwakarma and Karam tree, celebrating agricultural abundance.",
      significance: "Prayer for protection of crops and prosperity of farmers",
      activities: ["Traditional dance", "Folk songs", "Community cooking", "Craft exhibitions"],
      locations: ["Dhanbad", "Bokaro", "Ramgarh", "Hazaribagh"],
      duration: "2 days",
      bestExperience: "Participate in traditional Jhumar dance"
    },
    {
      id: 5,
      name: "Jani Shikar Festival",
      season: "autumn",
      month: "October-November",
      tribe: "Ho, Munda",
      image: "https://images.unsplash.com/photo-1756304599151-74e8de6d4c5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0cmliYWwlMjBmZXN0aXZhbCUyMGNlbGVicmF0aW9uJTIwY29sb3JmdWx8ZW58MXx8fHwxNzU4MTc2NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Harvest festival and traditional hunting ceremony marking the end of monsoon.",
      significance: "Community bonding and celebration of successful harvest",
      activities: ["Mock hunting rituals", "Victory celebrations", "Traditional archery", "Community feasts"],
      locations: ["West Singhbhum", "East Singhbhum", "Seraikela-Kharsawan"],
      duration: "3 days",
      bestExperience: "Watch traditional archery competitions"
    },
    {
      id: 6,
      name: "Makar Sankranti (Tusu Festival)",
      season: "winter",
      month: "January",
      tribe: "All communities",
      image: "https://images.unsplash.com/photo-1719427098802-c0e9b9a04ab2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjB0cmliYWwlMjBmZXN0aXZhbCUyMGJvbmZpcmUlMjBjZXJlbW9ueXxlbnwxfHx8fDE3NTgxNzY2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Celebration of winter harvest and sun god worship with colorful Tusu dolls.",
      significance: "Marking the transition from winter to spring, thanking sun god",
      activities: ["Tusu doll making", "Bonfire ceremonies", "Folk songs", "Sweet distribution"],
      locations: ["Dhanbad", "Hazaribagh", "Ramgarh", "Bokaro"],
      duration: "5 days",
      bestExperience: "Join the grand Tusu doll processions"
    },
    {
      id: 7,
      name: "Sohorai Festival",
      season: "winter",
      month: "November-December",
      tribe: "Santhal, Munda",
      image: "https://images.unsplash.com/photo-1643283162742-40c6f4751676?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJ2ZXN0JTIwZmVzdGl2YWwlMjB0cmliYWwlMjBkYW5jZSUyMGluZGlhfGVufDF8fHx8MTc1ODE3NjYzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Cattle festival celebrating domestic animals and their contribution to agriculture.",
      significance: "Honoring cattle, seeking their protection and blessing for farming",
      activities: ["Cattle decoration", "Animal worship", "Agricultural displays", "Community celebrations"],
      locations: ["Dumka", "Jamtara", "Pakur", "Godda"],
      duration: "2 days",
      bestExperience: "Witness beautifully decorated cattle parades"
    },
    {
      id: 8,
      name: "Bandna Festival",
      season: "autumn",
      month: "October-November",
      tribe: "Munda, Ho, Oraon",
      image: "https://images.unsplash.com/photo-1560756687-ea7ed4b598bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zb29uJTIwcml0dWFsJTIwdHJpYmFsJTIwY2VyZW1vbnklMjByYWlufGVufDF8fHx8MTc1ODE3NjY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Cattle worship festival coinciding with post-harvest celebrations.",
      significance: "Gratitude to cattle for their service in agriculture",
      activities: ["Cattle worship", "Horn painting", "Traditional songs", "Village cleaning"],
      locations: ["Ranchi", "Khunti", "Gumla", "Lohardaga"],
      duration: "3 days",
      bestExperience: "Watch artistic horn painting ceremonies"
    }
  ];

  const filteredEvents = selectedSeason === "all" 
    ? culturalEvents 
    : culturalEvents.filter(event => event.season === selectedSeason);

  const currentMonth = new Date().getMonth() + 1;
  const getCurrentSeasonEvents = () => {
    if (currentMonth >= 3 && currentMonth <= 5) return culturalEvents.filter(e => e.season === "spring");
    if (currentMonth >= 6 && currentMonth <= 9) return culturalEvents.filter(e => e.season === "monsoon");
    if (currentMonth >= 10 && currentMonth <= 11) return culturalEvents.filter(e => e.season === "autumn");
    return culturalEvents.filter(e => e.season === "winter");
  };

  const upcomingEvents = getCurrentSeasonEvents().slice(0, 3);

  const culturalAspects = {
    uniqueness: [
      {
        title: "Largest Tribal Population",
        description: "Home to 32 tribal communities, making it India's most tribally diverse state",
        icon: Users,
        highlight: "32 distinct tribes"
      },
      {
        title: "Sacred Grove Tradition",
        description: "Over 5,000 sacred groves (Sarna) preserve ancient forest ecosystems and spiritual practices",
        icon: Leaf,
        highlight: "5,000+ sacred groves"
      },
      {
        title: "Mineral Wealth & Forest Harmony",
        description: "Rich in minerals yet maintaining 29% forest cover through traditional conservation",
        icon: Sparkles,
        highlight: "29% forest cover"
      },
      {
        title: "Living Oral Traditions",
        description: "Preserves ancient stories, songs, and knowledge through unbroken oral traditions",
        icon: BookOpen,
        highlight: "Millenia-old traditions"
      }
    ],
    cuisine: [
      {
        name: "Handia",
        description: "Traditional rice beer fermented with herbs, sacred in tribal ceremonies",
        image: "https://images.unsplash.com/photo-1713780131281-61ec701ebb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMHRyaWJhbCUyMGZvb2QlMjBjdWlzaW5lfGVufDF8fHx8MTc1ODE3NzU0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        significance: "Ceremonial drink for festivals and rituals"
      },
      {
        name: "Pitha & Arsa",
        description: "Traditional rice cakes prepared during festivals, especially Sarhul and Karma",
        image: "https://images.unsplash.com/photo-1713780131281-61ec701ebb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMHRyaWJhbCUyMGZvb2QlMjBjdWlzaW5lfGVufDF8fHx8MTc1ODE3NzU0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        significance: "Symbol of prosperity and abundance"
      },
      {
        name: "Dhuska & Rugra",
        description: "Traditional fried delicacies made from rice and lentils, part of tribal cuisine",
        image: "https://images.unsplash.com/photo-1713780131281-61ec701ebb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMHRyaWJhbCUyMGZvb2QlMjBjdWlzaW5lfGVufDF8fHx8MTc1ODE3NzU0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        significance: "Community bonding food"
      },
      {
        name: "Mahua-based Preparations",
        description: "Flowers and fruits of Mahua tree used in various traditional recipes and drinks",
        image: "https://images.unsplash.com/photo-1713780131281-61ec701ebb6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGluZGlhbiUyMHRyaWJhbCUyMGZvb2QlMjBjdWlzaW5lfGVufDF8fHx8MTc1ODE3NzU0OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        significance: "Sacred tree with medicinal properties"
      }
    ],
    fashion: [
      {
        tribe: "Santhal",
        attire: "Panchi (sari) and Fulkari work",
        description: "Distinctive handwoven cotton saris with intricate thread work and geometric patterns",
        image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjB0cmFkaXRpb25hbCUyMGNsb3RoaW5nJTIwYXR0aXJlJTIwaW5kaWF8ZW58MXx8fHwxNzU4MTc3NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        accessories: "Silver jewelry, shell ornaments"
      },
      {
        tribe: "Munda",
        attire: "Khaddar cloth and natural dyes",
        description: "Traditional handspun cotton clothing dyed with natural colors from plants and minerals",
        image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjB0cmFkaXRpb25hbCUyMGNsb3RoaW5nJTIwYXR0aXJlJTIwaW5kaWF8ZW58MXx8fHwxNzU4MTc3NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        accessories: "Feathered headgear, brass ornaments"
      },
      {
        tribe: "Ho",
        attire: "Traditional Dhoti and Hasuli jewelry",
        description: "Simple yet elegant clothing complemented by distinctive silver neck ornaments",
        image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjB0cmFkaXRpb25hbCUyMGNsb3RoaW5nJTIwYXR0aXJlJTIwaW5kaWF8ZW58MXx8fHwxNzU4MTc3NTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        accessories: "Hasuli (silver torque), anklets"
      }
    ],
    beliefs: [
      {
        concept: "Sarna Dharma",
        description: "Nature worship centered around sacred groves, considering trees, mountains, and rivers as divine",
        image: "https://images.unsplash.com/photo-1670003200335-88fee1dc4693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWNyZWQlMjBncm92ZSUyMGZvcmVzdCUyMHdvcnNoaXAlMjBpbmRpYXxlbnwxfHx8fDE3NTgxNzc1NTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        practices: ["Sacred grove preservation", "Tree worship", "River ceremonies"]
      },
      {
        concept: "Community Harmony",
        description: "Strong emphasis on collective decision-making through traditional councils (Gram Sabha)",
        image: "https://images.unsplash.com/photo-1580746453801-37b0bc56f3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjB2aWxsYWdlJTIwY29tbXVuaXR5JTIwaW5kaWF8ZW58MXx8fHwxNzU4MTc3NTYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        practices: ["Consensus building", "Elder respect", "Resource sharing"]
      },
      {
        concept: "Ecological Wisdom",
        description: "Deep understanding of sustainable living and environmental conservation practices",
        image: "https://images.unsplash.com/photo-1691669929538-ae66512c124f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwbWVkaWNpbmFsJTIwcGxhbnRzJTIwaGVyYnN8ZW58MXx8fHwxNzU4MTc3NTY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        practices: ["Medicinal plant knowledge", "Sustainable farming", "Water conservation"]
      }
    ],
    arts: [
      {
        name: "Paitkar Painting",
        description: "Traditional scroll paintings narrating mythological stories and tribal legends",
        image: "https://images.unsplash.com/photo-1652355045956-41665ecf16fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBhcnQlMjBoYW5kaWNyYWZ0cyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1ODE3NzU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        significance: "Storytelling through visual art"
      },
      {
        name: "Ganjifa Cards",
        description: "Traditional playing cards with intricate hand-painted designs and cultural motifs",
        image: "https://images.unsplash.com/photo-1652355045956-41665ecf16fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBhcnQlMjBoYW5kaWNyYWZ0cyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1ODE3NzU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        significance: "Cultural entertainment and art"
      },
      {
        name: "Dokra Metal Craft",
        description: "Ancient lost-wax casting technique creating bronze artifacts and jewelry",
        image: "https://images.unsplash.com/photo-1652355045956-41665ecf16fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmliYWwlMjBhcnQlMjBoYW5kaWNyYWZ0cyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1ODE3NzU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        significance: "4,000-year-old metallurgy tradition"
      }
    ]
  };

  if (selectedFestival) {
    const festival = culturalEvents.find(f => f.id === selectedFestival);
    if (!festival) return null;

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedFestival(null)}
          className="mb-6"
        >
          ← Back to Cultural Calendar
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6">
              <ImageWithFallback
                src={festival.image}
                alt={festival.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <Badge className="bg-white/20 text-white border-white/30 mb-2">
                  {festival.season.charAt(0).toUpperCase() + festival.season.slice(1)}
                </Badge>
                <h1 className="text-2xl md:text-3xl font-bold">{festival.name}</h1>
                <p className="text-white/90">{festival.month}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-3">About the Festival</h2>
              <p className="text-gray-700 leading-relaxed">{festival.description}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Celebrating Tribes
              </h3>
              <p className="text-gray-600">{festival.tribe}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Duration & Best Experience
              </h3>
              <p className="text-gray-600 mb-2">Duration: {festival.duration}</p>
              <p className="text-gray-700">{festival.bestExperience}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cultural Significance</h3>
              <p className="text-gray-700">{festival.significance}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center">
                <Music className="h-4 w-4 mr-2" />
                Festival Activities
              </h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {festival.activities.map((activity, index) => (
                  <li key={index} className="flex items-center">
                    <ChevronRight className="h-3 w-3 mr-2 text-green-600" />
                    {activity}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                Where to Experience
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {festival.locations.map((location, index) => (
                  <Badge key={index} variant="outline" className="justify-center p-2">
                    {location}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Cultural Heritage of Jharkhand
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the rich tapestry of tribal culture, traditions, and festivals that make Jharkhand unique among Indian states
        </p>
      </div>

      {/* Cultural Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span className="hidden sm:inline">What Makes Us Different</span>
            <span className="sm:hidden">Different</span>
          </TabsTrigger>
          <TabsTrigger value="festivals" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Festivals</span>
            <span className="sm:hidden">Festivals</span>
          </TabsTrigger>
          <TabsTrigger value="cuisine" className="flex items-center gap-2">
            <Utensils className="h-4 w-4" />
            <span className="hidden sm:inline">Cuisine</span>
            <span className="sm:hidden">Food</span>
          </TabsTrigger>
          <TabsTrigger value="fashion" className="flex items-center gap-2">
            <Shirt className="h-4 w-4" />
            <span className="hidden sm:inline">Traditional Attire</span>
            <span className="sm:hidden">Fashion</span>
          </TabsTrigger>
          <TabsTrigger value="beliefs" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Values & Beliefs</span>
            <span className="sm:hidden">Beliefs</span>
          </TabsTrigger>
          <TabsTrigger value="arts" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Arts & Crafts</span>
            <span className="sm:hidden">Arts</span>
          </TabsTrigger>
        </TabsList>

        {/* What Makes Jharkhand Different */}
        <TabsContent value="overview">
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-green-50 to-orange-50 border-green-200 mb-8">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
                  What Makes Jharkhand Different from Other States?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {culturalAspects.uniqueness.map((aspect, index) => {
                    const Icon = aspect.icon;
                    return (
                      <Card key={index} className="bg-white/70">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="bg-green-100 p-3 rounded-full">
                              <Icon className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{aspect.title}</h3>
                              <p className="text-gray-700 mb-3">{aspect.description}</p>
                              <Badge className="bg-green-600">{aspect.highlight}</Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
                  Key Cultural Differentiators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700">Living Heritage</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Unbroken tradition of 4,000+ years of tribal culture
                    </p>
                  </div>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700">Ecological Wisdom</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Traditional conservation protecting 29% forest cover
                    </p>
                  </div>
                  <div className="bg-white/70 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-700">Spiritual Diversity</h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Unique blend of animism, nature worship, and modern beliefs
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traditional Cuisine */}
        <TabsContent value="cuisine">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Traditional Cuisine & Food Culture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {culturalAspects.cuisine.map((dish, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{dish.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-700 mb-3">{dish.description}</p>
                    <Badge variant="secondary">{dish.significance}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-orange-800 mb-4">Food Culture Characteristics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li className="flex items-center"><ChevronRight className="h-3 w-3 mr-2 text-orange-600" />Rice as staple grain</li>
                    <li className="flex items-center"><ChevronRight className="h-3 w-3 mr-2 text-orange-600" />Forest produce integration</li>
                    <li className="flex items-center"><ChevronRight className="h-3 w-3 mr-2 text-orange-600" />Fermented foods for health</li>
                  </ul>
                  <ul className="space-y-2">
                    <li className="flex items-center"><ChevronRight className="h-3 w-3 mr-2 text-orange-600" />Community cooking traditions</li>
                    <li className="flex items-center"><ChevronRight className="h-3 w-3 mr-2 text-orange-600" />Seasonal ingredient usage</li>
                    <li className="flex items-center"><ChevronRight className="h-3 w-3 mr-2 text-orange-600" />Medicinal food practices</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traditional Fashion */}
        <TabsContent value="fashion">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Traditional Attire & Fashion</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {culturalAspects.fashion.map((style, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={style.image}
                      alt={`${style.tribe} traditional attire`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{style.tribe} Tribe</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">{style.attire}</h4>
                    <p className="text-gray-700 text-sm mb-3">{style.description}</p>
                    <div>
                      <span className="text-xs font-medium text-gray-600">Traditional Accessories:</span>
                      <p className="text-sm text-gray-600">{style.accessories}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-purple-800 mb-4">Fashion Characteristics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">Materials</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Handspun cotton</li>
                      <li>• Natural plant dyes</li>
                      <li>• Locally sourced silk</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">Jewelry</h4>
                    <ul className="text-sm space-y-1">
                      <li>��� Silver ornaments</li>
                      <li>• Shell decorations</li>
                      <li>• Brass accessories</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2">Patterns</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Geometric designs</li>
                      <li>• Nature motifs</li>
                      <li>• Tribal symbols</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Values & Beliefs */}
        <TabsContent value="beliefs">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Values, Beliefs & Spiritual Practices</h2>
            <div className="space-y-6 mb-6">
              {culturalAspects.beliefs.map((belief, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    <div className="relative h-48 lg:h-auto">
                      <ImageWithFallback
                        src={belief.image}
                        alt={belief.concept}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="lg:col-span-2 p-6">
                      <h3 className="font-semibold text-xl mb-3">{belief.concept}</h3>
                      <p className="text-gray-700 mb-4">{belief.description}</p>
                      <div>
                        <h4 className="font-medium mb-2">Key Practices:</h4>
                        <div className="flex flex-wrap gap-2">
                          {belief.practices.map((practice, idx) => (
                            <Badge key={idx} variant="outline">{practice}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-green-800 mb-4">Core Cultural Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-green-700">Community First</h4>
                    <p className="text-xs text-gray-600 mt-1">Collective welfare over individual gain</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Leaf className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-green-700">Nature Reverence</h4>
                    <p className="text-xs text-gray-600 mt-1">Treating nature as sacred and divine</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Heart className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-green-700">Ancestral Respect</h4>
                    <p className="text-xs text-gray-600 mt-1">Honoring wisdom of elders and ancestors</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Home className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="font-medium text-green-700">Resource Sharing</h4>
                    <p className="text-xs text-gray-600 mt-1">Equitable distribution of community resources</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Arts & Crafts */}
        <TabsContent value="arts">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Traditional Arts & Crafts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {culturalAspects.arts.map((art, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={art.image}
                      alt={art.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{art.name}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-gray-700 mb-3">{art.description}</p>
                    <Badge className="bg-indigo-600">{art.significance}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-indigo-50 border-indigo-200">
              <CardContent className="p-6">
                <h3 className="font-semibold text-indigo-800 mb-4">Artistic Traditions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-indigo-700 mb-3">Visual Arts</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center"><Palette className="h-3 w-3 mr-2 text-indigo-600" />Wall paintings (Kohbar & Paitkar)</li>
                      <li className="flex items-center"><Palette className="h-3 w-3 mr-2 text-indigo-600" />Tribal mask making</li>
                      <li className="flex items-center"><Palette className="h-3 w-3 mr-2 text-indigo-600" />Rock art and cave paintings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-indigo-700 mb-3">Performing Arts</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center"><Music className="h-3 w-3 mr-2 text-indigo-600" />Traditional dances (Chhau, Jhumar)</li>
                      <li className="flex items-center"><Music className="h-3 w-3 mr-2 text-indigo-600" />Folk music and songs</li>
                      <li className="flex items-center"><Music className="h-3 w-3 mr-2 text-indigo-600" />Storytelling traditions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Festivals Tab */}
        <TabsContent value="festivals">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Seasonal Festivals & Celebrations</h2>
            
            {/* Current Season Highlight */}
            <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-green-800">Happening Now</h3>
                  <Badge className="bg-green-600">Current Season</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {upcomingEvents.map((event, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedFestival(event.id)}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-1">{event.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{event.month}</p>
                        <p className="text-xs text-gray-500">{event.tribe}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Season Filter */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {seasons.map((season) => {
                const Icon = season.icon;
                return (
                  <Button
                    key={season.id}
                    variant={selectedSeason === season.id ? "default" : "outline"}
                    onClick={() => setSelectedSeason(season.id)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span>{season.label}</span>
                  </Button>
                );
              })}
            </div>

            {/* Cultural Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedFestival(event.id)}
                >
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/20 text-white border-white/30">
                        {event.season.charAt(0).toUpperCase() + event.season.slice(1)}
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h4 className="font-semibold text-lg mb-1">{event.name}</h4>
                      <p className="text-sm text-white/90">{event.month}</p>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <Users className="h-3 w-3 mr-1" />
                        {event.tribe}
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {event.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {event.duration}
                      </Badge>
                      <Button size="sm" variant="ghost" className="p-0">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cultural Experience CTA */}
            <Card className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
              <CardContent className="p-8 text-center">
                <h4 className="text-2xl font-bold text-orange-800 mb-4">
                  Experience Authentic Tribal Culture
                </h4>
                <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                  Join local communities in their traditional celebrations. Our cultural immersion programs 
                  offer respectful and authentic ways to participate in these sacred festivals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Calendar className="mr-2 h-4 w-4" />
                    Plan Cultural Visit
                  </Button>
                  <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Connect with Local Guides
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}