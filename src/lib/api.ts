import type {
  AdminSummary,
  Booking,
  BookingFilters,
  BookingFormPayload,
  BookingUpdatePayload
} from "@/types/booking";

const DEFAULT_API_BASE = "http://localhost:4000/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE;

class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

interface RequestOptions extends RequestInit {
  token?: string;
}

const buildHeaders = (options: RequestOptions) => {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (options.token) {
    headers.set("Authorization", `Bearer ${options.token}`);
  }
  return headers;
};

const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options)
  });

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  const payload = isJson ? await response.json().catch(() => undefined) : undefined;

  if (!response.ok) {
    throw new ApiError(
      payload?.message || "Request failed",
      response.status,
      payload?.errors ?? payload
    );
  }

  return payload as T;
};

export const submitBooking = async (
  payload: BookingFormPayload
): Promise<Booking> => {
  const response = await request<{ booking: Booking }>("/bookings", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return response.booking;
};

export const adminLogin = async (
  email: string,
  password: string
): Promise<{ token: string; admin: AdminSummary }> => {
  return request("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
};

export const fetchAdminProfile = async (
  token: string
): Promise<{ admin: AdminSummary }> => {
  return request("/admin/me", { token });
};

export const fetchBookings = async (
  token: string,
  filters: BookingFilters = {}
): Promise<{ bookings: Booking[] }> => {
  const params = new URLSearchParams();
  if (filters.status) {
    params.append("status", filters.status);
  }
  if (filters.search) {
    params.append("search", filters.search);
  }

  const query = params.toString();
  const path = `/admin/bookings${query ? `?${query}` : ""}`;

  return request(path, { token });
};

export const updateBookingRequest = async (
  token: string,
  id: number,
  payload: BookingUpdatePayload
): Promise<{ booking: Booking }> => {
  return request(`/admin/bookings/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    token
  });
};

export { ApiError };
