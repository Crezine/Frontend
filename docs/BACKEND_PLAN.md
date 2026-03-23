# Robust Backend Architecture & Execution Plan - Crezine

## 1. Executive Summary
Crezine is a "Creative Cashdoor"—a unified fintech and ecosystem platform. This plan details a **One Codebase (Monorepo)** structure to manage both the frontend (Vite/React) and backend (NestJS) efficiently, focusing on absolute financial integrity and high-concurrency performance.

---

## 2. "One Codebase" Folder Structure
We will adopt a monorepo-style structure to share types between the frontend and backend.

```text
crezine/
├── apps/
│   ├── web/                # Current Vite/React Frontend
│   └── api/                # NestJS Backend
│       ├── src/
│       │   ├── modules/    # Wallet, Escrow, Shop, Ticketing, Funding
│       │   ├── common/     # Services: Resend, Paystack, Cloudinary
│       │   └── main.ts
│       ├── prisma/         # Database Schema
│       └── docker-compose.yml
├── packages/
│   └── shared-types/       # Shared TS Interfaces (User, Order, Ticket)
└── package.json            # Workspace Manager (pnpm/npm/yarn)
```

---

## 3. Core Technology Stack
*   **Runtime:** Node.js (LTS) + TypeScript.
*   **Framework:** **NestJS** (Modular, secure, scalable).
*   **Database:** **PostgreSQL** + **Prisma ORM**.
*   **Inventory/Concurrency:** **Redis** (Atomic locks for Tickets/Limited Art).
*   **Files/Media:** **Cloudinary** (Art thumbnails, Merch mockups).
*   **Background Jobs:** **BullMQ** (Retry logic, scheduled tasks).

---

## 4. The "Creative Economy" - Content Feeding Logic

### 4.1 Shop: Artwork & Merch (User-Generated)
The Shop is the primary engine for "The Creative Cashdoor." It handles physical art and digital merch.

#### 4.1.1 The Creation Journey (Creative/Admin)
1.  **Form Submission:** The Creative fills out the product details (Title, Price, Stock) in the Dashboard.
2.  **Secure Upload:** The Backend generates a **Cloudinary Signed Upload** signature. The Frontend then uploads the high-res Art directly to **Cloudinary** (bypassing our server for speed).
3.  **Persistence:** The Backend receives the Cloudinary URL and metadata, then saves it to **PostgreSQL** via **Prisma**.
4.  **Tools:** `NestJS`, `Prisma`, `Cloudinary SDK`, `React`.

#### 4.1.2 The Buyer Shopping Journey
1.  **Browsing:** Buyers visit `crezine.me/:handle/shop`. The Backend fetches products using a high-performance indexed query.
2.  **Initiation:** Buyer clicks "Buy." The Backend calls **Paystack** (NGN/KES) or **Stripe** (USD) to create a `Checkout Session`.
3.  **Payment:** The Buyer pays on the secure gateway.
4.  **Fulfillment (Webhook):** The Gateway sends a `POST` request to our Webhook endpoint. 
    *   **Logic:** Backend verifies the payment -> Deducts stock in **Prisma** -> Credits the Creative's Wallet.
    *   **Escrow Logic:** If "High-Value Art" is selected, funds are moved to a `LOCKED` state in the DB until the Creative provides a tracking number.
5.  **Notifications:** **Resend** triggers a "New Sale" email to the Creative and a "Receipt" to the Buyer.
6.  **Tools:** `Paystack API`, `Stripe API`, `Resend`, `Socket.io` (for instant "Success" UI updates).

### 4.2 Ticketing: Event Monetization (User-Generated)
Designed for high-concurrency "Drops" (e.g., a workshop with only 20 seats).

1.  **Creation:** Creative sets capacity (e.g., 50). The Backend saves this to **Prisma** and initializes a **Redis** key `ticket_count:event_id`.
2.  **The "Race Condition" Shield:** When a buyer clicks "Purchase," the Backend runs `redis.decr()`. This is an atomic operation that happens in <1ms, ensuring we NEVER sell 51 tickets for a 50-seat event.
3.  **Verification:** Upon successful payment, the Backend generates a unique Ticket ID and signs it into a **JWT-based QR Code**.
4.  **Tools:** `Redis`, `BullMQ` (for expiring unpaid ticket holds), `qrcode (npm)`.

