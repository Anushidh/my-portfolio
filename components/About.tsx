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

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.4rem",
        }}
      >
        <FadeIn delay={0.05}>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
            }}
          >
            I didn&apos;t plan to become a software engineer. I stumbled into it
            through curiosity — tinkering with small scripts, wondering how
            websites actually worked under the hood. That curiosity never left.
            What started as building simple static pages slowly grew into a deep
            interest in the full stack: how data flows, how systems talk to each
            other, how milliseconds of performance difference translate into real
            user experience.
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
            }}
          >
            Backend engineering feels like architecture to me. Every API route,
            every database schema, every caching decision is a small design
            choice that compounds over time. I&apos;ve grown to love the
            discipline of writing code that doesn&apos;t just work today, but is
            readable and maintainable six months from now — when the codebase is
            bigger, the team is different, and the requirements have evolved in
            ways nobody predicted.
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
            }}
          >
            On the frontend, I care deeply about the details. Not just making
            things work, but making them feel right. The spacing between
            elements. The timing of a transition. Whether a button communicates
            clearly what it does without a tooltip. I&apos;ve spent a lot of
            time with React and Angular, and I&apos;ve come to believe that good
            frontend architecture and good UX thinking are inseparable — you
            can&apos;t build one well without caring about the other.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
            }}
          >
            I&apos;m genuinely excited by scalable systems — how you design a
            service that handles ten users and a million users with the same
            codebase. I find myself thinking about caching strategies, queue
            architectures, and horizontal scaling even when I&apos;m working on
            smaller projects. These patterns matter, and understanding them early
            tends to save painful rewrites later.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.85,
              color: "var(--color-text-secondary)",
            }}
          >
            Outside of work, I read about systems design, contribute to personal
            projects that let me explore ideas I don&apos;t get to at work, and
            occasionally write about things I&apos;ve learned. I believe the
            best engineers are the ones who stay genuinely curious — not about
            chasing every new framework, but about understanding the principles
            underneath. That&apos;s what keeps the work interesting.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
