
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero background with a nice blur effect on load */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          isLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
        }`}
        style={{ backgroundImage: "url('/lovable-uploads/16227c91-213c-4788-8f2a-7f395c94c51f.png')" }}
      ></div>
      
      {/* Hero content */}
      <div className="container-section relative z-20 h-full flex flex-col justify-center items-start pt-16">
        <div className="max-w-2xl text-white">
          <div className={`transition-all duration-700 delay-300 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="mb-8">
              <img 
                src="/lovable-uploads/4faa6d49-1f02-44b8-8778-58860cca7c30.png" 
                alt="XTSY Travellers Hostel Logo" 
                className="h-24 md:h-32 mb-4"
              />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
              Explore the Shillong Vibe
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Take a break! Long nature hikes, team games or just a peaceful view. 
              Find your vibe - we got your stay covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-foreground hover:bg-white/90">
                Book Your Stay
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/20">
                View Rooms
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll down button */}
        <button
          onClick={scrollToFeatures}
          className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center transition-all duration-700 delay-700 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
