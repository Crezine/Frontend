import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { cardVariants } from './types';

interface BasicDetailsStepProps {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  craft: string;
  setCraft: (craft: string) => void;
  onContinue: () => void;
}

export const BasicDetailsStep: React.FC<BasicDetailsStepProps> = ({
  name,
  setName,
  email,
  setEmail,
  craft,
  setCraft,
  onContinue,
}) => {
  return (
    <motion.div
      key="basic-details"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Welcome Creative!</h2>
      <p className="text-sm sm:text-base text-black mb-3 sm:mb-4 text-center font-normal">
        Enter your basic details
      </p>

      <div className="w-full space-y-2.5 mb-5 sm:mb-6">
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Full Name</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Craft (e.g., Graphic Designer)</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type="text"
            placeholder="E.g, Graphic Designer"
            value={craft}
            onChange={(e) => setCraft(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95"
      >
        Continue
      </button>
    </motion.div>
  );
};

export default BasicDetailsStep;
