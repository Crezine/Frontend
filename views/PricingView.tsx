import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

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
    <div className="bg-accent min-h-screen flex flex-col">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow pt-28 md:pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 md:mb-16 flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-6xl font-rubik font-normal text-secondary mb-4 tracking-tighter leading-tight"
            >
              Simple, <span className="text-primary">transparent</span> pricing.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-base md:text-lg font-montserrat font-normal text-black"
            >
              No hidden fees. No creative tax. Just tools to help you grow.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 md:p-8 rounded-[32px] border border-secondary/20 transition-all relative ${plan.highlight ? 'bg-secondary text-white shadow-xl scale-100 lg:scale-105 z-10' : 'bg-white text-secondary'}`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-montserrat font-bold uppercase tracking-widest whitespace-nowrap">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl md:text-2xl font-rubik font-normal mb-1">{plan.name}</h3>
                <p className={`text-xs md:text-sm font-montserrat font-normal mb-6 ${plan.highlight ? 'text-white/80' : 'text-black/70'}`}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                   <span className="text-4xl md:text-5xl font-montserrat font-bold leading-none">${plan.price}</span>
                   <span className={`text-base font-montserrat font-normal ${plan.highlight ? 'text-white/60' : 'opacity-60'}`}>/mo</span>
                </div>
                
                <button 
                  onClick={() => navigate('onboarding')}
                  className={`w-full py-3.5 rounded-xl font-montserrat font-bold text-sm mb-8 transition-all shadow-md ${plan.highlight ? 'bg-primary text-white hover:bg-primary/90' : 'bg-secondary text-white hover:bg-secondary/90'}`}
                >
                  {plan.cta}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 font-montserrat font-normal text-xs md:text-sm">
                      <RiCheckboxCircleFill className="text-primary mt-0.5 shrink-0" size={18} />
                      <span className={plan.highlight ? 'text-white/90' : 'text-black/80'}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Transaction Fees Note */}
          <div className="mt-16 text-center bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-[24px] border border-secondary/10 max-w-2xl mx-auto shadow-sm">
            <h4 className="font-rubik font-normal text-secondary mb-2">Wait, what about transaction fees?</h4>
            <p className="text-black font-montserrat font-normal text-xs md:text-sm leading-relaxed opacity-80">
              We keep it simple: <span className="text-secondary font-bold text-base md:text-lg">2.9% + $0.30</span> per successful transaction. This covers global payment processing, currency conversion, and escrow security.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingView;
