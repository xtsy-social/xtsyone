
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Anisha Ray",
    location: "Delhi",
    text: "The hostel's location is perfect for exploring Shillong. Staff was incredibly friendly and helped me plan my treks. Made some great friends during my stay!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    name: "Rahul Khanna",
    location: "Mumbai",
    text: "As a solo traveler, safety was my top concern. XTSY Hostel exceeded my expectations with their secure environment and warm community feel. The nature hikes were breathtaking!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Bangalore",
    text: "Our group booking for 15 people was handled flawlessly. The cafe food was delicious and the team games organized by the staff were the highlight of our trip!",
    rating: 4,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => {
      if (testimonialsRef.current) {
        observer.unobserve(testimonialsRef.current);
      }
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < rating ? "text-primary fill-primary" : "text-muted-foreground"
        )}
      />
    ));
  };

  return (
    <section 
      id="testimonials" 
      ref={testimonialsRef}
      className="py-20 overflow-hidden bg-secondary"
    >
      <div className="container-section">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className={cn(
            "max-w-2xl transition-all duration-700 delay-100 transform",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="chip bg-accent text-accent-foreground mb-4">Testimonials</div>
            <h2 className="section-heading">Hear About Us</h2>
            <p className="section-subheading">
              Discover what our guests have to say about their experience at XTSY Travellers Hostel. 
              From solo travelers to group bookings, we've created memorable stays for all.
            </p>
          </div>
          <Button 
            variant="outline" 
            className={cn(
              "mt-4 md:mt-0 group transition-all duration-700 delay-300", 
              isVisible ? "opacity-100" : "opacity-0"
            )}
          >
            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <div className="mt-10 relative">
          <div className="absolute -top-6 left-6 text-primary opacity-20">
            <Quote className="h-24 w-24" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={cn(
                  "bg-background rounded-lg p-6 shadow-sm relative z-10 card-hover transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                  { "delay-150": index === 0, "delay-300": index === 1, "delay-450": index === 2 }
                )}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex mb-4">{renderStars(testimonial.rating)}</div>
                <p className="text-muted-foreground">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
