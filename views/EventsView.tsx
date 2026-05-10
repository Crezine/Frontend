import React, { useState, useEffect, useRef } from 'react';
import { AppView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ChevronDown } from 'lucide-react';
import { eventService, Event, TicketTier } from '../src/services/eventService';

interface EventsViewProps {
  navigate: (view: AppView) => void;
}

const EventsView: React.FC<EventsViewProps> = ({ navigate }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<(Event & { tiers: TicketTier[] }) | null>(null);
  const [ticketCounts, setTicketCounts] = useState<{ [key: string]: number }>({});
  const [showDescription, setShowDescription] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('ENGLISH');
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const [salesStart, setSalesStart] = useState('publish');
  const [salesEnd, setSalesEnd] = useState('soldout');

  // Form states for new event
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const data = await eventService.getEvents();
      setEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch events", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventClick = async (event: Event) => {
    try {
      const fullEvent = await eventService.getEvent(event.id);
      if (!fullEvent) return;
      
      setSelectedEvent(fullEvent);
      
      // Initialize ticket counts
      const initialCounts: { [key: string]: number } = {};
      const tiers = fullEvent.tiers || [];
      tiers.forEach(tier => {
        initialCounts[tier.id] = 0;
      });
      if (tiers.length > 0) {
        initialCounts[tiers[0].id] = 1;
      }
      setTicketCounts(initialCounts);
      setShowDescription(false);
    } catch (error) {
      console.error("Failed to fetch event details", error);
    }
  };

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

  const handleIncrement = (tierId: string) => {
    setTicketCounts(prev => ({ ...prev, [tierId]: (prev[tierId] || 0) + 1 }));
  };

  const handleDecrement = (tierId: string) => {
    setTicketCounts(prev => ({ ...prev, [tierId]: Math.max(0, (prev[tierId] || 0) - 1) }));
  };

  const calculateTotal = () => {
    if (!selectedEvent || !selectedEvent.tiers) return 0;
    return selectedEvent.tiers.reduce((total, tier) => {
      const price = tier.price || 0;
      const count = ticketCounts[tier.id] || 0;
      return total + (price * count);
    }, 0);
  };

  const handleGetTicket = () => {
    const totalCents = calculateTotal();
    const hasSelectedTickets = Object.values(ticketCounts).some(count => count > 0);

    if (!selectedEvent?.tiers || selectedEvent.tiers.length === 0) {
      alert("No ticket tiers available for this event.");
      return;
    }

    if (!hasSelectedTickets && totalCents === 0) {
      alert("Please select at least one ticket.");
      return;
    }

    localStorage.setItem('crezine_checkout_total', (totalCents / 100).toString());
    localStorage.setItem('crezine_ticket_data', JSON.stringify({
      eventName: selectedEvent.title,
      eventDate: new Date(selectedEvent.eventDate).toLocaleDateString(),
      location: selectedEvent.location || 'Online',
      eventImage: `https://picsum.photos/seed/${selectedEvent.id}/600/400`
    }));
    navigate('ticket-checkout' as any);
  };

  const handlePublish = async () => {
    if (!newName || !newDate || !newLocation) {
      alert("Please fill in required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await eventService.createEvent({
        title: newName,
        description: newDescription,
        eventDate: new Date(newDate).toISOString(),
        location: newLocation
      });

      setIsModalOpen(false);
      fetchEvents();
      alert("Event created successfully!");
    } catch (error) {
      console.error("Failed to create event", error);
      alert("Failed to create event");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 font-montserrat relative text-black dark:text-white transition-colors">
      <header className="mb-6 md:mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-medium text-secondary dark:text-primary mb-1 md:mb-2">Creative Events</h1>
          <p className="text-black dark:text-gray-300 text-lg font-normal font-montserrat">Monetize your exhibitions, shows, and workshops.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-secondary text-white px-8 py-2.5 rounded-full font-medium font-montserrat shadow-lg shadow-secondary/20 flex items-center gap-2 hover:bg-secondary/90 transition-all text-base"
        >
          <Plus size={20} />
          New Event
        </button>
      </header>

      {isLoading ? (
        <div className="text-center py-20 text-black/40 dark:text-gray-500">Loading events...</div>
      ) : (events || []).length === 0 ? (
        <div className="text-center py-20 text-black/40 dark:text-gray-500">No events found. Create one to get started!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(events || []).map((event) => (
            <div 
              key={event.id} 
              onClick={() => handleEventClick(event)}
              className="bg-white dark:bg-gray-800 rounded-[32px] border border-secondary/10 dark:border-white/10 shadow-sm overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="h-40 relative">
                 <img 
                   src={`https://picsum.photos/seed/${event.id}/600/400`} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                   alt={event.title} 
                 />
                 <div className="absolute inset-0 bg-primary/20"></div>
                 <div className="absolute top-4 right-4 bg-white/30 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-white/40">
                   {event.status}
                 </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-normal text-black dark:text-white mb-1 font-rubik truncate">{event.title}</h3>
                <p className="text-black/60 dark:text-gray-400 text-sm mb-6 font-normal font-montserrat">{new Date(event.eventDate).toLocaleDateString()}</p>
                
                <div className="flex justify-between items-end mb-4">
                  <div className="flex-1">
                    <p className="text-xs text-black/40 dark:text-gray-500 font-normal mb-1 font-rubik">Location</p>
                    <p className="text-sm font-normal text-black dark:text-gray-200 font-rubik truncate">{event.location || 'Online'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

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
              className="relative bg-white dark:bg-gray-900 w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-black/5 dark:border-white/10"
            >
              <div className="h-48 md:h-56 relative overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${selectedEvent.id}/600/400`} 
                  className="w-full h-full object-cover"
                  alt={selectedEvent.title}
                />
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-secondary dark:text-primary p-1.5 rounded-full hover:bg-white/40 transition-all z-10"
                >
                  <X size={28} strokeWidth={3} />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:p-8 space-y-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-medium text-black dark:text-white mb-2 font-montserrat">
                    {selectedEvent.title}
                  </h2>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-sm font-normal text-black/70 dark:text-gray-300 font-montserrat">
                        Date: <span className="text-secondary dark:text-primary">{new Date(selectedEvent.eventDate).toLocaleDateString()}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-normal text-black/70 dark:text-gray-300 font-montserrat">
                        Location: <span className="text-secondary dark:text-primary">{selectedEvent.location || 'Online'}</span>
                      </p>
                      <div className="flex justify-end mt-2">
                        <button 
                          onClick={() => setShowDescription(!showDescription)}
                          className="bg-white dark:bg-gray-800 border border-black/20 dark:border-white/20 text-primary dark:text-primary px-6 py-2 rounded-xl text-xs font-normal hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-montserrat"
                        >
                          {showDescription ? 'Hide' : 'Show'} description
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-black/10 dark:bg-white/10 w-full mt-4" />
                </div>

                {showDescription && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-black/60 dark:text-gray-400 font-normal leading-relaxed font-montserrat text-center"
                  >
                    {selectedEvent.description || 'No description available for this event.'}
                  </motion.p>
                )}

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-secondary dark:text-primary font-montserrat uppercase tracking-wider">
                    Tickets
                  </h4>
                  <div className="h-px bg-black/10 dark:bg-white/10 w-full" />

                  <div className="space-y-6 py-2">
                    {Array.isArray(selectedEvent.tiers) && selectedEvent.tiers.length > 0 ? (
                      (selectedEvent.tiers || []).map(tier => (
                        <div key={tier.id} className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-sm font-normal text-black dark:text-white font-montserrat">{tier.name}</span>
                            <span className="text-xs text-secondary dark:text-primary font-montserrat">${(tier.price / 100).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center border border-black/40 dark:border-white/40 rounded-lg h-10 px-2 gap-4">
                            <button onClick={() => handleDecrement(tier.id)} className="text-black dark:text-white hover:opacity-70"><Minus size={16} /></button>
                            <span className="text-sm font-normal w-4 text-center text-black dark:text-white">{ticketCounts[tier.id] || 0}</span>
                            <button onClick={() => handleIncrement(tier.id)} className="text-black dark:text-white hover:opacity-70"><Plus size={16} /></button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center text-xs text-black/40 dark:text-gray-500 py-4 font-montserrat italic">No ticket tiers available for this event.</p>
                    )}
                  </div>

                  <div className="h-px bg-black/10 dark:bg-white/10 w-full" />
                  
                  <div className="flex justify-end pt-2">
                    <p className="text-lg font-bold text-black dark:text-white font-montserrat">
                      Total $ {(calculateTotal() / 100).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center pt-1 pb-2">
                  <button 
                    onClick={handleGetTicket}
                    className="bg-secondary text-white w-full py-3 rounded-full text-sm font-normal hover:opacity-90 transition-all transform active:scale-95 shadow-lg shadow-secondary/20 font-montserrat uppercase tracking-widest"
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
                <div className="flex justify-between items-center">
                  <h2 className="text-base font-normal text-black dark:text-white font-rubik">
                    Event details
                  </h2>
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

              <div className="flex-1 overflow-y-auto no-scrollbar p-4 md:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Name *</label>
                    <input 
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent text-black dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-montserrat text-xs text-black dark:text-white">Description (Optional)</label>
                    <textarea 
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 h-16 outline-none text-[13px] font-rubik bg-transparent resize-none text-black dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Date *</label>
                      <input 
                        type="date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent dark:[color-scheme:dark] text-black dark:text-white"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-montserrat text-xs text-black dark:text-white">Location *</label>
                      <input 
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        className="w-full border border-black/40 dark:border-white/40 rounded-lg px-3 py-2 outline-none text-[13px] font-rubik bg-transparent text-black dark:text-white"
                      />
                    </div>
                  </div>

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
