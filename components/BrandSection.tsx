import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface BrandSectionProps {
  hasInitialAnimated?: boolean;
}

const BrandSection: React.FC<BrandSectionProps> = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll zoom animation linked to viewport scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Scale smoothly from 0.9 to 1 as it enters viewport, and zooms out / scales on scroll
  const rawScale = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], [0.9, 1, 1, 0.93]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.7, 1, 1, 0.75]);

  const scale = useSpring(rawScale, { stiffness: 120, damping: 25, mass: 0.5 });
  const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 25, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section 
      ref={sectionRef} 
      className="w-full flex items-center justify-center font-rubik select-none py-6 md:py-10"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          ref={cardRef}
          style={{ scale, opacity }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setMousePos({ x: -1000, y: -1000 });
          }}
          className="w-full pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28 flex items-center justify-center bg-accent/40 border-2 border-secondary rounded-[32px] md:rounded-[40px] relative overflow-hidden text-center px-4 cursor-crosshair group shadow-sm transition-shadow hover:shadow-xl"
        >
          {/* Base Faint Grid Boxes Pattern */}
          <svg className="absolute inset-0 w-full h-full stroke-secondary/15 pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="brand-base-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#brand-base-grid)" />
          </svg>

          {/* Interactive Cursor Spotlight with Highly Visible Pixel Boxes */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
            style={{
              opacity: isHovered ? 1 : 0,
              maskImage: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 90%)`,
              WebkitMaskImage: `radial-gradient(320px circle at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 90%)`,
            }}
          >
            {/* Highly Visible Grid Boxes */}
            <svg className="absolute inset-0 w-full h-full stroke-secondary/60 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="brand-active-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" strokeWidth="1.5" />
                  <rect x="2" y="2" width="36" height="36" fill="rgba(171, 54, 37, 0.12)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#brand-active-grid)" />
            </svg>

            {/* Radial Glow Highlight */}
            <div
              className="absolute w-72 h-72 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none blur-3xl"
              style={{
                left: `${mousePos.x}px`,
                top: `${mousePos.y}px`,
                background: 'radial-gradient(circle, rgba(246, 156, 49, 0.3) 0%, rgba(171, 54, 37, 0.2) 60%, transparent 90%)',
              }}
            />
          </div>

          {/* Brand Wordmark Content */}
          <div className="flex flex-col items-center justify-center text-center relative z-10 pointer-events-none select-none">
            <h2 
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] 2xl:text-[14rem] tracking-tight text-secondary leading-none uppercase font-bold text-center drop-shadow-sm"
              style={{ fontFamily: "'Silkscreen', 'Geist Pixel', 'VT323', ui-monospace, monospace" }}
            >
              Crezine<span className="text-primary">.</span>
            </h2>
            <span 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl tracking-widest text-primary leading-none uppercase font-bold mt-4 sm:mt-6 text-center drop-shadow-sm"
              style={{ fontFamily: "'Silkscreen', 'Geist Pixel', 'VT323', ui-monospace, monospace" }}
            >
              CASHDOOR
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandSection;
