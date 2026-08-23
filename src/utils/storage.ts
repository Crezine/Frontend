/**
 * Safe local storage utility with JSON serialization and runtime exception resilience.
 */
export const safeStorage = {
  get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === undefined) {
        return fallback;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`[safeStorage] Failed to parse item for key "${key}":`, error);
      return fallback;
    }
  },

  getString(key: string, fallback = ''): string {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? item : fallback;
    } catch {
      return fallback;
    }
  },

  set<T>(key: string, value: T): boolean {
    try {
      if (typeof value === 'string') {
        localStorage.setItem(key, value);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
      return true;
    } catch (error) {
      console.error(`[safeStorage] Failed to write key "${key}":`, error);
      return false;
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`[safeStorage] Failed to remove key "${key}":`, error);
    }
  },

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('[safeStorage] Failed to clear storage:', error);
    }
  },
};
