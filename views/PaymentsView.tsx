import React from 'react';
import { AppView } from '../types';

interface PaymentsViewProps {
  navigate: (view: AppView) => void;
}

const PaymentsView: React.FC<PaymentsViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 md:py-12 font-montserrat">
      <header className="mb-8 md:mb-12">
        <div>
          <h1 className="text-2xl md:text-4xl font-medium text-secondary dark:text-primary leading-tight">Global Payments</h1>
          <p className="text-secondary/60 dark:text-gray-400 font-medium tracking-wide text-xs md:text-base">Professional payment links that work everywhere.</p>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-[32px] md:rounded-[48px] border border-secondary/5 dark:border-white/5 shadow-2xl shadow-secondary/5 p-6 md:p-12 mb-10 md:mb-12 relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-primary/5 rounded-bl-full"></div>
        <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-secondary dark:text-primary">Generate Payment Link</h3>
        <div className="space-y-4 md:space-y-6 relative z-10">
          <div>
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-secondary/40 dark:text-gray-500 mb-2 md:mb-3 block">Client Name</label>
            <input 
              type="text" 
              placeholder="e.g. Acme Creative Agency"
              className="w-full py-3 md:py-4 px-4 md:px-6 bg-accent/30 dark:bg-gray-900 border-2 border-transparent focus:border-primary rounded-xl md:rounded-2xl focus:outline-none transition-all font-medium text-sm md:text-base dark:text-white"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-secondary/40 dark:text-gray-500 mb-2 md:mb-3 block">Amount (USD)</label>
              <input 
                type="number" 
                placeholder="1500"
                className="w-full py-3 md:py-4 px-4 md:px-6 bg-accent/30 dark:bg-gray-900 border-2 border-transparent focus:border-primary rounded-xl md:rounded-2xl focus:outline-none transition-all font-medium text-sm md:text-base dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-secondary/40 dark:text-gray-500 mb-2 md:mb-3 block">Payment Type</label>
              <select className="w-full py-3 md:py-4 px-4 md:px-6 bg-accent/30 dark:bg-gray-900 border-2 border-transparent focus:border-primary rounded-xl md:rounded-2xl focus:outline-none transition-all font-medium appearance-none text-sm md:text-base dark:text-white">
                <option>Standard Payout</option>
                <option>Escrow (Recommended)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-secondary/40 dark:text-gray-500 mb-2 md:mb-3 block">What's this for?</label>
            <input 
              type="text" 
              placeholder="e.g. Illustration Package - Phase 1"
              className="w-full py-3 md:py-4 px-4 md:px-6 bg-accent/30 dark:bg-gray-900 border-2 border-transparent focus:border-primary rounded-xl md:rounded-2xl focus:outline-none transition-all font-medium text-sm md:text-base dark:text-white"
            />
          </div>
          <button className="w-full py-4 md:py-5 bg-primary text-white rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-secondary transition-all shadow-xl shadow-primary/20">
            Create Professional Link
          </button>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-secondary dark:text-primary">History</h3>
      <div className="space-y-3 md:space-y-4">
        {[1, 2].map(i => (
          <div key={i} className="flex items-center justify-between p-4 md:p-6 bg-white dark:bg-gray-800 rounded-[24px] md:rounded-[32px] border border-secondary/5 dark:border-white/5 shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center gap-3 md:gap-5">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/50 dark:bg-gray-700 group-hover:bg-accent dark:group-hover:bg-gray-600 text-secondary dark:text-primary rounded-xl md:rounded-2xl flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-secondary dark:text-gray-200 text-sm md:text-base truncate">Project #{4521 + i}</p>
                <p className="text-[10px] md:text-xs text-secondary/40 dark:text-gray-500 font-bold uppercase tracking-wider truncate max-w-[150px] sm:max-w-none">crezine.me/pay/creative-{i}23</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-secondary dark:text-primary text-base md:text-lg font-rubik font-light">$850.00</p>
              <p className="text-[9px] md:text-[10px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-[0.1em]">Pending</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsView;
