import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppView, UserData, ViewProps } from '../types';
import Header from '../components/Header';
import BottomNavBar from '../components/BottomNavBar';
import Home from './Home';
import WalletView from './WalletView';
import PayView from './PayView';
import EscrowView from './EscrowView';
import EventsView from './EventsView';
import FundView from './FundView';
import FundingView from './FundingView';
import PaymentsView from './PaymentsView';
import TicketingView from './TicketingView';
import UnauthorizedView from './UnauthorizedView';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/styles.css';

interface DashboardViewProps {
  navigate: (view: AppView) => void;
  userData: UserData | null;
}

const DashboardView: React.FC<DashboardViewProps> = ({ navigate: parentNavigate, userData }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active view from pathname
  const getActiveView = (): AppView => {
    const pathParts = location.pathname.split('/');
    const subPath = pathParts[2]; // /dashboard/wallet -> wallet
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
    } else if (['wallet', 'pay', 'payments', 'escrow', 'events', 'ticketing', 'fund', 'funding'].includes(view)) {
      navigate(`/dashboard/${view}`);
    } else {
      parentNavigate(view);
    }
  };

  return (
    <div className="min-h-screen bg-accent flex flex-col font-rubik overflow-x-hidden text-secondary">
      <Header navigate={handleNavigation} activeView={activeView} userData={userData} />
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
              {/* Fallback to index */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <BottomNavBar navigate={handleNavigation} activeView={activeView} />
    </div>
  );
};

export default DashboardView;
