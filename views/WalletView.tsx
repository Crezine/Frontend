import React, { useState } from 'react';
import { AppView } from '../types';

interface WalletViewProps {
  navigate: (view: AppView) => void;
}

const WalletView: React.FC<WalletViewProps> = ({ navigate }) => {
  const [isUSD, setIsUSD] = useState(true);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12">
      <header className="mb-8 md:mb-12 flex items-center gap-4 md:gap-6">
        <button 
          onClick={() => navigate(AppView.DASHBOARD)}
          className="bg-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-sm text-secondary hover:text-primary hover:scale-110 transition-all border border-secondary/5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-secondary font-century-gothic leading-tight">The Creative Wallet</h1>
          <p className="text-secondary/60 font-medium font-montserrat tracking-wide text-xs md:text-base">Simple, transparent, global.</p>
        </div>
      </header>

      {/* Main Wallet Card */}
      <div className="bg-white rounded-[32px] md:rounded-[48px] shadow-2xl shadow-secondary/5 border border-secondary/5 overflow-hidden mb-8 md:mb-10">
        <div className="p-8 md:p-12 border-b-2 border-secondary/10 text-center bg-gradient-to-b from-accent/20 to-transparent">
          <p className="text-secondary/40 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mb-4 md:mb-6">Total Balance</p>
          <div className="flex flex-col items-center gap-6 md:gap-8">
            <span className="text-4xl sm:text-5xl md:text-6xl font-black text-secondary tracking-tight font-montserrat">
              {isUSD ? '$12,450.00' : '₦19,920,000'}
            </span>
            <div className="flex bg-accent/30 p-1.5 md:p-2 rounded-[20px] md:rounded-[24px] w-fit border border-secondary/5 shadow-inner">
              <button 
                onClick={() => setIsUSD(true)}
                className={`px-6 md:px-8 py-2 md:py-3 rounded-[15px] md:rounded-[18px] text-xs md:text-sm font-bold transition-all font-montserrat ${isUSD ? 'bg-white shadow-lg text-primary scale-105' : 'text-secondary/50 hover:text-secondary'}`}
              >
                USD
              </button>
              <button 
                onClick={() => setIsUSD(false)}
                className={`px-6 md:px-8 py-2 md:py-3 rounded-[15px] md:rounded-[18px] text-xs md:text-sm font-bold transition-all font-montserrat ${!isUSD ? 'bg-white shadow-lg text-primary scale-105' : 'text-secondary/50 hover:text-secondary'}`}
              >
                NGN
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2">
          <button className="p-6 md:p-8 text-center hover:bg-accent/60 active:bg-accent transition-all border-r-2 border-secondary/10 font-bold text-secondary flex flex-col items-center gap-3 md:gap-4 font-montserrat group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            </div>
            <span className="text-xs md:text-base">Send Money</span>
          </button>
          <button className="p-6 md:p-8 text-center hover:bg-accent/60 active:bg-accent transition-all font-bold text-secondary flex flex-col items-center gap-3 md:gap-4 font-montserrat group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary text-white rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            </div>
            <span className="text-xs md:text-base">Convert</span>
          </button>
        </div>
      </div>

      <div className="bg-primary/5 rounded-[24px] md:rounded-[32px] p-6 md:p-8 border-2 border-primary/10 mb-10 md:mb-16 flex flex-col sm:flex-row items-start gap-4 md:gap-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center text-primary shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h4 className="font-bold text-secondary mb-1 md:mb-2 font-century-gothic text-lg md:text-xl">Protecting Your Value</h4>
          <p className="text-sm md:text-base text-secondary/70 leading-relaxed font-montserrat font-medium">
            CREZINE keeps your primary balance in USD (digital dollars) to protect you from local currency inflation. You only convert to local when you need to spend.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h3 className="text-xl md:text-2xl font-bold font-century-gothic text-secondary">Wallet History</h3>
        <button className="text-primary font-bold text-xs md:text-sm hover:underline font-montserrat tracking-wide">Download CSV</button>
      </div>
      <div className="space-y-3 md:space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="flex items-center justify-between p-4 md:p-6 bg-white rounded-[24px] md:rounded-[32px] border border-secondary/5 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
            <div className="flex items-center gap-3 md:gap-5">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/50 group-hover:bg-accent text-secondary rounded-xl md:rounded-2xl flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-secondary font-montserrat text-sm md:text-base truncate">Payout to Local Account</p>
                <p className="text-[10px] md:text-xs text-secondary/40 font-bold uppercase tracking-wider font-montserrat">Oct {20 + i}, 2024 • Completed</p>
              </div>
            </div>
            <span className="font-bold text-secondary text-base md:text-lg font-montserrat shrink-0">-$450.00</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletView;
