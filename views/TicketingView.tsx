import React, { useState, useEffect, useRef } from 'react';
import { AppView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';

interface TicketingViewProps {
  navigate: (view: AppView) => void;
}

const TicketingView: React.FC<TicketingViewProps> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'revenue'>('tickets');
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

  const handlePublish = () => {
    // Logic for publishing event would go here
    setIsModalOpen(false);
  };

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
            114
          </div>
          <div className="text-4xl md:text-5xl font-normal text-secondary font-rubik leading-none w-48 md:w-64 text-center">
            $5,094
          </div>
        </div>

        <div className="flex justify-center gap-24 md:gap-40">
          <div className="text-sm font-light text-black dark:text-gray-300 font-rubik tracking-wide w-48 md:w-64 text-center">
            8 Remaining
          </div>
          <div className="text-sm font-light text-black dark:text-gray-300 font-rubik tracking-wide w-48 md:w-64 text-center">
            $ 2116.00 pending
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
        {/* Column 1 */}
        <div className="space-y-6">
          <h3 className="text-secondary font-medium uppercase text-sm tracking-widest mb-6 font-montserrat">
            TOP REFERRERS
          </h3>
          <div className="space-y-4 font-rubik font-light text-black dark:text-gray-300 text-sm tracking-wide">
            <p>9% Facebook</p>
            <p>12% Instagram</p>
            <p>23% Linked In</p>
            <p>64% Tiktok</p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <h3 className="text-secondary font-medium uppercase text-sm tracking-widest mb-6 font-montserrat">
            TOP LOCATIONS
          </h3>
          <div className="space-y-4 font-rubik font-light text-black dark:text-gray-300 text-sm tracking-wide">
            <p>9% Durban</p>
            <p>12% Kileleshwa</p>
            <p>23% Roysambu</p>
            <p>64% Fedha</p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          <h3 className="text-secondary font-medium uppercase text-sm tracking-widest mb-6 font-montserrat">
            TOP COUNTRIES
          </h3>
          <div className="space-y-4 font-rubik font-light text-black dark:text-gray-300 text-sm tracking-wide">
            <p>9% Nairobi</p>
            <p>12% South Africa</p>
            <p>23% Congo</p>
            <p>64% Nigeria</p>
          </div>
        </div>
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
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Name *</label>
                    <input 
                      type="text"
                      className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent"
                    />
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Description (Optional)</label>
                    <textarea 
                      className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 h-16 outline-none text-[13px] font-rubik bg-transparent resize-none"
                    />
                  </div>

                  {/* Poster */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Poster (optional)</label>
                    <div className="w-full border border-black/40 dark:border-white/40 rounded-lg h-16 flex items-center justify-center border-dashed cursor-pointer">
                      <span className="text-[10px] text-gray-400 font-rubik">Click or drag to upload poster</span>
                    </div>
                  </div>

                  {/* Date & Location */}
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

                  {/* Starting Time & Ending Time */}
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

                  {/* Black Line Separator */}
                  <div className="w-full h-px bg-black/10 dark:bg-white my-6"></div>

                  {/* Ticket Sales Section */}
                  <div className="grid grid-cols-2 gap-8">
                    {/* Sales Start */}
                    <div className="space-y-3">
                      <h3 className="font-rubik text-xs font-normal text-black dark:text-white uppercase">
                        TICKET SALES STARTS
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            name="salesStart"
                            checked={salesStart === 'publish'}
                            onChange={() => setSalesStart(salesStart === 'publish' ? '' : 'publish')}
                            className="custom-checkbox"
                          />
                          <span className="font-montserrat font-normal text-[12px] text-secondary group-hover:opacity-80 transition-opacity">
                            When i publish event
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Sales End */}
                    <div className="space-y-3">
                      <h3 className="font-rubik text-xs font-normal text-black dark:text-white uppercase">
                        TICKET SALES END
                      </h3>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input 
                            type="checkbox" 
                            name="salesEnd"
                            checked={salesEnd === 'soldout'}
                            onChange={() => setSalesEnd(salesEnd === 'soldout' ? '' : 'soldout')}
                            className="custom-checkbox"
                          />
                          <span className="font-montserrat font-normal text-[12px] text-secondary group-hover:opacity-80 transition-opacity">
                            When tickets sold out
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Publish Button */}
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
    </div>
  );
};

export default TicketingView;
