import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatusModal from '@/src/components/feedback/StatusModal';
import ErrorBoundary from '@/src/components/feedback/ErrorBoundary';

const ProblemChild = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test rendering crash error');
  }
  return <div>Healthy Child Content</div>;
};

describe('Feedback Components (StatusModal & ErrorBoundary)', () => {
  describe('StatusModal', () => {
    it('renders modal with title, message, and action triggers when isOpen is true', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const onPrimary = vi.fn();
      const onSecondary = vi.fn();

      const { rerender } = render(
        <StatusModal
          isOpen={true}
          onClose={onClose}
          type="success"
          title="Payment Verified"
          message="Your transaction was processed successfully."
          primaryAction={{ label: 'View Wallet', onClick: onPrimary }}
          secondaryAction={{ label: 'Dismiss', onClick: onSecondary }}
        />
      );

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Payment Verified')).toBeInTheDocument();
      expect(screen.getByText('Your transaction was processed successfully.')).toBeInTheDocument();

      const primaryBtn = screen.getByRole('button', { name: /View Wallet/i });
      await user.click(primaryBtn);
      expect(onPrimary).toHaveBeenCalledTimes(1);

      const secondaryBtn = screen.getByRole('button', { name: /Dismiss/i });
      await user.click(secondaryBtn);
      expect(onSecondary).toHaveBeenCalledTimes(1);

      const closeBtn = screen.getByRole('button', { name: /Close/i });
      await user.click(closeBtn);
      expect(onClose).toHaveBeenCalledTimes(1);

      // Closes when isOpen is false
      rerender(
        <StatusModal
          isOpen={false}
          onClose={onClose}
          title="Payment Verified"
        />
      );
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      });
    });

    it('renders error and warning variants with custom children', () => {
      const onClose = vi.fn();

      render(
        <StatusModal
          isOpen={true}
          onClose={onClose}
          type="error"
          title="Action Failed"
        >
          <div data-testid="custom-error-child">Custom details here</div>
        </StatusModal>
      );

      expect(screen.getByText('Action Failed')).toBeInTheDocument();
      expect(screen.getByTestId('custom-error-child')).toBeInTheDocument();
    });
  });

  describe('ErrorBoundary', () => {
    it('renders children when no error occurs', () => {
      render(
        <ErrorBoundary>
          <ProblemChild shouldThrow={false} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Healthy Child Content')).toBeInTheDocument();
    });

    it('catches render error and displays branded recovery card', () => {
      // Prevent React error output in test output
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      render(
        <ErrorBoundary>
          <ProblemChild shouldThrow={true} />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText(/We encountered an unexpected problem while rendering this view/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Home/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Reload/i })).toBeInTheDocument();

      consoleSpy.mockRestore();
    });
  });
});
