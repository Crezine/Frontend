import React, { useEffect } from 'react';

const WhatsAppView: React.FC = () => {
  useEffect(() => {
    window.open('https://wa.me/254702862705', '_blank');
  }, []);

  return (
    <div className="bg-[#F9F5F0] min-h-screen flex flex-col justify-center items-center text-secondary font-rubik">
        <h1 className="text-2xl font-montserrat font-bold">Redirecting to WhatsApp...</h1>
    </div>
  );
};

export default WhatsAppView;
