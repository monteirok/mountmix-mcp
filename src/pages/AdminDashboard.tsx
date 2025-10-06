import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  ApiError,
  fetchBookings,
  updateBookingRequest
} from "@/lib/api";
import type {
  Booking,
  BookingStatus,
  BookingUpdatePayload
} from "@/types/booking";
import { format } from "date-fns";
import {
  CalendarClock,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  UserRound
} from "lucide-react";
import { cn } from "@/lib/utils";

const statusOptions: Array<{ value: BookingStatus; label: string }> = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In Review" },
  { value: "proposal_sent", label: "Proposal Sent" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "declined", label: "Declined" }
];

const statusLabelMap = statusOptions.reduce<Record<string, string>>((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {});

const statusBadgeClasses: Record<BookingStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  in_review: "bg-amber-100 text-amber-800",
  proposal_sent: "bg-indigo-100 text-indigo-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  completed: "bg-slate-200 text-slate-900",
  declined: "bg-rose-100 text-rose-800"
};

const toDate = (value?: string | null) => {
  if (!value) {
    return null;
  }

  const isoLike = value.includes("T") ? value : value.replace(" ", "T");
  const parsed = new Date(isoLike);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return parsed;
};

interface BookingEditorProps {
  booking: Booking;
  onUpdate: (bookingId: number, updates: BookingUpdatePayload) => Promise<void>;
  isUpdating: boolean;
}

