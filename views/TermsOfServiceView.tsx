import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PublicHeader from '../components/PublicHeader';
import { AppView } from '../types';

interface TermsOfServiceProps {
  navigate: (view: AppView) => void;
}

const TermsOfServiceView: React.FC<TermsOfServiceProps> = ({ navigate }) => {
  const [activeSection, setActiveSection] = useState<string>('01');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      id: "01",
      title: "Acceptance of terms",
      content: [
        "Welcome to Crezine. By accessing or using our creative fintech platform, payment services, or any related applications (collectively, the \"Service\"), you agree to be bound by these terms of service (\"Terms\"). These terms constitute a legally binding agreement between you and Crezine.",
        "Our service is designed for modern creators and organizations. If you are entering into these terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these conditions.",
        "Your access to the service is also governed by our privacy policy and any specific service level agreements relevant to your subscription tier."
      ]
    },
    {
      id: "02",
      title: "Eligibility & accounts",
      content: [
        "To use Crezine, you must be at least 13 years old. If you are under 18, you may only use our services with the consent and supervision of a parent or legal guardian.",
        "You are responsible for all activity that occurs under your account. You must maintain the confidentiality of your credentials and notify us immediately of any suspected security breach.",
        "Crezine reserves the right to refuse service, terminate accounts, or remove content at our sole discretion, particularly in cases of suspected fraud or violation of these terms."
      ]
    },
    {
      id: "03",
      title: "Acceptable use & resource policy",
      content: [
        "Crezine provides high-performance financial infrastructure. You agree not to use the service for any illegal activities, including but not limited to fraudulent activities, money laundering, or unauthorized transactions.",
        "We implement a fair use policy for our shared resources. While we offer significant bandwidth and storage, accounts that disproportionately consume resources to the detriment of our community may be subject to throttling or migration to dedicated tiers.",
        "You may not attempt to reverse engineer Crezine's core financial infrastructure or bypass our security protocols."
      ]
    },
    {
      id: "04",
      title: "Transactions & escrow",
      content: [
        "You retain full ownership of the creative assets and transaction data you manage on Crezine. By using the service, you grant us a worldwide, non-exclusive license to facilitate, secure, and process your transactions solely for the purpose of providing the service.",
        "We utilize a global network of payment and infrastructure providers. Your data may be processed in various geographic regions to ensure optimal delivery speeds and redundancy.",
        "Crezine is not a backup service. While we maintain infrastructure-level redundancies, you are responsible for maintaining independent backups of your application data and configuration."
      ]
    },
    {
      id: "05",
      title: "Billing & subscriptions",
      content: [
        "Subscriptions are billed in advance on a recurring basis. All fees are exclusive of taxes unless otherwise stated. Failure to maintain a valid payment method may result in service interruption.",
        "Refunds are handled on a case-by-case basis. Generally, fees for the current billing cycle are non-refundable unless there is a significant service failure as defined by our SLA.",
        "We reserve the right to change our pricing. Any price changes will be communicated at least 30 days in advance via your registered email address."
      ]
    },
    {
      id: "06",
      title: "Intellectual property",
      content: [
        "The Crezine brand, logo, and proprietary technologies are the exclusive property of Crezine. You may not use our trademarks without prior written consent.",
        "Our platform may include open-source components governed by their respective licenses. Documentation for these components is available upon request.",
        "Feedback provided to Crezine regarding the service may be used by us without restriction or compensation to you."
      ]
    },
    {
      id: "07",
      title: "Digital goods & ticketing",
      content: [
        "All digital goods and ticket purchases made through Crezine are final and non-refundable. Once a transaction is initiated, the fee is processed and cannot be recovered.",
        "You are solely responsible for ensuring the correct details of the event or product prior to purchase. Crezine is not liable for errors made during the purchase process.",
        "We act as an intermediary between you and the financial partners. Your use of the service is also subject to the terms and conditions of the respective financial institutions."
      ]
    },
    {
      id: "08",
      title: "Prohibited transaction activities",
      content: [
        "We maintain a zero-tolerance policy for fraudulent or abusive use of the platform. This includes, but is not limited to, phishing, spamming, or engaging in illegal activities.",
        "Crezine reserves the right to immediately suspend, lock, or seize any account found to be in violation of these terms or used for malicious purposes, without prior notice or refund.",
        "If a transaction is flagged for abuse by a third-party authority, we may take corrective action to protect our platform and reputation."
      ]
    },
    {
      id: "09",
      title: "Ticket validity & payouts",
      content: [
        "Event tickets and digital goods are valid for the specific period or date of the event. It is your sole responsibility to ensure that your tickets are used prior to its expiration date.",
        "While we may send reminder notifications, we do not guarantee the delivery of such notices. Failure to use a ticket does not entitle you to a refund.",
        "Expired tickets may be voided. Crezine is not liable for any loss due to non-use of services."
      ]
    },
    {
      id: "010",
      title: "Transfer policy",
      content: [
        "You may transfer your tickets or digital assets to another user if the specific event or product allows it, subject to our policies and any locks that may apply.",
        "Crezine may decline a transfer request if there is evidence of fraud or if the account is subject to a court order.",
        "Transfer fees are non-refundable, even if the transfer is rejected."
      ]
    },
    {
      id: "011",
      title: "Transaction & escrow disputes",
      content: [
        "Crezine is not an arbiter of ownership disputes between users. Any dispute regarding the ownership of assets or funds must be resolved through a mutually agreed upon resolution platform or a court of competent jurisdiction.",
        "We will comply with any binding court order requiring the transfer, suspension, or cancellation of a transaction.",
        "You agree to indemnify and hold Crezine harmless from any claims, damages, or liabilities arising from your use of the platform."
      ]
    },
    {
      id: "012",
      title: "Limitation of liability",
      content: [
        "To the maximum extent permitted by law, Crezine shall not be liable for any indirect, incidental, or consequential damages, including loss of profits, data, or use, arising out of the service.",
        "Our total liability for any claim related to the service is limited to the amount paid by you for the service in the twelve months preceding the event.",
        "Crezine provides the service on an \"as is\" and \"as available\" basis without warranties of any kind."
      ]
    },
    {
      id: "013",
      title: "Governing law",
      content: [
        "These terms shall be governed by and construed in accordance with the laws of the Republic of Kenya, without regard to conflict of law principles.",
        "Any disputes arising from these terms will be resolved through binding arbitration in Nairobi, Kenya, or via a mutually agreed upon online dispute resolution platform."
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
                  <p className="text-secondary font-rubik font-normal text-sm">Legal</p>
                  <span className="w-1.5 h-1.5 rounded-full bg-black/10"></span>
                  <p className="text-black/40 font-rubik font-normal text-xs">v2.0.0</p>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-rubik font-normal text-secondary leading-none mb-4 tracking-tighter">
                  Terms of service.
                </h1>
                <div className="flex flex-col gap-1 text-black/60 text-xs font-normal font-rubik mt-10 tracking-tight">
                  <p>Last updated: April 1, 2026 • Effective: April 1, 2026</p>
                </div>
              </div>

              <div className="space-y-24">
                {sections.map((section) => (
                  <div key={section.id} id={section.id} className="scroll-mt-40">
                    <div className="flex items-start gap-6">
                      <span className={`font-rubik font-medium text-xl pt-1 transition-all duration-700 ${activeSection === section.id ? 'text-primary scale-110' : 'text-primary/20 scale-95'}`}>
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
          <aside className="hidden lg:block w-72 shrink-0 relative">
            <div className="sticky top-40 h-fit">
              <div className="space-y-10">
                <div>
                  <p className="text-secondary font-rubik font-normal text-sm mb-8">Contents</p>
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
                        <span className={`font-rubik text-[10px] pt-0.5 transition-all duration-500 ${activeSection === section.id ? 'opacity-100 font-bold' : 'opacity-30'}`}>
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
                    By using Crezine, you're agreeing to these rules. We keep things simple so you can focus on building.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer Section - Stopping Stickiness */}
        <div id="questions" className="mt-40 pt-16 border-t border-secondary/10 bg-accent relative z-10">
          <h3 className="text-xl font-rubik font-normal text-secondary mb-4 uppercase tracking-tighter">Questions?</h3>
          <p className="text-black/60 text-sm mb-6 font-normal">If you have any questions regarding these terms, please contact our legal team.</p>
          <a href="mailto:legal@crezine.app" className="text-primary text-sm font-semibold hover:underline">legal@crezine.app</a>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServiceView;
