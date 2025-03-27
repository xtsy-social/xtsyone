
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";

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

  const heroImages = [
    "/DJI_20250324_105854_074.jpg",
    "/lovable-uploads/94025f81-ca49-4e3e-8933-688d5d75762c.png",
    "/lovable-uploads/b6d0908c-d277-4968-aa68-12335ffee58a.png"
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero background with a carousel of images */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      
      <Carousel 
        className="absolute inset-0 h-full w-full"
        opts={{
          loop: true,
          duration: 50,
        }}
      >
        <CarouselContent className="h-full">
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div
                className={`w-full h-full bg-cover bg-center transition-all duration-1000 ${
                  isLoaded ? "scale-100 blur-0" : "scale-110 blur-sm"
                }`}
                style={{ backgroundImage: `url('${image}')` }}
              ></div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 z-20 h-10 w-10" />
        <CarouselNext className="absolute right-4 z-20 h-10 w-10" />
      </Carousel>
      
      {/* Hero content */}
      <div className="container-section relative z-20 h-full flex flex-col justify-center items-start pt-16">
        <div className="max-w-2xl text-white">
          <div className={`transition-all duration-700 delay-300 transform ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <div className="chip bg-white/20 text-white mb-6">XTSY Travellers Hostel</div>
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
