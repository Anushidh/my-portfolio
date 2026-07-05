"use client";

import { useEffect, useState } from "react";

export default function WelcomeToast() {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("welcomed")) return;

    const show = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("welcomed", "1");
    }, 1000);

    const hide = setTimeout(() => {
      setHiding(true);
    }, 5000);

    const remove = setTimeout(() => {
      setVisible(false);
    }, 5600);

    return () => {
      clearTimeout(show);
      clearTimeout(hide);
      clearTimeout(remove);
    };
  }, []);

  const dismiss = () => {
    setHiding(true);
    setTimeout(() => setVisible(false), 600);
  };

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "5rem",
        right: "1.75rem",
        left: "unset",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderLeft: "3px solid var(--color-accent)",
        borderRadius: "12px",
        padding: "0.9rem 1.1rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        maxWidth: "340px",
        opacity: hiding ? 0 : 1,
        transform: hiding ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
        animation: "toast-in 0.5s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div style={{ flex: 1 }}>
        <p
          style={{
            fontSize: "0.875rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-text-primary)",
            fontWeight: 500,
            lineHeight: 1.4,
            marginBottom: "0.2rem",
          }}
        >
          You made it.
        </p>
        <p
          style={{
            fontSize: "0.8125rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
            lineHeight: 1.5,
          }}
        >
          Have a look around — and if something clicks, let&apos;s talk.
        </p>
      </div>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--color-text-muted)",
          fontSize: "1rem",
          lineHeight: 1,
          padding: "0",
          marginTop: "1px",
          flexShrink: 0,
        }}
      >
        ×
      </button>

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
