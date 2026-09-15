import React from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../BrandLogo';
import { RiImageAddFill } from 'react-icons/ri';
import { cardVariants } from './types';

interface KycIdentityStepProps {
  idFront: File | null;
  setIdFront: (file: File | null) => void;
  idBack: File | null;
  setIdBack: (file: File | null) => void;
  selfie: File | null;
  setSelfie: (file: File | null) => void;
  onSubmit: () => void;
  onProceedDemo: () => void;
}

export const KycIdentityStep: React.FC<KycIdentityStepProps> = ({
  idFront,
  setIdFront,
  idBack,
  setIdBack,
  selfie,
  setSelfie,
  onSubmit,
  onProceedDemo,
}) => {
  return (
    <motion.div
      key="verify-identity"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center"
    >
      <div className="-mt-8 mb-1 scale-90 sm:scale-100">
        <BrandLogo />
      </div>
      <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Verify Your Identity</h2>
      <p className="text-sm sm:text-base text-black mb-4 text-center font-normal leading-tight px-2">
        Scan your ID and take a quick selfie to confirm it is really you
      </p>

      <div className="w-full space-y-3 mb-6">
        <div>
          <p className="text-xs font-normal text-black mb-1.5 ml-1">Scan your ID</p>
          <div className="grid grid-cols-2 gap-3">
            <label
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-3 cursor-pointer hover:bg-gray-50 transition ${
                idFront ? 'border-green-500 bg-green-50/50' : 'border-secondary/20'
              }`}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setIdFront(e.target.files?.[0] || null)}
              />
              <RiImageAddFill
                className={`${idFront ? 'text-green-500' : 'text-secondary'} text-xl mb-0.5`}
              />
              <span className="text-[10px] font-normal text-black/70">
                {idFront ? 'Front Uploaded' : 'Front'}
              </span>
            </label>
            <label
              className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-3 cursor-pointer hover:bg-gray-50 transition ${
                idBack ? 'border-green-500 bg-green-50/50' : 'border-secondary/20'
              }`}
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setIdBack(e.target.files?.[0] || null)}
              />
              <RiImageAddFill
                className={`${idBack ? 'text-green-500' : 'text-secondary'} text-xl mb-0.5`}
              />
              <span className="text-[10px] font-normal text-black/70">
                {idBack ? 'Back Uploaded' : 'Back'}
              </span>
            </label>
          </div>
        </div>

        <div>
          <p className="text-xs font-normal text-black mb-1.5 ml-1">Take a Selfie and upload</p>
          <label
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-4 cursor-pointer hover:bg-gray-50 transition w-full ${
              selfie ? 'border-green-500 bg-green-50/50' : 'border-secondary/20'
            }`}
          >
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => setSelfie(e.target.files?.[0] || null)}
            />
            <RiImageAddFill
              className={`${selfie ? 'text-green-500' : 'text-secondary'} text-2xl mb-0.5`}
            />
            <span className="text-[10px] font-normal text-black/70">
              {selfie ? 'Selfie Uploaded' : 'Selfie'}
            </span>
          </label>
        </div>
      </div>

      <button
        onClick={onSubmit}
        className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={onProceedDemo}
        className="mt-3 text-[10px] text-secondary hover:underline"
      >
        Proceed without uploading (Demo)
      </button>
    </motion.div>
  );
};

export default KycIdentityStep;
