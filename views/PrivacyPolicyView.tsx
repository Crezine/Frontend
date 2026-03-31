import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';

interface PrivacyPolicyProps {
  navigate: (view: AppView) => void;
}

const PrivacyPolicyView: React.FC<PrivacyPolicyProps> = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "1. Introduction",
      content: "At Crezine, we take your privacy seriously. We are committed to protecting your personal information and your right to privacy. This policy explains how we collect, use, and protect your personal information when you use our platform."
    },
    {
      title: "2. Information Collection",
      content: "We collect information you provide directly to us when you create an account, such as your name, email address, and professional details. We also collect transactional data when you use our payment and escrow services to ensure security and compliance."
    },
    {
      title: "3. Data Usage",
      content: "Your data is used to provide our services, process transactions, protect against fraud, and communicate with you about your account and our features. We may also use anonymized data to improve our platform's performance and user experience."
    },
    {
      title: "4. Data Security",
      content: "We implement robust security measures to protect your information, including encryption for all sensitive data and regular security audits. Your financial data is handled with the highest level of security standards used in the fintech industry."
    },
    {
      title: "5. Your Rights",
      content: "You have the right to access, correct, or delete your personal information at any time. You can manage your data preferences through your account settings or by contacting our support team."
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
              Privacy <span className="text-primary">Policy</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-black font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Last updated: March 2026. Your trust is our most valuable asset. Learn how we handle your data with care and integrity.
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
                For any questions regarding this policy, please reach out to us at privacy@crezine.app
              </p>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicyView;
