import React from 'react';

interface ColorSectionProps {
  onCopy: (text: string, label: string) => void;
}

export const ColorSection: React.FC<ColorSectionProps> = ({ onCopy }) => {
  const colorSwatches = [
    {
      name: 'Crezine Saffron',
      role: 'Axene Yellow / Saffron',
      hex: '#F69C31',
      rgb: '246 · 156 · 49',
      cmyk: '0 · 40 · 90 · 0',
      pms: 'PMS Yellow 137 C',
      bgClass: 'bg-[#F69C31]',
      textClass: 'text-secondary',
    },
    {
      name: 'Carbon',
      role: 'Primary Dark',
      hex: '#101010',
      rgb: '16 · 16 · 16',
      cmyk: '0 · 0 · 0 · 95',
      pms: 'PMS Black 6 C',
      bgClass: 'bg-[#101010]',
      textClass: 'text-[#F69C31]',
    },
    {
      name: 'Cream',
      role: 'Canvas',
      hex: '#E9E0D8',
      rgb: '233 · 224 · 216',
      cmyk: '4 · 5 · 8 · 0',
      pms: 'Use Backgrounds',
      bgClass: 'bg-[#E9E0D8]',
      textClass: 'text-secondary',
    },
    {
      name: 'Signal Red',
      role: 'Alert Only',
      hex: '#D63F28',
      rgb: '214 · 63 · 40',
      cmyk: '10 · 90 · 95 · 1',
      pms: 'Use Errors Only',
      bgClass: 'bg-[#D63F28]',
      textClass: 'text-white',
    },
  ];

  const saffronScale = [
    { label: 'S / 10', hex: '#FEF5EA', color: '#9E5806' },
    { label: 'S / 25', hex: '#FDE6C8', color: '#9E5806' },
    { label: 'S / 50', hex: '#FBCB8F', color: '#9E5806' },
    { label: 'S / 75', hex: '#F8B159', color: '#101010' },
    { label: 'S / 100', hex: '#F69C31', color: '#AB3625' },
    { label: 'S / 120', hex: '#D67D15', color: '#FFFFFF' },
    { label: 'S / 150', hex: '#9E5806', color: '#FFFFFF' },
    { label: 'S / 200', hex: '#4A2702', color: '#F69C31' },
  ];

  const carbonScale = [
    { label: 'C / 100', hex: '#101010', color: '#E9E0D8' },
    { label: 'C / 80', hex: '#3A3A38', color: '#E9E0D8' },
    { label: 'C / 60', hex: '#5A5A56', color: '#E9E0D8' },
    { label: 'C / 50', hex: '#888884', color: '#E9E0D8' },
    { label: 'C / 30', hex: '#BEBBB0', color: '#101010' },
    { label: 'C / 20', hex: '#D6D3CB', color: '#101010' },
    { label: 'C / 10', hex: '#ECEAE3', color: '#101010' },
    { label: 'C / 05', hex: '#F4F3EF', color: '#101010' },
  ];

  return (
    <section id="color" className="scroll-mt-20">
      <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">
        02 · Color
      </span>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
        <div className="md:col-span-5">
          <h2 className="text-2xl md:text-3xl font-rubik font-normal text-secondary leading-tight">
            Two colors do<br />most of the work.
          </h2>
        </div>
        <div className="md:col-span-7 font-rubik text-sm md:text-base font-light text-black opacity-80 leading-relaxed">
          Crezine Saffron and Carbon carry the brand. Sand Cream is the canvas. Everything else is a quiet supporting cast. Aim for ~80% neutral, ~20% saffron. Click a swatch to copy its resolved value.
        </div>
      </div>

      {/* Swatches Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {colorSwatches.map((swatch, idx) => (
          <div
            key={idx}
            onClick={() => onCopy(swatch.hex, swatch.hex)}
            className="bg-accent/20 rounded-xl overflow-hidden border border-secondary/10 cursor-pointer hover:border-primary/40 transition-colors"
          >
            <div className={`${swatch.bgClass} h-20 p-3 flex flex-col justify-between border-b border-secondary/10`}>
              <span className={`text-[10px] font-mono uppercase ${swatch.textClass} opacity-80 font-normal`}>
                {swatch.role}
              </span>
              <span className={`text-xl font-bold font-rubik ${swatch.textClass}`}>{swatch.hex}</span>
            </div>
            <div className="p-4 font-rubik text-sm">
              <h4 className="font-normal text-secondary mb-1">{swatch.name}</h4>
              <div className="text-xs font-mono text-black opacity-70 space-y-0.5">
                <div>HEX {swatch.hex}</div>
                <div>RGB {swatch.rgb}</div>
                <div>CMYK {swatch.cmyk}</div>
                <div>{swatch.pms}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Yellow and Carbon Scales */}
      <div className="space-y-4 mb-6">
        <div className="bg-accent/20 rounded-xl p-5 border border-secondary/10">
          <span className="text-sm font-mono font-normal text-secondary block mb-1">Yellow scale</span>
          <p className="text-sm font-rubik font-light text-black opacity-70 mb-3">
            Use 100 for highlights and pure brand moments. 50–10 are for backgrounds and accents.
          </p>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 font-mono">
            {saffronScale.map((tint, i) => (
              <div
                key={i}
                onClick={() => onCopy(tint.hex, tint.hex)}
                className="rounded p-2 text-center cursor-pointer border border-secondary/10"
                style={{ backgroundColor: tint.hex, color: tint.color }}
              >
                <div className="text-[9px] font-bold">{tint.label}</div>
                <div className="text-[8px] opacity-80">{tint.hex}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-accent/20 rounded-xl p-5 border border-secondary/10">
          <span className="text-sm font-mono font-normal text-secondary block mb-2">Carbon scale</span>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 font-mono">
            {carbonScale.map((tint, i) => (
              <div
                key={i}
                onClick={() => onCopy(tint.hex, tint.hex)}
                className="rounded p-2 text-center cursor-pointer border border-secondary/10"
                style={{ backgroundColor: tint.hex, color: tint.color }}
              >
                <div className="text-[9px] font-bold">{tint.label}</div>
                <div className="text-[8px] opacity-80">{tint.hex}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pairing Rules */}
      <div>
        <h3 className="text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 mb-4 font-rubik font-normal max-w-[120px]">
          Pairing rules
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-rubik text-sm md:text-base">
          <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
            <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Rule 01</span>
            <h4 className="font-normal text-secondary text-sm md:text-base mb-1">Yellow needs Carbon.</h4>
            <span className="text-black font-light opacity-80 leading-relaxed">
              Always pair Saffron Gold with Carbon, never with another saturated color. Yellow on yellow is forbidden.
            </span>
          </div>
          <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
            <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Rule 02</span>
            <h4 className="font-normal text-secondary text-sm md:text-base mb-1">Cream is the floor.</h4>
            <span className="text-black font-light opacity-80 leading-relaxed">
              Long-form pages live on Cream, not pure white. White is reserved for inset cards and surfaces.
            </span>
          </div>
          <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
            <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Rule 03</span>
            <h4 className="font-normal text-secondary text-sm md:text-base mb-1">Red is medical.</h4>
            <span className="text-black font-light opacity-80 leading-relaxed">
              Signal Red is reserved for errors, destructive actions, and validation. Never marketing.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorSection;
