import React, { useRef } from 'react';
import { AppView } from '../types';

// Icon components
const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-all duration-300 ${isActive ? 'text-primary' : 'text-secondary/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
);

const WalletIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-all duration-300 ${isActive ? 'text-primary' : 'text-secondary/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const ActivityIcon = ({ isActive }: { isActive: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-all duration-300 ${isActive ? 'text-primary' : 'text-secondary/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
);

const FundIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-all duration-300 ${isActive ? 'text-primary' : 'text-secondary/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
);

interface BottomNavBarProps {
  activeView: AppView;
  navigate: (view: AppView) => void;
}

const navItems = [
  { view: AppView.DASHBOARD, icon: HomeIcon, label: 'Home' },
  { view: AppView.WALLET, icon: WalletIcon, label: 'Wallet' },
  { view: AppView.PAYMENTS, icon: ActivityIcon, label: 'Payments' },
  { view: AppView.FUNDING, icon: FundIcon, label: 'Funding' },
];

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, navigate }) => {
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 h-20 bg-white/70 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-secondary/20 z-50 border border-white/50">
      <div className="flex justify-around items-center h-full relative">
        {navItems.map((item, index) => {
            const isActive = activeView === item.view;
            return (
                <button 
                    key={item.view}
                    ref={el => itemsRef.current[index] = el}
                    onClick={() => navigate(item.view)}
                    className="relative z-10 flex flex-col items-center justify-center h-full w-20 transition-transform duration-200 active:scale-90"
                >
                    <item.icon isActive={isActive} />
                    <span className={`text-[10px] font-bold mt-1 transition-all duration-300 ${isActive ? 'text-primary' : 'text-secondary/50'}`}>
                        {item.label}
                    </span>
                </button>
            )
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
