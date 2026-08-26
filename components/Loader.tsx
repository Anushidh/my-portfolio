// Presentational loader mark (no container, no client logic).
// Shared by the route-level loading.tsx fallback and the initial-load splash.
export default function LoaderMark() {
  return (
    <>
      {/* Monogram + orbiting arc */}
      <div
        style={{
          position: "relative",
          width: "96px",
          height: "96px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Rotating arc ring */}
        <svg
          className="loader-orbit"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          aria-hidden="true"
          style={{ position: "absolute", inset: 0 }}
        >
          <circle cx="48" cy="48" r="44" stroke="var(--color-border)" strokeWidth="1.5" />
          <circle
            cx="48"
            cy="48"
            r="44"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="70 210"
          />
        </svg>

        {/* Self-drawing "A" monogram */}
        <svg width="52" height="52" viewBox="0 0 100 100" fill="none" aria-hidden="true">
          <path
            className="loader-mono"
            d="M20 80 L50 20 L80 80 M33 56 L67 56"
            stroke="var(--color-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Mono caption with typing effect + blinking cursor */}
      <div
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8125rem",
          letterSpacing: "0.02em",
          color: "var(--color-text-muted)",
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ color: "var(--color-accent)", marginRight: "0.5rem" }}>&gt;_</span>
        <span className="loader-type">building the experience</span>
        <span className="loader-cursor" aria-hidden="true">▋</span>
      </div>

      <style>{`
        .loader-mono {
          stroke-dasharray: 170;
          stroke-dashoffset: 170;
          animation: loader-draw 2.4s ease-in-out infinite;
        }
        @keyframes loader-draw {
          0%   { stroke-dashoffset: 170; }
          45%  { stroke-dashoffset: 0; }
          70%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -170; }
        }

        .loader-orbit {
          animation: loader-spin 1.6s linear infinite;
          transform-origin: center;
        }
        @keyframes loader-spin {
          to { transform: rotate(360deg); }
        }

        .loader-type {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          max-width: 0;
          animation: loader-typing 2.4s steps(23, end) infinite;
        }
        @keyframes loader-typing {
          0%   { max-width: 0; }
          40%  { max-width: 23ch; }
          80%  { max-width: 23ch; }
          100% { max-width: 0; }
        }

        .loader-cursor {
          margin-left: 1px;
          color: var(--color-accent);
          animation: loader-blink 1s steps(1) infinite;
        }
        @keyframes loader-blink {
          50% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .loader-mono   { stroke-dashoffset: 0; animation: none; }
          .loader-orbit  { animation: none; }
          .loader-type   { max-width: 23ch; animation: none; }
          .loader-cursor { animation: none; }
        }
      `}</style>
    </>
  );
}
