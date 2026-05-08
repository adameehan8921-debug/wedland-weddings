import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { formatPrice } from '../lib/utils';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 bg-dark min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 flex items-baseline justify-between border-b border-white/5 pb-8">
          <h1 className="text-5xl font-serif lowercase italic text-white">Your <span className="text-gold">Collection</span></h1>
          <Link to="/shop" className="text-[10px] tracking-[0.3em] font-bold text-white/40 hover:text-gold flex items-center gap-2 uppercase transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Store
          </Link>
        </header>

        {items.length === 0 ? (
          <div className="py-32 text-center bg-white/5 border border-white/5">
            <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-gold" />
            </div>
            <h2 className="text-3xl font-serif text-white mb-4 italic">Empty Chamber</h2>
            <p className="text-white/40 mb-10 max-w-xs mx-auto text-xs tracking-widest uppercase leading-loose">The palace looms quiet. Begin curating your ensemble.</p>
            <Link to="/shop">
              <button className="px-12 py-4 bg-gold text-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all">
                EXPLORE TRADITION
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-8">
              {items.map((item) => (
                <motion.div 
                  layout
                  key={item.id}
                  className="bg-white/5 p-8 border border-white/5 flex gap-8 group"
                >
                  <div className="w-32 h-44 overflow-hidden flex-shrink-0 border border-white/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-serif text-white mb-2 italic">{item.name}</h3>
                        <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold italic">{item.selectedSize || 'Standard Size'}</p>
                      </div>
                      <p className="text-xl font-light text-gold italic">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="flex items-center border border-white/10">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-4 py-2 text-white/40 hover:text-white transition-colors"
                        >-</button>
                        <span className="px-5 text-sm font-bold text-white tracking-widest">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-4 py-2 text-white/40 hover:text-white transition-colors"
                        >+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-[9px] font-bold text-red-400/60 uppercase tracking-[0.2em] hover:text-red-400 transition-colors mb-2"
                      >
                        RESCIND
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 p-10 border border-white/5 sticky top-32">
                <h3 className="text-xl font-serif text-white mb-10 pb-6 border-b border-white/5 tracking-wider uppercase italic">Royal Summary</h3>
                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-[11px] tracking-widest text-white/40 uppercase font-bold">
                    <span>VALUATION</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] tracking-widest text-white/40 uppercase font-bold">
                    <span>COURIER</span>
                    <span className="text-gold italic font-bold">COMPLIMENTARY</span>
                  </div>
                  <div className="pt-8 border-t border-white/10 flex justify-between text-2xl font-serif">
                    <span className="italic">GRAINS TOTAL</span>
                    <span className="text-gold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                <Link to="/checkout">
                  <button className="w-full py-5 bg-gold text-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all shadow-2xl shadow-gold/10">
                    FINALIZE CURATION <ChevronRight className="w-4 h-4 inline ml-2" />
                  </button>
                </Link>
                <div className="mt-10 flex items-center justify-center gap-8 opacity-20 filter grayscale invert">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
