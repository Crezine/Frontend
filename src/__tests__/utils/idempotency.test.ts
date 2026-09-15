import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateIdempotencyKey,
  getOrCreateSessionIdempotencyKey,
  clearSessionIdempotencyKey,
} from '@/src/utils/idempotency';

describe('idempotency utility', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('generates unique keys with custom prefix', () => {
    const key1 = generateIdempotencyKey('checkout');
    const key2 = generateIdempotencyKey('checkout');

    expect(key1).toMatch(/^checkout_/);
    expect(key2).toMatch(/^checkout_/);
    expect(key1).not.toEqual(key2);
  });

  it('retrieves existing key from sessionStorage if already created', () => {
    const key1 = getOrCreateSessionIdempotencyKey('current_tx', 'pay');
    const key2 = getOrCreateSessionIdempotencyKey('current_tx', 'pay');

    expect(key1).toEqual(key2);
    expect(key1).toMatch(/^pay_/);
  });

  it('clears stored session key', () => {
    const key1 = getOrCreateSessionIdempotencyKey('current_tx', 'pay');
    clearSessionIdempotencyKey('current_tx');
    const key2 = getOrCreateSessionIdempotencyKey('current_tx', 'pay');

    expect(key1).not.toEqual(key2);
  });
});
