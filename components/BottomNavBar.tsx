import React from 'react';
import { AppView } from '../types';
import { 
  RiHome4Line, 
  RiHome4Fill, 
  RiWallet3Line, 
  RiWallet3Fill,
  RiExchangeDollarLine,
  RiExchangeDollarFill,
  RiCalendarEventLine,
  RiCalendarEventFill
} from 'react-icons/ri';

interface BottomNavBarProps {
  navigate: (view: AppView) => void;
  activeView: AppView;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ navigate, activeView }) => {
  const navItems = [
    { view: 'home' as AppView, label: 'Home', icon: RiHome4Line, activeIcon: RiHome4Fill },
    { view: 'wallet' as AppView, label: 'Wallet', icon: RiWallet3Line, activeIcon: RiWallet3Fill },
    { view: 'pay' as AppView, label: 'Pay', icon: RiExchangeDollarLine, activeIcon: RiExchangeDollarFill },
    { view: 'events' as AppView, label: 'Events', icon: RiCalendarEventLine, activeIcon: RiCalendarEventFill },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-secondary/10 dark:border-white/10 px-6 py-3 flex justify-between items-center z-50 transition-colors">
      {navItems.map((item) => {
        const isActive = activeView === item.view || (item.view === 'home' && activeView === 'dashboard');
        const Icon = isActive ? item.activeIcon : item.icon;
        
        return (
          <button
            key={item.view}
            onClick={() => navigate(item.view)}
            className="flex flex-col items-center gap-1 transition-all"
          >
            <div className={`p-1 rounded-lg transition-colors ${isActive ? 'text-secondary dark:text-primary' : 'text-secondary/40 dark:text-gray-500'}`}>
              <Icon size={24} />
            </div>
            <span className={`text-[10px] font-montserrat transition-colors ${isActive ? 'text-secondary dark:text-primary font-bold' : 'text-secondary/40 dark:text-gray-500'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
