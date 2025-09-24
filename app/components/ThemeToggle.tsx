'use client';

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";

import { useTheme } from "@/app/providers/ThemeProvider";

const iconStyle: CSSProperties = {
  width: "1.1rem",
  height: "1.1rem",
  display: "block"
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      aria-label={theme === "dark" ? "Activate light mode" : "Activate dark mode"}
      style={{
        border: "1px solid var(--border-card)",
        background: "transparent",
        borderRadius: "999px",
        padding: "0.45rem 0.7rem",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.45rem",
        color: "inherit",
        cursor: "pointer",
        transition: "transform 0.2s ease, border-color 0.2s ease, background 0.2s ease"
      }}
    >
      {mounted && theme === "dark" ? (
        <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} aria-hidden="true">
          <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="currentColor" style={iconStyle} aria-hidden="true">
          <path d="M12 4.5a1 1 0 0 1-1-1V2a1 1 0 0 1 2 0v1.5a1 1 0 0 1-1 1zm0 17a1 1 0 0 1-1 1V23a1 1 0 0 1 2 0v-1.5a1 1 0 0 1-1 1zm9-7.5a1 1 0 0 1 1 1H23a1 1 0 0 1 0 2h-1.5a1 1 0 0 1-1-1 1 1 0 0 1 1-1zM4.5 12a1 1 0 0 1-1 1H2a1 1 0 0 1 0-2h1.5a1 1 0 0 1 1 1zm14.72 7.78a1 1 0 0 1-1.41 0l-1.06-1.06a1 1 0 0 1 1.41-1.41l1.06 1.06a1 1 0 0 1 0 1.41zM7.25 6.28a1 1 0 0 1-1.41 0L4.78 5.22a1 1 0 0 1 1.41-1.41l1.06 1.06a1 1 0 0 1 0 1.41zm0 11.44-1.06 1.06a1 1 0 0 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 1.41zM17.25 5.22 16.19 6.28a1 1 0 0 1-1.41-1.41l1.06-1.06a1 1 0 0 1 1.41 1.41zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" />
        </svg>
      )}
      <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>{mounted ? (theme === "dark" ? "Dark" : "Light") : "Theme"}</span>
    </button>
  );
}
