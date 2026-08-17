import React from 'react';

interface BrandSectionProps {
  hasInitialAnimated?: boolean;
}

const BrandSection: React.FC<BrandSectionProps> = () => {
  return (
    <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28 w-full flex items-center justify-center bg-accent/40 relative overflow-hidden font-rubik select-none">
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-center text-center">
        <div className="flex flex-col items-center justify-center text-center">
          <h2 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] tracking-tight text-secondary leading-none uppercase font-bold text-center"
            style={{ fontFamily: "'Silkscreen', 'Geist Pixel', 'VT323', ui-monospace, monospace" }}
          >
            Crezine<span className="text-primary">.</span>
          </h2>
          <span 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-widest text-primary leading-none uppercase font-bold mt-3 sm:mt-5 text-center"
            style={{ fontFamily: "'Silkscreen', 'Geist Pixel', 'VT323', ui-monospace, monospace" }}
          >
            CASHDOOR
          </span>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
