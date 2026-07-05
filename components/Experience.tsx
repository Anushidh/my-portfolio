import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";
import TechBadge from "./TechBadge";

interface ExperienceItem {
  date: string;
  role: string;
  org: string;
  location: string;
  context: string;
  stack: string[];
  bullets: string[];
  type: "work" | "learning";
}

const experiences: ExperienceItem[] = [
  {
    date: "Jan 2026 – Jun 2026",
    role: "MERN Stack Developer",
    org: "Accorelate",
    location: "Remote",
    context: "AI-powered billing & accounting platform built for India's MSMEs and SMEs",
    stack: ["React.js", "Node.js", "Fastify", "TypeScript", "PostgreSQL"],
    bullets: [
      "Developing and maintaining features for a voice-enabled, AI-powered billing and accounting platform targeting India's MSME and SME segment.",
      "Building responsive React.js frontend components with TypeScript, enabling GST-compliant invoicing, cash flow tracking, and inventory management modules.",
      "Designing and integrating RESTful APIs using Node.js and Fastify to support real-time financial data processing and smart reminders.",
      "Collaborating on a scalable backend architecture to handle multi-role users including retailers, freelancers, manufacturers, and wholesalers.",
      "Contributing to features such as udhaar (credit) tracking, team expense management, and compliance workflows aligned with Indian GST standards.",
    ],
    type: "work",
  },
  {
    date: "Nov 2023 – Apr 2025",
    role: "Self-Taught ME(A)RN Stack Developer",
    org: "Brototype (Brocamp)",
    location: "Kochi, Kerala",
    context: "Kerala's No.1 Software Training Institute | 16-month intensive, project-based, self-learning program",
    stack: ["MongoDB", "Express.js", "React.js", "Angular", "NestJS", "Node.js", "TypeScript", "PostgreSQL"],
    bullets: [
      "Completed a 16-month intensive, self-paced MERN stack development program at Brototype — Kerala's leading software training institute partnered with NCVET, Skill India, and IT NASSCOM.",
      "Built and deployed 4 full-stack applications independently, covering e-commerce, social media, job portals, and authentication systems from scratch.",
      "Mastered the full JavaScript ecosystem including React.js, Angular, Node.js, Express.js, NestJS, MongoDB, TypeScript, Redux Toolkit, JWT, and cloud deployment.",
      "Applied industry-standard practices including clean architecture, REST API design, CI/CD pipelines, Docker, and NGINX configuration.",
    ],
    type: "learning",
  },
];

const typeColors: Record<ExperienceItem["type"], string> = {
  work: "#0F766E",
  learning: "#7C3AED",
};

const typeLabels: Record<ExperienceItem["type"], string> = {
  work: "Work",
  learning: "Training",
};

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "0 2rem 7rem",
      }}
    >
      <FadeIn>
        <div style={{ marginBottom: "3rem" }}>
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
            Experience
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
            Where I&apos;ve been
          </h2>
          <SectionDivider />
        </div>
      </FadeIn>

      <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
        {/* Timeline line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "8px",
            bottom: 0,
            width: "1px",
            backgroundColor: "var(--color-border)",
          }}
          aria-hidden="true"
        />

        {experiences.map((exp, i) => (
          <FadeIn key={`${exp.role}-${i}`} delay={0.06 * i}>
            <div style={{ position: "relative", marginBottom: "3.5rem" }}>
              {/* Timeline dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-1.625rem",
                  top: "6px",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  backgroundColor: "var(--color-surface)",
                  border: `2px solid ${typeColors[exp.type]}`,
                  zIndex: 1,
                }}
                aria-hidden="true"
              />

              {/* Date + type badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.4rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {exp.date}
                </span>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: typeColors[exp.type],
                    padding: "0.1rem 0.5rem",
                    border: `1px solid color-mix(in srgb, ${typeColors[exp.type]} 30%, transparent)`,
                    borderRadius: "100px",
                    backgroundColor: `color-mix(in srgb, ${typeColors[exp.type]} 8%, transparent)`,
                  }}
                >
                  {typeLabels[exp.type]}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--color-text-muted)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  {exp.location}
                </span>
              </div>

              {/* Role + org */}
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  marginBottom: "0.15rem",
                }}
              >
                {exp.role}
              </h3>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-accent)",
                  marginBottom: "0.4rem",
                  fontWeight: 500,
                }}
              >
                {exp.org}
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--color-text-muted)",
                  marginBottom: "1rem",
                  fontStyle: "italic",
                }}
              >
                {exp.context}
              </p>

              {/* Bullets */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {exp.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontSize: "0.9375rem",
                      lineHeight: 1.7,
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <span
                      style={{
                        color: "var(--color-accent)",
                        flexShrink: 0,
                        marginTop: "0.45rem",
                        fontSize: "0.4rem",
                      }}
                    >
                      ◆
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {exp.stack.map((tag) => (
                  <TechBadge key={tag} label={tag} />
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
