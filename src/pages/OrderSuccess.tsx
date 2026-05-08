import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  const orderId = 'WED-' + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-40 bg-dark text-white font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: 'spring', delay: 0.2 }}
           className="w-28 h-28 bg-gold/10 text-gold rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl border border-gold/20"
        >
          <CheckCircle2 className="w-14 h-14" />
        </motion.div>
        
        <h1 className="text-6xl md:text-7xl font-serif text-white mb-8 italic lowercase">Authenticated <span className="text-gold">Match</span></h1>
        <p className="text-white/40 text-lg font-light mb-12 leading-relaxed tracking-wide uppercase text-[10px] max-w-lg mx-auto">
          Curation confirmed. Our textile masters have initiated the weaving of your legacy. 
          Your journey within the royal archives has officially commenced.
        </p>

        <div className="bg-white/5 p-10 border border-white/5 text-left mb-16 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between py-6 border-b border-white/5">
            <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] italic">Archive Reference</span>
            <span className="font-mono font-bold text-gold tracking-widest">{orderId}</span>
          </div>
          <div className="flex justify-between py-6 border-b border-white/5">
            <span className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] italic">Projection cycle</span>
            <span className="text-white font-bold italic tracking-widest">3-5 LOGISTIC DAYS</span>
          </div>
          <div className="pt-8 flex items-center gap-4 text-gold/60 font-medium text-[10px] tracking-[0.3em] uppercase italic">
            <Package className="w-5 h-5" />
            Verified at Wedland Textiles, Kochi Direct
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link to="/profile">
                <button className="w-full md:w-auto px-12 py-5 bg-gold text-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all shadow-2xl">
                    TRACK LINEAGE <ArrowRight className="w-4 h-4 inline ml-2" />
                </button>
            </Link>
            <Link to="/shop">
                <button className="w-full md:w-auto px-12 py-5 border border-white/10 text-white/40 text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white/5 hover:text-white transition-all">
                    CONTINUE CURATION
                </button>
            </Link>
        </div>
      </motion.div>
    </div>
  );
}
