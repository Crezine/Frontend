# Robust Backend Architecture & Execution Plan - Crezine

## 1. Executive Summary
Crezine is a "Creative Cashdoor"—a unified fintech and ecosystem platform. This plan details a **One Codebase (Monorepo)** structure to manage both the frontend (Vite/React) and backend (NestJS) efficiently.

---

## 2. "One Codebase" Folder Structure
We will adopt a monorepo-style structure to share types between the frontend and backend.

```text
crezine/
├── apps/
│   ├── web/                # Current Vite/React Frontend
│   │   ├── src/
│   │   ├── public/
│   │   └── tailwind.config.js
│   └── api/                # NestJS Backend
│       ├── src/
│       │   ├── modules/    # Wallet, Escrow, Shop, etc.
│       │   ├── main.ts
│       │   └── app.module.ts
│       ├── prisma/         # Database Schema
│       └── docker-compose.yml
├── packages/
│   └── shared-types/       # Shared TS Interfaces (User, Order, Ticket)
├── docs/                   # Current Documentation
└── package.json            # Workspace Manager (pnpm/npm/yarn)
```

---

## 3. Core Technology Stack
*   **Runtime:** Node.js (LTS) + TypeScript.
*   **Framework:** **NestJS** (Modular, secure, scalable).
*   **Database:** **PostgreSQL** + **Prisma ORM**.
*   **Inventory/Concurrency:** **Redis** (Atomic locks for Tickets/Limited Art).
*   **Files/Media:** **Cloudinary** (Art thumbnails, Merch mockups).

---

## 4. The "Creative Economy" - Content Feeding Logic

### 4.1 Shop: Artwork & Merch (User-Generated)
The Shop allows creatives to sell physical/digital goods directly from their "Cashdoor."
*   **Creation:** `POST /shop/products` allows users to upload images to Cloudinary and set a price.
*   **Discovery:** `GET /shop/public/:handle` fetches all products for a specific creative's public page.
*   **Payment:**
    *   **Merch/Prints:** Uses **Standard Payout** (Direct charge -> Wallet).
    *   **High-Value Art:** Can optionally use **Escrow** (Money held until the physical art is shipped and confirmed via tracking).
*   **Integration:** A "Shop" link in the Navbar will point to the user's public shop page (e.g., `crezine.me/artist/shop`).

### 4.2 Ticketing: Event Monetization (User-Generated)
*   **Process:** Creative creates an event -> Backend sets a Redis counter for seats.
*   **Purchase:** High-concurrency logic with Redis `DECR` to prevent overselling.
*   **Validation:** Organizer scans a signed JWT-based QR code on entry.

### 4.3 Residencies & Grants (System/Admin Generated)
*   **Feeding Logic:** 
    1.  **Scraper Worker:** A background job (BullMQ) crawls global art council websites weekly.
    2.  **Admin Portal:** An internal dashboard for Crezine staff to manually vet and add high-value opportunities.
*   **Matching:** A background job matches new grants to users based on their `craft` (e.g., "Photography") and sends a Push/Email alert.

---

## 5. Third-Party Service Integrations

| Step | Primary Tool | Purpose |
| :--- | :--- | :--- |
| **Email** | **Resend** | Transactional Receipts, Shop Order Updates |
| **Auth** | **Passport.js** | Google/Apple Social Auth Verification |
| **Payments** | **Paystack / Stripe** | Credit Card, Bank Transfer, Apple/Google Pay |
| **Logistics** | **Shippo / Terminal** | (Future Scaling) Shipping labels for Merch/Art |
| **KYC** | **Sumsub** | Verifying Shop owners for high-value sales |

---

## 6. Complete API Endpoint Inventory

### Auth & Onboarding
*   `POST /auth/social`: Google/Apple OAuth token exchange.
*   `PATCH /user/profile/update`: Update editable fields (Name, Bio, Craft, Handle).
*   `GET /user/profile/me`: Full dashboard profile data.

### Wallet & Finance
*   `GET /wallet/balance`: Multi-currency real-time balance.
*   `POST /wallet/convert`: USD -> Local (NGN/KES).
*   `POST /payments/link/create`: Generate standard/escrow link.

### Shop & Merch
*   `POST /shop/products`: Create a new Art/Merch item.
*   `GET /shop/public/:handle`: Public shop view for a creative.
*   `POST /shop/checkout`: Initiate purchase flow for physical items.
*   `GET /shop/orders`: Creative's view of sales and shipping status.

### Ticketing & Events
*   `POST /events/create`: Setup event with capacity.
*   `POST /ticketing/purchase/:eventId`: Concurrency-safe purchase.
*   `POST /ticketing/verify`: QR scanning for event entry.

### Global Opportunities
*   `GET /funding/opportunities`: Filtered grants/residencies.

---

## 7. Security & Robustness
*   **Idempotency:** Unique keys for every payment/order to prevent double-charging.
*   **Rate Limiting:** Protect Shop/Ticketing from bots during "Drops."
*   **Encryption:** AES-256 for sensitive PII (Personally Identifiable Information).
