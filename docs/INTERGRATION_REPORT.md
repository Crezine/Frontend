# Backend-Frontend Integration Report

## 1. Missing Backend Endpoints

The following features on the frontend are currently using mock data or have limited backend support:

- **Currency Exchange Rates**: The exchange rate (e.g., 1 USD = 1600 NGN) is hardcoded in `Home.tsx` and `WalletView.tsx`. A dedicated endpoint like `/wallet/exchange-rates` is needed to fetch live rates.
- **Funding/Grants Management**: The `fundingService.ts` was created based on frontend needs, but the backend `/funding/opportunities` endpoints are assumed.
- **Account Verification Management**: **The fate/state of whether an account is verified must be strictly decided by the backend.** Currently, the frontend only reflects this state. A persistent field in the user profile and potentially a `POST /auth/verify-request` endpoint are needed.
- **Milestone Management**: While `escrowService.ts` has milestone methods, the UI for complex milestone tracking (e.g., multiple milestones per contract) is basic.
- **Payment Link Reuse**: The "reuse this link" feature in `PaymentsView.tsx` and `EscrowView.tsx` needs backend logic to support permanent vs. one-time links.
- **Detailed Sales Analytics**: `TicketingView.tsx` requires detailed statistics such as **Top Referrers**, **Top Locations**, and **Top Countries** with respect to sales. Currently, these are shown as "No data yet" because the `/events/{id}/sales` endpoint doesn't return these specific analytical dimensions.
- **Transaction Execution**: `CheckoutView.tsx` and `TicketCheckoutView.tsx` currently mock the success state after checking balance. A `POST /wallet/pay` or similar endpoint is needed to actually execute the transfer and return a real transaction receipt/ID.

## 2. Logical Inconsistencies & Improvements

- **Verification Logic**: (Updated) The verification status should not be a simple UI toggle but a backend-driven state reflected in the user data.
- **Ticketing Stats**: `TicketingView.tsx` calculates stats by iterating over all events and fetching sales for each. This is inefficient (N+1 query problem). A summary endpoint like `/events/stats/summary` should be provided by the backend to handle global sales performance.
- **Event Capacity**: `EventsView.tsx` doesn't strictly enforce ticket capacity on the frontend during selection; it relies on the backend `buyTickets` call to fail if sold out.
- **Empty States**: (Fixed) Visibility for "No recent transactions" and "No data yet" has been improved for both light and dark modes across all views.
- **Balance Precision**: Frontend calculations use floats for display, but the backend uses cents (integers). Care must be taken to maintain precision during execution.

## 3. Implementation Status

| Feature | Status | Service |
|---------|--------|---------|
| Dashboard Balance | Integrated | `walletService` |
| Recent History | Integrated | `walletService` |
| Events List | Integrated | `eventService` |
| Funding/Grants | Integrated | `fundingService` (Assuming API) |
| Profile Update | Integrated | `authService` |
| Escrow Contracts | Integrated | `escrowService` |
| Payment Links | Integrated | `walletService` (History only) |
| Ticketing Analytics | Partial | `eventService` (Basic stats only) |
| Checkout Balance | Integrated | `walletService` (Read-only) |

## 4. Security Note
- `.env` file identified and verified to contain `API_BASE_URL` and other sensitive keys. Ensure these are never committed to version control.
