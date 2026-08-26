export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--color-border)",
        marginTop: "7rem",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "3rem 2rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
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
