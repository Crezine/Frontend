import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { motion } from 'framer-motion';

const LandingView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="bg-accent font-sans">
      <PublicHeader navigate={navigate} />
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 pt-16 pb-20 md:py-28">
          <div className="w-full max-w-4xl text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-full py-1 px-3 inline-block mb-4"
            >
              <p className="text-sm sm:text-base text-secondary/90 font-montserrat">
                Your global cashdoor for creative dreams.
              </p>
            </motion.div>
            <motion.h1 
              variants={sentence}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-6xl font-nunito font-normal uppercase tracking-tighter mb-3 md:mb-4"
            >
              <span className="text-secondary">
                  {'Global'.split('').map((char, index) => (
                      <motion.span key={'global-' + index} variants={letterVariant}>
                          {char}
                      </motion.span>
                  ))}
              </span>{' '}
              <span className="text-primary">
                  {'Creative'.split('').map((char, index) => (
                      <motion.span key={'creative-' + index} variants={letterVariant}>
                          {char}
                      </motion.span>
                  ))}
              </span>
              <br />
              <span className="text-secondary">
                  {'Cashdoor'.split('').map((char, index) => (
                      <motion.span key={'cashdoor-' + index} variants={letterVariant}>
                          {char}
                      </motion.span>
                  ))}
              </span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-base md:text-xl text-secondary/80 font-montserrat mb-8"
            >
              Get paid as a creative securely and globally in any currency.
              <br />
              Showcase your work, sell experiences, and manage your projects
              <br />
              all behind one door.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col items-start md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('onboarding' as AppView)}
                className="bg-secondary text-white font-bold font-montserrat uppercase tracking-tight w-auto px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-secondary/90 hover:shadow-2xl hover:shadow-secondary/30 active:scale-95 transform"
              >
                Create Your Cashdoor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('features' as AppView)}
                className="bg-white text-secondary border border-secondary font-bold font-montserrat uppercase tracking-tight w-auto px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-secondary/10 active:scale-95 transform"
              >
                Explore Features
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 container mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-nunito font-black text-primary text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center p-4"
            >
              <div className="text-3xl md:text-4xl font-black text-primary mb-4">01</div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2">Create Your Cashdoor</h3>
              <p className="text-sm md:text-base text-secondary/80">
                Sign up and create your personalized Cashdoor in minutes. This will be your one-stop shop for all your creative endeavors.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center p-4"
            >
              <div className="text-3xl md:text-4xl font-black text-primary mb-4">02</div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2">Showcase & Sell</h3>
              <p className="text-sm md:text-base text-secondary/80">
                Showcase your work, sell digital products, and manage your client projects all from your Cashdoor.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col items-center p-4"
            >
              <div className="text-3xl md:text-4xl font-black text-primary mb-4">03</div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2">Get Paid Globally</h3>
              <p className="text-sm md:text-base text-secondary/80">
                Receive payments from anywhere in the world, in any currency, directly to your Cashdoor wallet.
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingView;
