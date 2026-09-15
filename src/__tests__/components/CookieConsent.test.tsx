import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CookieConsent from '@/components/CookieConsent';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('CookieConsent Component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('renders consent popup after delay when no consent is stored', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <CookieConsent />
      </MemoryRouter>
    );

    await waitFor(
      () => {
        expect(screen.getByText('Crezine uses cookies')).toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    expect(screen.getByText(/We use cookies to ensure that we give you the best experience/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Accept/i })).toBeInTheDocument();
  });

  it('does not render when consent is already accepted in localStorage', async () => {
    localStorage.setItem('crezine_cookie_consent', 'accepted');

    render(
      <MemoryRouter initialEntries={['/']}>
        <CookieConsent />
      </MemoryRouter>
    );

    expect(screen.queryByText('Crezine uses cookies')).not.toBeInTheDocument();
  });

  it('does not render on excluded policy pages', async () => {
    render(
      <MemoryRouter initialEntries={['/privacy-policy']}>
        <CookieConsent />
      </MemoryRouter>
    );

    expect(screen.queryByText('Crezine uses cookies')).not.toBeInTheDocument();
  });

  it('accepts cookies, writes to localStorage, and closes popup', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <CookieConsent />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Crezine uses cookies')).toBeInTheDocument();
    });

    const acceptButton = screen.getByRole('button', { name: /Accept/i });
    await user.click(acceptButton);

    expect(localStorage.getItem('crezine_cookie_consent')).toBe('accepted');
    await waitFor(() => {
      expect(screen.queryByText('Crezine uses cookies')).not.toBeInTheDocument();
    });
  });

  it('navigates to cookie settings on preferences click', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <CookieConsent />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Crezine uses cookies')).toBeInTheDocument();
    });

    const preferencesLink = screen.getByRole('button', { name: /Manage your preferences/i });
    await user.click(preferencesLink);
    expect(mockNavigate).toHaveBeenCalledWith('/cookie-settings');
  });

  it('navigates to privacy policy on policy click', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <CookieConsent />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Crezine uses cookies')).toBeInTheDocument();
    });

    const policyLink = screen.getByRole('button', { name: /Read cookies policies/i });
    await user.click(policyLink);
    expect(mockNavigate).toHaveBeenCalledWith('/privacy-policy');
  });

  it('dismisses popup on close button click without persisting accepted', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/']}>
        <CookieConsent />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Crezine uses cookies')).toBeInTheDocument();
    });

    const dismissButton = screen.getByRole('button', { name: /Dismiss/i });
    await user.click(dismissButton);

    expect(localStorage.getItem('crezine_cookie_consent')).toBeNull();
    await waitFor(() => {
      expect(screen.queryByText('Crezine uses cookies')).not.toBeInTheDocument();
    });
  });
});
