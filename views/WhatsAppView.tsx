import React from 'react';

const WhatsAppView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12 bg-gray-50 font-sans flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-secondary font-century-gothic leading-tight">
          Chat with us on WhatsApp
        </h1>
        <p className="text-secondary/70 mt-2 md:mt-4 font-medium font-montserrat text-lg md:text-xl max-w-2xl mx-auto">
          Have a quick question? Our team is ready to help you on WhatsApp. Click the button below to start a conversation.
        </p>
        <a 
          href="https://wa.me/1234567890" // Replace with your WhatsApp number
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-all font-montserrat shadow-lg text-base"
        >
          Open WhatsApp Chat
        </a>
      </div>
    </div>
  );
};

export default WhatsAppView;
