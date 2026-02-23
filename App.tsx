import React, { useState } from 'react';
import { AppView } from './types';
import LandingView from './views/LandingView';
import OnboardingView from './views/OnboardingView';
import DashboardView from './views/DashboardView';
import FeaturesView from './views/FeaturesView';
import PricingView from './views/PricingView';
import ProductView from './views/ProductView';
import SupportView from './views/SupportView';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');

  const navigate = (view: AppView) => {
    setCurrentView(view);
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingView navigate={navigate} />;
      case 'onboarding':
        return <OnboardingView navigate={navigate} />;
      case 'dashboard':
        return <DashboardView navigate={navigate} />;
      case 'features':
        return <FeaturesView navigate={navigate} />;
      case 'pricing':
        return <PricingView navigate={navigate} />;
      case 'product':
        return <ProductView navigate={navigate} />;
      case 'support':
        return <SupportView navigate={navigate} />;
      default:
        return <LandingView navigate={navigate} />;
    }
  };

  return renderView();
};

export default App;
