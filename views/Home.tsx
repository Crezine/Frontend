import React from 'react';
import {
  RiBook2Line,
  RiCalendarEventLine,
  RiShieldCheckLine,
  RiSwapLine,
  RiTimeLine
} from 'react-icons/ri';
import { ViewProps } from '../types';
import { motion } from 'framer-motion';

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
  <motion.button 
    whileHover={{ scale: 1.05, y: -5 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="bg-white p-6 rounded-[24px] md:rounded-[32px] border-2 border-secondary/5 hover:border-primary/20 hover:shadow-xl transition-all flex flex-col items-center gap-3 shadow-sm"
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary`}>
      {icon}
    </div>
    <span className="font-montserrat font-normal text-secondary/90 text-sm md:text-base">{label}</span>
  </motion.button>
);

const TransactionItem: React.FC<{ title: string; date: string; amount: string; type: 'positive' | 'negative' }> = ({ title, date, amount, type }) => (
  <div className="flex items-center justify-between py-4 border-b border-secondary/5 last:border-0">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${type === 'positive' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
        <RiTimeLine className="h-6 w-6" />
      </div>
      <div>
        <p className="font-rubik font-medium text-secondary text-sm md:text-base">{title}</p>
        <p className="text-xs text-secondary/60 font-rubik">{date}</p>
      </div>
    </div>
    <span className={`font-montserrat font-bold text-sm md:text-base ${type === 'positive' ? 'text-primary' : 'text-secondary'}`}>{amount}</span>
  </div>
);

const Home: React.FC<ViewProps> = ({ navigate, userData }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 font-rubik">
      <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-secondary">Hello, {userData?.name || 'Creative'}!</h1>
          <p className="text-secondary/70 mt-1 font-rubik">Your creative cashdoor is open and ready.</p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200 w-fit"
        >
          <RiShieldCheckLine/>
          <span className="text-sm font-rubik font-medium">Account Verified</span>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-primary rounded-[32px] p-6 md:p-10 text-white relative overflow-hidden group cursor-pointer shadow-2xl"
          onClick={() => navigate('wallet')}
        >
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
          <p className="text-white/80 font-rubik font-medium mb-2 uppercase tracking-widest text-xs">Total Balance</p>
          <div className="flex items-baseline gap-2 mb-10">
            <span className="text-5xl md:text-6xl font-montserrat font-bold">$12,450</span>
            <span className="text-2xl md:text-3xl text-white/90 font-montserrat">.00</span>
          </div>
          <div className="flex gap-4 relative z-10">
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('pay'); }}
              className="bg-white text-primary px-8 py-3.5 rounded-2xl font-montserrat font-normal hover:bg-white/90 transition-all text-sm md:text-base shadow-lg active:scale-95"
            >
              Add Money
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); navigate('wallet'); }}
              className="bg-secondary text-white px-8 py-3.5 rounded-2xl font-montserrat font-normal hover:bg-secondary/90 transition-all text-sm md:text-base shadow-lg active:scale-95"
            >
              Withdraw
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[32px] p-6 md:p-8 border-2 border-secondary/5 shadow-xl flex flex-col justify-between"
        >
          <div>
            <p className="text-secondary/60 font-rubik font-medium mb-6 uppercase tracking-widest text-xs">Active Escrows</p>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <RiTimeLine className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-3xl font-montserrat font-bold text-secondary">$2,100</h3>
                <p className="text-secondary/70 text-sm font-rubik">Waiting for delivery</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('escrow')}
            className="w-full py-4 border-2 border-secondary/10 rounded-2xl font-montserrat font-normal text-secondary hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all active:scale-95"
          >
            Manage Escrow
          </button>
        </motion.div>
      </div>

      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-montserrat font-bold mb-8 text-secondary"
      >
        Quick Actions
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16"
      >
        <ActionButton 
          icon={<RiBook2Line className="h-7 w-7"/>}
          label="Invoicing"
          onClick={() => navigate('pay')}
        />
        <ActionButton 
          icon={<RiCalendarEventLine className="h-7 w-7" />}
          label="Ticketing"
          onClick={() => navigate('events')}
        />
        <ActionButton 
          icon={<RiSwapLine className="h-7 w-7" />}
          label="FX Swap"
          onClick={() => navigate('wallet')}
        />
        <ActionButton 
          icon={<RiShieldCheckLine className="h-7 w-7" />}
          label="Grants"
          onClick={() => navigate('fund')}
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-[32px] p-8 md:p-10 border-2 border-secondary/5 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-montserrat font-bold text-secondary">Recent History</h2>
          <button onClick={() => navigate('wallet')} className="text-primary font-montserrat font-bold text-sm hover:underline">View All History</button>
        </div>
        <div className="space-y-2">
          <TransactionItem title="Escrow Release: Brand Identity" date="Oct 24, 2024" amount="+ $1,200.00" type="positive" />
          <TransactionItem title="Workshop Ticket Sold" date="Oct 23, 2024" amount="+ $45.00" type="positive" />
          <TransactionItem title="Payout to Local Bank" date="Oct 22, 2024" amount="- $500.00" type="negative" />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
