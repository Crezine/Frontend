import React from 'react';
import { motion } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';
import { RiMailLine, RiMapPinLine, RiPhoneLine, RiSendPlaneFill, RiArrowDownSLine, RiGlobalLine } from 'react-icons/ri';
import { FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { SiX } from 'react-icons/si';

interface ContactProps {
  navigate: (view: AppView) => void;
}

const ContactView: React.FC<ContactProps> = ({ navigate }) => {
  const contactInfo = [
    { 
      icon: <RiMailLine className="text-2xl" />, 
      title: "Email Us", 
      detail: "hello@crezine.app", 
      href: "mailto:hello@crezine.app",
      isClickable: true
    },
    { 
      icon: <RiPhoneLine className="text-2xl" />, 
      title: "Call Us", 
      detail: "+254702862705", 
      href: "tel:+254702862705",
      isClickable: true
    },
    { 
      icon: <RiGlobalLine className="text-2xl" />, 
      title: "Remote", 
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
      label: "X (Twitter)",
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="bg-accent min-h-screen overflow-x-hidden flex flex-col">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-1 flex flex-col px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary leading-tight mb-6 tracking-tighter">
              Get in <span className="text-primary">Touch</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-black font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mt-4"
          >
            Have questions or feedback? We'd love to hear from you. Our team is here to support your creative journey.
          </motion.p>
        </section>

        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Information Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((item, i) => {
              const CardContent = (
                <>
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-secondary shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-secondary text-base mb-1">{item.title}</h3>
                    <p className="text-black font-montserrat font-normal opacity-80 text-sm">{item.detail}</p>
                  </div>
                </>
              );

              return item.isClickable ? (
                <motion.a 
                  key={i}
                  href={item.href}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="flex items-center gap-6 p-6 bg-white rounded-[32px] shadow-sm hover:shadow-lg transition-all"
                >
                  {CardContent}
                </motion.a>
              ) : (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="flex items-center gap-6 p-6 bg-white rounded-[32px] shadow-sm cursor-default"
                >
                  {CardContent}
                </motion.div>
              );
            })}

            {/* Social Connect Card */}
            <motion.div 
              variants={itemVariants}
              className="p-6 bg-secondary text-accent rounded-[32px] shadow-xl"
            >
              <h3 className="font-montserrat font-bold text-lg mb-4">Connect with us</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl transition-all duration-300 ${social.hoverColor}`}
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
            className="lg:col-span-3 bg-white p-8 md:p-10 rounded-[40px] shadow-xl relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-2xl font-montserrat font-bold text-secondary mb-6">Send us a message</h2>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-montserrat font-bold text-secondary/70 ml-2 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      className="w-full px-5 py-3 rounded-xl bg-accent border-2 border-transparent focus:border-primary focus:bg-white transition-all font-montserrat font-normal text-sm outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-montserrat font-bold text-secondary/70 ml-2 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane@crezine.app" 
                      className="w-full px-5 py-3 rounded-xl bg-accent border-2 border-transparent focus:border-primary focus:bg-white transition-all font-montserrat font-normal text-sm outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-montserrat font-bold text-secondary/70 ml-2 uppercase tracking-widest">Subject</label>
                  <div className="relative">
                    <select className="w-full px-5 py-3 rounded-xl bg-accent border-2 border-transparent focus:border-primary focus:bg-white transition-all font-montserrat font-normal text-sm outline-none appearance-none cursor-pointer">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Partnership</option>
                    </select>
                    <RiArrowDownSLine className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-xl" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-montserrat font-bold text-secondary/70 ml-2 uppercase tracking-widest">Message</label>
                  <textarea 
                    rows={3} 
                    placeholder="How can we help you?" 
                    className="w-full px-5 py-3 rounded-xl bg-accent border-2 border-transparent focus:border-primary focus:bg-white transition-all font-montserrat font-normal text-sm outline-none resize-none"
                  ></textarea>
                </div>
                <div className="flex justify-start md:justify-end mt-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full md:w-auto md:min-w-[180px] bg-primary text-white font-montserrat font-bold py-3 px-8 rounded-xl text-sm shadow-lg shadow-primary/20 hover:bg-secondary transition-all flex items-center justify-center gap-3"
                  >
                    <RiSendPlaneFill className="text-lg" />
                    Send Message
                  </motion.button>
                </div>
              </form>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ContactView;
