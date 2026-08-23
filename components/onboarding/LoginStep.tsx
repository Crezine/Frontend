import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { cardVariants } from './types';

interface LoginStepProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  error: string | null;
  isLoading: boolean;
  onLogin: () => void;
  onForgotPassword: () => void;
  onCreateCashdoor: () => void;
}

export const LoginStep: React.FC<LoginStepProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  isLoading,
  onLogin,
  onForgotPassword,
  onCreateCashdoor,
}) => {
  return (
    <motion.div
      key="login"
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
      <p className="text-sm sm:text-base text-black/70 mb-2 sm:mb-3 text-center font-normal">
        Enter your details to access your Cashdoor
      </p>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="w-full space-y-2 mb-1">
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
        <div className="space-y-0.5 relative">
          <label className="text-xs font-normal text-black ml-1">Password</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 bottom-2 text-secondary/50"
          >
            {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
          </button>
        </div>
      </div>

      <div className="w-full text-center mb-3 sm:mb-4 mt-1">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-[10px] sm:text-xs font-normal text-secondary hover:underline"
        >
          Forgot password ?
        </button>
      </div>

      <button
        onClick={onLogin}
        disabled={isLoading}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-3 sm:mb-4 transition-all active:scale-95 disabled:opacity-50"
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

      <div className="w-full flex items-center gap-3 mb-3 sm:mb-4">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="text-[10px] text-gray-400 font-normal">OR</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <p className="text-xs sm:text-sm text-secondary font-normal text-center">
        Dont have a Cashdoor ?{' '}
        <button onClick={onCreateCashdoor} className="font-normal text-secondary hover:underline">
          Create My Cashdoor
        </button>
      </p>
    </motion.div>
  );
};

export default LoginStep;
