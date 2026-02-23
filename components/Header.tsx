import React from 'react';
import { AppView } from '../types';
import BrandLogo from './BrandLogo';
import { RiLogoutCircleRLine } from 'react-icons/ri';

interface HeaderProps {
  navigate: (view: AppView) => void;
  activeView: AppView;
}

const Header: React.FC<HeaderProps> = ({ navigate, activeView }) => {
  const user = { name: 'Creative User' };

  const navLinks: { view: AppView; label: string }[] = [
    { view: 'home', label: 'Home' },
    { view: 'wallet', label: 'Wallet' },
    { view: 'pay', label: 'Pay' },
    { view: 'escrow', label: 'Escrow' },
    { view: 'events', label: 'Events' },
    { view: 'fund', label: 'Fund' },
  ];

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-white shadow-sm font-montserrat sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <BrandLogo onClick={() => navigate('home')} />
            </div>
            
            <nav className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => navigate(link.view)}
                  className={`text-sm font-bold transition-colors duration-300 ${
                    activeView === link.view
                      ? 'text-primary'
                      : 'text-secondary/70 hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-9 h-9 bg-primary rounded-full"></div>
                <span className="text-secondary font-semibold text-sm">{user.name}</span>
              </div>
              <button onClick={() => navigate('landing')} className="text-secondary/70 hover:text-primary transition-colors">
                <RiLogoutCircleRLine size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-sm font-montserrat sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <BrandLogo onClick={() => navigate('home')} />
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full cursor-pointer"></div>
              <button onClick={() => navigate('landing')} className="text-secondary/70 hover:text-primary transition-colors">
                <RiLogoutCircleRLine size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
