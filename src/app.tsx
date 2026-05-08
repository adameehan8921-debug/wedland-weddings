import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import AIChatbot from './components/common/AIChatbot';
import OrderSuccess from './pages/OrderSuccess';

function ProtectedRoute({ children, adminOnly = false }: { children: React.ReactNode, adminOnly?: boolean }) {
  const { profile, loading } = useAuth();
  
  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;
  if (!profile) return <Navigate to="/login" />;
  if (adminOnly && profile.role !== 'admin') return <Navigate to="/" />;
  
  return <>{children}</>;
}

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-dark text-white font-serif">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/shop" element={<MainLayout><Shop /></MainLayout>} />
            <Route path="/product/:id" element={<MainLayout><ProductDetail /></MainLayout>} />
            <Route path="/cart" element={<MainLayout><Cart /></MainLayout>} />
            <Route path="/checkout" element={<ProtectedRoute><MainLayout><Checkout /></MainLayout></ProtectedRoute>} />
            <Route path="/order-success" element={<ProtectedRoute><MainLayout><OrderSuccess /></MainLayout></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><MainLayout><Profile /></MainLayout></ProtectedRoute>} />
            <Route path="/admin/*" element={<ProtectedRoute adminOnly><MainLayout><AdminDashboard /></MainLayout></ProtectedRoute>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
