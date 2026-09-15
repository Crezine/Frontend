import { Variants } from 'framer-motion';

export type OnboardingMode = 
  | 'signup' | 'email-verification' | 'login' | 'forgot' | 'reset-sent' | 'reset-password' | 'redirecting'
  | 'enter-phone' | 'phone-verification' | 'basic-details' | 'create-password' | 'verify-identity' | 'cashdoor-created'
  | 'setup-wallet' | 'verify-mpesa' | 'confirm-phone' | 'mpesa-success'
  | 'link-bank' | 'verify-bank' | 'bank-success'
  | 'processing' | 'open-cashdoor';

export const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, x: 20 },
  visible: { opacity: 1, scale: 1, x: 0 },
  exit: { opacity: 0, scale: 0.95, x: -20 },
};
