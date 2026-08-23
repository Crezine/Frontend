import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { PiKeyhole } from 'react-icons/pi';
import { LiaDoorOpenSolid } from 'react-icons/lia';
import { RiCheckLine } from 'react-icons/ri';
import { cardVariants } from './types';

interface ResetLinkSentStepProps {
  onManualRedirect?: () => void;
}

export const ResetLinkSentStep: React.FC<ResetLinkSentStepProps> = () => {
  return (
    <motion.div
      key="reset-sent"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-10 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center sm:min-w-[440px]"
    >
      <div className="-mt-8 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-1 sm:mb-2">
        <PiKeyhole className="text-secondary text-5xl sm:text-6xl" />
      </div>
      <div className="text-center space-y-0.5 mb-3 sm:mb-4">
        <p className="text-black font-normal text-base sm:text-lg leading-snug">
          A reset link has been sent to your email and phone
        </p>
        <p className="text-black font-normal text-sm sm:text-base">Kindly check your email.</p>
      </div>
      <div className="w-full bg-secondary border border-secondary p-4 sm:p-5 rounded-2xl text-white text-center mb-3 sm:mb-4">
        <h4 className="font-normal mb-1 underline underline-offset-4 text-xs sm:text-sm">Safety tip:</h4>
        <p className="text-[10px] sm:text-xs font-normal leading-normal">
          "Kindly make sure you reset your password on the same device and browser you made this request from."
        </p>
      </div>

      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        ></div>
        <span className="text-sm font-normal text-secondary">Redirecting......</span>
      </div>
    </motion.div>
  );
};

interface RedirectingStepProps {
  onManualRedirect: () => void;
}

export const RedirectingStep: React.FC<RedirectingStepProps> = ({ onManualRedirect }) => {
  return (
    <motion.div
      key="redirecting"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center justify-center text-center"
    >
      <div className="flex items-center gap-1.5 mb-3">
        <div
          className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"
          style={{ animationDelay: '0ms' }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"
          style={{ animationDelay: '150ms' }}
        ></div>
        <div
          className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"
          style={{ animationDelay: '300ms' }}
        ></div>
      </div>
      <h2 className="text-xl font-normal text-secondary">Redirecting......</h2>
      <button onClick={onManualRedirect} className="mt-6 text-xs text-secondary hover:underline">
        (Manual redirect for demo)
      </button>
    </motion.div>
  );
};

interface CashdoorCreatedStepProps {
  onSetupWallet: () => void;
  onSkip: () => void;
}

export const CashdoorCreatedStep: React.FC<CashdoorCreatedStepProps> = ({ onSetupWallet, onSkip }) => {
  return (
    <motion.div
      key="cashdoor-created"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <LiaDoorOpenSolid className="text-primary text-7xl" />
      </div>
      <h2 className="text-2xl font-normal text-secondary mb-0.5">Cashdoor Created!</h2>
      <p className="text-sm sm:text-base text-black mb-8 font-normal">Your cashdoor is ready for use</p>

      <div className="w-full space-y-3">
        <button
          onClick={onSetupWallet}
          className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md transition-all active:scale-95"
        >
          Link Bank/ M-pesa
        </button>
        <button onClick={onSkip} className="w-full text-secondary font-normal py-1.5 text-sm hover:underline">
          Skip for now
        </button>
      </div>
    </motion.div>
  );
};

interface LinkedSuccessStepProps {
  title: string;
  onContinue: () => void;
}

export const LinkedSuccessStep: React.FC<LinkedSuccessStepProps> = ({ title, onContinue }) => {
  return (
    <motion.div
      key="linked-success"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <div className="w-24 h-24 bg-white border-2 border-primary rounded-full flex items-center justify-center mb-4">
        <RiCheckLine className="text-primary text-6xl stroke-[3]" />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-6">{title}</h2>

      <button
        onClick={onContinue}
        className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md transition-all active:scale-95"
      >
        Continue
      </button>
    </motion.div>
  );
};

interface ProcessingStepProps {
  onProceedDemo: () => void;
}

export const ProcessingStep: React.FC<ProcessingStepProps> = ({ onProceedDemo }) => {
  return (
    <motion.div
      key="processing"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-6 sm:px-8 sm:py-8 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center justify-center text-center"
    >
      <div className="w-16 h-16 border-4 border-secondary/10 border-t-secondary rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-normal text-secondary mb-2">Verifying details with provider...</h2>
      <button onClick={onProceedDemo} className="mt-6 text-xs text-secondary hover:underline">
        (Demo: Click to proceed)
      </button>
    </motion.div>
  );
};

interface OpenCashdoorStepProps {
  onComplete: () => void;
}

export const OpenCashdoorStep: React.FC<OpenCashdoorStepProps> = ({ onComplete }) => {
  return (
    <motion.div
      key="open-cashdoor"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <LiaDoorOpenSolid className="text-primary text-5xl" />
      </div>
      <h2 className="text-2xl font-normal text-secondary mb-8">Cashdoor Created!</h2>

      <button
        onClick={onComplete}
        className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md transition-all active:scale-95"
      >
        Open Cashdoor
      </button>
    </motion.div>
  );
};
