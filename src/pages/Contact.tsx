
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { ChevronLeft, MapPin, Phone, Mail, Clock, Building, Users } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { DateRangePicker } from "@/components/DateRangePicker";

const Contact = () => {
  const [activeTab, setActiveTab] = useState<"individual" | "business">("individual");
  const [isLoaded, setIsLoaded] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    setIsLoaded(true);
  }, []);

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
          <div className="chip bg-accent text-accent-foreground mb-4">Reach Out</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground">
            Have questions or need to make special arrangements? Our team is ready 
            to help make your Shillong experience exceptional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div className={cn(
            "order-2 lg:order-1 transition-all duration-700 delay-200",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="mb-8">
              <h2 className="text-2xl font-medium mb-4">Send Us a Message</h2>
              <p className="text-muted-foreground">
                Please fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-8">
              <button
                className={cn(
                  "py-3 px-5 font-medium text-muted-foreground flex items-center",
                  activeTab === "individual" && "text-primary border-b-2 border-primary"
                )}
                onClick={() => setActiveTab("individual")}
              >
                <Users className="h-4 w-4 mr-2" />
                Individual
              </button>
              <button
                className={cn(
                  "py-3 px-5 font-medium text-muted-foreground flex items-center",
                  activeTab === "business" && "text-primary border-b-2 border-primary"
                )}
                onClick={() => setActiveTab("business")}
              >
                <Building className="h-4 w-4 mr-2" />
                B2B Tour Operators
              </button>
            </div>

            {/* Date Range Picker - Only show for individual users */}
            {activeTab === "individual" && (
              <div className="mb-8">
                <label className="block text-sm font-medium mb-1">Stay Duration</label>
                <DateRangePicker 
                  dateRange={dateRange} 
                  onDateRangeChange={setDateRange} 
                />
              </div>
            )}

            {/* Contact Form */}
            <ContactForm type={activeTab} dateRange={dateRange} />
          </div>

          {/* Contact Info Section */}
          <div className={cn(
            "order-1 lg:order-2 transition-all duration-700 delay-300",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <div className="bg-secondary p-8 rounded-lg">
              <h2 className="text-2xl font-medium mb-6">Contact Information</h2>

              <div className="space-y-6 mb-10">
                <div className="flex">
                  <MapPin className="h-5 w-5 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Address</h3>
                    <p className="text-muted-foreground">XTSY Travellers Hostel, Diengïong, Shillong, Meghalaya 793018</p>
                  </div>
                </div>

                <div className="flex">
                  <Phone className="h-5 w-5 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-muted-foreground">+91 98636 27070</p>
                  </div>
                </div>

                <div className="flex">
                  <Mail className="h-5 w-5 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-muted-foreground">xtsy.one@gmail.com</p>
                  </div>
                </div>

                <div className="flex">
                  <Clock className="h-5 w-5 text-primary mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Hours</h3>
                    <p className="text-muted-foreground">Check-in: 2:00 PM</p>
                    <p className="text-muted-foreground">Check-out: 11:00 AM</p>
                    <p className="text-muted-foreground">Reception: 24/7</p>
                  </div>
                </div>
              </div>

              <h3 className="font-medium mb-3">Find Us On Map</h3>
              <div className="h-[300px] bg-muted rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3579.2097123801086!2d91.89013407521109!3d25.582799077327244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3750591c0bd0ca95%3A0xaa4421ed5e2e3a24!2sXTSY%20Travellers%20Hostel!5e0!3m2!1sen!2sin!4v1716628577593!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
