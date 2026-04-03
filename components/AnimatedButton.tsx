import React from 'react';

interface AnimatedButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  onClick, 
  className, 
  label = "Explore features" 
}) => {
  return (
    <div className={`animated-button-wrapper ${className || ''}`}>
      <style>{`
        .animated-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 32px;
          border: 2px solid #AB3625;
          font-size: 14px;
          background-color: transparent;
          border-radius: 9999px;
          font-weight: 400; /* Montserrat Regular */
          color: #000000;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          font-family: 'Montserrat', sans-serif;
          white-space: nowrap;
          height: 48px; /* Standardizing height to match other buttons */
          min-width: 160px;
        }

        .animated-button svg {
          position: absolute;
          width: 20px;
          fill: #000000;
          z-index: 9;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .arr-1 {
          right: 16px;
        }

        .animated-button .arr-2 {
          left: -25%;
        }

        .animated-button .circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background-color: #AB3625;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button .text {
          position: relative;
          z-index: 1;
          transform: translateX(-8px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .animated-button:hover {
          color: #ffffff;
          /* Removed box-shadow expansion and border-radius change */
        }

        .animated-button:hover .arr-1 {
          right: -25%;
        }

        .animated-button:hover .arr-2 {
          left: 16px;
        }

        .animated-button:hover .text {
          transform: translateX(12px);
        }

        .animated-button:hover svg {
          fill: #ffffff;
        }

        .animated-button:active {
          scale: 0.95;
        }

        .animated-button:hover .circle {
          width: 300px; /* Increased to ensure full coverage without shape change */
          height: 300px;
          opacity: 1;
        }
      `}</style>
      <button className="animated-button" onClick={onClick}>
        <svg viewBox="0 0 24 24" className="arr-2" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">{label}</span>
        <span className="circle" />
        <svg viewBox="0 0 24 24" className="arr-1" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>
    </div>
  );
}

export default AnimatedButton;