const BookingEditor = ({ booking, onUpdate, isUpdating }: BookingEditorProps) => {
  const [status, setStatus] = useState<BookingStatus>(booking.status);
  const [internalNotes, setInternalNotes] = useState<string>(
    booking.internalNotes ?? ""
  );
  const [responseMessage, setResponseMessage] = useState<string>(
    booking.responseMessage ?? ""
  );

  useEffect(() => {
    setStatus(booking.status);
    setInternalNotes(booking.internalNotes ?? "");
    setResponseMessage(booking.responseMessage ?? "");
  }, [booking]);

  const trimmedNotes = internalNotes.trim();
  const trimmedResponse = responseMessage.trim();
  const hasStatusChange = status !== booking.status;
  const hasNotesChange = trimmedNotes !== (booking.internalNotes ?? "");
  const hasResponseChange = trimmedResponse !== (booking.responseMessage ?? "");
  const hasChanges = hasStatusChange || hasNotesChange || hasResponseChange;

  const handleSave = async () => {
    if (!hasChanges) {
      toast({
        title: "No changes detected",
        description: "Update a field before saving."
      });
      return;
    }

    const updates: BookingUpdatePayload = {};

    if (hasStatusChange) {
      updates.status = status;
    }

    if (hasNotesChange) {
      updates.internalNotes = trimmedNotes || null;
    }

    if (hasResponseChange) {
      updates.responseMessage = trimmedResponse || null;
      if (updates.responseMessage && !booking.respondedAt) {
        updates.markResponded = true;
      }
    }

    await onUpdate(booking.id, updates);
  };

  const eventDate = booking.eventDate ? toDate(booking.eventDate) : null;
  const createdAt = toDate(booking.createdAt);
  const respondedAt = toDate(booking.respondedAt);

  return (
    <Card className="border border-border/60 bg-card/90">
      <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserRound className="h-5 w-5 text-gold" />
            {booking.clientName}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {booking.clientEmail}
            </span>
            {booking.clientPhone ? (
              <span className="flex items-center gap-1">
                <PhoneLink phone={booking.clientPhone} />
              </span>
            ) : null}
            {booking.venueLocation ? (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {booking.venueLocation}
              </span>
            ) : null}
          </div>
        </div>
        <Badge
          className={cn(
            "px-3 py-1 text-xs font-medium",
            statusBadgeClasses[booking.status]
          )}
        >
          {statusLabelMap[booking.status]}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <InfoStack label="Event Type" value={booking.eventType || "—"} />
          <InfoStack
            label="Event Date"
            value={eventDate ? format(eventDate, "PP") : booking.eventDate || "—"}
          />
          <InfoStack
            label="Guests"
            value={booking.guestCount ? booking.guestCount.toString() : "—"}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Client Notes</Label>
          <p className="rounded-md border border-dashed border-border/60 bg-muted/40 p-4 text-sm text-muted-foreground">
            {booking.message || "No additional details provided."}
          </p>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor={`status-${booking.id}`}>Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as BookingStatus)}
            >
              <SelectTrigger id={`status-${booking.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`internal-notes-${booking.id}`}>Internal Notes</Label>
            <Textarea
              id={`internal-notes-${booking.id}`}
              rows={5}
              value={internalNotes}
              onChange={(event) => setInternalNotes(event.target.value)}
              placeholder="Staff-only notes, preferences, logistics"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`response-${booking.id}`}>Response to Client</Label>
          <Textarea
            id={`response-${booking.id}`}
            rows={5}
            value={responseMessage}
            onChange={(event) => setResponseMessage(event.target.value)}
            placeholder="Draft your email or message to the client"
          />
        </div>

        <div className="flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            <Timestamp label="Received" value={createdAt} fallback={booking.createdAt} />
            <Timestamp label="Responded" value={respondedAt} fallback={booking.respondedAt} />
          </div>
          <Button
            onClick={handleSave}
            disabled={isUpdating || !hasChanges}
            className="self-end bg-gold text-gold-foreground hover:bg-gold/90"
          >
            {isUpdating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Updating...
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoStack = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-lg border border-border/60 bg-muted/40 p-4">
    <p className="text-xs uppercase tracking-wide text-muted-foreground">
      {label}
    </p>
    <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
  </div>
);

const Timestamp = ({
  label,
  value,
  fallback
}: {
  label: string;
  value: Date | null;
  fallback: string | null;
}) => (
  <span className="flex items-center gap-1">
    <CalendarClock className="h-4 w-4" />
    {label}:
    <strong>
      {value ? format(value, "PPp") : fallback ? fallback : "—"}
    </strong>
  </span>
);

const PhoneLink = ({ phone }: { phone: string }) => (
  <>
    <Phone className="h-4 w-4" />
    <a className="font-medium text-foreground underline-offset-2 hover:underline" href={`tel:${phone}`}>
      {phone}
    </a>
  </>
);

const createDefaultFilters = () => ({ status: "all" as BookingStatus | "all", search: "" });

const AdminDashboard = () => {
  const { auth, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState(createDefaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(createDefaultFilters);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [lastFetchedAt, setLastFetchedAt] = useState<Date | null>(null);

  const appliedStatus = appliedFilters.status;
  const appliedSearch = appliedFilters.search;

  useEffect(() => {
    if (!auth) {
      navigate("/admin/login", { replace: true });
    }
  }, [auth, navigate]);

  const handleAuthError = useCallback(() => {
    toast({
      title: "Session expired",
      description: "Please sign in again",
      variant: "destructive"
    });
    logout();
    navigate("/admin/login", { replace: true });
  }, [logout, navigate]);

  const loadBookings = useCallback(async () => {
    if (!auth) {
      return;
    }
    setIsLoading(true);
    try {
      const result = await fetchBookings(auth.token, {
        status: appliedStatus === "all" ? undefined : appliedStatus,
        search: appliedSearch.trim() ? appliedSearch.trim() : undefined
      });
      setBookings(result.bookings);
      setLastFetchedAt(new Date());
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.status === 401) {
          handleAuthError();
          return;
        }
        toast({
          title: "Unable to load bookings",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Unexpected error",
          description: "Refresh the page or try again shortly",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [appliedSearch, appliedStatus, auth, handleAuthError]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const handleUpdate = useCallback(
    async (bookingId: number, updates: BookingUpdatePayload) => {
      if (!auth) {
        handleAuthError();
        return;
      }

      setUpdatingId(bookingId);
      try {
        const result = await updateBookingRequest(auth.token, bookingId, updates);
        setBookings((current) =>
          current.map((item) => (item.id === bookingId ? result.booking : item))
        );
        toast({
          title: "Booking updated",
          description: "Changes saved successfully"
        });
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            handleAuthError();
            return;
          }
          toast({
            title: "Update failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Unexpected error",
            description: "Unable to update booking",
            variant: "destructive"
          });
        }
      } finally {
        setUpdatingId(null);
      }
    },
    [auth, handleAuthError]
  );

  const statusSummary = useMemo(() => {
    const totals: Record<BookingStatus, number> = {
      new: 0,
      in_review: 0,
      proposal_sent: 0,
      confirmed: 0,
      completed: 0,
      declined: 0
    };

    bookings.forEach((booking) => {
      totals[booking.status] += 1;
    });

    return totals;
  }, [bookings]);

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const filteredBookings = useMemo(() => bookings, [bookings]);

  return (
    <div className="min-h-screen bg-muted/40">
      <header className="border-b border-border/60 bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Booking Requests
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage inquiries, respond to clients, and keep your pipeline organized.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {auth ? (
              <div className="text-right text-sm">
                <p className="font-medium text-foreground">{auth.admin.name}</p>
                <p className="text-muted-foreground">{auth.admin.email}</p>
              </div>
            ) : null}
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8 space-y-8">
        <Card className="border border-border/60">
          <CardContent className="flex flex-col gap-4 py-6 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-1 flex-col gap-4 md:flex-row">
              <div className="flex flex-col gap-2 md:w-64">
                <Label>Status</Label>
                <Select
                  value={filters.status}
                  onValueChange={(value) =>
                    setFilters((current) => ({
                      ...current,
                      status: value as BookingStatus | "all"
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2 md:flex-1">
                <Label htmlFor="admin-search">Search</Label>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="admin-search"
                    value={filters.search}
                    onChange={(event) =>
                      setFilters((current) => ({
                        ...current,
                        search: event.target.value
                      }))
                    }
                    placeholder="Search by name, email, or location"
                    className="pl-9"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={loadBookings} disabled={isLoading}>
                <RefreshCw className={cn("mr-2 h-4 w-4", isLoading && "animate-spin")} />
                Refresh
              </Button>
              <Button
                className="bg-gold text-gold-foreground hover:bg-gold/90"
                onClick={() => setAppliedFilters({ ...filters })}
                disabled={isLoading}
              >
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {statusOptions.map((option) => (
            <Card key={option.value} className="border border-border/60 bg-background/80">
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm text-muted-foreground">{option.label}</p>
                  <p className="text-2xl font-semibold text-foreground">
                    {statusSummary[option.value]}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-foreground">
              {isLoading ? "Loading bookings..." : `${filteredBookings.length} bookings`}
            </h2>
            {lastFetchedAt ? (
              <p className="text-xs text-muted-foreground">
                Updated {format(lastFetchedAt, "PPpp")}
              </p>
            ) : null}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-gold" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <Card className="border border-border/60">
              <CardContent className="py-16 text-center text-muted-foreground">
                No bookings match your current filters.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <BookingEditor
                  key={booking.id}
                  booking={booking}
                  onUpdate={handleUpdate}
                  isUpdating={updatingId === booking.id}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
