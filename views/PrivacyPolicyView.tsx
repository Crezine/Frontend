import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';

interface PrivacyPolicyProps {
  navigate: (view: AppView) => void;
}

const PrivacyPolicyView: React.FC<PrivacyPolicyProps> = ({ navigate }) => {
  const [activeSection, setActiveSection] = useState<string>('01');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "01",
      title: "Introduction",
      content: [
        "At Crezine, we prioritize the protection of your digital presence. This privacy policy outlines our commitment to transparency regarding the collection, use, and security of your personal data when you interact with our creative fintech platform and related services.",
        "By leveraging our financial infrastructure, you entrust us with certain information. We want you to understand exactly what that data is, how we handle it, and the rigorous measures we take to keep it safe.",
        "Your use of Crezine signifies your acceptance of these practices. We operate in full compliance with the Republic of Kenya Data Protection Act and other applicable global standards."
      ]
    },
    {
      id: "02",
      title: "Data we collect",
      content: [
        "We collect information essential to providing a premium creative business experience. This includes account details like your name and email, billing information for pro services, and technical metadata such as IP addresses and browser configurations used for platform optimization.",
        "Transaction data: We process transaction details and account information solely to secure your payments and manage your creative business. This data is handled with maximum security and encryption protocols.",
        "Usage analytics: To improve our infrastructure, we monitor platform performance and interaction patterns. This data is typically aggregated and anonymized."
      ]
    },
    {
      id: "03",
      title: "How we use data",
      content: [
        "The primarily purpose of data collection is to maintain the reliability and speed of your transactions and services. This includes automated payouts, secure routing, and continuous integration of financial workflows.",
        "Security & authentication: We use your data to protect against unauthorized access, prevent fraud, and maintain the integrity of our global network.",
        "Communication: We send critical system alerts, maintenance notices, and occasional updates about features that directly impact your experience as a creator."
      ]
    },
    {
      id: "04",
      title: "Security & protection",
      content: [
        "Encryption: All data transmitted through Crezine is protected by industry-standard TLS. Account data at rest is encrypted using advanced cryptographic methods.",
        "Global infrastructure: We utilize specialized secure locations which are physically and digitally secured. Access to these systems is strictly controlled and audited.",
        "Zero-trust architecture: Our internal systems operate on a zero-trust model, ensuring that only verified processes and individuals can interact with sensitive data layers."
      ]
    },
    {
      id: "05",
      title: "Information sharing",
      content: [
        "Crezine does not sell or rent your personal data to third parties. We believe your privacy is not a commodity.",
        "Strategic partners: We may share limited data with essential service providers, such as payment processors or infrastructure partners, exclusively to facilitate the core functions of our Service.",
        "Legal compliance: We may disclose information if required by a valid legal process, ensuring that any such request is properly vetted and scrutinized for legitimacy."
      ]
    },
    {
      id: "06",
      title: "Your privacy rights",
      content: [
        "You have the right to access, correct, or request the deletion of your personal information at any time. These requests can be managed directly through your Crezine dashboard.",
        "Data portability: You can export your transaction history and associated project data in a portable format should you choose to migrate your services.",
        "Consent management: You have full control over non-essential tracking and communication preferences. Your choice to opt-out is respected across our entire ecosystem."
      ]
    },
    {
      id: "07",
      title: "Data retention",
      content: [
        "We retain your data only as long as your account remains active or as needed to provide you with the Service. Upon account termination, personal data is purged from our active systems following a grace period.",
        "Legal obligations: Some metadata may be retained longer to comply with financial or regulatory requirements, after which it is securely deleted or anonymized."
      ]
    },
    {
      id: "08",
      title: "Policy evolutions",
      content: [
        "As our platform evolves, so may our privacy practices. Any significant changes will be communicated via your registered email and clearly marked on this page with an updated version number.",
        "We encourage you to review this policy periodically to stay informed about how we are protecting those who build on Crezine."
      ]
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 140;
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

  return (
    <div className="bg-accent min-h-screen flex flex-col font-montserrat relative">
      <PublicHeader />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-32 pb-20">
        <div className="lg:grid lg:grid-cols-[1fr_260px] gap-16 relative">
          {/* Left Content Area */}
          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-16">
                <div className="flex items-center gap-6 mb-8">
                  <p className="text-secondary font-rubik font-normal text-sm">Privacy</p>
                  <span className="w-1.5 h-1.5 rounded-full bg-black/10"></span>
                  <p className="text-black/40 font-rubik font-normal text-xs">v2.0.0</p>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary leading-none mb-4 tracking-tighter">
                  Privacy policy.
                </h1>
                <p className="text-black/60 text-xs font-normal font-rubik mt-10">
                  Last updated: April 1, 2026 • Effective: April 1, 2026
                </p>
              </div>

              <div className="space-y-24">
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-40">
                    <div className="flex items-start gap-6">
                      <span className={`font-montserrat font-normal text-xl pt-1 transition-all duration-700 ${activeSection === section.id ? 'text-primary scale-110' : 'text-primary/20 scale-95'}`}>
                        {section.id}
                      </span>
                      <div className="space-y-6">
                        <h2 className={`text-2xl md:text-3xl font-rubik font-normal transition-all duration-700 tracking-tight ${activeSection === section.id ? 'text-secondary translate-x-1' : 'text-secondary/60'}`}>
                          {section.title}
                        </h2>
                        <div className="space-y-4">
                          {section.content.map((p, i) => (
                            <p key={i} className="text-[15px] md:text-base text-black/80 font-normal leading-relaxed">
                              {p}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar - Desktop Only */}
          <aside className="hidden lg:block relative">
            <div className="sticky top-40 h-fit">
              <div className="space-y-10">
                <div>
                  <p className="text-secondary font-rubik font-normal text-sm mb-8">Navigation</p>
                  <nav className="flex flex-col gap-5">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left text-[13px] transition-all duration-500 font-medium flex items-start gap-3 group ${
                          activeSection === section.id 
                            ? 'text-primary translate-x-2' 
                            : 'text-black/40 hover:text-secondary'
                        }`}
                      >
                        <span className={`font-montserrat text-[10px] pt-0.5 transition-all duration-500 ${activeSection === section.id ? 'opacity-100 font-normal' : 'opacity-30'}`}>
                          {section.id}
                        </span>
                        <span className="relative font-rubik font-normal">
                          {section.title}
                          <span className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-500 ${activeSection === section.id ? 'w-full' : 'w-0'}`}></span>
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="pt-10 border-t border-secondary/10">
                  <p className="text-secondary font-rubik italic text-sm leading-tight mb-4 opacity-80 font-normal">
                    "Privacy is not a feature, it's a fundamental requirement."
                  </p>
                  <p className="text-black/40 text-[10px] font-normal leading-relaxed font-rubik">
                    By using Crezine, you're agreeing to our privacy practices.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Section - Stopping Stickiness */}
        <div id="concerns" className="mt-40 pt-16 border-t border-secondary/10 bg-accent relative z-10">
          <h3 className="text-xl font-rubik font-normal text-secondary mb-4 tracking-tighter">Privacy concerns?</h3>
          <p className="text-black/60 text-sm mb-6 font-normal">Our data protection officer is ready to assist with any questions regarding your digital footprint.</p>
          <a href="mailto:privacy@crezine.app" className="text-primary text-sm font-semibold hover:underline">privacy@crezine.app</a>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyView;
