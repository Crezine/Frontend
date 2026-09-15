import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act, waitFor } from '@testing-library/react';
import OfflineBanner from '@/components/OfflineBanner';

describe('OfflineBanner', () => {
  const originalOnLine = navigator.onLine;

  afterEach(() => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: originalOnLine,
    });
  });

  it('does not display banner when online', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });

    render(<OfflineBanner />);
    expect(screen.queryByText(/You're currently offline/i)).not.toBeInTheDocument();
  });

  it('displays banner when offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });

    render(<OfflineBanner />);
    expect(screen.getByText(/You're currently offline/i)).toBeInTheDocument();
  });

  it('reacts dynamically to window online and offline events', async () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });

    render(<OfflineBanner />);
    expect(screen.queryByText(/You're currently offline/i)).not.toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(screen.getByText(/You're currently offline/i)).toBeInTheDocument();

    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    await waitFor(() => {
      expect(screen.queryByText(/You're currently offline/i)).not.toBeInTheDocument();
    });
  });
});
