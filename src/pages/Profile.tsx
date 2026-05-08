import React from 'react';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Heart, LogOut, Settings, CreditCard, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../lib/utils';

export default function Profile() {
  const { profile, logout } = useAuth();
  const [activeTab, setActiveTab] = React.useState('orders');

  const orders = [
    { id: 'WED-A8392J', date: 'Oct 12, 2025', total: 12500, status: 'delivered', items: 1 },
    { id: 'WED-B1291K', date: 'Sept 28, 2025', total: 4500, status: 'shipped', items: 2 }
  ];

  return (
    <div className="pt-32 pb-24 px-6 md:px-16 bg-dark min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-12">
            <div className="bg-white/5 p-10 border border-white/5 text-center">
              <div className="w-28 h-28 rounded-full bg-gold/10 mx-auto mb-6 flex items-center justify-center overflow-hidden border border-gold/30">
                {profile?.photoURL ? <img src={profile.photoURL} alt="Avatar" /> : <User className="w-12 h-12 text-gold/60" />}
              </div>
              <h2 className="text-2xl font-serif text-white mb-2 italic truncate">{profile?.displayName}</h2>
              <p className="text-gold/60 text-[10px] uppercase font-bold tracking-[0.4em] italic">{profile?.role} PORTFOLIO</p>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'orders', label: 'History', icon: Package },
                { id: 'wishlist', label: 'Curations', icon: Heart },
                { id: 'address', label: 'Estates', icon: MapPin },
                { id: 'payments', label: 'Vault', icon: CreditCard },
                { id: 'settings', label: 'Preferences', icon: Settings },
              ].map(item => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-5 px-8 py-5 transition-all text-[11px] font-bold tracking-[0.2em] uppercase",
                    activeTab === item.id ? "bg-gold text-black shadow-2xl shadow-gold/10" : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={logout}
                className="w-full flex items-center gap-5 px-8 py-5 text-white/20 hover:text-red-400 transition-colors text-[11px] font-bold tracking-[0.2em] uppercase"
              >
                <LogOut className="w-4 h-4" /> Resign
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
             <div className="bg-white/5 p-10 md:p-16 border border-white/5 min-h-[600px]">
                {activeTab === 'orders' && (
                  <div>
                    <h3 className="text-3xl font-serif text-white mb-12 italic border-b border-white/5 pb-8">Legacy of acquisitions</h3>
                    <div className="space-y-6">
                      {orders.map(order => (
                        <div key={order.id} className="border border-white/5 p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-white/5 transition-all group">
                          <div className="flex gap-6 items-center">
                             <div className="w-14 h-14 bg-white/5 border border-white/10 flex items-center justify-center">
                               <ShoppingBag className="w-6 h-6 text-gold/40 group-hover:text-gold transition-colors" />
                             </div>
                             <div>
                               <p className="text-[12px] font-bold text-white tracking-widest uppercase mb-1">{order.id}</p>
                               <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] italic font-bold">{order.date}</p>
                             </div>
                          </div>
                          <div className="flex gap-16 items-center justify-between md:justify-end">
                             <div className="text-right">
                               <p className="text-xl font-light text-gold italic">{formatPrice(order.total)}</p>
                               <p className="text-[9px] text-white/20 uppercase tracking-widest mt-1">{order.items} Pieces</p>
                             </div>
                             <div className={cn(
                               "px-5 py-2 text-[9px] font-bold uppercase tracking-[0.2em] italic border",
                               order.status === 'delivered' ? "bg-green-400/5 text-green-400 border-green-400/20" : "bg-gold/5 text-gold border-gold/20"
                             )}>
                               {order.status}
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab !== 'orders' && (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <div className="opacity-10 mb-8">
                       <Heart className="w-24 h-24 mx-auto" />
                    </div>
                    <h4 className="text-2xl font-serif italic text-white/40 mb-4 tracking-wide">The chamber is being prepared</h4>
                    <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] max-w-xs mx-auto leading-loose">This sector of your boutique will soon be unveiled for your private viewing.</p>
                  </div>
                )}
             </div>
          </main>
        </div>
      </div>
    </div>
  );
}

import { cn } from '../lib/utils';
