import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";
import TerminalQuote from "./TerminalQuote";
import LocalTime from "./LocalTime";
import CopyEmailButton from "./CopyEmailButton";

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 2rem 3rem",
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
            Contact
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
            Let&apos;s talk
          </h2>
          <SectionDivider />
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.8,
            color: "var(--color-text-secondary)",
            maxWidth: "1100px",
            marginBottom: "3rem",
          }}
        >
          I&apos;m currently open to full-time opportunities. If you&apos;re
          building something interesting and think I might be a good fit, I
          &apos;d love to hear about it. You can also reach out if you want to
          talk about software architecture, engineering challenges, or anything
          in between.
        </p>
      </FadeIn>

      <div style={{ marginBottom: "2rem" }}>
        <LocalTime />
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto", marginBottom: "2.5rem" }}>
        <FadeIn delay={0.1}>
          <CopyEmailButton />
        </FadeIn>
      </div>

      <div className="flex flex-col gap-6" style={{ marginTop: "2.5rem" }}>
        <TerminalQuote />
      </div>

    </section>
  );
}
