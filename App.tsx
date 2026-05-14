import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
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
import ShopView from './views/ShopView';
import CheckoutView from './views/CheckoutView';
import TicketCheckoutView from './views/TicketCheckoutView';
import CookieSettingsView from './views/CookieSettingsView';
import FundingView from './views/FundingView';
import PaymentsView from './views/PaymentsView';
import TicketingView from './views/TicketingView';
import PrivacyPolicyView from './views/PrivacyPolicyView';
import TermsOfServiceView from './views/TermsOfServiceView';
import NotFoundView from './views/NotFoundView';
import UnauthorizedView from './views/UnauthorizedView';

import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CookieConsent from './components/CookieConsent';
import './styles/overrides.css';

import { authService } from './src/services/authService';
import { ApiError } from './src/services/api';

import { auth } from './src/services/firebase';
import { onAuthStateChanged, type User } from 'firebase/auth';

const App: React.FC = () => {
  const [hasInitialAnimated, setHasInitialAnimated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(() => {
    try {
      const saved = localStorage.getItem('userData');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object' && parsed.email) {
        return parsed as UserData;
      }
      return null;
    } catch (e) {
      console.error("Failed to parse userData", e);
      return null;
    }
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthUser(user);

      if (user) {
        try {
          const token = await user.getIdToken();
          localStorage.setItem('firebaseToken', token);
          
          setIsLoading(true);
          const profile = await authService.getMe();
          const data: UserData = {
            name: profile.name || profile.displayName || 'Creative User',
            email: profile.email,
            craft: profile.craft || 'Creator'
          };
          setUserData(data);
          localStorage.setItem('userData', JSON.stringify(data));
        } catch (error) {
          console.error("Auth profile fetch failed", error);
          const canUseCachedProfile =
            !(error instanceof ApiError) || ![401, 403].includes(error.status);
          const saved = canUseCachedProfile ? localStorage.getItem('userData') : null;

          if (saved && auth.currentUser) {
            try {
              setUserData(JSON.parse(saved));
            } catch (e) {
              console.error("Failed to parse saved userData", e);
              setUserData(null);
            }
          } else {
            setUserData(null);
          }
        } finally {
          setIsLoading(false);
          setAuthReady(true);
        }
      } else {
        localStorage.removeItem('firebaseToken');
        localStorage.removeItem('userData');
        setUserData(null);
        setAuthReady(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      setAuthUser(null);
      setUserData(null);
      if (location.pathname.startsWith('/dashboard')) {
        navigate('/onboarding', { replace: true });
      }
    };

    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, [location.pathname, navigate]);

  const handleNavigate = (view: AppView) => {
    if (view === 'landing') {
      navigate('/');
    } else if (['home', 'wallet', 'pay', 'payments', 'escrow', 'events', 'ticket', 'ticketing', 'fund', 'funding'].includes(view)) {
      if (view === 'home') {
        navigate('/dashboard');
      } else {
        const path = view === 'ticketing' ? 'ticket' : view;
        navigate(`/dashboard/${path}`);
      }
    } else {
      navigate(`/${view}`);
    }
  };

  const handleOnboarding = async (data: UserData) => {
    try {
      setIsLoading(true);
      
      await authService.updateProfile({
        name: data.name,
        craft: data.craft
      });

      localStorage.setItem('userData', JSON.stringify(data));
      setUserData(data);
      navigate('/dashboard');
    } catch (error) {
      console.error("Onboarding update failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const profile = await authService.getMe();
      
      const user: UserData = {
        name: profile.name || profile.displayName || 'Creative User',
        email: profile.email,
        craft: profile.craft || 'Creator'
      };
      
      localStorage.setItem('userData', JSON.stringify(user));
      setUserData(user);
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnimation = () => {
    setHasInitialAnimated(false);
  };

  // Do not show the global footer on dashboard routes and shop as it has its own refurbished footer
  const showGlobalFooter = !['/onboarding', '/whatsapp'].includes(location.pathname) && !location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/shop') && !['/checkout', '/ticket-checkout'].includes(location.pathname);

  // Determine if we should show the shop background for checkout
  const isCheckoutModal = location.pathname === '/checkout' || location.pathname === '/ticket-checkout';
  const showShopBackground = isCheckoutModal && location.state?.background;

  return (
    <div className="App">
      <Analytics />
      
      {/* Background for modals */}
      {showShopBackground && (
        <div className="fixed inset-0 z-0 opacity-50 blur-sm pointer-events-none">
          <ShopView navigate={handleNavigate} />
        </div>
      )}

      <Routes location={location.state?.background || location}>
        {/* Landing and Auth */}
        <Route 
          path="/" 
          element={
            <LandingView 
              navigate={handleNavigate} 
              hasInitialAnimated={hasInitialAnimated}
              onAnimationComplete={() => setHasInitialAnimated(true)}
              resetAnimation={resetAnimation}
            />
          } 
        />
        <Route path="/landing" element={<Navigate to="/" replace />} />
        <Route path="/onboarding" element={<OnboardingView navigate={handleNavigate} onComplete={handleOnboarding} onLogin={handleLogin} />} />
        <Route path="/unauthorized" element={<UnauthorizedView navigate={handleNavigate} onLogin={() => navigate('/onboarding')} />} />
        
        {/* Dashboard and related user-specific views */}
        <Route 
          path="/dashboard/*" 
          element={
            !authReady || isLoading ? (
              <div className="min-h-screen flex items-center justify-center font-montserrat text-secondary">
                Loading...
              </div>
            ) : authUser && userData ? (
              <DashboardView 
                navigate={handleNavigate} 
                userData={userData} 
              />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
        
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
        <Route path="/shop/*" element={<ShopView navigate={handleNavigate} />} />
        <Route path="/checkout" element={<CheckoutView navigate={handleNavigate} />} />
        <Route path="/ticket-checkout" element={<TicketCheckoutView navigate={handleNavigate} />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyView navigate={handleNavigate} />} />
        <Route path="/terms-of-service" element={<TermsOfServiceView navigate={handleNavigate} />} />
        <Route path="/whatsapp" element={<WhatsAppView />} />
        <Route path="/cookie-settings" element={<CookieSettingsView navigate={handleNavigate} />} />
        
        {/* Catch-all route for 404 Page Not Found */}
        <Route path="*" element={<NotFoundView navigate={handleNavigate} />} />
      </Routes>

      {/* Actual Modal Rendering */}
      {isCheckoutModal && (
        <Routes>
          <Route path="/checkout" element={<CheckoutView navigate={handleNavigate} />} />
          <Route path="/ticket-checkout" element={<TicketCheckoutView navigate={handleNavigate} />} />
        </Routes>
      )}

      {showGlobalFooter && <BackToTop />}
      <CookieConsent />
      {showGlobalFooter && <Footer navigate={handleNavigate} hideMovementCard={location.pathname === '/shop'} />}
    </div>
  );
};

export default App;
