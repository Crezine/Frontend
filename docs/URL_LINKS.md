# URL Structure and Routing Documentation

This document outlines the routing architecture for the Crezine application, including public links, legacy redirects, and the security implementation for private dashboard routes.

## Public Routes

These routes are accessible to all visitors without authentication.

- / : The primary landing page of the application.
- /product : Detailed information about the Crezine product.
- /features : Overview of the financial ecosystem and creative tools.
- /pricing : Subscription plans and transaction fee details.
- /about : Mission and background of Crezine.
- /support : General support options and FAQ.
- /help-center : Searchable documentation and guides.
- /contact : Contact form and official communication channels.
- /whatsapp : Direct link to WhatsApp communication.
- /onboarding : The multi-step user registration and setup process.

## Private Dashboard Routes

All routes under the /dashboard path are restricted. If an unauthorized user attempts to access these, they are presented with the UnauthorizedView (Private Access page).

- /dashboard : The user's main home view.
- /dashboard/wallet : Multi-currency creative wallet management.
- /dashboard/pay : Payment generation and invoicing tools.
- /dashboard/payments : Transaction history and records.
- /dashboard/escrow : Milestone-based project security management.
- /dashboard/events : Event management and ticketing overview.
- /dashboard/ticketing : Detailed ticket sales and guestlist management.
- /dashboard/fund : Individual funding request tools.
- /dashboard/funding : Overview of funding and capital.

## Legacy Redirects

The following top-level routes are maintained for backward compatibility and redirect automatically to their respective dashboard locations.

- /home -> /dashboard
- /wallet -> /dashboard/wallet
- /pay -> /dashboard/pay
- /payments -> /dashboard/payments
- /escrow -> /dashboard/escrow
- /events -> /dashboard/events
- /ticketing -> /dashboard/ticketing
- /fund -> /dashboard/fund
- /funding -> /dashboard/funding
- /help -> /help-center

## Private Link Implementation

The application uses a two-tier security architecture to protect restricted content.

### 1. Route-Level Guard (App.tsx)
The primary protection occurs in the main application routing logic. The /dashboard/* route uses a conditional ternary operator to check for the presence of valid user data.

Implementation Detail:
The system validates the userData state, which is initialized from localStorage. The initialization process ensures that the stored data is a valid JSON object containing at least an email address. If the data is missing or invalid, the route renders the UnauthorizedView instead of the DashboardView.

### 2. Component-Level Guard (DashboardView.tsx)
As a secondary layer of security, the DashboardView component includes an internal authorization check.

Implementation Detail:
Upon rendering, the component verifies the userData prop. If the data is null or lacks an email field, the component immediately returns the UnauthorizedView. This ensures that even if route-level logic is bypassed, the private components remain inaccessible.

## Production Environment Configuration

To handle single-page application (SPA) routing on deployment platforms, a vercel.json configuration is implemented. This ensures that all deep-linked URLs (e.g., /pricing or /dashboard/pay) are rewritten to index.html, allowing the React Router to manage the navigation state without 404 errors from the host server.
