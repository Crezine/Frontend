import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';
import { RiMailLine, RiPhoneLine, RiSendPlaneFill, RiArrowDownSLine, RiGlobalLine, RiCheckLine } from 'react-icons/ri';
import { FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

interface ContactProps {
  navigate: (view: AppView) => void;
}

const ContactView: React.FC<ContactProps> = ({ navigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('General inquiry');

  const subjects = [
    'General inquiry',
    'Technical support',
    'Billing question',
    'Partnership',
    'Feedback'
  ];

  const contactInfo = [
    { 
      icon: <RiMailLine className="text-xl md:text-2xl" />, 
      title: "Email us", 
      detail: "hello@crezine.app", 
      href: "mailto:hello@crezine.app",
      isClickable: true
    },
    { 
      icon: <RiPhoneLine className="text-xl md:text-2xl" />, 
      title: "Call us", 
      detail: "+254702862705", 
      href: "tel:+254702862705",
      isClickable: true
    },
    { 
      icon: <RiGlobalLine className="text-xl md:text-2xl" />, 
      title: "Location", 
      detail: "Currently remote/online", 
      href: "#",
      isClickable: false
    }
  ];

  const socialLinks = [
    { 
      icon: <FaInstagram />, 
      href: "https://www.instagram.com/crezinecashdoor/", 
      label: "Instagram",
      hoverColor: "hover:bg-[#E4405F] hover:text-white"
    },
    { 
      icon: <FaWhatsapp />, 
      href: "https://whatsapp.com/channel/0029Vb7BP3aDJ6GyeKfw2u18", 
      label: "WhatsApp",
      hoverColor: "hover:bg-[#25D366] hover:text-white"
    },
    { 
      icon: <SiX />, 
      href: "https://x.com/CrezineCashdoor", 
      label: "X",
      hoverColor: "hover:bg-black hover:text-white"
    },
    { 
      icon: <FaTiktok />, 
      href: "https://www.tiktok.com/@crezine_", 
      label: "TikTok",
      hoverColor: "hover:bg-black hover:text-white"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-accent min-h-screen overflow-x-hidden flex flex-col font-montserrat">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-1 flex flex-col px-4 sm:px-6 pt-28 md:pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-12 md:mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary leading-tight mb-4 md:mb-6 tracking-tighter">
              Get in <span className="text-primary">touch</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-black font-normal leading-relaxed max-w-2xl mx-auto mt-2 md:mt-4 opacity-80"
          >
            Have questions or feedback? We'd love to hear from you. Our team is here to support your creative journey.
          </motion.p>
        </section>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start px-2 sm:px-0">
          {/* Contact Information */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-4 md:space-y-6"
          >
            {contactInfo.map((item, i) => {
              const CardContent = (
                <>
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-white md:bg-primary/5 rounded-full md:rounded-2xl flex items-center justify-center text-secondary shrink-0 border border-secondary/5 md:border-none">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-normal text-secondary text-sm md:text-base mb-0.5 md:mb-1">{item.title}</h3>
                    <p className="text-black font-normal opacity-70 text-xs md:text-sm">{item.detail}</p>
                  </div>
                </>
              );

              return item.isClickable ? (
                <motion.a 
                  key={i}
                  href={item.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.01, x: 5 }}
                  className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-transparent md:bg-white rounded-[24px] md:rounded-[32px] border border-secondary/10 md:border-none md:shadow-sm hover:md:shadow-md transition-all"
                >
                  {CardContent}
                </motion.a>
              ) : (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-transparent md:bg-white rounded-[24px] md:rounded-[32px] border border-secondary/10 md:border-none md:shadow-sm cursor-default"
                >
                  {CardContent}
                </motion.div>
              );
            })}

            {/* Social Connect */}
            <motion.div 
              variants={itemVariants}
              className="p-6 md:p-8 bg-transparent md:bg-secondary text-secondary md:text-accent rounded-[24px] md:rounded-[32px] border border-secondary/10 md:border-none md:shadow-xl"
            >
              <h3 className="font-normal text-base md:text-lg mb-4 md:mb-6">Connect with us</h3>
              <div className="flex gap-3 md:gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className={`w-10 h-10 md:w-12 md:h-12 bg-white md:bg-white/10 rounded-full md:rounded-xl flex items-center justify-center text-xl border border-secondary/5 md:border-none transition-all duration-300 ${social.hoverColor}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 bg-transparent md:bg-white p-0 md:p-10 rounded-[40px] md:shadow-xl relative"
          >
            <div className="relative z-10 p-6 md:p-0 bg-white md:bg-transparent rounded-[32px] border border-secondary/10 md:border-none">
              <h2 className="text-xl md:text-2xl font-rubik font-normal text-secondary mb-6 md:mb-8">Send us a message</h2>
              <form className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-xs font-normal text-secondary/70 ml-1">Full name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-accent border border-transparent focus:border-secondary/20 focus:bg-white transition-all font-normal text-sm outline-none"
                    />
                  </div>
                  <div className="space-y-1.5 md:space-y-2">
                    <label className="text-xs font-normal text-secondary/70 ml-1">Email address</label>
                    <input 
                      type="email" 
                      placeholder="jane@crezine.app" 
                      className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-accent border border-transparent focus:border-secondary/20 focus:bg-white transition-all font-normal text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2 relative z-30">
                  <label className="text-xs font-normal text-secondary/70 ml-1">Subject</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-accent border border-transparent hover:border-secondary/10 focus:border-secondary/20 focus:bg-white transition-all font-normal text-sm outline-none flex items-center justify-between text-left h-[48px] md:h-[56px]"
                    >
                      <span className="text-black">
                        {selectedSubject}
                      </span>
                      <motion.div
                        animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <RiArrowDownSLine className="text-secondary text-xl" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <>
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDropdownOpen(false)}
                            className="fixed inset-0 z-40 bg-transparent"
                          />
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-secondary/5 overflow-hidden z-50 py-2"
                          >
                            {subjects.map((subject) => (
                              <button
                                key={subject}
                                type="button"
                                onClick={() => {
                                  setSelectedSubject(subject);
                                  setIsDropdownOpen(false);
                                }}
                                className={`w-full px-5 py-3 text-left font-normal text-sm transition-colors flex items-center justify-between group
                                  ${selectedSubject === subject 
                                    ? 'bg-secondary/5 text-secondary' 
                                    : 'text-black hover:bg-accent hover:text-secondary'
                                  }`}
                              >
                                <span>{subject}</span>
                                {selectedSubject === subject && (
                                  <RiCheckLine className="text-secondary text-lg" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        </>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2 relative z-20">
                  <label className="text-xs font-normal text-secondary/70 ml-1">Message</label>
                  <textarea 
                    rows={4} 
                    placeholder="How can we help you?" 
                    className="w-full px-5 py-3 md:py-4 rounded-xl md:rounded-2xl bg-accent border border-transparent focus:border-secondary/20 focus:bg-white transition-all font-normal text-sm outline-none resize-none"
                  ></textarea>
                </div>
                <div className="flex justify-start md:justify-end mt-6 md:mt-8">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full md:w-auto md:min-w-[200px] bg-secondary text-white font-normal h-[48px] px-8 rounded-full text-sm md:text-base shadow-lg shadow-secondary/10 hover:bg-secondary/90 transition-all flex items-center justify-center gap-3"
                  >
                    <RiSendPlaneFill className="text-lg" />
                    Send message
                  </motion.button>
                </div>
              </form>
            </div>
            <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ContactView;
