import React from 'react';
import { AppView, UserData } from '../types';
import { RiUserFill, RiSunLine, RiMoonLine } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';

interface HeaderProps {
  navigate: (view: AppView) => void;
  activeView: AppView;
  userData: UserData | null;
  onMenuToggle: () => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ navigate, activeView, userData, onMenuToggle, isDarkMode, onThemeToggle }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-secondary/10 dark:border-white/10 font-montserrat sticky top-0 z-50 px-4 sm:px-6 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-20">
        
        {/* Left: User Icon in Maroon Circle - Navigates to Profile */}
        <div 
          className="w-10 h-10 sm:w-11 sm:h-11 border-2 border-secondary dark:border-primary rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary/5 dark:hover:bg-primary/5 transition-all shadow-sm group active:scale-95"
          onClick={() => navigate('profile')}
          title="Creative Profile"
        >
          <RiUserFill size={22} className="text-secondary dark:text-primary group-hover:scale-110 transition-transform" />
        </div>

        {/* Right: Theme Toggler & Hamburger */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={onThemeToggle}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-secondary dark:text-primary active:scale-90"
            title="Toggle Theme"
          >
            {isDarkMode ? (
              <RiSunLine size={24} />
            ) : (
              <RiMoonLine size={24} />
            )}
          </button>

          <button 
            onClick={onMenuToggle}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-secondary dark:text-primary active:scale-90"
          >
            <RxHamburgerMenu size={28} className="font-bold" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
