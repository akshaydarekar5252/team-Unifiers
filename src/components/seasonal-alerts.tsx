import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";
import { X, Clock, Sparkles, Calendar, MapPin, Zap, Bell } from "lucide-react";

interface SeasonalAlert {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  urgency: "high" | "medium" | "low";
  season: string;
  validMonths: number[];
  icon: React.ReactNode;
  emoji: string;
  gradient: string;
}

const seasonalAlerts: SeasonalAlert[] = [
  {
    id: "winter-festival",
    title: "Sarhul Festival Season is Here!",
    description: "Experience the vibrant tribal spring festival with traditional dances, sacred grove rituals, and authentic Jharkhand culture.",
    ctaText: "Book Festival Tour Now",
    urgency: "high",
    season: "Spring Festival",
    validMonths: [2, 3, 4], // Feb-Apr
    icon: <Sparkles className="h-5 w-5" />,
    emoji: "🎭",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: "monsoon-waterfalls",
    title: "Waterfalls at Peak Beauty!",
    description: "Monsoon has transformed Jharkhand's waterfalls into spectacular cascades. Hundru, Dassam, and Jonha Falls are at their most magnificent.",
    ctaText: "Explore Waterfall Circuit",
    urgency: "high",
    season: "Monsoon Magic",
    validMonths: [6, 7, 8, 9], // Jun-Sep
    icon: <MapPin className="h-5 w-5" />,
    emoji: "🌊",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: "winter-tribal-tours",
    title: "Perfect Weather for Tribal Village Tours!",
    description: "Cool, pleasant weather makes it ideal for exploring tribal villages, hiking through Netarhat hills, and wildlife safaris at Betla National Park.",
    ctaText: "Plan Winter Adventure",
    urgency: "medium",
    season: "Winter Wonders",
    validMonths: [11, 12, 1, 2], // Nov-Feb
    icon: <Calendar className="h-5 w-5" />,
    emoji: "❄️",
    gradient: "from-indigo-500 to-purple-500"
  },
  {
    id: "harvest-season",
    title: "Harvest Festival Celebrations!",
    description: "Join authentic harvest celebrations in tribal villages. Experience traditional farming practices and taste freshly harvested organic produce.",
    ctaText: "Join Harvest Tours",
    urgency: "medium",
    season: "Harvest Time",
    validMonths: [10, 11], // Oct-Nov
    icon: <Sparkles className="h-5 w-5" />,
    emoji: "🌾",
    gradient: "from-amber-500 to-orange-500"
  },
  {
    id: "summer-hill-retreat",
    title: "Beat the Heat in Jharkhand Hills!",
    description: "Escape summer heat in cool hill stations like Netarhat and Parasnath. Perfect time for hill treks and forest camping.",
    ctaText: "Book Hill Station Retreat",
    urgency: "medium",
    season: "Hill Station Season",
    validMonths: [4, 5, 6], // Apr-Jun
    icon: <MapPin className="h-5 w-5" />,
    emoji: "🏔️",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    id: "wildlife-safari",
    title: "Wildlife Safari Season Opens!",
    description: "Best time to spot tigers, elephants, and exotic birds at Betla National Park. Clear weather and active wildlife guarantee amazing experiences.",
    ctaText: "Book Safari Adventure",
    urgency: "high",
    season: "Wildlife Season",
    validMonths: [10, 11, 12, 1, 2, 3], // Oct-Mar
    icon: <Calendar className="h-5 w-5" />,
    emoji: "🐅",
    gradient: "from-yellow-500 to-orange-500"
  }
];

interface SeasonalAlertsProps {
  onBookingClick?: (alertId: string) => void;
}

export function SeasonalAlerts({ onBookingClick }: SeasonalAlertsProps) {
  const [alerts, setAlerts] = useState<SeasonalAlert[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Get current month (0-indexed)
    const currentMonth = new Date().getMonth() + 1;
    
    // Filter alerts relevant to current month
    const relevantAlerts = seasonalAlerts.filter(alert => 
      alert.validMonths.includes(currentMonth)
    );

    // Sort by urgency and pick the most relevant one
    const sortedAlerts = relevantAlerts.sort((a, b) => {
      const urgencyOrder = { high: 3, medium: 2, low: 1 };
      return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    });

    // Show max 1 alert to avoid overwhelming users
    setAlerts(sortedAlerts.slice(0, 1));

    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleBookingClick = (alertId: string) => {
    if (onBookingClick) {
      onBookingClick(alertId);
    }
    setIsVisible(false);
  };

  if (!isVisible || alerts.length === 0) {
    return null;
  }

  const currentAlert = alerts[0];

  return (
    <div className="fixed top-24 right-6 z-50 w-80 animate-in slide-in-from-right duration-500">
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${currentAlert.gradient} p-[2px] shadow-2xl`}>
        {/* Gradient border effect */}
        <div className="rounded-2xl bg-white dark:bg-gray-900">
          {/* Header with pulsing notification bell */}
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bell className="h-4 w-4 text-gray-600" />
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                {currentAlert.season}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              onClick={handleDismiss}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>

          {/* Main content */}
          <div className="px-4 pb-4">
            {/* Title with emoji */}
            <div className="flex items-start space-x-3 mb-3">
              <div className="text-2xl" role="img" aria-label={currentAlert.season}>
                {currentAlert.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">
                  {currentAlert.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {currentAlert.description}
            </p>

            {/* CTA Button */}
            <Button 
              className={`w-full bg-gradient-to-r ${currentAlert.gradient} hover:opacity-90 transition-all duration-200 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]`}
              onClick={() => handleBookingClick(currentAlert.id)}
            >
              <Zap className="h-4 w-4 mr-2" />
              {currentAlert.ctaText}
            </Button>

            {/* Timer indicator */}
            <div className="flex items-center justify-center mt-3 text-xs text-gray-500">
              <Clock className="h-3 w-3 mr-1" />
              <span className="animate-pulse">Limited Time Offer</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-1 bg-gray-100 dark:bg-gray-800 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${currentAlert.gradient} transition-all duration-100 ease-linear`}
              style={{
                animation: 'shrink 5000ms linear forwards',
              }}
            />
          </div>
        </div>
      </div>

      {/* Floating particles effect for high urgency alerts */}
      {currentAlert.urgency === 'high' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-400 rounded-full animate-ping"></div>
          <div className="absolute top-4 right-8 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-500"></div>
          <div className="absolute top-8 right-4 w-1 h-1 bg-green-400 rounded-full animate-ping animation-delay-1000"></div>
        </div>
      )}
    </div>
  );
}

/* Keyframe animation for progress bar */
const style = document.createElement('style');
style.textContent = `
  @keyframes shrink {
    from { width: 100%; }
    to { width: 0%; }
  }
  
  .animation-delay-500 {
    animation-delay: 500ms;
  }
  
  .animation-delay-1000 {
    animation-delay: 1000ms;
  }
`;
document.head.appendChild(style);