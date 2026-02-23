import React from 'react';
import BrandLogo from './BrandLogo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white font-montserrat pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <BrandLogo />
            </div>
            <p className="text-secondary/70 text-sm">
              Empowering creators worldwide with the ultimate global cashdoor. Get paid, showcase work, and grow your creative business securely.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-bold text-secondary mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary/70 hover:text-secondary transition">Features</a></li>
              <li><a href="#" className="text-secondary/70 hover:text-secondary transition">Pricing</a></li>
              <li><a href="#" className="text-secondary/70 hover:text-secondary transition">Escrow</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-bold text-secondary mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-secondary/70 hover:text-secondary transition">Help Center</a></li>
              <li><a href="#" className="text-secondary/70 hover:text-secondary transition">Contact Us</a></li>
              <li><a href="#" className="text-secondary/70 hover:text-secondary transition">WhatsApp</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-sm text-secondary/60">
          <p>© 2026 CREZINE. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-secondary transition">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
