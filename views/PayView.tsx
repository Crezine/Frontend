import React from 'react';
import { AppView } from '../types';

interface PayViewProps {
  navigate: (view: AppView) => void;
}

const PayView: React.FC<PayViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 font-montserrat">
      <header className="mb-10 md:mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-normal text-secondary dark:text-primary leading-tight mb-2">Invoice link</h1>
        <p className="text-black dark:text-white font-normal text-sm md:text-base">Professional invoice links that work everywhere</p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-3xl border border-secondary/20 dark:border-secondary/40 p-6 md:p-10 mb-12 shadow-sm transition-colors">
        <div className="space-y-6 relative z-10 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1">Client's name</label>
              <input 
                type="text" 
                placeholder="e.g. Acme Creative Agency"
                className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1">Client's address</label>
              <input 
                type="text" 
                placeholder="123 Creative Street, NY"
                className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1">Client's email</label>
            <input 
              type="email" 
              placeholder="client@example.com"
              className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1">What's this for?</label>
            <input 
              type="text" 
              placeholder="e.g. Illustration package - phase 1"
              className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-400 ml-1">Amount</label>
              <div className="flex relative">
                <select className="appearance-none bg-white dark:bg-gray-900 border border-black border-r-0 rounded-l-xl px-3 text-xs font-normal text-secondary focus:outline-none">
                  <option>USD</option>
                  <option>KES</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>NGN</option>
                </select>
                <input 
                  type="number" 
                  placeholder="1500"
                  className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-r-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm font-rubik dark:text-white"
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
                <select className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal appearance-none text-xs dark:text-white pr-8">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1">Quantity</label>
              <input 
                type="number" 
                placeholder="1"
                className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1">Price per unit</label>
              <input 
                type="number" 
                placeholder="1500"
                className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1">Location</label>
              <input 
                type="text" 
                placeholder="e.g. Nairobi, Kenya"
                className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-300 ml-1">Date</label>
              <input 
                type="date" 
                className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white"
              />
            </div>
          </div>
          
          <div className="pt-6 flex flex-col items-center gap-4">
            <button className="w-full max-w-xs py-3 bg-secondary text-white rounded-full font-normal text-sm hover:opacity-95 transition-all shadow-md">
              Generate link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayView;
