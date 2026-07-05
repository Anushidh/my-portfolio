import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";
import { Mail, FileText } from "lucide-react";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const contactLinks = [
  {
    label: "Email",
    value: "anushidh101@gmail.com",
    href: "mailto:anushidh101@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/anushidh",
    href: "https://github.com/anushidh",
    icon: GithubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/anushidh-a-p",
    href: "https://www.linkedin.com/in/anushidh-a-p-9a4367326",
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: "/resume.pdf",
    icon: FileText,
    external: true,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
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
            maxWidth: "560px",
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1px",
          backgroundColor: "var(--color-border)",
          border: "1px solid var(--color-border)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        {contactLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <FadeIn key={link.label} delay={0.05 * i}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="contact-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.5rem 1.75rem",
                  backgroundColor: "var(--color-surface)",
                  textDecoration: "none",
                  height: "100%",
                }}
              >
                <span
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    backgroundColor: "color-mix(in srgb, var(--color-accent) 8%, transparent)",
                    border: "1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: "var(--color-accent)",
                  }}
                >
                  <Icon size={16} />
                </span>
                <div>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "var(--font-mono)",
                      color: "var(--color-text-muted)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      marginBottom: "0.15rem",
                    }}
                  >
                    {link.label}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: "var(--color-text-primary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {link.value}
                  </p>
                </div>
              </a>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
