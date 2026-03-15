import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import TrustSection from '../components/TrustSection';
import { motion } from 'framer-motion';
import { PiWhatsappLogoThin } from "react-icons/pi";

const LandingView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const splitText = (text: string, prefix: string) => {
    return text.split('').map((char, index) => (
      <motion.span 
        key={`${prefix}-${index}`} 
        variants={letterVariant}
        style={{ display: 'inline-block', minWidth: char === ' ' ? '0.25em' : 'auto' }}
      >
        {char}
      </motion.span>
    ));
  };

  return (
    <div className="bg-accent font-rubik relative">
      <PublicHeader />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-28 pb-12 md:pt-20 md:pb-16 flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 overflow-hidden">
          <div className="w-full lg:w-1/2 xl:w-3/5 text-left flex flex-col items-start relative z-10 lg:pt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/40 backdrop-blur-sm rounded-full py-1.5 px-5 inline-block mb-4 md:mb-6 border border-secondary/10"
            >
              <p className="text-xs sm:text-sm md:text-base text-black font-rubik font-light tracking-wide">
                Your global cashdoor for creative dreams.
              </p>
            </motion.div>
            <motion.h1 
              variants={sentence}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal tracking-tighter mb-4 md:mb-6 leading-tight"
            >
              <span className="text-black">
                  {splitText('The Global', 'global')}
              </span>{' '}
              <span className="text-primary">
                  {splitText('Creative', 'creative')}
              </span>
              <br />
              <span className="text-black">
                  {splitText('Cashdoor', 'cashdoor')}
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base md:text-lg text-black font-montserrat font-normal mb-6 md:mb-8 max-w-2xl leading-relaxed"
            >
              Secure Global payments for Creatives, Transact across the world Simple and Easy,
              Sell Experiences, Ticket Events and access creative fund and residencies
              all Behind One Cashdoor.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start justify-start gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('onboarding' as AppView)}
                className="bg-secondary text-white font-normal font-montserrat uppercase tracking-tight px-8 py-3 rounded-full text-sm transition-all duration-300 hover:bg-secondary/90 hover:shadow-xl hover:shadow-secondary/30 active:scale-95 transform whitespace-nowrap"
              >
                Create Your Cashdoor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('features' as AppView)}
                className="bg-white text-secondary border-2 border-secondary font-normal font-montserrat uppercase tracking-tight px-8 py-3 rounded-full text-sm transition-all duration-300 hover:bg-secondary/5 active:scale-95 transform whitespace-nowrap"
              >
                Explore Features
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side Image - Creative Mobile Display */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full lg:w-1/2 xl:w-2/5 flex justify-center lg:justify-end relative mt-16 lg:mt-0"
          >
            <div className="relative">
              {/* Static glow effects for visual depth */}
              <div 
                className="absolute -top-10 -right-10 w-48 h-48 md:w-64 md:h-64 bg-primary/20 rounded-full blur-[60px] md:blur-[80px] -z-10 opacity-40"
              />
              <div 
                className="absolute -bottom-10 -left-10 w-48 h-48 md:w-64 md:h-64 bg-secondary/10 rounded-full blur-[60px] md:blur-[80px] -z-10 opacity-30"
              />
              
              {/* The Mobile Image - One-time entrance only - INCREASED SIZE */}
              <div className="relative z-10">
                <img 
                  src="/mobile.png" 
                  alt="Crezine Mobile App" 
                  className="w-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[450px] xl:max-w-[500px] h-auto drop-shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* Floating UI Elements (Montserrat Regular) */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, -10, 0] 
                }}
                viewport={{ once: true }}
                transition={{ 
                  x: { delay: 0.8, duration: 0.6 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -right-2 md:-right-8 top-[15%] md:top-1/4 bg-white/90 backdrop-blur-md p-2.5 md:p-4 rounded-2xl shadow-xl border border-secondary/10 z-20 flex items-center gap-2 md:gap-3 origin-right scale-[0.85] md:scale-100"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  <span className="text-xs md:text-sm font-bold font-montserrat">$</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-xs text-black/50 font-montserrat font-normal uppercase tracking-tighter">Received</span>
                  <span className="text-xs md:text-sm text-black font-normal font-montserrat">Global Payment</span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0,
                  y: [0, 10, 0] 
                }}
                viewport={{ once: true }}
                transition={{ 
                  x: { delay: 1, duration: 0.6 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
                }}
                className="absolute -left-2 md:-left-12 bottom-[15%] md:bottom-1/4 bg-white/90 backdrop-blur-md p-2.5 md:p-4 rounded-2xl shadow-xl border border-secondary/10 z-20 flex items-center gap-2 md:gap-3 origin-left scale-[0.85] md:scale-100"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 bg-secondary/20 rounded-full flex items-center justify-center text-secondary">
                   <span className="text-xs md:text-sm font-bold font-montserrat">✓</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-xs text-black/50 font-montserrat font-normal uppercase tracking-tighter">Verified</span>
                  <span className="text-xs md:text-sm text-black font-normal font-montserrat">Escrow Protected</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Trust Section */}
        <TrustSection />

        {/* About Us Section */}
        <section className="py-20 md:py-28 container mx-auto px-6 flex flex-col justify-center">
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl lg:text-6xl font-rubik font-normal text-secondary leading-tight mb-6 tracking-tighter"
            >
              Everything You need to know about us
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-base text-black/70 font-rubik font-normal leading-relaxed max-w-2xl mx-auto"
            >
              Powerful tools built exclusively for the Creative hustle, redefined and simplified to suite you
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {[
              {
                num: "01",
                title: "Global Creative Cashdoor",
                desc: "Receive and Transact with Global clients through a fast, secure multicurrency digital creative wallet."
              },
              {
                num: "02",
                title: "Escrow Protection",
                desc: "Carry and Manage Escrow protected Creative Gigs. Funds are held safely until work is completed and approved."
              },
              {
                num: "03",
                title: "Ticketing",
                desc: "Sell and track your ticket sales through your wallet Dashboard keeping you as the creative in the loop."
              },
              {
                num: "04",
                title: "Residencies & Funds",
                desc: "Discover Residencies and Creative Funds curated specifically for powering and boosting your creative career."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, translateY: -3 }}
                className="bg-white p-8 md:p-10 rounded-[32px] flex flex-col items-center text-center h-full shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-secondary"
              >
                <div className="text-4xl md:text-5xl font-montserrat font-medium text-secondary mb-6 tracking-widest">{item.num}</div>
                <h3 className="text-lg md:text-xl font-bold text-primary mb-4 tracking-tight font-rubik leading-tight capitalize">{item.title}</h3>
                <p className="text-base md:text-lg text-black font-montserrat font-normal leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Get Started Steps Section */}
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
                  {[
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
                  ].map((step, idx) => (
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

        {/* Community / Story Sharing Section */}
        <section className="py-12 lg:py-0 bg-accent overflow-hidden relative lg:h-[600px] flex items-stretch">
          {/* Desktop Only: Image on Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block absolute top-0 right-0 w-[40%] h-full z-0"
          >
            <img 
              src="/art.png" 
              alt="Creative Art" 
              className="w-full h-full object-cover opacity-90"
            />
          </motion.div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col justify-between py-10 lg:py-16 w-full">
            {/* Top: Header - Strictly 3 Lines, Bold */}
            <div className="w-full lg:w-2/3 text-center lg:text-left mb-8 lg:mb-0">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-2xl md:text-4xl lg:text-5xl font-montserrat font-medium leading-[1.2] tracking-tighter"
              >
                <span className="text-secondary block">Would you like to share your</span>
                <span className="block mt-1">
                  <span className="text-yellow-500 italic">story</span> 
                  <span className="text-secondary"> as a Creative and be</span>
                </span>
                <span className="text-secondary block mt-1">
                  part of our <span className="text-primary">Community?</span>
                </span>
              </motion.h2>
            </div>

            {/* Middle: Mobile/Tablet Image - Shorter */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:hidden flex justify-center my-8"
            >
              <div className="relative w-full max-w-[280px]">
                 <img 
                  src="/art.png" 
                  alt="Creative Art" 
                  className="w-full h-auto object-cover rounded-[30px]"
                />
              </div>
            </motion.div>

            {/* Bottom: Contact Details - One line email */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mt-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white px-6 py-3 rounded-full border border-secondary/10 inline-flex items-center gap-2 mb-6 shadow-sm hover:shadow-md transition-all whitespace-nowrap overflow-hidden"
              >
                <span className="text-black font-montserrat font-normal text-xs sm:text-sm md:text-base">Email Us: </span>
                <a href="mailto:crezinecashdoor@gmail.com" className="text-secondary font-montserrat font-normal text-xs sm:text-sm md:text-base hover:underline transition-all">
                  crezinecashdoor@gmail.com
                </a>
              </motion.div>

              <motion.a
                href="https://whatsapp.com/channel/0029Vb7BP3aDJ6GyeKfw2u18"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center gap-4 group cursor-pointer"
              >
                <div className="flex-shrink-0 text-[#25D366] transition-all duration-500 group-hover:scale-110">
                  <PiWhatsappLogoThin size={56} />
                </div>
                <div className="flex flex-col text-center lg:text-left">
                  <h4 className="text-lg md:text-xl font-bold text-black font-montserrat font-normal">Join our Whatsapp channel</h4>
                  <p className="text-xs md:text-sm text-black/80 font-montserrat font-normal max-w-md">
                    Connect and share your work with other Creatives globally.
                  </p>
                </div>
              </motion.a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingView;
