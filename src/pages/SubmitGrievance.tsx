import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { ArrowLeft, ArrowRight, Upload, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const SubmitGrievance = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    attachments: [] as File[],
  });

  const handleSubmit = () => {
    // TODO: Implement API call to submit grievance
    toast.success("Grievance submitted successfully!", {
      description: "Your petition ID: PET-2024-001234"
    });
    setTimeout(() => navigate("/dashboard"), 2000);
  };

  const categories = [
    "Public Works",
    "Healthcare",
    "Education",
    "Transportation",
    "Water & Sanitation",
    "Law & Order",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Submit a Grievance</h1>
            <p className="text-muted-foreground">
              Fill in the details below. We'll automatically categorize and prioritize your petition.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                Basic Info
              </span>
              <span className={`text-sm font-medium ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                Details
              </span>
              <span className={`text-sm font-medium ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                Review
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          <Card className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Grievance Title</Label>
                  <Input
                    id="title"
                    placeholder="Brief summary of your complaint"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category (Optional)</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category or let AI decide" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Our AI will suggest the best category if you're unsure
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Enter location or use current location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <Button variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={() => setStep(2)} 
                  className="w-full bg-gradient-primary"
                  disabled={!formData.title || !formData.location}
                >
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your grievance in detail. Include what happened, when, and any relevant information."
                    rows={8}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length}/1000 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Attachments (Optional)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Images, PDFs, or audio files (Max 10MB)
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setStep(1)} 
                    variant="outline"
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button 
                    onClick={() => setStep(3)} 
                    className="flex-1 bg-gradient-primary"
                    disabled={!formData.description}
                  >
                    Continue <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-foreground">Review Your Submission</h3>
                  
                  <div className="space-y-3 border border-border rounded-lg p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Title</p>
                      <p className="font-medium text-foreground">{formData.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium text-foreground">{formData.category || "AI will categorize"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">{formData.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Description</p>
                      <p className="font-medium text-foreground">{formData.description}</p>
                    </div>
                  </div>

                  <Card className="p-4 bg-accent/10 border-accent/20">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">AI Analysis Complete</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your grievance will be automatically categorized, prioritized, and assigned to the appropriate department.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={() => setStep(2)} 
                    variant="outline"
                    className="flex-1"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="flex-1 bg-gradient-primary"
                  >
                    Submit Grievance
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
      <ChatbotWidget />
    </div>
  );
};

export default SubmitGrievance;
