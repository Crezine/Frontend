import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { RiArrowLeftLine } from 'react-icons/ri';
import { AppView, UserData } from '../types';
import { authService } from '../src/services/authService';
import { ConfirmationResult } from 'firebase/auth';

import { OnboardingMode } from '../components/onboarding/types';
import SignupStep from '../components/onboarding/SignupStep';
import LoginStep from '../components/onboarding/LoginStep';
import EmailVerificationStep from '../components/onboarding/EmailVerificationStep';
import ForgotPasswordStep from '../components/onboarding/ForgotPasswordStep';
import ResetPasswordStep from '../components/onboarding/ResetPasswordStep';
import { EnterPhoneStep, PhoneVerificationStep } from '../components/onboarding/PhoneAuthStep';
import BasicDetailsStep from '../components/onboarding/BasicDetailsStep';
import KycIdentityStep from '../components/onboarding/KycIdentityStep';
import CreatePasswordStep from '../components/onboarding/CreatePasswordStep';
import {
  SetupWalletStep,
  VerifyMpesaStep,
  ConfirmPhonePinStep,
  LinkBankStep,
  VerifyBankStep,
} from '../components/onboarding/WalletSetupSteps';
import {
  ResetLinkSentStep,
  RedirectingStep,
  CashdoorCreatedStep,
  LinkedSuccessStep,
  ProcessingStep,
  OpenCashdoorStep,
} from '../components/onboarding/StatusTransitions';

