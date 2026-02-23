export type AppView = 'landing' | 'onboarding' | 'dashboard' | 'home' | 'wallet' | 'pay' | 'escrow' | 'events' | 'fund';

export interface UserData {
  name: string;
  email: string;
  craft: string;
}

export interface ViewProps {
  navigate: (view: AppView) => void;
  userData?: UserData | null;
}
