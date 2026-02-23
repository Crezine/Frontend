import React from 'react';
import { AppView } from '../types';
import { RiHome3Line, RiWallet3Line, RiArrowLeftRightLine, RiShieldCheckLine, RiCalendarEventLine, RiFundsLine } from 'react-icons/ri';

interface BottomNavBarProps {
  navigate: (view: AppView) => void;
  activeView: AppView;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ navigate, activeView }) => {
  const navLinks: { view: AppView; label: string; icon: JSX.Element }[] = [
    { view: 'home', label: 'Home', icon: <RiHome3Line size={24} /> },
    { view: 'wallet', label: 'Wallet', icon: <RiWallet3Line size={24} /> },
    { view: 'pay', label: 'Pay', icon: <RiArrowLeftRightLine size={24} /> },
    { view: 'escrow', label: 'Escrow', icon: <RiShieldCheckLine size={24} /> },
    { view: 'events', label: 'Events', icon: <RiCalendarEventLine size={24} /> },
    { view: 'fund', label: 'Fund', icon: <RiFundsLine size={24} /> },
  ];

  return (
    <div className="md:hidden fixed bottom-4 inset-x-4 bg-white/70 backdrop-blur-lg shadow-lg z-50 rounded-full border border-gray-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="flex justify-around items-center h-16">
          {navLinks.map((link) => (
            <button
              key={link.view}
              onClick={() => navigate(link.view)}
              className={`flex flex-col items-center justify-center w-full transition-colors duration-300 ${
                activeView === link.view
                  ? 'text-primary'
                  : 'text-secondary/60 hover:text-primary'
              }`}
            >
              {link.icon}
              <span className="text-xs font-bold mt-1">{link.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomNavBar;
