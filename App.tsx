import React, { useState, useEffect } from 'react';
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
import Footer from './components/Footer';
import './styles/overrides.css';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const navigate = (view: AppView) => {
    setCurrentView(view);
  };

  const handleOnboarding = (data: UserData) => {
    setUserData(data);
    navigate('dashboard');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView navigate={navigate} />;
      case 'onboarding':
        return <OnboardingView navigate={navigate} onComplete={handleOnboarding} />;
      case 'dashboard':
        return <DashboardView navigate={navigate} userData={userData} />;
      case 'product':
        return <ProductView navigate={navigate} />;
      case 'features':
        return <FeaturesView navigate={navigate} />;
      case 'pricing':
        return <PricingView navigate={navigate} />;
      case 'support':
        return <SupportView navigate={navigate} />;
      case 'help-center':
        return <HelpCenterView navigate={navigate} />;
      case 'contact':
        return <ContactView navigate={navigate} />;
      case 'whatsapp':
        return <WhatsAppView />;
      default:
        return <LandingView navigate={navigate} />;
    }
  };

  const showFooter = !['onboarding', 'whatsapp'].includes(currentView);

  return (
    <div className="App">
      {renderView()}
      {showFooter && <Footer navigate={navigate} />}
    </div>
  );
};

export default App;
