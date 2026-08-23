import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { WaitlistProvider, useWaitlist } from '@/src/context/WaitlistContext';
import { waitlistService } from '@/src/services/waitlistService';

const TestComponent = () => {
  const {
    isModalOpen,
    openWaitlistModal,
    closeWaitlistModal,
    isBannerVisible,
    dismissBanner,
    savedEntry,
    submitWaitlist,
    hasJoined,
  } = useWaitlist();
  const navigate = useNavigate();

  return (
    <div>
      <div data-testid="modal-state">{isModalOpen ? 'OPEN' : 'CLOSED'}</div>
      <div data-testid="banner-state">{isBannerVisible ? 'VISIBLE' : 'HIDDEN'}</div>
      <div data-testid="joined-state">{hasJoined ? 'JOINED' : 'NOT_JOINED'}</div>
      <div data-testid="user-email">{savedEntry ? savedEntry.email : 'NONE'}</div>

      <button onClick={openWaitlistModal}>Open Modal</button>
      <button onClick={closeWaitlistModal}>Close Modal</button>
      <button onClick={dismissBanner}>Dismiss Banner</button>
      <button onClick={() => navigate('/dashboard/wallet')}>Go Dashboard</button>
      <button onClick={() => navigate('/checkout')}>Go Checkout</button>
      <button onClick={() => navigate('/shop')}>Go Shop</button>
      <button
        onClick={() =>
          submitWaitlist({
            name: 'Taylor',
            email: 'taylor@example.com',
            craft: 'Sculptor',
          })
        }
      >
        Join Waitlist
      </button>
    </div>
  );
};

describe('WaitlistContext & Provider', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('throws error when useWaitlist is rendered outside provider', () => {
    expect(() => renderHook(() => useWaitlist())).toThrow(
      'useWaitlist must be used within a WaitlistProvider'
    );
  });

  it('provides modal open/close controls and banner dismissals', async () => {
    const user = userEvent.setup();
    const dismissModalSpy = vi.spyOn(waitlistService, 'dismissModal');

    render(
      <MemoryRouter initialEntries={['/']}>
        <WaitlistProvider>
          <TestComponent />
        </WaitlistProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('modal-state')).toHaveTextContent('CLOSED');
    expect(screen.getByTestId('banner-state')).toHaveTextContent('VISIBLE');
    expect(screen.getByTestId('joined-state')).toHaveTextContent('NOT_JOINED');

    // Open Modal
    await user.click(screen.getByRole('button', { name: /Open Modal/i }));
    expect(screen.getByTestId('modal-state')).toHaveTextContent('OPEN');

    // Close Modal
    await user.click(screen.getByRole('button', { name: /Close Modal/i }));
    expect(screen.getByTestId('modal-state')).toHaveTextContent('CLOSED');
    expect(dismissModalSpy).toHaveBeenCalledTimes(1);

    // Dismiss banner
    await user.click(screen.getByRole('button', { name: /Dismiss Banner/i }));
    expect(screen.getByTestId('banner-state')).toHaveTextContent('HIDDEN');
  });

  it('toggles banner visibility based on route (hidden on dashboard and checkout)', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/shop']}>
        <WaitlistProvider>
          <TestComponent />
        </WaitlistProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('banner-state')).toHaveTextContent('VISIBLE');

    // Navigate to dashboard
    await user.click(screen.getByRole('button', { name: /Go Dashboard/i }));
    expect(screen.getByTestId('banner-state')).toHaveTextContent('HIDDEN');

    // Navigate to checkout
    await user.click(screen.getByRole('button', { name: /Go Checkout/i }));
    expect(screen.getByTestId('banner-state')).toHaveTextContent('HIDDEN');

    // Navigate to shop
    await user.click(screen.getByRole('button', { name: /Go Shop/i }));
    expect(screen.getByTestId('banner-state')).toHaveTextContent('VISIBLE');
  });

  it('submits waitlist data and updates savedEntry and hasJoined state', async () => {
    const user = userEvent.setup();
    vi.spyOn(waitlistService, 'joinWaitlist').mockResolvedValue({
      id: 'wl_1',
      name: 'Taylor',
      email: 'taylor@example.com',
      craft: 'Sculptor',
      position: 400,
      joinedAt: new Date().toISOString(),
      referralCode: 'CRZ-TAYLOR',
    });

    render(
      <MemoryRouter initialEntries={['/']}>
        <WaitlistProvider>
          <TestComponent />
        </WaitlistProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('user-email')).toHaveTextContent('NONE');

    await user.click(screen.getByRole('button', { name: /Join Waitlist/i }));

    expect(waitlistService.joinWaitlist).toHaveBeenCalledWith({
      name: 'Taylor',
      email: 'taylor@example.com',
      craft: 'Sculptor',
    });

    expect(screen.getByTestId('joined-state')).toHaveTextContent('JOINED');
    expect(screen.getByTestId('user-email')).toHaveTextContent('taylor@example.com');
  });
});
