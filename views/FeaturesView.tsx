import React from 'react';
import { motion } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';
import { 
  RiSecurePaymentLine, 
  RiWallet3Line, 
  RiBillLine, 
  RiCalendarEventLine, 
  RiShieldUserLine, 
  RiLineChartLine, 
  RiGlobalLine 
} from 'react-icons/ri';

interface FeaturesProps {
  navigate: (view: AppView) => void;
}

const FeaturesView: React.FC<FeaturesProps> = ({ navigate }) => {
  const features = [
    {
      title: "Global Payments",
      desc: "Accept payments from 150+ countries. Your clients pay in their currency, you receive in yours (or USD).",
      icon: <RiGlobalLine size={28} />,
      color: "bg-blue-500"
    },
    {
      title: "The Creative Wallet",
      desc: "Store your value in digital dollars to protect against inflation. Convert to local currency only when you need to.",
      icon: <RiWallet3Line size={28} />,
      color: "bg-purple-500"
    },
    {
      title: "Milestone Escrow",
      desc: "Funds are locked safely at the start of a project. They release automatically as milestones are hit.",
      icon: <RiShieldUserLine size={28} />,
      color: "bg-emerald-500"
    },
    {
      title: "Instant Invoicing",
      desc: "Generate professional, brand-ready invoices in seconds. No more messy PDF templates or manual tracking.",
      icon: <RiBillLine size={28} />,
      color: "bg-orange-500"
    },
    {
      title: "Ticketing & Events",
      desc: "Sell tickets to your exhibitions or shows directly. Manage guestlists and revenue in one place.",
      icon: <RiCalendarEventLine size={28} />,
      color: "bg-pink-500"
    },
    {
      title: "Growth Analytics",
      desc: "Understand where your money is coming from. Track client retention and project profitability with ease.",
      icon: <RiLineChartLine size={28} />,
      color: "bg-cyan-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-accent min-h-screen overflow-x-hidden flex flex-col">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-1 flex flex-col px-6 pt-28 md:pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-16 md:mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary leading-tight mb-6 tracking-tighter">
              Everything you need to <span className="text-primary">prosper.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-black font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Crezine replaces your fragmented tools with one cohesive financial ecosystem built specifically for the creative workflow.
          </motion.p>
        </section>

        {/* Features Grid */}
        <section className="w-full max-w-6xl mx-auto mb-20 md:mb-28">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.01, translateY: -3 }}
                className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[32px] flex flex-col h-full shadow-sm hover:shadow-md transition-all border border-secondary/30 md:border-secondary/20 group"
              >
                <div className={`${feature.color} w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-105 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg md:text-xl font-montserrat font-bold text-secondary mb-3 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-black font-montserrat font-normal leading-relaxed opacity-80">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Integration Callout Section */}
        <section className="w-full max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-transparent md:bg-secondary text-secondary md:text-accent p-6 md:p-12 rounded-[40px] md:shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 md:gap-12"
          >
            <div className="relative z-10 lg:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-rubik font-normal mb-4 md:mb-6 tracking-tighter leading-tight text-secondary md:text-white">
                Works where <br /> you work.
              </h2>
              <p className="text-base md:text-lg font-montserrat font-normal leading-relaxed text-black md:text-white opacity-90 mb-6 md:mb-8 max-w-md mx-auto md:mx-0">
                Seamlessly integrate your Crezine cashdoor with your existing workflow. From Instagram shops to professional portfolio sites.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                {['Social Commerce', 'Direct Links', 'Embedded Checkout', 'API Access'].map(tag => (
                  <span key={tag} className="bg-secondary/10 md:bg-white/10 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-montserrat font-bold border border-secondary/20 md:border-white/20 whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 lg:w-1/2 grid grid-cols-2 gap-3 md:gap-4 w-full">
              <div className="bg-primary text-white aspect-square rounded-[20px] md:rounded-[28px] p-4 md:p-6 flex flex-col justify-between shadow-lg hover:rotate-1 transition-transform">
                <RiBillLine size={24} className="md:size-[28px]" />
                <p className="font-montserrat font-bold text-xs md:text-base leading-tight">Professional Invoicing</p>
              </div>
              <div className="bg-white md:bg-white/5 border border-secondary/10 md:border-white/10 aspect-square rounded-[20px] md:rounded-[28px] p-4 md:p-6 flex flex-col justify-between hover:-rotate-1 transition-transform shadow-sm md:shadow-none">
                <RiSecurePaymentLine size={24} className="text-secondary md:text-inherit md:size-[28px]" />
                <p className="font-montserrat font-bold text-xs md:text-base leading-tight text-secondary md:text-white">Secure Payouts</p>
              </div>
              <div className="bg-white md:bg-white/5 border border-secondary/10 md:border-white/10 aspect-square rounded-[20px] md:rounded-[28px] p-4 md:p-6 flex flex-col justify-between hover:-rotate-1 transition-transform shadow-sm md:shadow-none">
                <RiGlobalLine size={24} className="text-secondary md:text-inherit md:size-[28px]" />
                <p className="font-montserrat font-bold text-xs md:text-base leading-tight text-secondary md:text-white">Global Reach</p>
              </div>
              <div className="bg-emerald-500 text-white aspect-square rounded-[20px] md:rounded-[28px] p-4 md:p-6 flex flex-col justify-between shadow-lg hover:rotate-1 transition-transform">
                <RiWallet3Line size={24} className="md:size-[28px]" />
                <p className="font-montserrat font-bold text-xs md:text-base leading-tight">USD Savings</p>
              </div>
            </div>
            
            {/* Background elements - Hidden on mobile */}
            <div className="hidden md:block absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -mr-24 -mt-24 blur-3xl opacity-40"></div>
            <div className="hidden md:block absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full -ml-24 -mb-24 blur-3xl opacity-40"></div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default FeaturesView;
