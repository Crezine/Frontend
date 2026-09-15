import React from 'react';

export const VoiceSection: React.FC = () => {
  return (
    <section id="voice" className="scroll-mt-20">
      <span className="text-xs font-mono font-normal text-primary uppercase tracking-widest block mb-2">
        04 · Voice & Tone
      </span>
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
          <p className="text-black font-light opacity-80 leading-relaxed">
            Short sentences. Real numbers. No "revolutionizing." If a creator wouldn't say it on Slack, we don't say it.
          </p>
        </div>
        <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
          <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Pillar 02</span>
          <h3 className="font-normal text-secondary text-sm md:text-base mb-1">Locally Specific</h3>
          <p className="text-black font-light opacity-80 leading-relaxed">
            Mention KES, USD, Escrow, M-Pesa, Nairobi. Generic "worldwide" copy reads generic; we are specific.
          </p>
        </div>
        <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
          <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Pillar 03</span>
          <h3 className="font-normal text-secondary text-sm md:text-base mb-1">Quietly Confident</h3>
          <p className="text-black font-light opacity-80 leading-relaxed">
            We don't need to shout. The product is the proof. Lowercase logo, calm typography, big saffron when it matters.
          </p>
        </div>
        <div className="bg-accent/20 p-4 rounded-xl border border-secondary/10">
          <span className="text-xs font-mono text-primary font-normal uppercase block mb-1">Pillar 04</span>
          <h3 className="font-normal text-secondary text-sm md:text-base mb-1">Useful, Not Cute</h3>
          <p className="text-black font-light opacity-80 leading-relaxed">
            Cashdoor is infrastructure, not a game. Copy stays adult. Practical financial clarity always.
          </p>
        </div>
      </div>

      {/* Say this, not that */}
      <div>
        <h3 className="text-secondary text-sm md:text-base border-b-2 border-primary/20 pb-1 mb-4 font-rubik font-normal max-w-[140px]">
          Say this, not that.
        </h3>
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
  );
};

export default VoiceSection;
