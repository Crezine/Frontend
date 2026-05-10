import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ViewProps } from '../types';
import { FiX } from 'react-icons/fi';
import { RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';
import { PDFDownloadLink } from '@react-pdf/renderer'; // Library for PDF download
import EventTicket from '../components/EventTicket';
import TicketPDF from '../components/TicketPDF'; // The PDF layout component
import { walletService } from '../src/services/walletService';

type MainTab = 'card' | 'mpesa';
type PaymentOption = 'card' | 'apple-pay' | 'google-pay' | 'crezine';

const TicketCheckoutView: React.FC<ViewProps> = ({ navigate: parentNavigate }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<MainTab>('card');
  const [activeOption, setActiveOption] = useState<PaymentOption>('card');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [isLoadingBalance, setIsLoadingBalance] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Real ticket data from localStorage or default
  const ticketData = useMemo(() => {
    try {
      const saved = localStorage.getItem('crezine_ticket_data');
      return saved ? JSON.parse(saved) : {
        eventName: "Oktoba Fest 2026",
        eventDate: "20 . 11 . 2026",
        startTime: "12 : 00 PM",
        endTime: "12 : 00 AM",
        checkInType: "Vip experience",
        orderId: "BGD99763JS",
        location: "Kileleshwa",
        eventImage: "/event_demo.png"
      };
    } catch (e) {
      return {
        eventName: "Oktoba Fest 2026",
        eventDate: "20 . 11 . 2026",
        startTime: "12 : 00 PM",
        endTime: "12 : 00 AM",
        checkInType: "Vip experience",
        orderId: "BGD99763JS",
        location: "Kileleshwa",
        eventImage: "/event_demo.png"
      };
    }
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    cardholderName: '',
  });

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
      setWalletBalance(data.balance / 100);
    } catch (error) {
      console.error("Failed to fetch balance", error);
      setWalletBalance(0); 
    } finally {
      setIsLoadingBalance(false);
    }
  };

  const totalAmount = useMemo(() => {
    const saved = localStorage.getItem('crezine_checkout_total');
    return saved ? parseFloat(saved) : 250.00;
  }, []);

  const total = totalAmount;

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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSendEmail = async () => {
    if (!email) {
      alert("Please enter an email address");
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      alert("Success! Ticket has been sent to " + email);
    }, 1500);
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
        
        <AnimatePresence>
          {showTicketModal && (
            <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowTicketModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative z-[140] w-full max-w-[620px] max-h-[90vh] overflow-visible">
                <button onClick={() => setShowTicketModal(false)} className="absolute -top-3 -right-3 z-[150] p-2.5 bg-white border border-black rounded-full text-black hover:bg-black hover:text-white transition-all shadow-xl"><FiX size={18} /></button>
                <div className="w-full h-full overflow-y-auto no-scrollbar rounded-[2rem]"><EventTicket {...ticketData} /></div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white border border-secondary/30 rounded-[2rem] w-full max-w-xl min-h-[85vh] overflow-hidden shadow-2xl flex flex-col items-center p-8 md:p-12 text-center">
          <div className="w-24 h-24 bg-white border-4 border-secondary rounded-full flex items-center justify-center mb-8 shadow-sm">
            <RiCheckLine className="text-primary text-6xl" />
          </div>
          <h2 className="text-2xl font-medium text-black mb-1 font-montserrat">Payment Complete</h2>
          <p className="text-xl font-medium text-black mb-8 font-montserrat">Thank you</p>
          <p className="text-sm font-normal text-secondary mb-10 font-montserrat px-4">Enter your email to receive your PDF ticket</p>
          <div className="w-full max-w-sm space-y-4">
            <div className="flex flex-col items-start gap-2 w-full text-left">
              <label className="text-sm font-normal text-black font-montserrat ml-1">Email address *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 px-4 bg-transparent border border-black rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black" placeholder="Enter your email" />
            </div>
            <button onClick={handleSendEmail} disabled={isSending} className="w-full py-3 bg-secondary text-white rounded-full text-sm font-normal tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat disabled:opacity-50">{isSending ? "Sending..." : "Send ticket to email"}</button>
            <PDFDownloadLink document={<TicketPDF data={ticketData} />} fileName={`${ticketData.orderId}-ticket.pdf`} className="w-full py-3 bg-white border border-black text-black rounded-full text-sm font-normal tracking-widest hover:bg-black hover:text-white transition-all font-montserrat text-center block">{({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF ticket')}</PDFDownloadLink>
            <div className="flex justify-center gap-6 pt-2">
              <button onClick={() => setShowTicketModal(true)} className="text-xs font-normal text-black hover:text-secondary underline decoration-secondary/30 transition-all font-montserrat tracking-widest uppercase">Preview ticket</button>
              <button onClick={handleDone} className="text-xs font-normal text-black hover:text-secondary underline decoration-secondary/30 transition-all font-montserrat tracking-widest uppercase">Back to wallet</button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center font-montserrat p-4 md:p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl flex flex-col items-center p-6 md:p-8 text-center">
          <div className="w-16 h-16 bg-white border-2 border-red-500 rounded-full flex items-center justify-center mb-4 shadow-sm">
            <RiErrorWarningLine className="text-red-500 text-4xl" />
          </div>
          <h2 className="text-lg font-normal text-black mb-1 font-montserrat">Insufficient Funds</h2>
          <p className="text-[10px] text-black/80 font-normal mb-4">Please top up your wallet or use a different payment method.</p>
          <div className="text-2xl font-normal text-black tracking-tighter mb-1">$ {total.toFixed(2)}</div>
          <p className="text-[10px] text-black/80 font-normal mb-6">Required amount</p>
          <div className="w-full bg-red-50 rounded-xl p-4 mb-8 border border-red-200 flex flex-col items-center justify-center">
            <p className="text-xs text-black/80 font-normal mb-0.5 font-montserrat">Current Balance:</p>
            <p className="text-sm font-medium text-red-600 font-montserrat">$ {walletBalance?.toFixed(2) || '0.00'}</p>
          </div>
          <div className="w-full flex gap-3">
            <button onClick={handleTryAgain} className="flex-1 py-2 border border-black text-black rounded-full text-xs font-normal uppercase tracking-widest hover:bg-black hover:text-white transition-all font-montserrat">Back</button>
            <button onClick={() => parentNavigate('fund')} className="flex-1 py-2 bg-secondary text-white rounded-full text-xs font-normal uppercase tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat">Top up</button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center font-montserrat p-4 md:p-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <div className="relative w-full max-w-xl flex flex-col items-center">
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="relative bg-white rounded-[2rem] w-full min-h-[90vh] overflow-hidden shadow-2xl flex flex-col max-h-[95vh] transition-colors border border-black/5">
          <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="absolute top-4 right-4 z-[120] p-1.5 bg-white/20 backdrop-blur-md border border-black/10 rounded-full text-black hover:bg-white/40 transition-all shadow-sm"><FiX size={28} strokeWidth={3} /></motion.button>
          <div className="flex-grow overflow-y-auto p-6 md:p-12 no-scrollbar">
            <div className="flex gap-2 mb-8 bg-pink-100 p-1.5 rounded-xl border border-black/5">
              <button onClick={() => setActiveTab('card')} className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-normal transition-all duration-300 ${activeTab === 'card' ? 'bg-secondary text-white shadow-md' : 'bg-pink-100 text-black hover:bg-pink-200'}`}>Pay by card</button>
              <button onClick={() => setActiveTab('mpesa')} className={`flex-1 px-4 py-2.5 rounded-lg text-xs font-normal transition-all duration-300 ${activeTab === 'mpesa' ? 'bg-secondary text-white shadow-md' : 'bg-pink-100 text-black hover:bg-pink-200'}`}>Pay by Mpesa</button>
            </div>
            <AnimatePresence mode="wait">
              {activeTab === 'card' ? (
                <motion.div key="card-content" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                  <div className="flex flex-row gap-3 md:gap-4 justify-between">
                    {['card', 'apple-pay', 'google-pay', 'crezine'].map((opt) => (
                      <button key={opt} onClick={() => setActiveOption(opt as PaymentOption)} className={`flex-1 h-[52px] border text-[10px] md:text-xs font-normal transition-all rounded-xl whitespace-nowrap px-1 ${activeOption === opt ? 'bg-secondary border-secondary text-white shadow-sm' : 'bg-transparent border-black text-black hover:bg-black/5'}`}>{opt}</button>
                    ))}
                  </div>
                  {activeOption === 'crezine' ? (
                    <div className="flex flex-col items-center p-8 border border-[#AB3625]/20 rounded-[2rem]">
                      <img src="/crezine.png" alt="Crezine" className="h-20 mb-10 object-contain" />
                      <h3 className="text-lg font-normal text-black mb-1">Pay with your wallet</h3>
                      <div className="mt-8 mb-4 text-center">
                        <span className="text-sm font-normal text-[#AB3625]">Wallet balance: </span>
                        <span className="text-sm font-normal text-black">{isLoadingBalance ? '...' : `$ ${walletBalance?.toFixed(2) || '0.00'}`}</span>
                      </div>
                      <button onClick={handleConfirmPayment} className="w-full py-2.5 bg-secondary text-white rounded-full text-sm font-normal tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat">Confirm</button>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] tracking-wide text-black font-normal ml-1">Email address</label>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" className={`w-full h-[44px] px-4 bg-transparent border ${errors.email ? 'border-red-500' : 'border-black/40'} rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black`} />
                          {errors.email && <span className="text-[9px] text-red-500 ml-1">{errors.email}</span>}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] tracking-wide text-black font-normal ml-1">Card number</label>
                          <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" className={`w-full h-[44px] px-4 bg-transparent border ${errors.cardNumber ? 'border-red-500' : 'border-black/40'} rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black`} />
                          {errors.cardNumber && <span className="text-[9px] text-red-500 ml-1">{errors.cardNumber}</span>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] tracking-wide text-black font-normal ml-1">Expiration</label>
                            <input type="text" name="expiry" value={formData.expiry} onChange={handleInputChange} placeholder="MM / YY" className={`w-full h-[44px] px-4 bg-transparent border ${errors.expiry ? 'border-red-500' : 'border-black/40'} rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black`} />
                            {errors.expiry && <span className="text-[9px] text-red-500 ml-1">{errors.expiry}</span>}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] tracking-wide text-black font-normal ml-1">CVC</label>
                            <input type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="CVC" className={`w-full h-[44px] px-4 bg-transparent border ${errors.cvc ? 'border-red-500' : 'border-black/40'} rounded-xl text-xs font-normal focus:outline-none focus:border-secondary transition-colors text-black`} />
                            {errors.cvc && <span className="text-[9px] text-red-500 ml-1">{errors.cvc}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="pt-6 space-y-4">
                        <div className="flex justify-between items-end border-t border-black/5 pt-4">
                          <span className="text-xs font-normal text-black uppercase tracking-widest">TOTAL</span>
                          <span className="text-xl md:text-2xl font-normal text-black tracking-tighter">$ {total.toFixed(2)}</span>
                        </div>
                      </div>
                      <button onClick={handleConfirmPayment} className="w-full py-2.5 bg-secondary text-white rounded-full text-sm font-normal tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat">Pay $ {total.toFixed(2)}</button>
                    </>
                  )}
                </motion.div>
              ) : (
                <div className="py-24 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary/5 rounded-full flex items-center justify-center mb-4"><div className="w-8 h-8 border-2 border-secondary/20 border-t-secondary rounded-full animate-spin" /></div>
                  <h3 className="text-sm font-normal uppercase tracking-widest text-black">Mpesa Checkout</h3>
                  <p className="text-sm text-black/80 max-w-[280px] leading-relaxed font-normal">Integration in progress. Use card for now.</p>
                </div>
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

export default TicketCheckoutView;
