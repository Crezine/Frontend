import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView } from '../types';
import { 
  FiCopy, 
  FiCheck, 
  FiDownload, 
  FiShield, 
  FiCode, 
  FiMail,
  FiArrowRight
} from 'react-icons/fi';

interface BrandViewProps {
  navigate: (view: AppView) => void;
}

const BrandView: React.FC<BrandViewProps> = ({ navigate }) => {
  const [activeSection, setActiveSection] = useState<string>('01');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [customText, setCustomText] = useState("Crezine Cashdoor: KES 250,000 Escrow Secured");
  const [selectedPlateBg, setSelectedPlateBg] = useState<'cream' | 'dark' | 'saffron' | 'white'>('cream');
  const [motifColor, setMotifColor] = useState('#F69C31');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => setCopiedToken(null), 2500);
  };

  const sections = [
    { id: '01', title: 'Logo & clearspace', targetId: 'logo' },
    { id: '02', title: 'Color system', targetId: 'color' },
    { id: '03', title: 'Typography', targetId: 'typography' },
    { id: '04', title: 'Voice & tone', targetId: 'voice' },
    { id: '05', title: 'The Cashdoor motif', targetId: 'motif' },
    { id: '06', title: 'Applications', targetId: 'components' },
    { id: '07', title: 'Partnership rules', targetId: 'partnership' },
    { id: '08', title: 'Downloads & contact', targetId: 'downloads' },
  ];

  const colorSwatches = [
    {
      name: "Crezine Saffron",
      role: "Axene Yellow / Saffron",
      hex: "#F69C31",
      rgb: "246 · 156 · 49",
      cmyk: "0 · 40 · 90 · 0",
      pms: "PMS Yellow 137 C",
      bgClass: "bg-[#F69C31]",
      textClass: "text-secondary"
    },
    {
      name: "Carbon",
      role: "Primary Dark",
      hex: "#101010",
      rgb: "16 · 16 · 16",
      cmyk: "0 · 0 · 0 · 95",
      pms: "PMS Black 6 C",
      bgClass: "bg-[#101010]",
      textClass: "text-[#F69C31]"
    },
    {
      name: "Cream",
      role: "Canvas",
      hex: "#E9E0D8",
      rgb: "233 · 224 · 216",
      cmyk: "4 · 5 · 8 · 0",
      pms: "Use Backgrounds",
      bgClass: "bg-[#E9E0D8]",
      textClass: "text-secondary"
    },
    {
      name: "Signal Red",
      role: "Alert Only",
      hex: "#D63F28",
      rgb: "214 · 63 · 40",
      cmyk: "10 · 90 · 95 · 1",
      pms: "Use Errors Only",
      bgClass: "bg-[#D63F28]",
      textClass: "text-white"
    }
  ];

  const saffronScale = [
    { label: "S / 10", hex: "#FEF5EA", color: "#9E5806" },
    { label: "S / 25", hex: "#FDE6C8", color: "#9E5806" },
    { label: "S / 50", hex: "#FBCB8F", color: "#9E5806" },
    { label: "S / 75", hex: "#F8B159", color: "#101010" },
    { label: "S / 100", hex: "#F69C31", color: "#AB3625" },
    { label: "S / 120", hex: "#D67D15", color: "#FFFFFF" },
    { label: "S / 150", hex: "#9E5806", color: "#FFFFFF" },
    { label: "S / 200", hex: "#4A2702", color: "#F69C31" },
  ];

  const carbonScale = [
    { label: "C / 100", hex: "#101010", color: "#E9E0D8" },
    { label: "C / 80", hex: "#3A3A38", color: "#E9E0D8" },
    { label: "C / 60", hex: "#5A5A56", color: "#E9E0D8" },
    { label: "C / 50", hex: "#888884", color: "#E9E0D8" },
    { label: "C / 30", hex: "#BEBBB0", color: "#101010" },
    { label: "C / 20", hex: "#D6D3CB", color: "#101010" },
    { label: "C / 10", hex: "#ECEAE3", color: "#101010" },
    { label: "C / 05", hex: "#F4F3EF", color: "#101010" },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Brand | The Creative cashdoor";
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const match = sections.find(s => s.targetId === entry.target.id);
          if (match) setActiveSection(match.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => {
      const element = document.getElementById(section.targetId);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const downloadLogoSvg = (filename: string, isLight: boolean = false) => {
    const svgData = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 100" width="400" height="100">
      <rect width="400" height="100" rx="12" fill="${isLight ? '#AB3625' : '#E9E0D8'}"/>
      <g transform="translate(30, 20)">
        <path fill="${isLight ? '#F69C31' : '#AB3625'}" d="M 20,10 C 10,10 5,20 5,30 C 5,40 10,50 20,50 C 30,50 35,40 35,30 C 35,20 30,10 20,10 Z M 20,20 C 23,20 25,23 25,30 C 25,37 23,40 20,40 C 17,40 15,37 15,30 C 15,23 17,20 20,20 Z" />
        <rect x="42" y="15" width="12" height="35" rx="3" fill="${isLight ? '#FFFFFF' : '#F69C31'}" />
        <text x="65" y="42" font-family="'Rubik', sans-serif" font-weight="700" font-size="32" fill="${isLight ? '#FFFFFF' : '#AB3625'}">crezine</text>
        <circle cx="195" cy="38" r="5" fill="#F69C31" />
      </g>
    </svg>`;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-accent min-h-screen flex flex-col font-rubik font-light text-secondary selection:bg-primary selection:text-white transition-colors duration-300">
      {/* Toast Notification */}
      <AnimatePresence>
        {copiedToken && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-secondary text-white px-5 py-2 rounded-full shadow-lg border border-primary/20 flex items-center gap-2 font-montserrat text-xs"
          >
            <FiCheck className="w-4 h-4 text-primary" />
            <span>Copied <strong>{copiedToken}</strong> to clipboard</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pt-10 pb-20 font-rubik font-light">
        {/* 2-COLUMN GRID WRAPPER STARTING AT VERY TOP MATCHING FOOTER CONTAINER & PADDING */}
        <div className="lg:grid lg:grid-cols-[220px_1fr] gap-10 sm:gap-12 lg:gap-16 relative font-rubik font-light">
          
          {/* LEFT SIDEBAR NAVIGATION INDEX — MATCHING FOOTER LINK SIZING & FONT STYLES */}
          <aside className="hidden lg:block relative font-rubik font-light">
            <div className="sticky top-28 h-fit">
              <div>
                <h3 className="text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 mb-4 font-rubik font-normal">Navigation</h3>
                <nav className="flex flex-col space-y-3 lg:space-y-4">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.targetId)}
                      className={`text-left text-sm md:text-base font-rubik flex items-center gap-2.5 transition-colors duration-150 ${
                        activeSection === section.id 
                          ? 'text-primary font-normal' 
                          : 'text-black hover:text-primary font-light opacity-80'
                      }`}
                    >
                      <span className={`font-mono text-xs ${activeSection === section.id ? 'text-primary font-normal' : 'text-black/40'}`}>
                        {section.id}
                      </span>
                      <span className="font-rubik">
                        {section.title}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* RIGHT MAIN CONTENT AREA */}
          <div className="flex-1 min-w-0 space-y-16 lg:space-y-20 font-rubik font-light">

            {/* CENTERED HERO HEADER */}
            <div className="text-center flex flex-col items-center max-w-3xl mx-auto pb-6 border-b border-secondary/10">
              <h1 
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-4 text-secondary leading-none uppercase font-bold"
                style={{ fontFamily: "'Silkscreen', 'Geist Pixel', 'VT323', ui-monospace, monospace" }}
              >
                Crezine<span className="text-primary">.</span>
              </h1>
              <p className="text-sm md:text-base text-black leading-relaxed font-rubik font-light opacity-80 max-w-xl text-center">
                The tokens, components, and motifs that make up the Crezine visual language. Colors and type pull live from the same CSS variables used across product and docs.
              </p>
            </div>

            {/* ══ 01 LOGO ══ */}
            <section id="logo" className="scroll-mt-20">
              <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">01 · Logo</span>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
                <div className="md:col-span-5">
                  <h2 className="text-2xl md:text-3xl font-rubik font-normal text-secondary leading-tight">
                    One wordmark.<br />One mark.<br />Used flat.
                  </h2>
                </div>
                <div className="md:col-span-7 font-rubik text-sm md:text-base font-light text-black opacity-80 leading-relaxed">
                  The Crezine wordmark is set in bold geometry, with a tight <code className="font-mono bg-primary/20 px-1.5 py-0.5 rounded text-secondary text-xs">-2px</code> letter-spacing and a single Saffron Gold period. The mark is a softened keyhole door in <strong>Saffron Gold</strong> with a maroon core. Use one or the other. Don't gradient them. Don't outline them. Don't rotate the period.
                </div>
              </div>

              {/* Canvas Switcher */}
              <div className="mb-4 flex items-center justify-between flex-wrap gap-2 bg-accent/20 p-3 rounded-xl border border-secondary/10 font-rubik font-light text-sm md:text-base">
                <span className="text-black font-light opacity-80">Canvas Background:</span>
                <div className="flex gap-2">
                  {[
                    { id: 'cream', label: 'Sand Cream', bg: 'bg-[#E9E0D8]' },
                    { id: 'dark', label: 'Carbon Dark', bg: 'bg-[#101010]' },
                    { id: 'saffron', label: 'Saffron Gold', bg: 'bg-[#F69C31]' },
                    { id: 'white', label: 'Pure White', bg: 'bg-white' },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setSelectedPlateBg(bg.id as any)}
                      className={`px-3 py-1 rounded text-sm font-rubik font-light flex items-center gap-1.5 border transition-all ${
                        selectedPlateBg === bg.id ? 'border-secondary text-secondary bg-accent/60 font-normal' : 'border-transparent text-black hover:text-primary'
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
                <div className={`p-5 rounded-xl flex flex-col justify-between items-center min-h-[140px] border ${
                  selectedPlateBg === 'cream' ? 'bg-[#E9E0D8] border-secondary/20' :
                  selectedPlateBg === 'dark' ? 'bg-[#101010] border-white/10' :
                  selectedPlateBg === 'saffron' ? 'bg-[#F69C31] border-secondary/20' : 'bg-white border-secondary/15'
                }`}>
                  <span className={`text-[10px] font-mono uppercase self-start ${selectedPlateBg === 'dark' ? 'text-white/50' : 'text-black/50'}`}>Primary · Light</span>
                  <img src="/crezine.png" alt="Crezine" className={`h-8 object-contain ${selectedPlateBg === 'dark' ? 'filter brightness-0 invert' : ''}`} />
                  <span className={`text-[9px] font-mono ${selectedPlateBg === 'dark' ? 'text-white/40' : 'text-black/40'}`}>Wordmark</span>
                </div>

                <div className="p-5 rounded-xl bg-[#101010] border border-white/10 flex flex-col justify-between items-center min-h-[140px]">
                  <span className="text-[10px] font-mono uppercase text-white/50 self-start">On Dark</span>
                  <span className="text-white text-xl font-bold font-rubik tracking-tight">crezine<span className="text-primary">.</span></span>
                  <span className="text-[9px] font-mono text-white/40">Reversed</span>
                </div>

                <div className="p-5 rounded-xl bg-[#F69C31] border border-secondary/20 flex flex-col justify-between items-center min-h-[140px]">
                  <span className="text-[10px] font-mono uppercase text-secondary/80 self-start">On Saffron</span>
                  <span className="text-secondary text-xl font-bold font-rubik tracking-tight">crezine<span className="text-white">.</span></span>
                  <span className="text-[9px] font-mono text-secondary/60">Yellow Fill</span>
                </div>

                <div className="p-5 rounded-xl bg-[#AB3625] border border-secondary/20 flex flex-col justify-between items-center min-h-[140px]">
                  <span className="text-[10px] font-mono uppercase text-white/60 self-start">Wordmark · Lockup</span>
                  <span className="text-white text-xl font-normal font-rubik tracking-tight">crezine<span className="text-[#F69C31]">.</span></span>
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
                <h3 className="text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 mb-4 font-rubik font-normal max-w-[180px]">Things you can't do.</h3>
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

            {/* ══ 02 COLOR ══ */}
            <section id="color" className="scroll-mt-20">
              <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">02 · Color</span>
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
                    onClick={() => copyToClipboard(swatch.hex, swatch.hex)}
                    className="bg-accent/20 rounded-xl overflow-hidden border border-secondary/10 cursor-pointer hover:border-primary/40 transition-colors"
                  >
                    <div className={`${swatch.bgClass} h-20 p-3 flex flex-col justify-between border-b border-secondary/10`}>
                      <span className={`text-[10px] font-mono uppercase ${swatch.textClass} opacity-80 font-normal`}>{swatch.role}</span>
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
                  <p className="text-sm font-rubik font-light text-black opacity-70 mb-3">Use 100 for highlights and pure brand moments. 50–10 are for backgrounds and accents.</p>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 font-mono">
                    {saffronScale.map((tint, i) => (
                      <div
                        key={i}
                        onClick={() => copyToClipboard(tint.hex, tint.hex)}
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
                        onClick={() => copyToClipboard(tint.hex, tint.hex)}
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
                <h3 className="text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 mb-4 font-rubik font-normal max-w-[120px]">Pairing rules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-rubik text-sm md:text-base">
                  <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
                    <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Rule 01</span>
                    <h4 className="font-normal text-secondary text-sm md:text-base mb-1">Yellow needs Carbon.</h4>
                    <span className="text-black font-light opacity-80 leading-relaxed">Always pair Saffron Gold with Carbon, never with another saturated color. Yellow on yellow is forbidden.</span>
                  </div>
                  <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
                    <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Rule 02</span>
                    <h4 className="font-normal text-secondary text-sm md:text-base mb-1">Cream is the floor.</h4>
                    <span className="text-black font-light opacity-80 leading-relaxed">Long-form pages live on Cream, not pure white. White is reserved for inset cards and surfaces.</span>
                  </div>
                  <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
                    <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Rule 03</span>
                    <h4 className="font-normal text-secondary text-sm md:text-base mb-1">Red is medical.</h4>
                    <span className="text-black font-light opacity-80 leading-relaxed">Signal Red is reserved for errors, destructive actions, and validation. Never marketing.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ══ 03 TYPOGRAPHY ══ */}
            <section id="typography" className="scroll-mt-20">
              <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">03 · Typography</span>
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

            {/* ══ 04 VOICE ══ */}
            <section id="voice" className="scroll-mt-20">
              <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">04 · Voice & Tone</span>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
                <div className="md:col-span-5">
                  <h2 className="text-2xl md:text-3xl font-rubik font-normal text-secondary leading-tight">
                    We talk like<br />engineers shipping<br />at 2 PM.
                  </h2>
                </div>
                <div className="md:col-span-7 font-rubik text-sm md:text-base font-light text-black opacity-80 leading-relaxed">
                  Direct. Specific. Slightly dry. Always pro-creator, always clear. Avoid hype, jargon, and motivational fluff. If a sentence could appear in any SaaS hero, rewrite it.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-rubik text-sm md:text-base">
                <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
                  <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Pillar 01</span>
                  <h3 className="font-normal text-secondary text-sm md:text-base mb-1">Plainspoken</h3>
                  <p className="text-black font-light opacity-80 leading-relaxed">Short sentences. Real numbers. No "revolutionizing." If a creator wouldn't say it on Slack, we don't say it.</p>
                </div>
                <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
                  <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Pillar 02</span>
                  <h3 className="font-normal text-secondary text-sm md:text-base mb-1">Locally Specific</h3>
                  <p className="text-black font-light opacity-80 leading-relaxed">Mention KES, USD, Escrow, M-Pesa, Nairobi. Generic "worldwide" copy reads generic; we are specific.</p>
                </div>
                <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
                  <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Pillar 03</span>
                  <h3 className="font-normal text-secondary text-sm md:text-base mb-1">Quietly Confident</h3>
                  <p className="text-black font-light opacity-80 leading-relaxed">We don't need to shout. The product is the proof. Lowercase logo, calm typography, big saffron when it matters.</p>
                </div>
                <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
                  <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Pillar 04</span>
                  <h3 className="font-normal text-secondary text-sm md:text-base mb-1">Useful, Not Cute</h3>
                  <p className="text-black font-light opacity-80 leading-relaxed">Cashdoor is infrastructure, not a game. Copy stays adult. Practical financial clarity always.</p>
                </div>
              </div>

              {/* Say this, not that */}
              <div>
                <h3 className="text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 mb-4 font-rubik font-normal max-w-[140px]">Say this, not that.</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-rubik text-sm md:text-base">
                  <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10 space-y-3">
                    <span className="text-xs font-mono text-primary font-normal uppercase block">Headlines</span>
                    <div>
                      <span className="text-emerald-700 font-normal block mb-1">✓ Say:</span>
                      <p className="text-black font-light opacity-80">"Software for modern creativity."</p>
                    </div>
                    <div>
                      <span className="text-rose-700 font-normal block mb-1">✕ Don't say:</span>
                      <p className="text-black font-light opacity-60">"Empowering Africa's digital future."</p>
                    </div>
                  </div>

                  <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10 space-y-3">
                    <span className="text-xs font-mono text-primary font-normal uppercase block">Product Copy</span>
                    <div>
                      <span className="text-emerald-700 font-normal block mb-1">✓ Say:</span>
                      <p className="text-black font-light opacity-80">"Funds locked safely until job approval."</p>
                    </div>
                    <div>
                      <span className="text-rose-700 font-normal block mb-1">✕ Don't say:</span>
                      <p className="text-black font-light opacity-60">"Unlimited possibilities instantly."</p>
                    </div>
                  </div>

                  <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10 space-y-3">
                    <span className="text-xs font-mono text-primary font-normal uppercase block">Partnership Copy</span>
                    <div>
                      <span className="text-emerald-700 font-normal block mb-1">✓ Say:</span>
                      <p className="text-black font-light opacity-80">"Built with Crezine Escrow."</p>
                    </div>
                    <div>
                      <span className="text-rose-700 font-normal block mb-1">✕ Don't say:</span>
                      <p className="text-black font-light opacity-60">"Powered by next-gen synergy."</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ══ 05 MOTIF ══ */}
            <section id="motif" className="scroll-mt-20">
              <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">05 · Mascot & Motif</span>
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

            {/* ══ 06 APPLICATIONS ══ */}
            <section id="components" className="scroll-mt-20">
              <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">06 · Applications</span>
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
                    <div className="text-2xl font-bold font-mono text-secondary">KES 285,400<span className="text-primary text-sm">.00</span></div>
                  </div>
                </div>
              </div>
            </section>

            {/* ══ 07 PARTNERSHIP ══ */}
            <section id="partnership" className="scroll-mt-20">
              <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">07 · Partnership Rules</span>
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
                  <p className="text-black font-light opacity-80 leading-relaxed">Use "Powered by Crezine Escrow" or "Official Ticketing Partner".</p>
                </div>
                <div>
                  <h4 className="font-normal text-secondary text-sm md:text-base">Attribution Link</h4>
                  <p className="text-black font-light opacity-80 leading-relaxed">Always link Crezine brand elements to <code>https://crezine.app</code> or <code>https://crezine.vercel.app</code>.</p>
                </div>
              </div>
            </section>

            {/* ══ 08 DOWNLOADS & CONTACT ══ */}
            <section id="downloads" className="scroll-mt-20">
              <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">08 · Downloads & Contact</span>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start mb-6">
                <div className="md:col-span-5">
                  <h2 className="text-2xl md:text-3xl font-rubik font-normal text-secondary leading-tight">
                    Downloads & contact.
                  </h2>
                </div>
                <div className="md:col-span-7 font-rubik text-sm md:text-base font-light text-black opacity-80 leading-relaxed">
                  Official vector assets, design tokens, and media press contact.
                </div>
              </div>

              <div className="bg-accent/20 rounded-xl p-6 border border-secondary/10 font-rubik text-sm md:text-base space-y-5">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => downloadLogoSvg('crezine-logo-light.svg', false)}
                    className="bg-primary text-white font-normal px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm text-sm md:text-base"
                  >
                    <FiDownload className="w-4 h-4" /> Download SVG (Light)
                  </button>
                  <button
                    onClick={() => downloadLogoSvg('crezine-logo-dark.svg', true)}
                    className="bg-secondary text-white font-normal px-6 py-3 rounded-full flex items-center gap-2 hover:bg-secondary/90 transition-colors shadow-sm text-sm md:text-base"
                  >
                    <FiDownload className="w-4 h-4" /> Download SVG (Dark)
                  </button>
                  <button
                    onClick={() => copyToClipboard(`:root {\n  --crezine-primary: #F69C31;\n  --crezine-secondary: #AB3625;\n  --crezine-accent: #E9E0D8;\n  --crezine-carbon: #101010;\n}`, 'CSS Tokens')}
                    className="bg-white text-secondary border border-secondary/20 font-normal px-6 py-3 rounded-full flex items-center gap-2 hover:bg-accent/50 transition-colors text-sm md:text-base"
                  >
                    <FiCode className="w-4 h-4" /> Copy CSS Tokens
                  </button>
                </div>

                <div className="pt-4 border-t border-secondary/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-black opacity-80 font-light">
                  <span>Questions & Press Inquiries:</span>
                  <a href="mailto:crezinecashdoor@gmail.com" className="text-primary font-normal hover:underline flex items-center gap-2 text-sm md:text-base">
                    <FiMail className="w-4 h-4" /> crezinecashdoor@gmail.com
                  </a>
                </div>
              </div>
            </section>

          </div>

        </div>
      </main>
    </div>
  );
};

export default BrandView;
