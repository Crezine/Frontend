import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { RiQuestionLine, RiChat3Line, RiBookOpenLine, RiMailLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const SupportView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  const faqs = [
    { q: "How do I receive payments?", a: "Once you open your Cashdoor, you can generate payment links or professional invoices. Clients pay via card, bank transfer, or Apple/Google Pay, and funds are automatically converted to your selected currency." },
    { q: "Is Crezine available in my country?", a: "We currently support creators in 150+ countries across Africa, Europe, Americas, and Asia. If you can access the internet, you can likely open a Cashdoor." },
    { q: "What is the creative wallet?", a: "The Creative Wallet is a multi-currency account that lets you hold funds in USD (Stablecoins) to protect against local currency volatility. You can withdraw to your local bank account anytime." },
    { q: "How does the escrow work?", a: "When a client funds an escrow link, Crezine holds the money in a secure account. Once you deliver the work and the client approves (or a milestone is hit), the funds are released to your wallet." }
  ];

  return (
    <div className="bg-accent min-h-screen flex flex-col overflow-x-hidden">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow pt-28 md:pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-20 flex flex-col items-center px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary mb-4 md:mb-6 tracking-tighter leading-tight"
            >
              How can we <span className="text-primary">help?</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base md:text-xl font-montserrat font-normal text-black max-w-2xl mx-auto"
            >
              Our support team is always ready to help you unlock your creative potential.
            </motion.p>
          </div>

          {/* Support Channels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mb-20 md:mb-32">
             {[
               { title: "Help Center", desc: "Browse our comprehensive guides and tutorials.", icon: <RiBookOpenLine size={24} />, color: "bg-blue-500" },
               { title: "Direct Chat", desc: "Talk to our creative success team in real-time.", icon: <RiChat3Line size={24} />, color: "bg-emerald-500" },
               { title: "Email Support", desc: "Drop us a line and we'll get back within 24 hours.", icon: <RiMailLine size={24} />, color: "bg-primary" }
             ].map((box, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.98 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 className="bg-white p-6 md:p-10 rounded-[30px] md:rounded-[40px] border border-secondary/10 text-center group hover:shadow-lg transition-all cursor-pointer"
               >
                 <div className={`${box.color} w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center text-white mx-auto mb-4 md:mb-6 shadow-md group-hover:scale-105 transition-transform`}>
                   {box.icon}
                 </div>
                 <h3 className="text-xl md:text-2xl font-rubik font-normal text-secondary mb-2">{box.title}</h3>
                 <p className="text-black font-montserrat font-normal text-xs md:text-sm leading-relaxed opacity-80">{box.desc}</p>
               </motion.div>
             ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-[40px] md:rounded-[60px] p-8 md:p-20 border border-secondary/5">
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-rubik font-normal text-secondary mb-8 md:mb-12 flex items-center gap-3 md:gap-4 tracking-tighter leading-tight">
              <RiQuestionLine className="text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-8 md:gap-y-12">
              {faqs.map((faq, i) => (
                <div key={i} className="flex flex-col">
                  <h4 className="text-lg md:text-xl font-rubik font-normal text-secondary mb-2 md:mb-4">{faq.q}</h4>
                  <p className="text-sm md:text-base text-black font-montserrat font-normal leading-relaxed opacity-80">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-16 md:mt-24 max-w-4xl mx-auto px-4">
             <div className="bg-transparent md:bg-secondary rounded-[40px] p-8 md:p-14 text-center text-secondary md:text-white relative overflow-hidden md:shadow-2xl border border-secondary/10 md:border-none">
                <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                <p className="text-secondary/60 md:text-white/60 mb-3 md:mb-4 font-montserrat font-normal uppercase tracking-widest text-[10px] md:text-xs">Still have questions?</p>
                <h3 className="text-2xl md:text-4xl font-rubik font-normal mb-6 md:mb-8 leading-tight tracking-tight">We're here to help you unlock <br className="hidden sm:block"/> your creative potential.</h3>
                <button 
                   onClick={() => navigate('whatsapp' as AppView)}
                   className="bg-primary text-white font-montserrat font-normal py-3.5 md:py-4 px-8 md:px-10 rounded-full text-base md:text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/30 inline-flex items-center justify-center gap-2 w-full sm:w-auto">
                  <RiChat3Line size={20} />
                  Contact Support Team
                </button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportView;
