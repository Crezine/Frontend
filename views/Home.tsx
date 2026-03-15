import React, { useState } from 'react';
import {
  RiTimeLine,
} from 'react-icons/ri';
import { HiSwitchVertical } from "react-icons/hi";
import { BiHide, BiShow } from "react-icons/bi";
import { RxSwitch } from "react-icons/rx";
import { ViewProps } from '../types';
import { motion } from 'framer-motion';

const ActionButton: React.FC<{ label: string; onClick: () => void; variant?: 'default' | 'maroon' }> = ({ label, onClick, variant = 'default' }) => (
  <motion.button 
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`${
      variant === 'maroon' 
        ? 'bg-secondary text-primary dark:bg-secondary dark:text-primary' 
        : 'bg-white text-secondary dark:bg-gray-800 dark:text-primary border-gray-100 dark:border-gray-700'
    } p-3 md:p-4 rounded-[24px] border flex flex-col items-center justify-center shadow-sm h-full w-full overflow-hidden transition-colors`}
  >
    <span className="font-rubik font-normal text-[11px] md:text-sm text-center leading-tight tracking-wide">
      {label}
    </span>
  </motion.button>
);

const TransactionItem: React.FC<{ title: string; date: string; amount: string; type: 'positive' | 'negative' }> = ({ title, date, amount, type }) => (
  <div className="flex items-center justify-between py-4 border-b border-secondary/5 dark:border-white/5 last:border-0">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${type === 'positive' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
        <RiTimeLine className="h-5 w-5 md:h-6 md:w-6" />
      </div>
      <div>
        <p className="font-montserrat font-normal text-secondary dark:text-gray-200 text-sm md:text-base">{title}</p>
        <p className="text-xs text-secondary/60 dark:text-gray-400 font-montserrat font-normal">{date}</p>
      </div>
    </div>
    <span className={`font-rubik font-normal text-sm md:text-base ${type === 'positive' ? 'text-primary' : 'text-secondary dark:text-secondary'}`}>{amount}</span>
  </div>
);

const Home: React.FC<ViewProps> = ({ navigate, userData }) => {
  const [showBalance, setShowBalance] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');

  const toggleCurrency = () => {
    setCurrency(prev => prev === 'USD' ? 'NGN' : 'USD');
  };

  const balanceData = {
    USD: { symbol: '$', amount: '12,450', cents: '.00' },
    NGN: { symbol: '₦', amount: '19,920,000', cents: '.00' }
  };

  const currentBalance = balanceData[currency];

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10 font-montserrat font-normal">
      <header className="mb-6 md:mb-10 flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-montserrat font-medium text-secondary dark:text-primary">Hello, {userData?.name || 'Creative'}!</h1>
          <p className="text-black dark:text-gray-300 mt-1 font-montserrat font-normal text-base md:text-lg">Welcome to Your Creative Cashdoor.</p>
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <img 
            src="/verified.png" 
            alt="Verified" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
          />
          <span className="font-montserrat font-medium text-[11px] md:text-sm text-center text-black dark:text-gray-300 tracking-wide">Account verified!</span>
        </div>
      </header>

      {/* Main Dashboard Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-10 items-stretch">
        
        {/* Left: Balance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-primary rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden shadow-xl flex flex-col justify-center min-h-[160px] md:min-h-[200px] h-full"
        >
          {/* Top Right Icon: Currency Switch */}
          <button 
            onClick={toggleCurrency}
            className="absolute top-4 right-4 p-2 text-secondary dark:text-secondary hover:opacity-80 transition-opacity z-20"
            title="Switch Currency"
          >
            <HiSwitchVertical size={24} />
          </button>

          {/* Bottom Right Icon: Hide/Show Balance */}
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="absolute bottom-4 right-4 p-2 text-secondary dark:text-secondary hover:opacity-80 transition-opacity z-20"
            title={showBalance ? "Hide Balance" : "Show Balance"}
          >
            {showBalance ? <BiHide size={24} /> : <BiShow size={24} />}
          </button>

          <div className="relative z-10">
            <p className="text-white/90 font-montserrat font-normal mb-1 uppercase tracking-widest text-[10px]">Total Balance ({currency})</p>
            <div className="flex items-baseline gap-1">
              <span 
                className={`text-4xl md:text-6xl font-rubik font-normal transition-all duration-300 ${!showBalance ? 'blur-md select-none' : ''}`}
              >
                {currentBalance.symbol} {currentBalance.amount}
              </span>
              <span className={`text-xl md:text-2xl text-white/90 font-rubik font-normal transition-all duration-300 ${!showBalance ? 'blur-md select-none' : ''}`}>
                {currentBalance.cents}
              </span>
            </div>
          </div>
          
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Right: Quick Actions Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-3 gap-2 md:gap-3 h-full"
        >
          <ActionButton 
            label="Deposit"
            onClick={() => navigate('fund')}
          />
          <ActionButton 
            label="Pay"
            onClick={() => navigate('pay')}
          />
          <ActionButton 
            label="Manage Escrow"
            onClick={() => navigate('escrow')}
            variant="maroon"
          />
          <ActionButton 
            label="Send"
            onClick={() => navigate('payments')}
          />
          <ActionButton 
            label="Withdraw"
            onClick={() => navigate('wallet')}
          />
          <ActionButton 
            label="Ticketing"
            onClick={() => navigate('events')}
            variant="maroon"
          />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-[32px] p-8 md:p-10 border-2 border-secondary/5 dark:border-white/5 shadow-2xl transition-colors"
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-montserrat font-medium text-secondary dark:text-primary">Recent History</h2>
          <button onClick={() => navigate('wallet')} className="text-primary font-montserrat font-normal text-sm hover:underline">View All History</button>
        </div>
        <div className="space-y-1">
          <TransactionItem title="Escrow Release: Brand Identity" date="Oct 24, 2024" amount="+ $1,200.00" type="positive" />
          <TransactionItem title="Workshop Ticket Sold" date="Oct 23, 2024" amount="+ $45.00" type="positive" />
          <TransactionItem title="Payout to Local Bank" date="Oct 22, 2024" amount="- $500.00" type="negative" />
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
