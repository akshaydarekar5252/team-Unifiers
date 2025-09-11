import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  MapPin, 
  IndianRupee,
  Calendar,
  Award,
  Globe,
  Camera,
  Download
} from "lucide-react";

export function AnalyticsDashboard() {
  // Sample data for charts
  const monthlyVisitors = [
    { month: "Jan", visitors: 2400, revenue: 380000 },
    { month: "Feb", visitors: 3200, revenue: 450000 },
    { month: "Mar", visitors: 2800, revenue: 420000 },
    { month: "Apr", visitors: 3600, revenue: 520000 },
    { month: "May", visitors: 4200, revenue: 680000 },
    { month: "Jun", visitors: 3800, revenue: 590000 },
    { month: "Jul", visitors: 4600, revenue: 750000 },
    { month: "Aug", visitors: 5200, revenue: 830000 },
    { month: "Sep", visitors: 4800, revenue: 720000 },
    { month: "Oct", visitors: 5600, revenue: 920000 },
    { month: "Nov", visitors: 6200, revenue: 1050000 },
    { month: "Dec", visitors: 5800, revenue: 980000 },
  ];

  const destinationPopularity = [
    { name: "Hundru Falls", visitors: 12500, percentage: 28 },
    { name: "Netarhat", visitors: 9800, percentage: 22 },
    { name: "Betla National Park", visitors: 8900, percentage: 20 },
    { name: "Deoghar", visitors: 7200, percentage: 16 },
    { name: "Patratu Valley", visitors: 6100, percentage: 14 },
  ];

  const visitorDemographics = [
    { category: "Domestic", value: 75, color: "#22c55e" },
    { category: "International", value: 15, color: "#3b82f6" },
    { category: "Local", value: 10, color: "#f59e0b" },
  ];

  const bookingTrends = [
    { service: "Homestays", bookings: 1850, growth: 15 },
    { service: "Guides", bookings: 2340, growth: 23 },
    { service: "Experiences", bookings: 1680, growth: 18 },
    { service: "Handicrafts", bookings: 890, growth: 12 },
  ];

  const kpiData = [
    {
      title: "Total Visitors",
      value: "54,200",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Revenue Generated",
      value: "₹84.2L",
      change: "+18.3%",
      trend: "up",
      icon: IndianRupee,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Active Destinations",
      value: "23",
      change: "+2",
      trend: "up",
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Avg. Stay Duration",
      value: "3.2 days",
      change: "+0.4",
      trend: "up",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tourism Analytics Dashboard
          </h2>
          <p className="text-xl text-gray-600">
            Real-time insights and performance metrics for Jharkhand tourism
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Globe className="h-4 w-4 mr-2" />
            Live Dashboard
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className={`h-3 w-3 mr-1 ${
                        kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`} />
                      <span className={`text-xs font-medium ${
                        kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {kpi.change}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`${kpi.bgColor} rounded-full p-3`}>
                    <Icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Monthly Visitors & Revenue */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Visitors & Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyVisitors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="visitors" 
                  stroke="#3b82f6" 
                  name="Visitors"
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#22c55e" 
                  name="Revenue (₹)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Destinations */}
        <Card>
          <CardHeader>
            <CardTitle>Popular Destinations</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={destinationPopularity} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="visitors" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Visitor Demographics */}
        <Card>
          <CardHeader>
            <CardTitle>Visitor Demographics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={visitorDemographics}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ category, value }) => `${category}: ${value}%`}
                >
                  {visitorDemographics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Booking Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Service Booking Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookingTrends.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">{service.service}</p>
                      <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                    </div>
                  </div>
                  <Badge variant={service.growth > 15 ? "default" : "secondary"} className="text-xs">
                    +{service.growth}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Impact Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Tourism Impact Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span>Local Employment Generated</span>
                <div className="text-right">
                  <div className="font-bold text-green-600">1,240 jobs</div>
                  <div className="text-xs text-gray-500">+15% this year</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Community Revenue Share</span>
                <div className="text-right">
                  <div className="font-bold text-blue-600">₹18.5L</div>
                  <div className="text-xs text-gray-500">Direct to locals</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Eco-tourism Projects</span>
                <div className="text-right">
                  <div className="font-bold text-purple-600">12 active</div>
                  <div className="text-xs text-gray-500">Conservation focused</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Cultural Programs Supported</span>
                <div className="text-right">
                  <div className="font-bold text-orange-600">28 events</div>
                  <div className="text-xs text-gray-500">Tribal festivals</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Carbon Offset Achieved</span>
                <div className="text-right">
                  <div className="font-bold text-green-600">45 tonnes CO2</div>
                  <div className="text-xs text-gray-500">Through eco-tourism</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span>App Downloads</span>
                <div className="text-right">
                  <div className="font-bold">42,850</div>
                  <div className="text-xs text-gray-500">+23% this month</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Active Users</span>
                <div className="text-right">
                  <div className="font-bold">18,420</div>
                  <div className="text-xs text-gray-500">Daily average</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>User Satisfaction</span>
                <div className="text-right">
                  <div className="font-bold text-green-600">4.8/5</div>
                  <div className="text-xs text-gray-500">Based on 2.1k reviews</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>AI Interactions</span>
                <div className="text-right">
                  <div className="font-bold">156,000</div>
                  <div className="text-xs text-gray-500">Chatbot queries</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Blockchain Transactions</span>
                <div className="text-right">
                  <div className="font-bold">8,950</div>
                  <div className="text-xs text-gray-500">Verified bookings</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Platform Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Award className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New verified guide joined</p>
                <p className="text-xs text-gray-500">Manoj Kumar from Betla National Park - Wildlife Expert</p>
              </div>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">High booking activity detected</p>
                <p className="text-xs text-gray-500">Netarhat homestays - 85% booked for next weekend</p>
              </div>
              <span className="text-xs text-gray-500">4 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Camera className="h-5 w-5 text-purple-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">New AR experience launched</p>
                <p className="text-xs text-gray-500">Hundru Falls virtual tour now available</p>
              </div>
              <span className="text-xs text-gray-500">6 hours ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
              <IndianRupee className="h-5 w-5 text-orange-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">Revenue milestone achieved</p>
                <p className="text-xs text-gray-500">₹1 crore revenue generated this quarter</p>
              </div>
              <span className="text-xs text-gray-500">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}