import { SubmissionsManager } from "../../components/SubmissionsManager";
import { getSubmissions } from "@/lib/submissions";

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <main style={{ padding: "2.5rem 1.5rem", margin: "0 auto", maxWidth: "1240px" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 600, color: "#0f172a", marginBottom: "0.5rem" }}>Booking Inbox</h1>
        <p style={{ color: "#475569" }}>Track new leads, add notes, and log responses in one place.</p>
      </header>
      <SubmissionsManager initialSubmissions={submissions} />
    </main>
  );
}
