import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppView, UserData } from '../types';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DashboardFooter from '../components/DashboardFooter';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/styles.css';

// Lazy load dashboard views
const Home = lazy(() => import('./Home'));
const WalletView = lazy(() => import('./WalletView'));
const PayView = lazy(() => import('./PayView'));
const EscrowView = lazy(() => import('./EscrowView'));
const EventsView = lazy(() => import('./EventsView'));
const FundView = lazy(() => import('./FundView'));
const FundingView = lazy(() => import('./FundingView'));
const PaymentsView = lazy(() => import('./PaymentsView'));
const TicketingView = lazy(() => import('./TicketingView'));
const ProfileView = lazy(() => import('./ProfileView'));

interface DashboardViewProps {
  navigate: (view: AppView) => void;
  userData: UserData | null;
}

// Simple loading fallback
const ViewLoader = () => (
  <div className="w-full h-64 flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
);

const DashboardView: React.FC<DashboardViewProps> = ({ navigate: parentNavigate, userData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const getActiveView = (): AppView => {
    const pathParts = location.pathname.split('/');
    const subPath = pathParts[2];
    if (!subPath || subPath === '') return 'home';
    return subPath as AppView;
  };

  const activeView = getActiveView();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigation = (view: AppView) => {
    if (view === 'landing') {
      parentNavigate('landing');
    } else if (view === 'dashboard' || view === 'home') {
      navigate('/dashboard');
    } else if (['wallet', 'pay', 'payments', 'escrow', 'events', 'ticketing', 'fund', 'funding', 'profile'].includes(view)) {
      navigate(`/dashboard/${view}`);
    } else {
      parentNavigate(view);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Determine if footer should be shown
  const showFooter = activeView !== 'profile';

  return (
    <div className="min-h-screen bg-accent dark:bg-gray-900 flex flex-col font-montserrat overflow-x-hidden text-secondary dark:text-gray-100 transition-colors duration-300">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        navigate={handleNavigation}
        activeView={activeView}
      />
      
      <Header 
        navigate={handleNavigation} 
        activeView={activeView} 
        userData={userData} 
        onMenuToggle={() => setIsSidebarOpen(true)}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
      />

      <main className="flex-grow pb-16 md:pb-0 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full"
          >
            <Suspense fallback={<ViewLoader />}>
              <Routes location={location}>
                <Route index element={<Home navigate={handleNavigation} userData={userData} />} />
                <Route path="wallet" element={<WalletView navigate={handleNavigation} userData={userData} />} />
                <Route path="pay" element={<PayView navigate={handleNavigation} userData={userData} />} />
                <Route path="payments" element={<PaymentsView navigate={handleNavigation} userData={userData} />} />
                <Route path="escrow" element={<EscrowView navigate={handleNavigation} userData={userData} />} />
                <Route path="events" element={<EventsView navigate={handleNavigation} userData={userData} />} />
                <Route path="ticketing" element={<TicketingView navigate={handleNavigation} userData={userData} />} />
                <Route path="fund" element={<FundView navigate={handleNavigation} userData={userData} />} />
                <Route path="funding" element={<FundingView navigate={handleNavigation} userData={userData} />} />
                <Route path="profile" element={<ProfileView navigate={handleNavigation} userData={userData} isDarkMode={isDarkMode} onThemeToggle={toggleTheme} />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
      
      {showFooter && <DashboardFooter navigate={handleNavigation} />}
    </div>
  );
};

export default DashboardView;
