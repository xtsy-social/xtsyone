
import { Link } from "react-router-dom";
import { Heart, Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary py-12 border-t">
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="animate-fade-in">
            <h3 className="text-xl font-medium mb-4">XTSY Travellers Hostel</h3>
            <p className="text-muted-foreground mb-4">
              Take a break! Experience long nature hikes, team games, or just a peaceful view.
              Find your vibe - we've got your stay covered.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in delay-75">
            <h3 className="text-xl font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/#rooms" className="text-muted-foreground hover:text-primary transition-colors">Rooms</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in delay-150">
            <h3 className="text-xl font-medium mb-4">Safety Amenities</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">24/7 CCTV Surveillance</li>
              <li className="text-muted-foreground">Security Guard</li>
              <li className="text-muted-foreground">Medical Assistance</li>
              <li className="text-muted-foreground">Fire Safety Equipment</li>
              <li className="text-muted-foreground">Secure Lockers</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} XTSY Travellers Hostel, Shillong. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center mt-2 md:mt-0">
            Made with <Heart className="h-3 w-3 mx-1 text-primary" /> in Shillong
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
