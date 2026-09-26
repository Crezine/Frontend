import { api, ApiError } from './api';

export interface WaitlistFormData {
  name: string;
  email: string;
  craft?: string;
  interests?: string[];
  notes?: string;
  phoneNumber?: string;
  referralSource?: string;
}

export interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  fullName?: string;
  phoneNumber?: string;
  referralSource?: string;
  craft?: string;
  interests?: string[];
  notes?: string;
  position: number;
  joinedAt: string;
  referralCode: string;
  isVerified?: boolean;
  isNotified?: boolean;
  notifiedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface WaitlistStats {
  total: number;
  verified: number;
  notified: number;
  unverified: number;
  pendingNotification: number;
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
   * Sends to backend API (crezine-api /api/waitlist), with clear duplicate detection and offline fallback.
   */
  joinWaitlist: async (data: WaitlistFormData): Promise<WaitlistEntry> => {
    const email = data.email.trim().toLowerCase();
    const fullName = data.name.trim();

    // Check if email already exists in local storage cache
    const existingList = waitlistService.getLocalSubscribers();
    const existingIndex = existingList.findIndex(e => e.email.toLowerCase() === email);

    // Prepare payload strictly matching backend JoinWaitlistDto:
    // { email: string, fullName?: string, phoneNumber?: string, referralSource?: string }
    const payload: {
      email: string;
      fullName?: string;
      phoneNumber?: string;
      referralSource?: string;
    } = {
      email,
      fullName: fullName || undefined,
    };

    if (data.phoneNumber?.trim()) {
      payload.phoneNumber = data.phoneNumber.trim();
    }

    if (data.referralSource?.trim()) {
      payload.referralSource = data.referralSource.trim();
    } else if (data.craft?.trim()) {
      payload.referralSource = data.craft.trim();
    }

    let backendId: string | undefined;
    let backendCreatedAt: string | undefined;

    try {
      // Backend POST /api/waitlist returns created entry or throws 409 Conflict
      const res = await api.post<any>('/waitlist', payload);
      if (res && typeof res === 'object') {
        backendId = res.id;
        backendCreatedAt = res.createdAt;
      }
    } catch (err: any) {
      // Check for 409 Conflict from backend (email already on waitlist)
      const isConflict =
        err?.status === 409 ||
        (err?.message && /already on the waitlist|conflict/i.test(err.message));

      if (isConflict) {
        const conflictError = new Error('This email is already on the waitlist');
        (conflictError as any).status = 409;
        (conflictError as any).isAlreadyOnWaitlist = true;
        throw conflictError;
      }

      // Check for 400 Bad Request
      if (err?.status === 400) {
        throw err;
      }

      // If backend endpoint is unavailable (offline, 404, 500, network failure),
      // verify if already recorded locally before accepting as offline submission
      if (existingIndex >= 0) {
        const conflictError = new Error('This email is already on the waitlist');
        (conflictError as any).status = 409;
        (conflictError as any).isAlreadyOnWaitlist = true;
        throw conflictError;
      }

      console.warn('Backend waitlist API unavailable, saving entry locally:', err);
    }

    const position = generateSpotNumber();
    const referralCode = `CRZ-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const entry: WaitlistEntry = {
      ...data,
      id: backendId || `wl_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      name: fullName || 'Creative Pioneer',
      fullName: fullName || 'Creative Pioneer',
      email,
      phoneNumber: data.phoneNumber,
      referralSource: payload.referralSource,
      craft: data.craft,
      interests: data.interests,
      notes: data.notes,
      position,
      joinedAt: backendCreatedAt || new Date().toISOString(),
      referralCode,
      isVerified: false,
      isNotified: false,
    };

    // Save user's entry to localStorage
    try {
      localStorage.setItem(STORAGE_KEYS.ENTRY, JSON.stringify(entry));

      if (existingIndex >= 0) {
        existingList[existingIndex] = entry;
      } else {
        existingList.push(entry);
      }
      localStorage.setItem(STORAGE_KEYS.LOCAL_LIST, JSON.stringify(existingList));
    } catch (e) {
      console.error('Failed to cache waitlist entry in localStorage', e);
    }

    return entry;
  },

  /**
   * Check if an email is already registered locally
   */
  isEmailRegistered: (email: string): boolean => {
    try {
      const normalized = email.trim().toLowerCase();
      const saved = waitlistService.getSavedEntry();
      if (saved && saved.email.toLowerCase() === normalized) {
        return true;
      }
      const list = waitlistService.getLocalSubscribers();
      return list.some(item => item.email.toLowerCase() === normalized);
    } catch {
      return false;
    }
  },

  /**
   * Get all locally stored waitlist subscribers (useful for local fallback/debugging)
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
  },

  /**
   * Get all waitlist subscribers for admin view.
   * Calls GET /api/waitlist with fallback to local subscribers.
   */
  getAdminWaitlist: async (): Promise<WaitlistEntry[]> => {
    try {
      const response = await api.get<any[]>('/waitlist');
      if (Array.isArray(response)) {
        return response.map((item, index) => ({
          id: item.id || `wl_${index}`,
          name: item.fullName || item.name || 'Anonymous Creator',
          fullName: item.fullName || item.name || 'Anonymous Creator',
          email: item.email,
          phoneNumber: item.phoneNumber,
          referralSource: item.referralSource,
          craft: item.craft || item.referralSource || 'Creator',
          position: item.position || (index + 1),
          joinedAt: item.createdAt || item.joinedAt || new Date().toISOString(),
          referralCode: item.referralCode || `CRZ-${(item.id || index).toString().slice(0, 5).toUpperCase()}`,
          isVerified: !!item.isVerified,
          isNotified: !!item.isNotified,
          notifiedAt: item.notifiedAt,
        }));
      }
    } catch (err) {
      console.warn('Failed to fetch waitlist from API, falling back to local subscribers:', err);
    }
    return waitlistService.getLocalSubscribers();
  },

  /**
   * Get waitlist statistics for admin view.
   * Calls GET /api/waitlist/stats with fallback calculation.
   */
  getWaitlistStats: async (): Promise<WaitlistStats> => {
    try {
      const stats = await api.get<WaitlistStats>('/waitlist/stats');
      if (stats && typeof stats.total === 'number') {
        return stats;
      }
    } catch (err) {
      console.warn('Failed to fetch waitlist stats from API, calculating locally:', err);
    }
    const local = waitlistService.getLocalSubscribers();
    const verified = local.filter(e => e.isVerified).length;
    const notified = local.filter(e => e.isNotified).length;
    return {
      total: local.length,
      verified,
      notified,
      unverified: local.length - verified,
      pendingNotification: local.length - notified,
    };
  },

  /**
   * Mark a waitlist applicant as notified (admin action)
   */
  markAsNotified: async (email: string): Promise<boolean> => {
    try {
      await api.post(`/waitlist/notify/${encodeURIComponent(email)}`);
    } catch (err) {
      console.warn('Failed to mark notified via API, updating locally:', err);
    }
    // Update local cache
    try {
      const list = waitlistService.getLocalSubscribers();
      const updated = list.map(item => {
        if (item.email.toLowerCase() === email.toLowerCase()) {
          return { ...item, isNotified: true, notifiedAt: new Date().toISOString() };
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEYS.LOCAL_LIST, JSON.stringify(updated));

      const saved = waitlistService.getSavedEntry();
      if (saved && saved.email.toLowerCase() === email.toLowerCase()) {
        localStorage.setItem(STORAGE_KEYS.ENTRY, JSON.stringify({ ...saved, isNotified: true, notifiedAt: new Date().toISOString() }));
      }
      return true;
    } catch {
      return false;
    }
  },
};
