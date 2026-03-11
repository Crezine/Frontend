import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '../components/BrandLogo';
import { RiAppleLine, RiArrowLeftLine, RiImageAddFill, RiEyeLine, RiEyeOffLine, RiCheckLine } from 'react-icons/ri';
import { FcGoogle } from 'react-icons/fc';
import { PiKeyhole } from "react-icons/pi";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { AppView, UserData } from '../types';

interface OnboardingViewProps {
  navigate: (view: AppView) => void;
  onComplete: (data: UserData) => void;
  onLogin?: () => void;
}

type OnboardingMode = 
  | 'signup' | 'email-verification' | 'login' | 'forgot' | 'reset-sent' | 'reset-password' | 'redirecting'
  | 'enter-phone' | 'phone-verification' | 'basic-details' | 'create-password' | 'verify-identity' | 'cashdoor-created'
  | 'setup-wallet' | 'verify-mpesa' | 'confirm-phone' | 'mpesa-success'
  | 'link-bank' | 'verify-bank' | 'bank-success'
  | 'processing' | 'open-cashdoor';

const OnboardingView: React.FC<OnboardingViewProps> = ({ navigate, onComplete, onLogin }) => {
  const [mode, setMode] = useState<OnboardingMode>('signup');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [craft, setCraft] = useState('');
  
  // KYC states
  const [idFront, setIdFront] = useState<File | null>(null);
  const [idBack, setIdBack] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);

  // Bank states
  const [selectedBank, setSelectedBank] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, x: 20 },
    visible: { opacity: 1, scale: 1, x: 0 },
    exit: { opacity: 0, scale: 0.95, x: -20 },
  };

  const handleBack = () => {
    switch (mode) {
      case 'signup':
        navigate('landing');
        break;
      case 'email-verification':
        setMode('signup');
        break;
      case 'login':
        setMode('signup');
        break;
      case 'forgot':
        setMode('login');
        break;
      case 'reset-sent':
        setMode('forgot');
        break;
      case 'reset-password':
        setMode('reset-sent');
        break;
      case 'enter-phone':
        setMode('login');
        break;
      case 'phone-verification':
        setMode('enter-phone');
        break;
      case 'basic-details':
        setMode('phone-verification');
        break;
      case 'verify-identity':
        setMode('basic-details');
        break;
      case 'create-password':
        setMode('verify-identity');
        break;
      case 'cashdoor-created':
        setMode('create-password');
        break;
      case 'setup-wallet':
        setMode('cashdoor-created');
        break;
      case 'verify-mpesa':
      case 'link-bank':
        setMode('setup-wallet');
        break;
      case 'confirm-phone':
        setMode('verify-mpesa');
        break;
      case 'mpesa-success':
        setMode('confirm-phone');
        break;
      case 'verify-bank':
        setMode('link-bank');
        break;
      case 'bank-success':
        setMode('verify-bank');
        break;
      default:
        navigate('landing');
    }
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

  const passwordRequirements = [
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
    { label: '8+ characters', met: password.length >= 8 },
  ];

  // Auto-transitions for redirecting and processing
  React.useEffect(() => {
    if (mode === 'reset-sent') {
      const timer = setTimeout(() => setMode('reset-password'), 4000);
      return () => clearTimeout(timer);
    }
    if (mode === 'redirecting') {
      const timer = setTimeout(() => setMode('login'), 2000);
      return () => clearTimeout(timer);
    }
    if (mode === 'processing') {
      const timer = setTimeout(() => setMode('open-cashdoor'), 2000);
      return () => clearTimeout(timer);
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-accent flex flex-col items-center justify-center p-4 font-montserrat">
      <div className="absolute top-8 left-8">
        <button onClick={handleBack} className="text-secondary p-2 rounded-full hover:bg-gray-200 transition">
          <RiArrowLeftLine className="text-2xl" />
        </button>
      </div>

      <div className="w-full max-w-[380px] sm:max-w-lg">
        <AnimatePresence mode="wait">
          
          {/* 1. SIGN UP */}
          {mode === 'signup' && (
            <motion.div key="signup" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-1 sm:px-8 sm:py-2 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-6 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Welcome Creative!</h2>
              <p className="text-sm sm:text-base text-black mb-1 sm:mb-2 text-center font-normal">Setup your Creative Cashdoor</p>
              
              <div className="w-full space-y-2 mb-3 sm:mb-4">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Full Name</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="text" placeholder="Enter your full Name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Email</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="email" placeholder="Enter your Email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <button onClick={() => setMode('email-verification')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-3 sm:mb-4 transition-all active:scale-95">Send email code</button>

              <div className="w-full flex items-center gap-3 mb-3 sm:mb-4">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="text-[10px] text-black font-normal">OR</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <div className="w-full space-y-2 mb-3 sm:mb-4">
                <button className="w-full border border-black py-2 sm:py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition text-xs sm:text-sm font-normal text-black">
                  <FcGoogle className="text-lg" /> Continue with Google
                </button>
                <button className="w-full border border-black py-2 sm:py-2.5 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition text-xs sm:text-sm font-normal text-black">
                  <RiAppleLine className="text-lg" /> Continue with Apple
                </button>
              </div>

              <p className="text-xs sm:text-sm text-black font-normal text-center">
                Already have an account? <button onClick={() => setMode('login')} className="font-normal text-secondary hover:underline">Log in</button>
              </p>
            </motion.div>
          )}

          {/* EMAIL VERIFICATION (Sign up flow) */}
          {mode === 'email-verification' && (
            <motion.div key="email-verification" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border-secondary/10 flex flex-col items-center text-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Email Verification</h2>
              <p className="text-sm sm:text-base text-black mb-4 font-normal leading-snug px-4">A 5-digit verification code has been sent to your email.</p>
              
              <div className="flex gap-2.5 sm:gap-3 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <input key={i} id={`otp-${i}`} className="w-10 h-10 sm:w-12 sm:h-12 text-center bg-gray-100 border border-black rounded-2xl text-lg font-bold text-secondary focus:outline-none font-normal placeholder-secondary/50" maxLength={1} value={otp[i]} onChange={(e) => handleOtpChange(i, e.target.value)} />
                ))}
              </div>

              <button 
                onClick={handleComplete} 
                className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 transition-all active:scale-95"
              >
                Verify & Continue
              </button>
              
              <div className="space-y-1">
                <button onClick={() => setMode('signup')} className="text-xs text-secondary font-normal hover:underline block w-full">Change Email</button>
                <p className="text-xs text-secondary/70 font-normal">Didn’t receive the code? <button className="font-normal text-secondary hover:underline">Request a resend</button></p>
              </div>
            </motion.div>
          )}

          {/* 2. LOG IN */}
          {mode === 'login' && (
            <motion.div key="login" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Welcome Back!</h2>
              <p className="text-sm sm:text-base text-black/70 mb-2 sm:mb-3 text-center font-normal">Enter your details to access your Cashdoor</p>
              
              <div className="w-full space-y-2 mb-1">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Email</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-0.5 relative">
                  <label className="text-xs font-normal text-black ml-1">Password</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type={showPassword ? "text" : "password"} placeholder="Enter your password" />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 bottom-2 text-secondary/50">
                    {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                  </button>
                </div>
              </div>
              <div className="w-full text-center mb-3 sm:mb-4 mt-1">
                <button onClick={() => setMode('forgot')} className="text-[10px] sm:text-xs font-normal text-secondary hover:underline">Forgot password ?</button>
              </div>
              <button onClick={onLogin} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-3 sm:mb-4 transition-all active:scale-95">Login</button>
              
              <div className="w-full flex items-center gap-3 mb-3 sm:mb-4">
                <div className="flex-grow h-px bg-gray-200"></div>
                <span className="text-[10px] text-gray-400 font-normal">OR</span>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>

              <p className="text-xs sm:text-sm text-secondary font-normal text-center">
                Dont have a Cashdoor ? <button onClick={() => setMode('enter-phone')} className="font-normal text-secondary hover:underline">Create My Cashdoor</button>
              </p>
            </motion.div>
          )}

          {/* 3. FORGOT PASSWORD */}
          {mode === 'forgot' && (
            <motion.div key="forgot" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Forgot Password?</h2>
              <p className="text-sm sm:text-base text-black/70 mb-2 sm:mb-3 text-center font-normal">Enter your email to reset your password</p>
              <div className="w-full space-y-3 mb-4 sm:mb-6">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Email</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="email" placeholder="Enter your email" />
                </div>
              </div>
              <button onClick={() => setMode('reset-sent')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 sm:mb-6 transition-all active:scale-95">Send Reset Link</button>
              <p className="text-xs sm:text-sm text-secondary font-normal">Remember your password? <button onClick={() => setMode('login')} className="font-normal text-secondary hover:underline">Sign In</button></p>
            </motion.div>
          )}

          {/* 4. RESET LINK SENT */}
          {mode === 'reset-sent' && (
            <motion.div key="reset-sent" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-10 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center sm:min-w-[440px]">
              <div className="-mt-8 scale-90 sm:scale-100"><BrandLogo /></div>
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-secondary/10 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                <PiKeyhole className="text-secondary text-5xl sm:text-6xl" />
              </div>
              <div className="text-center space-y-0.5 mb-3 sm:mb-4">
                <p className="text-black font-normal text-base sm:text-lg leading-snug">A reset link has been sent to your email and phone</p>
                <p className="text-black font-normal text-sm sm:text-base">Kindly check your email.</p>
              </div>
              <div className="w-full bg-secondary border border-secondary p-4 sm:p-5 rounded-2xl text-white text-center mb-3 sm:mb-4">
                <h4 className="font-normal mb-1 underline underline-offset-4 text-xs sm:text-sm">Safety tip:</h4>
                <p className="text-[10px] sm:text-xs font-normal leading-normal">"Kindly make sure you reset your password on the same device and browser you made this request from."</p>
              </div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <span className="text-sm font-normal text-secondary">Redirecting......</span>
              </div>
            </motion.div>
          )}

          {/* 5. RESET PASSWORD */}
          {mode === 'reset-password' && (
            <motion.div key="reset-password" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Reset Password</h2>
              <p className="text-sm sm:text-base text-black/70 mb-2 sm:mb-3 text-center font-normal">Enter your new password below</p>
              
              <div className="w-full space-y-2 mb-4">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">New Password</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="password" placeholder="New Password" />
                </div>
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Confirm Password</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="password" placeholder="Confirm Password" />
                </div>
              </div>

              <button onClick={() => setMode('redirecting')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95">Reset Password</button>
            </motion.div>
          )}

          {/* 6. REDIRECTING */}
          {mode === 'redirecting' && (
            <motion.div key="redirecting" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <h2 className="text-xl font-normal text-secondary">Redirecting......</h2>
              <button onClick={() => setMode('login')} className="mt-6 text-xs text-secondary hover:underline">(Manual redirect for demo)</button>
            </motion.div>
          )}

          {/* 7. ENTER PHONE */}
          {mode === 'enter-phone' && (
            <motion.div key="enter-phone" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Welcome Back!</h2>
              <p className="text-sm sm:text-base text-black mb-3 sm:mb-4 text-center font-normal">Enter your phone number to get started</p>
              
              <div className="w-full space-y-3 mb-4">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <select className="appearance-none px-3 py-2 pr-8 rounded-full bg-gray-100 border border-black text-sm text-secondary font-normal focus:outline-none">
                        <option>🇰🇪 +254</option>
                        <option>🇳🇬 +234</option>
                        <option>🇺🇬 +256</option>
                        <option>🇹🇿 +255</option>
                        <option>🇷🇼 +250</option>
                        <option>🇿🇦 +27</option>
                        <option>🇬🇭 +233</option>
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-secondary/50">▼</div>
                    </div>
                    <input className="flex-grow px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="tel" placeholder="712 345 678" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="flex items-start gap-2 px-1">
                  <input type="checkbox" className="mt-1 rounded-full border-black appearance-none w-4 h-4 checked:bg-secondary checked:border-secondary border transition-all" id="terms" />
                  <label htmlFor="terms" className="text-[10px] sm:text-xs text-black leading-tight">I agree to the <button onClick={() => navigate('terms-of-service')} className="text-secondary hover:underline">Terms of Service</button> and <button onClick={() => navigate('privacy-policy')} className="text-secondary hover:underline">Privacy policy</button></label>
                </div>
              </div>

              <button 
                onClick={() => {
                  /* BACKEND INTEGRATION: Initiate phone verification/OTP send here */
                  setMode('phone-verification');
                }} 
                className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-3 sm:mb-4 transition-all active:scale-95"
              >
                Continue
              </button>
              <p className="text-xs sm:text-sm text-secondary font-normal text-center">
                Already have an account? <button onClick={() => setMode('login')} className="font-normal text-secondary hover:underline">Sign In</button>
              </p>
            </motion.div>
          )}

          {/* 8. PHONE VERIFICATION */}
          {mode === 'phone-verification' && (
            <motion.div key="phone-verification" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Phone Verification</h2>
              <p className="text-sm sm:text-base text-black mb-4 font-normal leading-snug px-4">A 5 digit verification code has been sent to this number.</p>
              
              <div className="flex gap-2.5 sm:gap-3 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <input key={i} id={`otp-${i}`} className="w-10 h-10 sm:w-12 sm:h-12 text-center bg-gray-100 border border-black rounded-2xl text-lg font-bold text-secondary focus:outline-none font-normal placeholder-secondary/50" maxLength={1} value={otp[i]} onChange={(e) => handleOtpChange(i, e.target.value)} />
                ))}
              </div>

              <button 
                onClick={() => {
                  /* BACKEND INTEGRATION: Verify OTP here */
                  setMode('basic-details');
                }} 
                className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 transition-all active:scale-95"
              >
                Verify
              </button>
              
              <div className="space-y-1">
                <button onClick={() => setMode('enter-phone')} className="text-xs text-secondary font-normal hover:underline block w-full">Switch Phone Number</button>
                <p className="text-xs text-secondary font-normal">Didn’t receive the code? <button className="font-normal text-secondary hover:underline">Request a resend</button></p>
              </div>
            </motion.div>
          )}

          {/* 9. BASIC DETAILS */}
          {mode === 'basic-details' && (
            <motion.div key="basic-details" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Welcome Creative!</h2>
              <p className="text-sm sm:text-base text-black mb-3 sm:mb-4 text-center font-normal">Enter your basic details</p>
              
              <div className="w-full space-y-2.5 mb-5 sm:mb-6">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Full Name</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Email</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Craft (e.g., Graphic Designer)</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="text" placeholder="E.g, Graphic Designer" value={craft} onChange={e => setCraft(e.target.value)} />
                </div>
              </div>

              <button onClick={() => setMode('verify-identity')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95">Continue</button>
            </motion.div>
          )}

          {/* 11. VERIFY IDENTITY */}
          {mode === 'verify-identity' && (
            <motion.div key="verify-identity" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Verify Your Identity</h2>
              <p className="text-sm sm:text-base text-black mb-4 text-center font-normal leading-tight px-2">Scan your ID and take a quick selfie to confirm it is really you</p>
              
              <div className="w-full space-y-3 mb-6">
                <div>
                  <p className="text-xs font-normal text-black mb-1.5 ml-1">Scan your ID</p>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-3 cursor-pointer hover:bg-gray-50 transition ${idFront ? 'border-green-500 bg-green-50/50' : 'border-secondary/20'}`}>
                      <input type="file" className="hidden" onChange={e => setIdFront(e.target.files?.[0] || null)} />
                      <RiImageAddFill className={`${idFront ? 'text-green-500' : 'text-secondary'} text-xl mb-0.5`} />
                      <span className="text-[10px] font-normal text-black/70">{idFront ? 'Front Uploaded' : 'Front'}</span>
                    </label>
                    <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-3 cursor-pointer hover:bg-gray-50 transition ${idBack ? 'border-green-500 bg-green-50/50' : 'border-secondary/20'}`}>
                      <input type="file" className="hidden" onChange={e => setIdBack(e.target.files?.[0] || null)} />
                      <RiImageAddFill className={`${idBack ? 'text-green-500' : 'text-secondary'} text-xl mb-0.5`} />
                      <span className="text-[10px] font-normal text-black/70">{idBack ? 'Back Uploaded' : 'Back'}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-normal text-black mb-1.5 ml-1">Take a Selfie and upload</p>
                  <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl py-4 cursor-pointer hover:bg-gray-50 transition w-full ${selfie ? 'border-green-500 bg-green-50/50' : 'border-secondary/20'}`}>
                    <input type="file" className="hidden" onChange={e => setSelfie(e.target.files?.[0] || null)} />
                    <RiImageAddFill className={`${selfie ? 'text-green-500' : 'text-secondary'} text-2xl mb-0.5`} />
                    <span className="text-[10px] font-normal text-black/70">{selfie ? 'Selfie Uploaded' : 'Selfie'}</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={() => {
                  /* BACKEND INTEGRATION: Upload ID and Selfie images here */
                  setMode('create-password');
                }} 
                className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95"
              >
                Submit
              </button>
              <button onClick={() => setMode('create-password')} className="mt-3 text-[10px] text-secondary hover:underline">Proceed without uploading (Demo)</button>
            </motion.div>
          )}

          {/* 10. CREATE PASSWORD */}
          {mode === 'create-password' && (
            <motion.div key="create-password" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0">Setup your log in details</h2>
              <p className="text-sm sm:text-base text-black mb-3 text-center font-normal">Create Password</p>
              
              <div className="w-full space-y-2 mb-4">
                <div className="space-y-0.5 relative">
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none font-normal placeholder-secondary/50" type={showPassword ? "text" : "password"} placeholder="Enter your new password" value={password} onChange={e => setPassword(e.target.value)} />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 text-secondary/50">
                    {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                  </button>
                </div>
                <div className="space-y-0.5 relative">
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none font-normal placeholder-secondary/50" type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your new password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                  <button onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-2 text-secondary/50">
                    {showConfirmPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
                  </button>
                </div>
              </div>

              <div className="w-full bg-secondary/5 p-3 rounded-2xl space-y-1.5 mb-5 border border-secondary/10">
                <p className="text-black font-semibold text-[10px] sm:text-xs mb-0.5">For a strong password include:</p>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className={`flex items-center gap-1.5 text-[10px] sm:text-xs font-normal ${req.met ? 'text-green-600' : 'text-secondary/60'}`}>
                      <div className={`w-3 h-3 rounded-full flex items-center justify-center border-2 ${req.met ? 'bg-green-600 border-green-600' : 'border-gray-300'}`}>
                        {req.met && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <span>{req.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => {
                  /* BACKEND INTEGRATION: Save user password and complete registration */
                  setMode('cashdoor-created');
                }} 
                className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95"
              >
                Continue
              </button>
            </motion.div>
          )}

          {/* 12. CASHDOOR CREATED! */}
          {mode === 'cashdoor-created' && (
            <motion.div key="cashdoor-created" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <LiaDoorOpenSolid className="text-primary text-7xl" />
              </div>
              <h2 className="text-2xl font-normal text-secondary mb-0.5">Cashdoor Created!</h2>
              <p className="text-sm sm:text-base text-black mb-8 font-normal">Your cashdoor is ready for use</p>
              
              <div className="w-full space-y-3">
                <button onClick={() => setMode('setup-wallet')} className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md transition-all active:scale-95">Link Bank/ M-pesa</button>
                <button onClick={handleComplete} className="w-full text-secondary font-normal py-1.5 text-sm hover:underline">Skip for now</button>
              </div>
            </motion.div>
          )}

          {/* 13. SETUP YOUR WALLET */}
          {mode === 'setup-wallet' && (
            <motion.div key="setup-wallet" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-3 sm:px-8 sm:py-4 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Setup your Wallet</h2>
              <p className="text-sm sm:text-base text-black mb-6 text-center font-normal">Connect payment method</p>
              
              <div className="w-full grid grid-cols-1 gap-3.5 mb-6">
                <button onClick={() => setMode('verify-mpesa')} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-full border border-black hover:border-secondary/30 transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600 text-base">M</div>
                    <span className="font-normal text-black text-base">M-pesa</span>
                  </div>
                  <RiArrowLeftLine className="rotate-180 text-secondary/30 group-hover:text-secondary" />
                </button>
                <button onClick={() => setMode('link-bank')} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-full border border-black hover:border-secondary/30 transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-base">B</div>
                    <span className="font-normal text-black text-base">Bank</span>
                  </div>
                  <RiArrowLeftLine className="rotate-180 text-secondary/30 group-hover:text-secondary" />
                </button>
              </div>

              <button onClick={handleComplete} className="w-full text-secondary font-normal py-1.5 text-sm hover:underline">Skip for now</button>
            </motion.div>
          )}

          {/* 14. VERIFY ACCOUNT (M-PESA) */}
          {mode === 'verify-mpesa' && (
            <motion.div key="verify-mpesa" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Verify Account</h2>
              <p className="text-sm sm:text-base text-black mb-3 text-center font-normal">M-pesa</p>
              
              <p className="text-xs text-black mb-4 text-center">We will prompt your phone for verification</p>

              <div className="w-full space-y-3 mb-6">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Enter Phone</label>
                  <div className="flex gap-2">
                    <div className="relative">
                      <select className="appearance-none px-3 py-2 pr-8 rounded-full bg-gray-100 border border-black text-sm text-secondary font-normal focus:outline-none">
                        <option>🇰🇪 +254</option>
                        <option>🇳🇬 +234</option>
                        <option>🇺🇬 +256</option>
                        <option>🇹🇿 +255</option>
                        <option>🇷🇼 +250</option>
                        <option>🇿🇦 +27</option>
                        <option>🇬🇭 +233</option>
                      </select>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-secondary/50">▼</div>
                    </div>
                    <input className="flex-grow px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="tel" placeholder="712 345 678" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="flex items-start gap-2 px-1">
                  <input type="checkbox" className="mt-1 rounded-full border-black appearance-none w-4 h-4 checked:bg-secondary checked:border-secondary border transition-all" id="mpesa-terms" />
                  <label htmlFor="mpesa-terms" className="text-[10px] sm:text-xs text-black leading-tight">I agree to the <button onClick={() => navigate('terms-of-service')} className="text-secondary hover:underline">Terms of Service</button> and <button onClick={() => navigate('privacy-policy')} className="text-secondary hover:underline">Privacy policy</button></label>
                </div>
              </div>

              <button onClick={() => setMode('confirm-phone')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95">Verify</button>
            </motion.div>
          )}

          {/* 15. CONFIRM PHONE (STK PUSH) */}
          {mode === 'confirm-phone' && (
            <motion.div key="confirm-phone" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-1.5">Confirm your phone</h2>
              <p className="text-sm sm:text-base text-black mb-6 font-normal leading-snug">An M-pesa prompt has been sent to your phone</p>
              
              <div className="w-full mb-6">
                <p className="text-xs font-normal text-black mb-2">Enter Pin</p>
                <div className="flex justify-center gap-2.5 sm:gap-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl border border-black bg-gray-100"></div>
                  ))}
                </div>
              </div>

              <button onClick={() => setMode('mpesa-success')} className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md mb-4 transition-all active:scale-95">Confirm</button>
              
              <p className="text-xs text-secondary font-normal">Didn’t receive the code? <button className="font-normal text-secondary hover:underline">Request a resend</button></p>
            </motion.div>
          )}

          {/* 16. M-PESA SUCCESS */}
          {mode === 'mpesa-success' && (
            <motion.div key="mpesa-success" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <div className="w-24 h-24 bg-white border-2 border-primary rounded-full flex items-center justify-center mb-4">
                <RiCheckLine className="text-primary text-6xl stroke-[3]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-6">M-pesa account linked successfully!</h2>

              <button onClick={() => setMode('processing')} className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md transition-all active:scale-95">Continue</button>
            </motion.div>
          )}
          {/* 17. LINK BANK ACCOUNT */}
          {mode === 'link-bank' && (
            <motion.div key="link-bank" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Link Bank Account</h2>
              <p className="text-sm sm:text-base text-black mb-4 text-center font-normal">Enter your bank details</p>
              
              <div className="w-full space-y-2.5 mb-5">
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Select Bank (e.g., KCB)</label>
                  <select className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal" value={selectedBank} onChange={e => setSelectedBank(e.target.value)}>
                    <option value="">Choose a bank</option>
                    <option value="kcb">KCB</option>
                    <option value="equity">Equity Bank</option>
                    <option value="absal">Absa Bank</option>
                  </select>
                </div>
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Enter Account Number</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} />
                </div>
                <div className="space-y-0.5">
                  <label className="text-xs font-normal text-black ml-1">Enter Account Name</label>
                  <input className="w-full px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gray-100 border border-black text-sm text-secondary focus:outline-none transition font-normal placeholder-secondary/50" type="text" value={accountName} onChange={e => setAccountName(e.target.value)} />
                </div>
                <div className="flex items-start gap-2 px-1 pt-0.5">
                  <input type="checkbox" className="mt-1 rounded-full border-black appearance-none w-4 h-4 checked:bg-secondary checked:border-secondary border transition-all" id="bank-terms" />
                  <label htmlFor="bank-terms" className="text-[10px] sm:text-xs text-black leading-tight">Agree to <button onClick={() => navigate('terms-of-service')} className="text-secondary hover:underline">Terms</button> & <button onClick={() => navigate('privacy-policy')} className="text-secondary hover:underline">Privacy</button></label>
                </div>
              </div>

              <button onClick={() => setMode('verify-bank')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md transition-all active:scale-95">Continue</button>
            </motion.div>
          )}

          {/* 18. VERIFY BANK ACCOUNT (OTP) */}
          {mode === 'verify-bank' && (
            <motion.div key="verify-bank" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-2 sm:px-8 sm:py-3 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-0.5">Verify Bank Account</h2>
              <p className="text-sm sm:text-base text-black mb-4 font-normal leading-snug px-4">An OTP has been sent to your phone</p>
              
              <div className="flex gap-2.5 sm:gap-3 mb-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <input key={i} id={`otp-${i}`} className="w-10 h-10 sm:w-12 sm:h-12 text-center bg-gray-100 border border-black rounded-2xl text-lg font-bold text-secondary focus:outline-none font-normal placeholder-secondary/50" maxLength={1} value={otp[i]} onChange={(e) => handleOtpChange(i, e.target.value)} />
                ))}
              </div>

              <button onClick={() => setMode('bank-success')} className="w-full bg-secondary text-white font-normal py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-md mb-4 transition-all active:scale-95">Verify</button>
              
              <p className="text-xs text-secondary font-normal">Didn’t receive the OTP? <button className="font-normal text-secondary hover:underline">Request a resend</button></p>
            </motion.div>
          )}

          {/* 19. BANK SUCCESS */}
          {mode === 'bank-success' && (
            <motion.div key="bank-success" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <div className="w-24 h-24 bg-white border-2 border-primary rounded-full flex items-center justify-center mb-4">
                <RiCheckLine className="text-primary text-6xl stroke-[3]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-normal text-secondary mb-6">Bank account linked successfully!</h2>

              <button onClick={() => setMode('processing')} className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md transition-all active:scale-95">Continue</button>
            </motion.div>
          )}
          {/* 20. PROCESSING */}
          {mode === 'processing' && (
            <motion.div key="processing" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-6 sm:px-8 sm:py-8 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border-4 border-secondary/10 border-t-secondary rounded-full animate-spin mb-4"></div>
              <h2 className="text-xl font-normal text-secondary mb-2">Verifying details with provider...</h2>
              <button onClick={() => setMode('open-cashdoor')} className="mt-6 text-xs text-secondary hover:underline">(Demo: Click to proceed)</button>
            </motion.div>
          )}

          {/* 21. OPEN CASHDOOR */}
          {mode === 'open-cashdoor' && (
            <motion.div key="open-cashdoor" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="bg-white px-6 py-4 sm:px-8 sm:py-6 rounded-3xl shadow-lg border border-secondary/10 flex flex-col items-center text-center">
              <div className="-mt-8 mb-1 scale-90 sm:scale-100"><BrandLogo /></div>
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <LiaDoorOpenSolid className="text-primary text-5xl" />
              </div>
              <h2 className="text-2xl font-normal text-secondary mb-8">Cashdoor Created!</h2>
              
              <button onClick={handleComplete} className="w-full bg-secondary text-white font-normal py-3 rounded-full text-base shadow-md transition-all active:scale-95">Open Cashdoor</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default OnboardingView;