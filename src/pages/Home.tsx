import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Star, Quote } from 'lucide-react';
import ProductCard from '../components/shop/ProductCard';

export default function Home() {
  const categories = [
    { name: 'Bridal Sarees', image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop', path: '/shop?category=Sarees' },
    { name: 'Designer Kurtis', image: 'https://images.unsplash.com/photo-1610030482700-c44e3905c1ba?q=80&w=800&auto=format&fit=crop', path: '/shop?category=Kurtis' },
    { name: 'Grooms Wear', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop', path: '/shop?category=Mens' },
    { name: 'Ethnic Gowns', image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?q=80&w=800&auto=format&fit=crop', path: '/shop?category=Gowns' },
  ];

  const featuredProducts = [
    { id: '1', name: 'Zari Bordered Kanjeevaram Saree', price: 12500, originalPrice: 15000, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop', category: 'Sarees', ratings: 4.8 },
    { id: '2', name: 'Embroidered Silk Kurta Set', price: 4500, originalPrice: 5200, image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=600&auto=format&fit=crop', category: 'Kurtis', ratings: 4.5 },
    { id: '3', name: 'Banarasi Silk Wedding Saree', price: 18900, originalPrice: 22000, image: 'https://images.unsplash.com/photo-1610030469668-3e41427233f2?q=80&w=600&auto=format&fit=crop', category: 'Sarees', ratings: 4.9 },
    { id: '4', name: 'Classic Sherwani with Stole', price: 25000, originalPrice: 30000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop', category: 'Mens', ratings: 4.7 },
  ];

  return (
    <div className="overflow-hidden bg-dark">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Model"
            className="w-full h-full object-cover grayscale-[10%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            <p className="text-gold tracking-[0.4em] font-medium text-[10px] md:text-sm uppercase drop-shadow-lg">
              EST. 1995 · KERALA'S GRAND HERITAGE
            </p>
            
            <div className="space-y-2">
                <h1 className="text-6xl md:text-[120px] font-serif text-white tracking-tight leading-[0.8]">
                    Draped in
                </h1>
                <h2 className="text-5xl md:text-[85px] font-serif italic text-gold leading-tight">
                    Elegance
                </h2>
            </div>

            <p className="text-white/80 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed drop-shadow-md">
              Handcrafted silk sarees woven with tradition, <br className="hidden md:block" /> worn with pride.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="pt-8"
            >
              <Link to="/shop">
                <button className="bg-gold text-black px-12 py-4 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all shadow-2xl">
                    EXPLORE COLLECTION
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-rose-600 font-semibold tracking-widest text-xs uppercase mb-2 block">Curation</span>
              <h2 className="text-4xl font-serif italic">Shop by Category</h2>
            </div>
            <Link to="/shop" className="text-slate-500 hover:text-rose-600 font-medium text-sm flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative h-[450px] overflow-hidden rounded-2xl cursor-pointer"
              >
                <Link to={cat.path}>
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-6 left-6">
                    <h3 className="text-white text-xl font-serif mb-2">{cat.name}</h3>
                    <div className="w-8 h-[1px] bg-rose-400 group-hover:w-16 transition-all duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-rose-600 font-semibold tracking-widest text-xs uppercase mb-2 block">Recommendations</span>
            <h2 className="text-4xl md:text-5xl font-serif">Handpicked Selection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/shop">
              <button className="px-10 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                Explore Full Boutique
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story / Parallax */}
      <section className="relative py-40 overflow-hidden bg-rose-900 text-white">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Quote className="w-12 h-12 text-rose-300 mx-auto mb-8 opacity-50" />
            <h2 className="text-3xl md:text-5xl font-serif italic mb-8 leading-tight">
              "We believe every weave tells a story, and every occasion deserves a masterpiece."
            </h2>
            <div className="w-20 h-[1px] bg-rose-300/30 mx-auto mb-8" />
            <p className="text-rose-100/70 text-lg font-light italic">
              Wedland Weddings - Heritage of Kochi
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-6">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-rose-500 text-rose-500" />)}
                </div>
                <p className="text-slate-600 text-lg leading-relaxed italic">
                  "The quality of the silk was beyond my expectations. I received so many compliments on my wedding day. Thank you Wedland!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-100" />
                  <div>
                    <p className="font-semibold text-slate-900">Ananya R.</p>
                    <p className="text-slate-400 text-xs uppercase tracking-widest">Kochi Client</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
