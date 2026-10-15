import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navbar } from "@/components/Navbar";
import { FileText, ArrowRight, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signInEmail, setSignInEmail] = useState("citizen@demo.org");
  const [signInPassword, setSignInPassword] = useState("password123");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpMobile, setSignUpMobile] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Welcome back!", {
        description: `Signed in as ${signInEmail}`
      });
      navigate("/dashboard");
    }, 600);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully!", {
        description: `Welcome to CitizenVoice, ${signUpName || "Citizen"}`
      });
      navigate("/dashboard");
    }, 600);
  };

  const handleDemoSignIn = () => {
    toast.success("Demo Citizen session started");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                <FileText className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-foreground">CitizenVoice</span>
            </Link>
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to track, manage, and escalate your petitions</p>
          </div>

          <Card className="p-6 shadow-md border-border/80">
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email or Mobile</Label>
                    <Input 
                      id="signin-email" 
                      type="text" 
                      placeholder="citizen@example.com" 
                      value={signInEmail}
                      onChange={(e) => setSignInEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password">Password</Label>
                      <button 
                        type="button" 
                        onClick={() => toast.info("Password reset instructions sent to email")} 
                        className="text-xs text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input 
                      id="signin-password" 
                      type="password" 
                      placeholder="Enter password" 
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full flex items-center justify-center gap-2"
                    onClick={handleDemoSignIn}
                  >
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    Instant Demo Login <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input 
                      id="signup-name" 
                      type="text" 
                      placeholder="Enter your full name" 
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email Address</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="name@example.com" 
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-mobile">Mobile Number</Label>
                    <Input 
                      id="signup-mobile" 
                      type="tel" 
                      placeholder="+91 98765 43210" 
                      value={signUpMobile}
                      onChange={(e) => setSignUpMobile(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="Create a strong password" 
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating account..." : "Create Citizen Account"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By signing up, you agree to our Terms of Civic Redressal and Privacy Policy
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
