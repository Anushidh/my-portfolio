"use client";

import { useEffect, useState } from "react";
import LoaderMark from "./Loader";

// Initial-load splash. Rendered visible on first paint (SSR), then fades out
// once the page has loaded (with a small minimum display time so the animation
// is actually seen), and unmounts itself.
export default function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const MIN_VISIBLE = 900; // ms — ensure the loader is seen, not a flash
    const FADE = 450; // ms — matches the CSS transition below
    const start = performance.now();
    let fadeTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      const wait = Math.max(0, MIN_VISIBLE - (performance.now() - start));
      fadeTimer = setTimeout(() => {
        setHidden(true);
        removeTimer = setTimeout(() => setRemoved(true), FADE);
      }, wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => {
      window.removeEventListener("load", finish);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10001,
        backgroundColor: "var(--color-background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.75rem",
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transition: "opacity 0.45s ease",
      }}
    >
      <LoaderMark />
    </div>
  );
}
