import React from 'react';
import { AppView } from '../types';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface EscrowViewProps {
  navigate: (view: AppView) => void;
}

const EscrowView: React.FC<EscrowViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 font-montserrat">
      <header className="flex items-center mb-6 md:mb-8">
        <button 
          onClick={() => navigate('home')} 
          className="hidden md:flex bg-white p-2 rounded-md shadow-sm hover:bg-gray-100 transition-colors mr-4 shrink-0"
        >
          <IoMdArrowRoundBack size={20} className="text-secondary/80" />
        </button>
        <div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary">Creative Escrow</h1>
            <p className="text-lg md:text-xl text-secondary/70 leading-relaxed">
            Money is safely held by Crezine until you deliver the work. <br className="hidden md:block" />
            No more chasing clients, no more ghosting.
            </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-primary rounded-[32px] p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Protect Your Next Gig</h3>
          <p className="text-primary-light/80 mb-8 leading-relaxed">
            Create a secure payment link. Your client pays upfront, and we lock the funds. You start work knowing the money is there.
          </p>
          <button className="w-full py-4 bg-white text-primary rounded-2xl font-bold hover:bg-primary-light/20 transition-colors">
            Start a Safe Gig
          </button>
        </div>
        
        <div className="bg-white rounded-[32px] p-8 border border-secondary/10 shadow-sm">
          <h3 className="text-2xl font-bold text-secondary mb-4">How it works</h3>
          <ul className="space-y-4">
            <li className="flex gap-4 items-center">
              <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-xs font-bold text-secondary/70 shrink-0">1</div>
              <p className="text-sm text-secondary/80">You create the gig and set milestones.</p>
            </li>
            <li className="flex gap-4 items-center">
              <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-xs font-bold text-secondary/70 shrink-0">2</div>
              <p className="text-sm text-secondary/80">Client funds the escrow upfront.</p>
            </li>
            <li className="flex gap-4 items-center">
              <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center text-xs font-bold text-secondary/70 shrink-0">3</div>
              <p className="text-sm text-secondary/80">You do the work, they release the money.</p>
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-secondary mb-6">Active Gigs</h2>
      <div className="bg-white rounded-[32px] border border-secondary/10 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-secondary/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
            <h4 className="text-xl font-bold text-secondary">Logo & Brand Design</h4>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold border border-yellow-200 uppercase tracking-wider">Locked</span>
          </div>
          <p className="text-secondary/60 text-sm mb-6">Client: Nexus Media Inc.</p>
          <div className="w-full bg-secondary/10 h-2 rounded-full mb-8">
            <div className="bg-green-500 h-full w-1/2 rounded-full"></div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex gap-8">
              <div>
                <p className="text-xs text-secondary/60 uppercase font-bold tracking-widest mb-1">Total</p>
                <p className="font-bold text-secondary">$2,400.00</p>
              </div>
              <div>
                <p className="text-xs text-secondary/60 uppercase font-bold tracking-widest mb-1">Milestone 1</p>
                <p className="font-bold text-green-600">Released</p>
              </div>
            </div>
            <button className="bg-secondary text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-secondary/90 transition-colors whitespace-nowrap">
              Request Release
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EscrowView;
