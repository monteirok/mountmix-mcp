import express from "express";
import { z } from "zod";
import { createBooking } from "../db.js";

const router = express.Router();

const emptyToNull = (value) => {
  if (value === undefined || value === null) {
    return null;
  }

  const trimmed = typeof value === "string" ? value.trim() : value;
  return trimmed === "" ? null : trimmed;
};

const bookingSchema = z.object({
  clientName: z
    .string({ required_error: "Client name is required" })
    .trim()
    .min(2, "Please provide your name")
    .max(120, "Name must be under 120 characters"),
  clientEmail: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please provide a valid email address")
    .toLowerCase(),
  clientPhone: z
    .string()
    .max(32, "Phone number looks too long")
    .optional()
    .transform(emptyToNull),
  eventType: z
    .string()
    .max(120, "Please keep event type under 120 characters")
    .optional()
    .transform(emptyToNull),
  eventDate: z
    .string()
    .max(40, "Event date looks too long")
    .optional()
    .transform(emptyToNull),
  venueLocation: z
    .string()
    .max(160, "Venue location looks too long")
    .optional()
    .transform(emptyToNull),
  budgetRange: z
    .string()
    .max(100, "Budget range looks too long")
    .optional()
    .transform(emptyToNull),
  guestCount: z
    .union([z.number(), z.string()])
    .optional()
    .transform((value, ctx) => {
      if (value === undefined || value === null || value === "") {
        return null;
      }

      const numeric = Number(value);

      if (!Number.isInteger(numeric) || numeric <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please provide a valid guest count"
        });
        return z.NEVER;
      }

      if (numeric > 5000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Guest count exceeds supported capacity"
        });
        return z.NEVER;
      }

      return numeric;
    }),
  message: z
    .string()
    .max(2000, "Message exceeds 2000 characters")
    .optional()
    .transform(emptyToNull)
});

router.post("/", (req, res) => {
  const parsed = bookingSchema.safeParse(req.body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return res.status(400).json({
      message: "Unable to submit booking at this time",
      errors: fieldErrors
    });
  }

  try {
    const bookingRecord = createBooking({
      client_name: parsed.data.clientName,
      client_email: parsed.data.clientEmail,
      client_phone: parsed.data.clientPhone,
      event_type: parsed.data.eventType,
      event_date: parsed.data.eventDate,
      guest_count: parsed.data.guestCount ?? null,
      venue_location: parsed.data.venueLocation,
      budget_range: parsed.data.budgetRange,
      message: parsed.data.message
    });

    return res.status(201).json({
      message: "Booking request received. We'll be in touch soon!",
      booking: bookingRecord
    });
  } catch (error) {
    console.error("[bookings] Failed to persist booking", error);
    return res
      .status(500)
      .json({ message: "Unexpected error while saving booking" });
  }
});

export default router;
