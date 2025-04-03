
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, Shield } from "lucide-react";

const featuresList = [
  {
    id: "solo-travel",
    title: "Solo Travel",
    description: "Join our awesome community of independent travelers and discover Meghalaya's hidden gems together!",
    details: "Ever wanted to explore secret spots that aren't on any tourist map? That's exactly what we do here! Our guided hikes take you to jaw-dropping locations only locals know about. Plus, our cozy community spaces are perfect for meeting fellow adventurers. Want insider access to Shillong's authentic music scene and the best local cafes? You got it when you stay with us!",
    icon: MapPin,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: "group-booking",
    title: "Group Booking",
    description: "Bringing your crew? Grab one of our group spots for an unforgettable Meghalaya adventure!",
    details: "Heads up - our best rooms get snapped up months ahead of time! We can host up to 50 of your friends in our comfy spaces, and we'll craft a custom itinerary just for your gang. Want to know the coolest part? Our seasonal experiences (the ones everyone raves about on Instagram) are only available if you book as a group. Just saying!",
    icon: Users,
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: "weekend-getaway",
    title: "Weekend Getaway",
    description: "Escape to Shillong's perfect weather while your friends back home deal with the heat and pollution!",
    details: "Picture this: you're breathing in the freshest mountain air in India while scrolling through your friends' stories about record pollution levels back home. Our weekend spots fill up super fast, especially during festival season (no surprise there!). Wake up to the most incredible sunrise views from our panoramic rooms - but you'll need to book early to snag one of these beauties!",
    icon: Calendar,
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: "safe-place",
    title: "Safe Place to Chill",
    description: "Our evening hangouts are legendary - everyone who stays wants to come back for more!",
    details: "So many guests extend their stay just for our music nights and karaoke sessions (they're that good!). Our game tournaments? Epic. Cultural evenings? Unforgettable. The connections you'll make here last way beyond checkout time. No wonder we're Shillong's highest-rated hostel experience! Come see what everyone's talking about before all the spots are gone.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  },
];

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(featuresList[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current);
      }
    };
  }, []);

  const activeFeatureData = featuresList.find(f => f.id === activeFeature);

  return (
    <section 
      id="features" 
      ref={featuresRef}
      className="py-20 overflow-hidden"
    >
      <div className="container-section">
        <div className={cn(
          "max-w-2xl mx-auto text-center transition-all duration-700 delay-100 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="chip bg-accent text-accent-foreground mb-4">Features</div>
          <h2 className="section-heading">Find Your Perfect Stay</h2>
          <p className="section-subheading mx-auto">
            Whether you're traveling solo, with friends, or looking for a weekend escape, 
            XTSY Travellers Hostel has the perfect accommodation option for you.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Feature Selector */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              {featuresList.map((feature, index) => (
                <div
                  key={feature.id}
                  className={cn(
                    "border rounded-lg p-6 cursor-pointer transition-all duration-300",
                    activeFeature === feature.id
                      ? "border-primary bg-accent shadow-sm"
                      : "hover:border-primary/50 hover:bg-secondary",
                    isVisible 
                      ? "opacity-100 translate-x-0" 
                      : "opacity-0 -translate-x-8",
                    { "delay-150": index === 0, "delay-250": index === 1, 
                      "delay-350": index === 2, "delay-450": index === 3 }
                  )}
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div className="flex items-start">
                    <div className="mr-4 bg-primary/10 p-2 rounded-full">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Details */}
          <div className="md:col-span-3">
            {activeFeatureData && (
              <div className={cn(
                "rounded-lg overflow-hidden h-full transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}>
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={activeFeatureData.image}
                    alt={activeFeatureData.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-medium text-white mb-2">
                        {activeFeatureData.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-background border border-t-0 rounded-b-lg">
                  <p className="text-muted-foreground mb-6">
                    {activeFeatureData.details}
                  </p>
                  <Button>Book Today</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
