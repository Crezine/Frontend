# Crezine - The Creative Cashdoor

Crezine is a sophisticated fintech infrastructure specifically engineered for the global creative economy. It operates as a digital "cashdoor," providing artists, designers, and performers with a seamless interface to manage their financial operations, protect their creative output, and scale their careers across international borders.

## Overview

Crezine addresses the unique financial challenges faced by creators by bridging the gap between artistic production and global commerce. The platform offers a unified dashboard that integrates multi-currency wallets, escrow-protected project funding, and event ticketing management. Its primary objective is to eliminate financial friction and provide a secure, professional environment for creative professionals.

## Core Features

* **Creative Wallet**: A multi-currency management system that allows creators to track incoming and outgoing transactions. It supports global commerce with a focus on simplicity and transparency.
* **Escrow Protection**: A milestone-based funding protection system. It ensures that creators are compensated for their work by securing project funds and releasing them only upon the completion of agreed-upon deliverables.
* **Event Ticketing**: An integrated solution for managing creative events. Features include real-time sales tracking, attendee management, and seamless ticket distribution.
* **Funding Hub**: A curated repository of funding opportunities tailored for the creative sector. It enables users to discover, apply for, and manage grants and investments.
* **Creative Dashboard**: A high-level analytical interface providing real-time insights into financial health, ongoing project statuses, and event performance metrics.
* **Digital Onboarding**: A streamlined, responsive identity setup process designed to verify users quickly and transition them into the core application environment without unnecessary complexity.

## Technology Stack

The application is built using a modern, performant frontend stack:

* **Framework**: React 19.2
* **Build Tool**: Vite 6.2
* **Language**: TypeScript 5.8
* **Styling**: Tailwind CSS 3.4
* **Animation**: Framer Motion 12.3
* **Icons**: Lucide React and React Icons

## Project Structure

The codebase is organized logically to facilitate modular development and scalability:

* **/components**: Reusable UI elements (Navbar, Footer, ActionButton, etc.).
* **/views**: High-level page components (Landing, Dashboard, Wallet, etc.).
* **/public**: Static assets including brand imagery, logos, and icons.
* **App.tsx**: The central orchestrator for routing, state management, and view transitions.
* **index.tsx**: The entry point for React DOM mounting.
* **types.ts**: Centralized TypeScript definitions for consistent data structures.
* **index.html**: The document template including font imports and global styles.

## Getting Started

### Prerequisites

* Node.js version 18.0.0 or higher.
* A modern web browser (Chrome, Firefox, Safari, or Edge).
* npm or yarn package manager.

### Installation

1.  Clone the repository to your local workstation.
2.  Navigate to the project root:
    ```bash
    cd crezine---the-creative-cashdoor
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Development

To start the development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` by default.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be generated in the `/dist` directory.

## Design System

Crezine utilizes a high-contrast Neobrutalist design aesthetic to project a bold, professional image.

### Color Palette

*   **Primary** (`#F69C31`): Used for call-to-action buttons, balance highlights, and interactive accents.
*   **Secondary** (`#AB3625`): Reserved for headings, primary text, and structural background elements.
*   **Accent** (`#E9E0D8`): Employed for secondary backgrounds, borders, and inactive states.
*   **Accent Light** (`#F9F5F0`): Used for section backgrounds to provide subtle contrast.

### Typography

*   **Century Gothic**: Applied to major headings and brand-critical statements.
*   **Montserrat**: Used for general UI elements, buttons, and secondary headings.
*   **Nunito**: Utilized for body text and long-form content to ensure readability.

### UI Patterns

*   **Fluid-Square Methodology**: Ensures all components remain visible and functional across various screen sizes without excessive scrolling.
*   **Glassmorphism**: Subtle use of backdrop blurs and semi-transparent backgrounds for cards and overlays.
*   **Rounded Corners**: Generous border-radius (e.g., 48px for cards) to soften the Neobrutalist edges.

## Architecture and Navigation

### View Orchestration

The application manages its own internal navigation through a centralized state machine in `App.tsx`. It transitions between "Public" views (Landing, Features, Pricing) and "App" views (Dashboard, Wallet, Escrow) based on user authentication status.

### App Mode

The application supports a specialized "WebApp Mode." Appending `?mode=app` to the URL bypasses the marketing landing page and directs the user straight to the onboarding sequence.

### Transitions

View changes are handled by Framer Motion, providing smooth, hardware-accelerated transitions that enhance the perceived performance of the application.

## Maintenance and Development

To maintain high code quality, contributors are expected to adhere to the following standards:

*   **Type Safety**: Ensure all new components and functions are fully typed using TypeScript.
*   **Mobile-First**: Validate all changes on mobile viewport sizes before finalizing.
*   **Component Reuse**: Utilize existing UI primitives in `/components` to maintain visual consistency.
*   **Performance**: Optimize images and minimize the use of heavy third-party libraries.

For detailed maintenance workflows, refer to the `MAINTENANCE.md` file.

## License

Private Property of CREZINE. All rights reserved. Unauthorized copying, modification, or distribution of this software is strictly prohibited.
