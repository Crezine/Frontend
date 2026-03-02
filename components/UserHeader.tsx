import React from 'react';
import { AppView } from '../types';
import BrandLogo from './BrandLogo';

const UserHeader: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  // This is a placeholder for a real user session
  const user = { name: 'Creative User', avatar: '' };

  return (
    <header className="bg-white shadow-sm font-montserrat">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer">
            <BrandLogo onClick={() => navigate('landing')} />
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('wallet')} className="text-secondary hover:text-primary transition-colors font-semibold text-sm">
              Wallet
            </button>
            <button onClick={() => navigate('support')} className="text-secondary hover:text-primary transition-colors font-semibold text-sm">
              Support
            </button>
            <button className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <span className="text-secondary font-semibold text-sm">{user.name}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
