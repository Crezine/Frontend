import React from 'react';
import { AppView } from '../types';
import PublicHeader from '../components/PublicHeader';
import Footer from '../components/Footer';

const LandingView: React.FC<{ navigate: (view: AppView) => void }> = ({ navigate }) => {
  return (
    <div className="bg-accent font-sans">
      <PublicHeader navigate={navigate} />
      <main>
        {/* Hero Section */}
        <section className="flex flex-col justify-center container mx-auto px-6 pt-20 pb-12 md:pt-28 md:pb-20">
          <div className="w-full max-w-4xl text-left">
            <div className="glass-card rounded-full py-1 px-3 inline-block mb-4">
              <p className="text-xs sm:text-sm text-secondary/90 font-montserrat">
                Your global cashdoor for creative dreams.
              </p>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-century-gothic font-black uppercase tracking-tighter mb-3 md:mb-4">
              <span className="text-secondary">Global</span> <span className="text-primary">Creative</span>
              <br />
              <span className="text-secondary">Cashdoor</span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-secondary/80 font-montserrat mb-8">
              Get paid as a creative securely and globally in any currency.
              <br />
              Showcase your work, sell experiences, and manage your projects—
              <br />
              all behind one door.
            </p>
            <div className="flex flex-col items-start md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <button
                onClick={() => navigate('onboarding' as AppView)}
                className="bg-secondary text-white font-bold font-montserrat uppercase tracking-tight w-auto px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-secondary/90 hover:shadow-2xl hover:shadow-secondary/30 active:scale-95 transform"
              >
                Create Your Cashdoor
              </button>
              <button
                onClick={() => navigate('features' as AppView)}
                className="bg-white text-secondary border border-secondary font-bold font-montserrat uppercase tracking-tight w-auto px-6 md:px-8 py-2 md:py-3 rounded-full text-sm md:text-base transition-all duration-300 hover:bg-secondary/10 active:scale-95 transform"
              >
                Explore Features
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24 container mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-nunito font-black text-primary text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center p-4">
              <div className="text-3xl md:text-4xl font-black text-primary mb-4">01</div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2">Create Your Cashdoor</h3>
              <p className="text-sm md:text-base text-secondary/80">
                Sign up and create your personalized Cashdoor in minutes. This will be your one-stop shop for all your creative endeavors.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="text-3xl md:text-4xl font-black text-primary mb-4">02</div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2">Showcase & Sell</h3>
              <p className="text-sm md:text-base text-secondary/80">
                Showcase your work, sell digital products, and manage your client projects all from your Cashdoor.
              </p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="text-3xl md:text-4xl font-black text-primary mb-4">03</div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-2">Get Paid Globally</h3>
              <p className="text-sm md:text-base text-secondary/80">
                Receive payments from anywhere in the world, in any currency, directly to your Cashdoor wallet.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer navigate={navigate} />
    </div>
  );
};

export default LandingView;
