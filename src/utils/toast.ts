import { toast as sonnerToast, ExternalToast } from 'sonner';
import { ApiError } from '../services/api';

/**
 * Extract a human-readable message from an unknown error or string.
 */
export function extractErrorMessage(error: unknown, fallbackMessage = 'An unexpected error occurred'): string {
  if (typeof error === 'string' && error.trim()) {
    return error;
  }

  if (error instanceof ApiError && error.message) {
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    const errorObj = error as Record<string, unknown>;
    if (typeof errorObj.message === 'string' && errorObj.message.trim()) {
      return errorObj.message;
    }
    if (typeof errorObj.error === 'string' && errorObj.error.trim()) {
      return errorObj.error;
    }
  }

  return fallbackMessage;
}

export const showToast = {
  success: (message: string, options?: ExternalToast) => {
    return sonnerToast.success(message, {
      duration: 4000,
      ...options,
    });
  },

  error: (error: unknown, options?: ExternalToast) => {
    const message = extractErrorMessage(error);
    return sonnerToast.error(message, {
      duration: 5000,
      ...options,
    });
  },

  warning: (message: string, options?: ExternalToast) => {
    return sonnerToast.warning(message, {
      duration: 4000,
      ...options,
    });
  },

  info: (message: string, options?: ExternalToast) => {
    return sonnerToast.info(message, {
      duration: 4000,
      ...options,
    });
  },

  promise: <T>(
    promise: Promise<T> | (() => Promise<T>),
    data: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    },
    options?: ExternalToast
  ) => {
    return sonnerToast.promise(promise, {
      ...data,
      ...options,
    });
  },

  dismiss: (toastId?: number | string) => {
    sonnerToast.dismiss(toastId);
  },
};

export { sonnerToast as toast };
