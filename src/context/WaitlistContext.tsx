import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { waitlistService, WaitlistEntry, WaitlistFormData } from '../services/waitlistService';
import { useLocation } from 'react-router-dom';

interface WaitlistContextType {
  isModalOpen: boolean;
  openWaitlistModal: () => void;
  closeWaitlistModal: () => void;
  isBannerVisible: boolean;
  dismissBanner: () => void;
  savedEntry: WaitlistEntry | null;
  submitWaitlist: (data: WaitlistFormData) => Promise<WaitlistEntry>;
  hasJoined: boolean;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export const WaitlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [savedEntry, setSavedEntry] = useState<WaitlistEntry | null>(() => waitlistService.getSavedEntry());
  const location = useLocation();

  const isPublicRoute = !location.pathname.startsWith('/dashboard') && 
                        !['/checkout', '/ticket-checkout'].includes(location.pathname);

  // Clear any legacy storage keys and ensure banner is visible on public routes
  useEffect(() => {
    try {
      localStorage.removeItem('crezine_waitlist_banner_dismissed');
      sessionStorage.removeItem('crezine_waitlist_banner_dismissed');
    } catch {}
    
    if (isPublicRoute) {
      setIsBannerVisible(true);
    } else {
      setIsBannerVisible(false);
    }
  }, [location.pathname, isPublicRoute]);

  const openWaitlistModal = () => {
    setIsModalOpen(true);
  };

  const closeWaitlistModal = () => {
    setIsModalOpen(false);
    waitlistService.dismissModal();
  };

  const dismissBanner = () => {
    setIsBannerVisible(false);
  };

  const submitWaitlist = async (data: WaitlistFormData): Promise<WaitlistEntry> => {
    const entry = await waitlistService.joinWaitlist(data);
    setSavedEntry(entry);
    return entry;
  };

  return (
    <WaitlistContext.Provider
      value={{
        isModalOpen,
        openWaitlistModal,
        closeWaitlistModal,
        isBannerVisible,
        dismissBanner,
        savedEntry,
        submitWaitlist,
        hasJoined: !!savedEntry,
      }}
    >
      {children}
    </WaitlistContext.Provider>
  );
};

export const useWaitlist = (): WaitlistContextType => {
  const context = useContext(WaitlistContext);
  if (!context) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
};
