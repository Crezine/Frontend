import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import AnimatedButton from '../components/AnimatedButton';
import { motion } from 'framer-motion';
import { RiRocketLine, RiGlobalLine, RiShieldFlashLine, RiMagicLine } from 'react-icons/ri';

const ProductView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-accent flex flex-col overflow-x-hidden">
      <PublicHeader navigate={navigate} />
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-28 md:pt-32 pb-20 overflow-hidden">
        {/* Hero Section */}
        <section className="relative overflow-hidden mb-12 md:mb-20 py-8 md:py-12 flex flex-col items-center text-center">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-3xl"></div>
          
          <div className="max-w-4xl relative z-10 flex flex-col items-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary mb-6 md:mb-8 leading-tight tracking-tighter"
            >
              One Link to Rule Your <br className="hidden sm:block" /> 
              <span className="text-primary">Creative Economy.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg font-montserrat font-normal text-black max-w-2xl mb-8 md:mb-12 leading-relaxed"
            >
              Crezine is the infrastructure for modern creativity. We provide the tools to get paid, manage clients, and grow your global creative business without the financial friction.
            </motion.p>
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.3 }}
               className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
              <button 
                onClick={() => navigate('onboarding')}
                className="bg-primary text-white font-montserrat font-normal py-3 px-8 rounded-full shadow-xl shadow-primary/20 hover:scale-105 transition-transform text-xs md:text-sm h-[48px] w-full sm:min-w-[160px]"
              >
                Start for Free
              </button>
              <AnimatedButton label="Watch Demo" onClick={() => {}} className="w-full sm:w-auto" />
            </motion.div>
          </div>
        </section>

        {/* The Concept */}
        <section className="py-12 md:py-20 px-4 md:px-10 bg-white/30 rounded-[30px] md:rounded-[60px] border border-secondary/5 mb-12 md:mb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-rubik font-normal text-secondary mb-4 md:mb-6 leading-tight">
                What is a <span className="text-primary italic">Cashdoor?</span>
              </h2>
              <p className="text-base md:text-lg font-montserrat font-normal text-black mb-6 md:mb-8 leading-relaxed">
                A Cashdoor is more than a wallet—it's your financial identity. It's a single entry point where clients pay, funds are secured in escrow, and you access global opportunities.
              </p>
              <ul className="space-y-4 text-left max-w-sm mx-auto md:mx-0">
                {[
                  { icon: <RiGlobalLine />, text: "Global Payments in local currency" },
                  { icon: <RiShieldFlashLine />, text: "Automated Escrow for every gig" },
                  { icon: <RiMagicLine />, text: "Access to Creative Grants" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 md:gap-4 text-black font-montserrat font-normal text-sm md:text-base">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-secondary/5">
                      {item.icon}
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative order-1 md:order-2 px-4 md:px-0">
              <div className="bg-primary aspect-square rounded-[30px] md:rounded-[40px] shadow-2xl overflow-hidden transform rotate-2 md:rotate-3 relative z-10">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" className="w-full h-full object-cover opacity-80" alt="Creative working" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
              </div>
              <div className="absolute inset-0 bg-secondary rounded-[30px] md:rounded-[40px] transform -rotate-2 md:-rotate-3 -z-10"></div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="mb-12 md:mb-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-16 flex flex-col items-center px-4">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-rubik font-normal text-secondary mb-4 tracking-tighter leading-tight">Built for Every Creator.</h2>
              <p className="text-sm md:text-base text-black font-montserrat font-normal max-w-2xl">From Designers to Musicians, we've got you covered.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 sm:px-0">
              {[
                { title: "For Artists", desc: "Sell prints, manage gallery commissions, and get paid for your digital assets safely.", color: "bg-blue-50" },
                { title: "For Musicians", desc: "Sell event tickets directly, manage workshop bookings, and receive global tips.", color: "bg-purple-50" },
                { title: "For Freelancers", desc: "Protect your time with milestone-based escrow payments and professional invoicing.", color: "bg-orange-50" }
              ].map((card, i) => (
                <div key={i} className={`${card.color} p-8 md:p-10 rounded-[30px] md:rounded-[40px] border border-secondary/5 hover:shadow-xl transition-all`}>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-primary mb-6 shadow-sm">
                    <RiRocketLine size={24} className="md:size-[32px]" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-rubik font-normal text-secondary mb-3 md:mb-4">{card.title}</h3>
                  <p className="text-sm md:text-base text-black font-montserrat font-normal leading-relaxed mb-6 md:mb-8">{card.desc}</p>
                  <button onClick={() => navigate('onboarding')} className="font-montserrat font-normal text-primary hover:underline text-sm md:text-base">Get Started &rarr;</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Responsive Refactor */}
        <section className="py-12 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-transparent md:bg-secondary rounded-[48px] p-8 md:p-16 text-center text-secondary md:text-white relative overflow-hidden md:shadow-2xl border border-secondary/10 md:border-none"
          >
             <div className="hidden md:block absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-rubik font-normal mb-8 relative z-10 tracking-tighter leading-tight">
               Ready to open your <br className="hidden sm:block" /> cashdoor?
             </h2>
             <button
                onClick={() => navigate('onboarding')}
                className="bg-primary text-white font-montserrat font-normal py-4 px-10 rounded-full text-base md:text-lg hover:scale-105 transition-transform relative z-10 shadow-xl shadow-primary/30 w-full sm:w-auto"
             >
               Open My Account Now
             </button>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default ProductView;
