import jwt from "jsonwebtoken";
import { findAdminById } from "../db.js";

const DEFAULT_SECRET = "development-secret-change-me";
const TOKEN_EXPIRY = process.env.ADMIN_TOKEN_TTL || "12h";

const getSecret = () => process.env.JWT_SECRET || DEFAULT_SECRET;

export const createAdminToken = (admin) => {
  return jwt.sign(
    {
      sub: admin.id,
      email: admin.email,
      name: admin.name
    },
    getSecret(),
    { expiresIn: TOKEN_EXPIRY }
  );
};

export const authenticateAdmin = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Malformed authorization header" });
  }

  try {
    const payload = jwt.verify(token, getSecret());
    const admin = findAdminById(payload.sub);

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
