import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    const dismissed = sessionStorage.getItem('cookieDismissed');
    
    // Don't show if already accepted, dismissed in this session, or on specific pages
    const isExcludedPage = ['/privacy-policy', '/cookie-settings', '/terms-of-service'].includes(location.pathname);
    
    if (!consent && !dismissed && !isExcludedPage) {
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    } else if (isExcludedPage) {
      setIsVisible(false);
    }
  }, [location.pathname]);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('cookieDismissed', 'true');
    setIsVisible(false);
  };

  const handleNavigate = (path: string) => {
    sessionStorage.setItem('cookieDismissed', 'true');
    setIsVisible(false);
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: 50, x: '-50%', scale: 0.95 }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 200,
            mass: 0.8
          }}
          className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-32px)] sm:w-[380px] font-montserrat"
        >
          <div className="bg-white rounded-[28px] shadow-[0_20px_70px_rgba(0,0,0,0.25)] border border-secondary/10 overflow-hidden relative">
            {/* Close Button */}
            <button 
              onClick={handleDismiss}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-accent/50 text-secondary/40 hover:text-secondary hover:bg-accent transition-all z-10"
              aria-label="Dismiss"
            >
              <FiX size={18} />
            </button>

            <div className="flex flex-col items-center pt-10 px-6 pb-7 relative">
              {/* SVG Cookie Icon */}
              <div className="mb-5 bg-accent/50 rounded-full p-4 ring-1 ring-secondary/5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" height={36} width={50} viewBox="0 0 65 46">
                  <path stroke="#AB3625" strokeWidth="1.2" fill="#E9E0D8" d="M49.157 15.69L44.58.655l-12.422 1.96L21.044.654l-8.499 2.615-6.538 5.23-4.576 9.153v11.114l4.576 8.5 7.846 5.23 10.46 1.96 7.845-2.614 9.153 2.615 11.768-2.615 7.846-7.846 1.96-5.884.655-7.191-7.846-1.308-6.537-3.922z" />
                  <path fill="#AB3625" opacity="0.15" d="M32.286 3.749c-6.94 3.65-11.69 11.053-11.69 19.591 0 8.137 4.313 15.242 10.724 19.052a20.513 20.513 0 01-8.723 1.937c-11.598 0-21-9.626-21-21.5 0-11.875 9.402-21.5 21-21.5 3.495 0 6.79.874 9.689 2.42z" clipRule="evenodd" fillRule="evenodd" />
                  <path fill="#AB3625" d="M64.472 20.305a.954.954 0 00-1.172-.824 4.508 4.508 0 01-3.958-.934.953.953 0 00-1.076-.11c-.46.252-.977.383-1.502.382a3.154 3.154 0 01-2.97-2.11.954.954 0 00-.833-.634 4.54 4.54 0 01-4.205-4.507c.002-.23.022-.46.06-.687a.952.952 0 00-.213-.767 3.497 3.497 0 01-.614-3.5.953.953 0 00-.382-1.138 3.522 3.522 0 01-1.5-3.992.951.951 0 00-.762-1.227A22.611 22.611 0 0032.3 2.16 22.41 22.41 0 0022.657.001a22.654 22.654 0 109.648 43.15 22.644 22.644 0 0032.167-22.847zM22.657 43.4a20.746 20.746 0 110-41.493c2.566-.004 5.11.473 7.501 1.407a22.64 22.64 0 00.003 38.682 20.6 20.6 0 01-7.504 1.404zm19.286 0a20.746 20.746 0 112.131-41.384 5.417 5.417 0 001.918 4.635 5.346 5.346 0 00-.133 1.182A5.441 5.441 0 0046.879 11a5.804 5.804 0 00-.028.568 6.456 6.456 0 005.38 6.345 5.053 5.053 0 006.378 2.472 6.412 6.412 0 004.05 1.12 20.768 20.768 0 01-20.716 21.897z" />
                  <circle cx="20" cy="20" r="2.5" fill="#F69C31" />
                  <circle cx="42" cy="32" r="2.2" fill="#F69C31" />
                  <circle cx="32" cy="14" r="2" fill="#F69C31" />
                </svg>
              </div>

              <h3 className="text-lg font-rubik font-normal text-secondary mb-2 text-center tracking-tight">
                Your privacy matters
              </h3>
              
              <p className="text-[13px] text-black/60 text-center leading-relaxed mb-7 font-normal px-4">
                We use cookies to improve your experience and measure site usage. Read our 
                <button 
                  onClick={() => handleNavigate('/privacy-policy')}
                  className="mx-1 text-secondary font-medium hover:underline underline-offset-4"
                >
                  Privacy Policy
                </button>
                for details.
              </p>

              <div className="flex flex-col w-full gap-2.5">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAccept}
                  className="w-full h-11 bg-secondary text-white rounded-full text-[13px] font-normal transition-all hover:bg-secondary/90 shadow-lg shadow-secondary/15"
                >
                  Accept all cookies
                </motion.button>
                <button
                  onClick={() => handleNavigate('/cookie-settings')}
                  className="w-full py-2 text-secondary/50 hover:text-secondary text-[11px] font-normal transition-colors"
                >
                  Customize preferences
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
