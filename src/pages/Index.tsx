import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { ChatbotWidget } from "@/components/ChatbotWidget";
import { FileText, Search, MessageSquare, CheckCircle, Clock, Shield } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Your Voice, <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Submit, track, and resolve grievances with AI-powered assistance. 
              We're here to ensure every citizen's concern is heard and addressed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/submit">
                <Button size="lg" className="w-full sm:w-auto bg-gradient-primary hover:opacity-90">
                  <FileText className="mr-2 h-5 w-5" />
                  Submit Grievance
                </Button>
              </Link>
              <Link to="/track">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Track Status
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Citizens engaging with government services" 
              className="rounded-2xl shadow-elevated w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Submit Easily</h3>
            <p className="text-muted-foreground">
              Fill a simple form or use our chatbot to describe your grievance. 
              Attach photos or documents if needed.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Track Progress</h3>
            <p className="text-muted-foreground">
              Monitor your petition status in real-time with detailed timeline updates 
              and estimated resolution times.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Get Resolution</h3>
            <p className="text-muted-foreground">
              Receive notifications at every step. Your concerns are assigned 
              to the right department for quick resolution.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card border-y border-border py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Petitions Filed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">85%</div>
              <div className="text-muted-foreground">Resolution Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-warning mb-2">7 Days</div>
              <div className="text-muted-foreground">Avg. Response Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="p-8 md:p-12 bg-gradient-primary text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Make Your Voice Heard?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens who trust us to deliver their concerns 
            to the right authorities. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/submit">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Submit Your First Grievance
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Create Account
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 CitizenVoice. Empowering citizens through technology.</p>
        </div>
      </footer>

      <ChatbotWidget />
    </div>
  );
};

export default Index;
