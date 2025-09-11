import { useState } from "react";
import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero-section";
import { DestinationsSection } from "./components/destinations-section";
import { DestinationDetail } from "./components/destination-detail";
import { ItineraryPlanner } from "./components/itinerary-planner";
import { MarketplaceSection } from "./components/marketplace-section";
import { GuidesSection } from "./components/guides-section";
import { AnalyticsDashboard } from "./components/analytics-dashboard";
import { AIChatbot } from "./components/ai-chatbot";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
  const [isChatMinimized, setIsChatMinimized] = useState(true);
  const [isChatClosed, setIsChatClosed] = useState(false);

  const renderActiveSection = () => {
    // If a destination is selected, show its detail page
    if (selectedDestinationId) {
      return (
        <DestinationDetail 
          destinationId={selectedDestinationId}
          onBack={() => setSelectedDestinationId(null)}
        />
      );
    }

    switch (activeTab) {
      case "home":
        return (
          <HeroSection 
            onExploreClick={() => setActiveTab("destinations")}
            onPlanTripClick={() => setActiveTab("itinerary")}
            onDestinationSelect={(id) => setSelectedDestinationId(id)}
          />
        );
      case "destinations":
        return (
          <DestinationsSection 
            onDestinationSelect={(id) => setSelectedDestinationId(id)}
          />
        );
      case "itinerary":
        return <ItineraryPlanner />;
      case "marketplace":
        return <MarketplaceSection />;
      case "guides":
        return <GuidesSection />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "chat":
        setIsChatMinimized(false);
        setIsChatClosed(false);
        return (
          <HeroSection 
            onExploreClick={() => setActiveTab("destinations")}
            onPlanTripClick={() => setActiveTab("itinerary")}
            onDestinationSelect={(id) => setSelectedDestinationId(id)}
          />
        );
      default:
        return (
          <HeroSection 
            onExploreClick={() => setActiveTab("destinations")}
            onPlanTripClick={() => setActiveTab("itinerary")}
            onDestinationSelect={(id) => setSelectedDestinationId(id)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenChat={() => {
          setIsChatClosed(false);
          setIsChatMinimized(false);
        }}
      />
      
      <main className="flex-1">
        {renderActiveSection()}
      </main>

      {/* AI Chatbot */}
      <AIChatbot 
        isMinimized={isChatMinimized}
        onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
        isClosed={isChatClosed}
        onClose={() => setIsChatClosed(true)}
        onOpen={() => {
          setIsChatClosed(false);
          setIsChatMinimized(false);
        }}
      />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">JharkhandGO</h3>
              <p className="text-gray-300 text-sm">
                AI-powered digital tourism platform connecting travelers with 
                authentic Jharkhand experiences and local communities.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><button onClick={() => setActiveTab("destinations")}>Destinations</button></li>
                <li><button onClick={() => setActiveTab("itinerary")}>Plan Trip</button></li>
                <li><button onClick={() => setActiveTab("guides")}>Local Guides</button></li>
                <li><button onClick={() => setActiveTab("marketplace")}>Marketplace</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Community Guidelines</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Technology</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>🤖 AI-Powered Recommendations</li>
                <li>🔐 Blockchain Verification</li>
                <li>📱 AR/VR Experiences</li>
                <li>🌐 Multilingual Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 JharkhandGO. Empowering sustainable tourism in Jharkhand.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <span className="text-xs text-gray-500">Made with ❤️ for Jharkhand tourism</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}