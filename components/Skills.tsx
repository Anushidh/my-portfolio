import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";

const skillCategories = [
  {
    category: "Frontend",
    skills: [
      "React",
      "Angular",
      "TypeScript",
      "JavaScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Backend",
    skills: [
      "Node.js",
      "Express",
      "NestJS",
      "REST APIs",
      "GraphQL",
      "Socket.IO",
      "JWT Auth",
      "OAuth 2.0",
    ],
  },
  {
    category: "Databases",
    skills: [
      "MongoDB",
      "Mongoose",
      "Redis",
      "PostgreSQL",
      "Aggregation Pipelines",
      "Indexing",
    ],
  },
  {
    category: "DevOps",
    skills: [
      "Git",
      "GitHub Actions",
      "Docker",
      "Vercel",
      "Railway",
      "Nginx",
      "Linux",
    ],
  },
  {
    category: "Architecture",
    skills: [
      "Microservices",
      "MVC Pattern",
      "Repository Pattern",
      "Event-Driven",
      "Caching Strategies",
      "API Design",
    ],
  },
  {
    category: "Tools",
    skills: [
      "VS Code",
      "Postman",
      "Cloudinary",
      "Razorpay",
      "Figma",
      "Jira",
      "Notion",
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
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
            Skills
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
            What I work with
          </h2>
          <SectionDivider />
        </div>
      </FadeIn>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "2px",
          backgroundColor: "var(--color-border)",
          border: "1px solid var(--color-border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {skillCategories.map((cat, i) => (
          <FadeIn key={cat.category} delay={0.05 * i}>
            <div
              style={{
                padding: "1.75rem 2rem",
                backgroundColor: "var(--color-surface)",
                height: "100%",
              }}
            >
              <h3
                style={{
                  fontSize: "0.75rem",
                  fontFamily: "var(--font-mono)",
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                }}
              >
                {cat.category}
              </h3>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
              >
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                      lineHeight: 1.6,
                    }}
                  >
                    {skill}
                    <span
                      style={{
                        color: "var(--color-border)",
                        marginLeft: "0.5rem",
                      }}
                    >
                      ·
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
