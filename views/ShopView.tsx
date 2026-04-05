import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ViewProps } from '../types';
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxHamburgerMenu } from 'react-icons/rx';
import ShopSidebar from '../components/ShopSidebar';
import ShopFooter from '../components/ShopFooter';
import CartSidebar from '../components/CartSidebar';

export type ShopSubView = 'all-products' | 'collections' | 'pencil-portrait' | 'paintings';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  category: ShopSubView;
}

interface CartItem extends Product {
  quantity: number;
}

const ARTWORKS: Product[] = [
  { id: 1, name: 'Nigerian Beauty 001', price: 250, image: '/art.png', size: '80cm by 60cm', category: 'all-products' },
  { id: 2, name: 'Nigerian Beauty 002', price: 250, image: '/art.png', size: '80cm by 60cm', category: 'all-products' },
  { id: 3, name: 'Nigerian Beauty 003', price: 250, image: '/art.png', size: '80cm by 60cm', category: 'all-products' },
  { id: 4, name: 'Nigerian Beauty 004', price: 250, image: '/art.png', size: '80cm by 60cm', category: 'all-products' },
  { id: 5, name: 'Nigerian Beauty 005', price: 250, image: '/art.png', size: '80cm by 60cm', category: 'all-products' },
  { id: 6, name: 'Nigerian Beauty 006', price: 250, image: '/art.png', size: '80cm by 60cm', category: 'all-products' },
  { id: 7, name: 'Nigerian Beauty 007', price: 250, image: '/art.png', size: '80cm by 60cm', category: 'all-products' },
  { id: 8, name: 'Nigerian Beauty 008', price: 250, image: '/art.png', size: '80cm by 60cm', category: 'all-products' },
];

// STABLE COMPONENTS DEFINED OUTSIDE TO PREVENT FLICKERING
const ProductGridItem = ({ art, onAddToCart }: { art: Product, onAddToCart: (p: Product) => void }) => (
  <div className="group flex flex-col items-center">
    <div 
      onClick={() => onAddToCart(art)}
      className="border border-black p-0.5 mb-6 overflow-hidden max-w-[240px] w-full cursor-pointer hover:shadow-lg transition-all duration-300 bg-white transform group-hover:-translate-y-1"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-accent/20">
        <img 
          src={art.image} 
          alt={art.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
    </div>
    <div className="text-center space-y-1">
      <h3 className="text-sm font-normal text-black font-montserrat">{art.name}</h3>
      <p className="text-sm font-normal text-black font-montserrat">$ {art.price.toFixed(2)}</p>
    </div>
  </div>
);

const ComingSoonSection: React.FC<{ title: string }> = ({ title }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex-grow flex flex-col items-center justify-center text-center w-full min-h-[75vh] px-4"
  >
    <h2 className="text-4xl md:text-6xl lg:text-7xl font-normal text-secondary tracking-tighter mb-6 font-montserrat">
      coming <span className="text-primary italic">soon</span>
    </h2>
    <p className="text-black/40 text-xs md:text-sm font-normal max-w-xs md:max-w-md tracking-[0.2em] lowercase leading-relaxed font-montserrat mx-auto">
      we're curating something special for {title}. stay tuned!
    </p>
  </motion.div>
);

const ShopView: React.FC<ViewProps> = ({ navigate: parentNavigate }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('crezine_cart');
    try {
      return saved ? JSON.parse(saved) : [{ 
        id: 1, name: 'Nigerian Beauty 001', price: 250.00, 
        image: '/art.png', size: '80cm by 60cm', quantity: 1 
      }];
    } catch (e) { return []; }
  });

  useEffect(() => {
    localStorage.setItem('crezine_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const shouldLock = isSidebarOpen || isCartOpen;
    document.body.style.overflow = shouldLock ? 'hidden' : 'unset';
  }, [isSidebarOpen, isCartOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 50) {
            setIsHeaderVisible(true);
          } else {
            setIsHeaderVisible(currentScrollY < lastScrollY);
          }
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartTotalQuantity = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.quantity, 0), 
  [cartItems]);

  const handleSubViewChange = (newSubView: ShopSubView) => {
    navigate(`/shop/${newSubView}`);
  };

  return (
    <div className="bg-accent min-h-screen font-montserrat flex flex-col selection:bg-primary/30 relative">
      <ShopSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        navigate={parentNavigate}
        activeView="shop"
        setSubView={handleSubViewChange}
      />

      <CartSidebar 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        navigate={parentNavigate}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        setSubView={handleSubViewChange}
      />

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 transform px-3 pt-3 ${
          isHeaderVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-full shadow-sm border border-secondary/10 flex items-center justify-between h-14 md:h-16 px-4 md:px-8">
            <div className="flex items-center">
              <img 
                src="/shop.png" 
                alt="Crezine Shop" 
                className="h-8 md:h-10 cursor-pointer hover:opacity-70 transition-all" 
                onClick={() => handleSubViewChange('all-products')}
              />
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-secondary hover:text-primary transition-colors relative group"
                aria-label="View Cart"
              >
                <MdOutlineShoppingCart size={28} className="group-hover:scale-110 transition-transform" />
                {cartTotalQuantity > 0 && (
                  <span className="absolute top-1 right-1 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                    {cartTotalQuantity}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-full hover:bg-accent/50 transition-colors text-secondary group"
                aria-label="Open Menu"
              >
                <RxHamburgerMenu size={32} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow pt-32 md:pt-40 px-4 sm:px-6 max-w-7xl mx-auto w-full flex flex-col">
        <Routes>
          <Route path="/" element={<Navigate to="all-products" replace />} />
          <Route path="all-products" element={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 md:gap-x-16 lg:gap-x-20 gap-y-20 pb-24">
              {ARTWORKS.map((art) => (
                <ProductGridItem key={art.id} art={art} onAddToCart={addToCart} />
              ))}
            </div>
          } />
          <Route path="collections" element={<ComingSoonSection title="collections" />} />
          <Route path="pencil-portrait" element={<ComingSoonSection title="pencil portraits" />} />
          <Route path="paintings" element={<ComingSoonSection title="paintings" />} />
        </Routes>
      </main>

      <ShopFooter navigate={parentNavigate} onCartOpen={() => setIsCartOpen(true)} />

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ShopView;
