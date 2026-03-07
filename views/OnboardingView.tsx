import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '../components/BrandLogo';
import { RiAppleLine, RiArrowLeftLine, RiImageAddFill, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { PiKeyhole } from "react-icons/pi";
import { RxSwitch } from "react-icons/rx";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { AppView, UserData } from '../types';

interface OnboardingViewProps {
  navigate: (view: AppView) => void;
  onComplete: (data: UserData) => void;
  onLogin?: () => void;
}

type OnboardingMode = 
  | 'signup' | 'email-otp' | 'login' | 'forgot' | 'reset-sent' | 'reset-password'
  | 'verify-identity' | 'secure-cashdoor' | 'success';

const OnboardingView: React.FC<OnboardingViewProps> = ({ navigate, onComplete, onLogin }) => {
  // Now starting with signup as requested
  const [mode, setMode] = useState<OnboardingMode>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']); // 5 squircles
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pin, setPin] = useState('');
  const [craft, setCraft] = useState('');

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 4) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleComplete = () => {
    onComplete({ name, email, craft: craft || 'Creative' });
  };

  return (
    <div className="min-h-screen bg-accent flex flex-col items-center justify-center p-4 font-montserrat">
      <div className="absolute top-8 left-8">
        <button onClick={() => navigate('landing')} className="text-secondary p-2 rounded-full hover:bg-gray-200 transition">
          <RiArrowLeftLine className="text-2xl" />
        </button>
      </div>

      <div className="w-full max-w-[380px] sm:max-w-md">
        <AnimatePresence mode="wait">
          
          {/* SIGN UP VIEW (The New Starting Point) */}
          {mode === 'signup' && (
            <motion.div key="signup" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="mb-2 sm:mb-3 -mt-3 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Welcome Creative!</h2>
              <p className="text-sm sm:text-base text-secondary/70 mb-3 sm:mb-4 text-center font-normal">Setup your Creative Cashdoor</p>
              
              <div className="w-full space-y-2.5 mb-4 sm:mb-5">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-secondary ml-1">Full Name</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gray-100 border border-gray-200 text-sm text-secondary focus:outline-none transition font-normal" type="text" placeholder="Enter your full Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-secondary ml-1">Email</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gray-100 border border-gray-200 text-sm text-secondary focus:outline-none transition font-normal" type="email" placeholder="Enter your Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <button onClick={() => setMode('email-otp')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 sm:mb-5 transition-all active:scale-95">Send email code</button>

              <div className="w-full flex items-center gap-3 mb-4 sm:mb-5">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="text-[10px] text-gray-400 font-normal">OR</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div className="w-full space-y-2 mb-4 sm:mb-6">
                <button className="w-full border border-gray-200 py-2 sm:py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition text-xs sm:text-sm font-normal text-secondary">
                  <FcGoogle className="text-lg" /> Continue with Google
                </button>
                <button className="w-full border border-gray-200 py-2 sm:py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition text-xs sm:text-sm font-normal text-secondary">
                  <RiAppleLine className="text-lg" /> Continue with Apple
                </button>
              </div>

              <p className="text-xs sm:text-sm text-secondary/70 font-normal text-center">
                Already have an account ? <button onClick={() => setMode('login')} className="font-normal text-secondary hover:underline">Log in.</button>
              </p>
            </motion.div>
          )}

          {/* EMAIL OTP VIEW */}
          {mode === 'email-otp' && (
            <motion.div key="email-otp" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center">
              <div className="mb-2 sm:mb-3 -mt-3 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5 text-center">Verify Email</h2>
              <p className="text-sm sm:text-base text-secondary/70 mb-2 font-normal leading-snug px-4">A 5 digit veriﬁcation code has been sent to {email || 'your email'}.</p>
              <button onClick={() => setMode('signup')} className="text-xs text-secondary font-normal underline mb-6">Change Email</button>
              
              <div className="flex gap-2.5 sm:gap-3 mb-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <input key={i} id={`otp-${i}`} className="w-10 h-10 sm:w-12 sm:h-12 text-center bg-gray-100 border border-gray-200 rounded-2xl text-lg font-bold text-secondary focus:outline-none font-normal" maxLength={1} value={otp[i]} onChange={(e) => handleOtpChange(i, e.target.value)} />
                ))}
              </div>

              <button onClick={() => setMode('verify-identity')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 sm:mb-5 transition-all active:scale-95">Verify</button>
              <p className="text-xs sm:text-sm text-secondary/70 font-normal">Didn’t receive the code? <button className="font-normal text-secondary hover:underline">Request a resend.</button></p>
            </motion.div>
          )}

          {/* SIGN IN VIEW */}
          {mode === 'login' && (
            <motion.div key="login" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="mb-2 sm:mb-3 -mt-3 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Welcome Back!</h2>
              <p className="text-sm sm:text-base text-secondary/70 mb-3 sm:mb-4 text-center font-normal">Enter your details to access your Cashdoor</p>
              
              <div className="w-full space-y-2.5 mb-1.5">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-secondary ml-1">Email</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gray-100 border border-gray-200 text-sm text-secondary focus:outline-none transition font-normal" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-0.5 relative">
                  <label className="text-xs font-normal text-secondary ml-1">Password</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gray-100 border border-gray-200 text-sm text-secondary focus:outline-none transition font-normal" type={showPassword ? "text" : "password"} placeholder="Enter your password" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-2 text-secondary/50">
                    {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                  </button>
                </div>
              </div>
              <div className="w-full text-right mb-4 sm:mb-5">
                <button onClick={() => setMode('forgot')} className="text-[10px] sm:text-xs font-normal text-secondary hover:underline">Forgot password ?</button>
              </div>
              <button onClick={onLogin} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 sm:mb-5 transition-all active:scale-95">Sign In</button>
              <div className="w-full flex items-center gap-3 mb-4 sm:mb-5">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="text-[10px] text-gray-400 font-normal">OR</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>
              <p className="text-xs sm:text-sm text-secondary/70 font-normal text-center">
                Dont have a Cashdoor ? <button onClick={() => setMode('signup')} className="font-normal text-secondary hover:underline">Create My Cashdoor.</button>
              </p>
            </motion.div>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {mode === 'forgot' && (
            <motion.div key="forgot" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="mb-2 sm:mb-3 -mt-3 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Forgot Password?</h2>
              <p className="text-sm sm:text-base text-secondary/70 mb-3 sm:mb-4 text-center font-normal">Enter your email to reset your password</p>
              <div className="w-full space-y-3 mb-6 sm:mb-8">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-secondary ml-1">Email Address</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gray-100 border border-gray-200 text-sm text-secondary focus:outline-none transition font-normal" type="email" placeholder="Enter your email" />
                </div>
              </div>
              <button onClick={() => setMode('reset-sent')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-6 sm:mb-8 transition-all active:scale-95">Send reset Link</button>
              <p className="text-xs sm:text-sm text-secondary/70 font-normal">Remember your password ? <button onClick={() => setMode('login')} className="font-normal text-secondary hover:underline">Sign In.</button></p>
            </motion.div>
          )}

          {/* RESET SENT VIEW */}
          {mode === 'reset-sent' && (
            <motion.div key="reset-sent" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="mb-1 sm:mb-2 -mt-3 scale-90 sm:scale-100"><BrandLogo /></div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <PiKeyhole className="text-secondary text-xl sm:text-2xl" />
              </div>
              <div className="text-center space-y-1.5 mb-4 sm:mb-5">
                <p className="text-secondary font-normal text-base sm:text-lg leading-snug">A reset link has been sent to your email and phone</p>
                <p className="text-xs sm:text-sm text-secondary/70 font-normal">Kindly check your email.</p>
              </div>
              <div className="w-full bg-secondary border border-secondary p-4 sm:p-5 rounded-2xl text-white text-center mb-4 sm:mb-5">
                <h4 className="font-normal mb-1 underline underline-offset-4 text-xs sm:text-sm">Safety tip:</h4>
                <p className="text-[10px] sm:text-xs font-normal leading-normal">Kindly make sure you reset your password on the same device and browser you made this request from.</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <span className="text-secondary font-normal text-[10px] sm:text-xs ml-1.5">Redirecting.......</span>
              </div>
              <button onClick={() => setMode('reset-password')} className="mt-3 text-[10px] text-secondary/50 hover:underline font-normal">(Demo: Click to simulate redirect)</button>
            </motion.div>
          )}

          {/* VERIFY IDENTITY VIEW */}
          {mode === 'verify-identity' && (
            <motion.div key="verify-identity" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="mb-2 sm:mb-3 -mt-3 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Verify Your Identity</h2>
              <p className="text-[10px] sm:text-xs text-secondary/70 mb-4 text-center font-normal leading-tight">Scan your ID and take a quick selﬁe to conﬁrm it is really you</p>
              
              <div className="w-full mb-4 px-2">
                <p className="text-xs font-normal text-secondary mb-2">Scan your ID</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-secondary/20 rounded-2xl py-3 cursor-pointer hover:bg-gray-50 transition">
                    <RiImageAddFill className="text-secondary text-2xl mb-1" />
                    <span className="text-[10px] font-normal text-secondary/70">Front</span>
                  </div>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-secondary/20 rounded-2xl py-3 cursor-pointer hover:bg-gray-50 transition">
                    <RiImageAddFill className="text-secondary text-2xl mb-1" />
                    <span className="text-[10px] font-normal text-secondary/70">Back</span>
                  </div>
                </div>
              </div>

              <div className="w-full mb-6 px-2">
                <p className="text-xs font-normal text-secondary mb-2">Take a Selﬁe and upload</p>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-secondary/20 rounded-2xl py-4 cursor-pointer hover:bg-gray-50 transition w-full">
                  <RiImageAddFill className="text-secondary text-3xl mb-1" />
                  <span className="text-[10px] font-normal text-secondary/70">Selfie</span>
                </div>
              </div>

              <button onClick={() => setMode('secure-cashdoor')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95">Submit</button>
            </motion.div>
          )}

          {/* SECURE CASHDOOR VIEW */}
          {mode === 'secure-cashdoor' && (
            <motion.div key="secure-cashdoor" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="mb-2 sm:mb-3 -mt-3 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Secure Your Cashdoor</h2>
              <p className="text-sm sm:text-base text-secondary/70 mb-4 text-center font-normal">Setup your log in details</p>
              
              <div className="w-full space-y-3 mb-5">
                <div className="space-y-0.5">
                  <p className="text-xs font-normal text-secondary mb-1">Create Password</p>
                  <div className="relative">
                    <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gray-100 border border-gray-200 text-sm text-secondary focus:outline-none font-normal" type={showPassword ? "text" : "password"} placeholder="Enter your new password" value={password} onChange={e => setPassword(e.target.value)} />
                    <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-secondary/50">
                      {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                    </button>
                  </div>
                  <div className="relative mt-2">
                    <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gray-100 border border-gray-200 text-sm text-secondary focus:outline-none font-normal" type={showConfirmPassword ? "text" : "password"} placeholder="Conﬁrm your new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2 text-secondary/50">
                      {showConfirmPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <p className="text-xs font-normal text-secondary mb-1">Create Pin</p>
                  <div className="relative">
                    <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gray-100 border border-gray-200 text-sm text-secondary focus:outline-none font-normal" type={showPin ? "text" : "password"} placeholder="Conﬁrm your new password" value={pin} onChange={e => setPin(e.target.value)} />
                    <button onClick={() => setShowPin(!showPin)} className="absolute right-3 top-2 text-secondary/50">
                      {showPin ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <button onClick={() => setMode('success')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 transition-all active:scale-95">Open Cashdoor</button>

              <div className="w-full border border-secondary p-3 rounded-2xl space-y-1.5">
                <p className="text-secondary font-normal text-[10px] sm:text-xs mb-0.5 font-bold">For a strong password include:</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-normal text-secondary"><RxSwitch className="text-primary text-base" /> <span>Lowercase letter</span></div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-normal text-secondary"><RxSwitch className="text-primary text-base" /> <span>Uppercase letter</span></div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-normal text-secondary"><RxSwitch className="text-primary text-base" /> <span>Number</span></div>
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-normal text-secondary"><RxSwitch className="text-primary text-base" /> <span>8+ characters</span></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS VIEW */}
          {mode === 'success' && (
            <motion.div key="success" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-6 sm:px-8 sm:py-8 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center">
              <div className="mb-4 -mt-3 scale-90 sm:scale-100"><BrandLogo /></div>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <LiaDoorOpenSolid className="text-primary text-5xl" />
              </div>
              <h2 className="text-2xl font-normal text-secondary mb-1">Cashdoor Created!</h2>
              <p className="text-sm sm:text-base text-secondary/70 mb-8 font-normal">Your cashdoor is ready for use</p>
              <div className="w-full space-y-3">
                <button onClick={handleComplete} className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md transition-all active:scale-95">Link Bank/ M-pesa</button>
                <button onClick={handleComplete} className="w-full text-secondary font-normal py-2 text-sm hover:underline">Skip for now</button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingView;
