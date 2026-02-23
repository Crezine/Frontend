import React from 'react';
import BrandLogo from './BrandLogo';
import { AppView } from '../types';
import { SiInstagram, SiTiktok } from 'react-icons/si';
import { PiWhatsappLogoLight } from 'react-icons/pi';
import { RiTwitterXLine } from 'react-icons/ri';

const Footer: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  const productLinks = [
    { label: 'Features', view: 'features' as AppView },
    { label: 'Pricing', view: 'pricing' as AppView },
    { label: 'Escrow', view: 'escrow' as AppView },
  ];

  const supportLinks = [
    { label: 'Help Center', view: 'help' as AppView },
    { label: 'Contact Us', view: 'contact' as AppView },
    { label: 'WhatsApp', view: 'whatsapp' as AppView },
  ];

  const socialLinks = [
    { label: 'Instagram', view: 'instagram' as AppView, icon: <SiInstagram size={20} /> },
    { label: 'TikTok', view: 'tiktok' as AppView, icon: <SiTiktok size={20} /> },
    { label: 'WhatsApp', view: 'whatsapp' as AppView, icon: <PiWhatsappLogoLight size={24} /> },
    { label: 'Twitter', view: 'twitter' as AppView, icon: <RiTwitterXLine size={20} /> },
  ];

  return (
    <footer className="bg-accent text-secondary font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          <div className="lg:col-span-4">
            <BrandLogo onClick={() => navigate('landing' as AppView)} />
            <p className="text-secondary/70 mt-4 text-sm leading-relaxed">
              The ultimate global cashdoor for creators. Get paid, showcase your work, and grow your business securely from anywhere in the world.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex justify-between md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary/80 mb-4">Product</h3>
                  <ul className="space-y-3">
                    {productLinks.map(link => (
                      <li key={link.label}>
                        <button onClick={() => navigate(link.view)} className="text-secondary/70 hover:text-primary transition-colors text-sm">
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-primary/80 mb-4">Support</h3>
                  <ul className="space-y-3">
                    {supportLinks.map(link => (
                      <li key={link.label}>
                        <button onClick={() => navigate(link.view)} className="text-secondary/70 hover:text-primary transition-colors text-sm">
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary/80 mb-4">Stay Updated</h3>
                <p className="text-secondary/70 text-sm mb-4">Join our newsletter for the latest updates and features.</p>
                <form action="#" className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="bg-white/5 border border-secondary/20 rounded-md py-2 px-3 text-sm w-full focus:ring-1 focus:ring-primary focus:border-primary transition-all" 
                  />
                  <button type="submit" className="bg-primary text-white font-bold text-sm px-4 py-2 rounded-md hover:bg-primary/90 transition-all active:scale-95">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-secondary/10 flex flex-col-reverse sm:flex-row items-center justify-between">
          <p className="text-secondary/50 text-xs mt-4 sm:mt-0">
            &copy; {new Date().getFullYear()} Crezine. All rights reserved.
          </p>
          <div className="flex items-center space-x-5">
            {socialLinks.map(link => (
              <a key={link.label} href="#" onClick={() => navigate(link.view)} className="text-secondary/60 hover:text-primary transition-colors">
                <span className="sr-only">{link.label}</span>
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
