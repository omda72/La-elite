import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Crown, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShopping, getCartItemCount } from '../contexts/ShoppingContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { state, dispatch } = useShopping();
  const { state: authState, dispatch: authDispatch } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartItemCount = getCartItemCount(state.cartItems);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Collections', href: '/products' },
    { name: 'Vases', href: '/products/vases' },
    { name: 'Bowls', href: '/products/bowls' },
    { name: 'Medieval Weapons', href: '/products/medieval-weapons' },
    { name: 'Cambodian Oud', href: '/products/cambodian-oud' },
    { name: 'Volatile Oil Wood', href: '/products/volatile-oil-wood' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-luxury-gradient shadow-2xl border-b border-gold/20 sticky top-0 z-50"
    >
      {/* Top bar */}
      <div className="bg-black/90 text-gold py-2 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <motion.div 
              className="flex space-x-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span className="relative overflow-hidden">
                <span className="block">Free shipping on orders over $500</span>
                <motion.div
                  className="absolute inset-0 bg-gold-gradient opacity-20"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </span>
              <span className="text-silver">•</span>
              <span>Authentic luxury goods with certificates</span>
            </motion.div>
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <Link to="/contact" className="hover:text-gold-light transition-colors duration-300 hover:glow">
                Royal Support
              </Link>
              <span className="text-silver">•</span>
              <Link to="/about" className="hover:text-gold-light transition-colors duration-300">
                Our Heritage
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Crown className="h-10 w-10 text-gold drop-shadow-lg" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-3xl font-cinzel font-bold bg-gold-gradient bg-clip-text text-transparent">
                  laÉlite
                </span>
                <span className="text-xs text-silver font-garamond tracking-widest">
                  LUXURY CURATED
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                placeholder="Search luxury goods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 pl-12 pr-4 bg-black/50 border border-gold/30 rounded-full 
                           text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold 
                           focus:border-gold backdrop-blur-sm transition-all duration-300"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gold" />
              <motion.div
                className="absolute inset-0 rounded-full border border-gold/20"
                animate={{ boxShadow: ['0 0 0 0 rgba(212, 175, 55, 0.4)', '0 0 0 10px rgba(212, 175, 55, 0)', '0 0 0 0 rgba(212, 175, 55, 0.4)'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </form>
          </div>

          {/* Cart and menu */}
          <div className="flex items-center space-x-6">
            <motion.button
              onClick={toggleCart}
              className="relative p-3 text-silver hover:text-gold transition-colors duration-300 group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="h-6 w-6 drop-shadow-lg" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-gold text-black text-xs rounded-full h-6 w-6 
                             flex items-center justify-center font-bold shadow-lg"
                >
                  {cartItemCount}
                </motion.span>
              )}
              <motion.div
                className="absolute inset-0 rounded-full bg-gold/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.5, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* User Icon */}
            <motion.div className="relative">
              <motion.button
                onClick={() => authState.isAuthenticated ? navigate('/account') : authDispatch({ type: 'SHOW_AUTH_MODAL', payload: true })}
                className="p-3 text-silver hover:text-gold transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="h-6 w-6 drop-shadow-lg" />
              </motion.button>
              {authState.isAuthenticated && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                />
              )}
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-silver hover:text-gold transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="hidden md:block border-t border-gold/20 pt-4 pb-6"
        >
          <div className="flex justify-center space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
              >
                <Link
                  to={item.href}
                  className="relative text-silver hover:text-gold font-garamond font-medium 
                             transition-all duration-300 py-2 px-4 group"
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-gold-gradient"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gold/10 rounded-lg"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.nav>

        {/* Mobile search */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search luxury goods..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 pl-12 pr-4 bg-black/50 border border-gold/30 rounded-full 
                             text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold 
                             focus:border-gold backdrop-blur-sm"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gold" />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-sm border-t border-gold/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-silver hover:text-gold font-garamond font-medium 
                               transition-colors duration-300 py-3 px-4 rounded-lg hover:bg-gold/10"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;