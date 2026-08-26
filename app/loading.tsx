import LoaderMark from "@/components/Loader";

// Route-level loading fallback (App Router). Shown while a route segment
// performs async server work. Static pages render instantly, so this only
// appears for routes that actually suspend.
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "var(--color-background)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.75rem",
      }}
    >
      <LoaderMark />
    </div>
  );
}
