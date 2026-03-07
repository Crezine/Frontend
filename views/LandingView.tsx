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
        <section className="container mx-auto px-6 pt-24 pb-16 md:pt-36 md:pb-24 flex flex-col items-start">
          <div className="w-full max-w-4xl text-left flex flex-col items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/40 backdrop-blur-sm rounded-full py-1.5 px-5 inline-block mb-6 border border-secondary/10"
            >
              <p className="text-xs sm:text-sm md:text-base text-black font-montserrat font-normal tracking-wide">
                Your global cashdoor for creative dreams.
              </p>
            </motion.div>
            <motion.h1 
              variants={sentence}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal tracking-tighter mb-6 leading-tight"
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
              className="text-base md:text-lg text-black font-montserrat font-normal mb-6 md:mb-10 max-w-2xl leading-relaxed"
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
        <section className="py-16 md:py-20 lg:py-0 bg-accent overflow-hidden relative lg:h-[600px] flex items-stretch">
          {/* Desktop Only: Image on Right - Reduced width and height impact */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden lg:block absolute top-0 right-0 w-[45%] h-full z-0"
          >
            <img 
              src="/art.png" 
              alt="Creative Art" 
              className="w-full h-full object-cover opacity-90"
            />
          </motion.div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col justify-between py-12 lg:py-20 w-full">
            {/* Top: Title in 3 Lines */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl font-rubik font-normal leading-[1.1] tracking-tighter"
              >
                <span className="text-secondary">Would you like to share your </span><br className="hidden lg:block" />
                <span className="text-yellow-400 font-medium">story</span> <span className="text-secondary">as a Creative and be </span><br className="hidden lg:block" />
                <span className="text-primary">part of our Community?</span>
              </motion.h2>
            </div>

            {/* Bottom Left: Contact Details */}
            <div className="w-full lg:w-1/2 mt-16 lg:mt-0 flex flex-col items-center lg:items-start">
              {/* Email section: White ovular background */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white px-8 py-3 rounded-full border border-secondary/10 inline-flex items-center gap-2 mb-8 shadow-sm"
              >
                <span className="text-black font-montserrat font-normal text-sm md:text-base">Email Us: </span>
                <a href="mailto:crezinecashdoor@gmail.com" className="text-secondary font-montserrat font-normal text-sm md:text-base hover:underline transition-all">
                  crezinecashdoor@gmail.com
                </a>
              </motion.div>

              {/* WhatsApp Section */}
              <motion.a
                href="https://whatsapp.com/channel/0029Vb7BP3aDJ6GyeKfw2u18"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 group cursor-pointer"
              >
                {/* PiWhatsappLogoThin - No background border, just the icon */}
                <div className="flex-shrink-0 text-[#25D366] transition-all duration-300 group-hover:scale-110">
                  <PiWhatsappLogoThin size={56} />
                </div>
                <div className="flex flex-col text-center lg:text-left">
                  <h4 className="text-lg md:text-xl font-bold text-black font-montserrat font-normal">Join our Whatsapp channel</h4>
                  <p className="text-xs md:text-sm lg:text-base text-black font-montserrat font-normal max-w-md leading-relaxed">
                    connect and share your work with other Creatives.
                  </p>
                </div>
              </motion.a>
            </div>

            {/* Mobile Only Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:hidden flex justify-center mt-10"
            >
              <div className="relative w-full max-w-sm">
                 <img 
                  src="/art.png" 
                  alt="Creative Art" 
                  className="relative z-10 w-full h-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingView;
