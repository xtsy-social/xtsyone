
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Hiking Trails Around Shillong",
    excerpt: "Discover the breathtaking trails that showcase Meghalaya's natural beauty, from rolling hills to hidden waterfalls.",
    date: "April 15, 2025",
    author: "Priya Mehta",
    category: "Travel Guide",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "The Living Root Bridges of Meghalaya",
    excerpt: "Learn about these natural wonders unique to Meghalaya and how they've stood the test of time.",
    date: "March 28, 2025",
    author: "Ravi Kumar",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1637159173724-349780643fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    featured: false,
  },
  {
    id: 3,
    title: "Shillong's Music Scene: A Complete Guide",
    excerpt: "Explore the vibrant music culture that has earned Shillong the title of 'Rock Capital of India'.",
    date: "March 12, 2025",
    author: "David Chen",
    category: "Entertainment",
    image: "https://images.unsplash.com/photo-1501612780327-45045538702b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: false,
  },
  {
    id: 4,
    title: "XTSY Hostel Featured in 'Best of Northeast' Magazine",
    excerpt: "Our hostel was recognized for its unique blend of modern amenities and local cultural experiences.",
    date: "February 20, 2025",
    author: "Editorial Team",
    category: "Press",
    image: "https://images.unsplash.com/photo-1576153192621-7a3be10b356e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    featured: true,
  },
  {
    id: 5,
    title: "Local Cuisine: Must-Try Dishes in Shillong",
    excerpt: "From Jadoh to Dohneiiong, these traditional Khasi dishes will delight your taste buds.",
    date: "February 15, 2025",
    author: "Sarah Johnson",
    category: "Food",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1013&q=80",
    featured: false,
  },
  {
    id: 6,
    title: "Sustainable Tourism Initiatives in Meghalaya",
    excerpt: "Learn how local communities and businesses are working to preserve Meghalaya's pristine environment.",
    date: "January 30, 2025",
    author: "Amit Desai",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1449452198679-05c7fd30f416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    featured: false,
  },
];

const pressFeatures = [
  {
    id: 1,
    title: "XTSY Hostel Named 'Best Budget Stay' by Travel + Leisure",
    publication: "Travel + Leisure",
    date: "March 2025",
    excerpt: "The publication praised our hostel for offering premium experiences at affordable prices.",
  },
  {
    id: 2,
    title: "Featured in 'Top Hostels of Northeast India' by Lonely Planet",
    publication: "Lonely Planet",
    date: "January 2025",
    excerpt: "Our unique approach to combining local experiences with comfortable stays earned us a spot in this prestigious list.",
  },
  {
    id: 3,
    title: "Conde Nast Traveler Recommends XTSY for Solo Female Travelers",
    publication: "Conde Nast Traveler",
    date: "December 2024",
    excerpt: "Our security measures and female-only dorm options were highlighted as exemplary in the industry.",
  },
];

const Blog = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-section">
        {/* Page Header */}
        <div className={cn(
          "mb-16 max-w-2xl transition-all duration-700",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Link 
            to="/" 
            className="flex items-center text-muted-foreground mb-6 hover:text-primary transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          <div className="chip bg-accent text-accent-foreground mb-4">Explore</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-6">
            Blog & Travel Articles
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover travel guides, local insights, and news about XTSY Travellers Hostel 
            and the beautiful region of Meghalaya.
          </p>
        </div>

        {/* Featured Posts */}
        <div className={cn(
          "mb-16 transition-all duration-700 delay-200",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-2xl font-medium mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <div key={post.id} className="bg-background rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs font-medium text-primary mb-2">{post.category}</div>
                  <h3 className="text-xl font-medium mb-3">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regular Posts */}
        <div className={cn(
          "mb-16 transition-all duration-700 delay-300",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-2xl font-medium mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={cn(
                  "bg-background rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all duration-300 transform",
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  { "delay-400": index === 0, "delay-500": index === 1, "delay-600": index === 2 }
                )}
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="text-xs font-medium text-primary mb-2">{post.category}</div>
                  <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Press Mentions */}
        <div className={cn(
          "transition-all duration-700 delay-400",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <h2 className="text-2xl font-medium mb-8">Press & Media Mentions</h2>
          <div className="bg-secondary rounded-lg p-8">
            <div className="space-y-6">
              {pressFeatures.map((item, index) => (
                <div 
                  key={item.id}
                  className={cn(
                    "border-b border-border/50 last:border-b-0 pb-6 last:pb-0 transition-all duration-500",
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                    { "delay-500": index === 0, "delay-600": index === 1, "delay-700": index === 2 }
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium mb-2">{item.title}</h3>
                      <p className="text-muted-foreground mb-3">{item.excerpt}</p>
                      <div className="text-sm flex items-center">
                        <span className="font-medium text-primary">{item.publication}</span>
                        <span className="mx-2">•</span>
                        <span className="text-muted-foreground">{item.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" className="mt-4 md:mt-0 group self-start">
                      Read Article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
