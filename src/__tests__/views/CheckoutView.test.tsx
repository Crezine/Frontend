import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CheckoutView from '@/views/CheckoutView';
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

describe('CheckoutView (Checkout Calculations & Payment Flows)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  const setupCart = (items: Array<{ id: string; name: string; price: number; quantity: number }>) => {
    localStorage.setItem('crezine_cart', JSON.stringify(items));
  };

  it('calculates subtotal and total correctly by converting cents to dollars', async () => {
    // 4500 cents ($45.00) * 2 + 1550 cents ($15.50) * 1 = $90.00 + $15.50 = $105.50
    setupCart([
      { id: '1', name: 'Hoodie', price: 4500, quantity: 2 },
      { id: '2', name: 'Cap', price: 1550, quantity: 1 },
    ]);

    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 20000, currency: 'USD' });

    render(
      <MemoryRouter>
        <CheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/105\.50/).length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole('button', { name: /Pay \$ 105\.50/i })).toBeInTheDocument();
  });

  it('handles empty cart calculation (0.00)', async () => {
    setupCart([]);
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 5000, currency: 'USD' });

    render(
      <MemoryRouter>
        <CheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    expect(screen.getAllByText(/0\.00/).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole('button', { name: /Pay \$ 0\.00/i })).toBeInTheDocument();
  });

  it('switches between Card and Mpesa tabs', async () => {
    setupCart([{ id: '1', name: 'Item', price: 1000, quantity: 1 }]);
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 5000, currency: 'USD' });

    render(
      <MemoryRouter>
        <CheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    expect(screen.getByText('Email address')).toBeInTheDocument();

    const mpesaTabButton = screen.getByRole('button', { name: /Pay by Mpesa/i });
    fireEvent.click(mpesaTabButton);

    await waitFor(() => {
      expect(screen.getByText(/Mpesa Checkout/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/This payment method is being integrated/i)).toBeInTheDocument();

    const cardTabButton = screen.getByRole('button', { name: /Pay by card/i });
    fireEvent.click(cardTabButton);

    await waitFor(() => {
      expect(screen.getByText('Email address')).toBeInTheDocument();
    });
  });

  it('validates card form fields and shows validation errors', async () => {
    const user = userEvent.setup();
    setupCart([{ id: '1', name: 'Item', price: 2500, quantity: 1 }]);
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 5000, currency: 'USD' });

    const { container } = render(
      <MemoryRouter>
        <CheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    const payButton = screen.getByRole('button', { name: /Pay \$ 25\.00/i });
    await user.click(payButton);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('Card number is required')).toBeInTheDocument();
    
    // Check border error states
    const expiryInput = container.querySelector('input[name="expiry"]');
    const cvcInput = container.querySelector('input[name="cvc"]');
    const cardholderInput = container.querySelector('input[name="cardholderName"]');

    expect(expiryInput).toHaveClass('border-red-500');
    expect(cvcInput).toHaveClass('border-red-500');
    expect(cardholderInput).toHaveClass('border-red-500');
  });

  it('completes card payment successfully when form fields are filled', async () => {
    const user = userEvent.setup();
    setupCart([{ id: '1', name: 'Item', price: 3000, quantity: 1 }]);
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 5000, currency: 'USD' });

    const { container } = render(
      <MemoryRouter>
        <CheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    const emailInput = container.querySelector('input[name="email"]')!;
    const cardInput = container.querySelector('input[name="cardNumber"]')!;
    const expiryInput = container.querySelector('input[name="expiry"]')!;
    const cvcInput = container.querySelector('input[name="cvc"]')!;
    const cardholderInput = container.querySelector('input[name="cardholderName"]')!;

    await user.type(emailInput, 'shopper@crezine.com');
    await user.type(cardInput, '4242 4242 4242 4242');
    await user.type(expiryInput, '12/28');
    await user.type(cvcInput, '123');
    await user.type(cardholderInput, 'John Doe');

    const payButton = screen.getByRole('button', { name: /Pay \$ 30\.00/i });
    await user.click(payButton);

    await waitFor(() => {
      expect(screen.getByText('Successful transaction')).toBeInTheDocument();
    });
    expect(screen.getByText(/Payment via card/i)).toBeInTheDocument();

    const doneButton = screen.getByRole('button', { name: /Done/i });
    await user.click(doneButton);
    expect(mockParentNavigate).toHaveBeenCalledWith('wallet');
  });

  it('shows Insufficient Funds when paying with Crezine wallet and balance is less than total', async () => {
    const user = userEvent.setup();
    // Total is $50.00 (5000 cents)
    setupCart([{ id: '1', name: 'Item', price: 5000, quantity: 1 }]);
    // Wallet balance is only $20.00 (2000 cents)
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 2000, currency: 'USD' });

    render(
      <MemoryRouter>
        <CheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(walletService.getBalance).toHaveBeenCalled();
    });

    const crezineOption = screen.getByRole('button', { name: 'Crezine' });
    await user.click(crezineOption);

    expect(screen.getByText('Pay with your wallet')).toBeInTheDocument();
    expect(screen.getByText('$ 20.00')).toBeInTheDocument();

    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('Insufficient Funds')).toBeInTheDocument();
    });
    expect(screen.getByText(/Current Balance:/i)).toBeInTheDocument();

    const topUpButton = screen.getByRole('button', { name: /Top up/i });
    await user.click(topUpButton);
    expect(mockParentNavigate).toHaveBeenCalledWith('fund');
  });

  it('shows Success modal when paying with Crezine wallet and balance is sufficient', async () => {
    const user = userEvent.setup();
    // Total is $30.00 (3000 cents)
    setupCart([{ id: '1', name: 'Item', price: 3000, quantity: 1 }]);
    // Wallet balance is $100.00 (10000 cents)
    vi.spyOn(walletService, 'getBalance').mockResolvedValue({ balance: 10000, currency: 'USD' });

    render(
      <MemoryRouter>
        <CheckoutView navigate={mockParentNavigate} />
      </MemoryRouter>
    );

    const crezineOption = screen.getByRole('button', { name: 'Crezine' });
    await user.click(crezineOption);

    const confirmButton = screen.getByRole('button', { name: /Confirm/i });
    await user.click(confirmButton);

    await waitFor(() => {
      expect(screen.getByText('Successful transaction')).toBeInTheDocument();
    });
    expect(screen.getByText(/Zero transaction fees on wallet to wallet transfer/i)).toBeInTheDocument();
    expect(screen.getByText(/ADHGKAHUK/i)).toBeInTheDocument();
  });
});
