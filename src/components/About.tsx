
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={aboutRef}
      className="py-20 bg-secondary overflow-hidden"
    >
      <div className="container-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* About text */}
          <div className={cn(
            "transition-all duration-700 delay-100 transform",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <div className="chip bg-accent text-accent-foreground mb-4">About Us</div>
            <h2 className="section-heading">XTSY Travellers Hostel</h2>
            <p className="text-muted-foreground mb-6">
              Nestled in the heart of Shillong, XTSY Travellers Hostel was founded with a vision 
              to provide travelers with a comfortable home away from home while experiencing the 
              unique culture and natural beauty of Meghalaya.
            </p>
            <p className="text-muted-foreground mb-6">
              Our hostel combines modern amenities with local charm, creating a space where 
              travelers from around the world can connect, relax, and create lasting memories.
              Whether you're a solo backpacker, a family on vacation, or a group of friends on an 
              adventure, XTSY Hostel welcomes you to experience the magic of Shillong.
            </p>

            <div className="space-y-4 mt-6 mb-8">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm">
                  Police Bazar, Shillong, Meghalaya 793001, India
                </p>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm">+91 98765 43210</p>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm">info@xtsyhostel.com</p>
              </div>
              <div className="flex items-start">
                <Clock className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-sm">Check-in: 2:00 PM | Check-out: 11:00 AM</p>
              </div>
            </div>

            <Button className="mt-4">Contact Us</Button>
          </div>

          {/* About image */}
          <div className={cn(
            "transition-all duration-700 delay-300 transform",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-lg"></div>
              <div className="rounded-lg overflow-hidden relative z-10 shadow-md">
                <img 
                  src="/DJI_20250324_133421_247.jpg" 
                  alt="XTSY Hostel" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
