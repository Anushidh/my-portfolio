interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.25rem 0.625rem",
        fontSize: "0.75rem",
        fontFamily: "var(--font-mono)",
        color: "var(--color-text-secondary)",
        backgroundColor: "var(--color-background)",
        border: "1px solid var(--color-border)",
        borderRadius: "6px",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}
