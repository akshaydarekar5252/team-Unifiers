import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  MapPin, 
  Calendar, 
  Star,
  Languages,
  Minimize2,
  Maximize2,
  RefreshCw,
  X
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface ChatbotProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onClose: () => void;
  isClosed: boolean;
  onOpen: () => void;
}

export function AIChatbot({ isMinimized, onToggleMinimize, onClose, isClosed, onOpen }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Namaste! 🙏 I'm your AI travel assistant for Jharkhand. I can help you discover destinations, plan itineraries, find local guides, and answer questions in Hindi, English, or tribal languages. How can I assist you today?",
      timestamp: new Date(),
      suggestions: [
        "Show me waterfalls in Jharkhand",
        "Plan a 3-day trip to Netarhat",
        "Find local tribal handicrafts",
        "Book a wildlife guide"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "hi", name: "हिंदी", flag: "🇮🇳" },
    { code: "sat", name: "Santali", flag: "🏛️" },
    { code: "mun", name: "Mundari", flag: "🏛️" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("waterfall") || message.includes("hundru")) {
      return {
        content: "🏞️ Jharkhand has stunning waterfalls! Here are the top ones:\n\n🌊 **Hundru Falls** - 98m high, 45km from Ranchi\n🌊 **Jonha Falls** - Great for trekking\n🌊 **Dassam Falls** - Perfect for picnics\n\nWould you like detailed information about any specific waterfall or help planning a waterfall tour?",
        suggestions: [
          "Tell me about Hundru Falls",
          "Plan a waterfall tour",
          "Best time to visit waterfalls",
          "How to reach Hundru Falls"
        ]
      };
    }
    
    if (message.includes("netarhat") || message.includes("hill station")) {
      return {
        content: "🏔️ Netarhat is the 'Queen of Chotanagpur'! Here's what makes it special:\n\n🌅 **Sunrise Point** - Breathtaking dawn views\n🌲 **Pine Forests** - Perfect for nature walks\n🌄 **Sunset Point** - Romantic evening destination\n🏠 **Tribal Villages** - Cultural experiences nearby\n\nI can help you plan a 2-3 day itinerary. What's your budget and group size?",
        suggestions: [
          "Plan 3-day Netarhat trip",
          "Best homestays in Netarhat",
          "Netarhat weather forecast",
          "Things to do in Netarhat"
        ]
      };
    }
    
    if (message.includes("guide") || message.includes("local")) {
      return {
        content: "👨‍🦱 I can connect you with verified local guides! Here are some options:\n\n⭐ **Ramesh Kumar Oraon** - Nature & Wildlife Expert (₹1,500/day)\n⭐ **Sunita Munda** - Cultural Heritage Specialist (₹1,200/day)\n⭐ **Priya Kumari Ho** - Wildlife Safari Guide (₹1,600/day)\n\nAll guides are blockchain-verified and speak multiple languages. Which type of experience interests you most?",
        suggestions: [
          "Wildlife photography guide",
          "Cultural heritage tour",
          "Tribal village experience",
          "Adventure sports guide"
        ]
      };
    }
    
    if (message.includes("handicraft") || message.includes("shopping") || message.includes("tribal")) {
      return {
        content: "🎨 Discover authentic Jharkhand handicrafts! Our marketplace features:\n\n🪔 **Dokra Art** - Traditional metal craft\n🎋 **Bamboo Products** - Sustainable crafts\n🧵 **Tribal Textiles** - Handwoven fabrics\n🏺 **Pottery** - Traditional ceramics\n\nAll purchases directly support local artisan families. Would you like to browse specific categories?",
        suggestions: [
          "Show me Dokra art pieces",
          "Bamboo handicrafts",
          "Traditional textiles",
          "Support local artisans"
        ]
      };
    }
    
    if (message.includes("plan") || message.includes("itinerary") || message.includes("trip")) {
      return {
        content: "📅 Let me help you plan the perfect Jharkhand trip! To create a personalized itinerary, I need to know:\n\n🗓️ **Duration** - How many days?\n💰 **Budget** - What's your budget range?\n👥 **Group** - How many travelers?\n🎯 **Interests** - Nature, culture, adventure, or photography?\n\nOnce I have these details, I'll create a customized itinerary with bookings!",
        suggestions: [
          "3-day nature trip",
          "Weekend getaway",
          "Cultural immersion tour",
          "Photography expedition"
        ]
      };
    }
    
    if (message.includes("weather") || message.includes("climate")) {
      return {
        content: "🌤️ Jharkhand Weather Guide:\n\n🌸 **Best Time**: October to March (pleasant weather)\n☀️ **Summer**: April-June (hot, good for waterfalls)\n🌧️ **Monsoon**: July-September (lush greenery, some areas inaccessible)\n❄️ **Winter**: December-February (cool, perfect for hill stations)\n\nCurrent conditions and forecasts are available in the app. Which season are you planning to visit?",
        suggestions: [
          "Best time for waterfalls",
          "Winter travel tips",
          "Monsoon destinations",
          "Current weather forecast"
        ]
      };
    }
    
    // Default response
    return {
      content: "I'd be happy to help you explore Jharkhand! I can assist with:\n\n🏞️ **Destinations** - Waterfalls, parks, hill stations\n📅 **Trip Planning** - Custom itineraries\n👥 **Local Guides** - Verified experts\n🛒 **Marketplace** - Authentic handicrafts\n🏠 **Homestays** - Cultural experiences\n\nWhat would you like to know more about?",
      suggestions: [
        "Popular destinations",
        "Plan my trip",
        "Find local guides",
        "Cultural experiences"
      ]
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const botResponse = getBotResponse(inputMessage);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: botResponse.content,
      timestamp: new Date(),
      suggestions: botResponse.suggestions
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Don't render anything if closed
  if (isClosed) {
    return null;
  }

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 max-h-16 shadow-lg z-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-blue-600" />
              <span className="font-medium">AI Assistant</span>
              <Badge variant="secondary" className="text-xs">Online</Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button size="sm" variant="ghost" onClick={onToggleMinimize}>
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-xl z-50 flex flex-col">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-blue-600" />
            <div>
              <CardTitle className="text-lg">AI Travel Assistant</CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-500">Online • Multilingual</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="text-xs border rounded px-2 py-1"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <Button size="sm" variant="ghost" onClick={onToggleMinimize}>
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0">
        <div className="h-full flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`flex space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className={`text-xs ${
                      message.type === "user" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                    }`}>
                      {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`rounded-lg px-3 py-2 ${
                    message.type === "user" 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    <div className="text-sm whitespace-pre-line">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex space-x-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-green-100 text-green-600 text-xs">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg px-3 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length > 0 && messages[messages.length - 1].suggestions && !isTyping && (
            <div className="border-t p-3">
              <p className="text-xs text-gray-500 mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-1">
                {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-1 px-2"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t p-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about destinations, guides, or trip planning..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-sm"
              />
              <Button 
                onClick={handleSendMessage} 
                disabled={!inputMessage.trim() || isTyping}
                className="px-3"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <Languages className="h-3 w-3 mr-1" />
              Supports Hindi, English, Santali & Mundari languages
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}