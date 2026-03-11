import React, { useEffect } from 'react';
import { ViewProps } from '../types';
import PublicHeader from '../components/PublicHeader';
import Footer from '../components/Footer';

const PrivacyPolicyView: React.FC<ViewProps> = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-accent min-h-screen flex flex-col">
      <PublicHeader navigate={navigate} />
      <main className="flex-grow pt-32 pb-20 px-6 max-w-4xl mx-auto text-secondary">
        <h1 className="text-4xl md:text-6xl font-rubik font-normal mb-12 tracking-tighter leading-tight">Privacy Policy</h1>
        <div className="space-y-8 font-rubik font-normal text-secondary/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">1. Introduction</h2>
            <p>At Crezine, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">2. Information Collection</h2>
            <p>We collect information you provide directly to us when you create an account, such as your name, email address, and professional details. We also collect transactional data when you use our payment and escrow services.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">3. Data Usage</h2>
            <p>Your data is used to provide our services, process transactions, protect against fraud, and communicate with you about your account and our features.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">4. Data Security</h2>
            <p>We implement robust security measures to protect your information, including encryption for all sensitive data and regular security audits.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyView;
