import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { escrowService, EscrowContract } from '../src/services/escrowService';

interface EscrowViewProps {
  navigate: (view: AppView) => void;
}

const EscrowView: React.FC<EscrowViewProps> = ({ navigate }) => {
  const [contracts, setContracts] = useState<EscrowContract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [paymentType, setPaymentType] = useState('Escrow payout (Handled by an escrow gateway)');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = async () => {
    try {
      setIsLoading(true);
      const data = await escrowService.getContracts();
      setContracts(data);
    } catch (error) {
      console.error("Failed to fetch contracts", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateLink = async () => {
    if (!clientName || !amount || !description) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await escrowService.createContract({
        clientId: clientName,
        title: description,
        description: description,
        totalAmount: parseFloat(amount) * 100, // convert to cents
        currency: currency,
      });
      
      // Reset form
      setClientName('');
      setAmount('');
      setDescription('');
      
      // Refresh list
      fetchContracts();
      alert("Escrow link generated successfully!");
    } catch (error) {
      console.error("Failed to create contract", error);
      alert("Failed to generate escrow link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 md:py-16 font-montserrat transition-colors">
      <header className="mb-10 md:mb-14 text-center">
        <h1 className="text-3xl md:text-4xl font-normal font-rubik text-secondary dark:text-primary leading-tight mb-3">Invoice link</h1>
        <p className="text-black dark:text-white font-normal text-sm md:text-base font-montserrat">Professional payment links that work everywhere</p>
      </header>

      <div className="bg-white dark:bg-gray-800 rounded-[2rem] border border-secondary/20 dark:border-secondary/40 p-6 md:p-10 mb-12 shadow-sm transition-colors">
        <div className="space-y-6 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black dark:text-gray-300 ml-1 font-montserrat">Client name:</label>
            <input 
              type="text" 
              placeholder="e.g. Acme Creative Agency"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white h-[52px]"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-400 ml-1 font-montserrat">Amount</label>
              <div className="flex relative group">
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="appearance-none bg-gray-50 dark:bg-gray-900 border border-black border-r-0 rounded-l-xl px-4 text-xs font-normal text-secondary dark:text-primary focus:outline-none cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors pr-8"
                >
                  <option>USD</option>
                  <option>KES</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>NGN</option>
                </select>
                <div className="absolute left-[55px] top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 1L4 4L1 1" stroke="#F69C31" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input 
                  type="number" 
                  placeholder="1500"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full h-[52px] px-4 bg-transparent border border-black rounded-r-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm font-rubik dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-normal text-black/70 dark:text-gray-400 ml-1 font-montserrat">Payment type</label>
              <div className="relative group">
                <select 
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="w-full h-[52px] py-3 px-4 bg-gray-50 dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal appearance-none text-xs dark:text-white pr-10 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 font-montserrat"
                >
                  <option>Standard payout (Normal payout)</option>
                  <option>Escrow payout (Handled by an escrow gateway)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none group-hover:scale-110 transition-transform">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 2.5L5 6.5L1 2.5" stroke="#F69C31" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs font-normal text-black/70 dark:text-gray-400 ml-1 font-montserrat">What's this for?</label>
            <input 
              type="text" 
              placeholder="e.g. Illustration package - phase 1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full py-3 px-4 bg-white dark:bg-gray-900 border border-black rounded-xl focus:outline-none focus:border-secondary transition-all font-normal text-sm dark:text-white h-[52px]"
            />
          </div>
          
          <div className="pt-4 flex flex-col items-center gap-4">
            <button 
              onClick={handleGenerateLink}
              disabled={isSubmitting}
              className="w-full max-w-xs h-[52px] bg-secondary text-white rounded-full font-normal text-sm hover:opacity-95 transition-all shadow-md font-montserrat disabled:opacity-50"
            >
              {isSubmitting ? 'Generating...' : 'Generate link'}
            </button>
            <button className="text-[10px] md:text-xs font-normal text-secondary hover:underline transition-all text-center font-montserrat">
              Click here to reuse this link for multiple payments
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-normal text-black/80 dark:text-primary mb-4 px-1 font-rubik">Active gigs</h3>
        
        {isLoading ? (
          <div className="text-center py-10 text-black/40 font-montserrat">Loading gigs...</div>
        ) : contracts.length === 0 ? (
          <div className="text-center py-10 text-black/40 font-montserrat">No active gigs found</div>
        ) : contracts.map(contract => (
          <div key={contract.id} className="bg-white dark:bg-gray-800 rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden shadow-sm transition-colors mb-4">
            <div className="p-8 border-b border-black/5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                <h4 className="text-lg font-normal text-black/80 dark:text-gray-200 font-montserrat">{contract.title}</h4>
                <span className={`px-3 py-1 rounded-full text-[10px] font-normal border uppercase tracking-wider font-montserrat ${
                  contract.status === 'locked' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-900/50' :
                  contract.status === 'completed' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-200 dark:border-green-900/50' :
                  'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-900/50'
                }`}>
                  {contract.status}
                </span>
              </div>
              <p className="text-black/40 dark:text-gray-400 text-xs mb-6 font-montserrat">Client: {contract.clientId}</p>
              <div className="w-full bg-black/5 dark:bg-white/5 h-1.5 rounded-full mb-8">
                <div className={`h-full rounded-full ${contract.status === 'completed' ? 'bg-green-500 w-full' : 'bg-green-500 w-1/2'}`}></div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] text-black/40 dark:text-gray-400 uppercase font-normal tracking-widest mb-1 font-montserrat">Total</p>
                    <p className="font-normal text-black/80 dark:text-primary font-rubik text-base">
                      {contract.currency === 'USD' ? '$' : contract.currency} {(contract.totalAmount / 100).toLocaleString()}
                    </p>
                  </div>
                </div>
                {contract.status === 'locked' && (
                  <button 
                    onClick={() => alert("Release requested!")}
                    className="bg-secondary text-white px-6 py-2 rounded-xl font-normal text-xs hover:bg-secondary/90 transition-colors whitespace-nowrap h-[40px] font-montserrat"
                  >
                    Request release
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EscrowView;
