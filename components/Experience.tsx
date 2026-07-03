import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";
import TechBadge from "./TechBadge";

interface ExperienceItem {
  date: string;
  role: string;
  org?: string;
  description: string;
  tags: string[];
  type: "work" | "project" | "learning" | "open-source";
}

const experiences: ExperienceItem[] = [
  {
    date: "2024 — Present",
    role: "Full Stack Developer",
    org: "Freelance & Personal Projects",
    description:
      "Designing and building full-stack applications end-to-end — from database schema design and API architecture to UI implementation and deployment. Focused on production-grade code quality, scalability, and clean developer experience.",
    tags: ["React", "Node.js", "TypeScript", "MongoDB", "Redis"],
    type: "work",
  },
  {
    date: "2024",
    role: "Pulse Commerce",
    org: "Personal Project",
    description:
      "Built a full-featured e-commerce platform with JWT auth, Redis caching, inventory management, Razorpay payments, and a comprehensive admin dashboard. Designed to handle concurrent purchase conflicts and real-world edge cases.",
    tags: ["React", "Express", "MongoDB", "Redis", "Razorpay"],
    type: "project",
  },
  {
    date: "2024",
    role: "CareerHub",
    org: "Personal Project",
    description:
      "Developed a dual-role job portal with separate employer and candidate dashboards, cursor-based pagination, full-text search, and a notification system. Built with a strong emphasis on API design and state management architecture.",
    tags: ["React", "TypeScript", "Express", "MongoDB"],
    type: "project",
  },
  {
    date: "2024",
    role: "ConnectSphere",
    org: "Personal Project",
    description:
      "Created a social media platform with realtime chat, stories, infinite scroll, and a Socket.IO notification system. First project using Angular at scale — learned a lot about reactive state and RxJS patterns.",
    tags: ["Angular", "Socket.IO", "Node.js", "MongoDB"],
    type: "project",
  },
  {
    date: "2023 — 2024",
    role: "Backend Engineering Deep Dive",
    description:
      "Self-directed study of systems design, distributed systems patterns, and backend architecture. Explored topics including database indexing, caching strategies, message queues, and horizontal scaling.",
    tags: ["Systems Design", "Databases", "Caching", "Architecture"],
    type: "learning",
  },
  {
    date: "2023",
    role: "Frontend Foundations",
    description:
      "Built the foundations in React, TypeScript, and modern JavaScript. Completed projects ranging from UI component libraries to data-fetching patterns and client-side state management.",
    tags: ["React", "TypeScript", "JavaScript", "CSS"],
    type: "learning",
  },
];

const typeColors: Record<ExperienceItem["type"], string> = {
  work: "#0F766E",
  project: "#0369A1",
  learning: "#7C3AED",
  "open-source": "#B45309",
};

const typeLabels: Record<ExperienceItem["type"], string> = {
  work: "Work",
  project: "Project",
  learning: "Learning",
  "open-source": "Open Source",
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

      <div
        style={{
          position: "relative",
          paddingLeft: "1.5rem",
        }}
      >
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
            <div
              style={{
                position: "relative",
                marginBottom: "3rem",
                paddingBottom: i < experiences.length - 1 ? "0" : "0",
              }}
            >
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

              {/* Date + type */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.35rem",
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
              </div>

              {/* Role */}
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  marginBottom: exp.org ? "0.15rem" : "0.75rem",
                }}
              >
                {exp.role}
              </h3>

              {exp.org && (
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "var(--color-text-muted)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {exp.org}
                </p>
              )}

              {/* Description */}
              <p
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.75,
                  color: "var(--color-text-secondary)",
                  marginBottom: "1rem",
                }}
              >
                {exp.description}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {exp.tags.map((tag) => (
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
