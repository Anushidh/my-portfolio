import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";

export default function Philosophy() {
  return (
    <section
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "0 2rem 7rem",
      }}
    >
      <FadeIn>
        <div style={{ marginBottom: "2.5rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Philosophy
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.625rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "1.5rem",
            }}
          >
            How I think about software
          </h2>
          <SectionDivider />
        </div>
      </FadeIn>

      <div
        style={{
          borderLeft: "2px solid var(--color-border)",
          paddingLeft: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {[
          {
            heading: "Code is read more than it's written",
            body: "The most valuable thing you can do when writing code is make it obvious. Not clever, not dense — obvious. A future developer (often yourself) will read this code under pressure, and the kindness of clarity is worth more than the satisfaction of brevity.",
          },
          {
            heading: "Architecture should reflect the problem",
            body: "Over-engineering is just as harmful as under-engineering. I aim to choose architectures that fit the current problem while leaving room to grow. The best systems are designed with known constraints and honest uncertainty — not theoretical scale.",
          },
          {
            heading: "User-first interfaces",
            body: "Frontend decisions aren't just engineering decisions — they're UX decisions. Every state, every loading indicator, every error message is a choice about how the user experiences the software. I build interfaces with that awareness.",
          },
          {
            heading: "Performance is a feature",
            body: "Slow software is broken software. I care about response times, bundle sizes, and unnecessary re-renders not because benchmarks are interesting, but because they directly affect the experience of real people using the product.",
          },
          {
            heading: "Accessibility is non-negotiable",
            body: "The web was designed for everyone. Building accessible software isn't extra work — it's part of doing the job properly. Semantic HTML, keyboard navigation, and screen reader support belong in every production application.",
          },
          {
            heading: "Learning is continuous",
            body: "The technology landscape changes constantly, but the fundamentals — systems thinking, clean abstractions, honest tradeoffs — change slowly. I invest in both: staying current on the ecosystem while deepening my understanding of the principles underneath it.",
          },
        ].map((item, i) => (
          <FadeIn key={item.heading} delay={0.06 * i}>
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.1875rem",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  marginBottom: "0.5rem",
                  fontStyle: "italic",
                  color: "var(--color-text-primary)",
                }}
              >
                {item.heading}
              </h3>
              <p
                style={{
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  color: "var(--color-text-secondary)",
                }}
              >
                {item.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
