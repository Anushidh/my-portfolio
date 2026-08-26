"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const email = "anushidh101@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="contact-card"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        padding: "1.5rem 1.75rem",
        backgroundColor: "var(--color-surface)",
        border: "none",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "8px",
            backgroundColor: copied 
              ? "color-mix(in srgb, var(--color-success) 12%, transparent)"
              : "color-mix(in srgb, var(--color-accent) 8%, transparent)",
            border: copied
              ? "1px solid color-mix(in srgb, var(--color-success) 30%, transparent)"
              : "1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            color: copied ? "var(--color-success)" : "var(--color-accent)",
            transition: "all 0.2s ease",
          }}
        >
          {copied ? <Check size={16} /> : <Mail size={16} />}
        </span>
        <div>
          <p
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "0.15rem",
            }}
          >
            {copied ? "Copied to clipboard!" : "Email"}
          </p>
          <p
            style={{
              fontSize: "1rem",
              fontFamily: "var(--font-body)",
              color: "var(--color-text-primary)",
              fontWeight: 500,
            }}
          >
            {email}
          </p>
        </div>
      </div>
      
      <span
        style={{
          fontSize: "0.85rem",
          color: copied ? "var(--color-success)" : "var(--color-text-secondary)",
          fontWeight: 500,
          opacity: 0.8,
          transition: "color 0.2s ease",
        }}
      >
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}
