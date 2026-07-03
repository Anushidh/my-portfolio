import FadeIn from "./FadeIn";
import SectionDivider from "./SectionDivider";
import { ArrowRight } from "lucide-react";

interface Article {
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  tags: string[];
  slug: string;
  status: "published" | "draft";
}

const articles: Article[] = [
  {
    title: "Designing Scalable Authentication in Node.js",
    excerpt:
      "A deep dive into building JWT authentication with refresh token rotation, session management, and the security tradeoffs that come with each approach.",
    readTime: "8 min read",
    date: "Coming soon",
    tags: ["Backend", "Security", "Node.js"],
    slug: "scalable-auth-nodejs",
    status: "draft",
  },
  {
    title: "Lessons Learned Building a Realtime Chat App",
    excerpt:
      "What I learned building ConnectSphere's chat system — covering Socket.IO room architecture, message delivery guarantees, and handling reconnection gracefully.",
    readTime: "6 min read",
    date: "Coming soon",
    tags: ["Realtime", "Socket.IO", "Architecture"],
    slug: "realtime-chat-lessons",
    status: "draft",
  },
  {
    title: "How I Structure Express Applications",
    excerpt:
      "My opinionated take on Express project structure — separating controllers, services, and repositories, and why the pattern scales better than route-heavy monoliths.",
    readTime: "5 min read",
    date: "Coming soon",
    tags: ["Backend", "Express", "Architecture"],
    slug: "express-structure",
    status: "draft",
  },
  {
    title: "Cursor-Based Pagination vs Offset: When It Matters",
    excerpt:
      "Offset pagination breaks in real-world conditions. Here's exactly when cursor-based pagination is worth the added complexity — and how to implement it cleanly.",
    readTime: "7 min read",
    date: "Coming soon",
    tags: ["Databases", "Performance", "API Design"],
    slug: "cursor-vs-offset-pagination",
    status: "draft",
  },
  {
    title: "MongoDB Indexing Strategies for Production Apps",
    excerpt:
      "How I think about indexing: compound indexes, covered queries, and the queries you should always explain() before shipping to production.",
    readTime: "9 min read",
    date: "Coming soon",
    tags: ["MongoDB", "Performance", "Databases"],
    slug: "mongodb-indexing",
    status: "draft",
  },
];

function ArticleCard({ article }: { article: Article }) {
  return (
    <article
      style={{
        padding: "2rem 0",
        borderBottom: "1px solid var(--color-border)",
        cursor: article.status === "published" ? "pointer" : "default",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          marginBottom: "0.75rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            alignItems: "center",
          }}
        >
          {article.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "0.8125rem",
              color: "var(--color-text-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {article.readTime}
          </span>
          {article.status === "draft" && (
            <span
              style={{
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                padding: "0.1rem 0.45rem",
                border: "1px solid var(--color-border)",
                borderRadius: "4px",
              }}
            >
              Draft
            </span>
          )}
        </div>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "1.3125rem",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          lineHeight: 1.25,
          marginBottom: "0.625rem",
          color: "var(--color-text-primary)",
        }}
      >
        {article.title}
      </h3>

      <p
        style={{
          fontSize: "0.9375rem",
          lineHeight: 1.7,
          color: "var(--color-text-secondary)",
        }}
      >
        {article.excerpt}
      </p>
    </article>
  );
}

export default function Writing() {
  return (
    <section
      id="writing"
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
            Writing
          </p>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.75rem, 4vw, 2.625rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "0.75rem",
            }}
          >
            Thoughts on engineering
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "var(--color-text-secondary)",
              lineHeight: 1.7,
              maxWidth: "540px",
              marginBottom: "1.5rem",
            }}
          >
            I write about backend architecture, frontend patterns, and the
            practical decisions behind building scalable software.
          </p>
          <SectionDivider />
        </div>
      </FadeIn>

      <div>
        {articles.map((article, i) => (
          <FadeIn key={article.slug} delay={0.06 * i}>
            <ArticleCard article={article} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
