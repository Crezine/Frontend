import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ViewProps } from '../types';
import { FiX } from 'react-icons/fi';
import { RiCheckLine } from 'react-icons/ri';

type MainTab = 'card' | 'mpesa';
type PaymentOption = 'card' | 'apple-pay' | 'google-pay' | 'crezine';

const CheckoutView: React.FC<ViewProps> = ({ navigate: parentNavigate }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MainTab>('card');
  const [activeOption, setActiveOption] = useState<PaymentOption>('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [walletBalance, setWalletBalance] = useState(2500.00);
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
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const cartItems = useMemo(() => {
    const saved = localStorage.getItem('crezine_cart');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  }, []);

  const subtotal = useMemo(() => 
    cartItems.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0), 
  [cartItems]);

  const total = subtotal;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleConfirmWalletPayment = () => {
    const newBalance = walletBalance - total;
    setWalletBalance(newBalance);
    setIsSuccess(true);
  };

  const handleDone = () => {
    parentNavigate('wallet');
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center font-montserrat p-4 md:p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative bg-white border border-secondary/30 rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col items-center p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-white border-2 border-primary rounded-full flex items-center justify-center mb-6 shadow-sm shadow-primary/20">
            <RiCheckLine className="text-primary text-5xl" />
          </div>
          
          <h2 className="text-2xl font-medium text-black mb-2">Successful Transaction</h2>
          <p className="text-xs text-black/40 font-medium mb-6">17th Apr 2026/ 12:59 pm</p>
          
          <div className="text-4xl font-light text-black font-rubik tracking-tighter mb-2">
            $ {total.toFixed(2)}
          </div>
          <p className="text-[10px] text-black/60 font-medium mb-8">Zero transaction fees on wallet to wallet transfer</p>
          
          <div className="w-full bg-[#FFF9C4] rounded-2xl p-6 mb-8 border border-[#FBC02D]/10">
            <p className="text-[10px] uppercase tracking-widest text-black/40 font-bold mb-2">Send to:</p>
            <p className="text-sm font-bold text-black tracking-wide">Wallet ID : ADHGKAHUK</p>
          </div>
          
          <button className="text-xs font-bold text-[#AB3625] hover:underline mb-10 tracking-wide">
            Click here to Download Receipt
          </button>
          
          <button 
            onClick={handleDone}
            className="w-full bg-secondary text-white py-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg shadow-secondary/20"
          >
            Done
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-montserrat p-4 md:p-8">
      {/* Backdrop with Blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
      />

      <div className="relative w-full max-w-lg flex flex-col items-center">
        {/* Smart Card (The Modal) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative bg-white border border-secondary/30 rounded-[2rem] w-full overflow-hidden shadow-2xl flex flex-col max-h-[80vh]"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-[120] p-2 bg-white border border-black rounded-full text-black hover:bg-black hover:text-white transition-all shadow-sm"
          >
            <FiX size={16} />
          </button>

          {/* Scrollable Content */}
          <div className="flex-grow overflow-y-auto p-5 md:p-10 no-scrollbar">
            {/* Header Tabs Inside Card */}
            <div className="flex gap-2 mb-8 bg-gray-50 p-1.5 rounded-xl border border-black/5">
              <button 
                onClick={() => setActiveTab('card')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  activeTab === 'card' 
                    ? 'bg-secondary text-white shadow-md' 
                    : 'text-black/40 hover:bg-black/5'
                }`}
              >
                Pay by card
              </button>
              <button 
                onClick={() => setActiveTab('mpesa')}
                className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                  activeTab === 'mpesa' 
                    ? 'bg-secondary text-white shadow-md' 
                    : 'text-black/40 hover:bg-black/5'
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
                  {/* Payment Options */}
                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                    {paymentOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setActiveOption(option.id)}
                        className={`py-3 px-2 md:px-4 border text-[10px] md:text-xs font-medium transition-all rounded-xl ${
                          activeOption === option.id 
                            ? 'bg-secondary border-secondary text-white shadow-sm' 
                            : 'bg-transparent border-black text-black hover:bg-black/5'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {[
                      { label: 'Email address', name: 'email', type: 'email' },
                      { label: 'Card number', name: 'cardNumber', type: 'text', placeholder: '0000 0000 0000 0000' }
                    ].map((field) => (
                      <div key={field.name} className="flex flex-col gap-1.5">
                        <label className="text-[10px] tracking-wide text-black/70 font-medium ml-1">{field.label}</label>
                        <input 
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={(formData as any)[field.name]}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border border-black/40 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                    ))}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] tracking-wide text-black/70 font-medium ml-1">Expiration date</label>
                        <input 
                          type="text" 
                          name="expiry"
                          placeholder="MM / YY"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border border-black/40 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] tracking-wide text-black/70 font-medium ml-1">Security code</label>
                        <input 
                          type="text" 
                          name="cvc"
                          placeholder="CVC"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border border-black/40 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-secondary transition-colors"
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
                        <label className="text-[10px] tracking-wide text-black/70 font-medium ml-1">{field.label}</label>
                        <input 
                          type="text" 
                          name={field.name}
                          value={(formData as any)[field.name]}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border border-black/40 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                    ))}

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] tracking-wide text-black/70 font-medium ml-1">Town</label>
                        <input 
                          type="text" 
                          name="town"
                          value={formData.town}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border border-black/40 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] tracking-wide text-black/70 font-medium ml-1">Postal code</label>
                        <input 
                          type="text" 
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border border-black/40 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-secondary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="pt-6 space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-xl md:text-2xl font-normal text-black/60 tracking-tight leading-none font-montserrat">Subtotal</span>
                      <span className="text-xl md:text-2xl font-medium text-black tracking-tighter leading-none font-rubik">$ {subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center border-t border-black/5 pt-4">
                      <span className="text-xs font-bold text-black uppercase tracking-[0.2em] font-montserrat">TOTAL</span>
                      <span className="text-xl md:text-2xl font-light text-black font-rubik tracking-tighter">$ {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button 
                    className="w-full bg-secondary text-white py-3 md:py-4 rounded-full text-xs font-medium uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg shadow-secondary/20"
                  >
                    Pay $ {total.toFixed(2)}
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="mpesa-content"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="py-20 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-secondary/5 rounded-full flex items-center justify-center mb-4">
                    <div className="w-8 h-8 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" />
                  </div>
                  <h3 className="text-sm font-medium uppercase tracking-widest text-black">Mpesa Checkout</h3>
                  <p className="text-[10px] text-black/60 max-w-[240px] leading-relaxed">This payment method is being integrated. Please use Pay by Card for now.</p>
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
