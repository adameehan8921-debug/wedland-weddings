import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/shop/ProductCard';

export default function Shop() {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [sortBy, setSortBy] = useState('Featured');

  const products = [
    { id: '1', name: 'Zari Bordered Kanjeevaram Saree', price: 12500, originalPrice: 15000, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop', category: 'Sarees', ratings: 4.8 },
    { id: '2', name: 'Embroidered Silk Kurta Set', price: 4500, originalPrice: 5200, image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=600&auto=format&fit=crop', category: 'Kurtis', ratings: 4.5 },
    { id: '3', name: 'Banarasi Silk Wedding Saree', price: 18900, originalPrice: 22000, image: 'https://images.unsplash.com/photo-1610030469668-3e41427233f2?q=80&w=600&auto=format&fit=crop', category: 'Sarees', ratings: 4.9 },
    { id: '4', name: 'Classic Sherwani with Stole', price: 25000, originalPrice: 30000, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop', category: 'Mens', ratings: 4.7 },
    { id: '5', name: 'Floral Print Georgette Saree', price: 3200, image: 'https://images.unsplash.com/photo-1610189012906-400159449830?q=80&w=600&auto=format&fit=crop', category: 'Sarees', ratings: 4.2 },
    { id: '6', name: 'Chanderi Cotton Anarkali', price: 6800, image: 'https://images.unsplash.com/photo-1617627143750-d36bc39bb2f6?q=80&w=600&auto=format&fit=crop', category: 'Kurtis', ratings: 4.6 },
  ];

  const categories = ['All', 'Sarees', 'Kurtis', 'Mens', 'Bridal', 'Accessories'];

  const filteredProducts = products.filter(p => selectedCategory === 'All' || p.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-black min-h-screen text-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-serif text-white mb-4 lowercase italic">{selectedCategory} <span className="text-gold">Collection</span></h1>
              <p className="text-white/40 font-light max-w-xl text-xs tracking-widest uppercase leading-loose">Curated ethnic wear for every celebration. From handcrafted silks to contemporary designs.</p>
            </div>
            <div className="flex items-center gap-4 bg-white/5 rounded-full px-6 py-3 border border-white/10">
              <Search className="w-4 h-4 text-white/40" />
              <input type="text" placeholder="SEARCH COLLECTION..." className="bg-transparent outline-none text-[10px] tracking-widest uppercase w-48 md:w-64 placeholder:text-white/20" />
            </div>
          </div>
        </header>

        {/* Filters & Sorting Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 py-8 border-y border-white/5">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase transition-all",
                  selectedCategory === cat ? "bg-gold text-black shadow-xl shadow-gold/20" : "bg-transparent text-white/40 hover:text-white border border-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
            <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/60 uppercase hover:text-gold transition-colors">
              <Filter className="w-3 h-3" /> Filter
            </button>
            <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/60 uppercase hover:text-gold transition-colors">
              Sort: {sortBy} <ChevronDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-slate-400 italic">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
