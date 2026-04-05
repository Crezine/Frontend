import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView } from '../types';
import { FiChevronDown, FiChevronRight, FiGlobe, FiDollarSign } from 'react-icons/fi';
import { ShopSubView } from '../views/ShopView';

interface ShopSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (view: AppView) => void;
  activeView: AppView;
  setSubView: (view: ShopSubView) => void;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ isOpen, onClose, navigate, activeView, setSubView }) => {
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  
  const [selectedLang, setSelectedLang] = useState('English');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const handleNavClick = (view: AppView) => {
    navigate(view);
    onClose();
  };

  const handleSubViewClick = (view: ShopSubView) => {
    setSubView(view);
    onClose();
  };

  const languages = ['English', 'Swahili', 'French', 'Spanish'];
  const currencies = ['USD', 'KES', 'EUR', 'GBP'];

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
            className="fixed top-0 left-0 h-full w-72 bg-white z-[70] shadow-2xl flex flex-col font-montserrat"
          >
            <nav className="flex-grow pt-8 px-6 overflow-y-auto no-scrollbar">
              <div className="space-y-2">
                <button
                  onClick={() => handleSubViewClick('all-products')}
                  className="w-full text-left py-3 px-4 rounded-xl text-base font-normal text-black hover:bg-accent/50 transition-all"
                >
                  All products
                </button>
                
                <button
                  onClick={() => handleSubViewClick('collections')}
                  className="w-full text-left py-3 px-4 rounded-xl text-base font-normal text-black hover:bg-accent/50 transition-all"
                >
                  Collections
                </button>

                {/* Shop by type Dropdown - Shows on Hover */}
                <div 
                  className="space-y-1"
                  onMouseEnter={() => setIsTypeOpen(true)}
                  onMouseLeave={() => setIsTypeOpen(false)}
                >
                  <button
                    className="w-full flex items-center gap-1 py-3 px-4 rounded-xl text-base font-normal text-black hover:bg-accent/50 transition-all"
                  >
                    <span>Shop by type</span>
                    <span className="inline-block translate-y-[1px] text-primary">
                      {isTypeOpen ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {isTypeOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col items-start pl-8"
                      >
                        <button 
                          onClick={() => handleSubViewClick('pencil-portrait')}
                          className="py-2 text-sm font-normal text-black hover:text-primary transition-colors text-left"
                        >
                          Pencil portrait
                        </button>
                        <button 
                          onClick={() => handleSubViewClick('paintings')}
                          className="py-2 text-sm font-normal text-black hover:text-primary transition-colors text-left"
                        >
                          Paintings
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </nav>

            {/* Bottom Controls */}
            <div className="p-6 border-t border-secondary/5 space-y-6 bg-accent/10">
              {/* Language Selection */}
              <div className="space-y-2">
                <h4 className="text-xs font-normal text-black pl-1">Choose language</h4>
                <div className="relative">
                  <button 
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="w-full bg-secondary text-white py-3 px-4 rounded-xl text-sm font-normal flex items-center justify-between hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
                  >
                    <div className="flex items-center gap-2">
                      <FiGlobe size={16} />
                      <span>{selectedLang}</span>
                    </div>
                    <FiChevronDown className={`transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isLangOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-2xl border border-secondary/5 overflow-hidden z-50"
                      >
                        {languages.map(lang => (
                          <button
                            key={lang}
                            onClick={() => {
                              setSelectedLang(lang);
                              setIsLangOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-normal text-black hover:bg-accent transition-colors"
                          >
                            {lang}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Currency Selection */}
              <div className="space-y-2">
                <h4 className="text-xs font-normal text-black pl-1">Currency</h4>
                <div className="relative">
                  <button 
                    onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                    className="w-full bg-secondary text-white py-3 px-4 rounded-xl text-sm font-normal flex items-center justify-between hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/20"
                  >
                    <div className="flex items-center gap-2">
                      <FiDollarSign size={16} />
                      <span>{selectedCurrency}</span>
                    </div>
                    <FiChevronDown className={`transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isCurrencyOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-0 w-full mb-2 bg-white rounded-xl shadow-2xl border border-secondary/5 overflow-hidden z-50"
                      >
                        {currencies.map(curr => (
                          <button
                            key={curr}
                            onClick={() => {
                              setSelectedCurrency(curr);
                              setIsCurrencyOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-normal text-black hover:bg-accent transition-colors"
                          >
                            {curr}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default ShopSidebar;
