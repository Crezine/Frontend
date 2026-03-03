export type AppView = 'landing' | 'onboarding' | 'dashboard' | 'home' | 'wallet' | 'pay' | 'escrow' | 'events' | 'fund' | 'product' | 'features' | 'pricing' | 'support' | 'help-center' | 'contact' | 'whatsapp' | 'about' | 'funding' | 'payments' | 'ticketing' | 'help';

export interface UserData {
  name: string;
  email: string;
  craft: string;
}

export interface ViewProps {
  navigate: (view: AppView) => void;
  userData?: UserData | null;
}
