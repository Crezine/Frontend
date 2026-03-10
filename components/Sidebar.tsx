import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView } from '../types';
import BrandLogo from './BrandLogo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (view: AppView) => void;
  activeView: AppView;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, navigate, activeView }) => {
  const navLinks: { view: AppView; label: string }[] = [
    { view: 'home', label: 'My Cashdoor' },
    { view: 'pay', label: 'Payment Link' },
    { view: 'payments', label: 'Invoice Link' },
    { view: 'funding', label: 'Residencies' },
    { view: 'fund', label: 'Creative Grants' },
    { view: 'wallet', label: 'Transaction History' },
  ];

  const handleNavClick = (view: AppView) => {
    navigate(view);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 z-[70] shadow-2xl flex flex-col transition-colors"
          >
            {/* Logo Header - Background matches site accent, aligned left, tightly cropped */}
            <div className="p-4 flex items-center justify-start bg-accent dark:bg-gray-900 overflow-hidden h-16">
              <div className="scale-75 transform origin-left">
                <BrandLogo onClick={() => handleNavClick('home')} />
              </div>
            </div>

            <nav className="flex-grow pt-6 px-4 overflow-y-auto scrollbar-hide" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}} />
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-base font-rubik font-normal transition-all mb-1 ${
                    activeView === link.view 
                      ? 'bg-secondary/10 dark:bg-primary/10 text-secondary dark:text-primary' 
                      : 'text-secondary/60 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-secondary dark:hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => handleNavClick('landing')}
                className="w-full text-left py-2.5 px-4 rounded-xl text-base font-rubik font-normal text-secondary dark:text-primary hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
