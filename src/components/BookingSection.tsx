import { FormEvent, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Phone, Sparkles } from "lucide-react";
import {
  ApiError,
  submitBooking
} from "@/lib/api";
import type { BookingFormPayload } from "@/types/booking";

const eventTypes = [
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate Event" },
  { value: "private", label: "Private Celebration" },
  { value: "festival", label: "Festival / Pop-Up" },
  { value: "other", label: "Something Else" }
];

const budgetRanges = [
  { value: "under-2k", label: "Under $2,000" },
  { value: "2k-5k", label: "$2,000 - $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-plus", label: "$10,000+" }
];

const defaultFormState = {
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  eventType: "",
  eventDate: "",
  venueLocation: "",
  guestCount: "",
  budgetRange: "",
  message: ""
};

type FormState = typeof defaultFormState;

const BookingSection = () => {
  const [form, setForm] = useState<FormState>(defaultFormState);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const payload: BookingFormPayload = {
      clientName: form.clientName.trim(),
      clientEmail: form.clientEmail.trim()
    };

    if (form.clientPhone.trim()) {
      payload.clientPhone = form.clientPhone.trim();
    }

    if (form.eventType) {
      const selected = eventTypes.find((option) => option.value === form.eventType);
      payload.eventType = selected ? selected.label : form.eventType;
    }

    if (form.eventDate.trim()) {
      payload.eventDate = form.eventDate.trim();
    }

    if (form.venueLocation.trim()) {
      payload.venueLocation = form.venueLocation.trim();
    }

    if (form.budgetRange) {
      const budget = budgetRanges.find((option) => option.value === form.budgetRange);
      payload.budgetRange = budget ? budget.label : form.budgetRange;
    }

    if (form.guestCount) {
      const numericCount = Number(form.guestCount);
      if (!Number.isNaN(numericCount)) {
        payload.guestCount = numericCount;
      }
    }

    if (form.message.trim()) {
      payload.message = form.message.trim();
    }

    try {
      await submitBooking(payload);

      toast({
        title: "Booking request sent",
        description: "Thanks! We'll reply within 1-2 business days."
      });

      setForm(defaultFormState);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.details && typeof error.details === "object") {
          setErrors(error.details as Record<string, string[]>);
        }

        toast({
          title: "We couldn't send your booking",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again or email us directly.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderError = (field: keyof FormState | "guestCount") => {
    const fieldErrors = errors[field];
    if (!fieldErrors || fieldErrors.length === 0) {
      return null;
    }

    return (
      <p className="mt-1 text-sm text-destructive" role="alert">
        {fieldErrors[0]}
      </p>
    );
  };

  return (
    <section id="booking" className="py-20 px-6 bg-gradient-to-b from-white via-white to-mountain-cream/60">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-sm font-medium uppercase tracking-wider text-gold">
            <Sparkles className="h-4 w-4" />
            Plan Your Event
          </span>
          <h2 className="mt-6 text-4xl font-bold text-foreground md:text-5xl">
            Let's Create an Elevated Bar Experience
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Share a few event details and our team will curate a bespoke cocktail program tailored to your celebration.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card className="border border-border/60 bg-card/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-2xl">Request a Custom Proposal</CardTitle>
              <p className="text-muted-foreground">
                Fill out the form and we’ll follow up with availability, menu ideas, and a tailored quote for your event.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="clientName">Full Name *</Label>
                    <Input
                      id="clientName"
                      value={form.clientName}
                      onChange={(event) => updateField("clientName", event.target.value)}
                      placeholder="Your name"
                      required
                    />
                    {renderError("clientName")}
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Email *</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={form.clientEmail}
                      onChange={(event) => updateField("clientEmail", event.target.value)}
                      placeholder="you@example.com"
                      required
                    />
                    {renderError("clientEmail")}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="clientPhone">Phone</Label>
                    <Input
                      id="clientPhone"
                      value={form.clientPhone}
                      onChange={(event) => updateField("clientPhone", event.target.value)}
                      placeholder="Best number to reach you"
                    />
                    {renderError("clientPhone")}
                  </div>
                  <div>
                    <Label htmlFor="guestCount">Guest Count</Label>
                    <Input
                      id="guestCount"
                      type="number"
                      min={1}
                      max={5000}
                      value={form.guestCount}
                      onChange={(event) => updateField("guestCount", event.target.value)}
                      placeholder="Approximate guests"
                    />
                    {renderError("guestCount")}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label>Event Type</Label>
                    <Select
                      value={form.eventType}
                      onValueChange={(value) => updateField("eventType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        {eventTypes.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {renderError("eventType")}
                  </div>
                  <div>
                    <Label>Budget Range</Label>
                    <Select
                      value={form.budgetRange}
                      onValueChange={(value) => updateField("budgetRange", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your budget" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {renderError("budgetRange")}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={form.eventDate}
                      onChange={(event) => updateField("eventDate", event.target.value)}
                    />
                    {renderError("eventDate")}
                  </div>
                  <div>
                    <Label htmlFor="venueLocation">Venue / Location</Label>
                    <Input
                      id="venueLocation"
                      value={form.venueLocation}
                      onChange={(event) => updateField("venueLocation", event.target.value)}
                      placeholder="Where are you hosting?"
                    />
                    {renderError("venueLocation")}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Tell us about your vision</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
                    placeholder="Share the vibe, menu ideas, or any special requests"
                    rows={5}
                  />
                  {renderError("message")}
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gold text-gold-foreground hover:bg-gold/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit Booking Request"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border border-gold/30 bg-gold/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-gold">
                  <CalendarDays className="h-6 w-6" />
                  Availability & Travel
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  We serve the Bow Valley, Calgary, and the Canadian Rockies. Destination events welcome with travel accommodations.
                </p>
                <p>
                  Weekends fill fast during peak seasons. Share your dates early so we can secure your event on the calendar.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-gold" />
                  Prefer to chat?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Email us at
                  {" "}
                  <a
                    className="font-medium text-gold hover:underline"
                    href="mailto:mountainmixologyca@gmail.com"
                  >
                    mountainmixologyca@gmail.com
                  </a>
                  {" "}
                  or call / text {" "}
                  <a className="font-medium text-gold" href="tel:+14035551234">
                    (403) 555-1234
                  </a>
                  .
                </p>
                <p>
                  We aim to respond within 24 hours Monday–Friday. For urgent requests, please call or text for the fastest reply.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-border/60 bg-card/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-gold" />
                  Our mobile bars include
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <ul className="list-disc space-y-1 pl-5">
                  <li>Signature cocktail design and seasonal menu planning</li>
                  <li>Premium mobile bar, glassware, tools, and ice service</li>
                  <li>Experienced bartenders and bar support staff</li>
                  <li>Non-alcoholic craft options and zero-proof cocktails</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
