import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const consent = localStorage.getItem('crezine_cookie_consent');
    
    // Don't show if already accepted or on specific pages
    const isExcludedPage = ['/privacy-policy', '/cookie-settings', '/terms-of-service'].includes(location.pathname);
    
    if (!consent && !isExcludedPage) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [location.pathname]);

  const handleAccept = () => {
    localStorage.setItem('crezine_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  const handleNavigate = (path: string) => {
    setIsVisible(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 200,
            mass: 0.8
          }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[100] w-[calc(100%-32px)] sm:w-[320px] max-w-[320px] font-montserrat"
        >
          <div className="bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-secondary/15 p-4 relative overflow-hidden">
            {/* Close Button */}
            <button 
              onClick={handleDismiss}
              className="absolute top-3 right-3 text-secondary/40 hover:text-secondary p-1 rounded-md transition-colors"
              aria-label="Dismiss"
            >
              <FiX size={14} />
            </button>

            {/* Title */}
            <span className="font-rubik font-semibold text-sm sm:text-base text-secondary block pr-5">
              Crezine uses cookies
            </span>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-black/75 font-normal">
              We use cookies to ensure that we give you the best experience on our website.{' '}
              <button
                type="button"
                onClick={() => handleNavigate('/privacy-policy')}
                className="text-secondary font-medium hover:underline inline underline-offset-2 transition-colors cursor-pointer"
              >
                Read cookies policies
              </button>
              .
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 mt-4 pt-1">
              <button
                type="button"
                onClick={() => handleNavigate('/cookie-settings')}
                className="text-[11px] sm:text-xs text-secondary/80 hover:text-secondary underline underline-offset-2 transition-colors text-left font-normal cursor-pointer"
              >
                Manage your preferences
              </button>
              <button
                type="button"
                onClick={handleAccept}
                className="bg-secondary text-white text-xs font-normal px-4 py-2 rounded-lg hover:bg-secondary/90 active:scale-95 transition-all shadow-sm whitespace-nowrap cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
