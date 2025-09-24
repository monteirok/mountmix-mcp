import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE_NAME, createSessionToken, getAdminCredentials, verifySessionToken } from "@/lib/auth";

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production"
};

export async function POST(request: NextRequest) {
  const { email, password } = (await request.json()) as { email?: string; password?: string };
  const credentials = getAdminCredentials();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  if (email !== credentials.email || password !== credentials.password) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = createSessionToken(email);
  const response = NextResponse.json({ success: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    ...COOKIE_OPTIONS,
    path: "/",
    maxAge: 60 * 60 * 6
  });
  return response;
}

export async function DELETE(request: NextRequest) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const response = NextResponse.json({ success: true });

  if (sessionToken && verifySessionToken(sessionToken)) {
    response.cookies.set(SESSION_COOKIE_NAME, "", {
      ...COOKIE_OPTIONS,
      path: "/",
      maxAge: 0
    });
  }

  return response;
}
