import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { cardVariants } from './types';

interface CreatePasswordStepProps {
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  error: string | null;
  isLoading: boolean;
  onRegister: () => void;
}

export const CreatePasswordStep: React.FC<CreatePasswordStepProps> = ({
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  error,
  isLoading,
  onRegister,
}) => {
  const passwordRequirements = [
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
    { label: '8+ characters', met: password.length >= 8 },
  ];

  return (
    <motion.div
      key="create-password"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Setup your log in details</h2>
      <p className="text-sm sm:text-base text-black mb-3 text-center font-normal">Create Password</p>

      {error && <p className="text-xs text-red-500 mb-2">{error}</p>}

      <div className="w-full space-y-2 mb-4">
        <div className="space-y-0.5 relative">
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none font-normal placeholder-secondary/50"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-secondary/50"
          >
            {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
          </button>
        </div>
        <div className="space-y-0.5 relative">
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none font-normal placeholder-secondary/50"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2 text-secondary/50"
          >
            {showConfirmPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
          </button>
        </div>
      </div>

      <div className="w-full bg-secondary/5 p-3 rounded-2xl space-y-1.5 mb-5 border border-secondary/10">
        <p className="text-black font-semibold text-[10px] sm:text-xs mb-0.5">
          For a strong password include:
        </p>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1">
          {passwordRequirements.map((req, i) => (
            <div
              key={i}
              className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-normal ${
                req.met ? 'text-green-600' : 'text-secondary/60'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full flex items-center justify-center border-2 ${
                  req.met ? 'bg-green-600 border-green-600' : 'border-gray-300'
                }`}
              >
                {req.met && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
              </div>
              <span>{req.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onRegister}
        disabled={isLoading}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95 disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Continue'}
      </button>
    </motion.div>
  );
};

export default CreatePasswordStep;
