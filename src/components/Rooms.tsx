
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users, Hotel, Home, ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

const dormitories = [
  {
    id: "dorm-8",
    title: "Bed in 8 Bed Dormitory",
    price: 649,
    image: "https://images.unsplash.com/photo-1626265774643-f1a96df7710e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    features: ["Individual Lockers", "Reading Light", "Power Socket", "Shared Bathroom", "Common Lounge Access"],
    capacity: 1,
  },
  {
    id: "dorm-6-female",
    title: "Bed in 6 Bed Female Dormitory",
    price: 699,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    features: ["Female Only", "Extra Privacy", "Individual Lockers", "Reading Light", "Power Socket", "Shared Bathroom", "Common Lounge Access"],
    capacity: 1,
  },
  {
    id: "dorm-6-mixed",
    title: "Bed in 6 Bed Mixed Dormitory",
    price: 699,
    image: "https://images.unsplash.com/photo-1631049035182-249067d7618e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    features: ["Individual Lockers", "Reading Light", "Power Socket", "Shared Bathroom", "Common Lounge Access"],
    capacity: 1,
  },
  {
    id: "dorm-4-mixed",
    title: "Bed in 4 Bed Mixed Dormitory",
    price: 849,
    image: "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    features: ["Enhanced Privacy", "Individual Lockers", "Reading Light", "Power Socket", "Shared Bathroom", "Common Lounge Access"],
    capacity: 1,
  },
];

const privateRooms = [
  {
    id: "king-mountain",
    title: "King Room With Mountain View",
    price: 3999,
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    features: ["Private Room", "King Size Bed", "Private Bathroom", "Mountain View", "Work Desk", "Free Breakfast", "Room Service"],
    capacity: 2,
  },
];

const Rooms = () => {
  const [isVisible, setIsVisible] = useState(false);
  const roomsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [openDormitory, setOpenDormitory] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (roomsRef.current) {
      observer.observe(roomsRef.current);
    }

    return () => {
      if (roomsRef.current) {
        observer.unobserve(roomsRef.current);
      }
    };
  }, []);

  const toggleDormitory = (id: string) => {
    setOpenDormitory(prev => prev === id ? null : id);
  };

  return (
    <section 
      id="rooms" 
      ref={roomsRef} 
      className="py-20 bg-secondary overflow-hidden"
    >
      <div className="container-section">
        <div className={cn(
          "max-w-2xl transition-all duration-700 delay-100 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="chip bg-accent text-accent-foreground mb-4">Accommodations</div>
          <h2 className="section-heading">Our Rooms</h2>
          <p className="section-subheading">
            From budget-friendly dormitories to private rooms with mountain views, 
            we offer comfortable accommodations for every type of traveler.
          </p>
        </div>

        {isMobile ? (
          <div className="mt-8">
            {/* Dormitories Section - Mobile Optimized */}
            <div className="mb-10">
              <h3 className="text-2xl font-medium mb-6 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Dormitories
              </h3>
              <div className="space-y-4">
                {dormitories.map((room) => (
                  <Collapsible 
                    key={room.id}
                    open={openDormitory === room.id}
                    onOpenChange={() => toggleDormitory(room.id)}
                    className="border rounded-lg overflow-hidden bg-background shadow-sm"
                  >
                    <div className="flex items-center p-4">
                      <img 
                        src={room.image} 
                        alt={room.title}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{room.title}</h4>
                        <div className="flex items-center text-primary mt-1">
                          <span className="text-lg font-medium">₹{room.price}</span>
                          <span className="text-xs text-muted-foreground ml-1">/ night</span>
                        </div>
                      </div>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="icon" className="ml-2">
                          {openDormitory === room.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                    
                    <CollapsibleContent>
                      <div className="px-4 pb-4 pt-2 border-t">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {room.features.map((feature) => (
                            <span key={feature} className="text-xs px-2 py-1 bg-secondary rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <Button className="w-full group">
                          Book Now
                          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            </div>

            {/* Private Rooms Section */}
            <div>
              <h3 className="text-2xl font-medium mb-6 flex items-center">
                <Home className="mr-2 h-5 w-5" />
                Private Rooms
              </h3>
              <div className="space-y-4">
                {privateRooms.map((room) => (
                  <div 
                    key={room.id}
                    className="bg-background rounded-lg overflow-hidden border shadow-sm"
                  >
                    <img 
                      src={room.image}
                      alt={room.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-medium mb-2">{room.title}</h4>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {room.features.slice(0, 4).map((feature) => (
                          <span key={feature} className="text-xs px-2 py-1 bg-secondary rounded-full">
                            {feature}
                          </span>
                        ))}
                        {room.features.length > 4 && (
                          <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                            +{room.features.length - 4} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <span className="text-lg font-medium text-primary">₹{room.price}</span>
                          <span className="text-muted-foreground ml-1">/ night</span>
                        </div>
                        <Button className="group">
                          Book Now
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <Tabs defaultValue="dormitories" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="dormitories" className="text-base">
                  <Users className="mr-2 h-4 w-4" />
                  Dormitories
                </TabsTrigger>
                <TabsTrigger value="private" className="text-base">
                  <Home className="mr-2 h-4 w-4" />
                  Private Rooms
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="dormitories" className="space-y-6">
                {dormitories.map((room, index) => (
                  <div 
                    key={room.id}
                    className={cn(
                      "bg-background rounded-lg overflow-hidden border shadow-sm transition-all duration-500 transform",
                      isVisible 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-12",
                      { "delay-150": index === 0, "delay-250": index === 1, 
                        "delay-350": index === 2, "delay-450": index === 3 }
                    )}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="md:col-span-1 h-48 md:h-full relative overflow-hidden">
                        <img 
                          src={room.image} 
                          alt={room.title} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="md:col-span-2 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-medium">{room.title}</h3>
                            <div className="flex items-center text-muted-foreground">
                              <Users className="h-4 w-4 mr-1" />
                              <span className="text-sm">
                                Single Occupancy
                              </span>
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {room.features.map((feature) => (
                                <span key={feature} className="text-xs px-2 py-1 bg-secondary rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                          <div className="mb-4 sm:mb-0">
                            <span className="text-lg font-medium text-primary">₹{room.price}</span>
                            <span className="text-muted-foreground ml-1">/ night</span>
                          </div>
                          <Button className="w-full sm:w-auto group">
                            Book Now
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="private" className="space-y-6">
                {privateRooms.map((room, index) => (
                  <div 
                    key={room.id}
                    className={cn(
                      "bg-background rounded-lg overflow-hidden border shadow-sm transition-all duration-500 transform",
                      isVisible 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-12",
                      { "delay-150": index === 0 }
                    )}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      <div className="md:col-span-1 h-48 md:h-full relative overflow-hidden">
                        <img 
                          src={room.image} 
                          alt={room.title} 
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="md:col-span-2 p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-medium">{room.title}</h3>
                            <div className="flex items-center text-muted-foreground">
                              <Hotel className="h-4 w-4 mr-1" />
                              <span className="text-sm">
                                Fits up to {room.capacity}
                              </span>
                            </div>
                          </div>
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2 mb-4">
                              {room.features.map((feature) => (
                                <span key={feature} className="text-xs px-2 py-1 bg-secondary rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
                          <div className="mb-4 sm:mb-0">
                            <span className="text-lg font-medium text-primary">₹{room.price}</span>
                            <span className="text-muted-foreground ml-1">/ night</span>
                          </div>
                          <Button className="w-full sm:w-auto group">
                            Book Now
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rooms;
