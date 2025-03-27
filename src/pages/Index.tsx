
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Rooms from "@/components/Rooms";
import Gallery from "@/components/Gallery";
import About from "@/components/About";

const Index = () => {
  // Scroll to section if URL has hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

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
