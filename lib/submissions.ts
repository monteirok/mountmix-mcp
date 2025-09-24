import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
const SUBMISSIONS_PATH = path.join(DATA_DIR, "submissions.json");

export type SubmissionStatus = "new" | "contacted" | "responded";

export type SubmissionResponse = {
  id: string;
  subject: string;
  message: string;
  method: "email" | "call" | "other";
  createdAt: string;
};

export interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  date: string;
  eventType: string;
  guestCount: number;
  budget: string;
  location: string;
  vision: string;
  guide: boolean;
  submittedAt: string;
  status: SubmissionStatus;
  adminNotes?: string;
  responses: SubmissionResponse[];
  lastUpdatedAt: string;
}

export type NewSubmissionInput = {
  name: string;
  email: string;
  phone?: string;
  date: string;
  eventType: string;
  guestCount: number;
  budget: string;
  location: string;
  vision: string;
  guide: boolean;
};

async function ensureStorage() {
  try {
    await fs.access(SUBMISSIONS_PATH);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(SUBMISSIONS_PATH, "[]", "utf8");
  }
}

export async function getSubmissions(): Promise<Submission[]> {
  await ensureStorage();
  const file = await fs.readFile(SUBMISSIONS_PATH, "utf8");
  try {
    const parsed = JSON.parse(file) as Submission[];
    let requiresPersist = false;

    const normalized = parsed.map((submission) => {
      const next: Submission = {
        id: submission.id || randomUUID(),
        name: submission.name,
        email: submission.email,
        phone: submission.phone,
        date: submission.date,
        eventType: submission.eventType,
        guestCount: submission.guestCount,
        budget: submission.budget,
        location: submission.location,
        vision: submission.vision,
        guide: submission.guide,
        submittedAt: submission.submittedAt,
        status: submission.status || "new",
        adminNotes: submission.adminNotes ?? "",
        responses: submission.responses ?? [],
        lastUpdatedAt: submission.lastUpdatedAt || submission.submittedAt,
      };

      if (!submission.id || !submission.responses || submission.status === undefined || submission.adminNotes === undefined || !submission.lastUpdatedAt) {
        requiresPersist = true;
      }

      return next;
    });

    if (requiresPersist) {
      await saveSubmissions(normalized);
    }

    return normalized;
  } catch {
    return [];
  }
}

export async function saveSubmissions(entries: Submission[]) {
  await ensureStorage();
  await fs.writeFile(SUBMISSIONS_PATH, JSON.stringify(entries, null, 2), "utf8");
}

export async function addSubmission(payload: NewSubmissionInput): Promise<Submission> {
  const submissions = await getSubmissions();
  const timestamp = new Date().toISOString();
  const entry: Submission = {
    id: randomUUID(),
    ...payload,
    submittedAt: timestamp,
    status: "new",
    responses: [],
    adminNotes: "",
    lastUpdatedAt: timestamp,
  };
  submissions.push(entry);
  await saveSubmissions(submissions);
  return entry;
}

export async function findSubmission(id: string): Promise<Submission | undefined> {
  const submissions = await getSubmissions();
  return submissions.find((item) => item.id === id);
}

export async function updateSubmission(id: string, update: Partial<Submission>) {
  const submissions = await getSubmissions();
  const index = submissions.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Submission not found");
  }
  const next = {
    ...submissions[index],
    ...update,
    lastUpdatedAt: new Date().toISOString(),
  };
  submissions[index] = next;
  await saveSubmissions(submissions);
  return next;
}

export async function applySubmissionMutation(
  id: string,
  mutator: (current: Submission) => Submission,
): Promise<Submission> {
  const submissions = await getSubmissions();
  const index = submissions.findIndex((item) => item.id === id);
  if (index === -1) {
    throw new Error("Submission not found");
  }
  const nextState = mutator(submissions[index]);
  const updated = {
    ...nextState,
    lastUpdatedAt: new Date().toISOString(),
    responses: nextState.responses ?? submissions[index].responses ?? [],
  };
  submissions[index] = updated;
  await saveSubmissions(submissions);
  return updated;
}

export function requireSubmissionFields(payload: Record<string, unknown>) {
  const requiredFields = ["name", "email", "date", "eventType", "guestCount", "budget", "location", "vision"];
  const missing = requiredFields.filter((field) => {
    const value = payload[field];
    return value === undefined || value === null || value === "";
  });

  if (missing.length > 0) {
    return `Missing required field${missing.length > 1 ? "s" : ""}: ${missing.join(", ")}`;
  }

  if (typeof payload.guestCount !== "number") {
    return "guestCount must be a number";
  }

  return null;
}
