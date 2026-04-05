import React from 'react';
import { AppView } from '../types';
import { FiYoutube, FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";

interface ShopFooterProps {
  navigate: (view: AppView) => void;
  onCartOpen?: () => void;
}

const ShopFooter: React.FC<ShopFooterProps> = ({ navigate, onCartOpen }) => {
  return (
    <footer className="bg-secondary text-white py-12 px-4 sm:px-6 font-montserrat">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1: Menu */}
          <div className="flex flex-col items-start space-y-3">
            <h3 className="font-normal text-lg mb-1">Menu</h3>
            <button 
              onClick={() => navigate('landing')} 
              className="text-white hover:text-primary transition-colors text-sm font-normal"
            >
              Home
            </button>
            <button 
              onClick={onCartOpen || (() => navigate('shop'))} 
              className="text-white hover:text-primary transition-colors text-sm font-normal"
            >
              Shop
            </button>
          </div>

          {/* Column 2: More info */}
          <div className="flex flex-col items-start space-y-3">
            <h3 className="font-normal text-lg mb-1">More info</h3>
            <button 
              onClick={() => navigate('privacy-policy')} 
              className="text-white hover:text-primary transition-colors text-sm font-normal"
            >
              Privacy policy
            </button>
            <button 
              onClick={() => navigate('help-center')} 
              className="text-white hover:text-primary transition-colors text-sm font-normal"
            >
              Help center
            </button>
            <button 
              onClick={() => navigate('contact')} 
              className="text-white hover:text-primary transition-colors text-sm font-normal"
            >
              Contact
            </button>
          </div>

          {/* Column 3: Creatives socials */}
          <div className="flex flex-col items-start space-y-4">
            <h3 className="font-normal text-lg mb-1">Creatives socials</h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://youtube.com/@crezine_official" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all shadow-sm"
                title="Youtube"
              >
                <FiYoutube size={20} />
              </a>
              <a 
                href="https://x.com/CrezineCashdoor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
                title="X"
              >
                <FaXTwitter size={20} />
              </a>
              <a 
                href="https://instagram.com/crezinecashdoor" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all shadow-sm"
                title="Instagram"
              >
                <FiInstagram size={20} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all shadow-sm"
                title="Facebook"
              >
                <FiFacebook size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShopFooter;
