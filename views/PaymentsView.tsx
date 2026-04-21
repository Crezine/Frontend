import React from 'react';
import { AppView } from '../types';

interface PaymentsViewProps {
  navigate: (view: AppView) => void;
}

const PaymentsView: React.FC<PaymentsViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-4 md:py-8 font-montserrat">
      <header className="mb-6 md:mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-normal text-secondary dark:text-primary leading-tight mb-2">Payment link</h1>
        <p className="text-black dark:text-white font-normal text-sm md:text-base">Professional payment links that work everywhere</p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-secondary/20 dark:border-secondary/40 p-6 md:p-10 mb-12 shadow-sm transition-colors relative">
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
        <h3 className="text-lg font-normal text-black/80 dark:text-primary mb-4 px-1">Recent history</h3>
        {[1, 2].map(i => (
          <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 text-secondary rounded-xl flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <div className="min-w-0">
                <p className="font-normal text-black/80 dark:text-gray-200 text-sm truncate">Project #{4521 + i}</p>
                <p className="text-[10px] text-black/40 dark:text-gray-500 font-normal uppercase tracking-wider truncate">crezine.me/pay/creative-{i}23</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-normal text-black/90 dark:text-primary text-base">$850.00</p>
              <p className="text-[9px] text-amber-600 dark:text-amber-400 font-normal uppercase tracking-wider">Pending</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsView;
