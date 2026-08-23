import React from 'react';
import { FiDownload, FiCode, FiMail } from 'react-icons/fi';

interface DownloadsSectionProps {
  onDownloadSvg: (filename: string, isLight: boolean) => void;
  onCopy: (text: string, label: string) => void;
}

export const DownloadsSection: React.FC<DownloadsSectionProps> = ({ onDownloadSvg, onCopy }) => {
  const cssTokens = `:root {\n  --crezine-primary: #F69C31;\n  --crezine-secondary: #AB3625;\n  --crezine-accent: #E9E0D8;\n  --crezine-carbon: #101010;\n}`;

  return (
    <section id="downloads" className="scroll-mt-20">
      <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">
        08 · Downloads & Contact
      </span>
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
            onClick={() => onDownloadSvg('crezine-logo-light.svg', false)}
            className="bg-primary text-white font-normal px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm text-sm md:text-base"
          >
            <FiDownload className="w-4 h-4" /> Download SVG (Light)
          </button>
          <button
            onClick={() => onDownloadSvg('crezine-logo-dark.svg', true)}
            className="bg-secondary text-white font-normal px-6 py-3 rounded-full flex items-center gap-2 hover:bg-secondary/90 transition-colors shadow-sm text-sm md:text-base"
          >
            <FiDownload className="w-4 h-4" /> Download SVG (Dark)
          </button>
          <button
            onClick={() => onCopy(cssTokens, 'CSS Tokens')}
            className="bg-white text-secondary border border-secondary/20 font-normal px-6 py-3 rounded-full flex items-center gap-2 hover:bg-accent/50 transition-colors text-sm md:text-base"
          >
            <FiCode className="w-4 h-4" /> Copy CSS Tokens
          </button>
        </div>

        <div className="pt-4 border-t border-secondary/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-black opacity-80 font-light">
          <span>Questions & Press Inquiries:</span>
          <a
            href="mailto:crezinecashdoor@gmail.com"
            className="text-primary font-normal hover:underline flex items-center gap-2 text-sm md:text-base"
          >
            <FiMail className="w-4 h-4" /> crezinecashdoor@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
