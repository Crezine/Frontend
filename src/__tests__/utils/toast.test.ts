import { describe, it, expect, vi, beforeEach } from 'vitest';
import { showToast, extractErrorMessage, toast } from '@/src/utils/toast';
import { ApiError } from '@/src/services/api';
import { toast as sonnerToast } from 'sonner';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    warning: vi.fn(),
    info: vi.fn(),
    promise: vi.fn(),
    dismiss: vi.fn(),
  },
}));

describe('Toast Utility & Error Extraction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('extractErrorMessage', () => {
    it('returns raw string if error is a non-empty string', () => {
      expect(extractErrorMessage('Direct error message')).toBe('Direct error message');
    });

    it('extracts message from ApiError instance', () => {
      const apiErr = new ApiError('Api failed validation', 400, {});
      expect(extractErrorMessage(apiErr)).toBe('Api failed validation');
    });

    it('extracts message from standard Error instance', () => {
      const err = new Error('Standard JS error');
      expect(extractErrorMessage(err)).toBe('Standard JS error');
    });

    it('extracts message or error from generic object', () => {
      expect(extractErrorMessage({ message: 'Object error message' })).toBe('Object error message');
      expect(extractErrorMessage({ error: 'Alternative error field' })).toBe('Alternative error field');
    });

    it('falls back to fallback message when error is undefined or empty', () => {
      expect(extractErrorMessage(null, 'Custom fallback')).toBe('Custom fallback');
      expect(extractErrorMessage({}, 'Default fallback')).toBe('Default fallback');
    });
  });

  describe('showToast methods', () => {
    it('calls sonner toast.success with message and default duration', () => {
      showToast.success('Saved successfully!');
      expect(sonnerToast.success).toHaveBeenCalledWith('Saved successfully!', expect.objectContaining({ duration: 4000 }));
    });

    it('calls sonner toast.error with extracted message', () => {
      const apiError = new ApiError('Unauthorized token', 401, {});
      showToast.error(apiError);
      expect(sonnerToast.error).toHaveBeenCalledWith('Unauthorized token', expect.objectContaining({ duration: 5000 }));
    });

    it('calls sonner toast.warning and toast.info', () => {
      showToast.warning('Check input fields');
      expect(sonnerToast.warning).toHaveBeenCalledWith('Check input fields', expect.objectContaining({ duration: 4000 }));

      showToast.info('New feature available');
      expect(sonnerToast.info).toHaveBeenCalledWith('New feature available', expect.objectContaining({ duration: 4000 }));
    });

    it('calls sonner toast.promise and toast.dismiss', () => {
      const dummyPromise = Promise.resolve('data');
      showToast.promise(dummyPromise, {
        loading: 'Loading...',
        success: 'Done!',
        error: 'Failed!',
      });
      expect(sonnerToast.promise).toHaveBeenCalledWith(dummyPromise, expect.objectContaining({
        loading: 'Loading...',
        success: 'Done!',
        error: 'Failed!',
      }));

      showToast.dismiss('toast-id');
      expect(sonnerToast.dismiss).toHaveBeenCalledWith('toast-id');
    });
  });
});
