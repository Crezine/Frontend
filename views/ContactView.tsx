import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { RiMailLine, RiMapPinLine, RiPhoneLine, RiSendPlaneFill } from 'react-icons/ri';
import { motion } from 'framer-motion';

const ContactView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="bg-[#F9F5F0] min-h-screen flex flex-col font-montserrat text-secondary">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              Get in <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-secondary/60 max-w-2xl mx-auto"
            >
              Have questions or feedback? We'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                { icon: <RiMailLine />, title: "Email Us", detail: "hello@crezine.com", color: "bg-blue-50" },
                { icon: <RiPhoneLine />, title: "Call Us", detail: "+1 (555) 123-4567", color: "bg-emerald-50" },
                { icon: <RiMapPinLine />, title: "Visit Us", detail: "Creative Hub, Silicon Valley, CA", color: "bg-orange-50" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6"
                >
                  <div className={`${item.color} w-14 h-14 rounded-2xl flex items-center justify-center text-primary shadow-sm border border-secondary/5`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <p className="text-secondary/60 font-medium">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white p-10 md:p-12 rounded-[40px] shadow-xl shadow-secondary/5 border border-secondary/5"
            >
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-secondary/50">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full px-6 py-4 rounded-2xl bg-accent/30 border-transparent focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-montserrat"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-secondary/50">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane@example.com" 
                      className="w-full px-6 py-4 rounded-2xl bg-accent/30 border-transparent focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-montserrat"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-secondary/50">Subject</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-accent/30 border-transparent focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-montserrat">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-secondary/50">Message</label>
                  <textarea 
                    rows={5} 
                    placeholder="How can we help you?" 
                    className="w-full px-6 py-4 rounded-2xl bg-accent/30 border-transparent focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-montserrat resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-secondary text-white font-bold py-5 rounded-2xl text-lg hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl shadow-secondary/20"
                >
                  <RiSendPlaneFill />
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactView;
