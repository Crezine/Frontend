import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActionButton from '@/components/ActionButton';
import AnimatedButton from '@/components/AnimatedButton';
import TransactionItem from '@/components/TransactionItem';
import EventTicket from '@/components/EventTicket';

describe('UI Presentation Components', () => {
  describe('ActionButton', () => {
    it('renders default CTA style button with children', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<ActionButton onClick={handleClick}>Explore Platform</ActionButton>);

      const button = screen.getByRole('button', { name: /Explore Platform/i });
      expect(button).toBeInTheDocument();
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders dashboard quick action button style when icon and label are provided', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <ActionButton
          icon={<span data-testid="test-icon">ICON</span>}
          label="Transfer Funds"
          color="bg-primary/10"
          onClick={handleClick}
        />
      );

      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
      expect(screen.getByText('Transfer Funds')).toBeInTheDocument();

      const button = screen.getByRole('button');
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('AnimatedButton', () => {
    it('renders animated button with default and custom label', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      const { rerender } = render(<AnimatedButton onClick={handleClick} />);
      expect(screen.getByText('Explore features')).toBeInTheDocument();

      const btn = screen.getByRole('button');
      await user.click(btn);
      expect(handleClick).toHaveBeenCalledTimes(1);

      rerender(<AnimatedButton label="Contact Us" onClick={handleClick} />);
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
    });
  });

  describe('TransactionItem', () => {
    it('renders positive credit transaction with green styling', () => {
      render(
        <TransactionItem
          title="Payment Received"
          date="23 AUG 2026"
          amount="+$450.00"
          type="positive"
        />
      );

      expect(screen.getByText('Payment Received')).toBeInTheDocument();
      expect(screen.getByText('23 AUG 2026')).toBeInTheDocument();
      expect(screen.getByText('+$450.00')).toBeInTheDocument();
      expect(screen.getByText('+$450.00')).toHaveClass('text-emerald-600');
    });

    it('renders negative debit transaction with secondary styling', () => {
      render(
        <TransactionItem
          title="Withdrawal to Bank"
          date="22 AUG 2026"
          amount="-$150.00"
          type="negative"
        />
      );

      expect(screen.getByText('Withdrawal to Bank')).toBeInTheDocument();
      expect(screen.getByText('22 AUG 2026')).toBeInTheDocument();
      expect(screen.getByText('-$150.00')).toBeInTheDocument();
      expect(screen.getByText('-$150.00')).toHaveClass('text-secondary');
    });
  });

  describe('EventTicket', () => {
    it('renders ticket details with default props', () => {
      render(<EventTicket />);

      expect(screen.getByText('Oktoba Fest 2026')).toBeInTheDocument();
      expect(screen.getByText('20 . 11 . 2026')).toBeInTheDocument();
      expect(screen.getByText('12 : 00 PM')).toBeInTheDocument();
      expect(screen.getByText('Vip experience')).toBeInTheDocument();
      expect(screen.getByText('BGD99763JS')).toBeInTheDocument();
      expect(screen.getByText('Kileleshwa')).toBeInTheDocument();
      expect(screen.getByText('Scan to verify')).toBeInTheDocument();
    });

    it('renders ticket details with custom props', () => {
      render(
        <EventTicket
          eventName="Art Summit 2026"
          eventDate="10 . 10 . 2026"
          startTime="09 : 00 AM"
          endTime="05 : 00 PM"
          checkInType="Early Bird"
          orderId="ORD-ART-123"
          location="Museum Hall"
          eventImage="/art.png"
        />
      );

      expect(screen.getByText('Art Summit 2026')).toBeInTheDocument();
      expect(screen.getByText('10 . 10 . 2026')).toBeInTheDocument();
      expect(screen.getByText('09 : 00 AM')).toBeInTheDocument();
      expect(screen.getByText('Early Bird')).toBeInTheDocument();
      expect(screen.getByText('ORD-ART-123')).toBeInTheDocument();
      expect(screen.getByText('Museum Hall')).toBeInTheDocument();
    });
  });
});
