import React from 'react';
import { motion } from 'framer-motion';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import { RiLockPasswordLine } from 'react-icons/ri';

interface UnauthorizedViewProps {
  navigate: (view: AppView) => void;
  onLogin?: () => void;
}

const UnauthorizedView: React.FC<UnauthorizedViewProps> = ({ navigate, onLogin }) => {
  return (
    <div className="min-h-screen bg-accent font-sans flex flex-col">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-10 relative"
          >
            {/* Lock Icon Background */}
            <div className="flex justify-center mb-4">
                <div className="bg-primary/10 p-6 rounded-full">
                    <RiLockPasswordLine className="text-primary text-6xl sm:text-7xl md:text-8xl" />
                </div>
            </div>
            
            <div className="relative z-10 px-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-nunito font-normal text-secondary uppercase tracking-tighter mb-4 leading-tight">
                Private <span className="text-primary">Access</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-secondary/70 font-montserrat mb-8 md:mb-12 max-w-md mx-auto">
                You need to be authorized to access your cashdoor. Please sign up or log in to continue.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-lg mx-auto px-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogin}
              className="bg-primary text-white font-bold font-montserrat uppercase tracking-tight px-3 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] xs:text-xs sm:text-base transition-all duration-300 hover:bg-primary/90 hover:shadow-xl active:scale-95 transform flex-1 sm:flex-none whitespace-nowrap"
            >
              Sign In / Log In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('onboarding')}
              className="bg-white text-secondary border-2 border-secondary font-bold font-montserrat uppercase tracking-tight px-3 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] xs:text-xs sm:text-base transition-all duration-300 hover:bg-secondary/5 active:scale-95 transform flex-1 sm:flex-none whitespace-nowrap"
            >
              Get Authorized
            </motion.button>
          </motion.div>
        </div>
      </main>

      <div className="py-6 md:py-10 text-center px-4">
        <p className="text-secondary/40 font-montserrat text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-widest">
          Crezine — Creative Cashdoor
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedView;
