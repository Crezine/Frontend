import React, { useState } from 'react';

type PlateBg = 'cream' | 'dark' | 'saffron' | 'white';

export const LogoSection: React.FC = () => {
  const [selectedPlateBg, setSelectedPlateBg] = useState<PlateBg>('cream');

  const bgOptions: { id: PlateBg; label: string; bg: string }[] = [
    { id: 'cream', label: 'Sand Cream', bg: 'bg-[#E9E0D8]' },
    { id: 'dark', label: 'Carbon Dark', bg: 'bg-[#101010]' },
    { id: 'saffron', label: 'Saffron Gold', bg: 'bg-[#F69C31]' },
    { id: 'white', label: 'Pure White', bg: 'bg-white' },
  ];

  return (
    <section id="logo" className="scroll-mt-20">
      <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">
        01 · Logo
      </span>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
        <div className="md:col-span-5">
          <h2 className="text-2xl md:text-3xl font-rubik font-normal text-secondary leading-tight">
            One wordmark.<br />One mark.<br />Used flat.
          </h2>
        </div>
        <div className="md:col-span-7 font-rubik text-sm md:text-base font-light text-black opacity-80 leading-relaxed">
          The Crezine wordmark is set in bold geometry, with a tight{' '}
          <code className="font-mono bg-primary/20 px-1.5 py-0.5 rounded text-secondary text-xs">-2px</code>{' '}
          letter-spacing and a single Saffron Gold period. The mark is a softened keyhole door in{' '}
          <strong>Saffron Gold</strong> with a maroon core. Use one or the other. Don't gradient them. Don't outline them. Don't rotate the period.
        </div>
      </div>

      {/* Canvas Switcher */}
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2 bg-accent/20 p-3 rounded-xl border border-secondary/10 font-rubik font-light text-sm md:text-base">
        <span className="text-black font-light opacity-80">Canvas Background:</span>
        <div className="flex gap-2">
          {bgOptions.map((bg) => (
            <button
              key={bg.id}
              onClick={() => setSelectedPlateBg(bg.id)}
              className={`px-3 py-1 rounded text-sm font-rubik font-light flex items-center gap-1.5 border transition-all ${
                selectedPlateBg === bg.id
                  ? 'border-secondary text-secondary bg-accent/60 font-normal'
                  : 'border-transparent text-black hover:text-primary'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${bg.bg} border border-secondary/20 inline-block`}></span>
              {bg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Logo Plates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div
          className={`p-5 rounded-xl flex flex-col justify-between items-center min-h-[140px] border ${
            selectedPlateBg === 'cream'
              ? 'bg-[#E9E0D8] border-secondary/20'
              : selectedPlateBg === 'dark'
              ? 'bg-[#101010] border-white/10'
              : selectedPlateBg === 'saffron'
              ? 'bg-[#F69C31] border-secondary/20'
              : 'bg-white border-secondary/15'
          }`}
        >
          <span
            className={`text-[10px] font-mono uppercase self-start ${
              selectedPlateBg === 'dark' ? 'text-white/50' : 'text-black/50'
            }`}
          >
            Primary · Light
          </span>
          <img
            src="/crezine.png"
            alt="Crezine"
            className={`h-8 object-contain ${selectedPlateBg === 'dark' ? 'filter brightness-0 invert' : ''}`}
          />
          <span className={`text-[9px] font-mono ${selectedPlateBg === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
            Wordmark
          </span>
        </div>

        <div className="p-5 rounded-xl bg-[#101010] border border-white/10 flex flex-col justify-between items-center min-h-[140px]">
          <span className="text-[10px] font-mono uppercase text-white/50 self-start">On Dark</span>
          <span className="text-white text-xl font-bold font-rubik tracking-tight">
            crezine<span className="text-primary">.</span>
          </span>
          <span className="text-[9px] font-mono text-white/40">Reversed</span>
        </div>

        <div className="p-5 rounded-xl bg-[#F69C31] border border-secondary/20 flex flex-col justify-between items-center min-h-[140px]">
          <span className="text-[10px] font-mono uppercase text-secondary/80 self-start">On Saffron</span>
          <span className="text-secondary text-xl font-bold font-rubik tracking-tight">
            crezine<span className="text-white">.</span>
          </span>
          <span className="text-[9px] font-mono text-secondary/60">Yellow Fill</span>
        </div>

        <div className="p-5 rounded-xl bg-[#AB3625] border border-secondary/20 flex flex-col justify-between items-center min-h-[140px]">
          <span className="text-[10px] font-mono uppercase text-white/60 self-start">Wordmark · Lockup</span>
          <span className="text-white text-xl font-normal font-rubik tracking-tight">
            crezine<span className="text-[#F69C31]">.</span>
          </span>
          <span className="text-[9px] font-mono text-white/50">Secondary</span>
        </div>
      </div>

      <p className="text-sm md:text-base font-rubik font-light text-black opacity-80 mb-6">
        Also acceptable in text contexts: <strong className="text-secondary font-normal">Crezine.</strong> &nbsp;·&nbsp; <strong className="text-secondary font-normal">Crezine.app</strong>
      </p>

      {/* Clearspace with X markers diagram */}
      <div className="border border-secondary/15 bg-accent/20 rounded-xl p-6 font-rubik font-light text-sm md:text-base mb-6">
        <h3 className="text-secondary text-sm md:text-base font-rubik font-normal mb-1">Clearspace & minimum size</h3>
        <p className="text-sm md:text-base font-light text-black opacity-80 mb-4 leading-relaxed">
          Reserve 1× the cap-height of the wordmark on every side. Don't crowd it. Minimum legible size: 16px on screen, 12mm in print.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4 relative">
          <div className="relative p-8 border border-dashed border-primary/50 bg-white/50 rounded-lg">
            <span className="absolute top-1 left-1.5 font-mono text-[10px] text-primary">x</span>
            <span className="absolute top-1 right-1.5 font-mono text-[10px] text-primary">x</span>
            <span className="absolute bottom-1 left-1.5 font-mono text-[10px] text-primary">x</span>
            <span className="absolute bottom-1 right-1.5 font-mono text-[10px] text-primary">x</span>
            <img src="/crezine.png" alt="Clearspace" className="h-8 object-contain" />
          </div>
          <div className="space-y-1 text-black font-rubik font-light opacity-80 text-sm md:text-base">
            <div><strong>Clearspace:</strong> 1× cap-height (x) on every side</div>
            <div><strong>Screen minimum:</strong> 16px height</div>
            <div><strong>Print minimum:</strong> 12mm height</div>
          </div>
        </div>
      </div>

      {/* Things you can't do */}
      <div>
        <h3 className="text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 mb-4 font-rubik font-normal max-w-[180px]">
          Things you can't do.
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-rubik text-sm md:text-base">
          <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
            <span className="text-emerald-700 font-normal block mb-1">✓ Do</span>
            <span className="text-black font-light opacity-80 leading-relaxed">Use the wordmark flat on cream, white, dark or saffron.</span>
          </div>
          <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
            <span className="text-rose-700 font-normal block mb-1">✕ Don't</span>
            <span className="text-black font-light opacity-80 leading-relaxed">Apply gradients or change the dot color.</span>
          </div>
          <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
            <span className="text-rose-700 font-normal block mb-1">✕ Don't</span>
            <span className="text-black font-light opacity-80 leading-relaxed">Rotate, skew, italicize or stretch the wordmark.</span>
          </div>
          <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
            <span className="text-rose-700 font-normal block mb-1">✕ Don't</span>
            <span className="text-black font-light opacity-80 leading-relaxed">Outline, hollow, or add a drop shadow.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
