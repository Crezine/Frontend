import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ViewProps } from '../types';
import { FiSearch, FiShoppingCart, FiTag, FiUser, FiPlus, FiArrowRight, FiCheckCircle, FiX } from 'react-icons/fi';
import { HiOutlineLightBulb } from 'react-icons/hi';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  seller: string;
  type: 'art' | 'merch';
}

const products: Product[] = [
  { id: 1, name: 'Abstract Dreams', category: 'Digital Art', price: 450, image: '/art.png', seller: 'Elena Art', type: 'art' },
  { id: 2, name: 'Crezine Signature Hood', category: 'Apparel', price: 65, image: '/hero.jpg', seller: 'Crezine Official', type: 'merch' },
  { id: 3, name: 'Urban Pulse', category: 'Photography', price: 120, image: '/public/mobile.png', seller: 'Marcus Snap', type: 'art' },
  { id: 4, name: 'Creative Bottle', category: 'Accessories', price: 25, image: '/crezine.png', seller: 'Crezine Official', type: 'merch' },
  { id: 5, name: 'Neon Soul', category: 'Digital Art', price: 300, image: '/art.png', seller: 'K-Design', type: 'art' },
  { id: 6, name: 'Crezine Branded Cap', category: 'Apparel', price: 30, image: '/favicon.png', seller: 'Crezine Official', type: 'merch' },
  { id: 7, name: 'Minimalist Tag', category: 'Accessories', price: 12, image: '/verified.png', seller: 'Crezine Official', type: 'merch' },
  { id: 8, name: 'Soulful Bangle', category: 'Jewelry', price: 45, image: '/get-started.png', seller: 'AfriCraft', type: 'merch' },
];

