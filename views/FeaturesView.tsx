import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { RiSecurePaymentLine, RiWallet3Line, RiBillLine, RiCalendarEventLine, RiShieldUserLine, RiLineChartLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const FeaturesView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  const features = [
    {
      title: "Global Payments",
      desc: "Accept payments from 150+ countries. Your clients pay in their currency, you receive in yours (or USD).",
      icon: <RiSecurePaymentLine size={40} />,
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

  return (
    <div className="min-h-screen bg-accent font-montserrat">
      <PublicHeader navigate={navigate} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-secondary mb-6"
          >
            Everything you need to <span className="text-primary">prosper.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary/60 leading-relaxed"
          >
            CREZINE replaces your fragmented tools with one cohesive financial ecosystem built specifically for the creative workflow.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[40px] border border-secondary/5 hover:border-primary/20 transition-all group"
            >
              <div className={`${feature.color} w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold text-secondary mb-4">{feature.title}</h2>
              <p className="text-secondary/70 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Integration Section */}
        <section className="mt-32 bg-secondary rounded-[60px] p-12 md:p-20 text-white flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-black mb-6">Works where <br /> you work.</h2>
            <p className="text-white/70 text-lg mb-8">
              Seamlessly integrate your CREZINE cashdoor with your existing workflow. From Instagram shops to professional portfolio sites.
            </p>
            <div className="flex flex-wrap gap-4">
              {['Social Commerce', 'Direct Links', 'Embedded Checkout', 'API Access'].map(tag => (
                <span key={tag} className="bg-white/10 px-4 py-2 rounded-full text-sm font-bold border border-white/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-primary aspect-square rounded-[30px] p-8 flex flex-col justify-between shadow-xl">
               <RiBillLine size={40} />
               <p className="font-bold text-xl leading-tight">Professional Invoicing</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md aspect-square rounded-[30px] p-8 flex flex-col justify-between border border-white/10">
               <RiSecurePaymentLine size={40} />
               <p className="font-bold text-xl leading-tight">Secure Payouts</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md aspect-square rounded-[30px] p-8 flex flex-col justify-between border border-white/10">
               <RiGlobalLine size={40} />
               <p className="font-bold text-xl leading-tight">Global Reach</p>
            </div>
            <div className="bg-emerald-500 aspect-square rounded-[30px] p-8 flex flex-col justify-between shadow-xl">
               <RiWallet3Line size={40} />
               <p className="font-bold text-xl leading-tight">USD Savings</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FeaturesView;
