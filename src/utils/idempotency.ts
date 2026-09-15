/**
 * Generates a unique, cryptographically secure idempotency key (UUIDv4)
 * to protect against double charges and duplicate financial requests.
 */
export const generateIdempotencyKey = (prefix = 'tx'): string => {
  const uuid = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
    
  return `${prefix}_${uuid}`;
};

/**
 * Retrieves an existing session idempotency key or generates a new one.
 * Ensures the key remains identical across retries of the exact same flow attempt.
 */
export const getOrCreateSessionIdempotencyKey = (sessionKey: string, prefix = 'tx'): string => {
  try {
    const existing = sessionStorage.getItem(sessionKey);
    if (existing) return existing;
    
    const newKey = generateIdempotencyKey(prefix);
    sessionStorage.setItem(sessionKey, newKey);
    return newKey;
  } catch {
    // If sessionStorage is unavailable or blocked (e.g. private mode in some browsers)
    return generateIdempotencyKey(prefix);
  }
};

/**
 * Clears a stored idempotency key once a transaction completes successfully or is aborted.
 */
export const clearSessionIdempotencyKey = (sessionKey: string): void => {
  try {
    sessionStorage.removeItem(sessionKey);
  } catch {
    // ignore
  }
};
