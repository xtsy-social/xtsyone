
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Rooms from "@/components/Rooms";
import Gallery from "@/components/Gallery";
import About from "@/components/About";

const Index = () => {
  const location = useLocation();
  const initialRender = useRef(true);

  // Handle scroll to section when URL has hash
  useEffect(() => {
    // Set page title
    document.title = "XTSY Travellers Hostel - Limited Spots Available for Shillong's Premier Stay Experience";
    
    const hash = location.hash;
    if (hash) {
      // Remove the # character
      const sectionId = hash.substring(1);
      const element = document.getElementById(sectionId);
      
      if (element) {
        // Use setTimeout to ensure the DOM is fully loaded
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    } else if (initialRender.current) {
      // Only scroll to top on initial page load, not on every hash change
      window.scrollTo(0, 0);
      initialRender.current = false;
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Hero />
      <Testimonials />
      <Features />
      <Rooms />
      <Gallery />
      <About />
    </div>
  );
};

export default Index;
