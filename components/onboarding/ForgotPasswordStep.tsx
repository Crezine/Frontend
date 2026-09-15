import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { cardVariants } from './types';

interface ForgotPasswordStepProps {
  email: string;
  setEmail: (email: string) => void;
  error: string | null;
  isLoading: boolean;
  onSendResetLink: () => void;
  onGoToLogin: () => void;
}

export const ForgotPasswordStep: React.FC<ForgotPasswordStepProps> = ({
  email,
  setEmail,
  error,
  isLoading,
  onSendResetLink,
  onGoToLogin,
}) => {
  return (
    <motion.div
      key="forgot"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Forgot Password?</h2>
      <p className="text-sm sm:text-base text-black/70 mb-2 sm:mb-3 text-center font-normal">
        Enter your email to reset your password
      </p>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="w-full space-y-3 mb-4 sm:mb-6">
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Email</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <button
        onClick={onSendResetLink}
        disabled={isLoading}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 sm:mb-6 transition-all active:scale-95 disabled:opacity-50"
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>
      <p className="text-xs sm:text-sm text-secondary font-normal">
        Remember your password?{' '}
        <button onClick={onGoToLogin} className="font-normal text-secondary hover:underline">
          Sign In
        </button>
      </p>
    </motion.div>
  );
};

export default ForgotPasswordStep;
