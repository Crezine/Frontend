# Crezine | Maintenance Documentation

This document provides a comprehensive guide to maintaining the Crezine codebase, detailing the architecture, design system, and development workflows.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (via CDN in `index.html` for rapid prototyping)
- **Fonts:** Google Fonts (Montserrat, Nunito) & System Fonts (Century Gothic)

## 🎨 Design System

The design system is centralized in the `index.html` Tailwind configuration.

### Colors
| Name | Hex Code | Tailwind Class | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#F69C31` | `bg-primary`, `text-primary` | Main CTA buttons, balance highlights, accents |
| **Secondary** | `#AB3625` | `bg-secondary`, `text-secondary` | Headings, primary text, dark backgrounds |
| **Accent** | `#E9E0D8` | `bg-accent`, `text-accent` | Secondary backgrounds, borders, inactive states |
| **Accent Light** | `#F9F5F0` | `bg-accent-light` | Section backgrounds (Landing, About) |

### Typography
- **Century Gothic:** Used for major headings (`h1`, `h2`) and brand statements.
- **Montserrat:** Used for UI elements, buttons, and secondary headings.
- **Nunito:** Used for body text and long-form content.

### UI Patterns
- **Cards:** `bg-white` with `rounded-[48px]` and `shadow-2xl shadow-secondary/5`.
- **Buttons:** High-contrast with large border-radius (`rounded-2xl` or `rounded-full`).
- **Transitions:** Use `transition-all duration-300` with `hover:scale-105` for interactive elements.

## 📁 Directory Structure

```text
crezine/
├── public/              # Static assets (logos, hero images)
├── components/          # Reusable UI components
│   ├── ActionButton.tsx
│   ├── BrandLogo.tsx
│   ├── Footer.tsx
│   ├── Navbar.tsx
│   └── TransactionItem.tsx
├── views/               # Page-level view components
│   ├── About.tsx        # Landing page section
│   ├── DashboardView.tsx
│   ├── EscrowView.tsx
│   ├── LandingView.tsx
│   ├── OnboardingView.tsx
│   ├── PaymentsView.tsx
│   ├── WalletView.tsx
│   └── ...
├── App.tsx              # Main entry point & routing logic
├── index.tsx            # React DOM mounting
├── types.ts             # Global TypeScript interfaces/enums
└── index.html           # Tailwind config & Font imports
```

## 🛠 Maintenance Workflows

### 1. Adding a New View
1. Add the new view to the `AppView` enum in `types.ts`.
2. Create the view component in the `views/` directory.
3. Import and add the view to the `switch` statement in `App.tsx`.
4. Update `Navbar.tsx` if the view should be accessible from the main navigation.

### 2. Updating Brand Colors
To update the theme globally, modify the `tailwind.config` object inside the `<script>` tag in `index.html`. 

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#NEW_HEX',
        secondary: '#NEW_HEX',
        // ...
      }
    }
  }
}
```

### 3. Modifying Component Styles
Most components use Tailwind utility classes. For consistency, always use the semantic color classes (`primary`, `secondary`, `accent`) rather than hardcoding hex values in JSX.

### 4. Responsiveness
Crezine uses a mobile-first approach. 
- Use `px-6` for mobile padding and `md:px-12` or `max-w-7xl mx-auto` for desktop containers.
- Utilize the `lg:hidden` and `hidden lg:flex` patterns in `Navbar.tsx` for mobile/desktop menu switching.

## 🚪 App Mode & Navigation Logic

### 1. App Mode Entry
The application supports a "WebApp Mode" that can be triggered via URL parameters.
- **Trigger:** Adding `?mode=app` to the root URL.
- **Behavior:** In `App.tsx`, the presence of this parameter causes the application to skip the `LANDING` view and initialize directly into `ONBOARDING`.
- **Implementation:** `LandingView.tsx` uses `window.open(url + '?mode=app', '_blank')` to launch the functional app in a new browser tab.

### 2. Exit Logic ("Close Door")
Users can creatively exit the webapp to return to the main marketing website.
- **Component:** `Navbar.tsx` features a "Close Door" button.
- **Handler:** The `onExit` prop in the Navbar triggers `handleExitApp` in `App.tsx`.
- **Mechanism:** 
  - If the app was opened in a new tab (`window.opener`), it attempts to `window.close()`.
  - Otherwise, it clears the `mode` query parameter and navigates back to the `LANDING` view.

## 📋 Future Roadmap
- [ ] Migrate Tailwind CDN to a local PostCSS installation for production optimization.
- [ ] Implement a real routing library (e.g., React Router) if URL deep-linking is required.
- [ ] Add Formik or React Hook Form for better validation in `OnboardingView` and `PaymentsView`.
- [ ] Centralize animations using a library like Framer Motion for smoother transitions.
