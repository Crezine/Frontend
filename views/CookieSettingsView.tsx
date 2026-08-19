import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';
import { RiShieldCheckLine, RiPieChartLine, RiAdvertisementLine, RiCheckLine, RiLockLine } from 'react-icons/ri';

interface CookieSettingsProps {
  navigate: (view: AppView) => void;
}

const CookieSettingsView: React.FC<CookieSettingsProps> = ({ navigate }) => {
  const [settings, setSettings] = useState({
    necessary: true,
    analytical: true,
    marketing: false,
  });

  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const saved = localStorage.getItem('crezine_cookie_consent');
    if (saved) {
      try {
        if (saved === 'accepted') {
          setSettings({ necessary: true, analytical: true, marketing: true });
        } else {
          const parsed = JSON.parse(saved);
          setSettings(prev => ({ ...prev, ...parsed, necessary: true }));
        }
      } catch {
        // use defaults
      }
    }
  }, []);

  const handleToggle = (key: 'analytical' | 'marketing') => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (customSettings?: typeof settings) => {
    const payload = customSettings || settings;
    localStorage.setItem('crezine_cookie_consent', JSON.stringify(payload));
    setSaveStatus('Preferences saved');
    setTimeout(() => {
      setSaveStatus(null);
    }, 2500);
  };

  const handleAcceptAll = () => {
    const allEnabled = { necessary: true, analytical: true, marketing: true };
    setSettings(allEnabled);
    handleSave(allEnabled);
  };

  const Toggle = ({ active, onClick, disabled = false }: { active: boolean; onClick: () => void; disabled?: boolean }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
        disabled ? 'cursor-not-allowed opacity-60' : ''
      } ${active ? 'bg-secondary' : 'bg-black/15'}`}
      role="switch"
      aria-checked={active}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out ${
          active ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="bg-accent min-h-screen flex flex-col font-montserrat relative">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-1 container mx-auto px-6 pt-32 pb-24 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-rubik font-normal text-secondary leading-none mb-4 tracking-tighter">
              Cookie settings.
            </h1>
            <p className="text-black/70 text-base md:text-lg font-normal leading-relaxed max-w-2xl">
              Manage your cookie preferences. Choose what information you allow us to use while browsing Crezine.
            </p>
          </div>

          {/* Preferences List (No separator lines, clean professional icons without backgrounds) */}
          <div className="space-y-10">
            {/* Strictly Necessary */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-3.5">
                <RiShieldCheckLine className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-rubik font-normal text-lg sm:text-xl text-secondary">Strictly necessary</h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase text-secondary/60 bg-secondary/5 px-2 py-0.5 rounded">
                      <RiLockLine size={10} />
                      Required
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/70 leading-relaxed mt-1.5 font-normal max-w-xl">
                    Required for core website functionality, secure login sessions, and transactional security. These cannot be disabled.
                  </p>
                </div>
              </div>
              <Toggle active={true} onClick={() => {}} disabled={true} />
            </div>

            {/* Analytical Cookies */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-3.5">
                <RiPieChartLine className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-rubik font-normal text-lg sm:text-xl text-secondary">Analytics & performance</h3>
                    <span className="text-[11px] font-mono uppercase text-black/40 bg-black/5 px-2 py-0.5 rounded">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/70 leading-relaxed mt-1.5 font-normal max-w-xl">
                    Helps us understand how creators use the platform so we can improve loading speeds, fix errors, and optimize features.
                  </p>
                </div>
              </div>
              <Toggle 
                active={settings.analytical} 
                onClick={() => handleToggle('analytical')} 
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-3.5">
                <RiAdvertisementLine className="w-6 h-6 text-secondary shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="font-rubik font-normal text-lg sm:text-xl text-secondary">Marketing & opportunities</h3>
                    <span className="text-[11px] font-mono uppercase text-black/40 bg-black/5 px-2 py-0.5 rounded">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-black/70 leading-relaxed mt-1.5 font-normal max-w-xl">
                    Used to suggest relevant creative residencies, grants, and community opportunities based on your craft.
                  </p>
                </div>
              </div>
              <Toggle 
                active={settings.marketing} 
                onClick={() => handleToggle('marketing')} 
              />
            </div>
          </div>

          {/* Centered Actions (Save preferences & Accept all) */}
          <div className="mt-16 flex flex-col items-center justify-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => handleSave()}
                className="bg-secondary text-white px-8 py-3.5 rounded-full text-xs sm:text-sm font-normal hover:bg-secondary/90 shadow-md shadow-secondary/15 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer min-w-[170px]"
              >
                <RiCheckLine size={18} />
                Save preferences
              </button>

              <button
                onClick={handleAcceptAll}
                className="bg-white text-secondary border border-secondary/20 px-8 py-3.5 rounded-full text-xs sm:text-sm font-normal hover:bg-secondary/5 active:scale-95 transition-all cursor-pointer min-w-[140px]"
              >
                Accept all
              </button>
            </div>

            <AnimatePresence>
              {saveStatus && (
                <motion.span
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-xs font-medium text-emerald-700 bg-emerald-100/60 px-4 py-1.5 rounded-full flex items-center gap-1.5 mt-2"
                >
                  <RiCheckLine size={14} />
                  {saveStatus}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CookieSettingsView;
