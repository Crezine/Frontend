import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import BrandLogo from './BrandLogo';
import { AppView } from '../types';

interface DashboardFooterProps {
  navigate?: (view: AppView) => void;
}

const DashboardFooter: React.FC<DashboardFooterProps> = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-accent dark:bg-gray-900 py-12 text-black dark:text-gray-300 overflow-hidden font-montserrat font-normal transition-colors duration-300">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        
        {/* Footer Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-12">
          
          {/* Column 1: Left - Logo, Text, Follow Us */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 lg:max-w-xs w-full lg:w-auto">
            <div className="flex items-center gap-2">
                <BrandLogo onClick={() => navigate('/')} isLarge={false} />
            </div>
            <p className="text-sm md:text-base leading-relaxed opacity-70">
              Empowering Creatives Worldwide with the ultimate
              Global Cashdoor. Get paid safely for your long distance
              creative gigs through our ESCROW system.
            </p>
            <div className="pt-2">
              <h4 className="text-secondary dark:text-primary mb-4 text-xs uppercase tracking-widest font-normal">Follow us:</h4>
              <div className="flex space-x-6">
                <a href="#" className="text-black dark:text-gray-300 hover:text-primary transition-all text-xl" aria-label="YouTube"><FaYoutube /></a>
                <a href="https://www.instagram.com/crezine_/" className="text-black dark:text-gray-300 hover:text-primary transition-all text-xl" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://x.com/KevinKirat25622" className="text-black dark:text-gray-300 hover:text-primary transition-all text-xl" aria-label="Twitter"><FaTwitter /></a>
              </div>
            </div>
          </div>

          {/* Right Columns Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 w-full lg:w-auto lg:ml-auto lg:pt-8">
            
            {/* Column 2: Company */}
            <div className="flex flex-col items-start space-y-4 lg:space-y-6">
              <h3 className="text-secondary dark:text-primary text-sm md:text-base border-b border-primary/20 pb-1 w-fit font-normal">Company</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/community' as any)} className="hover:text-primary text-sm md:text-base transition-colors">Community</button></li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="flex flex-col items-start space-y-4 lg:space-y-6">
              <h3 className="text-secondary dark:text-primary text-sm md:text-base border-b border-primary/20 pb-1 w-fit font-normal">Support</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/help-center' as any)} className="hover:text-primary text-sm md:text-base transition-colors">Help Centre</button></li>
                <li><button className="hover:text-primary text-sm md:text-base transition-colors">Feedback</button></li>
              </ul>
            </div>

            {/* Column 4: Reach Out */}
            <div className="flex flex-col items-start space-y-4 lg:space-y-6 min-w-[200px]">
              <h3 className="text-secondary dark:text-primary text-sm md:text-base border-b border-primary/20 pb-1 w-fit font-normal">Reach Out</h3>
              <ul className="space-y-4 w-full">
                <li className="flex items-center gap-3 group">
                  <div className="bg-primary/5 p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FaPhoneAlt className="text-[10px]" />
                  </div>
                  <span className="text-sm md:text-base">0702862705</span>
                </li>
                <li className="flex items-center gap-3 group">
                  <div className="bg-primary/5 p-2 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FaEnvelope className="text-[10px]" />
                  </div>
                  <span className="text-sm md:text-base break-all">crezinecashdoor@gmail.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Links - Removed top border */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm opacity-50 text-center md:text-left">
            &copy; CrezineCashdoor 2026. All rights reserved
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <button onClick={() => navigate('/privacy-policy' as any)} className="hover:text-primary text-xs md:text-sm transition-colors hover:underline">Privacy Policy</button>
            <button onClick={() => navigate('/terms-of-service' as any)} className="hover:text-primary text-xs md:text-sm transition-colors hover:underline">Terms of Service</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default DashboardFooter;
