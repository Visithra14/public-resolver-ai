import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Calendar, MapPin, ArrowRight } from "lucide-react";

const Dashboard = () => {
  // Mock user petitions data
  const petitions = [
    {
      id: "PET-2024-001234",
      title: "Street light not working on Main Road",
      status: "in-progress" as const,
      category: "Public Works",
      location: "Main Road, Sector 15",
      date: "2024-01-15",
      urgency: "Medium"
    },
    {
      id: "PET-2024-001180",
      title: "Pothole near school entrance",
      status: "resolved" as const,
      category: "Public Works",
      location: "School Road, Sector 12",
      date: "2024-01-10",
      urgency: "High"
    },
    {
      id: "PET-2024-001095",
      title: "Water supply interruption",
      status: "escalated" as const,
      category: "Water & Sanitation",
      location: "Residential Area, Sector 8",
      date: "2024-01-05",
      urgency: "High"
    },
  ];

  const stats = {
    total: 3,
    inProgress: 1,
    resolved: 1,
    escalated: 1,
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Petitions</h1>
              <p className="text-muted-foreground">Track and manage all your grievances</p>
            </div>
            <Link to="/submit">
              <Button className="bg-gradient-primary">
                <Plus className="h-4 w-4 mr-2" />
                New Petition
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Total Petitions</p>
              <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">In Progress</p>
              <p className="text-3xl font-bold text-primary">{stats.inProgress}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Resolved</p>
              <p className="text-3xl font-bold text-success">{stats.resolved}</p>
            </Card>
            <Card className="p-6">
              <p className="text-sm text-muted-foreground mb-1">Escalated</p>
              <p className="text-3xl font-bold text-destructive">{stats.escalated}</p>
            </Card>
          </div>

          {/* Petitions List */}
          <div className="space-y-4">
            {petitions.map((petition) => (
              <Card key={petition.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {petition.title}
                      </h3>
                      <StatusBadge status={petition.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      ID: {petition.id}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{petition.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{petition.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Urgency:</span>
                        <span className={`font-medium ${
                          petition.urgency === 'High' ? 'text-destructive' :
                          petition.urgency === 'Medium' ? 'text-warning' :
                          'text-muted-foreground'
                        }`}>
                          {petition.urgency}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <Link to="/track">
                    <Button variant="outline" size="sm">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          {petitions.length === 0 && (
            <Card className="p-12 text-center">
              <div className="max-w-md mx-auto">
                <p className="text-lg text-muted-foreground mb-4">
                  You haven't submitted any petitions yet
                </p>
                <Link to="/submit">
                  <Button className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Your First Petition
                  </Button>
                </Link>
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
