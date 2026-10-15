import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { StatusBadge } from "@/components/StatusBadge";
import { 
  Plus, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Search, 
  Filter, 
  TrendingUp, 
  BarChart3, 
  PieChart as PieIcon, 
  CheckCircle2, 
  Clock, 
  ShieldAlert 
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend, 
  Cell 
} from "recharts";
import { getPetitions, Petition } from "@/lib/petitions";

const RESOLUTION_TREND_DATA = [
  { month: "May", submitted: 240, resolved: 210, escalated: 15 },
  { month: "Jun", submitted: 310, resolved: 285, escalated: 18 },
  { month: "Jul", submitted: 380, resolved: 350, escalated: 22 },
  { month: "Aug", submitted: 420, resolved: 405, escalated: 14 },
  { month: "Sep", submitted: 510, resolved: 490, escalated: 19 },
  { month: "Oct", submitted: 620, resolved: 595, escalated: 12 },
];

const DEPARTMENT_METRICS = [
  { department: "Public Works", active: 28, resolved: 142, slaRate: 92, color: "#3b82f6" },
  { department: "Water Supply", active: 19, resolved: 98, slaRate: 88, color: "#06b6d4" },
  { department: "Healthcare", active: 8, resolved: 64, slaRate: 96, color: "#10b981" },
  { department: "Transport", active: 14, resolved: 73, slaRate: 85, color: "#f59e0b" },
  { department: "Sanitation", active: 12, resolved: 89, slaRate: 94, color: "#8b5cf6" },
  { department: "Law & Order", active: 5, resolved: 41, slaRate: 98, color: "#ec4899" },
];

