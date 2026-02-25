import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView } from '../types';
import BrandLogo from './BrandLogo';
import { PiHamburgerLight } from "react-icons/pi";
import { FiX } from 'react-icons/fi';

interface PublicHeaderProps {
  navigate: (view: AppView) => void;
}

const PublicHeader: React.FC<PublicHeaderProps> = ({ navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const links = [
    { label: 'Home', view: 'landing' as AppView },
    { label: 'Product', view: 'product' as AppView },
    { label: 'Features', view: 'features' as AppView },
    { label: 'Pricing', view: 'pricing' as AppView },
    { label: 'Support', view: 'support' as AppView },
  ];

  const handleLinkClick = (view: AppView) => {
    navigate(view);
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="bg-accent/80 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex-shrink-0">
              <BrandLogo onClick={() => handleLinkClick('landing' as AppView)} />
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.view)}
                  className="text-base font-bold text-secondary/70 hover:text-primary transition-colors duration-300 font-nunito"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center">
                <div className="hidden md:block">
                    <button 
                        onClick={() => handleLinkClick('onboarding' as AppView)}
                        className="bg-primary text-white text-xs font-bold py-3 px-6 rounded-full transition-all hover:bg-primary/90 active:scale-95 font-nunito uppercase"
                    >
                        Create Your Cashdoor
                    </button>
                </div>
              <div className="md:hidden ml-4">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md text-secondary/70"
                  aria-label="Open main menu"
                >
                  <PiHamburgerLight className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 bg-accent z-50 flex flex-col items-center justify-center space-y-8"
          >
            <div className="absolute top-0 right-0 p-4">
              <button 
                onClick={() => setIsMenuOpen(false)} 
                className="p-2 rounded-md text-secondary/70"
                aria-label="Close main menu"
              >
                <FiX className="h-8 w-8" />
              </button>
            </div>

            <nav className="flex flex-col items-center space-y-8">
              {links.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleLinkClick(link.view)}
                  className="text-3xl font-bold text-secondary hover:text-primary transition-colors duration-300 font-nunito"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PublicHeader;
