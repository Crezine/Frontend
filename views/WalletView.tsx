import React, { useState } from 'react';
import { AppView } from '../types';

interface WalletViewProps {
  navigate: (view: AppView) => void;
}

const WalletView: React.FC<WalletViewProps> = ({ navigate }) => {
  const [isUSD, setIsUSD] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 font-montserrat transition-colors">
      <header className="mb-10 md:mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-normal font-rubik text-secondary dark:text-primary leading-tight mb-2">Transaction history</h1>
        <p className="text-black dark:text-white font-normal text-sm md:text-base">Simple, transparent, global.</p>
      </header>

      {/* Main Wallet Card */}
      <div className="bg-white dark:bg-gray-800 rounded-[2rem] shadow-sm border border-secondary/10 dark:border-white/10 overflow-hidden mb-12 transition-colors">
        <div className="p-8 md:p-12 border-b border-secondary/5 dark:border-white/5 text-center">
          <p className="text-black/60 dark:text-gray-400 font-normal uppercase tracking-widest text-[10px] mb-4 font-rubik">Total balance</p>
          <div className="flex flex-col items-center gap-4">
            <span className="text-5xl md:text-6xl font-normal text-primary dark:text-primary font-rubik">
              {isUSD ? '$ 12,450.00' : '₦ 19,920,000'}
            </span>
            <div className="mt-4 flex bg-pink-100 dark:bg-gray-700 p-1.5 rounded-full w-fit border border-black/5">
              <button 
                onClick={() => setIsUSD(true)}
                className={`px-6 py-2 rounded-full text-xs font-normal transition-all ${isUSD ? 'bg-secondary text-white shadow-md' : 'text-black dark:text-gray-300'}`}
              >
                USD
              </button>
              <button 
                onClick={() => setIsUSD(false)}
                className={`px-6 py-2 rounded-full text-xs font-normal transition-all ${!isUSD ? 'bg-secondary text-white shadow-md' : 'text-black dark:text-gray-300'}`}
              >
                NGN
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 divide-x divide-black/5 dark:divide-white/5">
          <button className="py-6 flex items-center justify-center gap-3 hover:bg-secondary/5 dark:hover:bg-primary/5 transition-all text-black dark:text-white font-normal text-sm">
            <div className="w-8 h-8 bg-secondary/10 text-secondary rounded-full flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </div>
            Send money
          </button>
          <button className="py-6 flex items-center justify-center gap-3 hover:bg-secondary/5 dark:hover:bg-primary/5 transition-all text-black dark:text-white font-normal text-sm">
            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 2.1l4 4-4 4"></path><path d="M3 12.2v-2a4 4 0 0 1 4-4h14"></path><path d="M7 21.9l-4-4 4-4"></path><path d="M21 11.8v2a4 4 0 0 1-4 4H3"></path></svg>
            </div>
            Convert to local
          </button>
        </div>
      </div>

      <div className="bg-pink-50 dark:bg-pink-900/10 rounded-2xl p-6 border border-pink-100 dark:border-pink-900/20 mb-12 flex items-start gap-4 transition-colors">
        <div className="w-10 h-10 bg-[#AB3625]/10 rounded-full flex items-center justify-center text-[#AB3625] shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-normal text-black dark:text-white mb-1">Protecting your value</h4>
          <p className="text-xs text-black/60 dark:text-gray-400 leading-relaxed font-normal">
            Crezine keeps your primary balance in USD (digital dollars) to protect you from local currency inflation. You only convert to local when you need to spend.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-normal text-black dark:text-primary mb-6 px-1 font-rubik">Recent activity</h3>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center justify-between p-5 bg-white dark:bg-gray-800 rounded-2xl border border-black/5 dark:border-white/5 transition-colors shadow-sm hover:shadow-md cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 text-secondary rounded-xl flex items-center justify-center transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <div>
                  <p className="font-normal text-black dark:text-gray-200 text-sm">Payout to local account</p>
                  <p className="text-[10px] text-black/40 dark:text-gray-400 font-normal">Oct {20 + i}, 2024 • Completed</p>
                </div>
              </div>
              <span className="font-normal text-primary dark:text-primary font-rubik text-base">-$450.00</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletView;
