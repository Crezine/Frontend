import React, { useEffect } from 'react';
import { ViewProps } from '../types';
import PublicHeader from '../components/PublicHeader';
import Footer from '../components/Footer';

const TermsOfServiceView: React.FC<ViewProps> = ({ navigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-accent min-h-screen flex flex-col">
      <PublicHeader navigate={navigate} />
      <main className="flex-grow pt-32 pb-20 px-6 max-w-4xl mx-auto text-secondary">
        <h1 className="text-4xl md:text-6xl font-rubik font-normal mb-12 tracking-tighter leading-tight">Terms of Service</h1>
        <div className="space-y-8 font-rubik font-normal text-secondary/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">1. Acceptance of Terms</h2>
            <p>By using Crezine, you agree to these Terms of Service. If you do not agree, please do not use our platform.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">2. Platform Usage</h2>
            <p>Crezine provides financial infrastructure for creatives. You agree to use the platform in compliance with all applicable laws and regulations.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">3. User Responsibilities</h2>
            <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">4. Escrow and Payments</h2>
            <p>All payments and escrow transactions are subject to our verification and security procedures. We reserve the right to hold funds if fraudulent activity is suspected.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4 text-secondary">5. Limitation of Liability</h2>
            <p>Crezine is provided "as is" without any warranties. We are not liable for any indirect or consequential damages arising from your use of the platform.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServiceView;
