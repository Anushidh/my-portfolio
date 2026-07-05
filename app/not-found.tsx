import Link from "next/link";

export default function NotFound() {
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

        {/* 404 number */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}
        >
          404
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
          Page not found.
        </h1>

        {/* Divider */}
        <div
          style={{
            width: "2rem",
            height: "1px",
            backgroundColor: "var(--color-accent)",
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
          This page doesn&apos;t exist. Maybe the URL was mistyped, or
          the page was moved. Either way, there&apos;s nothing here.
        </p>

        {/* CTA */}
        <Link
          href="/"
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
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          ← Back home
        </Link>
      </div>
    </div>
  );
}
