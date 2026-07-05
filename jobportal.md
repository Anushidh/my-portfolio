# HireFlow — Full-Stack Job Platform

A production-grade job marketplace connecting employees (job seekers) and employers, with AI-powered tools, real-time features, tiered subscriptions, and a full admin panel.

---

## Overview

HireFlow is a complete job platform built with a clean, layered architecture on both ends. It handles the full lifecycle — from job posting and applications to subscription billing and AI-assisted hiring — while keeping concerns well-separated throughout the codebase.

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express 4 |
| Database | MongoDB (Mongoose 8) |
| Cache & Sessions | Redis (ioredis) |
| Authentication | JWT (access + refresh), bcrypt |
| OAuth | Google OAuth 2.0, LinkedIn OAuth 2 |
| Real-time | Socket.IO 4 |
| File Storage | Cloudinary |
| File Handling | Multer |
| Payments | Razorpay |
| AI | Groq API (OpenAI-compatible SDK) |
| PDF | pdf-parse (parsing), pdfkit (generation) |
| Email | Nodemailer (SMTP) |
| Validation | Zod |
| Rate Limiting | express-rate-limit + rate-limit-redis |
| Scheduling | node-cron |
| Error Monitoring | Sentry |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build | Vite 8 + TypeScript 6 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Server State | TanStack Query v5 |
| Client State | Zustand v5 |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Real-time | socket.io-client |
| Animation | Framer Motion |
| Export | xlsx |

---

## Features

### Authentication & Access Control
- JWT with refresh token rotation — access tokens (15m), refresh tokens (7d) with Redis-backed revocation
- OTP-verified registration — user data held in Redis, account only created after email OTP confirmation
- Google and LinkedIn OAuth login with role selection at sign-in
- Three roles: **Employee**, **Employer**, **Admin** — fully separated portals and route guards

### Employee (Job Seeker) Portal
- Browse and search jobs with filters (type, location, salary, work mode, skills, experience level)
- Apply to jobs with resume + cover letter; withdraw applications; track status history
- Save jobs and receive job alerts based on custom keyword/filter sets (daily or weekly digest)
- AI cover letter generation for any job posting
- AI resume parsing — upload a PDF, auto-fill profile fields
- AI job match score — see how well a job matches your profile before applying
- Profile completion tracker with public employee profiles
- View who visited your profile (Premium)
- Real-time notifications and in-app messaging (Premium)
- Manage subscription and download invoices

### Employer Portal
- Post and manage job listings with full lifecycle control (pending → active → closed)
- View and manage all applications per job; update statuses (reviewing, shortlisted, rejected)
- AI job description generator — produce detailed JDs from a short prompt
- AI applicant match scoring — ranked match percentage per applicant per job
- Download applicant resumes (subscription-gated)
- Company profile management with logo upload
- Job analytics — views, clicks, applications with daily breakdown charts
- Dashboard analytics for overall hiring performance
- Real-time messaging with applicants (Premium)
- Follow/follower counts per company

### Admin Panel
- User management — view, suspend, reactivate, or delete employees and employers
- Job moderation — approve or reject pending job posts
- Platform-wide stats dashboard
- Revenue tracking — payments and subscription history across all users
- Broadcast notifications — push messages to all users or specific role groups

### Subscription & Billing
- Four tiers: **Free, Basic, Premium, Enterprise**
- Feature entitlements enforced at the route level via middleware:
  - Job posting quota, application quota, resume access, analytics, messaging, saved jobs, profile viewers
- Razorpay integration — order creation, payment verification, webhook processing
- PDF invoices generated and downloadable per subscription
- Cron job for subscription expiry warnings, auto-expiry at midnight, and renewal flows

### Real-Time
- Socket.IO with JWT authentication on the connection handshake
- Real-time notification delivery to connected clients
- Live messaging with typing indicators (`typing:start/stop`) and conversation rooms
- Frontend socket connection initialized at app startup with automatic reconnection

### AI Features (Groq API)
- Resume parsing from uploaded PDFs → structured profile data
- Cover letter generation tailored to a specific job post
- Job description generation for employers from a short brief
- Bidirectional match scoring: employee ↔ job and employer ↔ applicant