interface OnboardingViewProps {
  navigate: (view: AppView) => void;
  onComplete: (data: UserData) => void;
  onLogin?: () => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ navigate, onComplete, onLogin }) => {
  const [mode, setMode] = useState<OnboardingMode>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [craft, setCraft] = useState('');

  // Auth states
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // KYC states
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  // Bank states
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const handleBack = () => {
    setError(null);
    switch (mode) {
      case 'signup':
        navigate('landing');
        break;
      case 'email-verification':
      case 'login':
        setMode('signup');
        break;
      case 'forgot':
        setMode('login');
        break;
      case 'reset-sent':
        setMode('forgot');
        break;
      case 'reset-password':
        setMode('reset-sent');
        break;
      case 'enter-phone':
        setMode('login');
        break;
      case 'phone-verification':
        setMode('enter-phone');
        break;
      case 'basic-details':
        setMode('phone-verification');
        break;
      case 'verify-identity':
        setMode('basic-details');
        break;
      case 'create-password':
        setMode('verify-identity');
        break;
      case 'cashdoor-created':
        setMode('create-password');
        break;
      case 'setup-wallet':
        setMode('cashdoor-created');
        break;
      case 'verify-mpesa':
      case 'link-bank':
        setMode('setup-wallet');
        break;
      case 'confirm-phone':
        setMode('verify-mpesa');
        break;
      case 'mpesa-success':
        setMode('confirm-phone');
        break;
      case 'verify-bank':
        setMode('link-bank');
        break;
      case 'bank-success':
        setMode('verify-bank');
        break;
      default:
        navigate('landing');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleComplete = () => {
    onComplete({ name, email, craft: craft || 'Creative' });
  };

  const handleSendEmailCode = async () => {
    if (!name || !email) {
      setError('Full Name and Email are required to proceed.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await authService.sendEmailOtp(email);
      setMode('email-verification');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    const code = otp.join('');
    if (code.length < 5) {
      setError('Please enter the full code');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      await authService.verifyEmailOtp(email, code);
      setMode('basic-details');
    } catch (err: any) {
      setError(err.message || 'Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      await authService.sendPasswordResetEmail(email);
      setMode('reset-sent');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      await authService.login(email, password);
      if (onLogin) onLogin();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setError(null);
      await authService.loginWithGoogle();
      if (onLogin) onLogin();
    } catch (err: any) {
      setError(err.message || 'Google login failed.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    try {
      setIsAppleLoading(true);
      setError(null);
      await authService.loginWithApple();
      if (onLogin) onLogin();
    } catch (err: any) {
      setError(err.message || 'Apple login failed.');
    } finally {
      setIsAppleLoading(false);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      await authService.register(email, password);
      setMode('cashdoor-created');
    } catch (err: any) {
      setError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPhoneOtp = async () => {
    if (!phone) {
      setError('Please enter your phone number');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const appVerifier = authService.setupRecaptcha('recaptcha-container');
      const result = await authService.sendOtp(phone, appVerifier);
      setConfirmationResult(result);
      setMode('phone-verification');
    } catch (err: any) {
      console.error('Phone OTP failed', err);
      setError(err.message || 'Failed to send verification code.');
      if (process.env.NODE_ENV === 'development') {
        setTimeout(() => setMode('phone-verification'), 1000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyPhoneOtp = async () => {
    const code = otp.join('');
    if (code.length < 5) {
      setError('Please enter the full code');
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      if (confirmationResult) {
        await confirmationResult.confirm(code);
        setMode('basic-details');
      } else {
        setMode('basic-details');
      }
    } catch (err: any) {
      setError(err.message || 'Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-transitions for redirecting and processing
  useEffect(() => {
    if (mode === 'reset-sent') {
      const timer = setTimeout(() => setMode('reset-password'), 4000);
      return () => clearTimeout(timer);
    }
    if (mode === 'redirecting') {
      const timer = setTimeout(() => setMode('login'), 2000);
      return () => clearTimeout(timer);
    }
    if (mode === 'processing') {
      const timer = setTimeout(() => setMode('open-cashdoor'), 2000);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-accent flex flex-col items-center justify-center p-4 font-montserrat">
      <div id="recaptcha-container"></div>
      <div className="absolute top-8 left-8">
        <button
          onClick={handleBack}
          disabled={isLoading}
          className="text-secondary p-2 rounded-full hover:bg-gray-200 transition disabled:opacity-50"
        >
          <RiArrowLeftLine className="text-2xl" />
        </button>
      </div>

      <div className="w-full max-w-[380px] sm:max-w-lg">
        <AnimatePresence mode="wait">
          {mode === 'signup' && (
            <SignupStep
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              error={error}
              isLoading={isLoading}
              isGoogleLoading={isGoogleLoading}
              isAppleLoading={isAppleLoading}
              onSendEmailCode={handleSendEmailCode}
              onGoogleLogin={handleGoogleLogin}
              onAppleLogin={handleAppleLogin}
              onGoToLogin={() => setMode('login')}
            />
          )}

          {mode === 'email-verification' && (
            <EmailVerificationStep
              otp={otp}
              onOtpChange={handleOtpChange}
              isLoading={isLoading}
              onVerify={handleVerifyEmailOtp}
              onChangeEmail={() => setMode('signup')}
            />
          )}

          {mode === 'login' && (
            <LoginStep
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={error}
              isLoading={isLoading}
              onLogin={handleLoginSubmit}
              onForgotPassword={() => setMode('forgot')}
              onCreateCashdoor={() => setMode('enter-phone')}
            />
          )}

          {mode === 'forgot' && (
            <ForgotPasswordStep
              email={email}
              setEmail={setEmail}
              error={error}
              isLoading={isLoading}
              onSendResetLink={handleForgotPassword}
              onGoToLogin={() => setMode('login')}
            />
          )}

          {mode === 'reset-sent' && <ResetLinkSentStep />}

          {mode === 'reset-password' && (
            <ResetPasswordStep onResetPassword={() => setMode('redirecting')} />
          )}

          {mode === 'redirecting' && (
            <RedirectingStep onManualRedirect={() => setMode('login')} />
          )}

          {mode === 'enter-phone' && (
            <EnterPhoneStep
              phone={phone}
              setPhone={setPhone}
              error={error}
              isLoading={isLoading}
              onSendPhoneOtp={handleSendPhoneOtp}
              onGoToLogin={() => setMode('login')}
              onNavigateTerms={() => navigate('terms-of-service')}
              onNavigatePrivacy={() => navigate('privacy-policy')}
            />
          )}

          {mode === 'phone-verification' && (
            <PhoneVerificationStep
              otp={otp}
              onOtpChange={handleOtpChange}
              error={error}
              isLoading={isLoading}
              onVerify={handleVerifyPhoneOtp}
              onSwitchPhone={() => setMode('enter-phone')}
              onResend={handleSendPhoneOtp}
            />
          )}

          {mode === 'basic-details' && (
            <BasicDetailsStep
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              craft={craft}
              setCraft={setCraft}
              onContinue={() => setMode('verify-identity')}
            />
          )}

          {mode === 'verify-identity' && (
            <KycIdentityStep
              idFront={idFront}
              setIdFront={setIdFront}
              idBack={idBack}
              setIdBack={setIdBack}
              selfie={selfie}
              setSelfie={setSelfie}
              onSubmit={() => setMode('create-password')}
              onProceedDemo={() => setMode('create-password')}
            />
          )}

          {mode === 'create-password' && (
            <CreatePasswordStep
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              error={error}
              isLoading={isLoading}
              onRegister={handleRegister}
            />
          )}

          {mode === 'cashdoor-created' && (
            <CashdoorCreatedStep
              onSetupWallet={() => setMode('setup-wallet')}
              onSkip={handleComplete}
            />
          )}

          {mode === 'setup-wallet' && (
            <SetupWalletStep
              onSelectMpesa={() => setMode('verify-mpesa')}
              onSelectBank={() => setMode('link-bank')}
              onSkip={handleComplete}
            />
          )}

          {mode === 'verify-mpesa' && (
            <VerifyMpesaStep
              phone={phone}
              setPhone={setPhone}
              onVerify={() => setMode('confirm-phone')}
              onNavigateTerms={() => navigate('terms-of-service')}
              onNavigatePrivacy={() => navigate('privacy-policy')}
            />
          )}

          {mode === 'confirm-phone' && (
            <ConfirmPhonePinStep onConfirm={() => setMode('mpesa-success')} />
          )}

          {mode === 'mpesa-success' && (
            <LinkedSuccessStep
              title="M-pesa account linked successfully!"
              onContinue={() => setMode('processing')}
            />
          )}

          {mode === 'link-bank' && (
            <LinkBankStep
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
              accountNumber={accountNumber}
              setAccountNumber={setAccountNumber}
              accountName={accountName}
              setAccountName={setAccountName}
              onContinue={() => setMode('verify-bank')}
              onNavigateTerms={() => navigate('terms-of-service')}
              onNavigatePrivacy={() => navigate('privacy-policy')}
            />
          )}

          {mode === 'verify-bank' && (
            <VerifyBankStep
              otp={otp}
              onOtpChange={handleOtpChange}
              onVerify={() => setMode('bank-success')}
            />
          )}

          {mode === 'bank-success' && (
            <LinkedSuccessStep
              title="Bank account linked successfully!"
              onContinue={() => setMode('processing')}
            />
          )}

          {mode === 'processing' && (
            <ProcessingStep onProceedDemo={() => setMode('open-cashdoor')} />
          )}

          {mode === 'open-cashdoor' && (
            <OpenCashdoorStep onComplete={handleComplete} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingView;