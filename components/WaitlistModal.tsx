import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCheck, FiMail, FiUser, FiCopy, FiCheckCircle } from 'react-icons/fi';
import { FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { useWaitlist } from '../src/context/WaitlistContext';
import { WaitlistEntry } from '../src/services/waitlistService';

const CRAFTS = [
  'Visual Art & Design',
  'Music & Audio',
  'Events & Ticketing',
  'Fashion & Crafting',
  'Video & Content',
  'Developer & Tech',
  'Brand & Agency',
  'Supporter / Collector',
];

const INTERESTS = [
  'Global Payments',
  'Escrow Protection',
  'Event Ticketing',
  'Creative Funding',
  'Creator Merch Shop',
];

export const WaitlistModal: React.FC = () => {
  const { isModalOpen, closeWaitlistModal, submitWaitlist, savedEntry } = useWaitlist();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCraft, setSelectedCraft] = useState<string>('Visual Art & Design');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Global Payments', 'Event Ticketing']);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedEntry, setSubmittedEntry] = useState<WaitlistEntry | null>(savedEntry);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (savedEntry) {
      setSubmittedEntry(savedEntry);
    }
  }, [savedEntry]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeWaitlistModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeWaitlistModal]);

  // Lock scroll when modal is open
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

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      const entry = await submitWaitlist({
        name: name.trim() || 'Creative Pioneer',
        email: email.trim().toLowerCase(),
        craft: selectedCraft,
        interests: selectedInterests,
      });
      setSubmittedEntry(entry);
    } catch (err: any) {
      console.error('Waitlist join error:', err);
      setError(err?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const referralUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}?ref=${submittedEntry?.referralCode || 'EARLY'}`
    : 'https://crezine.com';

  const shareText = `I just joined the waitlist for Crezine — the global creative cashdoor for payments, gigs, and funding. Check it out:`;

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralUrl)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsapp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${referralUrl}`)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(referralUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-2 sm:p-6 md:p-10 font-montserrat">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeWaitlistModal}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm transition-all"
            aria-hidden="true"
          />

          {/* Modal Container: Expanded width & height on mobile for full visibility */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[96vw] max-w-lg sm:w-full max-h-[96vh] sm:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-black/10 overflow-hidden z-10 my-auto text-left flex flex-col"
          >
            {/* Cancel 'X' Button */}
            <button
              onClick={closeWaitlistModal}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-colors cursor-pointer z-20"
              aria-label="Close waitlist modal"
              title="Close (Esc)"
            >
              <FiX className="w-5 h-5 stroke-[2.5]" />
            </button>

            {submittedEntry ? (
              /* SUCCESS STATE */
              <div className="p-4 sm:p-8 flex flex-col items-center text-center overflow-y-auto max-h-[94vh] sm:max-h-[85vh] [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.15)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-black/15 [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2.5 sm:mb-3">
                  <FiCheck className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-rubik text-black tracking-tight">
                  You're on the waitlist.
                </h2>

                <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-black/65 max-w-sm font-montserrat leading-relaxed font-light">
                  We'll notify <span className="font-medium text-black">{submittedEntry.email}</span> as soon as your access is ready.
                </p>

                {/* Spot Card */}
                <div className="w-full mt-4 sm:mt-5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-accent/35 border border-black/5 flex items-center justify-between font-montserrat">
                  <div className="text-left">
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-medium text-black/50">
                      Priority Spot
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold font-rubik text-black tracking-tight">
                      #{submittedEntry.position}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white text-secondary text-[11px] sm:text-xs font-semibold border border-black/5 shadow-xs font-montserrat">
                      {submittedEntry.craft || 'Creator'}
                    </span>
                  </div>
                </div>

                {/* Included Perks */}
                <div className="w-full mt-3 sm:mt-3.5 text-left bg-accent/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-black/5 space-y-1.5 sm:space-y-2 font-montserrat">
                  <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-black/60">
                    Included Perks
                  </p>
                  <div className="space-y-1 text-xs text-black/80 font-light">
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span><strong className="font-semibold text-black">0% platform fees</strong> on first $1,000 processed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>Priority access to creative grants &amp; fund pools</span>
                    </div>
                  </div>
                </div>

                {/* Social Share */}
                <div className="w-full mt-4 sm:mt-5 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 font-montserrat">
                  <button
                    onClick={handleShareTwitter}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-black text-white text-xs font-medium hover:bg-black/90 active:scale-95 transition-all cursor-pointer"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                    <span>Share on X</span>
                  </button>
                  
                  <button
                    onClick={handleShareWhatsapp}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-black/5 text-black hover:bg-black/10 active:scale-95 text-xs font-medium transition-all cursor-pointer"
                  >
                    {copiedLink ? <FiCheck className="w-3.5 h-3.5 text-emerald-600" /> : <FiCopy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy link'}</span>
                  </button>
                </div>

                {/* Close action */}
                <button
                  onClick={closeWaitlistModal}
                  className="mt-4 sm:mt-5 w-full py-2.5 sm:py-3 bg-secondary text-white font-medium rounded-full hover:bg-secondary/90 active:scale-98 transition-all text-xs sm:text-sm cursor-pointer font-montserrat shadow-sm"
                >
                  Done
                </button>
              </div>
            ) : (
              /* SIGNUP FORM STATE WITH FULL ACCESSIBILITY ON SMALL SCREENS */
              <div className="p-4 sm:p-7 md:p-8 max-h-[94vh] sm:max-h-[85vh] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.15)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/15 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-black/25">
                {/* Header info */}
                <div className="text-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-normal font-rubik text-black tracking-tight">
                    Join the waitlist.
                  </h2>
                  
                  <p className="mt-1 text-xs sm:text-sm text-black/65 font-montserrat font-light leading-relaxed max-w-sm mx-auto">
                    Secure zero platform fees on your first $1,000, priority access to creative funding, and early onboarding.
                  </p>
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-3 p-2.5 sm:p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium font-montserrat text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 font-montserrat">
                  {/* Name Field */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-black/70 mb-1">
                      Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full pl-9 pr-3.5 sm:pl-10 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-accent/25 rounded-xl border border-black/10 focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary text-black font-montserrat placeholder:text-black/30 transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-black/70 mb-1">
                      Email address <span className="text-secondary">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-3.5 sm:pl-10 sm:pr-4 py-2 sm:py-2.5 text-xs sm:text-sm bg-accent/25 rounded-xl border border-black/10 focus:outline-none focus:border-secondary focus:bg-white focus:ring-1 focus:ring-secondary text-black font-montserrat placeholder:text-black/30 transition-all font-light"
                      />
                    </div>
                  </div>

                  {/* Craft Selection */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-black/70 mb-1">
                      What is your craft?
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {CRAFTS.map((craft) => (
                        <button
                          key={craft}
                          type="button"
                          onClick={() => setSelectedCraft(craft)}
                          className={`text-left px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[11px] sm:text-xs font-medium transition-all border cursor-pointer ${
                            selectedCraft === craft
                              ? 'bg-secondary text-white border-secondary shadow-xs'
                              : 'bg-accent/20 text-black/70 border-black/5 hover:border-black/20 hover:bg-accent/30'
                          }`}
                        >
                          <span className="truncate block">{craft}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feature interests */}
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-black/70 mb-1">
                      Interests
                    </label>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5">
                      {INTERESTS.map((interest) => {
                        const isSelected = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-secondary text-white border-secondary shadow-xs'
                                : 'bg-accent/20 text-black/70 border-black/5 hover:border-black/20 hover:bg-accent/30'
                            }`}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1 sm:pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2.5 sm:py-3 px-5 sm:px-6 bg-secondary text-white font-medium rounded-full hover:bg-secondary/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm font-montserrat cursor-pointer disabled:opacity-50 shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Join the waitlist</span>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.90991 19.9201L15.4299 13.4001C16.1999 12.6301 16.1999 11.3701 15.4299 10.6001L8.90991 4.08008" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WaitlistModal;