### Infrastructure
- Redis caching on public GET endpoints (jobs, companies, subscription plans — 5–10min TTL)
- Redis-backed rate limiting across all route groups (global, auth, OTP, sensitive ops)
- Automated cron jobs:
  - **8:00 AM** — Job alert emails to matching employees
  - **9:00 AM** — Subscription expiry warning emails
  - **Midnight** — Process and expire subscriptions
  - **1:00 AM** — Auto-close jobs past their application deadline
- Sentry for production error tracking

---

## Architecture

### Backend — Layered with Manual Dependency Injection
```
Controllers → Services → Repositories → Mongoose Models
```
All dependencies are wired in a single `container.ts` — no DI framework, just explicit construction. This makes the entire dependency graph visible in one file and keeps testing straightforward.

### Frontend — Feature-Based with Shared Hooks
```
Pages (per role) → Custom Hooks → TanStack Query / Zustand → Axios services
```
Pages are lazy-loaded per role (employee, employer, admin). TanStack Query owns all server state. Zustand handles auth and short-lived UI state (AI drafts, job drafts). Route guards (`ProtectedRoute`, `GuestRoute`) enforce role-based access at the router level.

---

## Challenges & Solutions

**Token revocation without sessions**
JWTs are stateless by nature, making immediate revocation tricky. Solved by storing issued refresh tokens in Redis — on logout or suspicious activity, the token is deleted from Redis, invalidating it even before its natural expiry.

**OTP-gated registration race condition**
Storing incomplete user data in the DB before OTP verification creates orphaned records. Instead, all registration data is held in Redis with a TTL matching the OTP expiry. The Mongoose document is only created after successful verification.

**Subscription entitlement enforcement at scale**
Hardcoding feature checks throughout controllers leads to drift. Built a `requireSubscription(feature)` middleware factory that reads the user's current plan from Redis-cached subscription data, keeping entitlement logic in one place and routes clean.

**Real-time delivery to multi-tab sessions**
A user may have multiple tabs open. Socket.IO rooms are keyed by `userId` rather than socket ID, so all connected tabs for a user receive the same notifications without duplication logic in the controllers.

**AI match scoring latency**
Match score calls to the Groq API can be slow on large profiles. The results are not cached at the DB level (scores reflect current profile state), but the frontend uses TanStack Query's stale-while-revalidate pattern to serve the last result instantly while refreshing in the background.

**PDF invoice generation without a template engine**
pdfkit's low-level drawing API makes it hard to maintain invoice layout. Built a thin wrapper service (`InvoiceService`) that abstracts all layout logic, so the subscription service only calls `generateInvoice(subscription)` and gets a `Buffer` back.

---

## Project Structure

```
job-platform/
├── job-platform-backend/
│   └── src/
│       ├── config/         # env, DB, Redis, Cloudinary, Passport, Sentry
│       ├── controllers/    # request handling
│       ├── services/       # business logic
│       ├── repositories/   # DB access (Mongoose)
│       ├── models/         # Mongoose schemas
│       ├── middleware/      # auth, roles, subscription, rate limit, cache, upload
│       ├── routes/         # route definitions
│       ├── jobs/           # cron job definitions
│       └── container.ts    # full DI wiring
└── job-platform-frontend/
    └── src/
        ├── pages/
        │   ├── auth/
        │   ├── employee/
        │   ├── employer/
        │   ├── admin/
        │   └── shared/
        ├── components/     # UI components + layout shells
        ├── hooks/          # data-fetching and socket hooks
        ├── stores/         # Zustand stores
        ├── routes/         # route config + guards
        └── types/          # shared TypeScript types
```

---

## Data Models

| Model | Purpose |
|---|---|
| Employee | Job seeker profile — skills, experience, education, resume |
| Employer | Recruiter profile — linked to a Company |
| Company | Company details — logo, industry, size, location |
| Job | Job listing with filters, salary range, status workflow |
| Application | Employee → Job link with status history and notes |
| Subscription | Plan, Razorpay IDs, feature entitlements, validity |
| Message / Conversation | 1-to-1 messaging between employee and employer |
| Notification | In-app + real-time notification records |
| JobAlert | Saved search filters with email digest schedule |
| JobAnalytics | Per-job view/click/application counts with daily stats |
| ProfileView | Who viewed whose profile and when |
| SavedJob | Employee's bookmarked jobs |
| CompanyFollow | Employee following a company |
