import React from 'react';
import { AppView } from '../types';

interface PaymentsViewProps {
  navigate: (view: AppView) => void;
}

const PaymentsView: React.FC<PaymentsViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 font-montserrat">
      <header className="mb-6 md:mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-medium text-secondary dark:text-primary mb-1 md:mb-3">Payment Link</h1>
          <p className="text-lg md:text-xl text-secondary/70 dark:text-gray-400">Professional payment links that work everywhere.</p>
        </div>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-secondary/10 dark:border-white/10 shadow-sm p-6 md:p-10 mb-12 transition-colors">
        <h3 className="text-2xl font-bold text-secondary dark:text-primary mb-8">Generate Payment Link</h3>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold text-secondary/80 dark:text-gray-300 mb-2 block">Client Name</label>
            <input 
              type="text" 
              placeholder="e.g. Acme Creative Agency"
              className="w-full py-4 px-5 border border-secondary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-secondary/80 dark:text-gray-300 mb-2 block">Amount (USD)</label>
              <input 
                type="number" 
                placeholder="1500"
                className="w-full py-4 px-5 border border-secondary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-secondary/80 dark:text-gray-300 mb-2 block">Payment Type</label>
              <select className="w-full py-4 px-5 border border-secondary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 appearance-none bg-white font-medium">
                <option>Standard Payout</option>
                <option>Escrow (Recommended)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-secondary/80 dark:text-gray-300 mb-2 block">What's this for?</label>
            <input 
              type="text" 
              placeholder="e.g. Illustration Package - Phase 1"
              className="w-full py-4 px-5 border border-secondary/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
            Create Professional Link
          </button>
        </div>
      </div>

      <h3 className="text-xl font-bold text-secondary dark:text-primary mb-6">Payment Link History</h3>
      <div className="space-y-4">
        {[1, 2].map(i => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-secondary/10 dark:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              </div>
              <div>
                <p className="font-bold text-secondary dark:text-gray-200">Project #{4521 + i}</p>
                <p className="text-xs text-secondary/60 dark:text-gray-400">crezine.me/pay/creative-{i}23</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-secondary dark:text-primary">$850.00</p>
              <p className="text-xs text-amber-600 font-bold uppercase">Pending</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentsView;
