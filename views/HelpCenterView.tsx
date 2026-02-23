import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { RiBookOpenLine, RiQuestionLine, RiShieldKeyholeLine, RiMoneyDollarCircleLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const HelpCenterView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  const categories = [
    {
      title: "Getting Started",
      icon: <RiBookOpenLine size={32} />,
      links: ["Creating your account", "Setting up your wallet", "Verifying your identity"],
      color: "bg-blue-50"
    },
    {
      title: "Payments & Fees",
      icon: <RiMoneyDollarCircleLine size={32} />,
      links: ["How to create an invoice", "Receiving payments", "Transaction fees"],
      color: "bg-emerald-50"
    },
    {
      title: "Security & Escrow",
      icon: <RiShieldKeyholeLine size={32} />,
      links: ["How does escrow work?", "Dispute resolution", "Account security"],
      color: "bg-purple-50"
    }
  ];

  return (
    <div className="bg-[#F9F5F0] min-h-screen flex flex-col font-montserrat">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-secondary mb-6"
            >
              Help <span className="text-primary">Center</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-secondary/60 max-w-2xl mx-auto"
            >
              Everything you need to know about using CREZINE to power your creative business.
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto mb-20">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full px-8 py-5 rounded-[25px] border border-secondary/10 focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-montserrat text-lg shadow-sm"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-xl">
                <RiQuestionLine size={24} />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${cat.color} p-10 rounded-[40px] border border-secondary/5 hover:shadow-xl transition-all`}
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-6">{cat.title}</h3>
                <ul className="space-y-4">
                  {cat.links.map((link, index) => (
                    <li key={index}>
                      <button className="text-secondary/70 hover:text-primary transition font-medium flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 bg-secondary rounded-[40px] p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-white/70 mb-8">Our support team is available 24/7 to help you with any issues.</p>
            <button 
              onClick={() => navigate('contact')}
              className="bg-primary text-white font-bold py-4 px-10 rounded-2xl hover:scale-105 transition-transform"
            >
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenterView;