const Dashboard = () => {
  const [petitions, setPetitions] = useState<Petition[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAnalytics, setShowAnalytics] = useState(true);

  useEffect(() => {
    setPetitions(getPetitions());
  }, []);

  const stats = {
    total: petitions.length,
    inProgress: petitions.filter(p => p.status === "in-progress" || p.status === "assigned" || p.status === "submitted").length,
    resolved: petitions.filter(p => p.status === "resolved").length,
    escalated: petitions.filter(p => p.status === "escalated").length,
  };

  const filteredPetitions = petitions.filter(p => {
    const matchesFilter = filterStatus === "all" || p.status === filterStatus;
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-1">My Petitions & Analytics</h1>
              <p className="text-muted-foreground">Monitor, filter, and analyze civic grievance resolution performance</p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4 text-primary" />
                {showAnalytics ? "Hide Analytics" : "Show Analytics"}
              </Button>
              <Link to="/submit">
                <Button className="bg-gradient-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  New Petition
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card 
              className={`p-5 cursor-pointer transition-all hover:border-primary/50 shadow-sm ${filterStatus === 'all' ? 'ring-2 ring-primary/30 border-primary' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              <p className="text-xs uppercase font-medium text-muted-foreground mb-1">Total Petitions</p>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-primary" />
                All tracked filings
              </p>
            </Card>
            <Card 
              className={`p-5 cursor-pointer transition-all hover:border-primary/50 shadow-sm ${filterStatus === 'in-progress' ? 'ring-2 ring-primary/30 border-primary' : ''}`}
              onClick={() => setFilterStatus('in-progress')}
            >
              <p className="text-xs uppercase font-medium text-muted-foreground mb-1">Active / In Progress</p>
              <p className="text-3xl font-bold text-primary">{stats.inProgress}</p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3 text-primary" />
                Within SLA window
              </p>
            </Card>
            <Card 
              className={`p-5 cursor-pointer transition-all hover:border-success/50 shadow-sm ${filterStatus === 'resolved' ? 'ring-2 ring-success/30 border-success' : ''}`}
              onClick={() => setFilterStatus('resolved')}
            >
              <p className="text-xs uppercase font-medium text-muted-foreground mb-1">Resolved</p>
              <p className="text-3xl font-bold text-success">{stats.resolved}</p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3 text-success" />
                Audited & closed
              </p>
            </Card>
            <Card 
              className={`p-5 cursor-pointer transition-all hover:border-destructive/50 shadow-sm ${filterStatus === 'escalated' ? 'ring-2 ring-destructive/30 border-destructive' : ''}`}
              onClick={() => setFilterStatus('escalated')}
            >
              <p className="text-xs uppercase font-medium text-muted-foreground mb-1">Escalated</p>
              <p className="text-3xl font-bold text-destructive">{stats.escalated}</p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <ShieldAlert className="h-3 w-3 text-destructive" />
                Priority redressal
              </p>
            </Card>
          </div>

          {/* Analytics Visualizations Section */}
          {showAnalytics && (
            <div className="mb-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Resolution Inflow vs Resolution Trend */}
                <Card className="p-6 shadow-sm border-border/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Grievance Inflow vs. Resolution Rate
                      </h3>
                      <p className="text-xs text-muted-foreground">Monthly volume metrics and 6-month resolution velocity</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-success/15 text-success rounded-full font-medium">
                      94.2% Resolution
                    </span>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={RESOLUTION_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorSubmitted" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                          </linearGradient>
                          <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                            border: '1px solid #e2e8f0',
                            fontSize: '12px'
                          }} 
                        />
                        <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                        <Area type="monotone" dataKey="submitted" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSubmitted)" name="Petitions Filed" />
                        <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorResolved)" name="Petitions Resolved" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* Departmental Workload & SLA Compliance */}
                <Card className="p-6 shadow-sm border-border/80">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-accent" />
                        Departmental Workload & SLA Adherence
                      </h3>
                      <p className="text-xs text-muted-foreground">Cases handled across civic municipal departments</p>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                      Avg SLA: 4.2 Days
                    </span>
                  </div>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={DEPARTMENT_METRICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                        <XAxis dataKey="department" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={45} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                            borderRadius: '8px', 
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
                            border: '1px solid #e2e8f0',
                            fontSize: '12px'
                          }} 
                        />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} name="Resolved Cases" />
                        <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} name="In-Flight Cases" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title, ID, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-card"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> Filter:
              </span>
              {[
                { label: "All", value: "all" },
                { label: "Submitted", value: "submitted" },
                { label: "In Progress", value: "in-progress" },
                { label: "Escalated", value: "escalated" },
                { label: "Resolved", value: "resolved" }
              ].map(f => (
                <button
                  key={f.value}
                  onClick={() => setFilterStatus(f.value)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                    filterStatus === f.value 
                      ? "bg-primary text-primary-foreground font-medium" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Petitions List */}
          <div className="space-y-4">
            {filteredPetitions.map((petition) => (
              <Card key={petition.id} className="p-6 hover:shadow-md transition-shadow border-border/80">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {petition.title}
                      </h3>
                      <StatusBadge status={petition.status} />
                    </div>
                    <p className="text-xs font-mono text-muted-foreground mb-3">
                      ID: {petition.id} &bull; Category: {petition.category}
                    </p>
                    
                    <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
                      {petition.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-primary" />
                        <span>{petition.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        <span>{petition.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-muted-foreground">Urgency:</span>
                        <span className={`font-semibold ${
                          petition.urgency === 'High' ? 'text-destructive' :
                          petition.urgency === 'Medium' ? 'text-warning' :
                          'text-muted-foreground'
                        }`}>
                          {petition.urgency}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="shrink-0 flex items-center md:items-end md:justify-center">
                    <Link to={`/track?id=${petition.id}`} className="w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="w-full sm:w-auto hover:bg-primary hover:text-primary-foreground transition-colors">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredPetitions.length === 0 && (
            <Card className="p-12 text-center border-dashed">
              <div className="max-w-md mx-auto">
                <p className="text-lg font-medium text-foreground mb-2">
                  No petitions matched your filter
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Try adjusting your search criteria or submit a new grievance.
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => { setFilterStatus("all"); setSearchQuery(""); }}>
                    Reset Filters
                  </Button>
                  <Link to="/submit">
                    <Button className="bg-gradient-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Submit Grievance
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default Dashboard;
