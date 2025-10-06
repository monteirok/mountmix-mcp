export type BookingStatus =
  | "new"
  | "in_review"
  | "proposal_sent"
  | "confirmed"
  | "completed"
  | "declined";

export interface Booking {
  id: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string | null;
  eventType: string | null;
  eventDate: string | null;
  guestCount: number | null;
  venueLocation: string | null;
  budgetRange: string | null;
  message: string | null;
  status: BookingStatus;
  internalNotes: string | null;
  responseMessage: string | null;
  respondedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookingFormPayload {
  clientName: string;
  clientEmail: string;
  clientPhone?: string | null;
  eventType?: string | null;
  eventDate?: string | null;
  guestCount?: number | null;
  venueLocation?: string | null;
  budgetRange?: string | null;
  message?: string | null;
}

export interface AdminSummary {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface BookingFilters {
  status?: BookingStatus;
  search?: string;
}

export interface BookingUpdatePayload {
  status?: BookingStatus;
  internalNotes?: string | null;
  responseMessage?: string | null;
  markResponded?: boolean;
}
