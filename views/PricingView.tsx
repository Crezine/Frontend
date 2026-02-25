import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const PricingView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "Perfect for emerging creators getting their first global clients.",
      features: [
        "Global Cashdoor Link",
        "Receive up to $1,000/mo",
        "USD Creative Wallet",
        "Standard Payouts",
        "Basic Invoicing"
      ],
      cta: "Start for Free",
      highlight: false
    },
    {
      name: "Professional",
      price: "19",
      desc: "For full-time creatives who need professional protection.",
      features: [
        "Everything in Starter",
        "Unlimited Transactions",
        "Milestone Escrow Protection",
        "Priority Support",
        "Event Ticketing (2% fee)",
        "Advanced Analytics"
      ],
      cta: "Get Pro Access",
      highlight: true
    },
    {
      name: "Agency",
      price: "49",
      desc: "For creative teams and studios managing multiple collaborators.",
      features: [
        "Everything in Pro",
        "Multi-user Access",
        "Collaborator Payouts",
        "Custom Branding",
        "Lower Event Fees (1%)",
        "API Access"
      ],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <div className="bg-[#F9F5F0] min-h-screen flex flex-col font-montserrat">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-nunito font-normal text-secondary mb-6"
            >
              Simple, <span className="text-primary">transparent</span> pricing.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-secondary/60"
            >
              No hidden fees. No creative tax. Just tools to help you grow.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 rounded-[40px] border border-secondary/10 transition-all relative ${plan.highlight ? 'bg-secondary text-white shadow-2xl scale-105 z-10' : 'bg-white text-secondary'}`}
              >
                {plan.highlight && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm mb-8 ${plan.highlight ? 'text-white/70' : 'text-secondary/60'}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                   <span className="text-5xl font-black">${plan.price}</span>
                   <span className="text-lg font-bold opacity-60">/mo</span>
                </div>
                
                <button 
                  onClick={() => navigate('onboarding')}
                  className={`w-full py-4 rounded-2xl font-bold mb-10 transition-all ${plan.highlight ? 'bg-primary text-white hover:bg-primary/90' : 'bg-secondary/5 text-secondary hover:bg-secondary/10'}`}
                >
                  {plan.cta}
                </button>

                <ul className="space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 font-semibold text-sm">
                      <RiCheckboxCircleFill className={plan.highlight ? 'text-primary' : 'text-primary'} size={20} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Transaction Fees Note */}
          <div className="mt-20 text-center bg-white p-8 rounded-[30px] border border-secondary/10 max-w-2xl mx-auto">
            <h4 className="font-bold text-secondary mb-2">Wait, what about transaction fees?</h4>
            <p className="text-secondary/60 text-sm">
              We keep it simple: <strong>2.9% + $0.30</strong> per successful transaction. This covers the global payment processing, currency conversion, and escrow security.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingView;
