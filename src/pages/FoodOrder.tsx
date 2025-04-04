
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ShoppingCart, Send, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

type FoodItem = {
  id: number;
  name: string;
  price: number;
  description?: string;
};

type CartItem = FoodItem & { quantity: number };

const FOOD_ITEMS: FoodItem[] = [
  { id: 1, name: "Tea", price: 100, description: "Classic Assam tea" },
  { id: 2, name: "Coffee", price: 100, description: "Fresh ground coffee" },
  { id: 3, name: "Juice", price: 100, description: "Fresh fruit juice" },
  { id: 4, name: "Rice", price: 100, description: "Steamed white rice" },
];

const FoodOrder = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Handle scroll event to make cart sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    setIsLoaded(true);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Add to cart function
  const addToCart = (item: FoodItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 2000,
    });
  };
  
  // Remove from cart function
  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item => 
          item.id === itemId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== itemId);
      }
    });
  };
  
  // Clear cart function
  const clearCart = () => {
    setCart([]);
  };
  
  // Send WhatsApp message
  const sendWhatsAppOrder = () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to place the order.",
        variant: "destructive",
      });
      return;
    }
    
    const messageItems = cart.map(item => `${item.quantity}x ${item.name} - ₹${item.price * item.quantity}`).join("\n");
    const message = `
*New Food Order*
${messageItems}

*Total: ₹${totalPrice}*

${specialRequest ? `*Special Requests:* ${specialRequest}` : ""}

*Contact:* ${phoneNumber}
    `.trim();
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "919863627070"; // Replace with your actual WhatsApp number
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container-section">
        {/* Page Header */}
        <div className={cn(
          "mb-10 max-w-2xl transition-all duration-700",
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <Link 
            to="/" 
            className="flex items-center text-muted-foreground mb-6 hover:text-primary transition-colors"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Home
          </Link>
          <div className="chip bg-accent text-accent-foreground mb-4">Hungry?</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-tight mb-6">
            Food Order
          </h1>
          <p className="text-xl text-muted-foreground">
            Order delicious food and beverages from our kitchen. Delivered right to your room or served at our dining area.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2 order-1">
            <Card className={cn(
              "transition-all duration-700 delay-200",
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <CardHeader>
                <CardTitle>Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead className="text-right">Price (₹)</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {FOOD_ITEMS.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              {item.description && (
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{item.price}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => addToCart(item)}
                            >
                              Add
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Cart Section */}
          <div className="order-2">
            <div 
              className={cn(
                "transition-all duration-700 delay-300",
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                isSticky ? "lg:sticky lg:top-24" : ""
              )}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Your Order ({totalItems})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {cart.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">Your cart is empty</p>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">₹{item.price} x {item.quantity}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => removeFromCart(item.id)}
                            >
                              -
                            </Button>
                            <span>{item.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => addToCart(item)}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>₹{totalPrice}</span>
                        </div>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  )}

                  <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Your Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        placeholder="Enter your phone number" 
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="special-request">Special Requests</Label>
                      <Textarea 
                        id="special-request" 
                        placeholder="Any special instructions for your order?" 
                        value={specialRequest}
                        onChange={(e) => setSpecialRequest(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <Button 
                    className="w-full" 
                    disabled={cart.length === 0 || !phoneNumber}
                    onClick={sendWhatsAppOrder}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Place Order
                  </Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Need help with your order?</p>
                    <a 
                      href="tel:+919863627070" 
                      className="flex items-center justify-center text-primary hover:underline mt-1"
                    >
                      <Phone className="mr-1 h-4 w-4" />
                      +91 98636 27070
                    </a>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodOrder;
