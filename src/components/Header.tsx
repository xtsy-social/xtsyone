
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Testimonial", href: "/#testimonials" },
    { label: "Features", href: "/#features" },
    { label: "Rooms", href: "/#rooms" },
    { label: "Gallery", href: "/#gallery" },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "backdrop-blur border-b py-3" : "py-5"
      )}
    >
      <div className="container-section flex items-center justify-between">
        <Link 
          to="/" 
          className="relative z-10 flex items-center animate-fade-in"
        >
          <img 
            src="/lovable-uploads/4faa6d49-1f02-44b8-8778-58860cca7c30.png" 
            alt="XTSY Travellers Hostel Logo" 
            className="h-12 md:h-14"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-all duration-200 hover:text-primary",
                (location.pathname === item.href || 
                (location.pathname === "/" && item.href.startsWith("/#"))) && 
                "text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button size="sm" className="animate-scale-in">
            Book Now
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-10"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-0 md:hidden">
            <nav className="flex flex-col items-center justify-center h-full space-y-6 animate-fade-in">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    "text-lg font-medium hover:text-primary",
                    (location.pathname === item.href || 
                    (location.pathname === "/" && item.href.startsWith("/#"))) && 
                    "text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <Button size="lg" className="mt-4">
                Book Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
