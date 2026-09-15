import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import CartSidebar from '@/components/CartSidebar';

describe('CartSidebar (Cart Calculations & Interactions)', () => {
  const mockClose = vi.fn();
  const mockNavigate = vi.fn();
  const mockUpdateQuantity = vi.fn();
  const mockRemove = vi.fn();
  const mockSetSubView = vi.fn();

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('renders empty cart message and handles subview actions', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <CartSidebar
          isOpen={true}
          onClose={mockClose}
          navigate={mockNavigate}
          items={[]}
          onUpdateQuantity={mockUpdateQuantity}
          onRemove={mockRemove}
          setSubView={mockSetSubView}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Your Cart is Empty!')).toBeInTheDocument();
    expect(screen.getByText('CART (0)')).toBeInTheDocument();

    const homeButton = screen.getByRole('button', { name: /Home/i });
    await user.click(homeButton);
    expect(mockSetSubView).toHaveBeenCalledWith('all-products');
    expect(mockClose).toHaveBeenCalledTimes(1);

    const shopButton = screen.getByRole('button', { name: /Shop/i });
    await user.click(shopButton);
    expect(mockSetSubView).toHaveBeenCalledWith('collections');
  });

  it('calculates subtotal correctly and handles quantity changes and item removal', async () => {
    const user = userEvent.setup();
    const items = [
      { id: '1', name: 'Hoodie', price: 50.0, image: '/h.png', size: 'M', quantity: 2 },
      { id: '2', name: 'Cap', price: 20.0, image: '/c.png', size: 'One Size', quantity: 3 },
    ];
    // Subtotal: 50 * 2 + 20 * 3 = 100 + 60 = 160.00

    render(
      <MemoryRouter>
        <CartSidebar
          isOpen={true}
          onClose={mockClose}
          navigate={mockNavigate}
          items={items}
          onUpdateQuantity={mockUpdateQuantity}
          onRemove={mockRemove}
          setSubView={mockSetSubView}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('CART (2)')).toBeInTheDocument();
    expect(screen.getByText('Hoodie')).toBeInTheDocument();
    expect(screen.getByText('Cap')).toBeInTheDocument();
    expect(screen.getByText('$ 160.00')).toBeInTheDocument();

    // Increment Hoodie quantity (+ button)
    const plusButtons = screen.getAllByRole('button').filter((btn) => btn.querySelector('svg.feather-plus, svg'));
    // Or clicking the minus and plus directly
    const hoodieCard = screen.getByText('Hoodie').closest('.flex');
    const plusBtn = hoodieCard?.querySelectorAll('button')[0]; // minus is 0, plus is 1, remove is 2
    // Let's click the minus button for item '1'
    const minusBtn = hoodieCard?.querySelectorAll('button')[0];
    if (minusBtn) await user.click(minusBtn);
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', -1);

    const addBtn = hoodieCard?.querySelectorAll('button')[1];
    if (addBtn) await user.click(addBtn);
    expect(mockUpdateQuantity).toHaveBeenCalledWith('1', 1);

    // Click Remove for Hoodie
    const removeButtons = screen.getAllByRole('button', { name: /REMOVE/i });
    await user.click(removeButtons[0]);
    expect(mockRemove).toHaveBeenCalledWith('1');

    // Click Checkout
    const checkoutButton = screen.getByRole('button', { name: /Checkout/i });
    await user.click(checkoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('checkout', expect.anything());
    expect(mockClose).toHaveBeenCalled();
  });
});
