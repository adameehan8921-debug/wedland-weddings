import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Check, ShieldCheck, Truck, CreditCard } from 'lucide-react';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: profile?.displayName?.split(' ')[0] || '',
    lastName: profile?.displayName?.split(' ')[1] || '',
    email: profile?.email || '',
    phone: '',
    address: '',
    city: 'Kochi',
    state: 'Kerala',
    zip: '',
    paymentMethod: 'razorpay'
  });

  const handlePlaceOrder = async () => {
    setLoading(true);
    // Simulate payment process
    setTimeout(() => {
      setLoading(false);
      toast.success('Payment Successful!');
      clearCart();
      navigate('/order-success');
    }, 2000);
  };

  if (items.length === 0) return <div className="pt-40 text-center">Your bag is empty.</div>;

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 bg-dark min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-serif text-white mb-16 text-center italic lowercase">Final <span className="text-gold">Authentication</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {/* Step 1: Shipping */}
            <div className="bg-white/5 p-10 md:p-16 border border-white/5 relative overflow-hidden">
               {step > 1 && <div className="absolute top-0 right-0 p-6"><div className="w-10 h-10 rounded-full bg-gold text-black flex items-center justify-center"><Check className="w-5 h-5"/></div></div>}
               <h3 className="text-3xl font-serif text-white mb-12 flex items-center gap-4 italic lowercase">
                 <Truck className="w-6 h-6 text-gold/60" /> Courier destination
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 pl-1 italic">Lineage Name</label>
                   <input 
                     type="text" 
                     value={formData.firstName}
                     onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                     className="w-full h-14 bg-white/5 border border-white/10 text-white px-6 outline-none focus:border-gold transition-all text-[11px] tracking-widest placeholder:text-white/10" 
                   />
                 </div>
                 <div className="space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 pl-1 italic">Surname</label>
                   <input type="text" value={formData.lastName} className="w-full h-14 bg-white/5 border border-white/10 text-white px-6 outline-none text-[11px] tracking-widest" />
                 </div>
                 <div className="md:col-span-2 space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 pl-1 italic">Digital Cipher (Email)</label>
                   <input type="email" value={formData.email} className="w-full h-14 bg-white/5 border border-white/10 text-white px-6 outline-none text-[11px] tracking-widest" />
                 </div>
                 <div className="md:col-span-2 space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 pl-1 italic">Estate Address</label>
                   <textarea rows={3} className="w-full bg-white/5 border border-white/10 text-white p-6 outline-none focus:border-gold transition-all text-[11px] tracking-widest placeholder:text-white/10"></textarea>
                 </div>
               </div>
               {step === 1 && (
                 <button 
                   onClick={() => setStep(2)}
                   className="mt-12 px-12 py-5 bg-gold text-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-white transition-all shadow-2xl"
                 >SECURE DESTINATION & CONTINUE</button>
               )}
            </div>

            {/* Step 2: Payment */}
            <div className={cn("bg-white/5 p-10 md:p-16 border border-white/5 transition-opacity duration-300", step < 2 ? "opacity-20 pointer-events-none" : "opacity-100")}>
               <h3 className="text-3xl font-serif text-white mb-12 flex items-center gap-4 italic lowercase">
                 <CreditCard className="w-6 h-6 text-gold/60" /> Vault Transaction
               </h3>
               <div className="space-y-6">
                 <label className="flex items-center justify-between p-8 border border-gold bg-gold/5 cursor-pointer">
                   <div className="flex items-center gap-6">
                     <div className="w-6 h-6 rounded-full border-2 border-gold flex items-center justify-center">
                       <div className="w-3 h-3 bg-gold rounded-full"></div>
                     </div>
                     <span className="font-bold text-[11px] tracking-widest uppercase text-white">RAZORPAY (INSTANT AUTHENTICATION)</span>
                   </div>
                   <img src="https://razorpay.com/favicon.png" className="h-6 grayscale opacity-60" />
                 </label>
                 <label className="flex items-center justify-between p-8 border border-white/5 bg-transparent cursor-not-allowed opacity-30">
                    <div className="flex items-center gap-6">
                      <div className="w-6 h-6 rounded-full border-2 border-white/10"></div>
                      <span className="font-bold text-[11px] tracking-widest uppercase text-white/40">COURIER DISBURSEMENT (UNAVAILABLE)</span>
                    </div>
                 </label>
               </div>
               
               <button 
                onClick={handlePlaceOrder}
                disabled={loading}
                className="mt-12 w-full py-6 bg-white text-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-gold transition-all shadow-2xl"
               >
                 {loading ? 'AUTHENTICATING TRANSACTION...' : `EXECUTE PAYMENT: ${formatPrice(totalPrice)}`}
               </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/5 p-10 border border-white/5 sticky top-32">
              <h3 className="text-xl font-serif mb-10 italic uppercase tracking-wider text-white">Archives ({items.length})</h3>
              <div className="max-h-60 overflow-y-auto space-y-6 mb-10 pr-2 scrollbar-hide">
                {items.map(item => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <img src={item.image} className="w-14 h-20 object-cover border border-white/10 grayscale-[20%]" />
                    <div className="flex-grow">
                      <p className="text-[11px] font-serif text-white line-clamp-1 italic">{item.name}</p>
                      <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">{item.quantity} x {formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-10 border-t border-white/10 space-y-6">
                 <div className="flex justify-between text-[11px] tracking-widest text-white/30 uppercase italic font-bold">
                   <span>Logistics</span>
                   <span className="text-gold">COMPLIMENTARY</span>
                 </div>
                 <div className="flex justify-between text-2xl font-serif text-gold">
                   <span className="italic lowercase">Collective Total</span>
                   <span>{formatPrice(totalPrice)}</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
