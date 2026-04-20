import React, { useState } from 'react';
import { AppView, UserData } from '../types';
import { CgProfile } from "react-icons/cg";
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileViewProps {
  navigate: (view: AppView) => void;
  userData: UserData | null;
}

const ProfileView: React.FC<ProfileViewProps> = ({ navigate, userData }) => {
  const [isVerified, setIsVerified] = useState(true);
  const [isCraftMenuOpen, setIsCraftMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: userData?.name || 'Creative',
    email: userData?.email || 'creative@crezine.com',
    dob: '1995-05-15',
    phone: '+254 700 000 000',
    craft: userData?.craft || 'Visual Artist'
  });

  const availableCrafts = [
    'Web Designer',
    'Visual Artist',
    'Content Creator',
    'Musician',
    'Developer',
    'Photographer',
    'UI/UX Designer',
    'Other'
  ];

  const handleLogout = () => {
    navigate('landing');
  };

  const handleCraftChange = (craft: string) => {
    setFormData({ ...formData, craft });
    setIsCraftMenuOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 font-montserrat transition-colors relative">
      <header className="mb-12 text-left">
        <h1 className="text-3xl md:text-4xl font-normal text-black dark:text-white mb-2">Profile Settings</h1>
        <p className="text-black/60 dark:text-white/60 font-normal text-sm md:text-base">Manage your person information</p>
      </header>

      <div className="flex flex-col items-center mb-12">
        <div className="text-[#AB3625] mb-4">
          <CgProfile size={100} />
        </div>
        <h2 className="text-2xl font-normal text-black dark:text-white mb-1">{formData.fullName}</h2>
        <div className="relative">
          <button 
            onClick={() => setIsCraftMenuOpen(!isCraftMenuOpen)}
            className="flex items-center gap-2 hover:opacity-80 transition-all"
          >
            <span className="text-lg font-normal text-[#F69C31]">{formData.craft}</span>
            <div className={`transition-transform duration-300 ${isCraftMenuOpen ? 'rotate-180' : ''}`}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 1L4 4L1 1" stroke="#AB3625" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </button>

          <AnimatePresence>
            {isCraftMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-0 left-full ml-4 md:fixed md:top-24 md:right-12 md:left-auto md:ml-0 w-48 bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 rounded-xl shadow-xl z-[100] overflow-hidden"
              >
                {availableCrafts.map((craft) => (
                  <button
                    key={craft}
                    onClick={() => handleCraftChange(craft)}
                    className="w-full px-4 py-2.5 text-left text-sm hover:bg-secondary/5 dark:hover:bg-white/5 transition-colors text-black dark:text-white font-normal"
                  >
                    {craft}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-white/70 ml-1">Full name</label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black dark:border-white/30 rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm text-black dark:text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-white/70 ml-1">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black dark:border-white/30 rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm text-black dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-white/70 ml-1">Date of Birth</label>
            <input 
              type="date" 
              value={formData.dob}
              onChange={(e) => setFormData({...formData, dob: e.target.value})}
              className="w-full h-[52px] px-4 bg-white dark:bg-gray-900 border border-black dark:border-white/30 rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm text-black dark:text-white"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-white/70 ml-1">Phone Number</label>
            <div className="relative h-[52px]">
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full h-full px-4 bg-white dark:bg-gray-900 border border-black dark:border-white/30 rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm text-black dark:text-white pr-8"
              />
              <div className="absolute bottom-4 right-3 pointer-events-none">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 1L4 4L1 1" stroke="#F69C31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-white/70 ml-1">End Session</label>
            <button 
              onClick={handleLogout}
              className="w-full h-[52px] bg-secondary text-white rounded-xl font-normal text-sm hover:opacity-95 transition-all shadow-md"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-white/70 ml-1">Account Status</label>
            <div className="w-full h-[52px]">
              {isVerified ? (
                <div className="w-full h-full flex items-center justify-center bg-[#F69C31] text-[#AB3625] rounded-xl text-xs font-normal border border-[#AB3625]/20 shadow-sm">Verified</div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-xs font-normal border border-red-200 dark:border-red-900/50 shadow-sm">Not verified</div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-white/70 ml-1">Pin</label>
            <button className="w-full h-[52px] bg-white dark:bg-gray-800 border border-black dark:border-white/40 text-black dark:text-white rounded-xl font-normal text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
              Create Pin
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-white/70 ml-1">Update pin</label>
            <button className="w-full h-[52px] bg-white dark:bg-gray-800 border border-black dark:border-white/40 text-black dark:text-white rounded-xl font-normal text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm">
              Change pin
            </button>
          </div>
        </div>

        <div className="pt-10 flex justify-center">
          <button className="w-full py-4 bg-secondary text-white rounded-full font-normal text-sm hover:opacity-95 transition-all shadow-lg tracking-widest">
            Save status
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
