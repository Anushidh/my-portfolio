"use client";

import { useState, useEffect } from "react";
import FadeIn from "./FadeIn";

export default function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!time) return <div style={{ height: "40px" }} />; // Placeholder to prevent layout shift

  return (
    <FadeIn delay={0.3}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "var(--color-accent)",
            boxShadow: "0 0 8px var(--color-accent)",
          }}
        />
        <p style={{ fontSize: "1rem", color: "var(--color-text-secondary)", fontFamily: "var(--font-mono)" }}>
          Local time in India: <span style={{ color: "var(--color-text-primary)", fontWeight: 500 }}>{time}</span> &middot; Usually responds within 24 hours
        </p>
      </div>
    </FadeIn>
  );
}
