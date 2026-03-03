import React from 'react';
import { AppView } from '../types';

interface FundingViewProps {
  navigate: (view: AppView) => void;
}

const FundingView: React.FC<FundingViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12">
      <header className="mb-8 md:mb-12 flex items-center gap-4 md:gap-6">
        <button 
          onClick={() => navigate('dashboard')}
          className="bg-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-sm text-secondary hover:text-primary hover:scale-110 transition-all border border-secondary/5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl md:text-4xl font-bold text-[#AB3625] mb-1 md:mb-2 font-century-gothic leading-tight">Funding Access</h1>
          <p className="text-[#AB3625]/80 text-xs md:text-base font-medium">Your trusted gateway to global creative opportunities.</p>
        </div>
      </header>

      <div className="mb-8 md:mb-12 flex gap-3 md:gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
        {['All Opportunities', 'Grants', 'Residencies', 'Fellowships', 'Local Funds'].map((cat, i) => (
          <button 
            key={cat}
            className={`px-5 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold whitespace-nowrap transition-all font-montserrat ${i === 0 ? 'bg-[#F69C31] text-white shadow-md' : 'bg-white text-[#AB3625] border border-secondary/10 hover:border-[#F69C31]/50'}`}
          >   
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {[
          { title: 'Global Digital Artist Fund 2024', provider: 'Adobe Foundation', category: 'Grant', amount: '$5,000', deadline: 'Nov 30', image: 'https://picsum.photos/seed/grant1/800/400' },
          { title: 'Paris Creative Residency', provider: 'Artis France', category: 'Residency', amount: 'Fully Funded', deadline: 'Jan 15', image: 'https://picsum.photos/seed/grant2/800/400' },
          { title: 'Emerging Filmmaker Fellowship', provider: 'Netflix Hub', category: 'Fellowship', amount: '$25,000', deadline: 'Dec 01', image: 'https://picsum.photos/seed/grant3/800/400' },
          { title: 'Local Mural Grant', provider: 'City Arts Council', category: 'Local Fund', amount: '$2,500', deadline: 'Ongoing', image: 'https://picsum.photos/seed/grant4/800/400' }
        ].map((opp, i) => (
          <div key={i} className="bg-white rounded-[32px] md:rounded-[40px] border-2 border-transparent hover:border-[#F69C31]/40 shadow-lg shadow-secondary/5 hover:shadow-secondary/10 overflow-hidden flex flex-col sm:flex-row cursor-pointer transition-all group active:scale-[0.99]">
            <div className="sm:w-1/3 h-40 sm:h-auto relative">
              <img src={opp.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="sm:w-2/3 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="bg-[#AB3625]/10 text-[#AB3625] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{opp.category}</span>
                  <span className="text-[10px] text-[#AB3625]/80 font-bold">Deadline: {opp.deadline}</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#AB3625] mb-1 md:mb-2 leading-tight font-century-gothic group-hover:text-primary transition-colors">{opp.title}</h3>
                <p className="text-[#AB3625]/70 text-xs md:text-sm mb-4">By {opp.provider}</p>
              </div>
              <div className="flex items-center justify-between mt-4 md:mt-6 border-t border-[#AB3625]/10 pt-4 md:pt-6">
                <span className="text-xl md:text-2xl font-bold text-[#F69C31]">{opp.amount}</span>
                <button className="text-primary font-bold hover:underline font-montserrat text-sm md:text-base">Apply Access</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundingView;
