import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import WaitlistAdminView from '@/views/WaitlistAdminView';
import { waitlistService } from '@/src/services/waitlistService';

const mockApplicants = [
  {
    id: 'wl_1',
    name: 'Alice Wonder',
    fullName: 'Alice Wonder',
    email: 'alice@example.com',
    phoneNumber: '+254711111111',
    craft: 'Visual Art & Design',
    referralSource: 'Twitter',
    position: 1,
    joinedAt: '2026-09-01T10:00:00Z',
    referralCode: 'CRZ-ALICE',
    isVerified: true,
    isNotified: false,
  },
  {
    id: 'wl_2',
    name: 'Bob Builder',
    fullName: 'Bob Builder',
    email: 'bob@example.com',
    phoneNumber: '+254722222222',
    craft: 'Developer & Tech',
    referralSource: 'GitHub',
    position: 2,
    joinedAt: '2026-09-02T10:00:00Z',
    referralCode: 'CRZ-BOB',
    isVerified: false,
    isNotified: true,
  },
];

describe('WaitlistAdminView (Admin Table, Metrics & Actions)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders stats and list of waitlist applicants', async () => {
    vi.spyOn(waitlistService, 'getAdminWaitlist').mockResolvedValue(mockApplicants);
    vi.spyOn(waitlistService, 'getWaitlistStats').mockResolvedValue({
      total: 2,
      verified: 1,
      notified: 1,
      unverified: 1,
      pendingNotification: 1,
    });

    render(
      <MemoryRouter>
        <WaitlistAdminView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Waitlist Applicants/i })).toBeInTheDocument();
    });

    expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('Bob Builder')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    expect(screen.getByText('Total Signups')).toBeInTheDocument();
  });

  it('filters applicants by tab', async () => {
    const user = userEvent.setup();
    vi.spyOn(waitlistService, 'getAdminWaitlist').mockResolvedValue(mockApplicants);
    vi.spyOn(waitlistService, 'getWaitlistStats').mockResolvedValue({
      total: 2,
      verified: 1,
      notified: 1,
      unverified: 1,
      pendingNotification: 1,
    });

    render(
      <MemoryRouter>
        <WaitlistAdminView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
    });

    // Filter to Pending
    const pendingTab = screen.getByRole('button', { name: /Pending \(1\)/i });
    await user.click(pendingTab);

    expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
    expect(screen.queryByText('Bob Builder')).not.toBeInTheDocument();

    // Filter to Notified
    const notifiedTab = screen.getByRole('button', { name: /Notified \(1\)/i });
    await user.click(notifiedTab);

    expect(screen.queryByText('Alice Wonder')).not.toBeInTheDocument();
    expect(screen.getByText('Bob Builder')).toBeInTheDocument();
  });

  it('marks applicant as notified when Notify button is clicked', async () => {
    const user = userEvent.setup();
    vi.spyOn(waitlistService, 'getAdminWaitlist').mockResolvedValue(mockApplicants);
    vi.spyOn(waitlistService, 'getWaitlistStats').mockResolvedValue({
      total: 2,
      verified: 1,
      notified: 1,
      unverified: 1,
      pendingNotification: 1,
    });
    const markSpy = vi.spyOn(waitlistService, 'markAsNotified').mockResolvedValue(true);

    render(
      <MemoryRouter>
        <WaitlistAdminView />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Alice Wonder')).toBeInTheDocument();
    });

    const notifyButton = screen.getByRole('button', { name: /Notify/i });
    await user.click(notifyButton);

    expect(markSpy).toHaveBeenCalledWith('alice@example.com');
  });
});
