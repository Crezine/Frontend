import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaYoutube, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import BrandLogo from './BrandLogo';
import { AppView } from '../types';

interface FooterProps {
  navigate?: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-accent pt-10 pb-8 text-black overflow-hidden border-t border-secondary/5 font-rubik font-light">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl font-rubik font-light">
        
        {/* Join The Movement Card - Maroon, Curved, Compact */}
        <div className="bg-secondary text-white rounded-[40px] p-8 md:p-12 mb-16 text-center max-w-5xl mx-auto shadow-2xl relative overflow-hidden font-rubik font-light">
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl mb-4 tracking-tighter font-rubik font-light">Join The Movement!</h2>
            <p className="text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed opacity-90 font-rubik font-light">
              Crezine is the infrastructure for modern creativity.
              We provide tools to get paid, Manage creative gigs Safely and grow your
              Creative Business Globally without any financial friction!
            </p>
            <div className="flex flex-col items-center gap-4">
              <p className="text-base md:text-lg opacity-80 font-rubik font-light">
                One Link to Rule Your Creative Ecosystem
              </p>
              <button 
                onClick={() => navigate('/onboarding' as any)}
                className="bg-white text-secondary px-8 py-3.5 rounded-full text-base hover:scale-105 transition-all shadow-xl shadow-black/10 active:scale-95 font-rubik font-light"
              >
                Create Your Cashdoor
              </button>
            </div>
          </div>
          {/* Subtle background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>
        </div>

        {/* Footer Main Content */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24 mb-16 font-rubik font-light">
          
          {/* Column 1: Left - Logo, Text, Follow Us */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 lg:max-w-xs w-full lg:w-auto font-rubik font-light">
            <div className="flex items-center gap-2">
                <BrandLogo onClick={() => navigate('/')} isLarge={false} />
            </div>
            <p className="text-black text-sm md:text-base leading-relaxed font-rubik font-light">
              Empowering Creatives Worldwide with the ultimate
              Global Cashdoor. Get paid safely for your long distance
              creative gigs through our ESCROW system,
            </p>
            <div className="pt-2">
              <h4 className="font-bold text-black mb-4 text-sm font-rubik font-light">Follow us:</h4>
              <div className="flex space-x-6">
                <a href="#" className="text-black hover:text-primary transition-all text-xl" aria-label="YouTube"><FaYoutube /></a>
                <a href="https://www.instagram.com/crezine_/" className="text-black hover:text-primary transition-all text-xl" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://x.com/KevinKirat25622" className="text-black hover:text-primary transition-all text-xl" aria-label="Twitter"><FaTwitter /></a>
              </div>
            </div>
          </div>

          {/* Right Columns Container - Pushed to Right and Grouped Closely */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row lg:justify-end gap-10 sm:gap-12 lg:gap-10 xl:gap-16 w-full lg:w-auto lg:ml-auto lg:pt-8 font-rubik font-light">
            
            {/* Column 2: Company */}
            <div className="flex flex-col items-start space-y-4 lg:space-y-6 min-w-[130px]">
              <h3 className="font-bold text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 w-full sm:max-w-[70px] font-rubik font-light">Company</h3>
              <ul className="space-y-3 lg:space-y-4">
                <li><button onClick={() => navigate('/contact' as any)} className="text-black hover:text-primary text-sm md:text-base transition-colors font-rubik font-light">Contact Us</button></li>
                <li><button onClick={() => navigate('/about' as any)} className="text-black hover:text-primary text-sm md:text-base transition-colors font-rubik font-light">About Us</button></li>
                <li><button onClick={() => navigate('/features' as any)} className="text-black hover:text-primary text-sm md:text-base transition-colors font-rubik font-light">Use Case</button></li>
                <li><button onClick={() => navigate('/community' as any)} className="text-black hover:text-primary text-sm md:text-base transition-colors font-rubik font-light">Community</button></li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div className="flex flex-col items-start space-y-4 lg:space-y-6 min-w-[130px]">
              <h3 className="font-bold text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 w-full sm:max-w-[70px] font-rubik font-light">Support</h3>
              <ul className="space-y-3 lg:space-y-4">
                <li><button onClick={() => navigate('/help-center' as any)} className="text-black hover:text-primary text-sm md:text-base transition-colors font-rubik font-light">Help Centre</button></li>
                <li><button className="text-black hover:text-primary text-sm md:text-base transition-colors font-rubik font-light">Feedback</button></li>
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="flex flex-col items-start space-y-4 lg:space-y-6 min-w-[200px] sm:col-span-2 md:col-span-1">
              <h3 className="font-bold text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 w-full sm:max-w-[120px] font-rubik font-light">Contact Us</h3>
              <ul className="space-y-5 lg:space-y-6 w-full">
                <li className="flex items-center gap-4 group">
                  <div className="bg-primary/10 p-2.5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <FaPhoneAlt className="text-[10px]" />
                  </div>
                  <span className="text-black text-sm md:text-base font-rubik font-light">0702862705</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="bg-primary/10 p-2.5 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <FaEnvelope className="text-[10px]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black/60 text-[9px] uppercase tracking-wider font-rubik font-light">Email us</span>
                    <span className="text-black text-sm md:text-base break-all font-rubik font-light">crezinecashdoor@gmail.com</span>
                  </div>
                </li>
                <li className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('whatsapp' as any)}>
                  <div className="bg-primary/10 p-2.5 rounded-full text-primary group-hover:bg-green-500 group-hover:text-white transition-all shadow-sm">
                    <FaWhatsapp className="text-xs" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black/60 text-[9px] uppercase tracking-wider font-rubik font-light">Feedback</span>
                    <span className="text-black text-sm md:text-base group-hover:text-primary transition-colors font-rubik font-light">Click to Get Help</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright and Links */}
        <div className="pt-10 border-t border-secondary/10 flex flex-col md:flex-row justify-between items-center gap-8 font-rubik font-light">
          <p className="text-black text-sm md:text-base text-center md:text-left font-rubik font-light">
            CrezineCashdoor 2026. All rights reserved
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <button onClick={() => navigate('/privacy-policy' as any)} className="text-black hover:text-primary text-sm md:text-base transition-colors underline-offset-4 hover:underline font-rubik font-light">Privacy Policy</button>
            <button onClick={() => navigate('/terms-of-service' as any)} className="text-black hover:text-primary text-sm md:text-base transition-colors underline-offset-4 hover:underline font-rubik font-light">Terms of Service</button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;