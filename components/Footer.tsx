import React from 'react';
import { useNavigate } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { FaInstagram, FaWhatsapp, FaTwitter, FaTiktok } from 'react-icons/fa';
import { AppView } from '../types';

interface FooterProps {
  navigate?: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-accent font-montserrat text-secondary pt-16 pb-24 md:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Logo and Description */}
          <div className="lg:col-span-1 md:col-span-3 flex flex-col items-center md:items-start">
            <div className="mb-4 cursor-pointer">
              <BrandLogo onClick={() => navigate('/')} />
            </div>
            <p className="text-secondary/70 text-sm max-w-xs">
              Empowering creators worldwide with the ultimate global cashdoor. Get paid, showcase work, and grow your creative business securely.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="md:col-start-1 lg:col-start-2 lg:col-span-1 flex flex-col items-center">
            <h3 className="font-bold text-secondary mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/crezine_/" className="text-secondary/70 hover:text-primary transition text-2xl" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://whatsapp.com/channel/0029Vb7BP3aDJ6GyeKfw2u18" className="text-secondary/70 hover:text-primary transition text-2xl" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
              <a href="https://x.com/KevinKirat25622" className="text-secondary/70 hover:text-primary transition text-2xl" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://www.tiktok.com/@crezine_" className="text-secondary/70 hover:text-primary transition text-2xl" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-2 md:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-secondary mb-4">Product</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/product')} className="text-secondary/70 hover:text-primary transition">Product</button></li>
                <li><button onClick={() => navigate('/features')} className="text-secondary/70 hover:text-primary transition">Features</button></li>
                <li><button onClick={() => navigate('/pricing')} className="text-secondary/70 hover:text-primary transition">Pricing</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-secondary mb-4">Support</h3>
              <ul className="space-y-3">
                <li><button onClick={() => navigate('/help-center')} className="text-secondary/70 hover:text-primary transition">Help Center</button></li>
                <li><button onClick={() => navigate('/contact')} className="text-secondary/70 hover:text-primary transition">Contact Us</button></li>
                <li><button onClick={() => navigate('/support')} className="text-secondary/70 hover:text-primary transition">Support</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary/20 flex flex-col sm:flex-row justify-between items-center text-sm text-secondary/60">
          <p className="order-2 sm:order-1 mt-4 sm:mt-0">© 2026 CREZINE. All rights reserved.</p>
          <div className="order-1 sm:order-2 flex space-x-6">
            <button className="hover:text-primary transition">Privacy Policy</button>
            <button className="hover:text-primary transition">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
