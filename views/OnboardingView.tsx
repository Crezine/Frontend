import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '../components/BrandLogo';
import { RiAppleLine, RiArrowLeftLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { TiTickOutline } from 'react-icons/ti';
import { AppView, UserData } from '../types';

interface OnboardingViewProps {
  navigate: (view: AppView) => void;
  onComplete: (data: UserData) => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ navigate, onComplete }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [craft, setCraft] = useState('');
  const [error, setError] = useState('');

  const nextStep = () => {
    setError('');
    if (step === 1 && email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
      }
    }
    if (step === 2) {
      if (!name || !craft) {
        setError('Please fill in all fields.');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };
  
  const handleSocialLogin = () => {
    setError('');
    setStep(2);
  };

  const completeOnboarding = () => {
    onComplete({ email, name, craft });
  }

  const isEmailValid = () => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const cardVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
  };

  return (
    <div className="min-h-screen bg-accent flex flex-col items-center justify-center p-4 font-montserrat">
      {step === 1 && (
        <div className="absolute top-8 left-8">
          <button onClick={() => navigate('landing')} className="text-secondary p-2 rounded-full hover:bg-gray-200 transition">
              <RiArrowLeftLine className="text-2xl" />
          </button>
        </div>
      )}

      <div className="w-full max-w-sm flex flex-col">
        <div className="order-2 md:order-1 mt-4 md:mt-0 md:mb-8">
            <div className="flex justify-center space-x-2 md:hidden">
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            </div>
            <div className="hidden md:block w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
        </div>

        <div className="order-1 md:order-2">
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                >
                    {step === 1 && (
                      <div className="bg-white px-6 py-4 rounded-[48px] shadow-lg text-center">
                        <div className="flex justify-center mb-2"><BrandLogo /></div>
                        <h2 className="text-xl font-bold text-secondary font-century-gothic">Welcome to Crezine</h2>
                        <p className="text-secondary/70 mb-4">Setup your creative cashdoor</p>
                        <div className="flex items-center justify-between mb-4">
                          <button onClick={handleSocialLogin} className="p-3 border rounded-full hover:bg-gray-100 transition"><FcGoogle className="text-2xl" /></button>
                          <button onClick={handleSocialLogin} className="p-3 border rounded-full hover:bg-gray-100 transition"><RiAppleLine className="text-2xl" /></button>
                        </div>
                        <div className="relative flex py-2 items-center">
                          <div className="flex-grow border-t border-gray-300"></div>
                          <span className="flex-shrink mx-4 text-xs text-gray-500">OR USE EMAIL</span>
                          <div className="flex-grow border-t border-gray-300"></div>
                        </div>
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 text-sm rounded-lg relative mb-3" role="alert"><span className="block sm:inline">{error}</span></div>}
                        <input 
                          className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-200 text-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition mb-3 text-base" 
                          type="email" 
                          placeholder="Email address" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                        />
                        <button 
                          onClick={nextStep} 
                          disabled={!isEmailValid()} 
                          className="w-full bg-secondary text-primary font-bold uppercase tracking-tight py-3 rounded-full text-base transition-all duration-300 hover:bg-secondary/90 hover:shadow-lg active:scale-95 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed force-maroon-fill"
                        >
                          Continue
                        </button>
                        <div className="text-center mt-3">
                          <p className="text-sm text-secondary/70">Already have an account? <button className="font-bold hover:text-secondary">Log In</button></p>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="bg-white p-6 sm:p-8 rounded-[48px] shadow-lg">
                          <div className="text-center mb-6 sm:mb-8">
                              <div className="flex justify-center mb-4"><BrandLogo /></div>
                              <h2 className="text-xl sm:text-2xl font-bold text-secondary font-century-gothic">Welcome to Crezine</h2>
                              <p className="text-sm sm:text-base text-secondary/70">Setup your creative cashdoor</p>
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-secondary text-center mb-4">Your Identity</h3>
                          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 text-sm rounded-lg relative mb-6" role="alert"><span className="block sm:inline">{error}</span></div>}
                          <input className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 border border-gray-200 text-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition mb-4 text-sm sm:text-base" type="text" placeholder="NAME" value={name} onChange={(e) => setName(e.target.value)} />
                          <input className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 border border-gray-200 text-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition mb-6 text-sm sm:text-base" type="text" placeholder="CRAFT (E.G., DESIGNER)" value={craft} onChange={(e) => setCraft(e.target.value)} />
                          <div className="flex justify-between">
                              <button onClick={prevStep} className="bg-gray-200 text-secondary font-bold font-montserrat uppercase tracking-tight py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-gray-300 active:scale-95">Back</button>
                              <button onClick={nextStep} className="bg-secondary text-primary font-bold font-montserrat uppercase tracking-tight py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-secondary/90 active:scale-95">Next</button>
                          </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="bg-white p-6 sm:p-8 rounded-[48px] shadow-lg text-center">
                          <div className="flex justify-center mb-4"><BrandLogo /></div>
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 120 }} className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                              <TiTickOutline className="text-primary text-5xl sm:text-6xl" />
                          </motion.div>
                          <h2 className="text-xl sm:text-2xl font-bold text-secondary font-century-gothic">Welcome to Crezine</h2>
                          <p className="text-sm sm:text-base text-secondary/70 mb-8">Your creative cashdoor is ready.</p>
                          <div className="flex justify-between">
                              <button onClick={prevStep} className="bg-gray-200 text-secondary font-bold font-montserrat uppercase tracking-tight py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-gray-300 active:scale-95">Review</button>
                              <button onClick={completeOnboarding} className="bg-secondary text-primary font-bold font-montserrat uppercase tracking-tight py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-secondary/90 active:scale-95">Enter</button>
                          </div>
                      </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default OnboardingView;
