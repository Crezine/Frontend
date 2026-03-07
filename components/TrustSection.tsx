import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SiX, SiInstagram } from 'react-icons/si';

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  duration?: number;
}

const AnimatedStat: React.FC<StatProps> = ({ value, suffix, label, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = duration * 60;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.floor(progress * end);
        
        if (frame >= totalFrames) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(currentCount);
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center p-4">
      <div className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-medium text-secondary mb-2 flex items-baseline leading-none">
        <span>{count.toLocaleString()}</span>
        <span className="text-secondary ml-0.5">{suffix}</span>
      </div>
      <p className="text-black font-rubik font-normal tracking-wide text-[10px] md:text-xs">
        {label}
      </p>
    </div>
  );
};

interface Testimonial {
  id: number;
  name: string;
  handle: string;
  text: string;
  image: string;
  platform: 'x' | 'instagram';
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alex Rivers",
    handle: "@arivers_art",
    text: "Crezine transformed how I handle international clients. The escrow feature is a literal lifesaver for freelance designers!",
    image: "https://i.pravatar.cc/150?u=alex",
    platform: 'x'
  },
  {
    id: 2,
    name: "Sarah Chen",
    handle: "sarah_creatives",
    text: "The easiest way to get paid for my digital assets. I don't have to worry about currency conversion anymore.",
    image: "https://i.pravatar.cc/150?u=sarah",
    platform: 'instagram'
  },
  {
    id: 3,
    name: "Marcus Thorne",
    handle: "@mthorne_vfx",
    text: "Finally, a platform that understands the creative workflow. The invoicing and escrow are seamless.",
    image: "https://i.pravatar.cc/150?u=marcus",
    platform: 'x'
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    handle: "elena_vision",
    text: "I used to chase payments for weeks. Now, with the secure escrow, I focus 100% on my craft and 0% on debt collection.",
    image: "https://i.pravatar.cc/150?u=elena",
    platform: 'instagram'
  },
  {
    id: 5,
    name: "David Kim",
    handle: "@dk_motion",
    text: "The onboarding was so fast. In 5 minutes, I had my professional 'cashdoor' ready for my global clients.",
    image: "https://i.pravatar.cc/150?u=david",
    platform: 'x'
  }
];

const TrustSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 md:py-24 bg-accent/40 overflow-hidden">
      <div className="container mx-auto px-6 mb-16 md:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          <AnimatedStat value={20} suffix="K" label="Creatives onboard" />
          <AnimatedStat value={98} suffix="%" label="Creatives satisfied" />
          <AnimatedStat value={100} suffix="K" label="Protected transactions" />
        </div>
      </div>

      {/* Desktop Ticker */}
      <div className="hidden md:block relative group">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-accent/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-accent/40 to-transparent z-10 pointer-events-none" />
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-animate {
            animation: ticker 50s linear infinite;
          }
          .ticker-animate:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="flex overflow-hidden">
          <div className="flex gap-6 py-4 ticker-animate" style={{ width: "fit-content" }}>
            {duplicatedTestimonials.map((t, idx) => (
              <TestimonialCard key={`${t.id}-${idx}`} testimonial={t} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative px-6">
        <div className="overflow-hidden">
          <motion.div 
            className="flex gap-4"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) next();
              else if (info.offset.x > 50) prev();
            }}
            animate={{ x: `calc(-${currentIndex * 100}% - ${currentIndex}rem)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((t) => (
              <div key={t.id} className="min-w-full">
                <TestimonialCard testimonial={t} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Carousel Controls */}
        <div className="flex justify-center items-center gap-6 mt-8">
          <button 
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-secondary/5 flex items-center justify-center text-secondary hover:text-primary transition-all active:scale-90"
            aria-label="Previous testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-primary w-4' : 'bg-secondary/20'}`}
              />
            ))}
          </div>

          <button 
            onClick={next}
            className="w-10 h-10 rounded-full bg-white shadow-md border border-secondary/5 flex items-center justify-center text-secondary hover:text-primary transition-all active:scale-90"
            aria-label="Next testimonial"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial: t }) => (
  <div 
    className="flex-shrink-0 w-[280px] md:w-[400px] bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-secondary/5 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group cursor-default mx-auto"
  >
    <div className="flex flex-col items-center md:flex-row md:justify-between mb-6 md:mb-8 text-center md:text-left">
      <div className="flex flex-col items-center md:flex-row gap-4 md:gap-5">
        <img 
          src={t.image} 
          alt={t.name} 
          className="w-16 h-16 md:w-14 md:h-14 rounded-full object-cover border-2 border-primary/10 group-hover:border-primary/30 transition-colors"
        />
        <div>
          <h4 className="font-montserrat font-bold text-secondary text-lg">{t.name}</h4>
          <p className="text-sm text-secondary/50 font-rubik font-normal">{t.handle}</p>
        </div>
      </div>
      <div className="hidden md:block text-secondary/30 group-hover:text-primary transition-colors">
        {t.platform === 'x' ? <SiX className="w-5 h-5" /> : <SiInstagram className="w-6 h-6" />}
      </div>
    </div>
    <p className="text-secondary/80 text-sm md:text-base font-rubik font-normal leading-relaxed italic text-center md:text-left">
      "{t.text}"
    </p>
    <div className="md:hidden mt-4 flex justify-center text-secondary/30 group-hover:text-primary transition-colors">
      {t.platform === 'x' ? <SiX className="w-5 h-5" /> : <SiInstagram className="w-6 h-6" />}
    </div>
  </div>
);

export default TrustSection;
