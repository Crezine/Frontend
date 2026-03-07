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
        number: "01",
        description: "Sign up with email, Google or Phone number",
      },
      {
        number: "02",
        description:
          "Open your Cashdoor to set up your ESCROW and manage and transact Globally fast, easy and simple",
      },
      {
        number: "03",
        description:
          "Share ESCROW intergrated payment links with Global Clients and get paid safely across borders",
      },
      {
        number: "04",
        description:
          "Ticket your events and access residencies and creative funding and grants through one super wallet.",
      },
    ];
  
    return (
      <section className="max-w-6xl mx-auto my-24 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          <h2 className="text-5xl font-rubik font-normal text-secondary leading-tight mb-6 tracking-tighter">
            Get Started
            <br />
            <span className="text-primary">In Seconds!</span>
          </h2>
          <img src="/get-started.png" alt="Get Started Illustration" className="rounded-lg" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 + 0.4 }}
              className="flex items-start"
            >
              <div className="flex-shrink-0 w-12 h-12 border-2 border-primary rounded-full text-primary flex items-center justify-center text-xl font-montserrat font-medium mr-6">
                {step.number}
              </div>
              <p className="text-secondary/80 font-rubik font-normal text-lg leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
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
            className="text-base md:text-lg text-secondary/80 font-rubik font-normal leading-relaxed max-w-2xl mx-auto mt-4"
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
                className="bg-white/50 backdrop-blur-sm border-2 border-secondary p-8 rounded-[32px] flex flex-col items-center text-center h-full shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-4xl md:text-5xl font-montserrat font-medium text-secondary mb-6 tracking-widest">
                  {card.number}
                </div>
                <h3 className="text-xl font-rubik font-normal text-primary mb-3 tracking-tight leading-tight capitalize">
                  {card.title}
                </h3>
                <p className="text-sm text-secondary/80 font-rubik font-normal leading-relaxed">
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
            <p className="text-lg font-rubik font-normal leading-relaxed opacity-90">
              To bridge the gap between creative talent and global opportunities by providing a seamless, secure, and empowering financial infrastructure tailored specifically for creators.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-montserrat font-bold text-secondary mb-6">Our Vision</h2>
            <p className="text-lg font-rubik font-normal text-secondary/80 leading-relaxed">
              We envision a world where every creative professional, regardless of their location, has access to the tools they need to manage their finances, protect their work, and scale their impact globally.
            </p>
          </motion.div>
        </section>

        {/* Values Section */}
        <section className="w-full max-w-6xl mx-auto mb-24">
          <h2 className="text-3xl font-montserrat font-bold text-secondary text-center mb-12">Our Values</h2>
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
                <h4 className="text-xl font-rubik font-normal text-secondary mb-3">{value.title}</h4>
                <p className="text-secondary/70 font-rubik font-normal">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-primary p-12 rounded-[48px] shadow-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-white mb-6">Ready to redefine your creative hustle?</h2>
            <p className="text-white/90 font-rubik font-normal text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already using Crezine to power their global careers.
            </p>
            <button
              onClick={() => navigate('onboarding')}
              className="bg-secondary text-white font-montserrat font-normal px-10 py-4 rounded-full text-lg hover:bg-secondary/90 transition-all transform hover:scale-105 shadow-lg"
            >
              Get Started Now
            </button>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default About;
