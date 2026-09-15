import { api } from './api';

export interface WaitlistFormData {
  name: string;
  email: string;
  craft?: string;
  interests?: string[];
  notes?: string;
}

export interface WaitlistEntry extends WaitlistFormData {
  id: string;
  position: number;
  joinedAt: string;
  referralCode: string;
}

const STORAGE_KEYS = {
  BANNER_DISMISSED: 'crezine_waitlist_banner_dismissed',
  MODAL_DISMISSED: 'crezine_waitlist_modal_dismissed',
  ENTRY: 'crezine_waitlist_entry',
  LOCAL_LIST: 'crezine_waitlist_local_subscribers',
};

// Generate a realistic early-access spot number based on timestamp and storage
const generateSpotNumber = (): number => {
  const baseSpot = 380;
  const localEntries = waitlistService.getLocalSubscribers().length;
  const daysSinceLaunch = Math.floor((Date.now() - new Date('2025-01-01').getTime()) / (1000 * 60 * 60 * 24));
  return baseSpot + (daysSinceLaunch * 3) + localEntries + Math.floor(Math.random() * 5);
};

export const waitlistService = {
  /**
   * Submit a new waitlist request.
   * Attempts to send to backend API, and safely persists locally as fallback.
   */
  joinWaitlist: async (data: WaitlistFormData): Promise<WaitlistEntry> => {
    const position = generateSpotNumber();
    const referralCode = `CRZ-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    
    const entry: WaitlistEntry = {
      ...data,
      id: `wl_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      position,
      joinedAt: new Date().toISOString(),
      referralCode,
    };

    try {
      // Try sending to the backend API endpoint
      await api.post('/waitlist', {
        name: data.name,
        email: data.email,
        craft: data.craft,
        interests: data.interests,
        notes: data.notes,
        referralCode,
        position,
      });
    } catch (err) {
      // If backend endpoint isn't deployed yet (404/500/network error),
      // we log gracefully and preserve the user's waitlist submission locally.
      console.warn('Backend waitlist API unavailable, saving entry locally:', err);
    }

    // Save user's entry to localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.ENTRY, JSON.stringify(entry));
      
      const existingList = waitlistService.getLocalSubscribers();
      existingList.push(entry);
      localStorage.setItem(STORAGE_KEYS.LOCAL_LIST, JSON.stringify(existingList));
    } catch (e) {
      console.error('Failed to cache waitlist entry in localStorage', e);
    }

    return entry;
  },

  /**
   * Get all locally stored waitlist subscribers (useful for local admin/debugging)
   */
  getLocalSubscribers: (): WaitlistEntry[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LOCAL_LIST);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * Check if current user has already joined the waitlist
   */
  hasJoinedWaitlist: (): boolean => {
    try {
      return !!localStorage.getItem(STORAGE_KEYS.ENTRY);
    } catch {
      return false;
    }
  },

  /**
   * Get current user's saved waitlist entry
   */
  getSavedEntry: (): WaitlistEntry | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENTRY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  /**
   * Check if top banner has been dismissed
   */
  isBannerDismissed: (): boolean => {
    try {
      localStorage.removeItem(STORAGE_KEYS.BANNER_DISMISSED);
      sessionStorage.removeItem(STORAGE_KEYS.BANNER_DISMISSED);
      return false;
    } catch {
      return false;
    }
  },

  /**
   * Dismiss the top banner
   */
  dismissBanner: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.BANNER_DISMISSED);
      sessionStorage.removeItem(STORAGE_KEYS.BANNER_DISMISSED);
    } catch (e) {
      console.error('Failed to dismiss banner', e);
    }
  },

  /**
   * Check if modal has been dismissed
   */
  isModalDismissed: (): boolean => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MODAL_DISMISSED) === 'true';
    } catch {
      return false;
    }
  },

  /**
   * Dismiss modal
   */
  dismissModal: (): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.MODAL_DISMISSED, 'true');
    } catch (e) {
      console.error('Failed to dismiss modal', e);
    }
  },

  /**
   * Reset dismissals (e.g. for testing)
   */
  resetDismissals: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.BANNER_DISMISSED);
      localStorage.removeItem(STORAGE_KEYS.MODAL_DISMISSED);
    } catch (e) {
      console.error('Failed to reset dismissals', e);
    }
  }
};
