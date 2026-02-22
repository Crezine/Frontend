import React from 'react';
import { AppView } from '../types';

interface EscrowViewProps {
  navigate: (view: AppView) => void;
}

const EscrowView: React.FC<EscrowViewProps> = ({ navigate }) => {

  const activeEscrows = [
    { title: 'Brand Identity Design', status: 'Waiting for client approval', amount: '$2,100.00', due: 'Nov 15, 2024' },
    { title: 'Website Development', status: 'In progress', amount: '$5,500.00', due: 'Dec 1, 2024' },
    { title: 'Illustration Commission', status: 'In progress', amount: '$850.00', due: 'Nov 22, 2024' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12">
      <header className="mb-8 md:mb-12">
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => navigate(AppView.DASHBOARD)}
            className="bg-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-sm text-secondary hover:text-primary hover:scale-110 transition-all border border-secondary/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-secondary font-century-gothic leading-tight">Escrow</h1>
            <p className="text-secondary/60 font-medium font-montserrat tracking-wide text-xs md:text-base">Secure your transactions with confidence.</p>
          </div>
        </div>
      </header>

      {/* What is Escrow & CTA */}
      <div className="bg-white rounded-[32px] md:rounded-[40px] border border-secondary/10 shadow-lg mb-10 md:mb-16 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-secondary/10">
            <h2 className="text-xl md:text-2xl font-bold font-century-gothic text-secondary mb-4">What is Escrow?</h2>
            <p className="text-sm md:text-base text-secondary/70 leading-relaxed font-montserrat font-medium">
              An escrow is a financial arrangement where a third party holds and regulates payment of the funds required for two parties in a given transaction. It makes transactions more secure by keeping the payment in a secure account which is only released when all of the terms of an agreement are met.
            </p>
          </div>
          <div className="p-8 md:p-10 bg-secondary/5 flex flex-col items-start justify-center">
            <h3 className="text-lg md:text-xl font-bold font-century-gothic text-secondary mb-3">Ready to Start a Secure Transaction?</h3>
            <p className="text-secondary/60 text-sm mb-6 font-montserrat font-medium">Protect your projects and payments by creating an escrow.</p>
            <button className="bg-primary text-white font-bold font-montserrat px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Create a New Escrow
            </button>
          </div>
        </div>
      </div>

      {/* Active Escrows */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold font-century-gothic text-secondary mb-6">Your Active Escrows</h2>
        <div className="space-y-4 md:space-y-5">
          {activeEscrows.map((escrow, i) => (
            <div key={i} className="bg-white p-5 md:p-6 rounded-2xl md:rounded-3xl border border-secondary/10 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <div className="grid grid-cols-2 md:grid-cols-10 items-center gap-4 md:gap-6">
                <div className="col-span-2 md:col-span-4 min-w-0">
                  <p className="font-bold text-secondary font-montserrat text-base md:text-lg truncate">{escrow.title}</p>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${escrow.status === 'In progress' ? 'bg-amber-500' : 'bg-blue-500'} animate-pulse`}></div>
                    <p className="text-sm text-secondary/80 font-medium font-montserrat whitespace-nowrap">{escrow.status}</p>
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 text-left md:text-right">
                  <p className="font-bold text-secondary text-base md:text-lg">{escrow.amount}</p>
                </div>
                <div className="col-span-2 md:col-span-2 text-left md:text-right">
                    <p className="text-xs text-secondary/50 font-bold uppercase tracking-wider">Due: {escrow.due}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EscrowView;
