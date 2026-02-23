import React from 'react';
import { AppView } from '../types';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface FundingViewProps {
  navigate: (view: AppView) => void;
}

const FundingView: React.FC<FundingViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <header className="mb-6 md:mb-10 flex items-center">
        <button 
          onClick={() => navigate('home')} 
          className="hidden md:flex bg-white p-2 rounded-md shadow-sm hover:bg-secondary/10 transition-colors mr-4 shrink-0"
        >
            <IoMdArrowRoundBack size={20} className="text-secondary/80" />
        </button>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-1 md:mb-2">Funding Access Hub</h1>
          <p className="text-secondary/70 text-lg">Your trusted gateway to global creative opportunities.</p>
        </div>
      </header>

      <div className="mb-8 md:mb-12 flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {['All Opportunities', 'Grants', 'Residencies', 'Fellowships', 'Local Funds'].map((cat, i) => (
          <button 
            key={cat}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${i === 0 ? 'bg-primary text-white shadow-md' : 'bg-white text-secondary/70 border border-secondary/10 hover:border-secondary/20'}`}
          >   
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Global Digital Artist Fund 2024', provider: 'Adobe Foundation', category: 'Grant', amount: '$5,000', deadline: 'Nov 30', image: 'https://picsum.photos/seed/grant1/800/400' },
          { title: 'Paris Creative Residency', provider: 'Artis France', category: 'Residency', amount: 'Fully Funded', deadline: 'Jan 15', image: 'https://picsum.photos/seed/grant2/800/400' },
          { title: 'Emerging Filmmaker Fellowship', provider: 'Netflix Hub', category: 'Fellowship', amount: '$25,000', deadline: 'Dec 01', image: 'https://picsum.photos/seed/grant3/800/400' },
          { title: 'Local Mural Grant', provider: 'City Arts Council', category: 'Local Fund', amount: '$2,500', deadline: 'Ongoing', image: 'https://picsum.photos/seed/grant4/800/400' }
        ].map((opp, i) => (
          <div key={i} className="bg-white rounded-[32px] border border-secondary/10 shadow-sm overflow-hidden flex flex-col sm:flex-row cursor-pointer hover:shadow-lg transition-all duration-300">
            <div className="sm:w-1/3 relative h-48 sm:h-auto">
              <img src={opp.image} className="w-full h-full object-cover" alt={opp.title} />
              <div className="absolute inset-0 bg-primary/10"></div>
            </div>
            <div className="sm:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-secondary/10 text-secondary/70 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{opp.category}</span>
                  <span className="text-xs text-secondary/60 font-bold">Deadline: {opp.deadline}</span>
                </div>
                <h3 className="text-xl font-bold text-secondary mb-1 leading-tight">{opp.title}</h3>
                <p className="text-secondary/60 text-sm mb-4">By {opp.provider}</p>
              </div>
              <div className="flex items-center justify-between mt-4 border-t border-secondary/10 pt-4">
                <span className="text-2xl font-bold text-green-600">{opp.amount}</span>
                <button className="text-primary font-bold hover:underline">Apply Access</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundingView;
