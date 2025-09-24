import { randomUUID } from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { getSessionFromCookies } from "@/lib/auth";
import { SubmissionStatus, applySubmissionMutation } from "@/lib/submissions";

type ResponsePayload = {
  subject: string;
  message: string;
  method: "email" | "call" | "other";
};

type PatchPayload = {
  status?: SubmissionStatus;
  adminNotes?: string;
  response?: ResponsePayload;
};

function isValidStatus(status?: string): status is SubmissionStatus {
  return status === "new" || status === "contacted" || status === "responded";
}

function sanitizeResponse(response: ResponsePayload) {
  const { subject, message, method } = response;
  if (!subject?.trim() || !message?.trim()) {
    throw new Error("Subject and message are required");
  }
  if (!isValidMethod(method)) {
    throw new Error("Invalid response method");
  }
  return {
    subject: subject.trim(),
    message: message.trim(),
    method
  };
}

function isValidMethod(method: string): method is "email" | "call" | "other" {
  return method === "email" || method === "call" || method === "other";
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const session = getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: PatchPayload;

  try {
    payload = (await request.json()) as PatchPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (payload.status && !isValidStatus(payload.status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  try {
    const updated = await applySubmissionMutation(params.id, (current) => {
      const next = { ...current };

      if (payload.status && isValidStatus(payload.status)) {
        next.status = payload.status;
      }

      if (typeof payload.adminNotes === "string") {
        next.adminNotes = payload.adminNotes;
      }

      if (payload.response) {
        const responseEntry = sanitizeResponse(payload.response);
        next.responses = [
          ...current.responses,
          {
            id: randomUUID(),
            ...responseEntry,
            createdAt: new Date().toISOString()
          }
        ];
        if (!payload.status) {
          next.status = "responded";
        }
      }

      return next;
    });

    return NextResponse.json({ submission: updated });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
