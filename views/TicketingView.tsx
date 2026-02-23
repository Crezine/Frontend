import React from 'react';
import { AppView } from '../types';

interface TicketingViewProps {
  navigate: (view: AppView) => void;
}

const TicketingView: React.FC<TicketingViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12">
      <header className="mb-8 md:mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(AppView.DASHBOARD)}
            className="bg-white p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-sm text-secondary hover:text-primary hover:scale-110 transition-all border border-secondary/5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-[#AB3625] mb-1 md:mb-2 font-century-gothic">Creative Events</h1>
            <p className="text-[#AB3625] text-xs md:text-base">Monetize your exhibitions, shows, and workshops.</p>
          </div>
        </div>
        <button className="hidden md:flex bg-[#F69C31] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold shadow-lg shadow-[#E9E0D8] items-center justify-center gap-2 hover:bg-[#AB3625] transition-all font-montserrat text-sm md:text-base">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Event
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {[
          { title: 'Digital Art Workshop', date: 'Nov 12, 2024', price: 25, sold: 18, total: 30, color: 'bg-[#F69C31]' },
          { title: 'Soul Jazz Night', date: 'Dec 05, 2024', price: 45, sold: 42, total: 50, color: 'bg-emerald-500' },
          { title: 'Photography Pop-up', date: 'Nov 28, 2024', price: 15, sold: 5, total: 20, color: 'bg-amber-500' }
        ].map((event, i) => (
          <div key={i} className="bg-[#E9E0D8] rounded-[24px] md:rounded-[32px] border border-[#E9E0D8] shadow-sm overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
            <div className={`h-32 md:h-40 ${event.color} relative overflow-hidden`}>
               <img src={`https://picsum.photos/seed/${event.title}/600/400`} className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-105 transition-transform duration-700" alt="" />
               <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/20 backdrop-blur-md text-white px-2.5 md:px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/30">
                 Active
               </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold text-[#AB3625] mb-1 font-century-gothic truncate">{event.title}</h3>
              <p className="text-[#AB3625] text-xs md:text-sm mb-4 md:mb-6">{event.date}</p>
              
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-[10px] text-[#AB3625] uppercase font-bold tracking-widest mb-1">Sold</p>
                  <p className="text-xl md:text-2xl font-bold text-[#AB3625]">{event.sold} / {event.total}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#AB3625] uppercase font-bold tracking-widest mb-1">Price</p>
                  <p className="text-xl md:text-2xl font-bold text-[#F69C31]">${event.price}</p>
                </div>
              </div>
              
              <div className="w-full bg-white/30 h-1.5 md:h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${event.color}`} 
                  style={{ width: `${(event.sold / event.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
       <button className="md:hidden fixed bottom-24 right-4 bg-[#F69C31] text-white p-4 rounded-full font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-[#AB3625] transition-all font-montserrat text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
      </button>
    </div>
  );
};

export default TicketingView;
