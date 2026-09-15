import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import OnboardingView from '@/views/OnboardingView';
import { authService } from '@/src/services/authService';

const mockNavigate = vi.fn();
const mockComplete = vi.fn();
const mockLogin = vi.fn();

describe('OnboardingView (Auth & Multi-step Onboarding Flows)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  const renderOnboarding = () => {
    return render(
      <MemoryRouter>
        <OnboardingView
          navigate={mockNavigate}
          onComplete={mockComplete}
          onLogin={mockLogin}
        />
      </MemoryRouter>
    );
  };

  it('renders initial signup step and switches to login step', async () => {
    const user = userEvent.setup();
    renderOnboarding();

    expect(screen.getByText('Setup your Creative Cashdoor')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your full Name')).toBeInTheDocument();

    const goToLoginLink = screen.getByText('Log in');
    await user.click(goToLoginLink);

    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('validates signup input before sending email OTP', async () => {
    const user = userEvent.setup();
    renderOnboarding();

    const sendCodeButton = screen.getByRole('button', { name: /Send email code/i });
    await user.click(sendCodeButton);

    expect(screen.getByText('Full Name and Email are required to proceed.')).toBeInTheDocument();

    // Invalid email format
    const nameInput = screen.getByPlaceholderText('Enter your full Name');
    const emailInput = screen.getByPlaceholderText('Enter your Email');
    await user.type(nameInput, 'Alex Creative');
    await user.type(emailInput, 'not-an-email');
    await user.click(sendCodeButton);

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('executes full email OTP signup, KYC, and password creation flow', async () => {
    const user = userEvent.setup();
    vi.spyOn(authService, 'sendEmailOtp').mockResolvedValue(undefined);
    vi.spyOn(authService, 'verifyEmailOtp').mockResolvedValue(undefined);
    vi.spyOn(authService, 'register').mockResolvedValue({
      id: 'uid_new',
      email: 'alex@crezine.com',
      role: 'creator',
    });

    const { container } = renderOnboarding();

    // 1. Signup Step
    await user.type(screen.getByPlaceholderText('Enter your full Name'), 'Alex Creator');
    await user.type(screen.getByPlaceholderText('Enter your Email'), 'alex@crezine.com');
    await user.click(screen.getByRole('button', { name: /Send email code/i }));

    expect(authService.sendEmailOtp).toHaveBeenCalledWith('alex@crezine.com');

    // 2. Email Verification Step
    await waitFor(() => {
      expect(screen.getByText(/Email Verification/i)).toBeInTheDocument();
    });

    // Enter 5 digit OTP
    const otpInputs = container.querySelectorAll('input[maxlength="1"]');
    expect(otpInputs.length).toBe(5);
    for (let i = 0; i < 5; i++) {
      fireEvent.change(otpInputs[i], { target: { value: String(i + 1) } });
    }

    const verifyOtpButton = screen.getByRole('button', { name: /Verify & Continue/i });
    await user.click(verifyOtpButton);
    expect(authService.verifyEmailOtp).toHaveBeenCalledWith('alex@crezine.com', '12345');

    // 3. Basic Details Step
    await waitFor(() => {
      expect(screen.getByText(/Enter your basic details/i)).toBeInTheDocument();
    });

    const craftInput = screen.getByPlaceholderText(/Graphic Designer/i);
    await user.type(craftInput, 'Music Producer');
    await user.click(screen.getByRole('button', { name: /Continue/i }));

    // 4. Verify Identity (KYC) Step
    await waitFor(() => {
      expect(screen.getByText(/Verify Your Identity/i)).toBeInTheDocument();
    });

    const proceedDemoButton = screen.getByRole('button', { name: /Proceed without uploading \(Demo\)/i });
    await user.click(proceedDemoButton);

    // 5. Create Password Step
    await waitFor(() => {
      expect(screen.getByText(/Setup your log in details/i)).toBeInTheDocument();
    });

    const passInput = screen.getByPlaceholderText('Enter your new password');
    const confirmPassInput = screen.getByPlaceholderText('Confirm your new password');
    await user.type(passInput, 'SecurePass123!');
    await user.type(confirmPassInput, 'SecurePass123!');

    const createCashdoorButton = screen.getByRole('button', { name: /Continue/i });
    await user.click(createCashdoorButton);

    expect(authService.register).toHaveBeenCalledWith('alex@crezine.com', 'SecurePass123!');

    // 6. Cashdoor Created Step
    await waitFor(() => {
      expect(screen.getByText(/Cashdoor Created!/i)).toBeInTheDocument();
    });

    // Skip to complete onboarding
    const skipButton = screen.getByRole('button', { name: /Skip for now/i });
    await user.click(skipButton);

    expect(mockComplete).toHaveBeenCalledWith({
      name: 'Alex Creator',
      email: 'alex@crezine.com',
      craft: 'Music Producer',
    });
  });

  it('handles password mismatch error during password creation step', async () => {
    const user = userEvent.setup();
    vi.spyOn(authService, 'sendEmailOtp').mockResolvedValue(undefined);
    vi.spyOn(authService, 'verifyEmailOtp').mockResolvedValue(undefined);

    const { container } = renderOnboarding();

    // Fast-forward to password creation
    await user.type(screen.getByPlaceholderText('Enter your full Name'), 'Alex');
    await user.type(screen.getByPlaceholderText('Enter your Email'), 'alex@test.com');
    await user.click(screen.getByRole('button', { name: /Send email code/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email Verification/i)).toBeInTheDocument();
    });

    const otpInputs = container.querySelectorAll('input[maxlength="1"]');
    for (let i = 0; i < 5; i++) {
      fireEvent.change(otpInputs[i], { target: { value: '1' } });
    }
    await user.click(screen.getByRole('button', { name: /Verify & Continue/i }));

    await waitFor(() => {
      expect(screen.getByText(/Enter your basic details/i)).toBeInTheDocument();
    });
    await user.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /Proceed without uploading \(Demo\)/i })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('button', { name: /Proceed without uploading \(Demo\)/i }));

    await waitFor(() => {
      expect(screen.getByText(/Setup your log in details/i)).toBeInTheDocument();
    });

    const passInput = screen.getByPlaceholderText('Enter your new password');
    const confirmPassInput = screen.getByPlaceholderText('Confirm your new password');
    await user.type(passInput, 'PassOne123!');
    await user.type(confirmPassInput, 'PassDifferent!');

    await user.click(screen.getByRole('button', { name: /Continue/i }));

    expect(screen.getByText('Passwords do not match')).toBeInTheDocument();
  });

  it('handles login credentials and social logins', async () => {
    const user = userEvent.setup();
    vi.spyOn(authService, 'login').mockResolvedValue({ id: 'u1', email: 'login@test.com', role: 'user' });
    vi.spyOn(authService, 'loginWithGoogle').mockResolvedValue({ id: 'u2', email: 'g@test.com', role: 'user' });
    vi.spyOn(authService, 'loginWithApple').mockResolvedValue({ id: 'u3', email: 'a@test.com', role: 'user' });

    renderOnboarding();

    // Google Login from Signup step
    const googleButton = screen.getByRole('button', { name: /Continue with Google/i });
    await user.click(googleButton);
    expect(authService.loginWithGoogle).toHaveBeenCalled();

    // Apple Login from Signup step
    const appleButton = screen.getByRole('button', { name: /Continue with Apple/i });
    await user.click(appleButton);
    expect(authService.loginWithApple).toHaveBeenCalled();

    // Go to login
    await user.click(screen.getByText('Log in'));

    // Submit with empty fields
    const loginButton = screen.getByRole('button', { name: /^Login$/i });
    await user.click(loginButton);
    expect(screen.getByText('Please enter both email and password')).toBeInTheDocument();

    // Submit valid login
    await user.type(screen.getByPlaceholderText('Enter your email'), 'login@test.com');
    await user.type(screen.getByPlaceholderText('Enter your password'), 'Password123!');
    await user.click(loginButton);

    expect(authService.login).toHaveBeenCalledWith('login@test.com', 'Password123!');
    expect(mockLogin).toHaveBeenCalled();
  });

  it('handles forgot password flow', async () => {
    const user = userEvent.setup();
    vi.spyOn(authService, 'sendPasswordResetEmail').mockResolvedValue(undefined);

    renderOnboarding();

    await user.click(screen.getByText('Log in'));
    await user.click(screen.getByText(/Forgot password \?/i));

    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();

    const resetEmailInput = screen.getByPlaceholderText('Enter your email');
    await user.type(resetEmailInput, 'forgot@test.com');

    const sendResetButton = screen.getByRole('button', { name: /Send Reset Link/i });
    await user.click(sendResetButton);

    expect(authService.sendPasswordResetEmail).toHaveBeenCalledWith('forgot@test.com');
  });

  it('handles back button navigation across states', async () => {
    const user = userEvent.setup();
    renderOnboarding();

    // Back from signup navigates to landing
    const backButton = screen.getAllByRole('button')[0];
    await user.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('landing');

    // Go to login and click back -> returns to signup
    await user.click(screen.getByText('Log in'));
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    await user.click(backButton);
    expect(screen.getByText('Setup your Creative Cashdoor')).toBeInTheDocument();
  });
});
