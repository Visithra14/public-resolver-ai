import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { ArrowLeft, ArrowRight, Upload, MapPin, CheckCircle, X, File as FileIcon, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { addPetition } from "@/lib/petitions";

const SubmitGrievance = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    attachments: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Public Works",
    "Healthcare",
    "Education",
    "Transportation",
    "Water & Sanitation",
    "Law & Order",
    "Other"
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }));
      toast.success(`${newFiles.length} file(s) attached`);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      toast.info("Fetching current location...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locStr = `Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)} (GPS)`;
          setFormData(prev => ({ ...prev, location: locStr }));
          toast.success("Location retrieved successfully");
        },
        () => {
          setFormData(prev => ({ ...prev, location: "Sector 14, Civic Center, New Delhi" }));
          toast.info("Location permission denied; set default local area.");
        }
      );
    } else {
      setFormData(prev => ({ ...prev, location: "Sector 14, Civic Center, New Delhi" }));
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    const created = addPetition({
      title: formData.title,
      category: formData.category,
      location: formData.location,
      description: formData.description,
    });

    toast.success("Grievance submitted successfully!", {
      description: `Your petition ID: ${created.id}`
    });

    setTimeout(() => {
      navigate(`/track?id=${created.id}`);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Submit a Grievance</h1>
            <p className="text-muted-foreground">
              Fill in the details below. Our AI automatically classifies, categorizes, and routes your petition.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
                1. Basic Info
              </span>
              <span className={`text-sm font-medium ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
                2. Details & Proof
              </span>
              <span className={`text-sm font-medium ${step >= 3 ? "text-primary" : "text-muted-foreground"}`}>
                3. AI Review & Submit
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-primary transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          <Card className="p-6 shadow-md border-border/80">
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Grievance Title</Label>
                  <Input
                    id="title"
                    placeholder="E.g., Broken water pipeline causing street flooding"
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
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    Our AI classifier will automatically categorize and prioritize this if left empty.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location / Area</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Enter street, locality, landmark, or pin code"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      size="icon"
                      title="Use current GPS location"
                      onClick={handleUseCurrentLocation}
                    >
                      <MapPin className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </div>

                <Button 
                  onClick={() => setStep(2)} 
                  className="w-full bg-gradient-primary"
                  disabled={!formData.title || !formData.location}
                >
                  Continue to Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your grievance in detail. Include what happened, when it started, and who is affected."
                    rows={8}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Be as descriptive as possible for accurate AI categorization.</span>
                    <span>{formData.description.length}/1000 characters</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Attachments (Photos, Docs, Invoices)</Label>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer bg-muted/20"
                  >
                    <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground mb-1">
                      Click to upload photos or documents
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, PDF up to 10MB each
                    </p>
                  </div>

                  {formData.attachments.length > 0 && (
                    <div className="space-y-2 mt-3">
                      <p className="text-xs font-semibold text-muted-foreground">Attached Files ({formData.attachments.length}):</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.attachments.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-md text-xs border border-border">
                            <FileIcon className="h-3.5 w-3.5 text-primary" />
                            <span className="truncate max-w-[180px] font-medium">{file.name}</span>
                            <span className="text-muted-foreground">({(file.size / 1024).toFixed(0)} KB)</span>
                            <button 
                              type="button" 
                              onClick={(e) => { e.stopPropagation(); handleRemoveFile(idx); }}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
                    disabled={!formData.description.trim()}
                  >
                    Review Submission <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-foreground">Review Your Submission</h3>
                  
                  <div className="space-y-3 border border-border rounded-lg p-4 bg-card">
                    <div>
                      <p className="text-xs uppercase font-semibold text-muted-foreground">Title</p>
                      <p className="font-medium text-foreground mt-0.5">{formData.title}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-semibold text-muted-foreground">Category</p>
                      <p className="font-medium text-foreground mt-0.5">{formData.category || "AI Auto-Classification Enabled"}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-semibold text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground mt-0.5">{formData.location}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-semibold text-muted-foreground">Description</p>
                      <p className="text-sm text-foreground mt-0.5 whitespace-pre-line">{formData.description}</p>
                    </div>
                    {formData.attachments.length > 0 && (
                      <div>
                        <p className="text-xs uppercase font-semibold text-muted-foreground">Attachments</p>
                        <p className="text-sm text-foreground mt-0.5">{formData.attachments.length} file(s) attached</p>
                      </div>
                    )}
                  </div>

                  <Card className="p-4 bg-accent/10 border-accent/20">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">AI Verification & Automated Dispatch</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Upon submission, the AI engine will parse the petition, assess severity, assign priority, and generate an official ticket with trackable milestone events.
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
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    className="flex-1 bg-gradient-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Grievance"}
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
