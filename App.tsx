import React, { useState } from 'react';
import { AppView } from './types';
import LandingView from './views/LandingView';
import OnboardingView from './views/OnboardingView';
import DashboardView from './views/DashboardView'; // Import DashboardView

const App: React.FC = () => {
  // Default to showing the LandingView for production purposes
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
      case 'dashboard': // Add the dashboard case
        return <DashboardView navigate={navigate} />;
      default:
        return <LandingView navigate={navigate} />;
    }
  };

  return <div className="App">{renderView()}</div>;
};

export default App;
