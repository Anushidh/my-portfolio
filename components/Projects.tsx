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
  github: string;
  demo?: string;
  accentColor?: string;
}

const projects: Project[] = [
  {
    title: "Pulse Commerce",
    tagline: "Modern full-stack e-commerce platform",
    description:
      "A production-ready e-commerce platform built to handle real-world complexity — from multi-tier authentication to real-time inventory management and order tracking.",
    stack: [
      "React",
      "TypeScript",
      "Express",
      "MongoDB",
      "JWT",
      "Redis",
      "Cloudinary",
      "Razorpay",
    ],
    problem:
      "Most e-commerce tutorials stop at a simple product list and checkout. I wanted to build something that reflected what a real platform needs: inventory that tracks across concurrent purchases, coupons with usage limits, a wallet system that handles refunds, and an admin dashboard that gives operators actual insight into the business.",
    architecture:
      "The backend follows a layered service architecture — controllers handle request validation and routing, services contain business logic, and repositories abstract the database layer. Redis is used for session caching and rate limiting, reducing database read pressure significantly on high-traffic routes like the product catalog and user auth flow. Cloudinary handles all media transformations server-side before storage, keeping the client bundle lean.",
    challenges:
      "The hardest part was building the inventory reservation system. Between a user adding an item to cart and completing checkout, stock can be reserved by multiple concurrent sessions. I solved this with optimistic locking in MongoDB — using version fields to detect and retry conflicts — combined with a Redis-backed TTL for cart reservations that automatically releases held inventory if checkout isn't completed.",
    keyFeatures: [
      "JWT authentication with refresh token rotation",
      "Advanced product catalog with multi-faceted filtering",
      "Wishlist, cart, and session persistence",
      "Coupon engine with usage limits and expiry",
      "Wallet system with refund workflows",
      "Real-time inventory management with conflict resolution",
      "Admin dashboard with sales analytics",
      "Order tracking with status transitions",
      "PDF invoice generation",
      "Comprehensive review and rating system",
      "Responsive across all device sizes",
    ],
    lessons:
      "I learned that payment integration is as much about failure handling as success handling. Razorpay's webhook system needed idempotency keys, retry logic, and careful state management to avoid double-processing. Building that correctly the first time made the rest of the payment flow much simpler.",
    metrics: [
      { label: "API endpoints", value: "60+" },
      { label: "Database collections", value: "12" },
      { label: "Auth layers", value: "3" },
    ],
    github: "https://github.com/anushidh/pulse-commerce",
    demo: "https://pulse-commerce.vercel.app",
    accentColor: "#0F766E",
  },
  {
    title: "CareerHub",
    tagline: "Modern job portal with role-based access",
    description:
      "A full-featured job portal connecting candidates and employers, with separate dashboards, resume management, and a notification system designed for real-world hiring workflows.",
    stack: [
      "React",
      "TypeScript",
      "Express",
      "MongoDB",
      "JWT",
      "Cloudinary",
      "Redis",
    ],
    problem:
      "Existing job portals often treat employer and candidate experiences as afterthoughts of the same interface. I wanted to build something where each role gets a genuinely different, purpose-built experience — employers managing job posts and reviewing pipelines, candidates tracking applications and saving opportunities.",
    architecture:
      "The API is structured around resource-based routing with role-aware middleware. A shared authentication layer issues different JWT claims based on role (candidate, employer, admin), and each route handler performs role validation before any business logic runs. State management on the frontend uses a combination of React Query for server state and Zustand for local UI state — keeping them cleanly separated prevents the data-fetching logic from leaking into component state.",
    challenges:
      "Pagination at scale was more nuanced than I expected. Offset-based pagination breaks under concurrent data changes — items shift between pages as new listings are added. I implemented cursor-based pagination for the main job feed, using a composite cursor of timestamp and ID to maintain stable ordering even as new jobs are posted during a browsing session.",
    keyFeatures: [
      "Dual-role JWT authentication (candidate / employer)",
      "Employer dashboard: post management, applicant pipeline",
      "Candidate dashboard: application tracker, saved jobs",
      "Resume upload and cloud storage with Cloudinary",
      "Full-text job search with filters",
      "Cursor-based pagination for stable browsing",
      "Company profile management",
      "In-app notification system",
      "Admin panel for platform oversight",
    ],
    lessons:
      "State management decisions made early have long tails. Mixing server state with local UI state in the same store created subtle synchronization bugs that were hard to trace. Separating them — React Query for anything from the API, Zustand for local-only UI — simplified the entire frontend significantly.",
    metrics: [
      { label: "User roles", value: "3" },
      { label: "API endpoints", value: "45+" },
      { label: "Filter dimensions", value: "8" },
    ],
    github: "https://github.com/anushidh/careerhub",
    demo: "https://careerhub-portal.vercel.app",
    accentColor: "#0F766E",
  },
  {
    title: "ConnectSphere",
    tagline: "Modern social media platform with realtime communication",
    description:
      "A full-featured social platform built with Angular and Node.js, featuring realtime chat, stories, a notification feed, and a rich content system — all designed around performance and low-latency communication.",
    stack: [
      "Angular",
      "TypeScript",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "JWT",
      "Cloudinary",
    ],
    problem:
      "I wanted to understand what it takes to build the realtime layer of a social platform correctly — not just making WebSockets work, but handling reconnection, presence, message delivery guarantees, and notification fanout at a reasonable scale. Most tutorials show a basic chat room; this project goes much deeper.",
    architecture:
      "The realtime layer uses Socket.IO with room-based isolation — each user joins a personal room on authentication, and direct messages are routed through these rooms. Notifications are emitted server-side when relevant events occur (like a follow, comment, or mention) and consumed client-side through a persistent socket connection. The Angular frontend uses RxJS observables to subscribe to socket events and feed them into the UI reactively, avoiding manual DOM manipulation entirely.",
    challenges:
      "Image optimization for social media content is deceptively complex. Profile pictures, post images, and story thumbnails all need different dimensions and quality settings. I built a server-side transformation pipeline using Cloudinary's transformation API — generating multiple variants on upload and storing only the transformation parameters, not the variants themselves. This kept storage costs low while keeping render quality high.",
    keyFeatures: [
      "JWT authentication with persistent sessions",
      "Posts with likes, comments, and nested replies",
      "Ephemeral stories with 24-hour expiry",
      "Follow/unfollow system with feed personalization",
      "Realtime one-to-one chat via Socket.IO",
      "Realtime notification system with presence indicators",
      "Infinite scroll feed with intersection observer",
      "Profile customization and bio management",
      "Media upload with server-side transformation",
      "Bookmarks and content collections",
      "@mention system in posts and comments",
    ],
    lessons:
      "Realtime systems surface race conditions that synchronous code hides completely. A user could receive a notification, click it, and navigate to content that hasn't fully loaded yet. I had to build optimistic UI patterns carefully, ensuring the frontend always showed a loading state rather than an empty or stale view during those brief windows.",
    metrics: [
      { label: "Realtime events", value: "12 types" },
      { label: "Socket rooms", value: "Per-user" },
      { label: "Media variants", value: "Auto-generated" },
    ],
    github: "https://github.com/anushidh/connectsphere",
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
  return (
    <article
      style={{
        borderTop: "1px solid var(--color-border)",
        paddingTop: "4rem",
        paddingBottom: "4rem",
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

      {/* Prose sections */}
      {[
        { heading: "The Problem", content: project.problem },
        { heading: "Architecture", content: project.architecture },
        { heading: "Challenges", content: project.challenges },
        { heading: "Lessons Learned", content: project.lessons },
      ].map((section, i) => (
        <FadeIn key={section.heading} delay={0.05 * (i + 2)}>
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
              {section.heading}
            </h4>
            <p
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.8,
                color: "var(--color-text-secondary)",
              }}
            >
              {section.content}
            </p>
          </div>
        </FadeIn>
      ))}

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
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
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
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
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
