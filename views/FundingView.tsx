import React from 'react';
import { AppView } from '../types';

interface FundingViewProps {
  navigate: (view: AppView) => void;
}

const FundingView: React.FC<FundingViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 font-montserrat transition-colors">
      <header className="mb-10 md:mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-normal font-rubik text-secondary dark:text-primary leading-tight mb-2">Creative grants</h1>
        <p className="text-black dark:text-white font-normal text-sm md:text-base">Your trusted gateway to global creative opportunities</p>
      </header>

      <div className="mb-10 md:mb-14 flex gap-3 overflow-x-auto pb-4 no-scrollbar justify-center">
        {['All Opportunities', 'Grants', 'Residencies', 'Fellowships', 'Local Funds'].map((cat, i) => (
          <button 
            key={cat}
            className={`px-5 py-2.5 rounded-full text-xs font-normal whitespace-nowrap transition-all ${i === 0 ? 'bg-secondary text-white shadow-md' : 'bg-pink-100 text-black border border-black/5 hover:bg-pink-200'}`}
          >   
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: 'Global Digital Artist Fund 2024', provider: 'Adobe Foundation', category: 'Grant', amount: '$5,000', deadline: 'Nov 30', image: 'https://picsum.photos/seed/grant1/800/400' },
          { title: 'Paris Creative Residency', provider: 'Artis France', category: 'Residency', amount: 'Fully Funded', deadline: 'Jan 15', image: 'https://picsum.photos/seed/grant2/800/400' },
          { title: 'Emerging Filmmaker Fellowship', provider: 'Netflix Hub', category: 'Fellowship', amount: '$25,000', deadline: 'Dec 01', image: 'https://picsum.photos/seed/grant3/800/400' },
          { title: 'Local Mural Grant', provider: 'City Arts Council', category: 'Local Fund', amount: '$2,500', deadline: 'Ongoing', image: 'https://picsum.photos/seed/grant4/800/400' }
        ].map((opp, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-[2rem] border border-secondary/20 dark:border-white/10 shadow-sm overflow-hidden flex flex-col sm:flex-row cursor-pointer hover:shadow-md transition-all group">
            <div className="sm:w-1/3 relative h-48 sm:h-auto">
              <img src={opp.image} className="w-full h-full object-cover" alt={opp.title} />
              <div className="absolute inset-0 bg-secondary/5"></div>
            </div>
            <div className="sm:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-pink-50 dark:bg-pink-900/20 text-[#AB3625] dark:text-pink-300 px-3 py-1 rounded-full text-[10px] font-normal uppercase tracking-wider border border-[#AB3625]/10">{opp.category}</span>
                  <span className="text-[10px] text-black/60 dark:text-gray-400 font-normal">Deadline: {opp.deadline}</span>
                </div>
                <h3 className="text-lg font-normal text-black dark:text-gray-200 mb-1 leading-tight group-hover:text-secondary transition-colors">{opp.title}</h3>
                <p className="text-black/40 dark:text-gray-400 text-xs mb-4">By {opp.provider}</p>
              </div>
              <div className="flex items-center justify-between mt-4 border-t border-black/5 dark:border-white/5 pt-4">
                <span className="text-xl font-normal text-black dark:text-primary font-rubik">{opp.amount}</span>
                <button className="text-secondary dark:text-primary font-normal text-sm hover:underline">Apply access</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundingView;
