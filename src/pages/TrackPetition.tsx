import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Calendar, User, MapPin, FileText } from "lucide-react";

const TrackPetition = () => {
  const [petitionId, setPetitionId] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Mock petition data
  const petitionData = {
    id: "PET-2024-001234",
    title: "Street light not working on Main Road",
    status: "in-progress" as const,
    category: "Public Works",
    location: "Main Road, Sector 15",
    submittedDate: "2024-01-15",
    assignedTo: "Public Works Department",
    estimatedResolution: "7 days",
    timeline: [
      { date: "2024-01-15", time: "10:30 AM", event: "Petition submitted", status: "completed" },
      { date: "2024-01-15", time: "02:15 PM", event: "AI Analysis completed - Categorized as Public Works", status: "completed" },
      { date: "2024-01-16", time: "09:00 AM", event: "Assigned to Public Works Department", status: "completed" },
      { date: "2024-01-17", time: "11:30 AM", event: "Field inspection scheduled", status: "current" },
      { date: "Expected", time: "5-7 days", event: "Resolution expected", status: "pending" },
    ]
  };

  const handleSearch = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Petition</h1>
            <p className="text-muted-foreground">
              Enter your petition ID to view real-time status and updates
            </p>
          </div>

          <Card className="p-6 mb-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="petition-id">Petition ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="petition-id"
                    placeholder="Enter your petition ID (e.g., PET-2024-001234)"
                    value={petitionId}
                    onChange={(e) => setPetitionId(e.target.value)}
                  />
                  <Button onClick={handleSearch} className="bg-gradient-primary">
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Don't have your petition ID? <a href="/dashboard" className="text-primary hover:underline">View all your petitions</a>
              </p>
            </div>
          </Card>

          {showResults && (
            <div className="space-y-6">
              {/* Petition Overview */}
              <Card className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      {petitionData.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">ID: {petitionData.id}</p>
                  </div>
                  <StatusBadge status={petitionData.status} />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium text-foreground">{petitionData.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{petitionData.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium text-foreground">{petitionData.submittedDate}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned To</p>
                      <p className="font-medium text-foreground">{petitionData.assignedTo}</p>
                    </div>
                  </div>
                </div>

                <Card className="mt-6 p-4 bg-accent/10 border-accent/20">
                  <p className="text-sm font-medium text-foreground">
                    Estimated Resolution: <span className="text-accent">{petitionData.estimatedResolution}</span>
                  </p>
                </Card>
              </Card>

              {/* Timeline */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">Status Timeline</h3>
                <div className="space-y-6">
                  {petitionData.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-3 w-3 rounded-full ${
                          item.status === 'completed' ? 'bg-success' :
                          item.status === 'current' ? 'bg-primary' :
                          'bg-muted'
                        }`} />
                        {index < petitionData.timeline.length - 1 && (
                          <div className={`w-0.5 flex-1 mt-2 ${
                            item.status === 'completed' ? 'bg-success' : 'bg-muted'
                          }`} style={{ minHeight: '2rem' }} />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-foreground">{item.event}</p>
                          {item.status === 'current' && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {item.date} {item.time && `• ${item.time}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default TrackPetition;
