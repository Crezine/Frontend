import React from 'react';
import BrandLogo from './BrandLogo';
import { FaInstagram, FaWhatsapp, FaTwitter, FaTiktok } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent font-montserrat text-secondary pt-16 pb-24 md:pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Logo and Description */}
          <div className="lg:col-span-1 md:col-span-3 flex flex-col items-center md:items-start">
            <div className="mb-4">
              <BrandLogo />
            </div>
            <p className="text-secondary/70 text-sm max-w-xs">
              Empowering creators worldwide with the ultimate global cashdoor. Get paid, showcase work, and grow your creative business securely.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="md:col-start-1 lg:col-start-2 lg:col-span-1 flex flex-col items-center">
            <h3 className="font-bold text-secondary mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-secondary/70 hover:text-primary transition text-2xl"><FaInstagram /></a>
              <a href="#" className="text-secondary/70 hover:text-primary transition text-2xl"><FaWhatsapp /></a>
              <a href="#" className="text-secondary/70 hover:text-primary transition text-2xl"><FaTwitter /></a>
              <a href="#" className="text-secondary/70 hover:text-primary transition text-2xl"><FaTiktok /></a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-2 md:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-secondary mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-secondary/70 hover:text-primary transition">Features</a></li>
                <li><a href="#" className="text-secondary/70 hover:text-primary transition">Pricing</a></li>
                <li><a href="#" className="text-secondary/70 hover:text-primary transition">Escrow</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-secondary mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-secondary/70 hover:text-primary transition">Help Center</a></li>
                <li><a href="#" className="text-secondary/70 hover:text-primary transition">Contact Us</a></li>
                <li><a href="#" className="text-secondary/70 hover:text-primary transition">WhatsApp</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary/20 flex flex-col sm:flex-row justify-between items-center text-sm text-secondary/60">
          <p className="order-2 sm:order-1 mt-4 sm:mt-0">© 2026 CREZINE. All rights reserved.</p>
          <div className="order-1 sm:order-2 flex space-x-6">
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
