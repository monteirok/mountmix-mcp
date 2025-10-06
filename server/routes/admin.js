import express from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import {
  ensureDefaultAdmin,
  findAdminByEmail,
  getBookingById,
  listBookings,
  updateBooking
} from "../db.js";
import { authenticateAdmin, createAdminToken } from "../middleware/auth.js";

const router = express.Router();

const BOOKING_STATUSES = [
  "new",
  "in_review",
  "proposal_sent",
  "confirmed",
  "completed",
  "declined"
];

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email("Please provide a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
});

const updateSchema = z.object({
  status: z.enum(BOOKING_STATUSES).optional(),
  internalNotes: z
    .string()
    .max(2000, "Please keep internal notes below 2000 characters")
    .optional(),
  responseMessage: z
    .string()
    .max(2000, "Response message is too long (2000 character limit)")
    .optional(),
  markResponded: z.boolean().optional()
});

router.post("/login", (req, res) => {
  ensureDefaultAdmin();

  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Unable to log in",
      errors: parsed.error.flatten().fieldErrors
    });
  }

  const adminRecord = findAdminByEmail(parsed.data.email);

  if (!adminRecord) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const passwordMatches = bcrypt.compareSync(
    parsed.data.password,
    adminRecord.password_hash
  );

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = createAdminToken(adminRecord);

  return res.json({
    token,
    admin: {
      id: adminRecord.id,
      name: adminRecord.name,
      email: adminRecord.email,
      createdAt: adminRecord.created_at
    }
  });
});

router.get("/me", authenticateAdmin, (req, res) => {
  return res.json({ admin: req.admin });
});

router.get("/bookings", authenticateAdmin, (req, res) => {
  const { status, search } = req.query;

  if (status && !BOOKING_STATUSES.includes(status)) {
    return res.status(400).json({ message: "Invalid booking status filter" });
  }

  const bookings = listBookings({
    status: status || undefined,
    search: search || undefined
  });

  return res.json({ bookings });
});

router.get("/bookings/:id", authenticateAdmin, (req, res) => {
  const bookingId = Number(req.params.id);

  if (!Number.isInteger(bookingId)) {
    return res.status(400).json({ message: "Invalid booking id" });
  }

  const booking = getBookingById(bookingId);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  return res.json({ booking });
});

router.patch("/bookings/:id", authenticateAdmin, (req, res) => {
  const bookingId = Number(req.params.id);

  if (!Number.isInteger(bookingId)) {
    return res.status(400).json({ message: "Invalid booking id" });
  }

  const parsed = updateSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Unable to update booking",
      errors: parsed.error.flatten().fieldErrors
    });
  }

  const updates = {};

  if (parsed.data.status) {
    updates.status = parsed.data.status;
  }

  if (parsed.data.internalNotes !== undefined) {
    updates.internal_notes = parsed.data.internalNotes?.trim() || null;
  }

  if (parsed.data.responseMessage !== undefined) {
    updates.response_message = parsed.data.responseMessage?.trim() || null;
    updates.responded_at = new Date().toISOString();
  }

  if (parsed.data.markResponded && !updates.responded_at) {
    updates.responded_at = new Date().toISOString();
  }

  const updatedBooking = updateBooking(bookingId, updates);

  if (!updatedBooking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  return res.json({ booking: updatedBooking });
});

export default router;
