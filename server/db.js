import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "app.db");
const db = new Database(dbPath);
db.pragma("journal_mode = WAL");


export const initDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      client_email TEXT NOT NULL,
      client_phone TEXT,
      event_type TEXT,
      event_date TEXT,
      guest_count INTEGER,
      venue_location TEXT,
      budget_range TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      internal_notes TEXT,
      response_message TEXT,
      responded_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

export const ensureDefaultAdmin = () => {
  const email = process.env.ADMIN_EMAIL || "admin@mountainmixology.com";
  const name = process.env.ADMIN_NAME || "Site Administrator";
  const existing = db.prepare("SELECT id FROM admins WHERE email = ?").get(email);

  if (!existing) {
    const password = process.env.ADMIN_PASSWORD || "changeme123";
    const hash = bcrypt.hashSync(password, 10);
    db.prepare(
      "INSERT INTO admins (name, email, password_hash) VALUES (?, ?, ?)"
    ).run(name, email, hash);
    console.log(
      `[backend] Created default admin account for ${email}. Please change the password.`
    );
  }
};

export const findAdminByEmail = (email) => {
  return db.prepare("SELECT * FROM admins WHERE email = ?").get(email);
};

export const findAdminById = (id) => {
  return db.prepare("SELECT id, name, email, created_at FROM admins WHERE id = ?").get(id);
};

export const createBooking = (booking) => {
  const stmt = db.prepare(`
    INSERT INTO bookings (
      client_name, client_email, client_phone, event_type, event_date,
      guest_count, venue_location, budget_range, message
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    booking.client_name,
    booking.client_email,
    booking.client_phone,
    booking.event_type,
    booking.event_date,
    booking.guest_count,
    booking.venue_location,
    booking.budget_range,
    booking.message
  );

  return getBookingById(result.lastInsertRowid);
};

export const getBookingById = (id) => {
  const row = db.prepare("SELECT * FROM bookings WHERE id = ?").get(id);
  return row ? mapBooking(row) : null;
};

export const listBookings = ({ status, search } = {}) => {
  const clauses = [];
  const params = [];

  if (status) {
    clauses.push("status = ?");
    params.push(status);
  }

  if (search) {
    clauses.push("(client_name LIKE ? OR client_email LIKE ? OR venue_location LIKE ?)");
    const like = `%${search}%`;
    params.push(like, like, like);
  }

  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  const rows = db
    .prepare(`SELECT * FROM bookings ${where} ORDER BY created_at DESC`)
    .all(...params);

  return rows.map(mapBooking);
};

export const updateBooking = (id, updates) => {
  const allowed = [
    "status",
    "internal_notes",
    "response_message",
    "responded_at"
  ];
  const sets = [];
  const params = [];

  for (const key of allowed) {
    if (key in updates && updates[key] !== undefined) {
      sets.push(`${key} = ?`);
      params.push(updates[key]);
    }
  }

  if (!sets.length) {
    return getBookingById(id);
  }

  sets.push("updated_at = CURRENT_TIMESTAMP");

  const result = db
    .prepare(`UPDATE bookings SET ${sets.join(", ")} WHERE id = ?`)
    .run(...params, id);

  if (result.changes === 0) {
    return null;
  }

  return getBookingById(id);
};

export const mapBooking = (row) => {
  if (!row) {
    return null;
  }

  return {
    id: row.id,
    clientName: row.client_name,
    clientEmail: row.client_email,
    clientPhone: row.client_phone,
    eventType: row.event_type,
    eventDate: row.event_date,
    guestCount: row.guest_count,
    venueLocation: row.venue_location,
    budgetRange: row.budget_range,
    message: row.message,
    status: row.status,
    internalNotes: row.internal_notes,
    responseMessage: row.response_message,
    respondedAt: row.responded_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
};

export default db;
