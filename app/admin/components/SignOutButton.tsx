'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignOut() {
    setIsLoading(true);
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } finally {
      setIsLoading(false);
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isLoading}
      style={{
        border: "1px solid rgba(148, 163, 184, 0.6)",
        borderRadius: "999px",
        padding: "0.45rem 1rem",
        background: "transparent",
        color: "#0f172a",
        fontSize: "0.9rem",
        cursor: isLoading ? "not-allowed" : "pointer"
      }}
    >
      {isLoading ? "Signing out…" : "Sign out"}
    </button>
  );
}
