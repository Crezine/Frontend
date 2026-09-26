import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { WaitlistProvider, useWaitlist } from '@/src/context/WaitlistContext';
import WaitlistModal from '@/components/WaitlistModal';
import { waitlistService } from '@/src/services/waitlistService';

// Helper component that opens the modal on mount
const ModalOpener = () => {
  const { openWaitlistModal } = useWaitlist();
  return (
    <button onClick={openWaitlistModal} data-testid="open-modal-btn">
      Open Waitlist
    </button>
  );
};

const renderWithContext = () => {
  return render(
    <MemoryRouter>
      <WaitlistProvider>
        <ModalOpener />
        <WaitlistModal />
      </WaitlistProvider>
    </MemoryRouter>
  );
};

describe('WaitlistModal (Signup Form & User Feedback)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('renders sign-up form with fields for email, name, and phone when opened', async () => {
    const user = userEvent.setup();
    renderWithContext();

    await user.click(screen.getByTestId('open-modal-btn'));

    expect(screen.getByRole('heading', { name: /Join the waitlist\./i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Your full name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/you@example\.com/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/\+254 700 000 000/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Join the waitlist/i })).toBeInTheDocument();
  });

  it('provides positive user feedback on successful waitlist sign-up', async () => {
    const user = userEvent.setup();
    vi.spyOn(waitlistService, 'joinWaitlist').mockResolvedValue({
      id: 'wl_succ_1',
      name: 'Maya Angelou',
      fullName: 'Maya Angelou',
      email: 'maya@crezine.com',
      position: 412,
      joinedAt: new Date().toISOString(),
      referralCode: 'CRZ-MAYA',
      craft: 'Writer & Poet',
      isVerified: false,
      isNotified: false,
    });

    renderWithContext();
    await user.click(screen.getByTestId('open-modal-btn'));

    const nameInput = screen.getByPlaceholderText(/Your full name/i);
    const emailInput = screen.getByPlaceholderText(/you@example\.com/i);

    await user.type(nameInput, 'Maya Angelou');
    await user.type(emailInput, 'maya@crezine.com');

    await user.click(screen.getByRole('button', { name: /Join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /You're on the waitlist\./i })).toBeInTheDocument();
    });

    expect(screen.getByText(/#412/)).toBeInTheDocument();
    expect(screen.getByText(/maya@crezine\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/0% platform fees/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Done/i })).toBeInTheDocument();
  });

  it('provides clear user feedback when the email is already registered on the waitlist', async () => {
    const user = userEvent.setup();
    const conflictErr = new Error('This email is already on the waitlist');
    (conflictErr as any).status = 409;
    (conflictErr as any).isAlreadyOnWaitlist = true;
    vi.spyOn(waitlistService, 'joinWaitlist').mockRejectedValue(conflictErr);

    renderWithContext();
    await user.click(screen.getByTestId('open-modal-btn'));

    const nameInput = screen.getByPlaceholderText(/Your full name/i);
    const emailInput = screen.getByPlaceholderText(/you@example\.com/i);

    await user.type(nameInput, 'Existing Creator');
    await user.type(emailInput, 'existing@crezine.com');

    await user.click(screen.getByRole('button', { name: /Join the waitlist/i }));

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /You're already on the list!/i })).toBeInTheDocument();
    });

    expect(screen.getByText(/Email Already on Waitlist/i)).toBeInTheDocument();
    expect(screen.getByText(/existing@crezine\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Early Access Status: Active & Confirmed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Use Another Email/i })).toBeInTheDocument();
  });

  it('validates email format before submission', async () => {
    const user = userEvent.setup();
    renderWithContext();
    await user.click(screen.getByTestId('open-modal-btn'));

    const nameInput = screen.getByPlaceholderText(/Your full name/i);
    const emailInput = screen.getByPlaceholderText(/you@example\.com/i);

    await user.type(nameInput, 'Invalid Email User');
    await user.type(emailInput, 'invalid-email-domain');

    const form = emailInput.closest('form')!;
    fireEvent.submit(form);

    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
  });
});
