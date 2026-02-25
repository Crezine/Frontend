import React, { useEffect } from 'react';

const WhatsAppView: React.FC = () => {
  useEffect(() => {
    window.open('https://wa.me/254702862705', '_blank');
  }, []);

  return (
    <div className="bg-[#F9F5F0] min-h-screen flex flex-col justify-center items-center font-montserrat text-secondary">
        <h1 className="text-2xl font-bold">Redirecting to WhatsApp...</h1>
    </div>
  );
};

export default WhatsAppView;
