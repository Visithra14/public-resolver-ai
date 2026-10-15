import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero p-4">
      <div className="text-center max-w-md">
        <div className="text-7xl font-extrabold text-primary mb-2">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The requested path <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">{location.pathname}</code> does not exist or has been relocated.
        </p>
        <Link to="/">
          <Button className="bg-gradient-primary">
            <Home className="h-4 w-4 mr-2" />
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
