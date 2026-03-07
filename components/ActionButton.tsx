import React from 'react';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
  color?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ children, icon, label, color, className, ...props }) => {
  // Quick Action Button Style (for Dashboard)
  if (icon && label) {
    const baseClasses = "p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col items-center justify-center text-center gap-3 md:gap-4 transition-all hover:scale-105 active:scale-100 shadow-lg hover:shadow-xl";
    const combinedClasses = `${baseClasses} ${color || ''} ${className || ''}`.trim();
    
    return (
      <button className={combinedClasses} {...props}>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center">
            {icon}
        </div>
        <span className="text-xs md:text-sm font-normal font-montserrat tracking-wider uppercase">{label}</span>
      </button>
    );
  }

  // Default CTA Button Style
  const baseClasses = "bg-secondary border-2 border-secondary text-white text-xs font-normal py-3.5 rounded-full uppercase tracking-[0.2em] font-montserrat transition-all hover:bg-secondary/90 active:scale-95 shadow-lg shadow-secondary/20";
  const combinedClasses = `${baseClasses} ${className || ''}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default ActionButton;
