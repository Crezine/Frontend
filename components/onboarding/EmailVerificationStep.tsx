import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { cardVariants } from './types';

interface EmailVerificationStepProps {
  otp: string[];
  onOtpChange: (index: number, value: string) => void;
  isLoading: boolean;
  onVerify: () => void;
  onChangeEmail: () => void;
}

export const EmailVerificationStep: React.FC<EmailVerificationStepProps> = ({
  otp,
  onOtpChange,
  isLoading,
  onVerify,
  onChangeEmail,
}) => {
  return (
    <motion.div
      key="email-verification"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Email Verification</h2>
      <p className="text-sm sm:text-base text-black mb-4 font-normal leading-snug px-4">
        A 5-digit verification code has been sent to your email.
      </p>

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
        {isLoading ? 'Verifying...' : 'Verify & Continue'}
      </button>

      <div className="space-y-1">
        <button onClick={onChangeEmail} className="text-xs text-secondary font-normal hover:underline block w-full">
          Change Email
        </button>
        <p className="text-xs text-secondary/70 font-normal">
          Didn’t receive the code?{' '}
          <button className="font-normal text-secondary hover:underline">Request a resend</button>
        </p>
      </div>
    </motion.div>
  );
};

export default EmailVerificationStep;
