import React from 'react';

const ContactView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 bg-gray-50 font-sans">
      <header className="mb-8 md:mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary font-century-gothic leading-tight">
          Contact Us
        </h1>
        <p className="text-secondary/70 mt-2 md:mt-4 font-medium font-montserrat text-lg md:text-xl">
          We'd love to hear from you. Reach out to us anytime.
        </p>
      </header>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary transition-all font-montserrat" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary transition-all font-montserrat" />
          </div>
          <textarea placeholder="Your Message" rows={6} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary transition-all font-montserrat mb-6"></textarea>
          <button type="submit" className="w-full bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition-all font-montserrat shadow-lg text-base">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactView;
