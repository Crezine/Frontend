import React from 'react';
import { RiQrCodeLine } from 'react-icons/ri';

interface EventTicketProps {
  eventName?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  checkInType?: string;
  orderId?: string;
  location?: string;
  eventImage?: string;
}

const EventTicket: React.FC<EventTicketProps> = ({
  eventName = "Oktoba Fest 2026",
  eventDate = "20 . 11 . 2026",
  startTime = "12 : 00 PM",
  endTime = "12 : 00 AM",
  checkInType = "Vip experience",
  orderId = "BGD99763JS",
  location = "Kileleshwa",
  eventImage = "/event_demo.png"
}) => {
  return (
    <div className="w-full max-w-[600px] mx-auto bg-white overflow-hidden shadow-2xl font-montserrat border-x border-b border-gray-100 rounded-b-[2rem] no-scrollbar">
      {/* Top Section: Thinner Blue Frame and Lower Height */}
      <div className="h-32 w-full bg-blue-600 p-1 relative">
        <div className="w-full h-full rounded-[1.2rem] overflow-hidden">
          <img 
            src={eventImage} 
            alt={eventName} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Ticket Body: Highly Compact Spacing */}
      <div className="p-4 space-y-3">
        {/* Event Name - Aligned Left */}
        <div className="text-left px-2">
          <h2 className="text-xl font-medium text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
            {eventName}
          </h2>
        </div>

        {/* Details Section: Minimal Padding */}
        <div className="grid grid-cols-3 gap-y-3 gap-x-4 border-t border-b border-gray-100 py-3">
          <div className="text-center space-y-0.5">
            <p className="text-[10px] font-bold text-black font-rubik">Date</p>
            <p className="text-[11px] font-medium text-black font-montserrat whitespace-nowrap">{eventDate}</p>
          </div>
          <div className="text-center space-y-0.5 border-x border-gray-100 px-2">
            <p className="text-[10px] font-bold text-black font-rubik">Start time</p>
            <p className="text-[11px] font-medium text-black font-montserrat whitespace-nowrap">{startTime}</p>
          </div>
          <div className="text-center space-y-0.5">
            <p className="text-[10px] font-bold text-black font-rubik">End time</p>
            <p className="text-[11px] font-medium text-black font-montserrat whitespace-nowrap">{endTime}</p>
          </div>

          <div className="text-center space-y-0.5">
            <p className="text-[10px] font-bold text-black font-rubik">Check in type</p>
            <p className="text-[11px] font-medium text-black font-montserrat">{checkInType}</p>
          </div>
          <div className="text-center space-y-0.5 border-x border-gray-100 px-2">
            <p className="text-[10px] font-bold text-black font-rubik">Order id</p>
            <p className="text-[11px] font-medium text-black font-montserrat">{orderId}</p>
          </div>
          <div className="text-center space-y-0.5">
            <p className="text-[10px] font-bold text-black font-rubik">Location</p>
            <p className="text-[11px] font-medium text-black font-montserrat">{location}</p>
          </div>
        </div>

        {/* QR Code Section: More Compact */}
        <div className="flex flex-col items-center">
          <div className="w-36 h-36 bg-secondary/5 rounded-2xl flex items-center justify-center p-2 mb-1 border border-secondary/10">
            <RiQrCodeLine size={130} className="text-secondary" />
          </div>
          <p className="text-[12px] font-normal text-secondary font-montserrat tracking-wide">
            Scan to verify
          </p>
        </div>
      </div>

      {/* Aesthetic Ticket Cutouts */}
      <div className="relative h-4 flex items-center justify-between px-[-10px] mb-3">
        <div className="w-6 h-6 bg-gray-100 rounded-full -ml-3"></div>
        <div className="flex-1 border-t border-dashed border-gray-200 mx-2"></div>
        <div className="w-6 h-6 bg-gray-100 rounded-full -mr-3"></div>
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default EventTicket;
