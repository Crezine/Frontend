import React from 'react';
import { AppView } from '../types';

interface EscrowViewProps {
  navigate: (view: AppView) => void;
}

const EscrowView: React.FC<EscrowViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-16 font-montserrat">
      <header className="mb-10 md:mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-normal text-secondary dark:text-primary leading-tight mb-3">Invoice link</h1>
        <p className="text-black dark:text-white font-normal text-sm md:text-base">Professional payment links that work everywhere</p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-secondary/20 dark:border-secondary/40 p-6 md:p-10 mb-12 shadow-sm transition-colors">
        <div className="space-y-6 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1">Client name:</label>
            <input 
              type="text" 
              placeholder="e.g. Acme Creative Agency"
              className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black/20 dark:border-white/10 rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-400 ml-1">Amount</label>
              <div className="flex relative group">
                <select className="appearance-none bg-white dark:bg-gray-900 border border-black/20 dark:border-white/10 border-r-0 rounded-l-xl px-3 text-xs font-normal text-secondary focus:outline-none">
                  <option>USD</option>
                  <option>KES</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>NGN</option>
                </select>
                <input 
                  type="number" 
                  placeholder="1500"
                  className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black/20 dark:border-white/10 rounded-r-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
                />
                <div className="absolute bottom-3 right-3 pointer-events-none">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L4 4L1 1" stroke="#F69C31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-400 ml-1">Payment type</label>
              <div className="relative">
                <select className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black/20 dark:border-white/10 rounded-xl focus:outline-none focus:border-secondary transition-all font-normal appearance-none text-xs dark:text-white pr-8">
                  <option>Standard payout (Normal payout)</option>
                  <option>Escrow payout (Handled by an escrow gateway)</option>
                </select>
                <div className="absolute bottom-3 right-3 pointer-events-none">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L4 4L1 1" stroke="#F69C31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-gray-400 ml-1">What's this for?</label>
            <input 
              type="text" 
              placeholder="e.g. Illustration package - phase 1"
              className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black/20 dark:border-white/10 rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
            />
          </div>
          
          <div className="pt-4 flex flex-col items-center gap-4">
            <button className="w-full max-w-xs py-3 bg-secondary text-white rounded-full font-normal text-sm hover:opacity-95 transition-all shadow-md">
              Generate link
            </button>
            <button className="text-[10px] md:text-xs font-normal text-secondary hover:underline transition-all text-center">
              Click here to reuse this link for multiple payments
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-normal text-black/80 dark:text-primary mb-4 px-1">Active gigs</h3>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-black/5 dark:border-white/5 overflow-hidden shadow-sm transition-colors">
          <div className="p-6 border-b border-black/5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
              <h4 className="text-lg font-normal text-black/80 dark:text-gray-200">Logo & brand design</h4>
              <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 px-3 py-1 rounded-full text-[10px] font-normal border border-yellow-200 dark:border-yellow-900/50 uppercase tracking-wider">Locked</span>
            </div>
            <p className="text-black/40 dark:text-gray-400 text-xs mb-6">Client: Nexus Media Inc.</p>
            <div className="w-full bg-black/5 dark:bg-white/5 h-1.5 rounded-full mb-8">
              <div className="bg-green-500 h-full w-1/2 rounded-full"></div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-8">
                <div>
                  <p className="text-[10px] text-black/40 dark:text-gray-400 uppercase font-normal tracking-widest mb-1">Total</p>
                  <p className="font-normal text-black/80 dark:text-primary">$2,400.00</p>
                </div>
                <div>
                  <p className="text-[10px] text-black/40 dark:text-gray-400 uppercase font-normal tracking-widest mb-1">Milestone 1</p>
                  <p className="font-normal text-green-600 dark:text-green-400">Released</p>
                </div>
              </div>
              <button className="bg-secondary text-white px-6 py-2 rounded-xl font-normal text-xs hover:bg-secondary/90 transition-colors whitespace-nowrap">
                Request release
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowView;