### 4.3 Residencies & Grants (System/Admin Generated)
A curated gateway to global funding.

1.  **Aggregation:** A **BullMQ** worker runs a scheduled task. It uses `Puppeteer` or `Axios` to scrape Global Arts Councils and Grant databases.
2.  **Curation:** New opportunities are marked as `PENDING_REVIEW`. A Crezine Admin uses the internal portal to verify and "Publish" the grant.
3.  **Notification (The Matchmaker):** Once published, the Backend searches for users whose `craft` matches the grant (e.g., "Sculpting") and triggers a push notification via **OneSignal**.
4.  **Tools:** `BullMQ`, `Puppeteer`, `OneSignal API`, `Prisma`.

---

## 5. Service Integration Deep Dives

### 5.1 Paystack & Stripe (The Payment Rails)
Fintech requires 100% reliability. We use **Webhooks** to handle the "Asynchronous Nature" of payments.
1.  **Initiation:** `POST /wallet/deposit` or `/shop/checkout` returns a checkout URL.
2.  **Webhook Handling:**
    ```typescript
    @Post('webhook')
    async handleWebhook(@Body() event: any, @Headers('x-paystack-signature') sig: string) {
      // 1. Verify Signature (Security)
      // 2. Map 'charge.success' to Wallet Credit or Escrow Lock
      // 3. Update Transaction status in DB using Prisma transaction
    }
    ```
3.  **Currency Logic:** Paystack handles NGN/KES; Stripe handles Global USD. The backend normalizes all amounts to "Cents" (integers) to avoid floating-point errors.

### 5.2 Resend (Email Infrastructure)
Used for OTPs, Ticket Delivery, and Shop Receipts.
1.  **Implementation:** Create a `MailModule` wrapping the Resend SDK.
2.  **Templates:** Use **React Email** for beautiful, branded Crezine templates.
3.  **Reliability:** Emails are pushed to a **BullMQ** queue. If Resend is down, the system retries automatically.

### 5.3 Cloudinary (Media Management)
Creatives upload high-res Art. We must not store these on our server.
1.  **Signed Uploads:** Backend provides a temporary signature to the Frontend.
2.  **Direct Upload:** Frontend uploads directly to Cloudinary.
3.  **Metadata:** Cloudinary sends a webhook or returns a URL which the backend stores in the `Product` model.
4.  **Transformation:** Use Cloudinary URLs to generate thumbnails on-the-fly (e.g., `w_500,c_fill`).

### 5.4 Redis & BullMQ (Concurrency & Jobs)
Essential for the "Ticketing" and "Grant Scraping" stories.
1.  **Ticket Lock:** `redis.setnx('event:lock:' + id, 1)` prevents race conditions.
2.  **Background Tasks:** 
    *   `GrantSyncJob`: Runs every Monday at 3 AM.
    *   `TicketExpireJob`: Runs every 10 minutes to release unpaid tickets back into inventory.

### 5.5 Social Auth (Google & Apple OAuth)
Integration via **Passport.js** to ensure secure, streamlined onboarding.
1.  **Google:** Backend uses `google-auth-library` to verify the `id_token`. If valid, it extracts `email`, `name`, and `picture`.
2.  **Apple (The "Gotcha"):** 
    *   Backend verifies the Apple JWT using Apple's public keys.
    *   **Logic:** Apple only sends the user's `name` (firstName, lastName) on the **first ever** login. The backend must capture and store this immediately in the `User` record, otherwise, it is lost forever.
3.  **Account Linking:** If a user signed up with Email but later logs in with Google (using the same email), the backend automatically links the two to prevent duplicate accounts.

---

## 6. Deep Dive: Prisma & Database Lifecycle

