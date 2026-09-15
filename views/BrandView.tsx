import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView } from '../types';
import { FiCheck } from 'react-icons/fi';

import BrandSidebar, { BrandSectionItem } from '../components/brand/BrandSidebar';
import BrandHero from '../components/brand/BrandHero';
import LogoSection from '../components/brand/LogoSection';
import ColorSection from '../components/brand/ColorSection';
import TypographySection from '../components/brand/TypographySection';
import VoiceSection from '../components/brand/VoiceSection';
import MotifSection from '../components/brand/MotifSection';
import ApplicationsSection from '../components/brand/ApplicationsSection';
import PartnershipSection from '../components/brand/PartnershipSection';
import DownloadsSection from '../components/brand/DownloadsSection';

interface BrandViewProps {
  navigate: (view: AppView) => void;
}

const sections: BrandSectionItem[] = [
  { id: '01', title: 'Logo & clearspace', targetId: 'logo' },
  { id: '02', title: 'Color system', targetId: 'color' },
  { id: '03', title: 'Typography', targetId: 'typography' },
  { id: '04', title: 'Voice & tone', targetId: 'voice' },
  { id: '05', title: 'The Cashdoor motif', targetId: 'motif' },
  { id: '06', title: 'Applications', targetId: 'components' },
  { id: '07', title: 'Partnership rules', targetId: 'partnership' },
  { id: '08', title: 'Downloads & contact', targetId: 'downloads' },
];

const BrandView: React.FC<BrandViewProps> = () => {
  const [activeSection, setActiveSection] = useState<string>('01');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Brand | The Creative cashdoor';
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = sections.find((s) => s.targetId === entry.target.id);
          if (match) setActiveSection(match.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => {
      const element = document.getElementById(section.targetId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const downloadLogoSvg = (filename: string, isLight = false) => {
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
      <rect width="400" height="100" rx="12" fill="${isLight ? '#AB3625' : '#E9E0D8'}"/>
      <g transform="translate(30, 20)">
        <path fill="${isLight ? '#F69C31' : '#AB3625'}" d="M 20,10 C 10,10 5,20 5,30 C 5,40 10,50 20,50 C 30,50 35,40 35,30 C 35,20 30,10 20,10 Z M 20,20 C 23,20 25,23 25,30 C 25,37 23,40 20,40 C 17,40 15,37 15,30 C 15,23 17,20 20,20 Z" />
        <rect x="42" y="15" width="12" height="35" rx="3" fill="${isLight ? '#FFFFFF' : '#F69C31'}" />
        <text x="65" y="42" font-family="'Rubik', sans-serif" font-weight="700" font-size="32" fill="${isLight ? '#FFFFFF' : '#AB3625'}">crezine</text>
        <circle cx="195" cy="38" r="5" fill="#F69C31" />
      </g>
    </svg>`;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-accent min-h-screen flex flex-col font-rubik font-light text-secondary selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedToken && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-secondary text-white px-5 py-2 rounded-full shadow-lg border border-primary/20 flex items-center gap-2 font-montserrat text-xs"
          >
            <FiCheck className="w-4 h-4 text-primary" />
            <span>
              Copied <strong>{copiedToken}</strong> to clipboard
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-10 pb-20 font-rubik font-light">
        <div className="lg:grid lg:grid-cols-[220px_1fr] gap-10 sm:gap-12 lg:gap-16 relative font-rubik font-light">
          {/* Navigation Index */}
          <BrandSidebar
            sections={sections}
            activeSection={activeSection}
            onScrollToSection={scrollToSection}
          />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 space-y-16 lg:space-y-20 font-rubik font-light">
            <BrandHero />
            <LogoSection />
            <ColorSection onCopy={copyToClipboard} />
            <TypographySection />
            <VoiceSection />
            <MotifSection />
            <ApplicationsSection />
            <PartnershipSection />
            <DownloadsSection onDownloadSvg={downloadLogoSvg} onCopy={copyToClipboard} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandView;