const ShopView: React.FC<ViewProps> = ({ navigate }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [cartCount, setCartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const categories = ['All', 'Digital Art', 'Photography', 'Apparel', 'Accessories', 'Jewelry'];

  React.useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        if (currentScrollY < 10) {
          setIsVisible(true);
        } else {
          if (currentScrollY > lastScrollY) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
        }
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = () => setCartCount(prev => prev + 1);
  
  const refreshShop = () => {
    setActiveCategory('All');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-accent min-h-screen font-rubik overflow-x-hidden pb-20">
      {/* Isolated Shop Header - Curved and Floating */}
      <header 
        className={`fixed top-3 left-3 right-3 z-50 transition-all duration-500 ease-in-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-full shadow-lg border border-secondary/10 flex items-center justify-between h-14 md:h-16 px-4 md:px-8 relative">
            <div className="flex items-center">
              <img 
                src="/shop.png" 
                alt="Crezine Shop" 
                className="h-7 md:h-9 cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={refreshShop}
              />
            </div>
            
            <div className="flex items-center gap-2 md:gap-4">
              {/* Desktop Search */}
              <div className="hidden md:block relative">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" />
                  <input 
                      type="text" 
                      placeholder="Search marketplace..."
                      className="pl-10 pr-4 py-1.5 rounded-full bg-accent border-none text-sm w-40 lg:w-64 focus:ring-1 focus:ring-primary/20 transition-all"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>

              {/* Mobile Search Toggle */}
              <button 
                  className="md:hidden p-1.5 text-secondary/60"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                  <FiSearch size={20} />
              </button>

              <button className="p-1.5 text-secondary/60 hover:text-primary relative transition-colors">
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary text-white text-[9px] w-3.5 h-3.5 flex items-center justify-center rounded-full font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                  onClick={() => setRole(role === 'buyer' ? 'seller' : 'buyer')}
                  className="bg-secondary text-white px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-secondary/90 transition-all shadow-lg shadow-secondary/10 whitespace-nowrap"
              >
                {role === 'buyer' ? 'Seller Mode' : 'Buyer Mode'}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <AnimatePresence>
            {isSearchOpen && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white p-3 rounded-2xl border border-secondary/5 shadow-xl z-50"
                >
                    <div className="relative">
                        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/30" />
                        <input 
                            type="text" 
                            autoFocus
                            placeholder="Search art, merch..."
                            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-accent border-none text-sm focus:ring-1 focus:ring-primary/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button 
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary/40"
                            onClick={() => setIsSearchOpen(false)}
                        >
                            <FiX size={18} />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </header>
      
      {/* Main Content Area */}
      <div className="pt-24 md:pt-36 px-4 sm:px-6 max-w-7xl mx-auto">
        
        {/* Market Header & Filter Mini-Nav */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12 pb-8 border-b border-secondary/5">
          <div className="flex-shrink-0">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-normal text-secondary tracking-tighter"
            >
              Explore <span className="text-primary italic">Market</span>
            </motion.h1>
            <p className="text-sm text-secondary/50 font-montserrat mt-1">Directly from the world's best creators.</p>
          </div>
          
          {/* Horizontal Mini Navigation for Categories */}
          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0 w-full lg:w-auto scroll-smooth">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap border ${
                  activeCategory === cat 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                    : 'bg-white border-secondary/10 text-secondary/60 hover:border-primary/30 hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-12">
          {/* Product Grid - Full Width */}
          <main className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-[32px] overflow-hidden border border-secondary/5 shadow-sm hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="relative h-64 overflow-hidden bg-accent/50">
                    <div className="absolute inset-0 flex items-center justify-center text-secondary/5 font-bold text-5xl select-none">
                       {product.type === 'art' ? 'ART' : 'MERCH'}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-secondary border border-secondary/10 flex items-center gap-1.5 uppercase tracking-widest z-10">
                       <FiTag className="text-primary" /> {product.category}
                    </div>
                    {product.seller === 'Crezine Official' && (
                        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest z-10 shadow-lg shadow-primary/20">
                            Official
                        </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-secondary font-rubik group-hover:text-primary transition-colors truncate pr-2">{product.name}</h3>
                      <span className="text-xl font-normal text-secondary font-montserrat tracking-tight">${product.price}</span>
                    </div>
                    <p className="text-sm text-secondary/40 font-montserrat mb-6">by {product.seller}</p>
                    <div className="flex gap-3">
                        <button 
                            onClick={addToCart}
                            className="flex-grow bg-secondary text-white py-3.5 rounded-2xl text-sm font-bold hover:bg-secondary/90 transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <FiPlus size={18} /> Add to Cart
                        </button>
                        <button className="bg-primary/5 text-primary p-3.5 rounded-2xl hover:bg-primary/10 transition-all border border-primary/10">
                            <FiArrowRight size={20} />
                        </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-32 bg-white rounded-[48px] border border-dashed border-secondary/20 shadow-inner">
                    <div className="bg-accent w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-secondary/10">
                        <FiSearch size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-secondary mb-3">No matching creations</h3>
                    <p className="text-secondary/50 font-montserrat">Try exploring other categories or clearing your search.</p>
                    <button 
                        onClick={refreshShop}
                        className="mt-8 bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                    >
                        Reset Marketplace
                    </button>
                </div>
            )}
          </main>

          {/* Contextual Sections (Repurposed Sidebar content) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {role === 'seller' && (
                <motion.section 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-secondary text-white rounded-[40px] p-8 md:p-12 relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-72 h-72 bg-primary/20 rounded-full blur-[100px] -mr-36 -mt-36"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary/20 p-3 rounded-2xl text-primary">
                                <HiOutlineLightBulb size={24} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-normal tracking-tighter">Seller <span className="text-primary">Dashboard</span></h2>
                        </div>
                        <p className="text-sm text-white/60 font-montserrat mb-8 max-w-sm">List your art, track earnings, and manage your global creative presence.</p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2">
                                <FiPlus /> List New Product
                            </button>
                            <button className="bg-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/20 transition-all border border-white/5">
                                Analytics
                            </button>
                        </div>
                    </div>
                </motion.section>
              )}

              <section className="bg-white rounded-[40px] p-8 md:p-12 border border-secondary/5 shadow-xl flex flex-col justify-center">
                  <h3 className="text-sm font-bold text-secondary mb-6 font-montserrat uppercase tracking-[0.2em] text-primary">Marketplace Trust</h3>
                  <div className="space-y-6">
                    {[
                        { title: 'Escrow Protected', desc: 'Funds held safely until art is delivered.' },
                        { title: 'Global Shipping', desc: 'Crezine Merch ships to over 120 countries.' },
                        { title: 'Direct Support', desc: '24/7 dedicated support for all transactions.' }
                    ].map((info, i) => (
                        <div key={i} className="flex items-start gap-4">
                            <div className="mt-1 bg-primary/10 p-1.5 rounded-full text-primary">
                                <FiCheckCircle size={16} />
                            </div>
                            <div>
                                <h4 className="font-bold text-secondary text-base">{info.title}</h4>
                                <p className="text-sm text-secondary/50 font-montserrat">{info.desc}</p>
                            </div>
                        </div>
                    ))}
                  </div>
              </section>
          </div>
        </div>
      </div>

      {/* Simplified Trust Banner */}
      <section className="mt-20 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="bg-primary text-white rounded-[48px] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[100px] -mr-48 -mb-48"></div>
                <div className="max-w-xl text-center lg:text-left relative z-10">
                    <h2 className="text-3xl md:text-5xl font-normal tracking-tighter mb-4 leading-tight">
                        Secure Global <br className="hidden md:block" /><span className="text-secondary italic">Creative Ecosystem</span>
                    </h2>
                    <p className="text-sm md:text-base text-white/70 font-montserrat">
                        Crezine Shop is part of a secure financial layer designed specifically for the creative hustle.
                        Every purchase is backed by our robust escrow system.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 relative z-10 bg-white/10 backdrop-blur-md p-8 rounded-[32px] border border-white/10">
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-normal mb-1">100%</div>
                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Escrow Secure</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-normal mb-1">Global</div>
                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Available</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-normal mb-1">Fast</div>
                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Payouts</div>
                    </div>
                </div>
          </div>
      </section>

      {/* Global CSS for hiding scrollbars but keeping functionality */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ShopView;
