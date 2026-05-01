import React, { useState, useEffect, useRef } from 'react';
import { AppView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ChevronDown } from 'lucide-react';

interface EventsViewProps {
  navigate: (view: AppView) => void;
}

interface EventData {
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  sold: number;
  total: number;
  image: string;
  description?: string;
}

const EventsView: React.FC<EventsViewProps> = ({ navigate }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [ticketCounts, setTicketCounts] = useState({ early: 1, regular: 0, vip: 0 });
  const [showDescription, setShowDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('ENGLISH');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const [salesStart, setSalesStart] = useState('publish');
  const [salesEnd, setSalesEnd] = useState('soldout');

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedEvent || isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedEvent, isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currencies = ['USD', 'EUR', 'GBP', 'KES', 'ZAR'];
  const languages = ['ENGLISH', 'FRENCH', 'SPANISH', 'SWAHILI'];

  const events: EventData[] = [
    { 
      title: 'Creative power plug 2026', 
      date: 'Thursday 30, July 2026', 
      time: '3:00pm - 7:00pm',
      location: 'Kileleshwa',
      price: 250, 
      sold: 18, 
      total: 30, 
      image: '/event_demo.png',
      description: 'The premier gathering for creative minds to connect, collaborate, and power up their creative journey in 2026.'
    },
    { 
      title: 'Soul Jazz Night', 
      date: 'Dec 05, 2024', 
      time: '7:00pm - 11:00pm',
      location: 'Westlands',
      price: 45, 
      sold: 42, 
      total: 50, 
      image: 'jazz' 
    },
    { 
      title: 'Photography Pop-up', 
      date: 'Nov 28, 2024', 
      time: '10:00am - 6:00pm',
      location: 'Karen',
      price: 15, 
      sold: 5, 
      total: 20, 
      image: 'photography' 
    }
  ];

  const handleIncrement = (type: 'early' | 'regular' | 'vip') => {
    setTicketCounts(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type: 'early' | 'regular' | 'vip') => {
    setTicketCounts(prev => ({ ...prev, [type]: Math.max(0, prev[type] - 1) }));
  };

  const calculateTotal = () => {
    if (!selectedEvent) return 0;
    const basePrice = selectedEvent.price;
    return (ticketCounts.early * basePrice) + (ticketCounts.regular * basePrice * 1.5) + (ticketCounts.vip * basePrice * 3);
  };

  const handleGetTicket = () => {
    localStorage.setItem('crezine_checkout_total', calculateTotal().toString());
    navigate('ticket-checkout' as any);
  };

  const handlePublish = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-montserrat relative">
      <header className="mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-medium text-secondary dark:text-primary mb-1 md:mb-2">Creative Events</h1>
              <p className="text-black dark:text-white text-lg font-normal font-montserrat">Monetize your exhibitions, shows, and workshops.</p>
            </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-white px-8 py-2.5 rounded-full font-medium font-montserrat shadow-lg shadow-secondary/20 flex items-center gap-2 hover:bg-secondary/90 transition-all text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Event
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, i) => (
          <div 
            key={i} 
            onClick={() => {
              setSelectedEvent(event);
              setTicketCounts({ early: 1, regular: 0, vip: 0 });
              setShowDescription(false);
            }}
            className="bg-white dark:bg-gray-800 rounded-[32px] border border-secondary/10 dark:border-white/10 shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
          >
            <div className="h-40 relative">
               <img 
                 src={event.image.startsWith('/') ? event.image : `https://picsum.photos/seed/${event.image}/600/400`} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                 alt={event.title} 
               />
               <div className="absolute inset-0 bg-primary/20"></div>
               <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/40">
                 Active
               </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-normal text-black dark:text-white mb-1 font-rubik">{event.title}</h3>
              <p className="text-black dark:text-gray-300 text-sm mb-6 font-normal font-montserrat">{event.date}</p>
              
              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-xs text-black dark:text-gray-400 font-normal mb-1 font-rubik">Tickets Sold</p>
                  <p className="text-2xl font-normal text-black dark:text-white font-rubik">{event.sold} / {event.total}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-black dark:text-gray-400 font-normal mb-1 font-rubik">Price</p>
                  <p className="text-2xl font-normal text-black dark:text-white font-rubik">${event.price}</p>
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

      {/* Get Ticket Popup */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEvent(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Top Image (1/3) */}
              <div className="h-48 md:h-56 relative overflow-hidden">
                <img 
                  src={selectedEvent.image.startsWith('/') ? selectedEvent.image : `https://picsum.photos/seed/${selectedEvent.image}/600/400`} 
                  className="w-full h-full object-cover"
                  alt={selectedEvent.title}
                />
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-secondary p-1.5 rounded-full hover:bg-white/40 transition-all z-10"
                >
                  <X size={28} strokeWidth={3} />
                </motion.button>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-medium text-black dark:text-white mb-2 font-montserrat">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-sm font-normal text-black dark:text-white font-montserrat">
                        Date: <span className="text-secondary">{selectedEvent.date}</span>
                      </p>
                      <p className="text-sm font-normal text-black dark:text-white font-montserrat">
                        Time: <span className="text-secondary">{selectedEvent.time}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-normal text-black dark:text-white font-montserrat">
                        Location: <span className="text-secondary">{selectedEvent.location}</span>
                      </p>
                      <div className="flex justify-end mt-2">
                        <button 
                          onClick={() => setShowDescription(!showDescription)}
                          className="bg-white dark:bg-gray-800 border border-black dark:border-white text-primary px-6 py-2 rounded-xl text-xs font-normal hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-montserrat"
                        >
                          Show description
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-black dark:bg-white w-full mt-4" />
                </div>

                {showDescription && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-black dark:text-gray-300 font-normal leading-relaxed font-montserrat text-center"
                  >
                    {selectedEvent.description || 'No description available for this event.'}
                  </motion.p>
                )}

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-secondary font-montserrat">
                    Tickets
                  </h4>
                  <div className="h-px bg-black dark:bg-white w-full" />

                  {/* Ticket Options */}
                  <div className="space-y-6 py-2">
                    {/* Early Bird */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-normal text-black dark:text-white font-montserrat">Early Bird</span>
                      <div className="flex items-center border border-black dark:border-white rounded-lg h-10 px-2 gap-4">
                        <button onClick={() => handleDecrement('early')} className="text-black dark:text-white hover:opacity-70"><Minus size={16} /></button>
                        <span className="text-sm font-normal w-4 text-center text-black dark:text-white">{ticketCounts.early}</span>
                        <button onClick={() => handleIncrement('early')} className="text-black dark:text-white hover:opacity-70"><Plus size={16} /></button>
                      </div>
                    </div>

                    {/* Regular ticket */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-normal text-black dark:text-white font-montserrat">Regular ticket</span>
                      <div className="flex items-center border border-black dark:border-white rounded-lg h-10 px-2 gap-4">
                        <button onClick={() => handleDecrement('regular')} className="text-black dark:text-white hover:opacity-70"><Minus size={16} /></button>
                        <span className="text-sm font-normal w-4 text-center text-black dark:text-white">{ticketCounts.regular}</span>
                        <button onClick={() => handleIncrement('regular')} className="text-black dark:text-white hover:opacity-70"><Plus size={16} /></button>
                      </div>
                    </div>

                    {/* VIP */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-normal text-black dark:text-white font-montserrat">VIP</span>
                      <div className="flex items-center border border-black dark:border-white rounded-lg h-10 px-2 gap-4">
                        <button onClick={() => handleDecrement('vip')} className="text-black dark:text-white hover:opacity-70"><Minus size={16} /></button>
                        <span className="text-sm font-normal w-4 text-center text-black dark:text-white">{ticketCounts.vip}</span>
                        <button onClick={() => handleIncrement('vip')} className="text-black dark:text-white hover:opacity-70"><Plus size={16} /></button>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-black dark:bg-white w-full" />
                  
                  <div className="flex justify-end pt-2">
                    <p className="text-lg font-bold text-black dark:text-white font-montserrat">
                      Total $ {calculateTotal().toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center pt-1 pb-2">
                  <button 
                    onClick={handleGetTicket}
                    className="bg-secondary text-white w-full py-3 rounded-full text-sm font-normal hover:opacity-90 transition-all transform active:scale-95 shadow-lg shadow-secondary/20 font-montserrat"
                  >
                    Get ticket
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-800">
                {/* Modal Header */}
                <div className="flex justify-between items-center">
                  <h2 className="text-base font-normal text-black dark:text-white font-rubik">
                    Event details
                  </h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-primary rounded-lg px-4 py-2 shadow-sm">
                      {/* Currency Dropdown */}
                      <div className="relative" ref={currencyRef}>
                        <button 
                          onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                          className="flex items-center gap-2 text-white px-2 py-1 text-[11px] font-medium font-rubik hover:opacity-80 transition-all"
                        >
                          {currency} <ChevronDown size={14} />
                        </button>
                        <AnimatePresence>
                          {showCurrencyDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 mt-2 w-28 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-10"
                            >
                              {currencies.map((curr) => (
                                <button
                                  key={curr}
                                  onClick={() => {
                                    setCurrency(curr);
                                    setShowCurrencyDropdown(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-[11px] font-rubik hover:bg-primary/10 transition-colors"
                                >
                                  {curr}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="w-px h-5 bg-white/30 mx-1" />

                      {/* Language Dropdown */}
                      <div className="relative" ref={languageRef}>
                        <button 
                          onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                          className="flex items-center gap-2 text-white px-2 py-1 text-[11px] font-medium font-rubik hover:opacity-80 transition-all"
                        >
                          {language} <ChevronDown size={14} />
                        </button>
                        <AnimatePresence>
                          {showLanguageDropdown && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 py-1 z-10"
                            >
                              {languages.map((lang) => (
                                <button
                                  key={lang}
                                  onClick={() => {
                                    setLanguage(lang);
                                    setShowLanguageDropdown(false);
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-[11px] font-rubik hover:bg-primary/10 transition-colors"
                                >
                                  {lang}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsModalOpen(false)}
                      className="text-secondary hover:text-secondary/80 transition-colors p-1.5"
                    >
                      <X size={28} strokeWidth={3} />
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-6">
                {/* Modal Body - Form Fields */}
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Name *</label>
                    <input 
                      type="text"
                      className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Description (Optional)</label>
                    <textarea 
                      className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 h-16 outline-none text-[13px] font-rubik bg-transparent resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Poster (optional)</label>
                    <div className="w-full border border-black/40 dark:border-white/40 rounded-lg h-16 flex items-center justify-center border-dashed cursor-pointer">
                      <span className="text-[10px] text-gray-400 font-rubik">Click or drag to upload poster</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Date *</label>
                      <input 
                        type="date"
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent dark:[color-scheme:dark]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Location *</label>
                      <input 
                        type="text"
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Starting Time *</label>
                      <input 
                        type="time"
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent dark:[color-scheme:dark]"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Ending Time *</label>
                      <input 
                        type="time"
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent dark:[color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="w-full h-px bg-black/10 dark:bg-white my-6"></div>

                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <h3 className="font-rubik text-xs font-normal text-black dark:text-white uppercase">
                        TICKET SALES STARTS
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className="w-4 h-4 border border-secondary rounded-full flex items-center justify-center">
                            {salesStart === 'publish' && <div className="w-2 h-2 bg-secondary rounded-full" />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={salesStart === 'publish'}
                            onChange={() => setSalesStart(salesStart === 'publish' ? '' : 'publish')}
                          />
                          <span className="font-montserrat font-normal text-[12px] text-secondary group-hover:opacity-80 transition-opacity">
                            When i publish event
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-rubik text-xs font-normal text-black dark:text-white uppercase">
                        TICKET SALES END
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <div className="w-4 h-4 border border-secondary rounded-full flex items-center justify-center">
                            {salesEnd === 'soldout' && <div className="w-2 h-2 bg-secondary rounded-full" />}
                          </div>
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={salesEnd === 'soldout'}
                            onChange={() => setSalesEnd(salesEnd === 'soldout' ? '' : 'soldout')}
                          />
                          <span className="font-montserrat font-normal text-[12px] text-secondary group-hover:opacity-80 transition-opacity">
                            When tickets sold out
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center pt-8 pb-4">
                    <button 
                      onClick={handlePublish}
                      className="bg-secondary text-white px-16 py-3 rounded-full text-xs font-normal tracking-[0.1em] shadow-lg shadow-secondary/20 hover:opacity-90 transition-all transform active:scale-95"
                    >
                      Publish Event
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .dark input[type="date"]::-webkit-calendar-picker-indicator,
        .dark input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}} />
    </div>
  );
};

export default EventsView;
