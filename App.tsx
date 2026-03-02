import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AppView, UserData } from './types';
import LandingView from './views/LandingView';
import OnboardingView from './views/OnboardingView';
import DashboardView from './views/DashboardView';
import ProductView from './views/ProductView';
import FeaturesView from './views/FeaturesView';
import PricingView from './views/PricingView';
import SupportView from './views/SupportView';
import HelpCenterView from './views/HelpCenterView';
import ContactView from './views/ContactView';
import WhatsAppView from './views/WhatsAppView';
import About from './views/About';
import FundingView from './views/FundingView';
import PaymentsView from './views/PaymentsView';
import TicketingView from './views/TicketingView';

import Footer from './components/Footer';
import './styles/overrides.css';

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    // Try to recover userData from localStorage to handle refreshes better
    const saved = localStorage.getItem('userData');
    return saved ? JSON.parse(saved) : null;
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigate = (view: AppView) => {
    if (view === 'landing') {
      navigate('/');
    } else if (['home', 'wallet', 'pay', 'payments', 'escrow', 'events', 'ticketing', 'fund', 'funding'].includes(view)) {
      if (view === 'home') {
        navigate('/dashboard');
      } else {
        navigate(`/dashboard/${view}`);
      }
    } else {
      navigate(`/${view}`);
    }
  };

  const handleOnboarding = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));
    navigate('/dashboard');
  };

  const showFooter = !['/onboarding', '/whatsapp'].includes(location.pathname);

  return (
    <div className="App">
      <Routes>
        {/* Landing and Auth */}
        <Route path="/" element={<LandingView navigate={handleNavigate} />} />
        <Route path="/landing" element={<Navigate to="/" replace />} />
        <Route path="/onboarding" element={<OnboardingView navigate={handleNavigate} onComplete={handleOnboarding} />} />
        
        {/* Dashboard and related user-specific views */}
        <Route path="/dashboard/*" element={<DashboardView navigate={handleNavigate} userData={userData} />} />
        
        {/* Redirect old top-level routes to dashboard */}
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="/wallet" element={<Navigate to="/dashboard/wallet" replace />} />
        <Route path="/pay" element={<Navigate to="/dashboard/pay" replace />} />
        <Route path="/payments" element={<Navigate to="/dashboard/payments" replace />} />
        <Route path="/escrow" element={<Navigate to="/dashboard/escrow" replace />} />
        <Route path="/events" element={<Navigate to="/dashboard/events" replace />} />
        <Route path="/ticketing" element={<Navigate to="/dashboard/ticketing" replace />} />
        <Route path="/fund" element={<Navigate to="/dashboard/fund" replace />} />
        <Route path="/funding" element={<Navigate to="/dashboard/funding" replace />} />

        {/* Public Informational Views */}
        <Route path="/product" element={<ProductView navigate={handleNavigate} />} />
        <Route path="/features" element={<FeaturesView navigate={handleNavigate} />} />
        <Route path="/pricing" element={<PricingView navigate={handleNavigate} />} />
        <Route path="/support" element={<SupportView navigate={handleNavigate} />} />
        <Route path="/help-center" element={<HelpCenterView navigate={handleNavigate} />} />
        <Route path="/help" element={<Navigate to="/help-center" replace />} />
        <Route path="/contact" element={<ContactView navigate={handleNavigate} />} />
        <Route path="/about" element={<About navigate={handleNavigate} />} />
        <Route path="/whatsapp" element={<WhatsAppView />} />
        
        {/* Catch-all route redirects to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showFooter && <Footer navigate={handleNavigate} />}
    </div>
  );
};

export default App;
