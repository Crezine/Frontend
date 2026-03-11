# Crezine Dashboard Documentation

This document details the core functionalities, API architecture, and background processes for the Crezine Dashboard (The Creative Cashdoor).

---

## 1. Core Modules

### 1.1 Digital Wallet & Currency Management
Centralized hub for tracking earnings and managing "Digital Dollars" (USD stable value).
- **Process:** User receives payment -> Funds added to USD balance -> User converts to Local (NGN/KES) -> Withdrawal to Bank/M-Pesa.
- **Tech Suggestion:** 
    - **Ledger:** **TigerBeetle** or standard SQL Ledger (double-entry accounting).
    - **Conversion:** **OANDA API** or **Fixer.io** for real-time FX rates.

### 1.2 Global Payment Links (Standard & Escrow)
Two-tier payment system for creatives.
- **Standard Link:** Direct checkout for selling assets or digital products.
- **Escrow Link (Invoice Link):** Funds are locked upon payment and released only after the creative delivers the work and the client approves.
- **API Endpoint:** `POST /api/v1/payments/link/create`
- **Tech Suggestion:** 
    - **Processor:** **Stripe Connect** (for global card/bank processing).
    - **Logic:** Custom Escrow state machine (Pending -> Funded -> In Review -> Released/Disputed).

### 1.3 Creative Grants & Residencies
Marketplace for global opportunities.
- **Process:** Fetch available grants -> Map to user craft -> User applies through Crezine (using verified profile).
- **API Endpoint:** `GET /api/v1/opportunities/all`
- **Tech Suggestion:** 
    - **Scraper/Aggregator:** Custom Python/Node worker to aggregate from Global Arts Councils.

### 1.4 Events & Ticketing
Monetization for exhibitions and workshops.
- **Process:** Creative creates event -> Sets ticket tiers -> Generates QR-based tickets.
- **API Endpoint:** `POST /api/v1/events/create`
- **Tech Suggestion:** 
    - **QR Generation:** `qrcode` npm package or specialized API.
    - **Validation:** Mobile-optimized scanner endpoint for entry.

---

## 2. API Endpoints Specification

| Endpoint | Method | Description | Payload Example |
| :--- | :--- | :--- | :--- |
| `/wallet/balance` | `GET` | Get USD/Local balances | `N/A` |
| `/wallet/convert` | `POST` | Convert USD to Local | `{ amount, target_currency }` |
| `/wallet/withdraw` | `POST` | Withdraw to linked method | `{ amount, method_id }` |
| `/payments/links` | `GET` | Get history of links | `N/A` |
| `/escrow/release` | `POST` | Request escrow fund release | `{ link_id, proof_docs }` |
| `/events/list` | `GET` | Creative's created events | `N/A` |
| `/user/deactivate` | `POST` | Temporarily hide account | `{ reason, password_verify }` |

---

## 3. Technology Recommendations

### Transaction Ledger
- **TigerBeetle:** A high-performance financial ledger database. Highly recommended for the "Escrow" logic to prevent double-spending and ensure 100% accurate balances.

### Global Payouts & Rails
- **Stripe Connect:** Allows Crezine to act as a platform, taking a small fee while facilitating payments from 100+ countries to African bank accounts.
- **Chimoney:** Excellent for "Payouts to any method" (Mobile Money, Airtime, Bank, Giftcards). Ideal for the African Creative market.

### Real-time Infrastructure
- **Websockets (Socket.io):** For real-time balance updates and "Payment Received" notifications on the dashboard.
- **Push Notifications:** **OneSignal** or **Firebase Cloud Messaging (FCM)** for "Escrow Funded" alerts.

---

## 4. Background Processes (Cron Jobs)
1. **FX Rate Sync:** Every 1 hour, sync latest USD/Local rates.
2. **Escrow Auto-Release:** After 14 days of no client dispute, auto-release funds to Creative.
3. **Grant Expire:** Mark opportunities as "Closed" once the deadline passes.

---

## 5. Dispute Resolution Protocol
In the "Escrow Link" phase, if a client disputes:
1. Funds stay **Locked**.
2. Both parties upload evidence (Chat logs, design files).
3. Crezine Admin panel allows manual release or refund.
