import React from 'react';
import { motion } from 'framer-motion';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import AnimatedButton from '../components/AnimatedButton';

const NotFoundView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-accent flex flex-col overflow-x-hidden">
      <PublicHeader navigate={navigate} />
      
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 py-12 md:py-20">
        <div className="max-w-2xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-10 relative"
          >
            {/* 404 Background Text - Scaled for mobile */}
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-montserrat font-bold text-primary opacity-20 select-none leading-none">
              404
            </h1>
            
            {/* Foreground Content - Adjusted positioning for better overlapping */}
            <div className="-mt-10 sm:-mt-16 md:-mt-20 relative z-10 px-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-rubik font-normal text-secondary tracking-tighter mb-4 leading-tight">
                Oops! Door not found.
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-black font-montserrat font-normal mb-8 md:mb-12 max-w-md mx-auto">
                The page you're looking for has been moved, deleted, or never existed in the first place.
              </p>
            </div>
          </motion.div>

          {/* Action Buttons - Uniform height and one-line layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-lg mx-auto px-2"
          >
            <button
              onClick={() => navigate('landing')}
              className="bg-secondary text-white font-montserrat font-normal px-4 sm:px-8 rounded-full text-[11px] sm:text-sm md:text-base h-[48px] min-w-[130px] sm:min-w-[160px] whitespace-nowrap transition-transform active:scale-95"
            >
              Back to home
            </button>
            <AnimatedButton 
              label="Contact support" 
              onClick={() => navigate('support')} 
              className="flex-shrink-0 scale-[0.85] sm:scale-100"
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundView;
