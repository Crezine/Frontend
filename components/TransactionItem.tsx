
import React from 'react';

interface TransactionItemProps {
  title: string;
  date: string;
  amount: string;
  type: 'positive' | 'negative';
}

const TransactionItem: React.FC<TransactionItemProps> = ({ title, date, amount, type }) => (
  <div className="flex items-center justify-between py-4 border-b border-secondary/5 last:border-0 group cursor-pointer hover:bg-accent/5 -mx-2 px-2 rounded-xl transition-colors">
    <div className="flex items-center gap-4 min-w-0">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-colors shrink-0 ${type === 'positive' ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200' : 'bg-accent text-secondary group-hover:bg-secondary/10'}`}>
        {type === 'positive' ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-bold text-secondary font-montserrat text-[13px] md:text-base leading-tight mb-0.5 truncate">{title}</p>
        <p className="text-[10px] text-secondary/50 font-bold uppercase tracking-widest font-montserrat">{date}</p>
      </div>
    </div>
    <div className="pl-4 shrink-0 text-right">
      <span className={`font-black font-montserrat text-sm md:text-lg ${type === 'positive' ? 'text-emerald-600' : 'text-secondary'}`}>
        {amount}
      </span>
    </div>
  </div>
);

export default TransactionItem;
