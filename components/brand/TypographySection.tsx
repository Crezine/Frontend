import React, { useState } from 'react';

export const TypographySection: React.FC = () => {
  const [customText, setCustomText] = useState('Crezine Cashdoor: KES 250,000 Escrow Secured');

  return (
    <section id="typography" className="scroll-mt-20">
      <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">
        03 · Typography
      </span>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
        <div className="md:col-span-5">
          <h2 className="text-2xl md:text-3xl font-rubik font-normal text-secondary leading-tight">
            Three typefaces.<br />Strict roles.
          </h2>
        </div>
        <div className="md:col-span-7 font-rubik text-sm md:text-base font-light text-black opacity-80 leading-relaxed">
          Montserrat sets the brand voice — confident, bold, tightly tracked. Rubik handles long-form body copy. JetBrains Mono handles labels and code.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 font-rubik text-sm md:text-base">
        <div className="bg-accent/20 p-5 rounded-xl border border-secondary/10">
          <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Display · Montserrat</span>
          <div className="font-montserrat font-bold text-4xl text-secondary mb-2">Aa</div>
          <span className="text-black font-light opacity-80">Headlines, wordmark, CTAs. Letter-spacing: -2 to -4px.</span>
        </div>

        <div className="bg-accent/20 p-5 rounded-xl border border-secondary/10">
          <span className="text-xs font-mono text-secondary font-normal uppercase block mb-1">Body · Rubik</span>
          <div className="font-rubik text-4xl text-secondary mb-2">Aa</div>
          <span className="text-black font-light opacity-80">Long-form body, UI labels, navigation. Set 14–20px.</span>
        </div>

        <div className="bg-accent/20 p-5 rounded-xl border border-secondary/10">
          <span className="text-xs font-mono text-emerald-700 font-normal uppercase block mb-1">Utility · JetBrains Mono</span>
          <div className="font-mono text-3xl text-secondary mb-2">Aa</div>
          <span className="text-black font-light opacity-80">Eyebrows, captions, code, metadata. Set 11–14px.</span>
        </div>
      </div>

      {/* Type Scale Table */}
      <div className="border border-secondary/10 rounded-xl overflow-hidden font-rubik text-sm md:text-base mb-6">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-secondary/10 bg-accent/40 text-black/60 font-mono text-xs uppercase">
              <th className="py-3 px-4">Level</th>
              <th className="py-3 px-4">Sample Preview</th>
              <th className="py-3 px-4">Size / Line Height / Tracking / Font</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/10 text-black opacity-80 font-light">
            <tr>
              <td className="py-3 px-4 font-normal text-secondary">Display</td>
              <td className="py-3 px-4 font-montserrat font-bold text-xl text-secondary">Software</td>
              <td className="py-3 px-4 font-mono text-xs text-black/60">96 / 88 · -4 · Montserrat Bold</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-normal text-secondary">H1</td>
              <td className="py-3 px-4 font-rubik text-lg text-secondary">Built for creators</td>
              <td className="py-3 px-4 font-mono text-xs text-black/60">64 / 60 · -3 · Rubik Bold</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-normal text-secondary">H2</td>
              <td className="py-3 px-4 font-rubik text-base text-secondary">Two colors. One mark.</td>
              <td className="py-3 px-4 font-mono text-xs text-black/60">40 / 42 · -2 · Rubik Medium</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-normal text-secondary">H3</td>
              <td className="py-3 px-4 font-rubik text-sm text-secondary font-medium">Partnership headers</td>
              <td className="py-3 px-4 font-mono text-xs text-black/60">22 / 28 · -0.5 · Rubik 500</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-normal text-secondary">Body Lg</td>
              <td className="py-3 px-4 font-rubik text-sm text-black opacity-80">Lead paragraphs and intro copy</td>
              <td className="py-3 px-4 font-mono text-xs text-black/60">20 / 32 · 0 · Rubik 400</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-normal text-secondary">Body</td>
              <td className="py-3 px-4 font-rubik text-sm text-black opacity-80">Default running text used everywhere</td>
              <td className="py-3 px-4 font-mono text-xs text-black/60">16 / 26 · 0 · Rubik Light</td>
            </tr>
            <tr>
              <td className="py-3 px-4 font-normal text-secondary">Eyebrow</td>
              <td className="py-3 px-4 font-mono text-xs text-primary uppercase">Section · 01 · Mono</td>
              <td className="py-3 px-4 font-mono text-xs text-black/60">12 / 14 · +2 · JB Mono</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Specimen Tester */}
      <div className="bg-accent/20 rounded-xl p-5 border border-secondary/10 font-rubik text-sm md:text-base">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <span className="text-sm font-mono font-normal text-secondary">Type Specimen Tester</span>
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Type custom text..."
            className="px-4 py-2 bg-white rounded-lg border border-secondary/20 text-sm font-rubik font-light focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-80"
          />
        </div>

        <div className="space-y-3 pt-1 font-rubik">
          <div>
            <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Montserrat Bold</span>
            <div className="font-montserrat font-bold text-lg text-secondary">{customText}</div>
          </div>
          <div>
            <span className="text-xs font-mono text-secondary font-normal uppercase block mb-1">Rubik Normal</span>
            <div className="font-rubik text-lg text-secondary font-light">{customText}</div>
          </div>
          <div>
            <span className="text-xs font-mono text-emerald-700 font-normal uppercase block mb-1">JetBrains Mono</span>
            <div className="font-mono text-base text-emerald-700">{customText}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypographySection;
