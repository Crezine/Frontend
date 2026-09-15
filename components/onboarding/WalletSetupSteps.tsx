import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { RiArrowLeftLine } from 'react-icons/ri';
import { cardVariants } from './types';

interface SetupWalletStepProps {
  onSelectMpesa: () => void;
  onSelectBank: () => void;
  onSkip: () => void;
}

export const SetupWalletStep: React.FC<SetupWalletStepProps> = ({
  onSelectMpesa,
  onSelectBank,
  onSkip,
}) => {
  return (
    <motion.div
      key="setup-wallet"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-3 sm:px-8 sm:py-4 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Setup your Wallet</h2>
      <p className="text-sm sm:text-base text-black mb-6 text-center font-normal">Connect payment method</p>

      <div className="w-full grid grid-cols-1 gap-3.5 mb-6">
        <button
          onClick={onSelectMpesa}
          className="flex items-center justify-between p-3.5 bg-gray-50 rounded-full border border-black hover:border-secondary/30 transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600 text-base">
              M
            </div>
            <span className="font-normal text-black text-base">M-pesa</span>
          </div>
          <RiArrowLeftLine className="rotate-180 text-secondary/30 group-hover:text-secondary" />
        </button>
        <button
          onClick={onSelectBank}
          className="flex items-center justify-between p-3.5 bg-gray-50 rounded-full border border-black hover:border-secondary/30 transition group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-base">
              B
            </div>
            <span className="font-normal text-black text-base">Bank</span>
          </div>
          <RiArrowLeftLine className="rotate-180 text-secondary/30 group-hover:text-secondary" />
        </button>
      </div>

      <button onClick={onSkip} className="w-full text-secondary font-normal py-1.5 text-sm hover:underline">
        Skip for now
      </button>
    </motion.div>
  );
};

interface VerifyMpesaStepProps {
  phone: string;
  setPhone: (phone: string) => void;
  onVerify: () => void;
  onNavigateTerms: () => void;
  onNavigatePrivacy: () => void;
}

export const VerifyMpesaStep: React.FC<VerifyMpesaStepProps> = ({
  phone,
  setPhone,
  onVerify,
  onNavigateTerms,
  onNavigatePrivacy,
}) => {
  return (
    <motion.div
      key="verify-mpesa"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Verify Account</h2>
      <p className="text-sm sm:text-base text-black mb-3 text-center font-normal">M-pesa</p>

      <p className="text-xs text-black mb-4 text-center">We will prompt your phone for verification</p>

      <div className="w-full space-y-3 mb-6">
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Enter Phone</label>
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
            id="mpesa-terms"
          />
          <label htmlFor="mpesa-terms" className="text-[10px] sm:text-xs text-black leading-tight">
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
        onClick={onVerify}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95"
      >
        Verify
      </button>
    </motion.div>
  );
};

interface ConfirmPhonePinStepProps {
  onConfirm: () => void;
}

export const ConfirmPhonePinStep: React.FC<ConfirmPhonePinStepProps> = ({ onConfirm }) => {
  return (
    <motion.div
      key="confirm-phone"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-1.5">Confirm your phone</h2>
      <p className="text-sm sm:text-base text-black mb-6 font-normal leading-snug">
        An M-pesa prompt has been sent to your phone
      </p>

      <div className="w-full mb-6">
        <p className="text-xs font-normal text-black mb-2">Enter Pin</p>
        <div className="flex justify-center gap-2.5 sm:gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border border-black bg-gray-100"></div>
          ))}
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md mb-4 transition-all active:scale-95"
      >
        Confirm
      </button>

      <p className="text-xs text-secondary font-normal">
        Didn’t receive the code?{' '}
        <button className="font-normal text-secondary hover:underline">Request a resend</button>
      </p>
    </motion.div>
  );
};

interface LinkBankStepProps {
  selectedBank: string;
  setSelectedBank: (bank: string) => void;
  accountNumber: string;
  setAccountNumber: (acc: string) => void;
  accountName: string;
  setAccountName: (name: string) => void;
  onContinue: () => void;
  onNavigateTerms: () => void;
  onNavigatePrivacy: () => void;
}

export const LinkBankStep: React.FC<LinkBankStepProps> = ({
  selectedBank,
  setSelectedBank,
  accountNumber,
  setAccountNumber,
  accountName,
  setAccountName,
  onContinue,
  onNavigateTerms,
  onNavigatePrivacy,
}) => {
  return (
    <motion.div
      key="link-bank"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Link Bank Account</h2>
      <p className="text-sm sm:text-base text-black mb-4 text-center font-normal">Enter your bank details</p>

      <div className="w-full space-y-2.5 mb-5">
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Select Bank (e.g., KCB)</label>
          <select
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">Choose a bank</option>
            <option value="kcb">KCB</option>
            <option value="equity">Equity Bank</option>
            <option value="absal">Absa Bank</option>
          </select>
        </div>
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Enter Account Number</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <div className="space-y-0.5">
          <label className="text-xs font-normal text-black ml-1">Enter Account Name</label>
          <input
            className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50"
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </div>
        <div className="flex items-start gap-2 px-1 pt-0.5">
          <input
            type="checkbox"
            className="mt-1 rounded-full border-black appearance-none w-4 h-4 checked:bg-secondary checked:border-secondary border transition-all"
            id="bank-terms"
          />
          <label htmlFor="bank-terms" className="text-[10px] sm:text-xs text-black leading-tight">
            Agree to{' '}
            <button type="button" onClick={onNavigateTerms} className="text-secondary hover:underline">
              Terms
            </button>{' '}
            &{' '}
            <button type="button" onClick={onNavigatePrivacy} className="text-secondary hover:underline">
              Privacy
            </button>
          </label>
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

interface VerifyBankStepProps {
  otp: string[];
  onOtpChange: (index: number, val: string) => void;
  onVerify: () => void;
}

export const VerifyBankStep: React.FC<VerifyBankStepProps> = ({ otp, onOtpChange, onVerify }) => {
  return (
    <motion.div
      key="verify-bank"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Verify Bank Account</h2>
      <p className="text-sm sm:text-base text-black mb-4 font-normal leading-snug px-4">
        An OTP has been sent to your phone
      </p>

      <div className="flex gap-2.5 sm:gap-3 mb-6">
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
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 transition-all active:scale-95"
      >
        Verify
      </button>

      <p className="text-xs text-secondary font-normal">
        Didn’t receive the OTP?{' '}
        <button className="font-normal text-secondary hover:underline">Request a resend</button>
      </p>
    </motion.div>
  );
};