### 6.1 Modeling Financial Integrity
```prisma
model Transaction {
  id        String   @id @default(uuid())
  amount    Int      // Stored in Cents/Kobo
  currency  String
  type      TransactionType // DEPOSIT, WITHDRAWAL, ESCROW_LOCK
  status    Status   @default(PENDING)
  reference String   @unique // Provider Reference (e.g. Paystack Ref)
}
```

### 6.2 Robust Financial Transactions
```typescript
await this.prisma.$transaction(async (tx) => {
  const wallet = await tx.wallet.update({ where: { id }, data: { balance: { increment: amount } } });
  await tx.transaction.create({ data: { ... } });
});
```

---

## 7. Complete API Endpoint Inventory

### 7.1 Auth & Onboarding
*   `POST /auth/register`: Manual email signup. Body: `{ name, email, password, craft }`.
*   `POST /auth/login`: Traditional credential login. Returns JWT.
*   `POST /auth/social`: Google/Apple OAuth token exchange. Body: `{ token, provider }`.
*   `POST /auth/otp/verify`: Verify email/phone. Body: `{ email, code, type }`.
*   `GET /user/handle/check?handle=name`: Real-time availability for `crezine.me/handle`.

### 7.2 User & Profile Management
*   `GET /user/profile/me`: Full data for the Dashboard (Private).
*   `PATCH /user/profile/update`: Update editable fields (Name, Bio, Craft, Handle).
*   `POST /user/profile/avatar`: Generate Cloudinary signature for secure direct-to-cloud upload.
*   `POST /user/email/change`: Initiation of email update flow (requires old verification).
*   `GET /kyc/init`: Initialize Sumsub/Veriff KYC session.

### 7.3 Wallet & Finance (The Cashdoor Engine)
*   `GET /wallet/balance`: Real-time balance for USD and Local (NGN/KES).
*   `GET /wallet/transactions`: Paginated history of all movements.
*   `POST /wallet/deposit`: Initiate deposit flow. Returns Checkout URL.
*   `POST /wallet/convert`: Swap USD for Local. Uses OANDA/Fixer API.
*   `POST /wallet/withdraw`: Request payout to linked Bank/M-Pesa.
*   `POST /payments/link/create`: Generate Standard or Escrow link.
*   `POST /escrow/:id/release`: Request/Approve milestone fund release.
*   `POST /payments/webhook`: Unified entry point for Paystack/Stripe callbacks.

### 7.4 Shop & Merch (User-Generated)
*   `POST /shop/products`: Create a new Art/Merch item with Cloudinary metadata.
*   `GET /shop/public/:handle`: Public shop view for a specific creative.
*   `POST /shop/checkout`: Initiate purchase flow for physical/digital items.
*   `GET /shop/orders`: Creative's dashboard to track sales and shipping status.

### 7.5 Ticketing & Events (High Concurrency)
*   `POST /events/create`: Setup event with capacity and pricing tiers.
*   `GET /events/all`: Public feed of active creative events.
*   `POST /ticketing/purchase/:eventId`: High-concurrency atomic purchase engine.
*   `GET /ticketing/my-tickets`: User's secure vault of JWT-signed QR codes.
*   `POST /ticketing/verify`: QR scanning endpoint for event organizers.

### 7.6 Global Opportunities (Aggregation)
*   `GET /funding/opportunities`: Filtered grants/residencies (Categories: Grant, Residency, Local Fund).
*   `POST /funding/apply/:id`: One-click application using Crezine Verified Profile.

### 7.7 Support & Operations
*   `POST /contact/submit`: Handle contact form submissions (support, partnerships).
*   `POST /newsletter/subscribe`: Add email to marketing/updates list.
*   `GET /content/faqs`: Fetch latest dynamic FAQ categories.
*   `GET /content/legal/:type`: Fetch latest Terms or Privacy content (CMS-driven).

---

## 8. Operational Guidelines (DevOps)
1.  **Secrets:** Use AWS Secrets Manager or Vault for API keys (Stripe/Resend/Paystack).
2.  **Idempotency:** All financial endpoints must accept a `x-idempotency-key` header.
3.  **Logs:** Use **Winston** for structured logging of all money-moving operations.
