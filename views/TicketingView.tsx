import React, { useState, useEffect, useRef } from 'react';
import { AppView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Plus } from 'lucide-react';
import { eventService, Event } from '../src/services/eventService';

interface TicketingViewProps {
  navigate: (view: AppView) => void;
}

interface SalesStats {
  ticketsSold: number;
  revenue: number;
  remaining: number;
  pending: number;
  referrers: { label: string; percentage: number }[];
  locations: { label: string; percentage: number }[];
  countries: { label: string; percentage: number }[];
}

const TicketingView: React.FC<TicketingViewProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'revenue'>('tickets');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<SalesStats>({
    ticketsSold: 0,
    revenue: 0,
    remaining: 0,
    pending: 0,
    referrers: [],
    locations: [],
    countries: []
  });
  
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('ENGLISH');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [salesStart, setSalesStart] = useState('publish');
  const [salesEnd, setSalesEnd] = useState('soldout');

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      setIsLoading(true);
      const events = await eventService.getMyEvents();
      setMyEvents(events);
      
      let totalTickets = 0;
      let totalRevenue = 0;
      let totalRemaining = 0;
      let totalPending = 0;
      
      // Mocked analytics for now since backend might not have full analytics yet
      // In a real scenario, this would come from a dedicated summary endpoint
      for (const event of events) {
        try {
          const sales = await eventService.getEventSales(event.id);
          totalTickets += sales.totalTickets || 0;
          totalRevenue += (sales.totalRevenue || 0) / 100;
          totalRemaining += sales.remainingTickets || 0;
          totalPending += (sales.pendingRevenue || 0) / 100;
        } catch (e) {
          console.error(`Failed to fetch sales for event ${event.id}`, e);
        }
      }
      
      setStats({
        ticketsSold: totalTickets,
        revenue: totalRevenue,
        remaining: totalRemaining,
        pending: totalPending,
        referrers: [], // Backend needs to provide this
        locations: [], // Backend needs to provide this
        countries: []  // Backend needs to provide this
      });

    } catch (error) {
      console.error("Failed to fetch my events", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

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

  const handlePublish = async () => {
    if (!name || !date || !location) {
      alert("Please fill in required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const eventDate = new Date(`${date}T${startTime || '00:00'}:00`).toISOString();
      
      await eventService.createEvent({
        title: name,
        description,
        eventDate,
        location
      });

      setIsModalOpen(false);
      fetchMyEvents();
      alert("Event created successfully!");
    } catch (error) {
      console.error("Failed to create event", error);
      alert("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const StatColumn = ({ title, items }: { title: string; items: { label: string; percentage: number }[] }) => (
    <div className="space-y-6">
      <h3 className="text-secondary font-medium uppercase text-sm tracking-widest mb-6 font-montserrat">
        {title}
      </h3>
      <div className="space-y-4 font-rubik font-light text-black dark:text-gray-300 text-sm tracking-wide">
        {items.length === 0 ? (
          <p className="text-black dark:text-white font-montserrat font-medium italic">No data yet</p>
        ) : (
          items.map((item, idx) => (
            <p key={idx}>{item.percentage}% {item.label}</p>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-12 font-montserrat">
      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        /* Dark mode calendar/time icons */
        .dark input[type="date"]::-webkit-calendar-picker-indicator,
        .dark input[type="time"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }

        /* Custom Checkbox */
        .custom-checkbox {
          appearance: none;
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border: 1.5px solid #AB3625;
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .custom-checkbox:checked {
          background-color: #AB3625;
        }

        .custom-checkbox:checked::after {
          content: "";
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
        }
      `}} />
      
      {/* Top Header Section */}
      <div className="flex flex-col items-center mb-32">
        <div className="flex justify-center gap-24 md:gap-40 mb-2">
          <h2 className="text-sm font-normal text-black dark:text-white uppercase tracking-[0.2em] font-rubik w-48 md:w-64 text-center">
            TICKETS
          </h2>
          <h2 className="text-sm font-normal text-black dark:text-white uppercase tracking-[0.2em] font-rubik w-48 md:w-64 text-center">
            REVENUE TURNOVER
          </h2>
        </div>

        <div className="flex justify-center items-baseline gap-24 md:gap-40 mb-1">
          <div className="text-4xl md:text-5xl font-normal text-secondary font-rubik leading-none w-48 md:w-64 text-center">
            {isLoading ? '...' : stats.ticketsSold}
          </div>
          <div className="text-4xl md:text-5xl font-normal text-secondary font-rubik leading-none w-48 md:w-64 text-center">
            {isLoading ? '...' : `$${stats.revenue.toLocaleString()}`}
          </div>
        </div>

        <div className="flex justify-center gap-24 md:gap-40">
          <div className="text-sm font-light text-black dark:text-gray-300 font-rubik tracking-wide w-48 md:w-64 text-center">
            {isLoading ? '...' : `${stats.remaining} Remaining`}
          </div>
          <div className="text-sm font-light text-black dark:text-gray-300 font-rubik tracking-wide w-48 md:w-64 text-center">
            {isLoading ? '...' : `$ ${stats.pending.toLocaleString()} pending`}
          </div>
        </div>
      </div>

      {/* Ovular Tab Switcher */}
      <div className="flex justify-center mb-12">
        <div className="flex bg-primary/10 dark:bg-gray-800 p-1 rounded-full border border-secondary/5 w-fit min-w-[320px]">
          <button
            onClick={() => setActiveTab('tickets')}
            className={`flex-1 px-8 py-3 rounded-l-full text-xs font-normal uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'tickets'
                ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                : 'bg-primary text-black hover:opacity-90'
            }`}
          >
            TICKETS
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`flex-1 px-8 py-3 rounded-r-full text-xs font-normal uppercase tracking-widest transition-all duration-300 ${
              activeTab === 'revenue'
                ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                : 'bg-primary text-black hover:opacity-90'
            }`}
          >
            REVENUE
          </button>
        </div>
      </div>
      {/* Maroon Thin Line */}
      <div className="w-full h-px bg-secondary/30 mb-12"></div>

      {/* 3 Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
        <StatColumn title="TOP REFERRERS" items={stats.referrers} />
        <StatColumn title="TOP LOCATIONS" items={stats.locations} />
        <StatColumn title="TOP COUNTRIES" items={stats.countries} />
      </div>

      {/* Bottom Create Event Button */}
      <div className="flex justify-center mt-12 pb-12">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-white px-20 py-4 rounded-full text-sm font-normal tracking-[0.1em] shadow-lg shadow-secondary/20 hover:opacity-90 transition-all transform active:scale-95"
        >
          Create an event
        </button>
      </div>

      {/* Modal Popup */}
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
                                  className="w-full text-left px-4 py-2.5 text-[11px] font-rubik hover:bg-primary/10 transition-colors text-white"
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
                                  className="w-full text-left px-4 py-2.5 text-[11px] font-rubik hover:bg-primary/10 transition-colors text-white"
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
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Name *</label>
                    <input 
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent text-black dark:text-white"
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Description (Optional)</label>
                    <textarea 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 h-16 outline-none text-[13px] font-rubik bg-transparent resize-none text-black dark:text-white"
                    />
                  </div>

                  {/* Date & Location */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Date *</label>
                      <input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent dark:[color-scheme:dark] text-black dark:text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Location *</label>
                      <input 
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent text-black dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Starting Time & Ending Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Starting Time *</label>
                      <input 
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent dark:[color-scheme:dark] text-black dark:text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Ending Time *</label>
                      <input 
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent dark:[color-scheme:dark] text-black dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Bottom Publish Button */}
                  <div className="flex justify-center pt-8 pb-4">
                    <button 
                      onClick={handlePublish}
                      disabled={isSubmitting}
                      className="bg-secondary text-white px-16 py-3 rounded-full text-xs font-normal tracking-[0.1em] shadow-lg shadow-secondary/20 hover:opacity-90 transition-all transform active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Publishing...' : 'Publish Event'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TicketingView;
