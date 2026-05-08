import React from 'react';
import { motion } from 'framer-motion';
import { LogIn, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Login() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" />;

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-dark font-sans">
      <div className="hidden lg:block w-1/2 relative overflow-hidden font-serif">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
          src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=2000&auto=format&fit=crop"
          className="w-full h-full object-cover grayscale-[20%]"
          alt="Login background"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h2 className="text-6xl font-light mb-8 leading-tight italic">The Royal <br />Lineage of <span className="text-gold">Symmetry.</span></h2>
            <p className="text-white/40 max-w-sm font-light tracking-widest text-xs uppercase leading-loose">Access your curated private gallery and track your acquisitions within the empire.</p>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 bg-dark">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-block mb-20">
            <div className="flex flex-col">
              <h1 className="text-3xl font-serif text-gold tracking-[0.2em] leading-tight">WEDLAND</h1>
              <h1 className="text-3xl font-serif text-gold/60 italic tracking-[0.1em] leading-tight opacity-80">WEDDINGS</h1>
            </div>
          </Link>

          <div className="space-y-4 mb-16">
            <h3 className="text-4xl font-serif text-white italic lowercase">Welcome <span className="text-gold">Back</span></h3>
            <p className="text-white/30 font-light text-[10px] tracking-[0.3em] uppercase">Enter the archives or authenticate via Google.</p>
          </div>

          <div className="space-y-6">
            <button 
              onClick={handleGoogleLogin}
              className="w-full h-16 bg-white/5 border border-white/10 text-white text-[11px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-4 hover:bg-white hover:text-black transition-all shadow-2xl"
            >
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale group-hover:grayscale-0" alt="Google" />
              AUTHENTICATE GOOGLE
            </button>

            <div className="relative py-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-[0.4em] text-white/20">
                <span className="bg-dark px-6 font-bold">STATIONARY ACCESS</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 pl-1 italic">ARCHIVE IDENTIFIER (EMAIL)</label>
                <input 
                  type="email" 
                  placeholder="IDENTITY@DOMAIN.COM"
                  className="w-full h-16 bg-white/5 border border-white/10 text-white px-6 outline-none focus:border-gold transition-all text-[11px] tracking-widest placeholder:text-white/10"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pr-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 italic">ACCESS CIPHER (PASSWORD)</label>
                  <a href="#" className="text-[10px] text-gold/60 hover:text-gold uppercase tracking-widest font-bold">RECOVER</a>
                </div>
                <input 
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full h-16 bg-white/5 border border-white/10 text-white px-6 outline-none focus:border-gold transition-all text-[11px] tracking-widest placeholder:text-white/10"
                />
              </div>
              <button 
                disabled
                className="w-full h-16 bg-white text-black text-[11px] font-bold tracking-[0.3em] uppercase hover:bg-gold transition-all opacity-40 cursor-not-allowed"
              >
                AUTHORIZE LOGIN
              </button>
            </div>
          </div>

          <p className="mt-16 text-center text-white/20 text-[10px] tracking-widest uppercase">
            NO PORTFOLIO YET? <a href="#" className="text-gold font-bold hover:underline">CREATE STATIONARY</a>
          </p>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
