import "dotenv/config";
import express from "express";
import cors from "cors";
import bookingsRouter from "./routes/bookings.js";
import adminRouter from "./routes/admin.js";
import { ensureDefaultAdmin, initDatabase } from "./db.js";

const app = express();
const port = Number(process.env.PORT) || 4000;

const defaultOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:4173",
  "http://127.0.0.1:4173"
];

const envOrigins = process.env.CLIENT_ORIGINS
  ? process.env.CLIENT_ORIGINS.split(",").map((origin) => origin.trim())
  : [];

const allowedOrigins = [...new Set([...defaultOrigins, ...envOrigins])];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes("*") || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(null, false);
    },
    optionsSuccessStatus: 200
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/bookings", bookingsRouter);
app.use("/api/admin", adminRouter);

app.use((err, _req, res, _next) => {
  console.error("[server] Unhandled error", err);
  res.status(500).json({ message: "Unexpected server error" });
});

initDatabase();
ensureDefaultAdmin();

app.listen(port, () => {
  console.log(`MountMix API listening on http://localhost:${port}`);
});
