import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, FileText, Search, MessageSquare } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">CitizenVoice</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/submit" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Submit Grievance
            </Link>
            <Link to="/track" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Track Status
            </Link>
            <Link to="/dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              My Petitions
            </Link>
            <Link to="/auth">
              <Button variant="default" size="sm">Sign In</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              to="/submit"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Grievance
            </Link>
            <Link
              to="/track"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Track Status
            </Link>
            <Link
              to="/dashboard"
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              My Petitions
            </Link>
            <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
              <Button variant="default" size="sm" className="w-full">Sign In</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
