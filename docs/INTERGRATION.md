# Backend API Integration Documentation

This document tracks the integration of the Crezine Backend API into the Frontend.

## API Overview

- **Base URL**: `https://crezine-api-1057458775492.us-central1.run.app`
- **Prefix**: `/api`
- **Auth**: Firebase ID Token (JWT) in `Authorization: Bearer <token>` header.

## Endpoints Analysis

### 1. Authentication & Users
- `POST /api/users/signup`: Register a new Firebase User in the DB.
- `POST /api/users/signin`: Exchange Firebase UID for DB Profile.
- `GET /api/auth/me`: Get current authenticated user profile.
- `PUT /api/auth/me`: Update profile (Onboarding).
- `GET /api/users/me`: Get profile.
- `PUT /api/users/me`: Update profile.
- `GET /api/users/{id}`: Get specific user.
- `DELETE /api/users/{id}`: Delete account.

### 2. Digital Wallet
- `GET /api/wallet/balance`: Get current balance.
- `GET /api/wallet/transactions`: Get transaction history.
- `POST /api/wallet/withdraw`: Request payout.

### 3. Escrow Transactions
- `POST /api/escrow`: Create contract.
- `GET /api/escrow`: Get all contracts.
- `GET /api/escrow/{id}`: Get contract details.
- `POST /api/escrow/{id}/lock`: Lock funds.
- `POST /api/escrow/{id}/in-progress`: Mark as in progress.
- `POST /api/escrow/{id}/milestones`: Create milestone.
- `GET /api/escrow/{id}/milestones`: Get milestones.
- `PUT /api/escrow/{id}/milestones/{milestoneId}/complete`: Complete milestone.
- `POST /api/escrow/{id}/milestones/{milestoneId}/release`: Request release.
- `POST /api/escrow/{id}/release`: Release funds to seller.
- `POST /api/escrow/{id}/dispute`: Dispute contract.
- `POST /api/escrow/{id}/complete`: Mark contract as completed.

### 4. Events & Ticketing
- `GET /api/events`: Get published events.
- `POST /api/events`: Create event.
- `GET /api/events/{id}`: Get event details.
- `PUT /api/events/{id}`: Update event.
- `GET /api/events/my-events`: Get your events.
- `POST /api/events/{id}/publish`: Publish event.
- `POST /api/events/{id}/tiers`: Create ticket tier.
- `GET /api/events/tiers/{tierId}/available`: Get available tickets.
- `POST /api/events/tiers/{tierId}/buy`: Purchase tickets.
- `GET /api/events/my-tickets`: Get your tickets.
- `GET /api/events/{id}/sales`: Get event sales data.

### 5. Shop
- `GET /api/shop/products`: Get published products.
- `POST /api/shop/products`: Create product.
- `GET /api/shop/products/{id}`: Get product.
- `PUT /api/shop/products/{id}`: Update product.
- `POST /api/shop/products/{id}/publish`: Publish product.
- `GET /api/shop/my-products`: Get your products.
- `GET /api/shop/cart`: Get cart.
- `DELETE /api/shop/cart`: Clear cart.
- `POST /api/shop/cart/add`: Add to cart.
- `DELETE /api/shop/cart/{productId}`: Remove from cart.
- `GET /api/shop/orders`: Get your orders.
- `GET /api/shop/sales`: Get your sales.
- `POST /api/shop/checkout`: Create order from cart.

## Integration Strategy

1.  **Step 1: API Client Setup**: Created a centralized API client using Fetch with authorization handling.
2.  **Step 2: Authentication Integration**: Updated `App.tsx` and created `authService.ts` to handle signup, signin, and session management.
3.  **Step 3: User Profile & Onboarding**: Integrated profile fetching and updates.
4.  **Step 4: Digital Wallet**: Integrated balance and transaction history in `WalletView.tsx`.
5.  **Step 5: Escrow Transactions**: Integrated contract creation and listing in `EscrowView.tsx`.
6.  **Step 6: Shop**: Integrated product listing and cart management in `ShopView.tsx`.
7.  **Step 7: Events & Ticketing**: Integrated event management and stats in `TicketingView.tsx`.

## Status

| Step | Task | Status |
| :--- | :--- | :--- |
| 1 | API Client Setup | Completed |
| 2 | Authentication Integration | Completed |
| 3 | User Profile & Onboarding | Completed |
| 4 | Digital Wallet | Completed |
| 5 | Escrow Transactions | Completed |
| 6 | Shop | Completed |
| 7 | Events & Ticketing | Completed |
