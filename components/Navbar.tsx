import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  navigate: (view: AppView) => void;
  onExit: () => void;
}

const ExitIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ onExit }) => {
  return (
    <header className="hidden md:flex justify-between items-center p-4 bg-white/50 backdrop-blur-lg rounded-b-2xl shadow-md fixed top-0 left-0 right-0 z-40 max-w-7xl mx-auto">
      <div className="text-xl font-bold text-primary">Crezine</div>
      <button 
        onClick={onExit}
        className="flex items-center gap-2 bg-secondary/10 text-secondary font-bold px-4 py-2 rounded-lg hover:bg-secondary/20 transition-all"
      >
        <ExitIcon />
        <span>Logout</span>
      </button>
    </header>
  );
};

export default Navbar;
