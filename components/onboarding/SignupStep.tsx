import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { FcGoogle } from 'react-icons/fc';
import { RiAppleLine } from 'react-icons/ri';
import { cardVariants } from './types';

interface SignupStepProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  error: string | null;
  isLoading: boolean;
  isGoogleLoading: boolean;
  isAppleLoading: boolean;
  onSendEmailCode: () => void;
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  onGoToLogin: () => void;
}

export const SignupStep: React.FC<SignupStepProps> = ({
  name,
  setName,
  email,
  setEmail,
  error,
  isLoading,
  isGoogleLoading,
  isAppleLoading,
  onSendEmailCode,
  onGoogleLogin,
  onAppleLogin,
  onGoToLogin,
}) => {
  return (
    <motion.div
      key="signup"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-1 sm:px-8 sm:py-2 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-6 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Welcome Creative!</h2>
      <p className="text-sm sm:text-base text-black mb-1 sm:mb-2 text-center font-normal">
        Setup your Creative Cashdoor
      </p>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="w-full space-y-2 mb-3 sm:mb-4">
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Full Name</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type="text"
            placeholder="Enter your full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Email</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={onSendEmailCode}
        disabled={isLoading}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-3 sm:mb-4 transition-all active:scale-95 disabled:opacity-50"
      >
        {isLoading ? 'Sending code...' : 'Send email code'}
      </button>

      <div className="w-full flex items-center gap-3 mb-3 sm:mb-4">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="text-[10px] text-black font-normal">OR</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <div className="w-full space-y-2 mb-3 sm:mb-4">
        <button
          onClick={onGoogleLogin}
          disabled={isGoogleLoading || isAppleLoading || isLoading}
          className="w-full border border-black py-2 sm:py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition text-xs sm:text-sm font-normal text-black disabled:opacity-50"
        >
          <FcGoogle className="text-lg" /> {isGoogleLoading ? 'Processing...' : 'Continue with Google'}
        </button>
        <button
          onClick={onAppleLogin}
          disabled={isGoogleLoading || isAppleLoading || isLoading}
          className="w-full border border-black py-2 sm:py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition text-xs sm:text-sm font-normal text-black disabled:opacity-50"
        >
          <RiAppleLine className="text-lg" /> {isAppleLoading ? 'Processing...' : 'Continue with Apple'}
        </button>
      </div>

      <p className="text-xs sm:text-sm text-black font-normal text-center">
        Already have an account?{' '}
        <button onClick={onGoToLogin} className="font-normal text-secondary hover:underline">
          Log in
        </button>
      </p>
    </motion.div>
  );
};

export default SignupStep;
