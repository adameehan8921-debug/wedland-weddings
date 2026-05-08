import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  Settings, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  ChevronRight,
  TrendingUp,
  Users,
  ShoppingBag
} from 'lucide-react';
import { formatPrice, cn } from '../lib/utils';

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState('overview');

  const stats = [
    { label: 'Total Revenue', value: '₹4.2L', change: '+12%', icon: TrendingUp },
    { label: 'Orders', value: '1,280', change: '+5%', icon: ShoppingBag },
    { label: 'Active Users', value: '42.5K', change: '+18%', icon: Users },
    { label: 'Conversion', value: '3.2%', change: '-2%', icon: BarChart3 },
  ];

  const products = [
    { id: '1', name: 'Zari Bordered Kanjeevaram', stock: 12, price: 12500, category: 'Sarees' },
    { id: '2', name: 'Silk Kurta Set', stock: 45, price: 4500, category: 'Kurtis' },
    { id: '3', name: 'Banarasi Silk Saree', stock: 8, price: 18900, category: 'Sarees' },
  ];

  return (
    <div className="pt-24 flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
        <div className="p-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">Admin Console</h2>
          <nav className="space-y-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'orders', label: 'Orders', icon: ShoppingBag },
              { id: 'users', label: 'Customers', icon: Users },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(item => (
              <button 
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                  activeView === item.id ? "bg-slate-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <item.icon className={cn("w-4 h-4", activeView === item.id ? "text-rose-400" : "text-slate-400")} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-serif text-slate-900 mb-1">Store Dashboard</h1>
            <p className="text-slate-500 text-sm">Welcome back, Wedland Admin</p>
          </div>
          <div className="flex gap-4">
             <button className="h-11 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl flex items-center gap-2 text-sm">
               <Search className="w-4 h-4" />
             </button>
             <button className="h-11 px-6 bg-rose-900 text-white rounded-xl flex items-center gap-2 text-sm font-medium hover:bg-rose-800 shadow-lg shadow-rose-900/20">
               <Plus className="w-4 h-4" /> Add Product
             </button>
          </div>
        </header>

        {activeView === 'overview' && (
          <div className="space-y-10">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map(stat => (
                <div key={stat.label} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-slate-400 cursor-help" />
                      </div>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-1 rounded-full",
                        stat.change.startsWith('+') ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>{stat.change}</span>
                   </div>
                   <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">{stat.label}</p>
                   <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
                </div>
              ))}
            </div>

            {/* List */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                 <h3 className="font-serif text-xl italic">Recent Inventory</h3>
                 <button className="text-rose-800 text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
               </div>
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                       <th className="px-6 py-4">Product Name</th>
                       <th className="px-6 py-4">Category</th>
                       <th className="px-6 py-4">Stock</th>
                       <th className="px-6 py-4">Price</th>
                       <th className="px-6 py-4">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                     {products.map(p => (
                       <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                         <td className="px-6 py-4 font-medium text-slate-900">{p.name}</td>
                         <td className="px-6 py-4 text-sm text-slate-500">{p.category}</td>
                         <td className="px-6 py-4">
                           <span className={cn(
                             "px-3 py-1 rounded-full text-xs font-medium",
                             p.stock < 10 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"
                           )}>{p.stock} units</span>
                         </td>
                         <td className="px-6 py-4 font-bold text-slate-900">{formatPrice(p.price)}</td>
                         <td className="px-6 py-4">
                            <div className="flex gap-2">
                               <button className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all"><Edit3 className="w-4 h-4"/></button>
                               <button className="w-8 h-8 rounded-lg bg-slate-50 text-rose-300 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all"><Trash2 className="w-4 h-4"/></button>
                            </div>
                         </td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
