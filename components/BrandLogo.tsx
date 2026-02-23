import React from 'react';

interface BrandLogoProps {
  onClick?: () => void;
  isLarge?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ onClick, isLarge = false }) => {
  const logoWidth = isLarge ? 'w-40' : 'w-24';
  const logoHeight = isLarge ? 'h-auto' : 'h-auto';

  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      <img 
        src="/crezine.png" 
        alt="CREZINE Logo" 
        className={`${logoWidth} ${logoHeight} object-contain`} 
      />
    </div>
  );
};

export default BrandLogo;