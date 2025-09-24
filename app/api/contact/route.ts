import { NextRequest, NextResponse } from "next/server";

import { addSubmission, requireSubmissionFields } from "@/lib/submissions";

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function POST(request: NextRequest) {
  const payload = (await request.json()) as Record<string, unknown>;
  const error = requireSubmissionFields(payload);

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  await addSubmission({
    name: String(payload.name),
    email: String(payload.email),
    phone: payload.phone ? String(payload.phone) : undefined,
    date: String(payload.date),
    eventType: String(payload.eventType),
    guestCount: Number(payload.guestCount),
    budget: String(payload.budget),
    location: String(payload.location),
    vision: String(payload.vision),
    guide: Boolean(payload.guide)
  });

  return NextResponse.json({ success: true });
}
