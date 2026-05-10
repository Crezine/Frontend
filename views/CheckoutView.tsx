import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ViewProps } from '../types';
import { FiX } from 'react-icons/fi';
import { RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';
import { X } from 'lucide-react';
import { walletService } from '../src/services/walletService';

type MainTab = 'card' | 'mpesa';
type PaymentOption = 'card' | 'apple-pay' | 'google-pay' | 'crezine';

const CheckoutView: React.FC<ViewProps> = ({ navigate: parentNavigate }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MainTab>('card');
  const [activeOption, setActiveOption] = useState<PaymentOption>('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardholderName: '',
    country: '',
    address: '',
    state: '',
    town: '',
    postalCode: ''
  });

  // Lock scroll when component is mounted
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    fetchBalance();
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const fetchBalance = async () => {
    try {
      setIsLoadingBalance(true);
      const data = await walletService.getBalance();
      setWalletBalance(data.balance / 100); // balance is in cents
    } catch (error) {
      console.error("Failed to fetch balance", error);
      setWalletBalance(0); 
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const cartItems = useMemo(() => {
    const saved = localStorage.getItem('crezine_cart');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  }, []);

  const subtotal = useMemo(() => 
    cartItems.reduce((acc: number, item: any) => {
      // Backend returns price in cents
      const price = item.price / 100;
      return acc + (price * item.quantity);
    }, 0), 
  [cartItems]);

  const total = subtotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
    if (!formData.expiry) newErrors.expiry = "Expiry is required";
    if (!formData.cvc) newErrors.cvc = "CVC is required";
    if (!formData.cardholderName) newErrors.cardholderName = "Name is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const paymentOptions: { id: PaymentOption; label: string }[] = [
    { id: 'card', label: 'Card' },
    { id: 'apple-pay', label: 'Apple pay' },
    { id: 'google-pay', label: 'Google pay' },
    { id: 'crezine', label: 'Crezine' },
  ];

  const handleClose = () => {
    navigate(-1);
  };

  const handleConfirmPayment = () => {
    if (activeOption === 'crezine') {
      if (walletBalance !== null && walletBalance < total) {
        setIsError(true);
        return;
      }
    } else {
      if (!validateForm()) return;
    }
    setIsSuccess(true);
  };

  const handleDone = () => {
    parentNavigate('wallet');
  };

  const handleTryAgain = () => {
    setIsError(false);
    setActiveOption('card');
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center font-montserrat p-4 md:p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl flex flex-col items-center p-6 md:p-8 text-center"
        >
          <div className="w-16 h-16 bg-white border-2 border-[#AB3625] rounded-full flex items-center justify-center mb-4 shadow-sm">
            <RiCheckLine className="text-[#F69C31] text-4xl" />
          </div>
          
          <h2 className="text-lg font-normal text-black mb-1">Successful transaction</h2>
          <p className="text-[10px] text-black/80 font-normal mb-4">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}/ {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
          
          <div className="text-2xl font-normal text-black tracking-tighter mb-1">
            $ {total.toFixed(2)}
          </div>
          
          {activeOption === 'crezine' ? (
            <>
              <p className="text-[10px] text-black/80 font-normal mb-4">Zero transaction fees on wallet to wallet transfer</p>
              <div className="w-full bg-[#F69C31] rounded-xl p-4 mb-4 border border-[#AB3625]/10 flex flex-col items-center justify-center">
                <p className="text-xs text-black/80 font-normal mb-0.5 font-montserrat">Send to:</p>
                <p className="text-sm font-medium text-black font-montserrat">
                  Wallet id : <span className="text-[#AB3625]">ADHGKAHUK</span>
                </p>
              </div>
            </>
          ) : (
            <p className="text-[10px] text-black/80 font-normal mb-8 uppercase tracking-widest mt-2">Payment via {activeOption.replace('-', ' ')}</p>
          )}
          
          <button className="text-[10px] font-normal text-[#AB3625] hover:underline mb-6 tracking-wide">
            Click here to download receipt
          </button>
          
          <button 
            onClick={handleDone}
            className="w-full py-2 bg-secondary text-white rounded-full text-xs font-normal uppercase tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat"
          >
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center font-montserrat p-4 md:p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl flex flex-col items-center p-6 md:p-8 text-center"
        >
          <div className="w-16 h-16 bg-white border-2 border-red-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <RiErrorWarningLine className="text-red-500 text-4xl" />
          </div>
          
          <h2 className="text-lg font-normal text-black mb-1">Insufficient Funds</h2>
          <p className="text-[10px] text-black/80 font-normal mb-4">Please top up your wallet or use a different payment method.</p>
          
          <div className="text-2xl font-normal text-black tracking-tighter mb-1">
            $ {total.toFixed(2)}
          </div>
          <p className="text-[10px] text-black/80 font-normal mb-4">Required amount</p>
          
          <div className="w-full bg-red-50 rounded-xl p-4 mb-6 border border-red-200 flex flex-col items-center justify-center">
            <p className="text-xs text-black/80 font-normal mb-0.5 font-montserrat">Current Balance:</p>
            <p className="text-sm font-medium text-red-600 font-montserrat">
              $ {walletBalance?.toFixed(2) || '0.00'}
            </p>
          </div>
          
          <div className="w-full flex gap-3">
            <button 
              onClick={handleTryAgain}
              className="flex-1 py-2 border border-black text-black rounded-full text-xs font-normal uppercase tracking-widest hover:bg-black hover:text-white transition-all font-montserrat"
            >
              Back
            </button>
            <button 
              onClick={() => parentNavigate('fund')}
              className="flex-1 py-2 bg-secondary text-white rounded-full text-xs font-normal uppercase tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat"
            >
              Top up
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-montserrat p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      <div className="relative w-full max-w-xl flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative bg-white rounded-[2rem] w-full max-w-lg min-h-[90vh] overflow-hidden shadow-2xl flex flex-col max-h-[95vh]"
        >
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClose}
            className="absolute top-4 right-4 z-[120] p-1.5 bg-white/20 backdrop-blur-md border border-black/10 rounded-full text-black hover:bg-white/40 transition-all shadow-sm"
          >
            <X size={28} strokeWidth={3} />
          </motion.button>

          <div className="flex-grow overflow-y-auto p-6 md:p-12 no-scrollbar">
            <div className="flex gap-2 mb-8 bg-pink-100 p-1.5 rounded-xl border border-black/5">
              <button 
                onClick={() => setActiveTab('card')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-normal transition-all duration-300 ${
                  activeTab === 'card' 
                    ? 'bg-secondary text-white shadow-md' 
                    : 'bg-pink-100 text-black hover:bg-pink-200'
                }`}
              >
                Pay by card
              </button>
              <button 
                onClick={() => setActiveTab('mpesa')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-normal transition-all duration-300 ${
                  activeTab === 'mpesa' 
                    ? 'bg-secondary text-white shadow-md' 
                    : 'bg-pink-100 text-black hover:bg-pink-200'
                }`}
              >
                Pay by Mpesa
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'card' ? (
                <motion.div 
                  key="card-content"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="flex flex-row gap-3 md:gap-4 justify-between">
                    {paymentOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setActiveOption(option.id)}
                        className={`flex-1 h-[52px] border text-[10px] md:text-xs font-normal transition-all rounded-xl whitespace-nowrap px-1 ${
                          activeOption === option.id 
                            ? 'bg-secondary border-secondary text-white shadow-sm' 
                            : 'bg-transparent border-black text-black hover:bg-black/5'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {activeOption === 'crezine' ? (
                    <motion.div 
                      key="crezine-wallet"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center p-8 border border-[#AB3625]/20 rounded-[2rem]"
                    >
                      <img src="/crezine.png" alt="Crezine" className="h-20 mb-10 object-contain" />
                      <h3 className="text-lg font-normal text-black mb-1">Pay with your wallet</h3>
                      
                      <div className="mt-8 mb-4 text-center">
                        <span className="text-sm font-normal text-[#AB3625]">Wallet balance: </span>
                        <span className="text-sm font-normal text-black">
                          {isLoadingBalance ? '...' : `$ ${walletBalance?.toFixed(2) || '0.00'}`}
                        </span>
                      </div>
                      
                      <button 
                        onClick={handleConfirmPayment}
                        className="w-full py-2.5 bg-secondary text-white rounded-full text-sm font-normal tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat"
                      >
                        Confirm
                      </button>
                    </motion.div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {[
                          { label: 'Email address', name: 'email', type: 'email' },
                          { label: 'Card number', name: 'cardNumber', type: 'text', placeholder: '0000 0000 0000 0000' }
                        ].map((field) => (
                          <div key={field.name} className="flex flex-col gap-1.5">
                            <label className="text-[10px] tracking-wide text-black font-normal ml-1">{field.label}</label>
                            <input 
                              type={field.type}
                              name={field.name}
                              placeholder={field.placeholder}
                              value={(formData as any)[field.name]}
                              onChange={handleInputChange}
                              className={`w-full h-[44px] px-4 bg-transparent border ${errors[field.name] ? 'border-red-500' : 'border-black/40'} rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black`}
                            />
                            {errors[field.name] && <span className="text-[9px] text-red-500 ml-1">{errors[field.name]}</span>}
                          </div>
                        ))}

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] tracking-wide text-black font-normal ml-1">Expiration date</label>
                            <input 
                              type="text" 
                              name="expiry"
                              placeholder="MM / YY"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              className={`w-full h-[44px] px-4 bg-transparent border ${errors.expiry ? 'border-red-500' : 'border-black/40'} rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black`}
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] tracking-wide text-black font-normal ml-1">Security code</label>
                            <input 
                              type="text" 
                              name="cvc"
                              placeholder="CVC"
                              value={formData.cvc}
                              onChange={handleInputChange}
                              className={`w-full h-[44px] px-4 bg-transparent border ${errors.cvc ? 'border-red-500' : 'border-black/40'} rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black`}
                            />
                          </div>
                        </div>

                        {[
                          { label: 'Cardholder name', name: 'cardholderName' },
                          { label: 'Country', name: 'country' },
                          { label: 'Address', name: 'address' },
                          { label: 'State', name: 'state' }
                        ].map((field) => (
                          <div key={field.name} className="flex flex-col gap-1.5">
                            <label className="text-[10px] tracking-wide text-black font-normal ml-1">{field.label}</label>
                            <input 
                              type="text" 
                              name={field.name}
                              value={(formData as any)[field.name]}
                              onChange={handleInputChange}
                              className={`w-full h-[44px] px-4 bg-transparent border ${errors[field.name] ? 'border-red-500' : 'border-black/40'} rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black`}
                            />
                          </div>
                        ))}

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] tracking-wide text-black font-normal ml-1">Town</label>
                            <input 
                              type="text" 
                              name="town"
                              value={formData.town}
                              onChange={handleInputChange}
                              className="w-full h-[44px] px-4 bg-transparent border border-black/40 rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] tracking-wide text-black font-normal ml-1">Postal code</label>
                            <input 
                              type="text" 
                              name="postalCode"
                              value={formData.postalCode}
                              onChange={handleInputChange}
                              className="w-full h-[44px] px-4 bg-transparent border border-black/40 rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="pt-6 space-y-4">
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-normal text-black/80 tracking-tight leading-none font-montserrat">Subtotal</span>
                          <span className="text-xl md:text-2xl font-normal text-black/80 tracking-tighter leading-none">$ {subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-black/5 pt-4">
                          <span className="text-xs font-normal text-black uppercase tracking-widest font-montserrat">TOTAL</span>
                          <span className="text-xl md:text-2xl font-normal text-black tracking-tighter">$ {total.toFixed(2)}</span>
                        </div>
                      </div>

                      <button 
                        onClick={handleConfirmPayment}
                        className="w-full py-2.5 bg-secondary text-white rounded-full text-sm font-normal tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat"
                      >
                        Pay $ {total.toFixed(2)}
                      </button>
                    </>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="mpesa-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="py-24 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-secondary/5 rounded-full flex items-center justify-center mb-4">
                    <div className="w-8 h-8 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" />
                  </div>
                  <h3 className="text-sm font-normal uppercase tracking-widest text-black">Mpesa Checkout</h3>
                  <p className="text-sm text-black/80 max-w-[280px] leading-relaxed font-normal">This payment method is being integrated. Please use pay by card for now.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default CheckoutView;
