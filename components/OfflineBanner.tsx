import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../src/hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.aside
          role="status"
          aria-live="polite"
          aria-label="Offline status banner"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-[9999] bg-red-600 text-white text-xs py-2 px-4 shadow-md flex items-center justify-center gap-2 font-montserrat"
        >
          <WifiOff size={16} className="animate-pulse" />
          <span className="font-medium">
            You're currently offline. Low-stakes actions may be queued, but payments require an active connection.
          </span>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;
