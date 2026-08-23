import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiCheckLine, RiErrorWarningLine, RiAlertLine, RiInformationLine, RiCloseLine } from 'react-icons/ri';

export type StatusModalType = 'success' | 'error' | 'warning' | 'info';

export interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: StatusModalType;
  title: string;
  message?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  children?: React.ReactNode;
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  onClose,
  type = 'info',
  title,
  message,
  primaryAction,
  secondaryAction,
  children,
}) => {
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  const getIconConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: <RiCheckLine className="text-[#F69C31] text-4xl" />,
          borderColor: 'border-[#AB3625]',
          badgeBg: 'bg-emerald-50 text-emerald-600',
        };
      case 'error':
        return {
          icon: <RiErrorWarningLine className="text-red-500 text-4xl" />,
          borderColor: 'border-red-500',
          badgeBg: 'bg-red-50 text-red-600',
        };
      case 'warning':
        return {
          icon: <RiAlertLine className="text-amber-500 text-4xl" />,
          borderColor: 'border-amber-500',
          badgeBg: 'bg-amber-50 text-amber-600',
        };
      case 'info':
      default:
        return {
          icon: <RiInformationLine className="text-[#AB3625] text-4xl" />,
          borderColor: 'border-[#AB3625]/40',
          badgeBg: 'bg-orange-50 text-[#AB3625]',
        };
    }
  };

  const { icon, borderColor } = getIconConfig();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center font-montserrat p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative bg-white rounded-[2rem] w-full max-w-sm overflow-hidden shadow-2xl flex flex-col items-center p-6 md:p-8 text-center border border-black/5"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full text-black/40 hover:text-black hover:bg-black/5 transition-all"
              aria-label="Close"
            >
              <RiCloseLine size={20} />
            </button>

            <div
              className={`w-16 h-16 bg-white border-2 ${borderColor} rounded-full flex items-center justify-center mb-4 shadow-sm`}
            >
              {icon}
            </div>

            <h2 id="modal-title" className="text-lg font-medium text-black mb-1.5 leading-snug">
              {title}
            </h2>

            {message && (
              <p className="text-xs text-black/70 font-normal mb-5 leading-relaxed px-2">
                {message}
              </p>
            )}

            {children && <div className="w-full mb-5">{children}</div>}

            <div className="w-full flex gap-3 mt-1">
              {secondaryAction && (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className="flex-1 py-2.5 border border-black text-black rounded-full text-xs font-normal uppercase tracking-widest hover:bg-black hover:text-white transition-all font-montserrat"
                >
                  {secondaryAction.label}
                </button>
              )}

              {primaryAction && (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className="flex-1 py-2.5 bg-secondary text-white rounded-full text-xs font-normal uppercase tracking-widest hover:opacity-90 transition-all shadow-md font-montserrat"
                >
                  {primaryAction.label}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StatusModal;
