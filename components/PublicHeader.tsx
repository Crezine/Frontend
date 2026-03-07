import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppView } from '../types';
import BrandLogo from './BrandLogo';
import { PiHamburgerLight } from "react-icons/pi";
import { FiX, FiChevronDown } from 'react-icons/fi';

interface NavItem {
  label: string;
  path?: string;
  subItems?: { label: string; path: string }[];
}

const PublicHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks: NavItem[] = [
    {
      label: 'Use Case',
      subItems: [
        { label: 'Product', path: '/product' },
        { label: 'Features', path: '/features' },
        { label: 'Statistics', path: '/statistics' },
      ]
    },
    {
      label: 'Resources',
      subItems: [
        { label: 'Home', path: '/' },
        { label: 'Share', path: '/share' },
      ]
    },
    {
      label: 'Support',
      subItems: [
        { label: 'Get Started', path: '/onboarding' },
        { label: 'Pricing', path: '/pricing' },
        { label: 'Support', path: '/support' },
      ]
    }
  ];

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY < 10) {
          setIsVisible(true);
        } else {
          if (currentScrollY > lastScrollY) {
            setIsVisible(false);
            setActiveDropdown(null);
          } else {
            setIsVisible(true);
          }
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  const handleLinkClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleLogoClick = (path: string) => {
    navigate(path);
    // Specifically NOT closing the menu for logo clicks if needed, 
    // though navigating to "/" will reload LandingView which has its own state.
    // However, keeping the state consistent if it's a SPA.
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const toggleMobileItem = (label: string) => {
    setExpandedMobileItem(expandedMobileItem === label ? null : label);
  };

  return (
    <>
      <header 
        className={`fixed top-3 left-3 right-3 z-50 transition-all duration-500 ease-in-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        } pointer-events-none`}
      >
        <div className="max-w-7xl mx-auto pointer-events-auto" ref={dropdownRef}>
          <div className="bg-white rounded-full shadow-lg border border-secondary/10 flex items-center justify-between h-12 lg:h-16 px-6 lg:px-12 relative">
            <div className="flex-shrink-0 cursor-pointer scale-90 lg:scale-110 origin-left">
              <BrandLogo onClick={() => handleLinkClick('/')} />
            </div>
            
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="flex items-center space-x-1 text-sm lg:text-base font-normal text-secondary/80 hover:text-primary transition-colors duration-300 font-rubik py-2"
                  >
                    <span>{link.label}</span>
                    <motion.div
                      animate={{ rotate: activeDropdown === link.label ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown className="w-4 h-4 lg:w-5 lg:h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-secondary/5 overflow-hidden py-2"
                      >
                        {link.subItems?.map((sub) => (
                          <button
                            key={sub.label}
                            onClick={() => handleLinkClick(sub.path)}
                            className="w-full text-left px-4 py-2 text-sm lg:text-base font-normal text-secondary/70 hover:text-primary hover:bg-accent/30 transition-all duration-200 font-rubik"
                          >
                            {sub.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
            
            <div className="flex items-center">
                <div className="hidden lg:block">
                    <button 
                        onClick={() => handleLinkClick('/onboarding')}
                        className="bg-secondary text-white font-normal font-montserrat px-8 py-2.5 rounded-full text-sm lg:text-base transition-all duration-300 hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20 active:scale-95 transform"
                    >
                        Open Cashdoor
                    </button>
                </div>
              <div className="md:hidden ml-2">
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-1 rounded-md text-secondary/70"
                  aria-label="Open main menu"
                >
                  <PiHamburgerLight className={`h-7 w-7 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-accent z-50 overflow-y-auto"
          >
            <div className="flex flex-col p-6 pt-8">
              <div className="flex items-center justify-between mb-8 w-full">
                <div className="cursor-pointer scale-90 origin-left">
                  <BrandLogo onClick={() => handleLogoClick('/')} />
                </div>
                
                <button 
                  onClick={() => setIsMenuOpen(false)} 
                  className="p-2.5 rounded-full bg-white shadow-lg text-secondary flex-shrink-0"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-1 px-2 pb-10">
                {navLinks.map((link) => (
                  <div key={link.label} className="w-full border-b border-secondary/5 py-1">
                    <button
                      onClick={() => toggleMobileItem(link.label)}
                      className="flex justify-between items-center w-full text-lg font-semibold text-secondary font-montserrat py-3"
                    >
                      <span>{link.label}</span>
                      <motion.div
                        animate={{ rotate: expandedMobileItem === link.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FiChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedMobileItem === link.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col space-y-3 mt-1 mb-3 ml-4 border-l border-primary/20 pl-4"
                        >
                          {link.subItems?.map((sub) => (
                            <button
                              key={sub.label}
                              onClick={() => handleLinkClick(sub.path)}
                              className="text-left text-base font-normal text-secondary/70 hover:text-primary transition-colors font-rubik py-1"
                            >
                              {sub.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PublicHeader;
