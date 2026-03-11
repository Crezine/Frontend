import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { RiQuestionLine, RiMailLine, RiChat3Line, RiBookOpenLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const SupportView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  const faqs = [
    { q: "How do I receive payments?", a: "Once you open your Cashdoor, you can generate payment links or professional invoices. Clients pay via card, bank transfer, or Apple/Google Pay, and funds are automatically converted to your selected currency." },
    { q: "Is Crezine available in my country?", a: "We currently support creators in 150+ countries across Africa, Europe, Americas, and Asia. If you can access the internet, you can likely open a Cashdoor." },
    { q: "What is the creative wallet?", a: "The Creative Wallet is a multi-currency account that lets you hold funds in USD (Stablecoins) to protect against local currency volatility. You can withdraw to your local bank account anytime." },
    { q: "How does the escrow work?", a: "When a client funds an escrow link, Crezine holds the money in a secure account. Once you deliver the work and the client approves (or a milestone is hit), the funds are released to your wallet." }
  ];

  return (
    <div className="bg-[#F9F5F0] min-h-screen flex flex-col">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 flex flex-col items-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary mb-6 tracking-tighter leading-tight"
            >
              How can we <span className="text-primary">help?</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-rubik font-normal text-secondary/60"
            >
              Our support team is always ready to help you unlock your creative potential.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-32">
             {[
               { title: "Help Center", desc: "Browse our comprehensive guides and tutorials.", icon: <RiBookOpenLine size={32} />, color: "bg-blue-500" },
               { title: "Direct Chat", desc: "Talk to our creative success team in real-time.", icon: <RiChat3Line size={32} />, color: "bg-emerald-500" },
               { title: "Email Support", desc: "Drop us a line and we'll get back within 24 hours.", icon: <RiMailLine size={32} />, color: "bg-primary" }
             ].map((box, i) => (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="bg-white p-10 rounded-[40px] border border-secondary/5 text-center group hover:shadow-xl transition-all cursor-pointer"
               >
                 <div className={`${box.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                   {box.icon}
                 </div>
                 <h3 className="text-2xl font-rubik font-normal text-secondary mb-2">{box.title}</h3>
                 <p className="text-secondary/60 font-rubik font-normal text-sm leading-relaxed">{box.desc}</p>
               </motion.div>
             ))}
          </div>

          <div className="bg-white rounded-[60px] p-12 md:p-20 border border-secondary/5">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-rubik font-normal text-secondary mb-12 flex items-center gap-4 tracking-tighter leading-tight">
              <RiQuestionLine className="text-primary" />
              Frequently Asked Questions
            </h2>            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <h4 className="text-xl font-rubik font-normal text-secondary mb-4">{faq.q}</h4>
                  <p className="text-secondary/70 font-rubik font-normal leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24 max-w-2xl mx-auto">
             <div className="bg-secondary rounded-[40px] p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
                <p className="text-white/60 mb-4 font-rubik font-normal uppercase tracking-widest text-xs">Still have questions?</p>
                <h3 className="text-2xl md:text-3xl font-rubik font-normal mb-8 leading-tight">We're here to help you unlock <br/> your creative potential.</h3>
                <button 
                   onClick={() => navigate('whatsapp' as AppView)}
                   className="bg-primary text-white font-montserrat font-normal py-4 px-10 rounded-full text-lg hover:scale-105 transition-transform shadow-xl shadow-primary/20 inline-flex items-center gap-2">
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
