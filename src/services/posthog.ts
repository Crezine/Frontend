import posthog from 'posthog-js';

// Configuration interface
export interface CheckoutEventProperties {
  checkoutType?: 'cart' | 'ticket';
  totalAmount?: number;
  itemCount?: number;
  paymentMethod?: string;
  currency?: string;
  errorReason?: string;
  errorStep?: string;
  [key: string]: any;
}

let isInitialized = false;

/**
 * Initializes PostHog client with secure Session Replay and PII masking.
 */
export const initPostHog = () => {
  if (isInitialized) return;

  const apiKey = import.meta.env.VITE_POSTHOG_KEY;
  // Use relative /ingest if reverse proxy is configured or fallback to official host
  const apiHost = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!apiKey) {
    if (import.meta.env.DEV) {
      console.info('[PostHog] VITE_POSTHOG_KEY not provided. Analytics and Session Replay are in passive mode.');
    }
    return;
  }

  try {
    posthog.init(apiKey, {
      api_host: apiHost,
      autocapture: true,
      capture_pageview: true,
      capture_pageleave: true,

      // --- SESSION RECORDING & PRIVACY (PCI-DSS & GDPR Compliance) ---
      session_recording: {
        // Automatically mask all inputs by default
        maskAllInputs: true,
        // Ensure sensitive checkout elements marked with .ph-no-capture or data-ph-mask are never recorded
        maskTextSelector: '.ph-no-capture, [data-ph-mask]',
        recordCrossOriginIframes: false,
      },

      // Do not capture raw sensitive DOM attributes
      mask_all_element_attributes: false,
      mask_all_text: false,

      // Handle loading lifecycle
      loaded: (ph) => {
        if (import.meta.env.DEV && import.meta.env.VITE_POSTHOG_DEBUG === 'true') {
          ph.debug();
        }
      },
    });

    isInitialized = true;
  } catch (error) {
    console.error('[PostHog] Initialization error:', error);
  }
};

/**
 * Dedicated Analytics API for checkout flows and user tracking
 */
export const analytics = {
  // Associate session replays with registered user
  identifyUser: (userId: string, traits?: Record<string, any>) => {
    if (!posthog.__loaded) return;
    posthog.identify(userId, traits);
  },

  // Reset user identity upon logout
  resetUser: () => {
    if (!posthog.__loaded) return;
    posthog.reset();
  },

  // Track when a user opens the checkout modal or view
  trackCheckoutStarted: (properties: CheckoutEventProperties) => {
    if (!posthog.__loaded) return;
    posthog.capture('checkout_started', {
      timestamp: new Date().toISOString(),
      ...properties,
    });
  },

  // Track when a payment method is selected (Card, M-Pesa, Apple Pay, Wallet)
  trackPaymentMethodSelected: (method: string, properties?: CheckoutEventProperties) => {
    if (!posthog.__loaded) return;
    posthog.capture('payment_method_selected', {
      paymentMethod: method,
      ...properties,
    });
  },

  // Track validation errors, insufficient balance, or network failures
  trackCheckoutFailed: (reason: string, step: string, properties?: CheckoutEventProperties) => {
    if (!posthog.__loaded) return;
    posthog.capture('checkout_failed', {
      errorReason: reason,
      errorStep: step,
      ...properties,
    });
  },

  // Track successful transactions
  trackCheckoutCompleted: (properties: CheckoutEventProperties) => {
    if (!posthog.__loaded) return;
    posthog.capture('checkout_completed', {
      timestamp: new Date().toISOString(),
      ...properties,
    });
  },

  // Track when user closes or abandons checkout without completing
  trackCheckoutAbandoned: (step: string, properties?: CheckoutEventProperties) => {
    if (!posthog.__loaded) return;
    posthog.capture('checkout_abandoned', {
      abandonedStep: step,
      ...properties,
    });
  },

  // Direct access to posthog instance if needed
  posthog,
};

export default analytics;
