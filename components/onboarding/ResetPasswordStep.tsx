import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { cardVariants } from './types';

interface ResetPasswordStepProps {
  onResetPassword: () => void;
}

export const ResetPasswordStep: React.FC<ResetPasswordStepProps> = ({ onResetPassword }) => {
  return (
    <motion.div
      key="reset-password"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Reset Password</h2>
      <p className="text-sm sm:text-base text-black/70 mb-2 sm:mb-3 text-center font-normal">
        Enter your new password below
      </p>

      <div className="w-full space-y-2 mb-4">
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">New Password</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type="password"
            placeholder="New Password"
          />
        </div>
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Confirm Password</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      </div>

      <button
        onClick={onResetPassword}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95"
      >
        Reset Password
      </button>
    </motion.div>
  );
};

export default ResetPasswordStep;
