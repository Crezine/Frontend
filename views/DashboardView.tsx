import React, { useState, createRef } from 'react';
import { AppView } from '../types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNavBar from '../components/BottomNavBar';
import Home from './Home';
import WalletView from './WalletView';
import PayView from './PayView';
import EscrowView from './EscrowView';
import EventsView from './EventsView';
import FundView from './FundView';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../styles/styles.css';

// Define views outside of component to preserve refs
const views: Record<AppView, { Component: React.FC<{ navigate: (view: AppView) => void }>, nodeRef: React.RefObject<HTMLDivElement> }> = {
  home: { Component: Home, nodeRef: createRef<HTMLDivElement>() },
  wallet: { Component: WalletView, nodeRef: createRef<HTMLDivElement>() },
  pay: { Component: PayView, nodeRef: createRef<HTMLDivElement>() },
  escrow: { Component: EscrowView, nodeRef: createRef<HTMLDivElement>() },
  events: { Component: EventsView, nodeRef: createRef<HTMLDivElement>() },
  fund: { Component: FundView, nodeRef: createRef<HTMLDivElement>() },
  landing: { Component: Home, nodeRef: createRef<HTMLDivElement>() }, // Should not be used, but for type safety
  signup: { Component: Home, nodeRef: createRef<HTMLDivElement>() },// Should not be used, but for type safety
  login: { Component: Home, nodeRef: createRef<HTMLDivElement>() },// Should not be used, but for type safety
  onboarding: { Component: Home, nodeRef: createRef<HTMLDivElement>() },// Should not be used, but for type safety
  dashboard: { Component: Home, nodeRef: createRef<HTMLDivElement>() }// Should not be used, but for type safety
};

const DashboardView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  const [activeView, setActiveView] = useState<AppView>('home');

  const handleNavigation = (view: AppView) => {
    if (view === 'landing') {
      navigate(view);
    } else {
      setActiveView(view);
    }
  };

  const { Component, nodeRef } = views[activeView] || views.home;

  return (
    <div className="min-h-screen bg-accent flex flex-col font-montserrat">
      <Header navigate={handleNavigation} activeView={activeView} />
      <main className="flex-grow pb-16 md:pb-0">
        <TransitionGroup>
          <CSSTransition
            key={activeView}
            nodeRef={nodeRef}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <div ref={nodeRef}>
              <Component navigate={handleNavigation} />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>
      <Footer />
      <BottomNavBar navigate={handleNavigation} activeView={activeView} />
    </div>
  );
};

export default DashboardView;
