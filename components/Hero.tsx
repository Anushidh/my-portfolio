"use client";

import { motion } from "framer-motion";
import { FileText, Mail } from "lucide-react";

// Custom SVG icons for brands not in this lucide version
function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socialLinks = [
  {
    href: "/Anush_resume.pdf",
    label: "Resume",
    icon: FileText,
    external: true,
    isBrand: false,
  },
  {
    href: "https://github.com/Anushidh",
    label: "GitHub",
    icon: GithubIcon,
    external: true,
    isBrand: true,
  },
  {
    href: "https://www.linkedin.com/in/anushidh-a-p-9a4367326",
    label: "LinkedIn",
    icon: LinkedinIcon,
    external: true,
    isBrand: true,
  },
  {
    href: "mailto:anushidh101@gmail.com",
    label: "Email",
    icon: Mail,
    external: false,
    isBrand: false,
  },
];

export default function Hero() {
  return (
    <section
      style={{
        paddingTop: "140px",
        paddingBottom: "7rem",
        maxWidth: "760px",
        margin: "0 auto",
        padding: "140px 2rem 7rem",
      }}
    >
      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ marginBottom: "2.5rem" }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.8125rem",
            color: "var(--color-success)",
            fontFamily: "var(--font-body)",
            padding: "0.3rem 0.75rem",
            border: "1px solid color-mix(in srgb, var(--color-success) 25%, transparent)",
            borderRadius: "100px",
            backgroundColor: "color-mix(in srgb, var(--color-success) 6%, transparent)",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "var(--color-success)",
              display: "inline-block",
            }}
          />
          Available for Full-time Opportunities
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(2.75rem, 6vw, 4rem)",
          fontWeight: 400,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "var(--color-text-primary)",
          marginBottom: "1.5rem",
        }}
      >
        Hi, I&apos;m Anushidh.
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: "1.1875rem",
          lineHeight: 1.75,
          color: "var(--color-text-secondary)",
          maxWidth: "620px",
          marginBottom: "0.75rem",
        }}
      >
        I build scalable web applications with React, Angular, NestJS, Express,
        Fastify, TypeScript, MongoDB, and PostgreSQL.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontSize: "1.1875rem",
          lineHeight: 1.75,
          color: "var(--color-text-secondary)",
          maxWidth: "620px",
          marginBottom: "2.5rem",
        }}
      >
        I enjoy designing clean user experiences and building production-grade
        software that scales from MVPs to enterprise applications.
      </motion.p>

      {/* CTA Links */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {socialLinks.map((link, i) => {
          const Icon = link.icon;
          const isPrimary = i === 0;
          return (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: isPrimary ? "0.6rem 1.25rem" : "0.6rem 1rem",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                borderRadius: "8px",
                textDecoration: "none",
                transition: "opacity 0.2s ease, background-color 0.2s ease",
                ...(isPrimary
                  ? {
                      backgroundColor: "var(--color-accent)",
                      color: "#FFFFFF",
                      border: "1px solid var(--color-accent)",
                    }
                  : {
                      backgroundColor: "transparent",
                      color: "var(--color-text-secondary)",
                      border: "1px solid var(--color-border)",
                    }),
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
            >
              <Icon size={15} />
              {link.label}
            </a>
          );
        })}
      </motion.div>
    </section>
  );
}
