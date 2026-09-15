import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import * as firebaseAuth from 'firebase/auth';
import { authService } from '@/src/services/authService';

vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => <div data-testid="analytics-mock" />,
}));

vi.mock('firebase/auth', async () => {
  const actual = await vi.importActual<typeof import('firebase/auth')>('firebase/auth');
  return {
    ...actual,
    onAuthStateChanged: vi.fn((_auth, callback) => {
      // Default: unauthenticated
      callback(null);
      return vi.fn(); // unsubscribe
    }),
  };
});

describe('App Root Component (Routing, Auth Guards, and Global Listeners)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('renders landing page on root route / and updates document title', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(document.title).toContain('Crezine | The Creative cashdoor');
  });

  it('redirects unauthenticated users trying to access protected /dashboard to /onboarding', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard/wallet']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(document.title).toContain('Join | The Creative cashdoor');
      expect(screen.getByText('Setup your Creative Cashdoor')).toBeInTheDocument();
    });
  });

  it('renders dashboard when user is authenticated with Firebase and has profile', async () => {
    const mockFirebaseUser = {
      uid: 'user_123',
      getIdToken: vi.fn().mockResolvedValue('mock-token-abc'),
    };

    vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementation((_auth, callback: any) => {
      callback(mockFirebaseUser);
      return vi.fn();
    });

    vi.spyOn(authService, 'getMe').mockResolvedValue({
      id: 'user_123',
      email: 'creator@crezine.com',
      name: 'Creative Pro',
      craft: 'Filmmaker',
      role: 'creator',
    });

    render(
      <MemoryRouter initialEntries={['/dashboard/wallet']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(document.title).toContain('Wallet | The Creative cashdoor');
    });
  });

  it('handles window auth:unauthorized event and navigates from dashboard to onboarding', async () => {
    const mockFirebaseUser = {
      uid: 'user_123',
      getIdToken: vi.fn().mockResolvedValue('mock-token-abc'),
    };

    vi.mocked(firebaseAuth.onAuthStateChanged).mockImplementation((_auth, callback: any) => {
      callback(mockFirebaseUser);
      return vi.fn();
    });

    vi.spyOn(authService, 'getMe').mockResolvedValue({
      id: 'user_123',
      email: 'creator@crezine.com',
      name: 'Creative Pro',
      craft: 'Filmmaker',
      role: 'creator',
    });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(document.title).toContain('Dashboard | The Creative cashdoor');
    });

    // Dispatch auth:unauthorized event
    act(() => {
      window.dispatchEvent(new Event('auth:unauthorized'));
    });

    await waitFor(() => {
      expect(document.title).toContain('Join | The Creative cashdoor');
    });
  });

  it('renders public informational pages (Product, Pricing, About, etc.) with matching titles', async () => {
    const { unmount } = render(
      <MemoryRouter initialEntries={['/pricing']}>
        <App />
      </MemoryRouter>
    );
    expect(document.title).toContain('Pricing | The Creative cashdoor');
    unmount();

    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(document.title).toContain('About | The Creative cashdoor');
  });

  it('renders 404 Not Found for unrecognized route paths', async () => {
    render(
      <MemoryRouter initialEntries={['/non-existent-page-path']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Oops! Door not found/i)).toBeInTheDocument();
    });
  });
});
