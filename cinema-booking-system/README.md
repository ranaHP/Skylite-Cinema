# SkyLite Cinema

A production-ready cinema ticket booking ecosystem with a premium dark cinematic interface, React customer/admin apps, Node.js API, Prisma/MySQL schema, real-time seat locking, QR tickets, food ordering, notifications, and RBAC.

## Apps

- `frontend/` — React + Vite + TypeScript, Tailwind, Framer Motion, TanStack Query, Zustand, React Hook Form, Recharts, QR tickets.
- `backend/` — Node.js + Express + TypeScript, Prisma + MySQL, JWT auth, bcrypt, Zod, Socket.io, Nodemailer, Winston, Helmet/CORS/rate-limit.
- `database/` — SQL helper views and operational notes.
- `docs/` — API and production deployment documentation.

## Quick start

```bash
cd cinema-booking-system
npm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
npm run seed
npm run dev
```

The customer site runs at `http://localhost:5173`, the API at `http://localhost:4000`, and admin routes are under `/admin`.

## Demo users

| Role | Email | Password |
| --- | --- | --- |
| Super Admin | superadmin@moviehub.test | Password123! |
| Cinema Admin | cinemaadmin@moviehub.test | Password123! |
| Staff | staff@moviehub.test | Password123! |
| Customer | customer@moviehub.test | Password123! |

## Key production capabilities

- Transaction-safe seat booking and payment status validation.
- Socket.io temporary seat locks with timeout cleanup.
- Normalized MySQL schema covering users, RBAC, cinemas, halls, seats, movies, shows, bookings, tickets, payments, food, CMS, notifications, coupons, reviews, audit logs, and settings.
- Role-scoped admin APIs and customer booking UX.
- Mobile-first premium UI with desktop admin layouts.

## Mobile app preview

The frontend is mobile-first and includes standalone web-app metadata. To test on a phone, run the dev server, open the Vite URL from a device on the same Wi-Fi, and follow `docs/MOBILE_PREVIEW.md` for LAN API/CORS settings.

## Commands

```bash
npm run dev       # frontend + backend
npm run build     # type-safe production builds
npm run typecheck # TypeScript validation
npm run seed      # seed Prisma database
```

See `docs/API.md`, `docs/DEPLOYMENT.md`, and `docs/MOBILE_PREVIEW.md` for integration, production, and mobile-device testing guidance.
