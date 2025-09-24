import { NextResponse } from "next/server";

import { getSessionFromCookies } from "@/lib/auth";
import { getSubmissions } from "@/lib/submissions";

export async function GET() {
  const session = getSessionFromCookies();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await getSubmissions();
  return NextResponse.json({ submissions });
}
