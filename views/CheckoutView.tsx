import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ViewProps } from '../types';
import { 
  FiArrowLeft, FiCheckCircle, FiAlertCircle, FiCreditCard, 
  FiSmartphone, FiHome, FiShoppingBag, FiChevronRight, FiX
} from 'react-icons/fi';
import { FaPaypal, FaApple, FaGooglePay } from 'react-icons/fa';

type PaymentMethod = 'card' | 'mpesa' | 'paypal' | 'apple-pay' | 'google-pay' | 'bank';
type CheckoutStatus = 'idle' | 'processing' | 'success' | 'error';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

const CheckoutView: React.FC<ViewProps> = ({ navigate: parentNavigate }) => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  const [phone, setPhone] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvc: '' });

  const cartItems = useMemo<CartItem[]>(() => {
    const saved = localStorage.getItem('crezine_cart');
    try {
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  }, []);

  const subtotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0), 
  [cartItems]);

  const isFormValid = useMemo(() => {
    if (cartItems.length === 0) return false;
    if (selectedMethod === 'mpesa') return phone.trim().length >= 10;
    if (selectedMethod === 'card') {
      return cardDetails.number.replace(/\s/g, '').length >= 16 && 
             cardDetails.expiry.length >= 5 && 
             cardDetails.cvc.length >= 3;
    }
    return true;
  }, [selectedMethod, phone, cardDetails, cartItems]);

  const handleProcessPayment = () => {
    if (!isFormValid) return;
    setStatus('processing');
    setTimeout(() => {
      const isSuccessful = true;
      if (isSuccessful) {
        setStatus('success');
        localStorage.removeItem('crezine_cart');
      } else {
        setStatus('error');
      }
    }, 2500);
  };

  const methods = [
    { id: 'card' as PaymentMethod, name: 'Credit/Debit Card' },
    { id: 'mpesa' as PaymentMethod, name: 'M-PESA' },
    { id: 'paypal' as PaymentMethod, name: 'PayPal' },
    { id: 'apple-pay' as PaymentMethod, name: 'Apple Pay' },
    { id: 'google-pay' as PaymentMethod, name: 'Google Pay' },
    { id: 'bank' as PaymentMethod, name: 'Bank Transfer' },
  ];

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-accent flex items-center justify-center p-6 font-montserrat">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8">
            <FiCheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-light text-black mb-4 uppercase tracking-tighter font-rubik">Order Secured!</h2>
          <p className="text-black font-normal font-montserrat tracking-widest leading-relaxed mb-10">
            Your masterpiece is on its way. We have sent a confirmation email with your order details.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => parentNavigate('shop')}
              className="bg-[#AB3625] text-white py-2.5 px-8 rounded-full text-[10px] font-normal uppercase tracking-[0.2em] hover:opacity-90 transition-all shadow-lg shadow-[#AB3625]/20"
            >
              Back to Shop
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-accent font-montserrat flex flex-col selection:bg-primary/30 overflow-x-hidden text-black">
      {/* Header */}
      <header className="p-4 md:p-8 flex items-center justify-between sticky top-0 bg-accent/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-6 md:gap-12">
          <img 
            src="/shop.png" 
            alt="Crezine" 
            className="h-6 md:h-8 cursor-pointer" 
            onClick={() => parentNavigate('shop')}
          />
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-black hover:text-[#AB3625] transition-colors text-[10px] md:text-xs tracking-widest font-normal"
          >
            <FiArrowLeft />
            <span className="hidden sm:inline font-montserrat uppercase">Go Back</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 flex items-center gap-2 bg-transparent rounded-full border border-black">
            <FiShoppingBag size={14} className="text-black" />
            <span className="text-[11px] font-normal text-black font-montserrat">$ {subtotal.toFixed(2)}</span>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 lg:items-start">
          
          {/* Section 1: Payment Methods Selection */}
          <div className="lg:w-1/4 order-1">
            <div className="lg:sticky lg:top-32 space-y-8 md:space-y-12">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-light text-black mb-3 uppercase tracking-tighter font-rubik leading-none">Checkout</h1>
                <p className="text-black font-normal font-montserrat text-[10px] md:text-xs tracking-widest uppercase">Choose payment method</p>
              </div>

              <nav className="grid grid-cols-2 lg:flex lg:flex-col gap-3 lg:gap-8">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id)}
                    className={`text-left p-4 lg:p-0 lg:bg-transparent rounded-2xl transition-all duration-300 relative flex items-center border lg:border-none ${
                      selectedMethod === m.id 
                        ? 'bg-[#AB3625] border-[#AB3625] text-white lg:bg-transparent lg:text-black' 
                        : 'bg-transparent border-black text-black lg:text-black'
                    }`}
                  >
                    <span className={`text-[9px] md:text-[10px] lg:text-xs tracking-[0.2em] uppercase transition-all ${
                      selectedMethod === m.id 
                        ? 'font-light font-rubik' 
                        : 'font-normal font-montserrat'
                    }`}>
                      {m.name}
                    </span>
                    {selectedMethod === m.id && (
                      <motion.div 
                        layoutId="nav-underline" 
                        className="hidden lg:block absolute -bottom-2 left-0 right-0 h-[2px] bg-[#F69C31]" 
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Section 2: Payment Details Form */}
          <div className="lg:w-2/4 flex flex-col order-2 mt-12 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMethod}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="space-y-10 md:space-y-12"
              >
                <div className="flex items-center justify-between border-b border-black/10 pb-6 md:pb-8">
                  <div>
                    <h3 className="text-xl md:text-2xl font-light text-black uppercase tracking-tight font-rubik">
                      {methods.find(m => m.id === selectedMethod)?.name} Details
                    </h3>
                  </div>
                </div>

                {/* Method Specific UI */}
                <div className="min-h-[250px] md:min-h-[400px]">
                  {selectedMethod === 'mpesa' && (
                    <div className="space-y-8 md:space-y-10">
                      <p className="text-xs md:text-sm font-normal font-montserrat text-black tracking-widest leading-relaxed">
                        Enter your M-PESA registered phone number. A secure prompt will be sent to your device.
                      </p>
                      <div className="space-y-4">
                        <label className="text-[9px] md:text-[10px] text-black font-normal tracking-[0.2em] block uppercase font-montserrat">Phone Number</label>
                        <input 
                          type="text" 
                          placeholder="254..."
                          className="w-full bg-transparent border-b border-black py-3 md:py-4 focus:border-black outline-none transition-all font-montserrat text-black text-lg md:text-2xl placeholder:text-black/5"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'card' && (
                    <div className="space-y-10 md:space-y-12">
                      <p className="text-xs md:text-sm font-normal font-montserrat text-black tracking-widest leading-relaxed">
                        Secure SSL encrypted transaction. Your card details are never stored on our servers.
                      </p>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:gap-y-12">
                        <div className="col-span-2 space-y-4">
                          <label className="text-[9px] md:text-[10px] text-black font-normal tracking-[0.2em] block uppercase font-montserrat">Card Number</label>
                          <input 
                            type="text" 
                            placeholder="0000 0000 0000 0000" 
                            className="w-full bg-transparent border-b border-black py-3 md:py-4 focus:border-black outline-none transition-all font-montserrat text-black text-lg md:text-2xl placeholder:text-black/5"
                            value={cardDetails.number}
                            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] md:text-[10px] text-black font-normal tracking-[0.2em] block uppercase font-montserrat">Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM / YY" 
                            className="w-full bg-transparent border-b border-black py-3 md:py-4 focus:border-black outline-none transition-all font-montserrat text-black text-lg md:text-xl placeholder:text-black/5"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          />
                        </div>
                        <div className="space-y-4">
                          <label className="text-[9px] md:text-[10px] text-black font-normal tracking-[0.2em] block uppercase font-montserrat">CVC</label>
                          <input 
                            type="password" 
                            placeholder="***" 
                            className="w-full bg-transparent border-b border-black py-3 md:py-4 focus:border-black outline-none transition-all font-montserrat text-black text-lg md:text-xl placeholder:text-black/5"
                            value={cardDetails.cvc}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'bank' && (
                    <div className="space-y-10">
                      <p className="text-xs md:text-sm font-normal font-montserrat text-black tracking-widest leading-relaxed">
                        Transfer the exact amount to the account below. Use your name as reference.
                      </p>
                      <div className="space-y-6 bg-transparent p-6 md:p-8 rounded-3xl border border-black">
                        {[
                          { label: 'Bank Name', value: 'Standard Chartered' },
                          { label: 'Account Name', value: 'Crezine Limited' },
                          { label: 'Account Number', value: '1234 5678 90' },
                          { label: 'Swift Code', value: 'CRZNKE' },
                        ].map((detail, idx) => (
                          <div key={idx} className="flex justify-between items-center border-b border-black/10 last:border-0 pb-4 last:pb-0">
                            <span className="text-[9px] md:text-[10px] font-normal font-montserrat text-black tracking-[0.1em]">{detail.label}</span>
                            <span className="text-xs md:text-sm font-normal text-black tracking-widest font-montserrat">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedMethod === 'paypal' || selectedMethod === 'apple-pay' || selectedMethod === 'google-pay') && (
                    <div className="py-12 flex flex-col items-center text-center space-y-8">
                      <div className="flex items-center gap-4">
                        {selectedMethod === 'paypal' && <FaPaypal size={60} className="text-[#003087]" />}
                        {selectedMethod === 'apple-pay' && <FaApple size={60} className="text-black" />}
                        {selectedMethod === 'google-pay' && <FaGooglePay size={80} className="text-[#4285F4]" />}
                      </div>
                      <p className="text-xs md:text-sm font-normal font-montserrat text-black tracking-widest leading-relaxed max-w-xs">
                        You will be redirected to {methods.find(m => m.id === selectedMethod)?.name} to authorize payment.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Section 3: Order Summary & Final Pay Button */}
          <div className="lg:w-1/4 order-3 mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-32 space-y-8">
              <div className="bg-transparent border border-black p-6 md:p-8 rounded-[2.5rem] space-y-8">
                <div>
                  <h4 className="text-xs font-light text-black uppercase tracking-[0.2em] border-b border-black pb-4 font-rubik">Order Summary</h4>
                </div>
                
                <div className="space-y-5 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                          <p className="text-[11px] font-normal text-black leading-tight mb-1 font-montserrat">{item.name}</p>
                          <p className="text-[9px] text-black font-normal font-montserrat tracking-wider uppercase">Quantity: {item.quantity}</p>
                        </div>
                        <span className="text-[11px] font-normal text-black font-montserrat">$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-black font-normal font-montserrat italic py-4">Your cart is empty</p>
                  )}
                </div>

                <div className="pt-6 border-t border-black space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-normal font-montserrat text-black tracking-wider uppercase">Subtotal</span>
                    <span className="text-[11px] font-normal text-black font-montserrat">$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-black">
                    <span className="text-[11px] font-normal text-black uppercase tracking-widest font-montserrat">Total</span>
                    <span className="text-base md:text-xl font-light text-black font-rubik">$ {subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleProcessPayment}
                  disabled={status === 'processing' || !isFormValid}
                  className="w-full bg-[#AB3625] text-white py-3 md:py-4 rounded-full text-xs font-normal tracking-widest uppercase hover:opacity-90 transition-all disabled:opacity-30 disabled:cursor-not-allowed font-montserrat shadow-xl shadow-[#AB3625]/20"
                >
                  {status === 'processing' ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying...</span>
                    </div>
                  ) : (
                    'Complete payment'
                  )}
                </button>
              </div>
              
              <p className="text-[8px] md:text-[9px] text-center text-black font-normal font-montserrat tracking-[0.2em] uppercase px-4">
                Secure 256-bit SSL encrypted checkout. 
                <br/>By paying, you agree to our Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Error Notifications */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 z-[100] w-[90%] md:w-auto"
          >
            <FiAlertCircle size={18} className="text-[#AB3625]" />
            <span className="text-[10px] font-normal uppercase tracking-[0.15em] font-montserrat">Transaction failed. Please check your details.</span>
            <button onClick={() => setStatus('idle')} className="ml-auto hover:opacity-50 transition-opacity"><FiX size={16} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutView;
