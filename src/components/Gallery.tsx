
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const images = [
  {
    src: "/IMG20250314195521.jpg",
    alt: "XTSY Hostel Interior",
  },
  {
    src: "/IMG20250314195959.jpg",
    alt: "Hostel Common Area",
  },
  {
    src: "/DJI_20250324_105940_962.jpg",
    alt: "Aerial View of Hostel",
  },
  {
    src: "/DJI_20250324_111024_658.jpg",
    alt: "Shillong Landscape",
  },
  {
    src: "/DJI_20250324_133459_305.jpg",
    alt: "Mountain Views",
  },
  {
    src: "/DJI_20250324_133441_471.jpg",
    alt: "Scenic Shillong",
  },
  {
    src: "/DJI_20250324_133421_247.jpg",
    alt: "Nature Around Hostel",
  },
  {
    src: "/DJI_20250324_133542_463.jpg",
    alt: "Shillong Greenery",
  },
  {
    src: "/DJI_20250324_124629_217.jpg",
    alt: "Lush Landscapes",
  },
  {
    src: "/DJI_20250324_105947_415.jpg",
    alt: "Hostel Surroundings",
  },
];

const Gallery = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftScroll(scrollLeft > 0);
        setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="gallery" 
      ref={galleryRef}
      className="py-20 overflow-hidden"
    >
      <div className="container-section">
        <div className={cn(
          "max-w-2xl mx-auto text-center transition-all duration-700 delay-100 transform",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <div className="chip bg-accent text-accent-foreground mb-4">Gallery</div>
          <h2 className="section-heading">Experience XTSY Hostel</h2>
          <p className="section-subheading mx-auto">
            Browse through our gallery to get a glimpse of our hostel, the stunning surroundings,
            and the Shillong experience that awaits you.
          </p>
        </div>

        <div className="mt-12 relative">
          {/* Scroll buttons */}
          {showLeftScroll && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          {showRightScroll && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Image gallery */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-6 hideScrollbar"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="flex gap-4">
              {images.map((image, index) => (
                <div
                  key={image.src}
                  className={cn(
                    "flex-shrink-0 relative group",
                    isVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-8",
                    { "delay-150": index % 5 === 0, "delay-200": index % 5 === 1, 
                      "delay-250": index % 5 === 2, "delay-300": index % 5 === 3,
                      "delay-350": index % 5 === 4 }
                  )}
                  style={{ width: "300px", height: "200px" }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                    <button
                      onClick={() => setSelectedImage(image.src)}
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full"
                      aria-label="Zoom image"
                    >
                      <ZoomIn className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <img
              src={selectedImage}
              alt="Enlarged view"
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full"
              aria-label="Close"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .hideScrollbar::-webkit-scrollbar {
          display: none;
        }
        .hideScrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
