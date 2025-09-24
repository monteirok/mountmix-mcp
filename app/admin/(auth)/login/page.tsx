'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || "Unable to sign in");
      }

      router.push("/admin/submissions");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 45%, #334155 100%)",
        padding: "2rem"
      }}
    >
      <div style={{ background: "rgba(15, 23, 42, 0.85)", borderRadius: "18px", padding: "2.5rem", width: "100%", maxWidth: "420px", color: "white", boxShadow: "0 30px 60px rgba(15, 23, 42, 0.45)" }}>
        <header style={{ marginBottom: "1.75rem" }}>
          <h1 style={{ margin: 0, fontSize: "1.9rem", fontWeight: 600 }}>Admin Login</h1>
          <p style={{ margin: "0.5rem 0 0", color: "rgba(226, 232, 240, 0.75)", fontSize: "0.95rem" }}>
            Sign in with your Mountain Mix admin credentials to access the booking dashboard.
          </p>
        </header>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <label style={{ display: "grid", gap: "0.4rem", fontSize: "0.95rem" }}>
            Email
            <input
              type="email"
              autoComplete="email"
              required
              value={formState.email}
              onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
              style={{
                borderRadius: "10px",
                border: "1px solid rgba(148, 163, 184, 0.6)",
                padding: "0.75rem",
                fontSize: "1rem",
                color: "#0f172a"
              }}
            />
          </label>
          <label style={{ display: "grid", gap: "0.4rem", fontSize: "0.95rem" }}>
            Password
            <input
              type="password"
              autoComplete="current-password"
              required
              value={formState.password}
              onChange={(event) => setFormState((prev) => ({ ...prev, password: event.target.value }))}
              style={{
                borderRadius: "10px",
                border: "1px solid rgba(148, 163, 184, 0.6)",
                padding: "0.75rem",
                fontSize: "1rem",
                color: "#0f172a"
              }}
            />
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              marginTop: "0.5rem",
              borderRadius: "10px",
              padding: "0.85rem 1.5rem",
              border: "none",
              background: "#38bdf8",
              color: "#0f172a",
              fontWeight: 600,
              fontSize: "1rem",
              cursor: isSubmitting ? "not-allowed" : "pointer"
            }}
          >
            {isSubmitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
        {error && (
          <p style={{ marginTop: "1rem", color: "#fca5a5", fontSize: "0.9rem" }}>{error}</p>
        )}
      </div>
    </div>
  );
}
