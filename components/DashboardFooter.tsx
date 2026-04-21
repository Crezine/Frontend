import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInstagram, FiTwitter, FiYoutube, FiPhone, FiMail } from 'react-icons/fi';
import { PiWhatsappLogoThin } from 'react-icons/pi';
import BrandLogo from './BrandLogo';
import { AppView } from '../types';

interface DashboardFooterProps {
  navigate?: (view: AppView) => void;
}

const DashboardFooter: React.FC<DashboardFooterProps> = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-accent dark:bg-gray-900 pt-10 pb-8 text-black dark:text-gray-300 overflow-hidden border-t border-secondary/5 font-rubik font-light transition-colors duration-300">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl font-rubik font-light">
        
        {/* Footer Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-16 font-rubik font-light">
          
          {/* Column 1: Left - Logo, Text, Follow Us */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 lg:max-w-xs w-full lg:w-auto font-rubik font-light">
            <div className="flex items-center gap-2">
                <BrandLogo onClick={() => navigate('/')} isLarge={false} />
            </div>
            <p className="text-sm md:text-base leading-relaxed opacity-80 font-rubik font-light">
              Empowering Creatives Worldwide with the ultimate
              Global Cashdoor. Get paid safely for your long distance
              creative gigs through our ESCROW system.
            </p>
            <div className="pt-2">
              <h4 className="text-black dark:text-primary mb-4 text-sm font-rubik font-normal">Follow us:</h4>
              <div className="flex space-x-6">
                <a href="https://www.youtube.com/@crezine_official" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-300 hover:text-[#FF0000] dark:hover:text-[#FF0000] transition-all text-2xl md:text-3xl" aria-label="YouTube"><FiYoutube /></a>
                <a href="https://www.instagram.com/crezinecashdoor/" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-300 hover:text-[#E4405F] dark:hover:text-[#E4405F] transition-all text-2xl md:text-3xl" aria-label="Instagram"><FiInstagram /></a>
                <a href="https://x.com/CrezineCashdoor" target="_blank" rel="noopener noreferrer" className="text-black dark:text-gray-300 hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2] transition-all text-2xl md:text-3xl" aria-label="Twitter"><FiTwitter /></a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-end gap-10 sm:gap-12 lg:gap-10 xl:gap-16 w-full lg:w-auto lg:ml-auto lg:pt-16 font-rubik font-light">
            
            <div className="flex flex-col items-start space-y-4 lg:space-y-6 min-w-[130px]">
              <h3 className="text-secondary dark:text-primary text-sm md:text-base border-b-2 border-primary/20 pb-1 w-full sm:max-w-[70px] font-rubik font-normal">Company</h3>
              <ul className="space-y-3 lg:space-y-4">
                <li><button onClick={() => navigate('/community' as any)} className="text-black dark:text-gray-300 hover:text-primary text-sm md:text-base transition-colors font-rubik font-light">Community</button></li>
              </ul>
            </div>

            <div className="flex flex-col items-start space-y-4 lg:space-y-6 min-w-[130px]">
              <h3 className="text-secondary dark:text-primary text-sm md:text-base border-b-2 border-primary/20 pb-1 w-full sm:max-w-[70px] font-rubik font-normal">Support</h3>
              <ul className="space-y-3 lg:space-y-4">
                <li><button onClick={() => navigate('/help-center' as any)} className="text-black dark:text-gray-300 hover:text-primary text-sm md:text-base transition-colors font-rubik font-light">Help Centre</button></li>
                <li><button className="text-black dark:text-gray-300 hover:text-primary text-sm md:text-base transition-colors font-rubik font-light">Feedback</button></li>
              </ul>
            </div>

            <div className="flex flex-col items-start space-y-4 lg:space-y-6 min-w-[200px] sm:col-span-2 md:col-span-1">
              <h3 className="text-secondary dark:text-primary text-sm md:text-base border-b-2 border-primary/20 pb-1 w-full sm:max-w-[120px] font-rubik font-normal">Reach Out</h3>
              <ul className="space-y-5 lg:space-y-6 w-full">
                <li className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open('tel:+254702862705', '_self')}>
                  <div className="bg-primary/5 p-2 rounded-full text-black dark:text-gray-300 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <FiPhone className="text-lg" />
                  </div>
                  <span className="text-black dark:text-gray-300 text-sm md:text-base font-rubik font-light group-hover:text-primary transition-colors">+254702862705</span>
                </li>
                <li className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open('mailto:crezinecashdoor@gmail.com', '_self')}>
                  <div className="bg-primary/5 p-2 rounded-full text-black dark:text-gray-300 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <FiMail className="text-lg" />
                  </div>
                  <span className="text-black dark:text-gray-300 text-sm md:text-base break-all font-rubik font-light group-hover:text-primary transition-colors">crezinecashdoor@gmail.com</span>
                </li>
                <li className="flex items-center gap-4 group cursor-pointer" onClick={() => window.open('https://wa.me/254702862705', '_blank')}>
                  <div className="bg-green-500/5 p-2 rounded-full text-black dark:text-gray-300 group-hover:bg-green-600 group-hover:text-white transition-all shadow-sm">
                    <PiWhatsappLogoThin className="text-2xl" />
                  </div>
                  <span className="text-black dark:text-gray-300 text-sm md:text-base font-rubik font-light group-hover:text-primary transition-colors">Click to Get Help</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-8 font-rubik font-light">
          <p className="text-black dark:text-gray-400 text-sm md:text-base text-center md:text-left font-rubik font-light opacity-60">
            &copy; CrezineCashdoor 2026. All rights reserved
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <button onClick={() => navigate('/privacy-policy' as any)} className="text-black dark:text-gray-400 hover:text-primary text-sm md:text-base transition-colors underline-offset-4 hover:underline font-rubik font-light">Privacy Policy</button>
            <button onClick={() => navigate('/terms-of-service' as any)} className="text-black dark:text-gray-400 hover:text-primary text-sm md:text-base transition-colors underline-offset-4 hover:underline font-rubik font-light">Terms of Service</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default DashboardFooter;
