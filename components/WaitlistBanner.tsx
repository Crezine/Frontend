import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { useWaitlist } from '../src/context/WaitlistContext';

interface WaitlistBannerProps {
  onOpenModal?: () => void;
}

const WaitlistBanner: React.FC<WaitlistBannerProps> = ({ onOpenModal }) => {
  const { isBannerVisible, dismissBanner, openWaitlistModal, hasJoined } = useWaitlist();

  const handleOpen = () => {
    if (onOpenModal) {
      onOpenModal();
    } else {
      openWaitlistModal();
    }
  };

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.22 }}
          className="pointer-events-auto bg-white/95 backdrop-blur-md border border-black/10 rounded-full px-3 sm:px-5 md:px-6 py-1 sm:py-1.5 shadow-xs flex items-center justify-center gap-2 sm:gap-3.5 max-w-4xl w-auto mx-auto font-montserrat min-h-[34px] sm:min-h-[38px]"
        >
          {/* Responsive Center Text */}
          <p className="text-[11px] sm:text-xs md:text-sm font-medium text-black/85 text-center truncate max-w-[170px] xs:max-w-[220px] sm:max-w-none">
            {hasJoined ? (
              <>
                <span className="font-semibold text-secondary">You're on the waitlist</span>
                <span className="hidden sm:inline"> — Check priority perks or invite creators.</span>
              </>
            ) : (
              <>
                <span className="hidden sm:inline">Join the waitlist for zero platform fees on your first $1,000 + VIP perks.</span>
                <span className="sm:hidden">Zero fees on first $1k + VIP perks</span>
              </>
            )}
          </p>

          {/* Centered Actions: CTA Button + X icon */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={handleOpen}
              className="inline-flex items-center gap-1 bg-secondary text-white hover:bg-secondary/90 active:scale-95 text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full shadow-xs hover:shadow transition-all font-montserrat whitespace-nowrap cursor-pointer"
            >
              <span className="hidden xs:inline">{hasJoined ? 'View Status' : 'Join Waitlist'}</span>
              <span className="xs:hidden">{hasJoined ? 'Status' : 'Join'}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            {/* Cancel 'X' Button */}
            <button
              type="button"
              onClick={dismissBanner}
              className="text-black/40 hover:text-black transition-colors cursor-pointer w-6 h-6 sm:w-6 sm:h-6 flex items-center justify-center rounded-full hover:bg-black/5"
              aria-label="Dismiss waitlist banner"
              title="Dismiss"
            >
              <FiX className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistBanner;
