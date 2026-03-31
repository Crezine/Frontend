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
      icon: <RiGlobalLine size={40} />,
      color: "bg-blue-500"
    },
    {
      title: "The Creative Wallet",
      desc: "Store your value in digital dollars to protect against inflation. Convert to local currency only when you need to.",
      icon: <RiWallet3Line size={40} />,
      color: "bg-purple-500"
    },
    {
      title: "Milestone Escrow",
      desc: "Funds are locked safely at the start of a project. They release automatically as you hit your creative milestones.",
      icon: <RiShieldUserLine size={40} />,
      color: "bg-emerald-500"
    },
    {
      title: "Instant Invoicing",
      desc: "Generate professional, brand-ready invoices in seconds. No more messy PDF templates or manual tracking.",
      icon: <RiBillLine size={40} />,
      color: "bg-orange-500"
    },
    {
      title: "Ticketing & Events",
      desc: "Sell tickets to your exhibitions, workshops, or shows directly. Manage guestlists and revenue in one place.",
      icon: <RiCalendarEventLine size={40} />,
      color: "bg-pink-500"
    },
    {
      title: "Growth Analytics",
      desc: "Understand where your money is coming from. Track client retention and project profitability with ease.",
      icon: <RiLineChartLine size={40} />,
      color: "bg-cyan-500"
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
    hidden: { opacity: 0, y: 30 },
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
        <section className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary leading-tight mb-6 tracking-tighter">
              Everything you need to <span className="text-primary">prosper.</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-black font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Crezine replaces your fragmented tools with one cohesive financial ecosystem built specifically for the creative workflow.
          </motion.p>
        </section>

        {/* Features Grid */}
        <section className="w-full max-w-7xl mx-auto mb-32">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="bg-white p-10 rounded-[40px] flex flex-col h-full shadow-sm hover:shadow-xl transition-all border-2 border-secondary group"
              >
                <div className={`${feature.color} w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-secondary mb-4 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-base text-black font-montserrat font-normal leading-relaxed opacity-80">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Integration Callout Section */}
        <section className="w-full max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-secondary text-accent p-8 md:p-16 rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-12"
          >
            <div className="relative z-10 lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-rubik font-normal mb-6 tracking-tighter leading-tight">
                Works where <br /> you work.
              </h2>
              <p className="text-lg font-montserrat font-normal leading-relaxed opacity-90 mb-8 max-w-md">
                Seamlessly integrate your Crezine cashdoor with your existing workflow. From Instagram shops to professional portfolio sites.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Social Commerce', 'Direct Links', 'Embedded Checkout', 'API Access'].map(tag => (
                  <span key={tag} className="bg-white/10 px-4 py-2 rounded-full text-xs font-montserrat font-bold border border-white/20 whitespace-nowrap">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative z-10 lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-primary aspect-square rounded-[32px] p-6 flex flex-col justify-between shadow-lg hover:rotate-2 transition-transform">
                <RiBillLine size={32} />
                <p className="font-montserrat font-bold text-sm md:text-lg leading-tight">Professional Invoicing</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md aspect-square rounded-[32px] p-6 flex flex-col justify-between border border-white/10 hover:-rotate-2 transition-transform">
                <RiSecurePaymentLine size={32} />
                <p className="font-montserrat font-bold text-sm md:text-lg leading-tight">Secure Payouts</p>
              </div>
              <div className="bg-white/5 backdrop-blur-md aspect-square rounded-[32px] p-6 flex flex-col justify-between border border-white/10 hover:-rotate-2 transition-transform">
                <RiGlobalLine size={32} />
                <p className="font-montserrat font-bold text-sm md:text-lg leading-tight">Global Reach</p>
              </div>
              <div className="bg-emerald-500 aspect-square rounded-[32px] p-6 flex flex-col justify-between shadow-lg hover:rotate-2 transition-transform">
                <RiWallet3Line size={32} />
                <p className="font-montserrat font-bold text-sm md:text-lg leading-tight">USD Savings</p>
              </div>
            </div>
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default FeaturesView;
