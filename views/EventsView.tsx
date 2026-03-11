import React from 'react';
import { AppView } from '../types';

interface EventsViewProps {
  navigate: (view: AppView) => void;
}

const EventsView: React.FC<EventsViewProps> = ({ navigate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-montserrat">
      <header className="mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium text-secondary dark:text-primary mb-1 md:mb-2">Creative Events</h1>
              <p className="text-secondary/70 dark:text-gray-400 text-lg">Monetize your exhibitions, shows, and workshops.</p>
            </div>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 flex items-center gap-2 hover:bg-primary/90 transition-all text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Event
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Digital Art Workshop', date: 'Nov 12, 2024', price: 25, sold: 18, total: 30, image: 'digital-art' },
          { title: 'Soul Jazz Night', date: 'Dec 05, 2024', price: 45, sold: 42, total: 50, image: 'jazz' },
          { title: 'Photography Pop-up', date: 'Nov 28, 2024', price: 15, sold: 5, total: 20, image: 'photography' }
        ].map((event, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-[32px] border border-secondary/10 dark:border-white/10 shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
            <div className="h-40 relative">
               <img src={`https://picsum.photos/seed/${event.image}/600/400`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={event.title} />
               <div className="absolute inset-0 bg-primary/20"></div>
               <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/40">
                 Active
               </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-secondary dark:text-gray-200 mb-1">{event.title}</h3>
              <p className="text-secondary/60 dark:text-gray-400 text-sm mb-6">{event.date}</p>
              
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs text-secondary/60 dark:text-gray-400 uppercase font-bold tracking-widest mb-1">Tickets Sold</p>
                  <p className="text-2xl font-bold text-secondary dark:text-primary">{event.sold} / {event.total}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-secondary/60 dark:text-gray-400 uppercase font-bold tracking-widest mb-1">Price</p>
                  <p className="text-2xl font-bold text-primary">${event.price}</p>
                </div>
              </div>
              
              <div className="w-full bg-secondary/10 dark:bg-white/5 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ width: `${(event.sold / event.total) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsView;
