import React, { useState } from 'react';

export const MotifSection: React.FC = () => {
  const [motifColor] = useState('#F69C31');

  return (
    <section id="motif" className="scroll-mt-20">
      <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">
        05 · Mascot & Motif
      </span>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
        <div className="md:col-span-5">
          <h2 className="text-2xl md:text-3xl font-rubik font-normal text-secondary leading-tight">
            Meet the Cashdoor.
          </h2>
        </div>
        <div className="md:col-span-7 font-rubik text-sm md:text-base font-light text-black opacity-80 leading-relaxed">
          The Cashdoor keyhole symbol represents financial security and creator access. Single-color silhouette fill only: Saffron Gold or Rust Maroon.
        </div>
      </div>

      <div className="bg-accent/20 rounded-xl p-5 border border-secondary/10 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-24 h-24 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 shadow-sm border border-secondary/30">
          <svg viewBox="0 0 100 100" className="w-14 h-14">
            <rect x="25" y="15" width="50" height="70" rx="10" fill={motifColor} />
            <circle cx="50" cy="40" r="10" fill="#AB3625" />
            <polygon points="45,45 55,45 57,68 43,68" fill="#AB3625" />
            <circle cx="50" cy="40" r="3.5" fill={motifColor} />
          </svg>
        </div>

        <div className="flex-1 font-rubik text-sm md:text-base space-y-3">
          <p className="text-black font-light opacity-80 leading-relaxed">
            Rendered as a single-color silhouette only. Default fill is Saffron Gold on dark backgrounds, or Rust Maroon on light canvas.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            <div>
              <span className="text-xs font-mono text-black/50 block uppercase">Name</span>
              <span className="font-normal text-secondary text-sm md:text-base">The Cashdoor</span>
            </div>
            <div>
              <span className="text-xs font-mono text-black/50 block uppercase">Domain</span>
              <span className="font-normal text-secondary text-sm md:text-base">crezine.app</span>
            </div>
            <div>
              <span className="text-xs font-mono text-black/50 block uppercase">Format</span>
              <span className="font-normal text-secondary text-sm md:text-base">SVG single path</span>
            </div>
            <div>
              <span className="text-xs font-mono text-black/50 block uppercase">Fills</span>
              <span className="font-normal text-secondary text-sm md:text-base">Saffron / Maroon</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotifSection;
