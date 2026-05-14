import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { ViewProps } from '../types';
import { MdOutlineShoppingCart } from "react-icons/md";
import { RxHamburgerMenu } from 'react-icons/rx';
import ShopSidebar from '../components/ShopSidebar';
import ShopFooter from '../components/ShopFooter';
import CartSidebar from '../components/CartSidebar';
import { shopService, Product, CartItem } from '../src/services/shopService';

export type ShopSubView = 'all-products' | 'collections' | 'pencil-portrait' | 'paintings';

const ProductGridItem = ({ art, onAddToCart }: { art: Product, onAddToCart: (p: Product) => void }) => (
  <div className="group flex flex-col items-center">
    <div 
      onClick={() => onAddToCart(art)}
      className="border border-black p-0.5 mb-6 overflow-hidden max-w-[240px] w-full cursor-pointer hover:shadow-lg transition-all duration-300 bg-white transform group-hover:-translate-y-1"
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-accent/20">
        <img 
          src={art.imageUrl || '/art.png'} 
          alt={art.name}
          className="w-full h-full object-cover transition-transform duration-500"
          loading="lazy"
        />
      </div>
    </div>
    <div className="text-center space-y-1">
      <h3 className="text-sm font-normal text-black font-montserrat">{art.name}</h3>
      <p className="text-sm font-normal text-black font-montserrat">$ {(art.price / 100).toFixed(2)}</p>
    </div>
  </div>
);

const ComingSoonSection: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex-grow flex items-center justify-center w-full min-h-screen py-20 px-6">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center max-w-2xl"
    >
      <motion.h2 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl md:text-5xl lg:text-6xl font-normal text-secondary tracking-[0.15em] uppercase font-montserrat whitespace-nowrap"
      >
        COMING <span className="text-primary italic font-normal">SOON</span>
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-black text-[13px] md:text-lg font-medium tracking-wide font-montserrat mt-2"
      >
        We are curating something special for {title}. Stay tuned.
      </motion.p>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px]" />
      </div>
    </motion.div>
  </div>
);

const ShopView: React.FC<ViewProps> = ({ navigate: parentNavigate }) => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('crezine_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  const isComingSoonView = useMemo(() => 
    ['collections', 'pencil-portrait', 'paintings'].some(path => location.pathname.includes(path)),
  [location.pathname]);

  // Initial fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await shopService.getProducts();
        setProducts(productsData);
        
        // Only try to sync cart if we have a token
        if (localStorage.getItem('firebaseToken')) {
          const cartData = await shopService.getCart();
          if (cartData && cartData.items) {
            setCartItems(cartData.items);
            localStorage.setItem('crezine_cart', JSON.stringify(cartData.items));
          }
        }
      } catch (error) {
        console.warn("Auth needed for backend cart, using local cart instead");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToCart = async (product: Product) => {
    // 1. Update Local State & Storage immediately for responsive UI
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === product.id);
      let newItems;
      if (existing) {
        newItems = prev.map(item => 
          item.productId === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...prev, { 
          productId: product.id, 
          name: product.name, 
          price: product.price, 
          quantity: 1,
          imageUrl: product.imageUrl 
        }];
      }
      localStorage.setItem('crezine_cart', JSON.stringify(newItems));
      return newItems;
    });
    setIsCartOpen(true);

    // 2. Try to sync with backend in background
    if (localStorage.getItem('firebaseToken')) {
      try {
        await shopService.addToCart(product.id, 1);
      } catch (error) {
        console.warn("Background cart sync failed (likely unauthorized)");
      }
    }
  };

  const updateQuantity = async (productId: string, delta: number) => {
    setCartItems(prev => {
      const newItems = prev.map(item => 
        item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      );
      localStorage.setItem('crezine_cart', JSON.stringify(newItems));
      return newItems;
    });

    if (localStorage.getItem('firebaseToken')) {
      try {
        const item = cartItems.find(i => i.productId === productId);
        if (item) {
          await shopService.addToCart(productId, Math.max(1, item.quantity + delta));
        }
      } catch (error) {
        console.warn("Background quantity sync failed");
      }
    }
  };

  const removeItem = async (productId: string) => {
    setCartItems(prev => {
      const newItems = prev.filter(item => item.productId !== productId);
      localStorage.setItem('crezine_cart', JSON.stringify(newItems));
      return newItems;
    });

    if (localStorage.getItem('firebaseToken')) {
      try {
        await shopService.removeFromCart(productId);
      } catch (error) {
        console.warn("Background remove sync failed");
      }
    }
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
        items={cartItems.map((item, index) => ({
          id: item.productId || `item-${index}`,
          productId: item.productId,
          name: item.name,
          price: item.price / 100,
          image: item.imageUrl || '/art.png',
          size: 'Standard',
          quantity: item.quantity
        }))}
        onUpdateQuantity={(id, delta) => updateQuantity(id as string, delta)}
        onRemove={(id) => removeItem(id as string)}
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
                className="h-8 md:h-10 cursor-pointer transition-all" 
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
      
      <main className={`flex-grow px-4 sm:px-6 max-w-7xl mx-auto w-full flex flex-col ${isComingSoonView ? 'pt-0' : 'pt-32 md:pt-40'}`}>
        <Routes>
          <Route path="/" element={<Navigate to="all-products" replace />} />
          <Route path="all-products" element={
            isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-secondary/10 border-t-secondary rounded-full animate-spin"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 text-black/40">No products available at the moment.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 md:gap-x-16 lg:gap-x-20 gap-y-20 pb-24">
                {products.map((art) => (
                  <ProductGridItem key={art.id} art={art} onAddToCart={addToCart} />
                ))}
              </div>
            )
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
