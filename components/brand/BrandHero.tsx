import React from 'react';

export const BrandHero: React.FC = () => {
  return (
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
  );
};

export default BrandHero;
