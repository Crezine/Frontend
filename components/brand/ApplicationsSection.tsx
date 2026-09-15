import React from 'react';
import { FiArrowRight, FiShield } from 'react-icons/fi';

export const ApplicationsSection: React.FC = () => {
  return (
    <section id="components" className="scroll-mt-20">
      <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">
        06 · Applications
      </span>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
        <div className="md:col-span-5">
          <h2 className="text-2xl md:text-3xl font-rubik font-normal text-secondary leading-tight">
            Live UI Tokens.
          </h2>
        </div>
        <div className="md:col-span-7 font-rubik text-sm md:text-base font-light text-black opacity-80 leading-relaxed">
          Real components from the product library pulling design system tokens.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-rubik text-sm md:text-base">
        <div className="bg-accent/20 p-5 rounded-xl border border-secondary/10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-primary font-normal uppercase block mb-2">Buttons</span>
            <div className="space-y-2">
              <button className="w-full bg-primary text-white font-normal py-2.5 px-4 rounded-full flex items-center justify-center gap-1.5 text-sm md:text-base transition-all shadow-sm">
                Primary CTA <FiArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-accent/20 p-5 rounded-xl border border-secondary/10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-emerald-700 font-normal uppercase block mb-2">Status</span>
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm md:text-base flex items-center gap-2 font-light">
              <FiShield className="w-4 h-4 text-emerald-600" /> Escrow Active
            </div>
          </div>
        </div>

        <div className="bg-accent/20 p-5 rounded-xl border border-secondary/10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-secondary font-normal uppercase block mb-1">Data</span>
            <div className="text-2xl font-bold font-mono text-secondary">
              KES 285,400<span className="text-primary text-sm">.00</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;
