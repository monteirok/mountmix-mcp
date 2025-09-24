'use client';

import { useCallback, useEffect, useMemo, useState } from "react";

import type { Submission, SubmissionResponse, SubmissionStatus } from "@/lib/submissions";

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: "New",
  contacted: "Contacted",
  responded: "Responded"
};

type FilterValue = "all" | SubmissionStatus;

type FeedbackState = {
  type: "success" | "error";
  message: string;
};

const defaultResponse = {
  subject: "",
  message: "",
  method: "email" as const
};

function sortBySubmittedAt(entries: Submission[]) {
  return [...entries].sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

function Badge({ status }: { status: SubmissionStatus }) {
  const colors: Record<SubmissionStatus, string> = {
    new: "#2563eb",
    contacted: "#f59e0b",
    responded: "#16a34a"
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        fontSize: "0.75rem",
        fontWeight: 600,
        lineHeight: 1,
        color: colors[status],
        background: `${colors[status]}1A`,
        padding: "0.35rem 0.6rem",
        borderRadius: "999px",
        textTransform: "uppercase",
        letterSpacing: "0.03em"
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function ResponseHistory({ entries }: { entries: SubmissionResponse[] }) {
  if (!entries.length) {
    return (
      <p style={{ color: "#64748b", fontSize: "0.9rem" }}>No responses logged yet.</p>
    );
  }

  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.75rem" }}>
      {entries
        .slice()
        .reverse()
        .map((entry) => (
          <li key={entry.id} style={{ background: "#f8fafc", borderRadius: "10px", padding: "0.85rem 1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
              <span style={{ fontWeight: 600 }}>{entry.subject}</span>
              <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                {formatDateTime(entry.createdAt)} · {entry.method === "email" ? "Email" : entry.method === "call" ? "Call" : "Other"}
              </span>
            </div>
            <p style={{ margin: 0, whiteSpace: "pre-wrap", color: "#1e293b", fontSize: "0.95rem" }}>{entry.message}</p>
          </li>
        ))}
    </ul>
  );
}

export function SubmissionsManager({ initialSubmissions }: { initialSubmissions: Submission[] }) {
  const [submissions, setSubmissions] = useState(() => sortBySubmittedAt(initialSubmissions));
  const [filter, setFilter] = useState<FilterValue>("all");
  const [selectedId, setSelectedId] = useState<string | null>(() => submissions[0]?.id ?? null);
  const [notesDraft, setNotesDraft] = useState<string>(submissions[0]?.adminNotes ?? "");
  const [statusDraft, setStatusDraft] = useState<SubmissionStatus>(submissions[0]?.status ?? "new");
  const [responseDraft, setResponseDraft] = useState(defaultResponse);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const filteredSubmissions = useMemo(() => {
    if (filter === "all") {
      return submissions;
    }
    return submissions.filter((submission) => submission.status === filter);
  }, [filter, submissions]);

  const selectedSubmission = useMemo(() => submissions.find((entry) => entry.id === selectedId) ?? null, [submissions, selectedId]);

  useEffect(() => {
    if (!submissions.length) {
      setSelectedId(null);
      return;
    }
    if (!selectedId) {
      setSelectedId(submissions[0].id);
      return;
    }
    const exists = submissions.some((entry) => entry.id === selectedId);
    if (!exists) {
      setSelectedId(submissions[0].id);
    }
  }, [selectedId, submissions]);

  const refreshList = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch("/api/admin/submissions", { cache: "no-store" });
      if (response.ok) {
        const data = (await response.json()) as { submissions: Submission[] };
        setSubmissions(sortBySubmittedAt(data.submissions));
      }
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    refreshList().catch(() => setIsRefreshing(false));
  }, [refreshList]);

  useEffect(() => {
    if (!selectedSubmission) {
      setNotesDraft("");
      setStatusDraft("new");
      setResponseDraft(defaultResponse);
      return;
    }
    setNotesDraft(selectedSubmission.adminNotes ?? "");
    setStatusDraft(selectedSubmission.status);
    setResponseDraft(defaultResponse);
  }, [selectedSubmission]);

  const totalByStatus = useMemo(() => {
    return submissions.reduce(
      (acc, submission) => {
        acc.all += 1;
        acc[submission.status] += 1;
        return acc;
      },
      { all: 0, new: 0, contacted: 0, responded: 0 } as Record<FilterValue, number>,
    );
  }, [submissions]);

  async function mutateSubmission(id: string, body: Record<string, unknown>) {
    setFeedback(null);
    setIsSaving(true);
    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || "Unable to save changes");
      }

      const data = (await response.json()) as { submission: Submission };
      setSubmissions((prev) => {
        const next = prev.map((entry) => (entry.id === data.submission.id ? data.submission : entry));
        return sortBySubmittedAt(next);
      });
      setFeedback({ type: "success", message: "Changes saved" });
      return data.submission;
    } catch (error) {
      setFeedback({ type: "error", message: error instanceof Error ? error.message : "Unable to save" });
      throw error;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleStatusChange(nextStatus: SubmissionStatus) {
    if (!selectedSubmission || nextStatus === selectedSubmission.status) {
      setStatusDraft(nextStatus);
      return;
    }

    try {
      await mutateSubmission(selectedSubmission.id, { status: nextStatus });
      setStatusDraft(nextStatus);
    } catch {
      setStatusDraft(selectedSubmission.status);
    }
  }

  async function handleNotesSave() {
    if (!selectedSubmission) {
      return;
    }
    try {
      await mutateSubmission(selectedSubmission.id, { adminNotes: notesDraft });
    } catch {
      /* handled via feedback state */
    }
  }

  async function handleResponseSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedSubmission) {
      return;
    }

    if (!responseDraft.subject.trim() || !responseDraft.message.trim()) {
      setFeedback({ type: "error", message: "Subject and message are required" });
      return;
    }

    try {
      await mutateSubmission(selectedSubmission.id, {
        response: {
          subject: responseDraft.subject,
          message: responseDraft.message,
          method: responseDraft.method
        }
      });
      setResponseDraft(defaultResponse);
    } catch {
      /* feedback already updated */
    }
  }

  function handleResponseDraftUpdate(partial: Partial<typeof defaultResponse>) {
    setResponseDraft((prev) => ({ ...prev, ...partial }));
  }

  const isLoading = isRefreshing || !selectedSubmission;

  return (
    <div style={{ display: "grid", gap: "1.5rem", gridTemplateColumns: "minmax(280px, 340px) 1fr" }}>
      <aside style={{ background: "white", borderRadius: "14px", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)", padding: "1rem" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>Submissions</h2>
          <button
            type="button"
            onClick={() => {
              void refreshList();
            }}
            style={{
              fontSize: "0.85rem",
              background: "transparent",
              border: "1px solid #cbd5f5",
              borderRadius: "999px",
              padding: "0.35rem 0.75rem",
              color: "#2563eb",
              cursor: "pointer"
            }}
          >
            {isRefreshing ? "Refreshing…" : "Refresh"}
          </button>
        </header>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {["all", "new", "contacted", "responded"].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value as FilterValue)}
              style={{
                borderRadius: "999px",
                padding: "0.45rem 0.9rem",
                border: filter === value ? "1px solid #1d4ed8" : "1px solid #cbd5f5",
                background: filter === value ? "#1d4ed8" : "transparent",
                color: filter === value ? "white" : "#1e293b",
                fontSize: "0.85rem",
                cursor: "pointer"
              }}
            >
              {value === "all" ? "All" : STATUS_LABELS[value as SubmissionStatus]} ({totalByStatus[value as FilterValue] ?? 0})
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gap: "0.65rem", maxHeight: "60vh", overflowY: "auto", paddingRight: "0.3rem" }}>
          {filteredSubmissions.length === 0 ? (
            <p style={{ color: "#64748b", fontSize: "0.9rem" }}>No submissions in this view.</p>
          ) : (
            filteredSubmissions.map((submission) => (
              <button
                key={submission.id}
                type="button"
                onClick={() => setSelectedId(submission.id)}
                style={{
                  textAlign: "left",
                  border: selectedId === submission.id ? "2px solid #1d4ed8" : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "0.75rem",
                  background: selectedId === submission.id ? "#eff6ff" : "white",
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: "#0f172a" }}>{submission.name}</span>
                  <Badge status={submission.status} />
                </div>
                <div style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "0.2rem" }}>{submission.eventType}</div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Submitted {formatDateTime(submission.submittedAt)}</div>
              </button>
            ))
          )}
        </div>
      </aside>

      <section style={{ background: "white", borderRadius: "14px", boxShadow: "0 18px 40px rgba(15, 23, 42, 0.12)", padding: "1.5rem", minHeight: "60vh" }}>
        {!selectedSubmission ? (
          <p style={{ color: "#64748b" }}>Select a submission to view details.</p>
        ) : (
          <div style={{ display: "grid", gap: "1.25rem" }}>
            {feedback && (
              <div
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "10px",
                  background: feedback.type === "success" ? "#dcfce7" : "#fee2e2",
                  color: feedback.type === "success" ? "#166534" : "#b91c1c",
                  fontSize: "0.95rem"
                }}
              >
                {feedback.message}
              </div>
            )}

            <header style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 600 }}>{selectedSubmission.name}</h2>
                  <p style={{ margin: "0.35rem 0", color: "#475569" }}>{selectedSubmission.email}</p>
                  <p style={{ margin: 0, color: "#475569" }}>{selectedSubmission.phone || "No phone provided"}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <Badge status={statusDraft} />
                  <p style={{ margin: "0.4rem 0 0", fontSize: "0.8rem", color: "#94a3b8" }}>
                    Last updated {formatDateTime(selectedSubmission.lastUpdatedAt)}
                  </p>
                </div>
              </div>
            </header>

            <section style={{ display: "grid", gap: "0.75rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Event Snapshot</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "0.75rem", fontSize: "0.95rem", color: "#1e293b" }}>
                <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "0.8rem" }}>
                  <strong>Event Date</strong>
                  <div>{selectedSubmission.date}</div>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "0.8rem" }}>
                  <strong>Guest Count</strong>
                  <div>{selectedSubmission.guestCount}</div>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "0.8rem" }}>
                  <strong>Event Type</strong>
                  <div>{selectedSubmission.eventType}</div>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "0.8rem" }}>
                  <strong>Budget</strong>
                  <div>{selectedSubmission.budget}</div>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "0.8rem" }}>
                  <strong>Location</strong>
                  <div>{selectedSubmission.location}</div>
                </div>
                <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "0.8rem" }}>
                  <strong>Planning Guide</strong>
                  <div>{selectedSubmission.guide ? "Requested" : "Not requested"}</div>
                </div>
              </div>
              <div style={{ background: "#f1f5f9", borderRadius: "10px", padding: "1rem" }}>
                <strong style={{ display: "block", marginBottom: "0.4rem" }}>Vision</strong>
                <p style={{ margin: 0, whiteSpace: "pre-wrap", color: "#1e293b" }}>{selectedSubmission.vision}</p>
              </div>
            </section>

            <section style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 260px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontWeight: 600, fontSize: "0.95rem", color: "#0f172a" }}>
                  Status
                  <select
                    value={statusDraft}
                    onChange={(event) => handleStatusChange(event.target.value as SubmissionStatus)}
                    disabled={isSaving}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      padding: "0.65rem 0.75rem",
                      fontSize: "0.95rem"
                    }}
                  >
                    {Object.entries(STATUS_LABELS).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div style={{ flex: "2 1 320px" }}>
                <label style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontWeight: 600, fontSize: "0.95rem", color: "#0f172a" }}>
                  Internal Notes
                  <textarea
                    value={notesDraft}
                    onChange={(event) => setNotesDraft(event.target.value)}
                    rows={4}
                    style={{
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      padding: "0.75rem",
                      fontSize: "0.95rem",
                      resize: "vertical",
                      minHeight: "120px"
                    }}
                  />
                </label>
                <button
                  type="button"
                  onClick={handleNotesSave}
                  disabled={isSaving || notesDraft === (selectedSubmission.adminNotes ?? "")}
                  style={{
                    marginTop: "0.75rem",
                    padding: "0.65rem 1.2rem",
                    borderRadius: "10px",
                    border: "none",
                    background: "#1d4ed8",
                    color: "white",
                    fontWeight: 600,
                    cursor: isSaving ? "not-allowed" : "pointer"
                  }}
                >
                  {isSaving ? "Saving…" : "Save Notes"}
                </button>
              </div>
            </section>

            <section style={{ display: "grid", gap: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Send a Response</h3>
                <a
                  href={`mailto:${selectedSubmission.email}?subject=${encodeURIComponent(responseDraft.subject || "Re: Your event inquiry")}`}
                  style={{ fontSize: "0.85rem", color: "#2563eb" }}
                >
                  Open in email client
                </a>
              </div>
              <form onSubmit={handleResponseSubmit} style={{ display: "grid", gap: "0.75rem" }}>
                <div style={{ display: "grid", gap: "0.5rem" }}>
                  <label style={{ fontWeight: 600, fontSize: "0.95rem", color: "#0f172a" }}>
                    Subject
                    <input
                      value={responseDraft.subject}
                      onChange={(event) => handleResponseDraftUpdate({ subject: event.target.value })}
                      placeholder="Re: Your celebration with Mountain Mix"
                      style={{
                        width: "100%",
                        borderRadius: "10px",
                        border: "1px solid #cbd5f5",
                        padding: "0.65rem 0.75rem",
                        marginTop: "0.35rem"
                      }}
                    />
                  </label>
                </div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <span style={{ fontWeight: 600, color: "#0f172a", fontSize: "0.95rem" }}>Method</span>
                  {["email", "call", "other"].map((method) => (
                    <label key={method} style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.9rem" }}>
                      <input
                        type="radio"
                        checked={responseDraft.method === method}
                        onChange={() => handleResponseDraftUpdate({ method: method as typeof responseDraft.method })}
                      />
                      {method === "email" ? "Email" : method === "call" ? "Call" : "Other"}
                    </label>
                  ))}
                </div>
                <label style={{ fontWeight: 600, fontSize: "0.95rem", color: "#0f172a" }}>
                  Message
                  <textarea
                    value={responseDraft.message}
                    onChange={(event) => handleResponseDraftUpdate({ message: event.target.value })}
                    placeholder="Hi {firstName}, thank you for reaching out..."
                    rows={6}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      border: "1px solid #cbd5f5",
                      padding: "0.75rem",
                      marginTop: "0.35rem",
                      resize: "vertical"
                    }}
                  />
                </label>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <button
                    type="submit"
                    disabled={isSaving}
                    style={{
                      padding: "0.65rem 1.5rem",
                      borderRadius: "10px",
                      border: "none",
                      background: "#16a34a",
                      color: "white",
                      fontWeight: 600,
                      cursor: isSaving ? "not-allowed" : "pointer"
                    }}
                  >
                    {isSaving ? "Sending…" : "Log Response"}
                  </button>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>
                    Logs the message, marks the inquiry as responded, and keeps your response history.
                  </p>
                </div>
              </form>
            </section>

            <section style={{ display: "grid", gap: "0.75rem" }}>
              <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600 }}>Response History</h3>
              <ResponseHistory entries={selectedSubmission.responses} />
            </section>
          </div>
        )}
      </section>
    </div>
  );
}
