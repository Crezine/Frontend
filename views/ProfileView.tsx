import React, { useState } from 'react';
import { AppView, UserData } from '../types';
import { 
  RiShieldCheckLine, 
  RiEditLine, 
  RiMailLine, 
  RiPhoneLine, 
  RiLogoutBoxRLine, 
  RiKey2Line,
  RiUserLine,
  RiDeleteBinLine,
  RiErrorWarningLine,
  RiCloseLine
} from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

interface ProfileViewProps {
  navigate: (view: AppView) => void;
  userData: UserData | null;
}

type ModalType = 'logout' | 'deactivate' | 'delete' | null;

const ProfileView: React.FC<ProfileViewProps> = ({ navigate, userData }) => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const closeModal = () => setActiveModal(null);

  const handleConfirm = () => {
    if (activeModal === 'logout' || activeModal === 'delete' || activeModal === 'deactivate') {
      navigate('landing');
    }
    closeModal();
  };

  const getModalContent = () => {
    switch (activeModal) {
      case 'logout':
        return {
          title: 'Sign out?',
          desc: 'Are you sure you want to end your session? You will need to log in again to access your cashdoor.',
          btnText: 'Yes, log out',
          btnClass: 'bg-secondary',
          icon: <RiLogoutBoxRLine size={40} className="text-secondary" />
        };
      case 'deactivate':
        return {
          title: 'Deactivate account?',
          desc: 'This will temporarily hide your profile and links. You can reactivate anytime by logging back in.',
          btnText: 'Deactivate now',
          btnClass: 'bg-amber-600',
          icon: <RiErrorWarningLine size={40} className="text-amber-600" />
        };
      case 'delete':
        return {
          title: 'Delete permanently?',
          desc: 'This action is irreversible. All your creative data, funds, and escrow history will be wiped from our systems.',
          btnText: 'Delete everything',
          btnClass: 'bg-red-600',
          icon: <RiDeleteBinLine size={40} className="text-red-600" />
        };
      default:
        return null;
    }
  };

  const modalData = getModalContent();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-8 md:py-16 font-montserrat font-normal min-h-screen">
      
      {/* Confirmation Modal */}
      <AnimatePresence>
        {activeModal && modalData && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-accent dark:bg-gray-900 w-full max-w-md rounded-[40px] p-8 md:p-10 shadow-2xl border border-white/20 overflow-hidden transition-colors"
            >
              <div className="absolute top-0 right-0 p-6">
                <button onClick={closeModal} className="text-secondary dark:text-gray-400 hover:rotate-90 transition-transform">
                  <RiCloseLine size={28} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-inner">
                  {modalData.icon}
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-medium text-secondary dark:text-primary">{modalData.title}</h2>
                  <p className="text-secondary/70 dark:text-gray-400 text-sm md:text-base leading-relaxed font-rubik font-light">
                    {modalData.desc}
                  </p>
                </div>

                <div className="flex flex-col w-full gap-3 pt-4">
                  <button 
                    onClick={handleConfirm}
                    className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transition-all active:scale-95 ${modalData.btnClass}`}
                  >
                    {modalData.btnText}
                  </button>
                  <button 
                    onClick={closeModal}
                    className="w-full py-4 rounded-2xl bg-white dark:bg-gray-800 text-secondary dark:text-gray-300 font-bold border border-secondary/5 dark:border-white/5 hover:bg-secondary/5 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Top Profile Header */}
      <section className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-10 mb-12 md:mb-20 pb-10 border-b-2 border-secondary/10 dark:border-white/10 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-secondary dark:bg-primary rounded-[40px] flex items-center justify-center text-white text-5xl md:text-6xl font-rubik font-light shadow-2xl relative shrink-0">
            {userData?.name?.charAt(0) || 'K'}
            <div className="absolute -bottom-1 -right-1 bg-green-500 p-2 rounded-full border-[6px] border-accent dark:border-gray-900 shadow-lg">
              <RiShieldCheckLine className="text-white" size={24} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-montserrat font-normal text-secondary dark:text-primary leading-tight">
              {userData?.name || 'Creative'}
            </h1>
            <p className="text-secondary/60 dark:text-gray-400 text-lg md:text-2xl font-rubik font-light tracking-wide">{userData?.craft || 'Visual Artist'}</p>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-end gap-3 self-center md:self-auto">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 text-xs font-medium border border-green-200 dark:border-green-900/50 w-fit shadow-sm">
            Verified creative
          </span>
          <button className="w-fit whitespace-nowrap flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-secondary dark:bg-primary text-white font-montserrat font-normal transition-all shadow-md active:scale-95 text-sm">
            <RiEditLine size={18} />
            Edit profile
          </button>
        </div>
      </section>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Information Column */}
        <div className="lg:col-span-7 space-y-12 md:space-y-16">
          
          {/* Section: Personal Info */}
          <div className="space-y-8">
            <h3 className="text-lg md:text-xl font-montserrat font-medium text-secondary dark:text-primary border-l-4 border-primary pl-5">Personal information</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center sm:justify-between p-6 md:p-8 rounded-[24px] bg-white dark:bg-gray-800 transition-all border border-secondary/10 dark:border-white/10 shadow-sm text-center sm:text-left gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="text-secondary dark:text-primary p-3 bg-accent/50 dark:bg-gray-900 rounded-xl"><RiMailLine size={24} /></div>
                  <div>
                    <p className="text-[11px] text-secondary/60 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Email address</p>
                    <p className="text-secondary dark:text-gray-100 text-base md:text-xl font-rubik font-light">{userData?.email || 'creative@crezine.com'}</p>
                  </div>
                </div>
                <button className="w-fit text-primary font-bold text-sm hover:underline underline-offset-4 px-4 py-2">Change</button>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:justify-between p-6 md:p-8 rounded-[24px] bg-white dark:bg-gray-800 transition-all border border-secondary/10 dark:border-white/10 shadow-sm text-center sm:text-left gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="text-secondary dark:text-primary p-3 bg-accent/50 dark:bg-gray-900 rounded-xl"><RiPhoneLine size={24} /></div>
                  <div>
                    <p className="text-[11px] text-secondary/60 dark:text-gray-400 font-bold uppercase tracking-widest mb-1">Contact number</p>
                    <p className="text-secondary dark:text-gray-100 text-base md:text-xl font-rubik font-light">+234 802 862 705</p>
                  </div>
                </div>
                <button className="w-fit text-primary font-bold text-sm hover:underline underline-offset-4 px-4 py-2">Edit</button>
              </div>
            </div>
          </div>

          {/* Section: Security */}
          <div className="space-y-8">
            <h3 className="text-lg md:text-xl font-montserrat font-medium text-secondary dark:text-primary border-l-4 border-primary pl-5">Security & privacy</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <button className="flex flex-col items-center sm:items-start gap-4 p-6 rounded-[24px] bg-white dark:bg-gray-800 border border-secondary/10 dark:border-white/10 hover:border-primary transition-all text-center sm:text-left shadow-sm group">
                <div className="w-12 h-12 rounded-xl bg-secondary dark:bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <RiKey2Line size={24} />
                </div>
                <div>
                  <p className="font-montserrat font-normal text-secondary dark:text-gray-100 text-base mb-1">Recovery codes</p>
                  <p className="text-xs text-secondary/60 dark:text-gray-400 font-rubik font-light leading-relaxed">Manage backup access</p>
                </div>
              </button>
              
              <div className="flex flex-col items-center sm:items-start gap-4 p-6 rounded-[24px] bg-white dark:bg-gray-800 border border-secondary/10 dark:border-white/10 shadow-sm text-center sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center shadow-md">
                  <RiUserLine size={24} />
                </div>
                <div>
                  <p className="font-montserrat font-normal text-secondary dark:text-gray-100 text-base mb-1">Account status</p>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                    <p className="text-xs text-green-600 dark:text-green-400 font-medium">Active & verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Column */}
        <div className="lg:col-span-5 space-y-12">
          
          {/* Section: Session */}
          <div className="space-y-8">
            <h3 className="text-lg md:text-xl font-montserrat font-medium text-secondary dark:text-primary">Session</h3>
            <button 
              onClick={() => setActiveModal('logout')}
              className="w-fit flex items-center gap-4 px-6 py-3 rounded-xl bg-white dark:bg-gray-800 hover:shadow-lg transition-all border border-secondary/10 dark:border-white/10 group shadow-sm"
            >
              <RiLogoutBoxRLine size={20} className="text-secondary dark:text-primary" />
              <span className="font-medium text-secondary dark:text-gray-100 text-sm">Log out account</span>
            </button>
          </div>

          {/* Section: Danger Zone */}
          <div className="pt-10 border-t-2 border-red-500/20 space-y-8">
            <h3 className="text-lg md:text-xl font-montserrat font-medium text-red-600 dark:text-red-400 text-center lg:text-left">Danger zone</h3>
            <div className="flex flex-col items-center lg:items-start gap-3">
              <button 
                onClick={() => setActiveModal('deactivate')}
                className="w-fit flex items-center gap-3 px-5 py-2.5 rounded-xl bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-medium hover:bg-red-100 transition-all text-sm border border-red-100 dark:border-red-900/20"
              >
                <RiErrorWarningLine size={18} />
                Deactivate account
              </button>
              <button 
                onClick={() => setActiveModal('delete')}
                className="w-fit flex items-center gap-3 px-5 py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-all text-sm shadow-md"
              >
                <RiDeleteBinLine size={18} />
                Delete data & account
              </button>
            </div>
            
            <div className="bg-red-50/50 dark:bg-red-900/10 p-6 rounded-[24px] border border-red-100 dark:border-red-900/20">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <span className="font-bold uppercase tracking-widest text-[9px] text-red-600/60 dark:text-red-400/60">Warning protocol</span>
                <p className="text-xs text-red-700 dark:text-red-300 font-rubik font-light leading-relaxed italic text-center lg:text-left">
                  Deleting your account is permanent. All creative assets, history, and funds will be permanently removed.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileView;
