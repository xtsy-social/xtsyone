
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
    image: "/lovable-uploads/f7ebc711-233d-4f6d-a9ed-66b740e4d678.png",
    features: ["Individual Lockers", "Reading Light", "Power Socket", "Shared Bathroom", "Common Lounge Access"],
    capacity: 1,
  },
  {
    id: "dorm-6-female",
    title: "Bed in 6 Bed Female Dormitory",
    price: 699,
    image: "/lovable-uploads/92b14139-422e-48f4-8e88-dba497cbe9bd.png",
    features: ["Female Only", "Extra Privacy", "Individual Lockers", "Reading Light", "Power Socket", "Shared Bathroom", "Common Lounge Access"],
    capacity: 1,
  },
  {
    id: "dorm-6-mixed",
    title: "Bed in 6 Bed Mixed Dormitory",
    price: 699,
    image: "/lovable-uploads/b48f359c-19f5-4b1e-b182-b660b5c5c7f9.png",
    features: ["Individual Lockers", "Reading Light", "Power Socket", "Shared Bathroom", "Common Lounge Access"],
    capacity: 1,
  },
  {
    id: "dorm-4-mixed",
    title: "Bed in 4 Bed Mixed Dormitory",
    price: 849,
    image: "/lovable-uploads/b2876113-b46c-4ba6-b33c-41973212e8d9.png",
    features: ["Enhanced Privacy", "Individual Lockers", "Reading Light", "Power Socket", "Shared Bathroom", "Common Lounge Access"],
    capacity: 1,
  },
];

const privateRooms = [
  {
    id: "king-mountain",
    title: "King Room With Mountain View",
    price: 3999,
    image: "/lovable-uploads/32c0e8aa-31d2-495f-a611-798f36da7d20.png",
    features: ["Private Room", "King Size Bed", "Private Bathroom", "Mountain View", "Work Desk", "Free Breakfast", "Room Service"],
    capacity: 2,
  },
  {
    id: "deluxe-room",
    title: "Deluxe Room with Forest View",
    price: 3499,
    image: "/lovable-uploads/8480eeae-3962-4cac-b63c-5976012e9498.png",
    features: ["Private Room", "Queen Size Bed", "Private Bathroom", "Forest View", "Sitting Area", "Free Breakfast"],
    capacity: 2,
  },
  {
    id: "premium-room",
    title: "Premium Room with Balcony",
    price: 4299,
    image: "/lovable-uploads/83fa557c-0e55-4d11-9dd8-eb3ee61c16cd.png",
    features: ["Private Room", "King Size Bed", "Private Bathroom", "Private Balcony", "Seating Area", "Free Breakfast", "Premium Amenities"],
    capacity: 2,
  },
];

// Additional dormitory images for the gallery view
const dormitoryGalleryImages = [
  "/lovable-uploads/a09c8c3c-479f-4210-a189-7be9aedbe9af.png",
  "/lovable-uploads/4cce6ca3-bd2b-4995-83b6-a6fb2d7d7333.png",
  "/lovable-uploads/6c731f4e-b040-4185-8d37-157019c9d3c4.png",
  "/lovable-uploads/bbbafc6f-aa8f-43fa-920b-3090b998c8b4.png"
];

// Additional private room images for the gallery view
const privateRoomGalleryImages = [
  "/lovable-uploads/87da245e-4046-470b-b9a2-7ff7c36d2840.png",
  "/lovable-uploads/e03af32e-26b7-4292-8260-18fe3db6a55a.png",
  "/lovable-uploads/1db53c8c-3ade-439f-99a8-6fe0aabe7cc4.png",
  "/lovable-uploads/e3b3a20c-4ef3-41d2-9b50-bb35467060e8.png"
];

const Rooms = () => {
  const [isVisible, setIsVisible] = useState(false);
  const roomsRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [openDormitory, setOpenDormitory] = useState<string | null>(null);
  const [activeGallery, setActiveGallery] = useState<string | null>(null);

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

  const toggleGallery = (type: string) => {
    setActiveGallery(prev => prev === type ? null : type);
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
              <h3 className="text-2xl font-medium mb-6 flex items-center text-destructive">
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
              
              {/* Dormitory Gallery - Mobile */}
              <div className="mt-6">
                <Collapsible 
                  open={activeGallery === 'dormitories'}
                  onOpenChange={() => toggleGallery('dormitories')}
                  className="border-2 border-destructive/30 rounded-lg overflow-hidden bg-background shadow-sm"
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between border-destructive/30" size="lg">
                      <span className="text-destructive">View Dormitory Gallery</span>
                      {activeGallery === 'dormitories' ? (
                        <ChevronUp className="h-4 w-4 ml-2 text-destructive" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-2 text-destructive" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid grid-cols-2 gap-2 p-4">
                      {dormitoryGalleryImages.map((img, index) => (
                        <img 
                          key={index}
                          src={img}
                          alt={`Dormitory image ${index + 1}`}
                          className="rounded-md w-full h-40 object-cover"
                        />
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Private Rooms Section */}
            <div>
              <h3 className="text-2xl font-medium mb-6 flex items-center text-destructive">
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
              
              {/* Private Rooms Gallery - Mobile */}
              <div className="mt-6">
                <Collapsible 
                  open={activeGallery === 'private'}
                  onOpenChange={() => toggleGallery('private')}
                  className="border-2 border-destructive/30 rounded-lg overflow-hidden bg-background shadow-sm"
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full justify-between border-destructive/30" size="lg">
                      <span className="text-destructive">View Private Room Gallery</span>
                      {activeGallery === 'private' ? (
                        <ChevronUp className="h-4 w-4 ml-2 text-destructive" />
                      ) : (
                        <ChevronDown className="h-4 w-4 ml-2 text-destructive" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="grid grid-cols-2 gap-2 p-4">
                      {privateRoomGalleryImages.map((img, index) => (
                        <img 
                          key={index}
                          src={img}
                          alt={`Private room image ${index + 1}`}
                          className="rounded-md w-full h-40 object-cover"
                        />
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <Tabs defaultValue="dormitories" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="dormitories" className="text-base text-destructive">
                  <Users className="mr-2 h-4 w-4" />
                  Dormitories
                </TabsTrigger>
                <TabsTrigger value="private" className="text-base text-destructive">
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
                            <h3 className="text-xl font-medium text-destructive">{room.title}</h3>
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
                
                {/* Desktop Dormitory Gallery */}
                <div className={cn(
                  "bg-background rounded-lg overflow-hidden border-2 border-destructive/30 shadow-sm transition-all duration-500 transform",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                  "delay-550"
                )}>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-4 text-destructive">Dormitory Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {dormitoryGalleryImages.map((img, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg h-48 md:h-64">
                          <img 
                            src={img}
                            alt={`Dormitory image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
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
                      { "delay-150": index === 0, "delay-250": index === 1, "delay-350": index === 2 }
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
                            <h3 className="text-xl font-medium text-destructive">{room.title}</h3>
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
                
                {/* Desktop Private Room Gallery */}
                <div className={cn(
                  "bg-background rounded-lg overflow-hidden border-2 border-destructive/30 shadow-sm transition-all duration-500 transform",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                  "delay-450"
                )}>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-4 text-destructive">Private Room Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {privateRoomGalleryImages.map((img, index) => (
                        <div key={index} className="relative overflow-hidden rounded-lg h-48 md:h-64">
                          <img 
                            src={img}
                            alt={`Private room image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </section>
  );
};

export default Rooms;
