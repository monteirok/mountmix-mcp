import { redirect } from "next/navigation";

import { getSessionFromCookies } from "@/lib/auth";

export default function AdminIndex() {
  const session = getSessionFromCookies();
  if (session) {
    redirect("/admin/submissions");
  }
  redirect("/admin/login");
}
