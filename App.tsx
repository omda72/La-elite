import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Toaster } from 'react-hot-toast';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AuthModal from './components/AuthModal';
import WhatsAppSupport from './components/WhatsAppSupport';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import UserAccountPage from './pages/UserAccountPage';

// Context
import { AuthProvider } from './contexts/AuthContext';
import { ShoppingProvider, useShopping } from './contexts/ShoppingContext';

// PayPal configuration
const paypalOptions = {
  clientId: "test", // Replace with actual PayPal client ID
  currency: "USD",
  intent: "capture",
};

function AppContent() {
  const { dispatch } = useShopping();

  useEffect(() => {
    // Load products data
    fetch('/data/products.json')
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: 'SET_PRODUCTS',
          payload: {
            products: data.products,
            categories: data.categories
          }
        });
      })
      .catch(error => {
        console.error('Error loading products:', error);
      });
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-garamond">
        <Header />
        
        <AnimatePresence mode="wait">
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:category" element={<ProductsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/account" element={<UserAccountPage />} />
            </Routes>
          </main>
        </AnimatePresence>
        
        <Footer />
        <CartDrawer />
        <AuthModal />
        <WhatsAppSupport />
      </div>
    </Router>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for elegant entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-2 border-gold border-t-transparent rounded-full mx-auto mb-4"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl font-garamond text-gold tracking-wider"
          >
            laÉlite
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-sm text-silver mt-2 tracking-wide"
          >
            Curating Excellence in Luxury Goods
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <AuthProvider>
        <ShoppingProvider>
          <AppContent />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                color: '#d4af37',
                border: '1px solid #d4af37',
                borderRadius: '8px',
                boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)',
              },
              success: {
                iconTheme: {
                  primary: '#d4af37',
                  secondary: '#000000',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
                style: {
                  background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
                  color: '#ef4444',
                  border: '1px solid #ef4444',
                },
              },
            }}
          />
        </ShoppingProvider>
      </AuthProvider>
    </PayPalScriptProvider>
  );
}

export default App;