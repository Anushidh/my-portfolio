"use client";

import { useState, useRef, useEffect } from "react";
import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";
import TechBadge from "./TechBadge";
import { ExternalLink } from "lucide-react";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

interface ProjectMetric {
  label: string;
  value: string;
}

interface Project {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  problem: string;
  architecture: string;
  challenges: string;
  keyFeatures: string[];
  lessons: string;
  metrics: ProjectMetric[];
  github?: string;
  githubRepos?: { label: string; href: string }[];
  demo?: string;
  accentColor?: string;
}

const projects: Project[] = [
  {
    title: "Wearhaus",
    tagline: "Full stack e-commerce platform for a clothing store",
    description:
      "A production-ready e-commerce platform covering the full shopping lifecycle — browse, cart, checkout, payments, order tracking, returns, and an admin dashboard with analytics. Built with a modern TypeScript stack and designed to handle real-world edge cases correctly.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Express",
      "MongoDB",
      "Redis",
      "JWT",
      "Razorpay",
      "Cloudinary",
      "Zustand",
      "TanStack Query",
    ],
    problem:
      "Most e-commerce tutorials stop at a simple product list and checkout. I wanted to build something that reflected what a real platform needs: atomic order placement across multiple resources, a wallet system that handles refunds and top-ups, coupons with race-condition-safe usage limits, and an admin dashboard that gives operators actual insight into the business.",
    architecture:
      "The backend follows an MVC structure — routes, controllers, middleware, validators, and models — keeping each layer's responsibility clear. The frontend is organized into feature modules (auth, products, cart, orders, admin), with a shared layer for the API client, stores, and reusable components. Server state is managed by TanStack Query and local UI state by Zustand, keeping data-fetching logic out of components entirely.",
    challenges:
      "Order placement runs inside a single MongoDB transaction — stock, coupon usage, wallet debit, and cart clearing either all commit or all roll back, with no partial state ever persisted. All monetary arithmetic uses Decimal.js throughout to avoid floating-point drift in discounts, totals, tax, and wallet calculations. On the frontend, the axios interceptor handles concurrent 401s with a queue and an in-flight lock so only one token refresh fires regardless of how many requests fail simultaneously.",
    keyFeatures: [
      "JWT access tokens (15 min) + HttpOnly cookie refresh rotation via Redis",
      "Google OAuth 2.0 with existing-account linking",
      "Atomic order placement with MongoDB transactions",
      "Three payment methods: Razorpay, Wallet, Cash on Delivery",
      "Razorpay payment retry for failed/pending orders",
      "Wallet with top-up, refunds, and idempotency checks",
      "Coupon engine with global + per-user usage limits",
      "Product + category offer system with best-offer selection",
      "Full-text search with multi-faceted filters",
      "Order cancellation and 15-day return window enforcement",
      "PDF invoice generation (PDFKit) emailed to customer",
      "Admin dashboard — revenue stats, charts, top products",
      "Stale order cleanup cron job (auto-cancel unpaid Razorpay orders)",
      "Cart abandonment detection with reminder emails",
      "Referral system with atomic wallet reward on first delivery",
    ],
    lessons:
      "The concurrent 401 case in the axios interceptor — queue and in-flight lock — was the most subtle piece to get right. And Decimal.js needs to be in from day one; floating-point drift in financial calculations is silent and painful to untangle after the fact.",
    metrics: [
      { label: "API endpoints", value: "60+" },
      { label: "DB collections", value: "12" },
      { label: "Payment methods", value: "3" },
    ],
    githubRepos: [
      { label: "Frontend", href: "https://github.com/Anushidh/E-COMMERCE-FRONTEND" },
      { label: "Backend",  href: "https://github.com/Anushidh/E-COMMERCE-BACKEND" },
    ],
    demo: "https://e-commerce-frontend-theta-lyart.vercel.app/",
    accentColor: "#0F766E",
  },
  {
    title: "HireFlow",
    tagline: "Full-stack job platform with AI-powered hiring tools",
    description:
      "A production-grade job marketplace connecting job seekers and employers, with AI-assisted cover letters, resume parsing, job match scoring, tiered subscriptions, real-time messaging, and a full admin panel.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Express",
      "MongoDB",
      "Redis",
      "Socket.IO",
      "Razorpay",
      "Groq API",
      "Zustand",
      "TanStack Query",
    ],
    problem:
      "Job platforms tend to be either too simple (just listings and apply buttons) or too bloated. I wanted to build the full lifecycle correctly — post moderation, application status workflows, subscription-gated features, AI tooling that's actually useful, and cron jobs that handle the boring-but-critical stuff like auto-expiring subscriptions and sending job alerts.",
    architecture:
      "The backend uses a Controllers → Services → Repositories → Models layered structure with manual dependency injection wired in a single container.ts — no DI framework, just explicit construction that keeps the entire dependency graph visible in one file. The frontend is split into lazy-loaded portals per role (employee, employer, admin). TanStack Query owns all server state, Zustand handles auth and short-lived UI state like AI drafts. Route guards enforce role-based access at the router level.",
    challenges:
      "Subscription entitlement enforcement was the trickiest design problem — hardcoding feature checks across controllers causes drift fast. Solved with a requireSubscription(feature) middleware factory that reads the user's plan from Redis-cached subscription data, keeping all entitlement logic in one place. Socket.IO rooms are keyed by userId rather than socket ID so all open tabs for a user receive the same notifications without duplication logic in controllers.",
    keyFeatures: [
      "JWT access + refresh rotation with Redis-backed revocation",
      "Google and LinkedIn OAuth with role selection",
      "OTP-gated registration — user row only created after verification",
      "Four subscription tiers with feature entitlements via middleware",
      "Razorpay billing with PDF invoice generation",
      "AI cover letter generation per job posting",
      "AI resume parsing — PDF upload auto-fills profile fields",
      "AI job match scoring (employee ↔ job, employer ↔ applicant)",
      "AI job description generator for employers",
      "Real-time messaging with typing indicators",
      "Job alerts — daily/weekly email digests from saved filters",
      "Job analytics — views, clicks, applications with daily charts",
      "Cron jobs: job alerts, subscription expiry, auto-close past-deadline jobs",
      "Admin panel — user management, job moderation, revenue tracking",
    ],
    lessons:
      "Manual dependency injection via a container.ts file is underrated. Having the entire wiring explicit in one place makes the dependency graph obvious and testing straightforward — no magic, no decorators, no surprises. I also learned that subscription entitlement logic needs to live in middleware, not scattered across controllers, or it becomes impossible to audit what each plan actually unlocks.",
    metrics: [
      { label: "User roles", value: "3" },
      { label: "DB models", value: "13" },
      { label: "Subscription tiers", value: "4" },
    ],
    githubRepos: [
      { label: "Frontend", href: "https://github.com/Anushidh/JOB-PLATFORM-FRONTEND" },
      { label: "Backend",  href: "https://github.com/Anushidh/JOB-PLATFORM-BACKEND" },
    ],
    demo: "https://job-platform-frontend-phi.vercel.app",
    accentColor: "#0F766E",
  },
  {
    title: "ConnectSphere",
    tagline: "Full stack social media platform with real-time messaging",
    description:
      "A full-featured social platform built with Angular and NestJS, covering the complete social graph — posts, stories, nested comments, real-time chat, notifications, and a private account follow-request flow.",
    stack: [
      "Angular",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "Redis",
      "Socket.IO",
      "JWT",
      "Cloudinary",
      "Passport.js",
    ],
    problem:
      "I wanted to build a social platform that handled the parts most tutorials skip — private accounts with approval flows, token refresh race conditions across parallel requests, WebSocket authentication without standard Passport guards, and real-time presence that works correctly across multiple tabs.",
    architecture:
      "The NestJS backend follows a layered structure — controllers handle HTTP, services contain business logic, and repositories handle data access via TypeORM. PostgreSQL is the primary store. Redis handles OTP storage with TTL (unverified registrations expire automatically), refresh token rotation, and session management. Real-time features use Socket.IO with separate namespaces for notifications and chat, with users joining personal rooms for targeted delivery.",
    challenges:
      "The token refresh race condition is a classic social media problem — multiple in-flight requests all returning 401 simultaneously, each trying to refresh independently. Solved by serialising the refresh in the interceptor so only one fires and the rest wait. Real-time presence across multiple tabs is another one: naive socket-per-tab approaches double-count online status, so presence is tracked per-user rather than per-connection. Cross-domain HttpOnly cookies between Vercel and Render also needed careful SameSite=none + CORS credentials configuration to work correctly.",
    keyFeatures: [
      "JWT access tokens + HttpOnly cookie refresh rotation via Redis",
      "Google and Facebook OAuth",
      "OTP email verification with Redis TTL (no unverified DB rows)",
      "Follow / unfollow with private account approval flow",
      "Block / unblock users",
      "Posts with images, hashtags, likes, bookmarks, reposts",
      "Nested comments (replies to comments)",
      "24-hour ephemeral stories with view tracking",
      "Real-time one-to-one chat with typing indicators and read receipts",
      "Real-time notifications for likes, comments, follows, mentions",
      "Online presence with multi-tab support",
      "Search users and posts, hashtag pages, trending hashtags",
      "Swagger API docs (60+ endpoints)",
    ],
    lessons:
      "Private account logic needs to be enforced at the service layer, not just the UI — otherwise a determined user can hit the API directly and see posts they shouldn't. Notification fanout also compounds quickly: a post that gets 500 likes means 500 individual socket emits unless you batch or debounce. And Angular route ordering matters more than it looks — static routes like /post/create must come before dynamic ones like /post/:id, or Angular matches 'create' as an ID and loads the wrong component entirely.",
    metrics: [
      { label: "API endpoints", value: "60+" },
      { label: "Socket namespaces", value: "2" },
      { label: "Auth providers", value: "3" },
    ],
    githubRepos: [
      { label: "Frontend", href: "https://github.com/Anushidh/SOCIAL-MEDIA-FRONTEND" },
      { label: "Backend",  href: "https://github.com/Anushidh/SOCIAL-MEDIA-BACKEND" },
    ],
    demo: "https://social-media-frontend-six-chi.vercel.app",
    accentColor: "#0F766E",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const tabs = [
    { key: "architecture", label: "Architecture", content: project.architecture },
    { key: "challenges",   label: "Challenges",   content: project.challenges },
    { key: "lessons",      label: "Lessons",       content: project.lessons },
  ] as const;

  const [activeTab, setActiveTab] = useState<"architecture" | "challenges" | "lessons">("architecture");
  const activeContent = tabs.find((t) => t.key === activeTab)!.content;
  const [repoOpen, setRepoOpen] = useState(false);
  const repoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!repoOpen) return;
    function handleOutside(e: MouseEvent) {
      if (repoRef.current && !repoRef.current.contains(e.target as Node)) {
        setRepoOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [repoOpen]);
  return (
    <article
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
        paddingLeft: "1.25rem",
        borderLeft: "2px solid transparent",
        transition: "border-color 0.25s ease, padding-left 0.25s ease",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--color-accent)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
      }}
    >
      {/* Project number + title */}
      <FadeIn>
        <div style={{ marginBottom: "2rem" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-text-muted)",
              letterSpacing: "0.08em",
              marginBottom: "0.75rem",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.625rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "0.5rem",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-muted)",
              fontStyle: "italic",
              fontFamily: "var(--font-heading)",
            }}
          >
            {project.tagline}
          </p>
        </div>
      </FadeIn>

      {/* Description */}
      <FadeIn delay={0.05}>
        <p
          style={{
            fontSize: "1.0625rem",
            lineHeight: 1.8,
            color: "var(--color-text-secondary)",
            marginBottom: "2.5rem",
          }}
        >
          {project.description}
        </p>
      </FadeIn>

      {/* Stack */}
      <FadeIn delay={0.08}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "3rem",
          }}
        >
          {project.stack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>
      </FadeIn>

      {/* Metrics */}
      <FadeIn delay={0.1}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
            backgroundColor: "var(--color-border)",
            border: "1px solid var(--color-border)",
            borderRadius: "10px",
            overflow: "hidden",
            marginBottom: "3rem",
          }}
        >
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              style={{
                padding: "1.25rem 1.5rem",
                backgroundColor: "var(--color-surface)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.75rem",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  color: "var(--color-accent)",
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                }}
              >
                {metric.value}
              </p>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* The Problem */}
      <FadeIn delay={0.12}>
        <div style={{ marginBottom: "2rem" }}>
          <h4
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            The Problem
          </h4>
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            {project.problem}
          </p>
        </div>
      </FadeIn>

      {/* Tabbed: Architecture / Challenges / Lessons */}
      <FadeIn delay={0.16}>
        <div style={{ marginBottom: "2.5rem" }}>
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              gap: "0",
              borderBottom: "1px solid var(--color-border)",
              marginBottom: "1.5rem",
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "0.75rem",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    background: "none",
                    border: "none",
                    borderBottom: isActive
                      ? "2px solid var(--color-accent)"
                      : "2px solid transparent",
                    color: isActive
                      ? "var(--color-accent)"
                      : "var(--color-text-muted)",
                    cursor: "pointer",
                    marginBottom: "-1px",
                    transition: "color 0.15s ease, border-color 0.15s ease",
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab content */}
          <p
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.8,
              color: "var(--color-text-secondary)",
            }}
          >
            {activeContent}
          </p>
        </div>
      </FadeIn>

      {/* Key Features */}
      <FadeIn delay={0.2}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h4
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-mono)",
              color: "var(--color-accent)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            Key Features
          </h4>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "0.5rem",
              listStyle: "none",
            }}
          >
            {project.keyFeatures.map((feature) => (
              <li
                key={feature}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.625rem",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}
              >
                <span
                  style={{
                    color: "var(--color-accent)",
                    marginTop: "0.35rem",
                    flexShrink: 0,
                    fontSize: "0.5rem",
                  }}
                >
                  ◆
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>

      {/* Links */}
      <FadeIn delay={0.25}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>

          {/* Single github repo */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 1.1rem",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              <GithubIcon size={14} />
              View Code
            </a>
          )}

          {/* Split repos — dropdown */}
          {project.githubRepos && (
            <div ref={repoRef} style={{ position: "relative" }}>
              <button
                onClick={() => setRepoOpen((o) => !o)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.45rem",
                  padding: "0.55rem 1.1rem",
                  fontSize: "0.875rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <GithubIcon size={14} />
                View Code
                <svg
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{
                    transform: repoOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.15s ease",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {repoOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 0.4rem)",
                    left: 0,
                    minWidth: "160px",
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    zIndex: 10,
                  }}
                >
                  {project.githubRepos.map((repo, i) => (
                    <a
                      key={repo.label}
                      href={repo.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setRepoOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        padding: "0.65rem 1rem",
                        fontSize: "0.875rem",
                        fontFamily: "var(--font-body)",
                        color: "var(--color-text-secondary)",
                        textDecoration: "none",
                        borderBottom: i < project.githubRepos!.length - 1 ? "1px solid var(--color-border)" : "none",
                      }}
                    >
                      <GithubIcon size={13} />
                      {repo.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.55rem 1.1rem",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color: "#FFFFFF",
                backgroundColor: "var(--color-accent)",
                border: "1px solid var(--color-accent)",
                borderRadius: "8px",
                textDecoration: "none",
              }}
            >
              <ExternalLink size={14} strokeWidth={1.75} />
              Live Demo
            </a>
          )}
        </div>
      </FadeIn>
    </article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
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
            Projects
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
            Things I&apos;ve built
          </h2>
          <SectionDivider />
        </div>
      </FadeIn>

      <div>
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
