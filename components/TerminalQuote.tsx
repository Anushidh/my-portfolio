"use client";

import { useState, useEffect, useRef } from "react";
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

// Reserve height for the longest quote so the layout never shifts as quotes
// of different lengths cycle through.
const longestQuote = quotes.reduce((a, b) => (b.length > a.length ? b : a), "");

const TYPE_MS = 38; // per-char typing speed
const ERASE_MS = 18; // per-char erasing speed (snappier)
const HOLD_MS = 2400; // pause on the fully-typed quote
const GAP_MS = 500; // pause before the next quote types in

export default function TerminalQuote() {
  const [display, setDisplay] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Respect reduced motion: show a single static quote, no cycling.
    if (reduced) {
      setDisplay(quotes[Math.floor(Math.random() * quotes.length)]);
      return;
    }

    let index = Math.floor(Math.random() * quotes.length);
    let phase: "typing" | "holding" | "erasing" = "typing";
    let char = 0;

    const tick = () => {
      const current = quotes[index];

      if (phase === "typing") {
        char += 1;
        setDisplay(current.slice(0, char));
        if (char >= current.length) {
          phase = "holding";
          timer.current = setTimeout(tick, HOLD_MS);
        } else {
          timer.current = setTimeout(tick, TYPE_MS);
        }
      } else if (phase === "holding") {
        phase = "erasing";
        timer.current = setTimeout(tick, ERASE_MS);
      } else {
        char -= 1;
        setDisplay(current.slice(0, Math.max(0, char)));
        if (char <= 0) {
          index = (index + 1) % quotes.length;
          phase = "typing";
          timer.current = setTimeout(tick, GAP_MS);
        } else {
          timer.current = setTimeout(tick, ERASE_MS);
        }
      }
    };

    timer.current = setTimeout(tick, GAP_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

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

        {/* Invisible longest-quote sizer reserves a stable height; the typed
            text is overlaid on top so nothing below shifts as quotes cycle. */}
        <span style={{ position: "relative", lineHeight: 1.6, flex: 1 }}>
          <span aria-hidden="true" style={{ visibility: "hidden" }}>
            {longestQuote}
          </span>
          <span style={{ position: "absolute", inset: 0 }}>
            {display}
            <span className="tq-cursor" aria-hidden="true">
              ▋
            </span>
          </span>
        </span>
      </div>

      <style>{`
        .tq-cursor {
          margin-left: 1px;
          color: var(--color-accent);
          animation: tq-blink 1s steps(1) infinite;
        }
        @keyframes tq-blink {
          50% { opacity: 0; }
        }
      `}</style>
    </FadeIn>
  );
}
