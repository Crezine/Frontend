import React from 'react';

const HelpCenterView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 bg-gray-50 font-sans">
      <header className="mb-8 md:mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary font-century-gothic leading-tight">
          Help Center
        </h1>
        <p className="text-secondary/70 mt-2 md:mt-4 font-medium font-montserrat text-lg md:text-xl">
          How can we help you?
        </p>
      </header>

      <div className="max-w-3xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search for answers..."
          className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:ring-primary focus:border-primary transition-all font-montserrat text-base"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Category 1 */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold font-century-gothic text-secondary mb-4">Getting Started</h3>
          <ul className="space-y-3 text-secondary/80 font-montserrat text-base">
            <li><a href="#" className="hover:text-primary hover:underline">Creating your account</a></li>
            <li><a href="#" className="hover:text-primary hover:underline">Setting up your wallet</a></li>
            <li><a href="#" className="hover:text-primary hover:underline">Verifying your identity</a></li>
          </ul>
        </div>

        {/* Category 2 */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold font-century-gothic text-secondary mb-4">Payments</h3>
          <ul className="space-y-3 text-secondary/80 font-montserrat text-base">
            <li><a href="#" className="hover:text-primary hover:underline">How to create an invoice</a></li>
            <li><a href="#" className="hover:text-primary hover:underline">Receiving payments</a></li>
            <li><a href="#" className="hover:text-primary hover:underline">Transaction fees</a></li>
          </ul>
        </div>

        {/* Category 3 */}
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <h3 className="text-2xl font-bold font-century-gothic text-secondary mb-4">Escrow</h3>
          <ul className="space-y-3 text-secondary/80 font-montserrat text-base">
            <li><a href="#" className="hover:text-primary hover:underline">How does escrow work?</a></li>
            <li><a href="#" className="hover:text-primary hover:underline">Dispute resolution</a></li>
            <li><a href="#" className="hover:text-primary hover:underline">Escrow fees</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterView;
