import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';

interface TermsOfServiceProps {
  navigate: (view: AppView) => void;
}

const TermsOfServiceView: React.FC<TermsOfServiceProps> = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Crezine, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our platform."
    },
    {
      title: "2. Platform Usage",
      content: "Crezine provides financial infrastructure specifically engineered for the creative economy. You agree to use the platform only for lawful purposes and in accordance with all applicable international and local laws and regulations."
    },
    {
      title: "3. User Responsibilities",
      content: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account or security breach."
    },
    {
      title: "4. Escrow and Payments",
      content: "All payments and escrow transactions are subject to our verification and security procedures. We reserve the right to hold or delay funds if we suspect fraudulent activity, money laundering, or any violation of our security protocols."
    },
    {
      title: "5. Intellectual Property",
      content: "All content, features, and functionality of the Crezine platform are the exclusive property of Crezine and its licensors. You may not copy, modify, or distribute any part of our software without explicit written permission."
    },
    {
      title: "6. Limitation of Liability",
      content: "Crezine is provided on an 'as is' and 'as available' basis. To the maximum extent permitted by law, Crezine shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform."
    }
  ];

  return (
    <div className="bg-accent min-h-screen overflow-x-hidden flex flex-col">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-1 flex flex-col px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary leading-tight mb-6 tracking-tighter">
              Terms of <span className="text-primary">Service</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-black font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Last updated: March 2026. Please read these terms carefully before using our global creative fintech infrastructure.
          </motion.p>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white p-8 md:p-16 rounded-[48px] shadow-xl space-y-12"
          >
            {sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-montserrat font-bold text-secondary tracking-tight">
                  {section.title}
                </h2>
                <p className="text-base md:text-lg text-black font-montserrat font-normal leading-relaxed opacity-80">
                  {section.content}
                </p>
              </div>
            ))}

            <div className="pt-8 border-t-2 border-secondary/10">
              <p className="text-sm font-montserrat font-normal text-black/60 italic text-center">
                Agreement to these terms constitutes a legally binding contract between you and Crezine.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default TermsOfServiceView;
