import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Menu, 
  X, 
  Globe, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Users, 
  BarChart3,
  MessageCircle,
  User,
  Flower2
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenChat?: () => void;
}

export function Navigation({ activeTab, setActiveTab, onOpenChat }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Discover", icon: Globe },
    { id: "destinations", label: "Destinations", icon: MapPin },
    { id: "cultural-calendar", label: "Cultural Calendar", icon: Flower2 },
    { id: "itinerary", label: "Plan Trip", icon: Calendar },
    { id: "marketplace", label: "Marketplace", icon: ShoppingBag },
    { id: "guides", label: "Local Guides", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-green-600" />
            <span className="text-xl font-semibold text-gray-900">JharkhandGO</span>
            <Badge variant="secondary" className="text-xs">Beta</Badge>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenChat || (() => setActiveTab("chat"))}
              className="hidden sm:flex items-center"
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Login</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                onClick={() => {
                  onOpenChat ? onOpenChat() : setActiveTab("chat");
                  setIsMobileMenuOpen(false);
                }}
                className="justify-start"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                AI Assistant
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}