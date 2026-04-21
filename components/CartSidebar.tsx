import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppView } from '../types';
import { FiX, FiMinus, FiPlus } from 'react-icons/fi';
import { ShopSubView } from '../views/ShopView';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (view: AppView) => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  setSubView: (view: ShopSubView) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  navigate, 
  items, 
  onUpdateQuantity, 
  onRemove,
  setSubView
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleEmptyCartAction = (target: ShopSubView) => {
    setSubView(target);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-[70]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[80] shadow-2xl flex flex-col font-montserrat border-l border-black"
          >
            {/* Header */}
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-normal text-black tracking-widest uppercase">
                  CART ({items.length})
                </h2>
                <button onClick={onClose} className="text-black hover:opacity-70 transition-opacity">
                  <FiX size={20} />
                </button>
              </div>
              <div className="h-[1px] bg-black w-full" />
            </div>

            {/* Content Area */}
            <div className="flex-grow overflow-y-auto px-6 py-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-base font-normal text-black mb-8">Your Cart is Empty!</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <h3 className="text-sm font-normal text-black tracking-tight">Product</h3>
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-8">
                      {/* Product Image - Increased Size */}
                      <div className="w-32 h-40 border border-black flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Product Info */}
                      <div className="flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <h4 className="text-sm font-normal text-black">{item.name}</h4>
                          <p className="text-xs font-normal text-black/60">Size: {item.size}</p>
                          <p className="text-sm font-bold text-black">$ {item.price.toFixed(2)}</p>
                        </div>
                        
                        <div className="mt-4 space-y-3">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-black w-fit h-8 px-2 gap-4">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="text-black hover:opacity-60 transition-opacity"
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="text-sm font-normal text-black">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="text-black hover:opacity-60 transition-opacity"
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-[10px] font-normal text-red-600 hover:opacity-70 transition-opacity text-left uppercase tracking-widest"
                          >
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-black/10">
              {items.length === 0 ? (
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleEmptyCartAction('all-products')}
                    className="flex-1 bg-secondary text-white py-3 rounded-full text-sm font-normal hover:opacity-90 transition-all uppercase tracking-widest"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => handleEmptyCartAction('collections')}
                    className="flex-1 bg-secondary text-white py-3 rounded-full text-sm font-normal hover:opacity-90 transition-all uppercase tracking-widest"
                  >
                    Shop
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-normal text-black uppercase tracking-widest">SubTotal</span>
                    <span className="text-xs font-normal text-black">$ {subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-center">
                    <button 
                      onClick={() => {
                        navigate('checkout' as any);
                        onClose();
                      }}
                      className="w-full bg-secondary text-white py-2.5 rounded-full text-sm font-normal hover:opacity-90 transition-all uppercase tracking-widest"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default CartSidebar;
