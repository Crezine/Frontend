import React, { useState } from 'react';
import { AppView, UserData } from './types';
import LandingView from './views/LandingView';
import OnboardingView from './views/OnboardingView';
import DashboardView from './views/DashboardView';
import Footer from './components/Footer';
import './styles/overrides.css';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [userData, setUserData] = useState<UserData | null>(null);

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
      default:
        return <LandingView navigate={navigate} />;
    }
  };

  return (
    <div className="App">
      {renderView()}
      {currentView !== 'onboarding' && <Footer />}
    </div>
  );
};

export default App;
