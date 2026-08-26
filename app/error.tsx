"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Surface the error for debugging / future error reporting.
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "480px", width: "100%" }}>
        {/* Label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-error)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          500 — Error
        </p>

        {/* Heading */}
        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: 400,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--color-text-primary)",
            marginBottom: "1.25rem",
          }}
        >
          Something went wrong.
        </h1>

        {/* Divider */}
        <div
          style={{
            width: "2rem",
            height: "1px",
            backgroundColor: "var(--color-error)",
            marginBottom: "1.5rem",
          }}
        />

        {/* Message */}
        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.75,
            color: "var(--color-text-secondary)",
            marginBottom: "2.5rem",
          }}
        >
          An unexpected error occurred while rendering this page. It might be
          temporary — try again, or head back home.
        </p>

        {/* Optional error reference for support/debugging */}
        {error.digest && (
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              marginTop: "-1.75rem",
              marginBottom: "2.5rem",
            }}
          >
            ref: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={() => unstable_retry()}
            className="not-found-btn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.65rem 1.4rem",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              backgroundColor: "var(--color-accent)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ↻ Try again
          </button>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.65rem 1.4rem",
              fontSize: "0.875rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              backgroundColor: "transparent",
              color: "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            ← Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
