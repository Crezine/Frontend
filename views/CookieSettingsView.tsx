import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';
import { RiShieldCheckLine, RiPieChartLine, RiAdvertisementLine, RiCheckLine } from 'react-icons/ri';

const CookieSettingsView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  const [settings, setSettings] = useState({
    necessary: true, // Always true
    analytical: true,
    marketing: false,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(settings));
    setIsSaved(true);
    setTimeout(() => {
      navigate('landing' as AppView);
    }, 1500);
  };

  const Toggle = ({ active, onClick, disabled = false }: { active: boolean, onClick: () => void, disabled?: boolean }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${active ? 'bg-secondary' : 'bg-gray-200'}`}
    >
      <motion.div
        animate={{ x: active ? 26 : 2 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );

  return (
    <div className="bg-accent min-h-screen flex flex-col font-montserrat">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-1 container mx-auto px-6 pt-32 pb-20 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-secondary/5"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-rubik font-normal text-secondary mb-4 tracking-tighter">
              Cookie settings
            </h1>
            <p className="text-black/60 text-sm md:text-base max-w-xl mx-auto font-normal">
              Customize how we use cookies to provide a better experience for your creative journey.
            </p>
          </div>

          <div className="space-y-8 mb-12">
            {/* Necessary Cookies */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary shrink-0">
                  <RiShieldCheckLine size={24} />
                </div>
                <div>
                  <h3 className="font-rubik font-normal text-lg text-secondary">Strictly necessary</h3>
                  <p className="text-xs text-black/60 leading-relaxed mt-1 font-normal">
                    These cookies are essential for the website to function. They handle basic tasks like page navigation and security.
                  </p>
                </div>
              </div>
              <Toggle active={true} onClick={() => {}} disabled={true} />
            </div>

            {/* Analytical Cookies */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <RiPieChartLine size={24} />
                </div>
                <div>
                  <h3 className="font-rubik font-normal text-lg text-secondary">Analytical cookies</h3>
                  <p className="text-xs text-black/60 leading-relaxed mt-1 font-normal">
                    These help us understand how visitors interact with our site, so we can improve our services and features for you.
                  </p>
                </div>
              </div>
              <Toggle 
                active={settings.analytical} 
                onClick={() => setSettings({ ...settings, analytical: !settings.analytical })} 
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <RiAdvertisementLine size={24} />
                </div>
                <div>
                  <h3 className="font-rubik font-normal text-lg text-secondary">Marketing cookies</h3>
                  <p className="text-xs text-black/60 leading-relaxed mt-1 font-normal">
                    Used to deliver personalized ads and content that are relevant to your creative interests.
                  </p>
                </div>
              </div>
              <Toggle 
                active={settings.marketing} 
                onClick={() => setSettings({ ...settings, marketing: !settings.marketing })} 
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`w-full sm:w-[240px] h-[52px] rounded-full font-normal transition-all flex items-center justify-center gap-2 ${
                isSaved 
                ? 'bg-emerald-500 text-white shadow-emerald-200' 
                : 'bg-secondary text-white hover:bg-secondary/90 shadow-secondary/20'
              } shadow-lg active:scale-95`}
            >
              {isSaved ? (
                <>
                  <RiCheckLine size={24} />
                  Settings saved
                </>
              ) : (
                'Save preferences'
              )}
            </button>
            <button
              onClick={() => navigate('landing' as AppView)}
              className="text-secondary/60 hover:text-secondary text-sm font-normal transition-colors"
            >
              Go back
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default CookieSettingsView;
