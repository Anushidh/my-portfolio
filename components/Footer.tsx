export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        padding: "3rem 2rem",
        marginTop: "7rem",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--color-text-muted)",
          }}
        >
          Designed &amp; Built by{" "}
          <span style={{ color: "var(--color-text-secondary)" }}>Anushidh</span>
        </p>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--color-text-muted)",
          }}
        >
          Next.js &middot; TypeScript &middot; Tailwind CSS &middot; Deployed on
          Vercel
        </p>
      </div>
    </footer>
  );
}
