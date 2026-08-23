import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import TicketCheckoutView from '@/views/TicketCheckoutView';
import { walletService } from '@/src/services/walletService';

const mockNavigate = vi.fn();
const mockParentNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock('@react-pdf/renderer', () => ({
  PDFDownloadLink: ({ children, fileName }: any) => (
    <button data-testid="pdf-download-link" data-filename={fileName}>
      {typeof children === 'function' ? children({ loading: false }) : children}
    </button>
  ),
  Document: ({ children }: any) => <div>{children}</div>,
  Page: ({ children }: any) => <div>{children}</div>,
  Text: ({ children }: any) => <span>{children}</span>,
  View: ({ children }: any) => <div>{children}</div>,
  StyleSheet: { create: (s: any) => s },
  Font: { register: vi.fn() },
  Image: () => <img alt="pdf-img" />,
}));

describe('TicketCheckoutView (Ticket Checkout Calculations & Actions)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('uses default $250.00 total when localStorage is empty', async () => {
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 50000, currency: 'USD' });

    render(
      <MemoryRouter>
        <TicketCheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/250\.00/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('button', { name: /Pay \$ 250\.00/i })).toBeInTheDocument();
  });

  it('uses custom total from localStorage crezine_checkout_total', async () => {
    localStorage.setItem('crezine_checkout_total', '75.50');
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 50000, currency: 'USD' });

    render(
      <MemoryRouter>
        <TicketCheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/75\.50/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('button', { name: /Pay \$ 75\.50/i })).toBeInTheDocument();
  });

  it('validates card form fields on submit', async () => {
    const user = userEvent.setup();
    localStorage.setItem('crezine_checkout_total', '100.00');
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 50000, currency: 'USD' });

    const { container } = render(
      <MemoryRouter>
        <TicketCheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    const payButton = screen.getByRole('button', { name: /Pay \$ 100\.00/i });
    await user.click(payButton);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Card number is required')).toBeInTheDocument();
    expect(screen.getByText('Expiry is required')).toBeInTheDocument();
    expect(screen.getByText('CVC is required')).toBeInTheDocument();
  });

  it('handles Crezine wallet insufficient funds and top up navigation', async () => {
    const user = userEvent.setup();
    localStorage.setItem('crezine_checkout_total', '300.00');
    // Balance only $100.00 (10000 cents)
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 10000, currency: 'USD' });

    render(
      <MemoryRouter>
        <TicketCheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    const crezineOption = screen.getByRole('button', { name: 'crezine' });
    await user.click(crezineOption);

    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('Insufficient Funds')).toBeInTheDocument();
    });

    const topUpButton = screen.getByRole('button', { name: /Top up/i });
    await user.click(topUpButton);
    expect(mockParentNavigate).toHaveBeenCalledWith('fund');
  });

  it('completes payment successfully and displays ticket actions', async () => {
    const user = userEvent.setup();
    localStorage.setItem('crezine_checkout_total', '50.00');
    localStorage.setItem(
      'crezine_ticket_data',
      JSON.stringify({
        eventName: 'Live Concert 2026',
        eventDate: '15 . 12 . 2026',
        startTime: '08 : 00 PM',
        endTime: '11 : 00 PM',
        checkInType: 'VIP',
        orderId: 'ORD_TEST_999',
        location: 'Nairobi',
        eventImage: '/event.png',
      })
    );

    // Balance $500.00 (50000 cents)
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 50000, currency: 'USD' });

    render(
      <MemoryRouter>
        <TicketCheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    const crezineOption = screen.getByRole('button', { name: 'crezine' });
    await user.click(crezineOption);

    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('Payment Complete')).toBeInTheDocument();
    });
    expect(screen.getByText(/Enter your email to receive your PDF ticket/i)).toBeInTheDocument();
    expect(screen.getByTestId('pdf-download-link')).toHaveAttribute('data-filename', 'ORD_TEST_999-ticket.pdf');

    // Test preview ticket modal toggle
    const previewButton = screen.getByRole('button', { name: /Preview ticket/i });
    await user.click(previewButton);

    expect(screen.getByText('Live Concert 2026')).toBeInTheDocument();

    // Done navigation
    const backToWalletButton = screen.getByRole('button', { name: /Back to wallet/i });
    await user.click(backToWalletButton);
    expect(mockParentNavigate).toHaveBeenCalledWith('wallet');
  });
});
