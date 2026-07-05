# Wearhaus — Full Stack E-Commerce Platform

A production-ready e-commerce platform for a clothing store, built with a modern TypeScript stack. Covers the full shopping lifecycle — browse, cart, checkout, payments, order tracking, returns, and an admin dashboard with analytics.

**Live:** [wearhaus.vercel.app](https://wearhaus.vercel.app) &nbsp;|&nbsp; **Backend:** [wearhaus-api.onrender.com](https://wearhaus-api.onrender.com/api/health)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite, React Router v7 |
| State | Zustand (auth), TanStack Query (server state) |
| UI | Radix UI primitives, Framer Motion, CSS Modules |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB Atlas + Mongoose |
| Cache / Sessions | Redis Cloud (ioredis) |
| Auth | JWT (access + refresh rotation), Google OAuth 2.0 |
| Payments | Razorpay (orders + wallet top-up) |
| Media | Cloudinary (image uploads) |
| Email | Nodemailer (SMTP / Gmail) |
| PDF | PDFKit (invoice generation) |
| Deployment | Vercel (frontend) · Render (backend) |

---

## Features

### Storefront
- Product listing with filters — category, gender, price range, size, colour, rating, availability
- Full-text search across name, brand, and description
- Product detail page — image gallery, variant selector (size + colour), offer badges
- Recently viewed products (per user, capped at 20)
- Related products from the same category
- Wishlist — add, remove, clear, share via WhatsApp

### Cart
- Add to cart, update quantity, remove item, clear cart
- Real-time stock validation on every mutation
- Cart prices refresh automatically on load (reflects any price changes)
- Offer discounts computed and displayed per item
- Cart abandonment detection — flags carts inactive for 24h+, sends reminder emails

### Checkout & Payments
- Delivery address selection (saved addresses with default)
- Coupon code validation and preview before applying
- Partial or full wallet payment alongside online payment
- Three payment methods: Razorpay (UPI/card/netbanking), Wallet, Cash on Delivery
- Razorpay payment retry for pending/failed orders
- Entire order placement wrapped in a MongoDB transaction — stock, coupon, wallet, and order creation are all atomic

### Orders
- Order history with infinite scroll
- Full order detail — status timeline, itemised pricing, GST breakdown
- Order cancellation (instant for Placed, request-based for Confirmed/Shipped)
- Return requests with 15-day return window enforcement
- PDF invoice generation (PDFKit) uploaded to Cloudinary, emailed to customer

### Auth
- Email/password signup with OTP verification (5-minute expiry, 1-minute resend cooldown)
- Google OAuth 2.0 (links to existing account if email matches)
- JWT access tokens (15 min) + refresh token rotation (7 days, stored in Redis)
- Refresh tokens stored as HttpOnly cookies — never in localStorage
- Token blacklisting on logout
- Forgot password via OTP
- Password requirements enforced on both frontend and backend

### Wallet
- Wallet balance display and transaction history (paginated)
- Top-up via Razorpay with server-side amount verification (amount never trusted from client)
- Idempotency check — prevents double-crediting the same payment
- Wallet refunds on order cancellation and returns

### Referrals
- Unique referral code per user
- Referral reward (₹100) credited to referrer's wallet atomically when referee's first order is delivered
- Referral history with status tracking (Pending / Rewarded)

### Reviews
- Reviews gated behind delivered order verification
- One review per product per order
- Average rating recalculated on every create/delete
- Admin soft-delete with rating recalculation

### Admin Dashboard
- Revenue stats — daily, weekly, monthly, yearly
- 30-day comparison with percentage change (revenue, orders, new users)
- Return rate calculation
- Monthly revenue chart (Recharts)
- Top 10 products by units sold
- Top categories by revenue
- New user registrations over last 30 days

### Admin — Order Management
- Full order list with status filter
- Order status transitions with validation (enforced state machine)
- Approve / reject cancellation requests with atomic stock + coupon + wallet restore
- Approve / reject return requests with full refund processing
- COD orders marked Paid on delivery

### Admin — Product & Inventory Management
- Create / edit / soft-delete products with multi-image upload (Cloudinary)
- Add / update / soft-delete variants (size + colour combinations)
- Stock adjustment with low-stock alerts
- Auto status update (Active ↔ Out of Stock) based on variant availability
- Low stock dashboard filtered by configurable threshold

### Admin — User Management
- Paginated user list with search
- Block / unblock users
- User detail with order stats and wallet balance

### Admin — Offers & Coupons
- Product-level and category-level percentage/flat offers with date ranges
- Overlap prevention for active offers on the same product/category
- Best offer selection at order placement (product offer vs category offer)
- Coupon management — usage limits (global + per user), min order value, max discount cap
- Available coupons endpoint filters out coupons the user has already exhausted

---

## Technical Highlights

### Atomic Order Placement
The entire `placeOrder` flow runs inside a single MongoDB transaction. Stock deduction, coupon usage increment, wallet deduction, order creation, and cart clearing either all succeed or all roll back. No partial state is ever persisted.

### Refresh Token Rotation
Refresh tokens are opaque UUIDs stored in Redis (not JWTs). Each use invalidates the old token and issues a new one. Stored exclusively as HttpOnly cookies — never exposed in localStorage or URL params.

### Concurrent 401 Handling
The axios interceptor uses a queue and an in-flight lock. If multiple requests fail with 401 simultaneously, only one refresh call is made — the rest wait and retry with the new token once it resolves.

### GST-Inclusive Tax Calculation
Tax is extracted from the final price (MRP-inclusive model) using `Decimal.js` to avoid floating-point drift. Splits into CGST + SGST (intra-state) or IGST (inter-state) based on the shipping address vs seller state.

### Decimal.js Throughout
All monetary arithmetic — discounts, totals, tax, wallet deductions — uses `Decimal.js` on the backend. No floating-point rounding errors in financial calculations.

### Redis Cache with SCAN
Product listing responses are cached in Redis. Cache invalidation uses `SCAN` (not `KEYS`) to avoid blocking the Redis event loop on large keyspaces.

### Stale Order Cleanup
A cron job runs every 5 minutes to auto-cancel Razorpay orders that haven't been paid within 30 minutes. Each cancellation is wrapped in its own transaction to atomically restore stock, coupons, and wallet.

### PDF Invoices
Invoices are generated server-side with PDFKit, uploaded to Cloudinary, and emailed to the customer as an attachment. Sequential invoice IDs follow Indian financial year format (`INV-2627/0001`).

---

## Challenges

**Atomic multi-resource order placement** — coordinating stock deduction, coupon usage, wallet debit, and order creation across multiple collections without any partial writes required careful transaction structuring and re-validation inside the transaction after all reads.

**Refresh token security** — moving from the naive "store refresh token in localStorage" approach to a proper HttpOnly cookie + server-side Redis storage required changes across the auth flow, OAuth callback, axios interceptor, and logout — and careful handling of the concurrent 401 edge case.

**GST calculation** — Indian tax law requires extracting tax from an MRP-inclusive price and splitting it differently based on whether the transaction is intra-state or inter-state. Getting this right on both the order and the PDF invoice without floating-point errors took deliberate use of Decimal.js throughout.

**Offer precedence** — when both a product offer and a category offer are active, the better discount must win consistently across cart display, order placement, and the product listing API. Centralising the discount calculation logic in `helpers.ts` and reusing it everywhere kept this consistent.

**Coupon race conditions** — concurrent orders using the same coupon could exceed the usage limit. Solved with an atomic `findOneAndUpdate` with a `totalUsed: { $lt: totalUsageLimit }` condition inside the transaction — only one write succeeds if the limit is hit simultaneously.

---

## Project Structure

```
e-commerce/
├── e-commerce-backend/
│   └── src/
│       ├── config/          # DB, Redis, Cloudinary, Passport, env
│       ├── controllers/     # Route handlers
│       ├── middlewares/     # Auth, cache, error handler, rate limiter
│       ├── models/          # Mongoose schemas
│       ├── routes/          # Express routers
│       ├── jobs/            # Cron jobs
│       ├── utils/           # Helpers, token, email, invoice, AppError
│       └── validators/      # Zod schemas
│
└── e-commerce-frontend/
    └── src/
        ├── app/             # App root, router, providers
        ├── modules/         # Feature modules (auth, products, cart, orders, admin…)
        ├── shared/          # API client, stores, components, layouts, types
        ├── hooks/           # TanStack Query hooks
        └── services/        # API service functions
```

---

## Local Setup

### Backend
```bash
cd e-commerce-backend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

### Frontend
```bash
cd e-commerce-frontend
npm install
cp .env.example .env   # fill in your values
npm run dev
```

Frontend runs on `http://localhost:3000`, proxied to backend at `http://localhost:5000`.

---

## Environment Variables

See `e-commerce-backend/.env.example` and `e-commerce-frontend/.env.example` for the full list.

Key variables:

| Variable | Where | Purpose |
|---|---|---|
| `MONGODB_URI` | Backend | MongoDB Atlas connection string |
| `REDIS_URL` | Backend | Redis Cloud connection string |
| `JWT_ACCESS_SECRET` | Backend | JWT signing secret |
| `RAZORPAY_KEY_SECRET` | Backend | Razorpay server-side secret |
| `GOOGLE_CLIENT_SECRET` | Backend | Google OAuth secret |
| `VITE_API_URL` | Frontend | Backend API base URL (production) |
| `VITE_RAZORPAY_KEY_ID` | Frontend | Razorpay public key |
