import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

const SESSION_TTL_SECONDS = 60 * 60 * 6; // 6 hours
export const SESSION_COOKIE_NAME = "admin_session";

type SessionPayload = {
  sub: string;
  exp: number;
};

function getSecret() {
  const secret = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || process.env.NEXT_PUBLIC_ADMIN_SECRET;
  return secret || "dev-admin-secret";
}

export function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  return { email, password };
}

function encodePayload(payload: SessionPayload) {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

function decodePayload(encoded: string): SessionPayload | null {
  try {
    const json = Buffer.from(encoded, "base64url").toString("utf8");
    return JSON.parse(json) as SessionPayload;
  } catch {
    return null;
  }
}

function sign(encodedPayload: string) {
  const hmac = createHmac("sha256", getSecret());
  hmac.update(encodedPayload);
  return hmac.digest("base64url");
}

export function createSessionToken(email: string, ttlSeconds: number = SESSION_TTL_SECONDS) {
  const payload: SessionPayload = {
    sub: email,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };
  const encoded = encodePayload(payload);
  const signature = sign(encoded);
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token?: string | null): SessionPayload | null {
  if (!token) {
    return null;
  }
  const [encodedPayload, providedSignature] = token.split(".");
  if (!encodedPayload || !providedSignature) {
    return null;
  }

  const expectedSignature = sign(encodedPayload);
  const expectedBuffer = Buffer.from(expectedSignature, "base64url");
  const providedBuffer = Buffer.from(providedSignature, "base64url");

  if (expectedBuffer.length !== providedBuffer.length) {
    return null;
  }

  try {
    if (!timingSafeEqual(expectedBuffer, providedBuffer)) {
      return null;
    }
  } catch {
    return null;
  }

  const payload = decodePayload(encodedPayload);
  if (!payload) {
    return null;
  }

  if (payload.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return payload;
}

export function getSessionFromCookies() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token ?? null);
}

export function ensureAdminSession() {
  const session = getSessionFromCookies();
  if (!session) {
    return null;
  }
  return session;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
