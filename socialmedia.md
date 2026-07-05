# Social Media App

A full-stack social media platform built with Angular and NestJS, featuring real-time messaging, stories, notifications, and a complete social graph.

**Live Demo:** [Frontend](https://your-app.vercel.app) · [API Docs](https://your-backend.onrender.com/api/docs)

---

## Tech Stack

**Frontend**
- Angular 18 (standalone components, lazy loading)
- Tailwind CSS
- Socket.IO client
- Angular CDK

**Backend**
- NestJS (Node.js)
- PostgreSQL + TypeORM
- Redis (session/OTP store)
- Socket.IO (WebSockets)
- Passport.js (JWT + OAuth)
- Cloudinary (media storage)
- Nodemailer (transactional email)
- Winston (structured logging)
- Swagger (API documentation)

**Infrastructure**
- Render (backend hosting)
- Vercel (frontend hosting)
- Supabase (managed PostgreSQL)
- Redis Cloud (managed Redis)
- Cloudinary (image CDN)

---

## Features

### Authentication
- Email + password registration with OTP email verification
- JWT access tokens (15 min) + HttpOnly cookie refresh tokens (7 days) with rotation
- Google OAuth and Facebook OAuth
- Forgot password / reset password via email link
- Account deactivation and reactivation

### Social Graph
- Follow / unfollow users
- Private accounts with follow request approval flow
- Block / unblock users
- Followers and following lists

### Posts & Feed
- Create posts with text, images (up to 4), and hashtags
- Chronological feed from followed users
- Explore feed sorted by popularity
- Like / unlike posts
- Bookmark posts
- Repost (share) posts
- Delete own posts
- Report posts

### Comments
- Nested comments (replies to comments)
- Delete own comments

### Stories
- 24-hour ephemeral stories with images and captions
- Story view tracking

### Real-time Messaging
- One-to-one conversations
- Real-time message delivery via WebSocket
- Typing indicators
- Read receipts
- Online presence (online/offline status)
- Unread message count badge

### Notifications
- Real-time in-app notifications for likes, comments, follows, mentions
- Per-type notification preferences
- Mark as read

### Search & Discovery
- Search users by username or display name
- Search posts by content
- Hashtag pages with post listings
- Trending hashtags

### Media
- Image uploads via Cloudinary
- Avatar upload and update
- Post images (multi-image grid, up to 4)
- Story images

### Settings
- Edit profile (display name, bio, avatar)
- Change password
- Private account toggle
- Notification preferences
- View and manage blocked users

---

## Architecture Highlights

**Layered backend** — Controllers handle HTTP, Services contain business logic, Repositories handle data access. Clean separation throughout.

**OTP flow** — Pending registrations are stored in Redis with a 10-minute TTL. The user row is only written to PostgreSQL after OTP verification. Unverified registrations expire automatically.

**Token rotation** — Refresh tokens are stored in Redis and rotated on every use. Reuse of a consumed refresh token immediately revokes the session.

**WebSocket authentication** — Socket.IO connections are authenticated via JWT on handshake. The server verifies the token and stores the verified userId on the socket, preventing impersonation.

**Private accounts** — Follow requests go through an approval flow. Private account posts and profiles are hidden from non-followers at the service layer.

**Real-time architecture** — Notifications and messages use Socket.IO namespaces (`/notifications`, `/chat`). Users join personal rooms for targeted delivery. Online presence is tracked per-user with multi-tab support.

---

## Challenges

**HttpOnly cookie + CORS across domains** — The refresh token is stored in an HttpOnly cookie for security. Getting this to work correctly with a frontend on Vercel and backend on Render required careful `SameSite=none`, `Secure=true`, and CORS `credentials: true` configuration on both sides.

**Token refresh race condition** — When multiple parallel requests return 401 simultaneously, each would attempt a token refresh, causing all but the first to fail. Solved by having the interceptor handle the refresh flow serially — the first 401 triggers the refresh, and the retried request uses the new token.

**WebSocket auth** — Standard Passport JWT guards don't work on WebSocket connections. Implemented a manual JWT verification step in `handleConnection` using `JwtService`, storing the verified userId on `client.data` for use in all subsequent event handlers.

**IPv6 vs IPv4 for Supabase on Render** — Supabase Direct connections use IPv6 by default, but Render's free tier is IPv4-only. Solved by using Supabase's Session Pooler which supports IPv4 connections without needing a paid add-on.

**Nested comments with thread safety** — Comments support one level of replies. Loading comments for a post uses eager relation loading for replies, then filters to only top-level comments before sending the response, avoiding duplicate nesting.

**Angular route ordering** — Static routes like `/post/create` must be declared before dynamic routes like `/post/:id`, otherwise Angular matches `"create"` as a post ID and loads the wrong component.

---

## API Documentation

Swagger UI available at `/api/docs` on the live backend.

Covers all 60+ endpoints across:
Auth · Users · Posts · Comments · Likes · Follows · Messages · Notifications · Media · Hashtags · Stories · Reposts · Reports

---

## Local Development

**Backend**
```bash
cd SOCIAL-MEDIA-BACKEND
cp .env.example .env   # fill in your values
npm install
npm run start:dev
```

**Frontend**
```bash
cd SOCIAL-MEDIA-FRONTEND
npm install
npm start
```

Backend runs on `http://localhost:3000`, frontend on `http://localhost:4200`.
