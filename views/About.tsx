import React from 'react';

const About: React.FC = () => {
  return (
    <main className="bg-[#F9F5F0] py-16 md:py-20 border-t-2 border-secondary/10 min-h-screen flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-[clamp(1.8rem,5.5vw,3.8rem)] leading-[0.95] text-secondary tracking-tighter uppercase font-black font-century-gothic">
            How It <span className="text-primary">Works</span>
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          
          {/* Step 1 */}
          <div className="bg-white border-2 border-secondary/40 p-6 md:p-8 rounded-[32px] transition-all duration-300 hover:border-primary hover:shadow-xl transform hover:-translate-y-2">
            <div className="text-3xl font-black text-secondary/10 mb-4 font-century-gothic">01</div>
            <h3 className="text-lg md:text-xl font-black text-secondary mb-3 uppercase tracking-tighter font-century-gothic">Create Your Cashdoor</h3>
            <p className="text-[clamp(0.85rem,1.2vw,1rem)] leading-snug text-secondary/70 font-light font-century-gothic">
              Sign up and create your personalized Cashdoor in minutes. This will be your one-stop shop for all your creative endeavors.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border-2 border-secondary/40 p-6 md:p-8 rounded-[32px] transition-all duration-300 hover:border-primary hover:shadow-xl transform hover:-translate-y-2">
            <div className="text-3xl font-black text-secondary/10 mb-4 font-century-gothic">02</div>
            <h3 className="text-lg md:text-xl font-black text-secondary mb-3 uppercase tracking-tighter font-century-gothic">Showcase & Sell</h3>
            <p className="text-[clamp(0.85rem,1.2vw,1rem)] leading-snug text-secondary/70 font-light font-century-gothic">
              Showcase your work, sell digital products, and manage your client projects all from your Cashdoor.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border-2 border-secondary/40 p-6 md:p-8 rounded-[32px] transition-all duration-300 hover:border-primary hover:shadow-xl transform hover:-translate-y-2">
            <div className="text-3xl font-black text-secondary/10 mb-4 font-century-gothic">03</div>
            <h3 className="text-lg md:text-xl font-black text-secondary mb-3 uppercase tracking-tighter font-century-gothic">Get Paid Globally</h3>
            <p className="text-[clamp(0.85rem,1.2vw,1rem)] leading-snug text-secondary/70 font-light font-century-gothic">
              Receive payments from anywhere in the world, in any currency, directly to your Cashdoor wallet.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
};

export default About;
