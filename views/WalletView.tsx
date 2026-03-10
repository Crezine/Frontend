import React, { useState } from 'react';
import { AppView } from '../types';

interface WalletViewProps {
  navigate: (view: AppView) => void;
}

const WalletView: React.FC<WalletViewProps> = ({ navigate }) => {
  const [isUSD, setIsUSD] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 font-montserrat">
      <header className="flex items-center mb-6 md:mb-8">
        <div>
            <h1 className="text-2xl md:text-3xl font-medium text-secondary dark:text-primary">Transaction History</h1>
            <p className="text-secondary/70 dark:text-gray-400">Simple, transparent, global.</p>
        </div>
      </header>

      {/* Main Wallet Card */}
      <div className="bg-white dark:bg-gray-800 rounded-[32px] shadow-sm border border-secondary/10 dark:border-white/10 overflow-hidden mb-8 transition-colors">
        <div className="p-6 md:p-8 border-b border-secondary/10 dark:border-white/10 text-center">
          <p className="text-secondary/60 dark:text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Total Balance</p>
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl md:text-6xl font-bold text-primary">
              {isUSD ? '$12,450.00' : '₦19,920,000'}
            </span>
            <div className="mt-3 flex bg-secondary/10 dark:bg-primary/10 p-1.5 rounded-full w-fit">
              <button 
                onClick={() => setIsUSD(true)}
                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${isUSD ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-secondary/70 dark:text-gray-400'}`}
              >
                USD
              </button>
              <button 
                onClick={() => setIsUSD(false)}
                className={`px-5 py-1.5 rounded-full text-sm font-bold transition-all ${!isUSD ? 'bg-white dark:bg-primary shadow-sm text-primary dark:text-white' : 'text-secondary/70 dark:text-gray-400'}`}
              >
                NGN
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2">
          <button className="p-6 text-center hover:bg-secondary/5 dark:hover:bg-primary/5 transition-colors border-r border-secondary/10 dark:border-white/10 font-bold text-md flex flex-col items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </div>
            Send Money
          </button>
          <button className="p-6 text-center hover:bg-secondary/5 dark:hover:bg-primary/5 transition-colors font-bold text-md flex flex-col items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
            Convert to Local
          </button>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/30 mb-10 flex items-start gap-4">
        <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center text-amber-600 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-amber-900 dark:text-amber-200 mb-1">Protecting Your Value</h4>
          <p className="text-sm text-amber-800 dark:text-amber-300/80 leading-relaxed">
            Crezine keeps your primary balance in USD (digital dollars) to protect you from local currency inflation. You only convert to local when you need to spend.
          </p>
        </div>
      </div>

      <h3 className="text-xl font-bold text-secondary dark:text-primary mb-5">Recent Wallet Activity</h3>
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-secondary/10 dark:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary/5 dark:bg-white/5 rounded-full flex items-center justify-center text-secondary/60 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <div>
                <p className="font-bold text-secondary dark:text-gray-200">Payout to Local Account</p>
                <p className="text-xs text-secondary/60 dark:text-gray-400 font-rubik">Oct {20 + i}, 2024 • Completed</p>
              </div>
            </div>
            <span className="font-bold text-secondary dark:text-primary font-rubik">-$450.00</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletView;
