import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { cardVariants } from './types';

interface EnterPhoneStepProps {
  phone: string;
  setPhone: (phone: string) => void;
  error: string | null;
  isLoading: boolean;
  onSendPhoneOtp: () => void;
  onGoToLogin: () => void;
  onNavigateTerms: () => void;
  onNavigatePrivacy: () => void;
}

export const EnterPhoneStep: React.FC<EnterPhoneStepProps> = ({
  phone,
  setPhone,
  error,
  isLoading,
  onSendPhoneOtp,
  onGoToLogin,
  onNavigateTerms,
  onNavigatePrivacy,
}) => {
  return (
    <motion.div
      key="enter-phone"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Welcome Back!</h2>
      <p className="text-sm sm:text-base text-black mb-3 sm:mb-4 text-center font-normal">
        Enter your phone number to get started
      </p>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="w-full space-y-3 mb-4">
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Phone Number</label>
          <div className="flex gap-2">
            <div className="relative">
              <select className="appearance-none px-3 py-2 pr-8 rounded-full bg-gray-100 border border-black text-sm text-secondary font-normal focus:outline-none">
                <option>🇰🇪 +254</option>
                <option>🇳🇬 +234</option>
                <option>🇺🇬 +256</option>
                <option>🇹🇿 +255</option>
                <option>🇷🇼 +250</option>
                <option>🇿🇦 +27</option>
                <option>🇬🇭 +233</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-secondary/50">
                ▼
              </div>
            </div>
            <input
              className="flex-grow px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
              type="tel"
              placeholder="712 345 678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-start gap-2 px-1">
          <input
            type="checkbox"
            className="mt-1 rounded-full border-black appearance-none w-4 h-4 checked:bg-secondary checked:border-secondary border transition-all"
            id="terms"
          />
          <label htmlFor="terms" className="text-[10px] sm:text-xs text-black leading-tight">
            I agree to the{' '}
            <button type="button" onClick={onNavigateTerms} className="text-secondary hover:underline">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" onClick={onNavigatePrivacy} className="text-secondary hover:underline">
              Privacy policy
            </button>
          </label>
        </div>
      </div>

      <button
        onClick={onSendPhoneOtp}
        disabled={isLoading}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-3 sm:mb-4 transition-all active:scale-95 disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Continue'}
      </button>
      <p className="text-xs sm:text-sm text-secondary font-normal text-center">
        Already have an account?{' '}
        <button onClick={onGoToLogin} className="font-normal text-secondary hover:underline">
          Sign In
        </button>
      </p>
    </motion.div>
  );
};

interface PhoneVerificationStepProps {
  otp: string[];
  onOtpChange: (index: number, value: string) => void;
  error: string | null;
  isLoading: boolean;
  onVerify: () => void;
  onSwitchPhone: () => void;
  onResend: () => void;
}

export const PhoneVerificationStep: React.FC<PhoneVerificationStepProps> = ({
  otp,
  onOtpChange,
  error,
  isLoading,
  onVerify,
  onSwitchPhone,
  onResend,
}) => {
  return (
    <motion.div
      key="phone-verification"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Phone Verification</h2>
      <p className="text-sm sm:text-base text-black mb-4 font-normal leading-snug px-4">
        A 5 digit verification code has been sent to this number.
      </p>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="flex gap-2.5 sm:gap-3 mb-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <input
            key={i}
            id={`otp-${i}`}
            className="w-10 h-10 sm:w-12 sm:h-12 text-center bg-gray-100 border border-black rounded-2xl text-lg font-bold text-secondary focus:outline-none font-normal placeholder-secondary/50"
            maxLength={1}
            value={otp[i]}
            onChange={(e) => onOtpChange(i, e.target.value)}
          />
        ))}
      </div>

      <button
        onClick={onVerify}
        disabled={isLoading}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 transition-all active:scale-95 disabled:opacity-50"
      >
        {isLoading ? 'Verifying...' : 'Verify'}
      </button>

      <div className="space-y-1">
        <button onClick={onSwitchPhone} className="text-xs text-secondary font-normal hover:underline block w-full">
          Switch Phone Number
        </button>
        <p className="text-xs text-secondary font-normal">
          Didn’t receive the code?{' '}
          <button onClick={onResend} className="font-normal text-secondary hover:underline">
            Request a resend
          </button>
        </p>
      </div>
    </motion.div>
  );
};
