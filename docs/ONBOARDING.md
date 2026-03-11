# Crezine Onboarding Documentation

This document outlines the architectural flow, API requirements, and recommended technology stack for the Crezine Onboarding phase. The goal is to move a "Creative" from a visitor to a "Verified Global Creator" with a functional "Cashdoor".

---

## 1. Onboarding Phases

### Phase 1: Identity & Initial Registration
The user provides basic details (Name, Email, Craft).
- **Process:** User submits form -> Backend creates a `pending` account -> Triggers Email Verification.
- **Tech Suggestion:** 
    - **Database:** PostgreSQL or MongoDB.
    - **Auth:** Firebase Auth or NextAuth.js (with custom backend).

### Phase 2: Email Verification (OTP)
Ensuring the email belongs to the user.
- **Process:** User enters 6-digit OTP sent to email.
- **API Endpoint:** `POST /api/v1/auth/verify-email`
- **Tech Suggestion:** 
    - **Email Service:** **Postmark** (High deliverability) or **SendGrid**.
    - **Cache:** Redis (to store OTPs temporarily).

### Phase 3: Identity Verification (KYC)
Mandatory for global transactions and Escrow features.
- **Process:** User uploads ID (National ID/Passport) and a selfie.
- **API Endpoint:** `POST /api/v1/kyc/submit`
- **Status Endpoint:** `GET /api/v1/kyc/status`
- **Tech Suggestion:** 
    - **Provider:** **Sumsub** or **Veriff** (Excellent for African and Global ID coverage).
    - **Storage:** AWS S3 (Encrypted) for document storage.

### Phase 4: Creative Profile Setup
Defining the "Creative Cashdoor" identity.
- **Process:** User chooses a unique handle (e.g., `crezine.me/king`), sets craft details, and bio.
- **API Endpoint:** `PATCH /api/v1/user/profile`

### Phase 5: Payment Method Linking (The "Cashdoor" Core)
Linking local payout methods.
- **Process:**
    1. **M-Pesa Linking:** Verify phone number via STK Push or validation.
    2. **Bank Linking:** Connect local bank for USD to Local conversion.
- **Tech Suggestion:** 
    - **M-Pesa:** **Safaricom Daraja API** or **Flutterwave/Paystack** (as aggregators).
    - **Bank:** **Plaid** (for Global) or **Okra/Mono** (specifically for African bank linking).

---

## 2. API Endpoints Specification

| Endpoint | Method | Description | Payload Example |
| :--- | :--- | :--- | :--- |
| `/auth/register` | `POST` | Initial signup | `{ name, email, password, craft }` |
| `/auth/otp/verify` | `POST` | Verify email OTP | `{ email, code }` |
| `/kyc/init` | `GET` | Get KYC session token | `N/A` |
| `/payments/link/mpesa` | `POST` | Link M-Pesa number | `{ phone_number }` |
| `/payments/link/bank` | `POST` | Link local bank | `{ bank_code, account_no }` |
| `/user/handle/check` | `GET` | Check handle availability | `?handle=king` |

---

## 3. Technology Recommendations

### Email Infrastructure
- **Postmark:** Recommended for transactional emails (OTP, Verification) due to strict deliverability rules.
- **Amazon SES:** Cost-effective for large scale, but requires more setup.

### KYC & Compliance
- **Sumsub:** Handles the entire lifecycle from ID upload to facial biometrics. It also handles AML (Anti-Money Laundering) checks which are critical for Escrow services.

### Payment Aggregators (The "Cashdoor" Bridge)
- **Flutterwave:** Best for African market. Supports M-Pesa, card payments, and local bank transfers across 15+ African countries.
- **Stripe:** Best for receiving Global USD/Euro payments from international clients.

---

## 4. Security Protocols
1. **Data Encryption:** All KYC data must be encrypted at rest (AES-256).
2. **Rate Limiting:** Protect OTP endpoints from brute-force attacks.
3. **Session Management:** Use JWT (JSON Web Tokens) with a short expiry and refresh tokens.
