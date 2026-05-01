import React, { useState } from 'react';
import { AppView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface PayViewProps {
  navigate: (view: AppView) => void;
}

const PayView: React.FC<PayViewProps> = ({ navigate }) => {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('Standard payout (Normal payout)');

  const currencies = ['USD', 'KES', 'EUR', 'GBP', 'NGN'];
  const types = ['Standard payout (Normal payout)', 'Escrow payout (Handled by an escrow gateway)'];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 font-montserrat transition-colors">
      <header className="mb-10 md:mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-normal font-rubik text-secondary dark:text-primary leading-tight mb-2">Invoice link</h1>
        <p className="text-black dark:text-white font-normal text-sm md:text-base font-montserrat">Professional invoice links that work everywhere</p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-[2rem] border border-secondary/20 dark:border-secondary/40 p-6 md:p-10 mb-12 shadow-sm transition-colors">
        <div className="space-y-6 relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">Client's name</label>
              <input 
                type="text" 
                placeholder="e.g. Acme Creative Agency"
                className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">Client's address</label>
              <input 
                type="text" 
                placeholder="123 Creative Street, NY"
                className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">Client's email</label>
            <input 
              type="email" 
              placeholder="client@example.com"
              className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">What's this for?</label>
            <input 
              type="text" 
              placeholder="e.g. Illustration package - phase 1"
              className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-400 ml-1 font-montserrat">Amount</label>
              <div className="flex relative">
                <div className="relative">
                  <button 
                    onClick={() => { setIsCurrencyOpen(!isCurrencyOpen); setIsTypeOpen(false); }}
                    className="h-[52px] bg-gray-50 dark:bg-gray-900 border border-black border-r-0 rounded-l-xl px-4 pr-10 text-xs font-normal text-secondary dark:text-primary focus:outline-none flex items-center min-w-[90px]"
                  >
                    {selectedCurrency}
                    <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-300 ${isCurrencyOpen ? 'rotate-180' : ''}`}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 1L4 4L1 1" stroke="#F69C31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                  <AnimatePresence>
                    {isCurrencyOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        {currencies.map(curr => (
                          <button
                            key={curr}
                            onClick={() => { setSelectedCurrency(curr); setIsCurrencyOpen(false); }}
                            className="w-full px-4 py-3 text-left text-xs hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white font-normal"
                          >
                            {curr}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <input 
                  type="number" 
                  placeholder="1500"
                  className="w-full h-[52px] px-4 bg-transparent border border-black rounded-r-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm font-rubik dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-400 ml-1 font-montserrat">Payment type</label>
              <div className="relative">
                <button 
                  onClick={() => { setIsTypeOpen(!isTypeOpen); setIsCurrencyOpen(false); }}
                  className="w-full h-[52px] py-3 px-4 bg-gray-50 dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white pr-12 flex items-center text-left"
                >
                  <span className="truncate">{selectedType}</span>
                  <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ${isTypeOpen ? 'rotate-180' : ''}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 3L6 7L2 3" stroke="#F69C31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </button>
                <AnimatePresence>
                  {isTypeOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                    >
                      {types.map(type => (
                        <button
                          key={type}
                          onClick={() => { setSelectedType(type); setIsTypeOpen(false); }}
                          className="w-full px-5 py-4 text-left text-xs hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white font-normal"
                        >
                          {type}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">Quantity</label>
              <input 
                type="number" 
                placeholder="1"
                className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">Price per unit</label>
              <input 
                type="number" 
                placeholder="1500"
                className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">Location</label>
              <input 
                type="text" 
                placeholder="e.g. Nairobi, Kenya"
                className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">Date</label>
              <input 
                type="date" 
                className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
          </div>
          
          <div className="pt-6 flex flex-col items-center gap-4">
            <button className="w-full max-w-xs h-[52px] bg-secondary text-white rounded-full font-normal text-sm hover:opacity-95 transition-all shadow-md font-montserrat">
              Generate link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayView;
