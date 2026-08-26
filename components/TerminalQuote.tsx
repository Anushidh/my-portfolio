"use client";

import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";

const quotes = [
  "There are only two hard things in Computer Science: cache invalidation and naming things.",
  "It's not a bug – it's an undocumented feature.",
  "First, solve the problem. Then, write the code.",
  "Talk is cheap. Show me the code.",
  "Programs must be written for people to read, and only incidentally for machines to execute.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Optimism is an occupational hazard of programming: feedback is the treatment.",
  "Simplicity is the soul of efficiency.",
  "Before software can be reusable it first has to be usable.",
  "Make it work, make it right, make it fast.",
];

export default function TerminalQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // Pick a random quote on mount to avoid hydration mismatch
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  if (!quote) return <div style={{ height: "40px" }} />; // Placeholder to prevent layout shift

  return (
    <FadeIn delay={0.2}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "1rem",
          color: "var(--color-text-secondary)",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          padding: "1.5rem 1.75rem",
          backgroundColor: "var(--color-surface)",
          border: "1px solid var(--color-border)",
          borderRadius: "12px",
          width: "100%",
        }}
      >
        <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>&gt;_</span>
        <span style={{ lineHeight: 1.6 }}>{quote}</span>
      </div>
    </FadeIn>
  );
}
