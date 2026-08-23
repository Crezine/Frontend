import React from 'react';

export const PartnershipSection: React.FC = () => {
  return (
    <section id="partnership" className="scroll-mt-20">
      <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">
        07 · Partnership Rules
      </span>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
        <div className="md:col-span-5">
          <h2 className="text-2xl md:text-3xl font-rubik font-normal text-secondary leading-tight">
            Co-marketing rules.
          </h2>
        </div>
        <div className="md:col-span-7 font-rubik text-sm md:text-base font-light text-black opacity-80 leading-relaxed">
          Partners get the brand exactly as it ships. Recoloring, stretching, or altering the logo will void co-marketing approval.
        </div>
      </div>

      <div className="bg-accent/20 rounded-xl p-5 border border-secondary/10 font-rubik text-sm md:text-base space-y-3">
        <div>
          <h4 className="font-normal text-secondary text-sm md:text-base">Approved Lockups</h4>
          <p className="text-black font-light opacity-80 leading-relaxed">
            Use "Powered by Crezine Escrow" or "Official Ticketing Partner".
          </p>
        </div>
        <div>
          <h4 className="font-normal text-secondary text-sm md:text-base">Attribution Link</h4>
          <p className="text-black font-light opacity-80 leading-relaxed">
            Always link Crezine brand elements to <code>https://crezine.app</code> or <code>https://crezine.vercel.app</code>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnershipSection;
