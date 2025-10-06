import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Mail, Clock, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ContactInfo = () => (
  <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl liquid-reflection">
    <CardHeader>
      <CardTitle className="text-xl text-foreground flex items-center gap-2">
        <Mail className="w-5 h-5 text-gold" />
        Get In Touch
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
        <div>
          <p className="font-medium text-foreground">Service Area</p>
          <p className="text-foreground/70 text-sm">
            Canmore, Banff, Calgary<br />
            & surrounding Rocky Mountain region
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Mail className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
        <div>
          <p className="font-medium text-foreground">Email</p>
          <p className="text-foreground/70 text-sm">
            mountainmixologyca@gmail.com
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <Clock className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
        <div>
          <p className="font-medium text-foreground">Response Time</p>
          <p className="text-foreground/70 text-sm">
            Within 24 hours<br />
            Same day for urgent requests
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const WhyChooseUs = () => (
  <Card className="bg-gradient-to-br from-emerald-600/20 to-green-500/20 backdrop-blur-sm border border-emerald-500/30 rounded-3xl liquid-reflection">
    <CardHeader>
      <CardTitle className="text-xl text-foreground">
        Why Choose Mountain Mixology?
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        {[
          "Licensed & Insured Professional Service",
          "Locally Sourced Premium Ingredients", 
          "Custom Menu Design & Consultation",
          "Professional Equipment & Setup",
          "Flexible Packages for Any Budget"
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span className="text-sm text-foreground">{item}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    preferredDate: "",
    budgetRange: "",
    venue: "",
    vision: "",
    wantsUpdates: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone || null,
            event_type: formData.eventType,
            guest_count: formData.guestCount,
            preferred_date: formData.preferredDate || null,
            budget_range: formData.budgetRange || null,
            venue: formData.venue || null,
            vision: formData.vision,
            wants_updates: formData.wantsUpdates
          }
        ]);

      if (error) {
        console.error('Error submitting inquiry:', error);
        toast({
          title: "Error",
          description: "Failed to submit your inquiry. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success!",
          description: "Your inquiry has been submitted. We'll get back to you within 24 hours.",
        });
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          eventType: "",
          guestCount: "",
          preferredDate: "",
          budgetRange: "",
          venue: "",
          vision: "",
          wantsUpdates: false
        });
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast({
        title: "Error",
        description: "Failed to submit your inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Book Your Event
          </h2>
          <p className="text-xl text-mountain-muted max-w-3xl mx-auto">
            Ready to elevate your celebration? Let's discuss your vision and create an 
            unforgettable cocktail experience in the Canadian Rockies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl hover:scale-105 transition-all duration-500 liquid-reflection">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">
                  Get Your Custom Quote
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">First Name *</Label>
                       <Input 
                         id="firstName" 
                         value={formData.firstName}
                         onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                         className="bg-background/50 border-border/50 text-foreground rounded-xl"
                         placeholder="Enter your first name"
                         required
                       />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">Last Name *</Label>
                       <Input 
                         id="lastName" 
                         value={formData.lastName}
                         onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                         className="bg-background/50 border-border/50 text-foreground rounded-xl"
                         placeholder="Enter your last name"
                         required
                       />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">Email Address *</Label>
                     <Input 
                       id="email" 
                       type="email"
                       value={formData.email}
                       onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                       className="bg-background/50 border-border/50 text-foreground rounded-xl"
                       placeholder="your.email@example.com"
                       required
                     />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                     <Input 
                       id="phone" 
                       type="tel"
                       value={formData.phone}
                       onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                       className="bg-background/50 border-border/50 text-foreground rounded-xl"
                       placeholder="(403) 555-1234"
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventType" className="text-foreground">Event Type *</Label>
                       <Select value={formData.eventType} onValueChange={(value) => setFormData(prev => ({ ...prev, eventType: value }))}>
                         <SelectTrigger className="bg-background/50 border-border/50 text-foreground rounded-xl">
                           <SelectValue placeholder="Select Event Type" />
                         </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding Reception</SelectItem>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="private">Private Party</SelectItem>
                          <SelectItem value="destination">Destination Event</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests" className="text-foreground">Expected Guests *</Label>
                       <Select value={formData.guestCount} onValueChange={(value) => setFormData(prev => ({ ...prev, guestCount: value }))}>
                         <SelectTrigger className="bg-background/50 border-border/50 text-foreground rounded-xl">
                           <SelectValue placeholder="Select Guest Count" />
                         </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10-25">10-25 guests</SelectItem>
                          <SelectItem value="25-50">25-50 guests</SelectItem>
                          <SelectItem value="50-100">50-100 guests</SelectItem>
                          <SelectItem value="100-200">100-200 guests</SelectItem>
                          <SelectItem value="200+">200+ guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-foreground">Preferred Date</Label>
                       <Input 
                         id="date" 
                         type="date"
                         value={formData.preferredDate}
                         onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                         className="bg-background/50 border-border/50 text-foreground rounded-xl"
                       />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget" className="text-foreground">Estimated Budget</Label>
                       <Select value={formData.budgetRange} onValueChange={(value) => setFormData(prev => ({ ...prev, budgetRange: value }))}>
                         <SelectTrigger className="bg-background/50 border-border/50 text-foreground rounded-xl">
                           <SelectValue placeholder="Select Budget Range" />
                         </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-1000">Under $1,000</SelectItem>
                          <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                          <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                          <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10000+">$10,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="venue" className="text-foreground">Event Location/Venue</Label>
                     <Input 
                       id="venue" 
                       value={formData.venue}
                       onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                       className="bg-background/50 border-border/50 text-foreground rounded-xl"
                       placeholder="e.g., Canmore, Banff, Calgary"
                     />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vision" className="text-foreground">Tell us about your vision *</Label>
                     <Textarea 
                       id="vision"
                       value={formData.vision}
                       onChange={(e) => setFormData(prev => ({ ...prev, vision: e.target.value }))}
                       className="bg-background/50 border-border/50 text-foreground min-h-[120px] rounded-xl"
                       placeholder="Describe your event, any special requests, or questions you have..."
                       required
                     />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="updates" 
                      checked={formData.wantsUpdates}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, wantsUpdates: checked as boolean }))}
                    />
                     <Label 
                       htmlFor="updates" 
                       className="text-sm text-foreground/70 leading-relaxed"
                     >
                       I'd like to receive updates about Mountain Mixology events and cocktail tips
                     </Label>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gold text-gold-foreground hover:bg-gold/90 shadow-glow text-lg py-6 hover-scale transition-all duration-300"
                  >
                    {isSubmitting ? "Submitting..." : "Get My Custom Quote"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <ContactInfo />
            <WhyChooseUs />
            
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl liquid-reflection text-center p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Follow Our Journey
              </h3>
              <p className="text-foreground/70 text-sm mb-4">
                See our latest cocktail creations and events
              </p>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-gold-foreground hover-scale transition-all duration-300">
                @mountainmixology
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;