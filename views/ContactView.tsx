import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { RiMailLine, RiMapPinLine, RiPhoneLine, RiSendPlaneFill } from 'react-icons/ri';
import { FaInstagram, FaWhatsapp, FaTwitter, FaTiktok } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="bg-[#F9F5F0] min-h-screen flex flex-col text-secondary">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-rubik font-normal text-secondary mb-6 tracking-tighter leading-tight"
            >
              Get in <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg font-rubik font-normal text-secondary/60 max-w-xl mx-auto"
            >
              Have questions or feedback? We'd love to hear from you.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              {[
                { icon: <RiMailLine />, title: "Email Us", detail: "hello@crezine.com", href: "mailto:hello@crezine.com" },
                { icon: <RiPhoneLine />, title: "Call Us", detail: "+254702862705", href: "tel:+254702862705" },
                { icon: <RiMapPinLine />, title: "Visit Us", detail: "Currently remote/online", href: "#" }
              ].map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white transition-all"
                >
                  <div className={`bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center text-primary shadow-sm border border-secondary/5`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-rubik font-normal text-md">{item.title}</h3>
                    <p className="text-secondary/60 font-rubik font-normal text-sm">{item.detail}</p>
                  </div>
                </motion.a>
              ))}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 p-4"
                >
                    <div className="bg-gray-50 w-12 h-12 rounded-xl flex items-center justify-center text-primary shadow-sm border border-secondary/5">
                        <RiSendPlaneFill/>
                    </div>
                    <div>
                        <h3 className="font-rubik font-normal text-md">Follow Us</h3>
                        <div className="flex space-x-3">
                            <a href="https://www.instagram.com/crezinecashdoor/" className="text-secondary/70 hover:text-primary transition text-xl"><FaInstagram /></a>
                            <a href="https://whatsapp.com/channel/0029Vb7BP3aDJ6GyeKfw2u18" className="text-secondary/70 hover:text-primary transition text-xl"><FaWhatsapp /></a>
                            <a href="https://x.com/CrezineCashdoor" className="text-secondary/70 hover:text-primary transition text-xl"><FaTwitter /></a>
                            <a href="https://www.tiktok.com/@crezine_" className="text-secondary/70 hover:text-primary transition text-xl"><FaTiktok /></a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white p-6 rounded-[24px] shadow-lg shadow-secondary/5 border border-secondary/5"
            >
              <form className="space-y-3">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-rubik font-normal uppercase tracking-wider text-secondary/50">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full px-4 py-2.5 rounded-lg bg-accent/30 border-transparent focus:bg-white focus:ring-1 focus:ring-primary focus:border-transparent transition-all font-rubik font-normal text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-rubik font-normal uppercase tracking-wider text-secondary/50">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane@example.com" 
                      className="w-full px-4 py-2.5 rounded-lg bg-accent/30 border-transparent focus:bg-white focus:ring-1 focus:ring-primary focus:border-transparent transition-all font-rubik font-normal text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-rubik font-normal uppercase tracking-wider text-secondary/50">Subject</label>
                  <select className="w-full px-4 py-2.5 rounded-lg bg-accent/30 border-transparent focus:bg-white focus:ring-1 focus:ring-primary focus:border-transparent transition-all font-rubik font-normal text-sm">
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-rubik font-normal uppercase tracking-wider text-secondary/50">Message</label>
                  <textarea 
                    rows={3} 
                    placeholder="How can we help you?" 
                    className="w-full px-4 py-2.5 rounded-lg bg-accent/30 border-transparent focus:bg-white focus:ring-1 focus:ring-primary focus:border-transparent transition-all font-rubik font-normal resize-none text-sm"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-secondary text-white font-montserrat font-normal py-3 rounded-lg text-sm hover:bg-primary transition-all flex items-center justify-center gap-2 shadow-lg shadow-secondary/20"
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
