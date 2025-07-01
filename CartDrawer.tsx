import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShopping, getCartTotal } from '../contexts/ShoppingContext';
import toast from 'react-hot-toast';

const CartDrawer = () => {
  const { state, dispatch } = useShopping();

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
      toast.success('Item removed from cart', {
        icon: '🗑️',
        style: {
          background: '#000',
          color: '#d4af37',
          border: '1px solid #d4af37'
        }
      });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { productId, quantity } });
    }
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.success('Item removed from cart', {
      icon: '🗑️',
      style: {
        background: '#000',
        color: '#d4af37',
        border: '1px solid #d4af37'
      }
    });
  };

  const closeCart = () => {
    dispatch({ type: 'TOGGLE_CART' });
  };

  const cartTotal = getCartTotal(state.cartItems);

  return (
    <AnimatePresence>
      {state.isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-luxury-gradient border-l border-gold/30 z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gold/20">
                <div className="flex items-center space-x-3">
                  <Crown className="h-6 w-6 text-gold" />
                  <h2 className="text-xl font-cinzel font-semibold text-gold">Royal Cart</h2>
                </div>
                <motion.button
                  onClick={closeCart}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-silver hover:text-gold transition-colors"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {state.cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <ShoppingBag className="h-16 w-16 text-silver/50 mx-auto mb-4" />
                    <h3 className="text-lg font-cinzel text-silver mb-2">Your cart is empty</h3>
                    <p className="text-sm text-silver/70 font-garamond">
                      Discover our exquisite medieval collection
                    </p>
                    <Link to="/products" onClick={closeCart}>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 bg-gold text-black px-6 py-3 rounded-lg font-cinzel font-semibold 
                                   hover:bg-gold-light transition-all duration-300"
                      >
                        Browse Collection
                      </motion.button>
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {state.cartItems.map((item, index) => (
                      <motion.div
                        key={item.product.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/30 rounded-lg p-4 border border-gold/20 hover:border-gold/40 transition-all"
                      >
                        <div className="flex space-x-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={item.product.images[0]} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className="font-cinzel font-semibold text-gold text-sm mb-1 truncate">
                              {item.product.name}
                            </h4>
                            <p className="text-xs text-silver/70 mb-2 font-garamond">
                              {item.product.category.replace('-', ' ')}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-gold">
                                ${item.product.price}
                              </div>
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 rounded-full bg-gold/20 text-gold hover:bg-gold hover:text-black 
                                             transition-all flex items-center justify-center"
                                >
                                  <Minus className="h-4 w-4" />
                                </motion.button>
                                <span className="w-8 text-center text-gold font-bold">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="w-8 h-8 rounded-full bg-gold/20 text-gold hover:bg-gold hover:text-black 
                                             transition-all flex items-center justify-center"
                                >
                                  <Plus className="h-4 w-4" />
                                </motion.button>
                              </div>
                            </div>
                            <motion.button
                              onClick={() => removeItem(item.product.id)}
                              whileHover={{ scale: 1.05 }}
                              className="text-xs text-red-400 hover:text-red-300 mt-2 font-garamond"
                            >
                              Remove
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {state.cartItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t border-gold/20 p-6 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-cinzel text-silver">Total:</span>
                    <span className="text-2xl font-bold text-gold">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <Link to="/checkout" onClick={closeCart}>
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(212, 175, 55, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gold-gradient text-black py-4 rounded-lg font-cinzel font-semibold 
                                   text-lg shadow-lg hover:shadow-gold/30 transition-all duration-300"
                      >
                        Proceed to Checkout
                      </motion.button>
                    </Link>
                    
                    <Link to="/products" onClick={closeCart}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full border-2 border-gold text-gold py-3 rounded-lg font-cinzel 
                                   font-semibold hover:bg-gold hover:text-black transition-all duration-300"
                      >
                        Continue Shopping
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;