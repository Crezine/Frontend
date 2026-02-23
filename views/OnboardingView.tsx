import React, { useState } from 'react';
import { AppView } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '../components/BrandLogo';
import { RiAppleLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { TiTickOutline } from 'react-icons/ti';

const OnboardingView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
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
    console.log('Onboarding complete:', { email, name, craft });
    navigate('dashboard');
  }

  const cardVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
  };

  return (
    <div className="min-h-screen bg-accent flex flex-col items-center justify-center p-4 font-montserrat">
      <div className="w-full max-w-md flex flex-col">
        {/* Progress Container - Order and content changes for mobile vs desktop */}
        <div className="order-2 md:order-1 mt-8 md:mt-0 md:mb-8">
            {/* Dots for mobile/tablet */}
            <div className="flex justify-center space-x-2 md:hidden">
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                <div className={`w-2.5 h-2.5 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-gray-300'}`}></div>
            </div>

            {/* Progress bar for desktop */}
            <div className="hidden md:block w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
        </div>

        {/* Cards Container - Order changes for mobile vs desktop */}
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
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="flex justify-center mb-4"><BrandLogo /></div>
                            <h2 className="text-xl sm:text-2xl font-bold text-secondary font-century-gothic">Welcome to Crezine</h2>
                            <p className="text-sm sm:text-base text-secondary/70">Setup your creative cashdoor</p>
                        </div>
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <button onClick={handleSocialLogin} className="p-2 sm:p-3 border rounded-lg hover:bg-gray-100 transition"><FcGoogle className="text-lg sm:text-2xl" /></button>
                            <button onClick={handleSocialLogin} className="p-2 sm:p-3 border rounded-lg hover:bg-gray-100 transition"><RiAppleLine className="text-lg sm:text-2xl" /></button>
                        </div>
                        <div className="text-center text-xs sm:text-sm text-gray-500 mb-6">Or use email</div>
                        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 text-sm rounded-lg relative mb-6" role="alert"><span className="block sm:inline">{error}</span></div>}
                        <input className="w-full px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 border border-gray-200 text-secondary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition mb-6 text-sm sm:text-base" type="email" placeholder="EMAIL ADDRESS" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button onClick={nextStep} className="w-full bg-secondary text-white font-bold font-montserrat uppercase tracking-tight py-2 sm:py-3 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-secondary/90 hover:shadow-2xl active:scale-95">
                        Continue
                        </button>
                    </div>
                    )}

                    {step === 2 && (
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
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
                            <button onClick={nextStep} className="bg-secondary text-white font-bold font-montserrat uppercase tracking-tight py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-secondary/90 active:scale-95">Next</button>
                        </div>
                    </div>
                    )}

                    {step === 3 && (
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg text-center">
                        <div className="flex justify-center mb-4"><BrandLogo /></div>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 120 }} className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                            <TiTickOutline className="text-primary text-5xl sm:text-6xl" />
                        </motion.div>
                        <h2 className="text-xl sm:text-2xl font-bold text-secondary font-century-gothic">Welcome to Crezine</h2>
                        <p className="text-sm sm:text-base text-secondary/70 mb-8">Your creative cashdoor is ready.</p>
                        <div className="flex justify-between">
                            <button onClick={prevStep} className="bg-gray-200 text-secondary font-bold font-montserrat uppercase tracking-tight py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-gray-300 active:scale-95">Review</button>
                            <button onClick={completeOnboarding} className="bg-secondary text-white font-bold font-montserrat uppercase tracking-tight py-2 px-4 sm:py-3 sm:px-6 rounded-full text-sm sm:text-base transition-all duration-300 hover:bg-secondary/90 active:scale-95">Enter</button>
                        </div>
                    </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>

        {step < 3 && (
             <div className="order-3 text-center mt-6">
                <button onClick={() => navigate('landing')} className="text-sm text-secondary/70 hover:text-secondary">
                    &larr; Go Back to Landing Page
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingView;
