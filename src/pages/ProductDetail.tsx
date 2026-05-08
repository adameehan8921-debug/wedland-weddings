import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Share2, Star, ShieldCheck, Truck, RotateCcw, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import toast from 'react-hot-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = React.useState('M');
  
  // Mock data - in real app, fetch from Firestore
  const product = {
    id: id,
    name: 'Zari Bordered Kanjeevaram Saree',
    price: 12500,
    originalPrice: 15000,
    description: 'A masterpiece of traditional weaving, this Kanjeevaram silk saree features intricate gold zari borders and temple motifs. Hand-loomed with the finest silk from Kanchipuram, it offers a regal drape perfect for weddings and festivities.',
    category: 'Sarees',
    ratings: 4.8,
    reviews: 124,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610030469668-3e41427233f2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1610189012906-400159449830?q=80&w=1000&auto=format&fit=crop'
    ],
    details: [
      { label: 'Fabric', value: '100% Pure Kanjeevaram Silk' },
      { label: 'Weave', value: 'Hand-loomed Traditional' },
      { label: 'Length', value: '6.5 Meters (incl. Blouse)' },
      { label: 'Occasion', value: 'Bridal / Festive' }
    ]
  };

  const [activeImage, setActiveImage] = React.useState(product.images[0]);

  const handleAdd = () => {
    addToCart({
      id: product.id!,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      selectedSize
    });
    toast.success('Added to your collection');
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <Link to="/shop" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/30 hover:text-gold mb-12 transition-colors uppercase">
          <ChevronLeft className="w-3 h-3" /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-[3/4] overflow-hidden bg-white/5 border border-white/5"
            >
              <img src={activeImage} className="w-full h-full object-cover grayscale-[10%]" alt={product.name} />
            </motion.div>
            <div className="grid grid-cols-3 gap-6">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={cn(
                    "aspect-square overflow-hidden border transition-all",
                    activeImage === img ? "border-gold" : "border-white/5 opacity-40 hover:opacity-100"
                  )}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col pt-4">
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold mb-4 italic">{product.category} COLLECTION</p>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 leading-tight italic">{product.name}</h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 fill-gold text-gold" />)}
                  <span className="text-[10px] font-bold text-white/60 ml-2 uppercase tracking-widest">{product.ratings} / 5.0</span>
                </div>
                <span className="text-white/10">|</span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest">{product.reviews} Reviews</span>
              </div>
            </div>

            <div className="flex items-baseline gap-6 mb-12">
              <span className="text-4xl font-light text-gold tracking-tighter">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-white/20 line-through font-light italic">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-white/60 leading-relaxed mb-12 font-light text-lg italic">
              {product.description}
            </p>

            <div className="mb-12">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Size Selection</h4>
              <div className="flex gap-4">
                {['S', 'M', 'L', 'XL', 'Free'].map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "w-14 h-14 border text-[10px] font-bold tracking-widest uppercase transition-all",
                      selectedSize === size ? "bg-white text-black border-white" : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-6 mb-12">
              <button 
                onClick={handleAdd}
                className="flex-grow h-16 bg-gold text-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all shadow-2xl shadow-gold/10"
              >
                ADD TO COLLECTION
              </button>
              <button className="w-16 h-16 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold transition-all">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-10 border-t border-white/5 uppercase tracking-[0.2em]">
               <div className="flex flex-col items-center text-center gap-3">
                 <ShieldCheck className="w-5 h-5 text-gold/60" />
                 <span className="text-[8px] font-bold text-white/30 leading-loose italic">100% Genuine<br/>Hand Woven</span>
               </div>
               <div className="flex flex-col items-center text-center gap-3">
                 <Truck className="w-5 h-5 text-gold/60" />
                 <span className="text-[8px] font-bold text-white/30 leading-loose italic">Express Delivery<br/>Kochi Direct</span>
               </div>
               <div className="flex flex-col items-center text-center gap-3">
                 <RotateCcw className="w-5 h-5 text-gold/60" />
                 <span className="text-[8px] font-bold text-white/30 leading-loose italic">Premium Return<br/>Privilege</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
