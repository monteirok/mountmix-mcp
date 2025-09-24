import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { AnimatedReveal } from "@/app/components/AnimatedReveal";
import { ThemeToggle } from "@/app/components/ThemeToggle";
import { getSessionFromCookies } from "@/lib/auth";

import { SignOutButton } from "../components/SignOutButton";

export default function AdminProtectedLayout({ children }: { children: ReactNode }) {
  const session = getSessionFromCookies();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--admin-shell-bg)" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 2rem",
          background: "rgba(15, 23, 42, 0.92)",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 10,
          backdropFilter: "blur(4px)"
        }}
      >
        <AnimatedReveal as="div" variant="fade-down" once distance={20}>
          <Link href="/admin/submissions" style={{ color: "white", textDecoration: "none", fontWeight: 600, fontSize: "1.15rem" }}>
            Mountain Mix Admin
          </Link>
          <p style={{ margin: 0, fontSize: "0.85rem", color: "rgba(226, 232, 240, 0.8)" }}>Signed in as {session.sub}</p>
        </AnimatedReveal>
        <AnimatedReveal as="nav" style={{ display: "flex", alignItems: "center", gap: "1rem" }} variant="fade" once>
          <Link href="/admin/submissions" style={{ color: "white", fontSize: "0.95rem", transition: "opacity 0.2s ease" }}>
            Submissions
          </Link>
          <ThemeToggle />
          <SignOutButton />
        </AnimatedReveal>
      </header>
      <div style={{ padding: "2rem 0 4rem" }}>{children}</div>
    </div>
  );
}
