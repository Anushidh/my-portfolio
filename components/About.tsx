import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";

export default function About() {
  return (
    <section
      id="about"
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
            About
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
            The story behind the work
          </h2>
          <SectionDivider />
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
            }}
          >
            I stumbled into software through curiosity and never really stopped.
            What began as tinkering with scripts grew into a genuine interest in
            how systems are designed — how data flows, how services scale, how
            small architectural decisions compound over time. On the backend I
            think in layers: clean separation, maintainable code, schemas that
            survive requirement changes. On the frontend I care about feel as
            much as function — the spacing, the transitions, whether a component
            communicates its intent without explanation. I believe good
            engineering and good UX thinking are the same discipline, just
            applied at different levels of the stack.
          </p>
        </FadeIn>
    </section>
  );
}
