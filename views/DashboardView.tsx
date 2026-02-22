import React from 'react';
import { AppView } from '../types';
import ActionButton from '../components/ActionButton';
import TransactionItem from '../components/TransactionItem';

interface DashboardViewProps {
  navigate: (view: AppView) => void;
  user: { name: string; isVerified: boolean } | null;
}

const DashboardView: React.FC<DashboardViewProps> = ({ navigate, user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
      <header className="mb-8 md:mb-16 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold text-secondary font-century-gothic leading-tight">
            Hello, <span className="text-primary">{user?.name || 'Creative'}</span>!
          </h1>
          <p className="text-secondary/70 mt-1 md:mt-2 font-medium font-century-gothic text-sm md:text-base">Your creative cashdoor is open and ready.</p>
        </div>
        <div className="flex items-center gap-2.5 md:gap-3 bg-emerald-50 text-emerald-700 px-4 md:px-5 py-2 md:py-2.5 rounded-xl md:rounded-2xl border border-emerald-100 w-fit shadow-sm">
          <div className="w-2 md:w-2.5 h-2 md:h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs md:text-sm font-bold font-century-gothic tracking-wide">Account Verified</span>
        </div>
      </header>

      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">
        <div 
          className="lg:col-span-2 bg-primary rounded-[32px] md:rounded-[40px] p-6 md:p-10 text-white relative overflow-hidden group cursor-pointer shadow-2xl shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98]"
          onClick={() => navigate(AppView.WALLET)}
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
          <p className="text-white/80 font-bold mb-3 md:mb-4 uppercase tracking-[0.2em] text-[10px] md:text-xs">Total Balance</p>
          <div className="flex items-baseline gap-1 mb-8 md:mb-10">
            <span className="text-5xl md:text-7xl font-bold font-century-gothic">$12,450</span>
            <span className="text-xl md:text-3xl font-medium text-white/70 font-century-gothic">.00</span>
          </div>
          <div className="flex gap-3 md:gap-4 relative z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); navigate(AppView.PAYMENTS); }}
              className="bg-accent text-primary px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-white transition-all font-century-gothic shadow-lg text-sm md:text-base"
            >
              Add Money
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate(AppView.WALLET); }}
              className="bg-secondary text-white px-5 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold hover:bg-black transition-all font-century-gothic shadow-lg text-sm md:text-base"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-secondary/5 shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-secondary/60 font-bold mb-4 md:mb-6 uppercase tracking-[0.2em] text-[10px] md:text-xs">Active Escrows</p>
            <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold font-century-gothic text-secondary">$2,100</h3>
                <p className="text-secondary/50 text-xs md:text-sm font-medium">Waiting for delivery</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate(AppView.ESCROW)}
            className="w-full py-4 md:py-5 border-2 border-accent rounded-xl md:rounded-2xl font-bold text-secondary hover:bg-accent hover:border-primary/20 transition-all font-century-gothic text-sm md:text-base"
          >
            Manage Escrow
          </button>
        </div>
      </div>

      {/* Actions */}
      <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 font-century-gothic text-secondary">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-16">
        <ActionButton 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          label="Invoicing"
          onClick={() => navigate(AppView.PAYMENTS)}
          color="bg-blue-50 text-blue-600"
        />
        <ActionButton 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>}
          label="Ticketing"
          onClick={() => navigate(AppView.TICKETING)}
          color="bg-purple-50 text-purple-600"
        />
        <ActionButton 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
          label="FX Swap"
          onClick={() => navigate(AppView.WALLET)}
          color="bg-emerald-50 text-emerald-600"
        />
        <ActionButton 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          label="Grants"
          onClick={() => navigate(AppView.FUNDING)}
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-10 border border-secondary/5 shadow-xl">
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold font-century-gothic text-secondary">Recent History</h2>
          <button onClick={() => navigate(AppView.WALLET)} className="text-primary font-bold text-xs md:text-sm hover:underline font-century-gothic tracking-wide">View All</button>
        </div>
        <div className="space-y-1">
          <TransactionItem title="Escrow Release: Brand Identity" date="Oct 24, 2024" amount="+ $1,200.00" type="positive" />
          <TransactionItem title="Workshop Ticket Sold" date="Oct 23, 2024" amount="+ $45.00" type="positive" />
          <TransactionItem title="Payout to Local Bank" date="Oct 22, 2024" amount="- $500.00" type="negative" />
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
