import React from 'react';
import { motion } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';
import { RiBookOpenLine, RiQuestionLine, RiShieldKeyholeLine, RiMoneyDollarCircleLine } from 'react-icons/ri';

interface HelpCenterProps {
  navigate: (view: AppView) => void;
}

const HelpCenterView: React.FC<HelpCenterProps> = ({ navigate }) => {
  const categories = [
    {
      title: "Getting Started",
      icon: <RiBookOpenLine size={32} />,
      links: ["Creating your account", "Setting up your wallet", "Verifying your identity"],
      color: "bg-blue-500"
    },
    {
      title: "Payments & Fees",
      icon: <RiMoneyDollarCircleLine size={32} />,
      links: ["How to create an invoice", "Receiving payments", "Transaction fees"],
      color: "bg-emerald-500"
    },
    {
      title: "Security & Escrow",
      icon: <RiShieldKeyholeLine size={32} />,
      links: ["How does escrow work?", "Dispute resolution", "Account security"],
      color: "bg-purple-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-accent min-h-screen overflow-x-hidden flex flex-col">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-1 flex flex-col px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary leading-tight mb-6 tracking-tighter">
              Help <span className="text-primary">Center</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-black font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Everything you need to know about using Crezine to power your creative business. Find guides, tutorials, and support articles.
          </motion.p>
        </section>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto w-full mb-24"
        >
          <div className="relative group">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-8 py-6 rounded-[32px] border-none focus:ring-2 focus:ring-primary transition-all font-montserrat font-normal text-lg shadow-sm outline-none bg-white"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white p-4 rounded-2xl hover:bg-secondary transition-all shadow-lg">
              <RiQuestionLine size={24} />
            </button>
          </div>
        </motion.div>

        {/* Categories Grid */}
        <section className="w-full max-w-6xl mx-auto mb-24">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-8"
          >
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="bg-white p-10 rounded-[40px] border border-secondary/30 hover:shadow-xl transition-all"
              >
                <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-md`}>
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-secondary mb-6">{cat.title}</h3>
                <ul className="space-y-4">
                  {cat.links.map((link, index) => (
                    <li key={index}>
                      <button className="text-black/70 hover:text-primary transition font-montserrat font-normal flex items-center gap-3 group">
                        <span className="w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary transition-colors"></span>
                        {link}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Support Callout */}
        <section className="max-w-5xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-secondary text-accent rounded-[48px] p-12 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-rubik font-normal mb-6 tracking-tighter">Can't find what you're looking for?</h2>
              <p className="text-lg font-montserrat font-normal mb-10 opacity-80 max-w-xl mx-auto">
                Our support team is available 24/7 to help you with any issues or questions about our platform.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('contact')}
                className="bg-primary text-white font-montserrat font-bold py-5 px-12 rounded-2xl text-lg hover:bg-white hover:text-secondary transition-all shadow-xl shadow-black/10"
              >
                Contact Support
              </motion.button>
            </div>
            
            {/* Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 rounded-full blur-[100px] -z-0"></div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default HelpCenterView;
