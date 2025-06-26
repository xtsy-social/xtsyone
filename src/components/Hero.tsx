
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60 z-10"></div>
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          isLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
        }`}
        style={{ backgroundImage: "url('/https://twsyvqdrcjdeqirbuppj.supabase.co/storage/v1/object/public/hostel-wanderlust-images/Screenshot+2025-05-27+154807.png')" }}
      ></div>
      
      {/* Hero content */}
      <div className="container-section relative z-20 h-full flex flex-col justify-center items-start pt-16">
        <div className="max-w-2xl">
          <div className={`transition-all duration-700 delay-300 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-white drop-shadow-[0_2px_5px_rgba(0,0,0,1)]">
              Live the Shillong Vibe
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] mb-8">
              Hey there, adventure seeker! Grab one of our limited spots and dive into Shillong's magic – epic hikes, 
              cool hangouts, and jaw-dropping views that'll make your Instagram explode!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-red-600 text-white hover:bg-red-700">
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
          <span className="text-sm font-medium mb-2 drop-shadow-[0_1px_3px_rgba(0,0,0,1)]">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce drop-shadow-[0_1px_3px_rgba(0,0,0,1)]" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
