import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  SetupWalletStep,
  VerifyMpesaStep,
  ConfirmPhonePinStep,
  LinkBankStep,
  VerifyBankStep,
} from '@/components/onboarding/WalletSetupSteps';
import {
  ResetLinkSentStep,
  RedirectingStep,
  CashdoorCreatedStep,
  LinkedSuccessStep,
  ProcessingStep,
  OpenCashdoorStep,
} from '@/components/onboarding/StatusTransitions';

describe('Onboarding Sub-Steps & Transition Components', () => {
  describe('WalletSetupSteps', () => {
    it('SetupWalletStep handles selecting Mpesa, Bank, and Skip', async () => {
      const user = userEvent.setup();
      const onSelectMpesa = vi.fn();
      const onSelectBank = vi.fn();
      const onSkip = vi.fn();

      render(
        <SetupWalletStep
          onSelectMpesa={onSelectMpesa}
          onSelectBank={onSelectBank}
          onSkip={onSkip}
        />
      );

      expect(screen.getByText(/Setup your wallet/i)).toBeInTheDocument();

      const mpesaButton = screen.getByRole('button', { name: /M-pesa/i });
      await user.click(mpesaButton);
      expect(onSelectMpesa).toHaveBeenCalledTimes(1);

      const bankButton = screen.getByRole('button', { name: /Bank/i });
      await user.click(bankButton);
      expect(onSelectBank).toHaveBeenCalledTimes(1);

      const skipButton = screen.getByRole('button', { name: /Skip for now/i });
      await user.click(skipButton);
      expect(onSkip).toHaveBeenCalledTimes(1);
    });

    it('VerifyMpesaStep handles phone input and validation/navigation', async () => {
      const user = userEvent.setup();
      const setPhone = vi.fn();
      const onVerify = vi.fn();
      const onNavigateTerms = vi.fn();
      const onNavigatePrivacy = vi.fn();

      render(
        <VerifyMpesaStep
          phone="0712345678"
          setPhone={setPhone}
          onVerify={onVerify}
          onNavigateTerms={onNavigateTerms}
          onNavigatePrivacy={onNavigatePrivacy}
        />
      );

      const verifyButton = screen.getByRole('button', { name: /^Verify$/i });
      await user.click(verifyButton);
      expect(onVerify).toHaveBeenCalledTimes(1);

      const termsLink = screen.getByRole('button', { name: /Terms of Service/i });
      await user.click(termsLink);
      expect(onNavigateTerms).toHaveBeenCalledTimes(1);

      const privacyLink = screen.getByRole('button', { name: /Privacy policy/i });
      await user.click(privacyLink);
      expect(onNavigatePrivacy).toHaveBeenCalledTimes(1);
    });

    it('ConfirmPhonePinStep handles pin submit', async () => {
      const user = userEvent.setup();
      const onConfirm = vi.fn();

      render(<ConfirmPhonePinStep onConfirm={onConfirm} />);

      expect(screen.getByText(/Confirm your phone/i)).toBeInTheDocument();
      expect(screen.getByText(/Enter Pin/i)).toBeInTheDocument();
      const confirmButton = screen.getByRole('button', { name: /^Confirm$/i });
      await user.click(confirmButton);
      expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('LinkBankStep handles bank selection and inputs', async () => {
      const user = userEvent.setup();
      const setSelectedBank = vi.fn();
      const setAccountNumber = vi.fn();
      const setAccountName = vi.fn();
      const onContinue = vi.fn();
      const onNavigateTerms = vi.fn();
      const onNavigatePrivacy = vi.fn();

      render(
        <LinkBankStep
          selectedBank="kcb"
          setSelectedBank={setSelectedBank}
          accountNumber="1234567890"
          setAccountNumber={setAccountNumber}
          accountName="Alex Doe"
          setAccountName={setAccountName}
          onContinue={onContinue}
          onNavigateTerms={onNavigateTerms}
          onNavigatePrivacy={onNavigatePrivacy}
        />
      );

      expect(screen.getByText(/Link Bank Account/i)).toBeInTheDocument();

      const continueButton = screen.getByRole('button', { name: /Continue/i });
      await user.click(continueButton);
      expect(onContinue).toHaveBeenCalledTimes(1);

      const termsLink = screen.getByRole('button', { name: /^Terms$/i });
      await user.click(termsLink);
      expect(onNavigateTerms).toHaveBeenCalledTimes(1);

      const privacyLink = screen.getByRole('button', { name: /^Privacy$/i });
      await user.click(privacyLink);
      expect(onNavigatePrivacy).toHaveBeenCalledTimes(1);
    });

    it('VerifyBankStep handles OTP input and verification', async () => {
      const user = userEvent.setup();
      const onOtpChange = vi.fn();
      const onVerify = vi.fn();

      render(
        <VerifyBankStep
          otp={['1', '2', '3', '4', '5']}
          onOtpChange={onOtpChange}
          onVerify={onVerify}
        />
      );

      const verifyButton = screen.getByRole('button', { name: /^Verify$/i });
      await user.click(verifyButton);
      expect(onVerify).toHaveBeenCalledTimes(1);
    });
  });

  describe('StatusTransitions', () => {
    it('renders ResetLinkSentStep, RedirectingStep, CashdoorCreatedStep, LinkedSuccessStep, ProcessingStep, OpenCashdoorStep', async () => {
      const user = userEvent.setup();
      const onManualRedirect = vi.fn();
      const onSetupWallet = vi.fn();
      const onSkip = vi.fn();
      const onContinue = vi.fn();
      const onProceedDemo = vi.fn();
      const onComplete = vi.fn();

      const { rerender } = render(<ResetLinkSentStep />);
      expect(screen.getByText(/A reset link has been sent/i)).toBeInTheDocument();

      rerender(<RedirectingStep onManualRedirect={onManualRedirect} />);
      expect(screen.getByText(/Redirecting/i)).toBeInTheDocument();
      await user.click(screen.getByText(/\(Manual redirect for demo\)/i));
      expect(onManualRedirect).toHaveBeenCalledTimes(1);

      rerender(<CashdoorCreatedStep onSetupWallet={onSetupWallet} onSkip={onSkip} />);
      expect(screen.getByText(/Cashdoor Created!/i)).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /Link Bank\/ M-pesa/i }));
      expect(onSetupWallet).toHaveBeenCalledTimes(1);

      rerender(<LinkedSuccessStep title="M-pesa Linked!" onContinue={onContinue} />);
      expect(screen.getByText('M-pesa Linked!')).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /Continue/i }));
      expect(onContinue).toHaveBeenCalledTimes(1);

      rerender(<ProcessingStep onProceedDemo={onProceedDemo} />);
      expect(screen.getByText(/Verifying details with provider.../i)).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /\(Demo: Click to proceed\)/i }));
      expect(onProceedDemo).toHaveBeenCalledTimes(1);

      rerender(<OpenCashdoorStep onComplete={onComplete} />);
      expect(screen.getByText(/Cashdoor Created!/i)).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /Open Cashdoor/i }));
      expect(onComplete).toHaveBeenCalledTimes(1);
    });
  });
});
