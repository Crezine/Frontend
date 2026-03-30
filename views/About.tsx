import React from 'react';
import { motion } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';

interface AboutProps {
  navigate: (view: AppView) => void;
}

const About: React.FC<AboutProps> = ({ navigate }) => {
  const cards = [
    {
      number: "01",
      title: "Global Creative Cashdoor",
      description: "Receive and Transact with Global clients through a fast, secure multicurrency digital creative wallet."
    },
    {
      number: "02",
      title: "Escrow Protection",
      description: "Manage Escrow protected Creative Gigs. Funds are held safely until work is completed and approved."
    },
    {
      number: "03",
      title: "Ticketing",
      description: "Sell and track your ticket sales through your wallet Dashboard keeping you as the creative in the loop."
    },
    {
      number: "04",
      title: "Residencies & Fund Access",
      description: "Discover Residencies and Creative Funds curated specifically for powering and boosting your creative career."
    }
  ];

  const values = [
    {
      title: "Trust",
      description: "We build systems that protect both creators and clients, ensuring every transaction is transparent and secure."
    },
    {
      title: "Innovation",
      description: "Constantly evolving our tools to match the dynamic needs of the global creative economy."
    },
    {
      title: "Community",
      description: "Fostering a space where creators can thrive, connect, and grow their professional careers."
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
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const GetStartedSection = () => {
    const steps = [
      {
        num: "01",
        text: "Sign up with email, Google or Phone number",
        offset: "lg:-ml-12"
      },
      {
        num: "02",
        text: "Open your Cashdoor to set up your ESCROW and manage and transact Globally fast, easy and simple",
        offset: "lg:ml-8"
      },
      {
        num: "03",
        text: "Share ESCROW integrated payment links with Global Clients and get paid safely across borders",
        offset: "lg:ml-8"
      },
      {
        num: "04",
        text: "Ticket your events and access residencies and creative funding and grants through one super wallet",
        offset: "lg:-ml-12"
      }
    ];
  
    return (
      <section className="py-20 md:py-32 bg-accent overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          
          <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-0">
            
            {/* Left Side: Title & Image Container */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 flex flex-col items-center lg:items-start relative z-10"
            >
              <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-rubik font-normal tracking-tighter leading-[1.1] mb-4">
                  <span className="text-secondary">Get Started In</span><br />
                  <span className="text-primary">Seconds!</span>
                </h2>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-sm md:max-w-md lg:max-w-lg mt-auto"
              >
                <img 
                  src="/get-started.png" 
                  alt="Get Started with Crezine" 
                  className="relative z-10 w-full h-auto object-contain"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 rounded-full blur-[60px] -z-10"></div>
              </motion.div>
            </motion.div>

            {/* Right Side: Steps - Following the bulge */}
            <div className="w-full lg:w-1/2 lg:pl-4 flex flex-col justify-between relative z-10 py-4">
              {/* Connecting Line - Curved SVG to follow the bulge */}
              <div className="absolute left-[33px] md:left-[39px] lg:-left-20 top-10 bottom-10 w-48 hidden lg:block z-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d="M 20 5 C 80 15 80 85 20 95"
                    stroke="#AB3625"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Mobile/Tablet Straight Line */}
              <div className="absolute left-[30px] md:left-[39px] top-10 bottom-10 w-px border-l border-dashed border-secondary/30 lg:hidden"></div>

              <div className="flex flex-col h-full justify-between space-y-12 lg:space-y-0">
                {steps.map((step, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + (idx * 0.1) }}
                    className={`flex items-center gap-4 md:gap-6 group ${step.offset}`}
                  >
                    {/* White fill with maroon border circle - INCREASED SIZE */}
                    <div className="flex-shrink-0 w-14 h-14 md:w-18 md:h-18 bg-white border-2 border-secondary rounded-full flex items-center justify-center text-secondary font-montserrat font-normal text-xl md:text-3xl group-hover:bg-secondary group-hover:text-white transition-all duration-300 shadow-md relative z-20">
                      {step.num}
                    </div>
                    <div className="flex-grow max-w-sm">
                      <p className="text-xs md:text-sm lg:text-base text-black font-montserrat font-normal leading-snug">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="bg-accent min-h-screen overflow-x-hidden flex flex-col">
      <PublicHeader />
      
      <main className="flex-1 flex flex-col px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary leading-tight mb-6 tracking-tighter">
              Everything You need to know about us
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-black font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Powerful tools built exclusively for the Creative hustle, redefined and simplified to suit you.
          </motion.p>
        </section>

        <GetStartedSection />

        {/* Core Pillars Cards Grid */}
        <section className="w-full max-w-6xl mx-auto mb-24">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="bg-white p-8 rounded-[32px] flex flex-col items-center text-center h-full shadow-sm hover:shadow-lg transition-all border-2 border-secondary"
              >
                <div className="text-4xl md:text-5xl font-montserrat font-medium text-secondary mb-6 tracking-widest">
                  {card.number}
                </div>
                <h3 className="text-xl font-montserrat font-bold text-primary mb-3 tracking-tight leading-tight capitalize">
                  {card.title}
                </h3>
                <p className="text-base text-black font-montserrat font-normal leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section className="max-w-5xl mx-auto mb-24 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-secondary text-accent p-10 rounded-[40px] shadow-xl"
          >
            <h2 className="text-3xl font-montserrat font-bold mb-6">Our Mission</h2>
            <p className="text-lg font-montserrat font-normal leading-relaxed opacity-90">
              To bridge the gap between creative talent and global opportunities by providing a seamless, secure, and empowering financial infrastructure tailored specifically for creators.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-montserrat font-bold text-black mb-6">Our Vision</h2>
            <p className="text-lg font-montserrat font-normal text-black/80 leading-relaxed">
              We envision a world where every creative professional, regardless of their location, has access to the tools they need to manage their finances, protect their work, and scale their impact globally.
            </p>
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="w-full max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl font-montserrat font-bold text-black text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-8 h-8 bg-primary rounded-full" />
                </div>
                <h4 className="text-xl font-montserrat font-bold text-black mb-3">{value.title}</h4>
                <p className="text-black/70 font-montserrat font-normal">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
