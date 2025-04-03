
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { IndianRupee } from "lucide-react";
import { DateRange } from "react-day-picker";
import { differenceInDays } from "date-fns";

interface ContactFormProps {
  type: "individual" | "business";
  dateRange?: DateRange | undefined;
}

// Room pricing data
const roomPrices = {
  "dorm-8": 649,
  "dorm-6-female": 699,
  "dorm-6-mixed": 699,
  "dorm-4-mixed": 849,
  "king-mountain": 3999,
  "deluxe-room": 3499,
  "premium-room": 4299,
};

const ContactForm = ({ type, dateRange }: ContactFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    company: "",
    groupSize: "",
    roomType: "dorm-8", // Default room type
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total amount when dateRange or roomType changes
  useEffect(() => {
    if (type === "individual" && dateRange?.from && dateRange?.to) {
      const days = differenceInDays(dateRange.to, dateRange.from) + 1; // Include both start and end days
      const pricePerNight = roomPrices[formData.roomType as keyof typeof roomPrices] || 0;
      setTotalAmount(days * pricePerNight);
    } else {
      setTotalAmount(0);
    }
  }, [dateRange, formData.roomType, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        company: "",
        groupSize: "",
        roomType: "dorm-8",
      });
    }, 1500);
  };

  // Calculate number of days selected
  const numberOfDays = dateRange?.from && dateRange?.to 
    ? differenceInDays(dateRange.to, dateRange.from) + 1 
    : 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Your phone number"
        />
      </div>

      {type === "business" && (
        <>
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-1">
              Company/Organization
            </label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Your company or organization"
              required
            />
          </div>
          <div>
            <label htmlFor="groupSize" className="block text-sm font-medium mb-1">
              Typical Group Size
            </label>
            <Input
              id="groupSize"
              name="groupSize"
              value={formData.groupSize}
              onChange={handleChange}
              placeholder="e.g., 10-20 people"
            />
          </div>
        </>
      )}

      {/* Room Type Selection - Only show for individual users */}
      {type === "individual" && (
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium mb-1">
            Preferred Accommodation
          </label>
          <select
            id="roomType"
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full rounded-md border border-input px-3 py-2 bg-background text-sm"
            required
          >
            <optgroup label="Dormitories">
              <option value="dorm-8">Bed in 8 Bed Dormitory (₹649/night)</option>
              <option value="dorm-6-female">Bed in 6 Bed Female Dormitory (₹699/night)</option>
              <option value="dorm-6-mixed">Bed in 6 Bed Mixed Dormitory (₹699/night)</option>
              <option value="dorm-4-mixed">Bed in 4 Bed Mixed Dormitory (₹849/night)</option>
            </optgroup>
            <optgroup label="Private Rooms">
              <option value="king-mountain">King Room With Mountain View (₹3,999/night)</option>
              <option value="deluxe-room">Deluxe Room with Forest View (₹3,499/night)</option>
              <option value="premium-room">Premium Room with Balcony (₹4,299/night)</option>
            </optgroup>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you?"
          rows={5}
          required
        />
      </div>

      {/* Total Cost Section - Only show for individual users */}
      {type === "individual" && dateRange?.from && dateRange?.to && (
        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Stay Cost Estimate</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Room Type:</span>
              <span className="font-medium">
                {formData.roomType.includes("dorm") ? "Dormitory" : "Private Room"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Price per night:</span>
              <span className="font-medium flex items-center">
                <IndianRupee className="h-3 w-3 mr-1" />
                {roomPrices[formData.roomType as keyof typeof roomPrices].toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Number of nights:</span>
              <span className="font-medium">{numberOfDays}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between text-base">
              <span className="font-medium">Total Amount:</span>
              <span className="font-semibold text-primary flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                {totalAmount.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
