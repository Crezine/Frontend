import React from 'react';
import { AppView } from '../types';
import Footer from '../components/Footer';
import PublicHeader from '../components/PublicHeader';
import { motion } from 'framer-motion';
import { RiRocketLine, RiGlobalLine, RiShieldFlashLine, RiMagicLine } from 'react-icons/ri';

const ProductView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="bg-[#F9F5F0] min-h-screen flex flex-col font-montserrat">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32 px-4 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
            >
              The Creative Cashdoor
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black text-secondary mb-8 leading-tight"
            >
              One Link to Rule Your <br /> 
              <span className="text-primary">Creative Economy.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-secondary/70 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              CREZINE is the infrastructure for modern creativity. We provide the tools to get paid, manage clients, and grow your global creative business without the financial friction.
            </motion.p>
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button 
                onClick={() => navigate('onboarding')}
                className="w-full sm:w-auto bg-primary text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
              >
                Start for Free
              </button>
              <button 
                className="w-full sm:w-auto border-2 border-secondary/10 text-secondary font-bold py-4 px-10 rounded-2xl hover:bg-secondary/5 transition-colors"
              >
                Watch Demo
              </button>
            </motion.div>
          </div>
        </section>

        {/* The Concept */}
        <section className="py-20 px-4 bg-accent/30">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 leading-tight">
                What is a <span className="text-primary italic">Cashdoor?</span>
              </h2>
              <p className="text-lg text-secondary/70 mb-8 leading-relaxed">
                A Cashdoor is more than a wallet—it's your financial identity. It's a single entry point where clients pay, funds are secured in escrow, and you access global opportunities like grants and residencies.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: <RiGlobalLine />, text: "Global Payments in your local currency" },
                  { icon: <RiShieldFlashLine />, text: "Automated Escrow for every gig" },
                  { icon: <RiMagicLine />, text: "Access to Creative Grants & Funding" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-secondary/80 font-semibold">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-secondary/5">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="bg-primary aspect-square rounded-[40px] shadow-2xl overflow-hidden transform rotate-3 relative z-10">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-80" alt="Creative working" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              </div>
              <div className="absolute inset-0 bg-secondary rounded-[40px] transform -rotate-3 -z-10"></div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-secondary mb-4">Built for Every Creator.</h2>
              <p className="text-secondary/60 font-medium">From Designers to Musicians, we've got you covered.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "For Artists", desc: "Sell prints, manage gallery commissions, and get paid for your digital assets safely.", color: "bg-blue-50" },
                { title: "For Musicians", desc: "Sell event tickets directly, manage workshop bookings, and receive global tips.", color: "bg-purple-50" },
                { title: "For Freelancers", desc: "Protect your time with milestone-based escrow payments and professional invoicing.", color: "bg-orange-50" }
              ].map((card, i) => (
                <div key={i} className={`${card.color} p-10 rounded-[40px] border border-secondary/5 hover:shadow-xl transition-all`}>
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm">
                    <RiRocketLine size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary mb-4">{card.title}</h3>
                  <p className="text-secondary/70 leading-relaxed mb-8">{card.desc}</p>
                  <button onClick={() => navigate('onboarding')} className="font-bold text-primary hover:underline">Get Started &rarr;</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto bg-secondary rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
             <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Ready to open your cashdoor?</h2>
             <button 
                onClick={() => navigate('onboarding')}
                className="bg-primary text-white font-bold py-5 px-12 rounded-2xl text-xl hover:scale-105 transition-transform relative z-10 shadow-2xl shadow-primary/40"
             >
               Open My Account Now
             </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductView;
