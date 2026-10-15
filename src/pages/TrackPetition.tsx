import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Calendar, User, MapPin, FileText, AlertCircle, ArrowRight } from "lucide-react";
import { getPetitions, getPetitionById, Petition } from "@/lib/petitions";

const TrackPetition = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryId = searchParams.get("id") || "";
  const [petitionId, setPetitionId] = useState(queryId);
  const [currentPetition, setCurrentPetition] = useState<Petition | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const all = getPetitions();
    if (queryId) {
      setPetitionId(queryId);
      const found = getPetitionById(queryId);
      if (found) {
        setCurrentPetition(found);
        setNotFound(false);
      } else {
        setCurrentPetition(null);
        setNotFound(true);
      }
    } else if (all.length > 0) {
      // Default to first petition for demonstration
      setCurrentPetition(all[0]);
      setPetitionId(all[0].id);
      setNotFound(false);
    }
  }, [queryId]);

  const handleSearch = () => {
    if (!petitionId.trim()) return;
    const found = getPetitionById(petitionId);
    if (found) {
      setCurrentPetition(found);
      setNotFound(false);
      setSearchParams({ id: found.id });
    } else {
      setCurrentPetition(null);
      setNotFound(true);
    }
  };

  const allPetitions = getPetitions();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Petition</h1>
            <p className="text-muted-foreground">
              Enter your petition ID to view real-time status and progress updates
            </p>
          </div>

          <Card className="p-6 mb-8 shadow-sm border-border/80">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="petition-id">Petition ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="petition-id"
                    placeholder="Enter petition ID (e.g., PET-2024-001234)"
                    value={petitionId}
                    onChange={(e) => setPetitionId(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                  <Button onClick={handleSearch} className="bg-gradient-primary shrink-0">
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-muted-foreground">
                  Don't have your petition ID?{" "}
                  <Link to="/dashboard" className="text-primary font-medium hover:underline">
                    View all your petitions in Dashboard
                  </Link>
                </p>
                {allPetitions.length > 0 && (
                  <div className="hidden sm:flex gap-1.5 items-center text-xs text-muted-foreground">
                    <span>Recent IDs:</span>
                    {allPetitions.slice(0, 3).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setPetitionId(p.id);
                          setCurrentPetition(p);
                          setNotFound(false);
                          setSearchParams({ id: p.id });
                        }}
                        className="underline hover:text-primary transition-colors font-mono"
                      >
                        {p.id}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {notFound && (
            <Card className="p-8 text-center border-destructive/30 bg-destructive/5 mb-8">
              <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Petition Not Found
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                We could not locate any active petition with ID "{petitionId}". Please double check the ID.
              </p>
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  Go to My Petitions
                </Button>
              </Link>
            </Card>
          )}

          {currentPetition && (
            <div className="space-y-6">
              {/* Petition Overview */}
              <Card className="p-6 shadow-sm border-border/80">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-bold text-foreground">
                        {currentPetition.title}
                      </h2>
                    </div>
                    <p className="text-sm text-muted-foreground font-mono mt-1">ID: {currentPetition.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      currentPetition.urgency === 'High' ? 'bg-destructive/15 text-destructive border border-destructive/20' :
                      currentPetition.urgency === 'Medium' ? 'bg-warning/15 text-warning border border-warning/20' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {currentPetition.urgency} Urgency
                    </span>
                    <StatusBadge status={currentPetition.status} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium text-foreground">{currentPetition.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{currentPetition.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium text-foreground">{currentPetition.submittedDate || currentPetition.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Assigned Authority</p>
                      <p className="font-medium text-foreground">{currentPetition.assignedTo}</p>
                    </div>
                  </div>
                </div>

                {currentPetition.description && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-xs uppercase font-semibold text-muted-foreground mb-1">Grievance Details</p>
                    <p className="text-sm text-foreground/90 leading-relaxed">{currentPetition.description}</p>
                  </div>
                )}

                <Card className="mt-6 p-4 bg-accent/10 border-accent/20">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      Target Resolution Window:{" "}
                      <span className="text-accent font-semibold">{currentPetition.estimatedResolution}</span>
                    </p>
                    <Link to="/dashboard">
                      <span className="text-xs font-semibold text-primary hover:underline flex items-center">
                        Back to Dashboard <ArrowRight className="h-3 w-3 ml-1" />
                      </span>
                    </Link>
                  </div>
                </Card>
              </Card>

              {/* Timeline */}
              <Card className="p-6 shadow-sm border-border/80">
                <h3 className="text-xl font-bold text-foreground mb-6">Status Timeline & Audit Trail</h3>
                <div className="space-y-6">
                  {currentPetition.timeline.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`h-3.5 w-3.5 rounded-full ring-4 ring-background ${
                          item.status === 'completed' ? 'bg-success ring-success/20' :
                          item.status === 'current' ? 'bg-primary ring-primary/20' :
                          'bg-muted ring-muted/20'
                        }`} />
                        {index < currentPetition.timeline.length - 1 && (
                          <div className={`w-0.5 flex-1 mt-2 ${
                            item.status === 'completed' ? 'bg-success' : 'bg-muted'
                          }`} style={{ minHeight: '2.5rem' }} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={`font-medium ${item.status === 'current' ? 'text-primary' : 'text-foreground'}`}>
                            {item.event}
                          </p>
                          {item.status === 'current' && (
                            <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-medium">
                              Current Phase
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
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
