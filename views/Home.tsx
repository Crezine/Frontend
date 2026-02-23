import React from 'react';
import {
  RiAddLine,
  RiArrowDownLine,
  RiArrowRightUpLine,
  RiArrowUpLine,
  RiBook2Line,
  RiCalendarEventLine,
  RiShieldCheckLine,
  RiSwapLine,
  RiTimeLine
} from 'react-icons/ri';
import { AppView } from '../types';

// Sub-components defined within the Home view for encapsulation
const ActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-[24px] md:rounded-[32px] border border-secondary/5 hover:border-primary/20 hover:shadow-md transition-all flex flex-col items-center gap-3 shadow-sm"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary`}>
      {icon}
    </div>
    <span className="font-bold text-secondary/90 text-sm md:text-base">{label}</span>
  </button>
);

const TransactionItem: React.FC<{ title: string; date: string; amount: string; type: 'positive' | 'negative' }> = ({ title, date, amount, type }) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${type === 'positive' ? 'bg-primary/10 text-primary' : 'bg-red-100 text-red-600'}`}>
        {type === 'positive' ? (
          <RiArrowUpLine className="h-5 w-5" />
        ) : (
          <RiArrowDownLine className="h-5 w-5" />
        )}
      </div>
      <div>
        <p className="font-bold text-secondary text-sm md:text-base">{title}</p>
        <p className="text-xs text-secondary/60 font-medium">{date}</p>
      </div>
    </div>
    <span className={`font-bold text-sm md:text-base ${type === 'positive' ? 'text-primary' : 'text-red-600'}`}>{amount}</span>
  </div>
);

const Home: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 font-montserrat">
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary">Hello, Betu!</h1>
          <p className="text-secondary/70 mt-1">Your creative cashdoor is open and ready.</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200 w-fit">
          <RiShieldCheckLine/>
          <span className="text-sm font-semibold">Account Verified</span>
        </div>
      </header>

      {/* Main Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
        <div 
          className="lg:col-span-2 bg-primary rounded-[32px] p-6 md:p-8 text-white relative overflow-hidden group cursor-pointer shadow-xl"
          onClick={() => navigate('wallet')}
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          <p className="text-white/80 font-medium mb-2 uppercase tracking-widest text-xs">Total Balance</p>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-4xl md:text-5xl font-bold">$12,450</span>
            <span className="text-xl md:text-2xl text-white/90">.00</span>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('pay'); }}
              className="bg-white text-primary px-5 py-2.5 md:px-6 md:py-3 rounded-2xl font-bold hover:bg-primary/10 hover:text-white transition-colors text-sm md:text-base"
            >
              Add Money
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('wallet'); }}
              className="bg-primary-focus text-white px-5 py-2.5 md:px-6 md:py-3 rounded-2xl font-bold hover:bg-opacity-80 transition-colors text-sm md:text-base"
            >
              Withdraw
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-6 md:p-8 border border-secondary/5 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-secondary/60 font-medium mb-4 uppercase tracking-widest text-xs">Active Escrows</p>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <RiTimeLine className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-secondary">$2,100</h3>
                <p className="text-secondary/70 text-sm">Waiting for delivery</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('escrow')}
            className="w-full py-3 md:py-4 border-2 border-secondary/5 rounded-2xl font-bold text-secondary hover:border-primary/20 hover:bg-primary/10 hover:text-primary transition-all"
          >
            Manage Escrow
          </button>
        </div>
      </div>

      {/* Actions */}
      <h2 className="text-xl font-bold mb-6 text-secondary">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
        <ActionButton 
          icon={<RiBook2Line className="h-6 w-6"/>}
          label="Invoicing"
          onClick={() => navigate('pay')}
        />
        <ActionButton 
          icon={<RiCalendarEventLine className="h-6 w-6" />}
          label="Ticketing"
          onClick={() => navigate('events')}
        />
        <ActionButton 
          icon={<RiSwapLine className="h-6 w-6" />}
          label="FX Swap"
          onClick={() => navigate('wallet')}
        />
        <ActionButton 
          icon={<RiShieldCheckLine className="h-6 w-6" />}
          label="Grants"
          onClick={() => navigate('fund')}
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[32px] p-6 md:p-8 border border-secondary/5 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-secondary">Recent History</h2>
          <button onClick={() => navigate('wallet')} className="text-primary font-semibold text-sm hover:underline">View All</button>
        </div>
        <div className="space-y-4">
          <TransactionItem title="Escrow Release: Brand Identity" date="Oct 24, 2024" amount="+ $1,200.00" type="positive" />
          <TransactionItem title="Workshop Ticket Sold" date="Oct 23, 2024" amount="+ $45.00" type="positive" />
          <TransactionItem title="Payout to Local Bank" date="Oct 22, 2024" amount="- $500.00" type="negative" />
        </div>
      </div>
    </div>
  );
};

export default Home;
