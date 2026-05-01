import React, { useState } from 'react';
import { AppView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface FundViewProps {
  navigate: (view: AppView) => void;
}

const FundView: React.FC<FundViewProps> = ({ navigate }) => {
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isMethodOpen, setIsMethodOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('Debit / Credit card');

  const currencies = ['USD', 'KES', 'NGN'];
  const methods = ['Debit / Credit card', 'M-Pesa', 'Bank transfer', 'Apple pay', 'Google pay'];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 font-montserrat transition-colors">
      <header className="mb-10 md:mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-normal font-rubik text-secondary dark:text-primary leading-tight mb-2">Deposit funds</h1>
        <p className="text-black dark:text-white font-normal text-sm md:text-base font-montserrat">Securely fund your creative wallet from anywhere</p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-[2rem] border border-secondary/20 dark:border-secondary/40 p-6 md:p-10 mb-12 shadow-sm transition-colors">
        <div className="space-y-8 relative z-10 text-left">
          
          {/* Deposit Amount */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">Deposit amount</label>
            <div className="flex relative">
              <div className="relative">
                <button 
                  onClick={() => { setIsCurrencyOpen(!isCurrencyOpen); setIsMethodOpen(false); }}
                  className="h-[52px] bg-gray-50 dark:bg-gray-900 border border-black border-r-0 rounded-l-xl px-4 pr-10 text-xs font-normal text-secondary dark:text-primary focus:outline-none flex items-center gap-2 min-w-[90px]"
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
                placeholder="100.00"
                className="w-full h-[52px] px-4 bg-transparent border border-black rounded-r-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm font-rubik dark:text-white"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="flex flex-col gap-3">
            <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1 font-montserrat">Payment method</label>
            <div className="relative">
              <button 
                onClick={() => { setIsMethodOpen(!isMethodOpen); setIsCurrencyOpen(false); }}
                className="w-full h-[52px] py-3 px-4 bg-gray-50 dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white pr-12 flex items-center text-left"
              >
                {selectedMethod}
                <div className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ${isMethodOpen ? 'rotate-180' : ''}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 3L6 7L2 3" stroke="#F69C31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {isMethodOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-full bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                  >
                    {methods.map(method => (
                      <button
                        key={method}
                        onClick={() => { setSelectedMethod(method); setIsMethodOpen(false); }}
                        className="w-full px-5 py-4 text-left text-sm hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white font-normal"
                      >
                        {method}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="pt-6 flex flex-col items-center gap-4">
            <button className="w-full max-w-lg h-[52px] bg-secondary text-white rounded-full font-normal text-sm hover:opacity-95 transition-all shadow-lg tracking-widest uppercase font-montserrat">
              Confirm deposit
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-normal text-black dark:text-primary mb-6 px-1 font-rubik">Recent activity</h3>
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-black/5 dark:border-white/5 transition-colors shadow-sm hover:shadow-md cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 text-secondary rounded-xl flex items-center justify-center transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </div>
                <div>
                  <p className="font-normal text-black dark:text-gray-200 text-sm font-montserrat">Deposit via card</p>
                  <p className="text-[10px] text-black/40 dark:text-gray-400 font-normal font-montserrat">Oct {24 + i}, 2024 • Completed</p>
                </div>
              </div>
              <span className="font-normal text-primary dark:text-primary font-rubik text-base">+$500.00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FundView;
