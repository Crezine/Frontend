import React from 'react';
import { AppView } from '../types';
import Footer from '../components/Footer';
import PublicHeader from '../components/PublicHeader';

const SupportView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="bg-[#F9F5F0] min-h-screen flex flex-col">
      <PublicHeader navigate={navigate} />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary font-century-gothic">Support Page</h1>
          <p className="text-secondary/80 font-century-gothic mt-4">Coming Soon</p>
        </div>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

export default SupportView;
