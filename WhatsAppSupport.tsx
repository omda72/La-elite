import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Clock, Users, Phone } from 'lucide-react';

const WhatsAppSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Mock business hours check
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      
      // Business hours: Monday-Friday 9AM-6PM, Saturday 10AM-4PM, Closed Sunday
      if (day === 0) { // Sunday
        setIsOnline(false);
      } else if (day === 6) { // Saturday
        setIsOnline(hour >= 10 && hour < 16);
      } else { // Monday-Friday
        setIsOnline(hour >= 9 && hour < 18);
      }
    };

    checkBusinessHours();
    const interval = setInterval(checkBusinessHours, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const openWhatsApp = () => {
    const phoneNumber = '41441234567'; // Switzerland number
    const message = encodeURIComponent(
      `Hello laÉlite Support Team! 

I'm interested in your luxury goods and would like assistance with:

[ ] Product Information
[ ] Authentication Details
[ ] Shipping & Delivery
[ ] Payment Options
[ ] Custom Orders
[ ] After-Sales Support

Please let me know how you can help me today.

Best regards,
[Your Name]`
    );
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStatusText = () => {
    if (isOnline) {
      return 'Online now • Usually replies instantly';
    } else {
      return 'Currently offline • We\'ll reply as soon as possible';
    }
  };

  const getBusinessHours = () => {
    return [
      'Monday - Friday: 9:00 AM - 6:00 PM',
      'Saturday: 10:00 AM - 4:00 PM',
      'Sunday: Closed',
      'Time Zone: CET (Central European Time)'
    ];
  };

  return (
    <>
      {/* Main WhatsApp Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", damping: 15 }}
      >
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              onClick={() => setIsOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 group relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              {/* Pulse animation */}
              <motion.div
                className="absolute inset-0 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <MessageCircle className="w-6 h-6 relative z-10" />
              
              {/* Online status indicator */}
              {isOnline && (
                <motion.div
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full border-2 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
              
              {/* Notification badge */}
              <motion.div
                className="absolute -top-2 -left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 3, type: "spring" }}
              >
                1
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      {/* WhatsApp Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="bg-luxury-gradient rounded-2xl border border-gold/20 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-green-500 text-white p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-50" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-cinzel font-bold">laÉlite Support</h3>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-gray-300'}`} />
                          <span className="text-white/90">
                            {isOnline ? 'Online' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Welcome Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/30 rounded-lg p-4 border border-gold/20"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="text-gold font-garamond text-sm mb-2">
                        Welcome to laÉlite Luxury Support! 👑
                      </p>
                      <p className="text-silver text-xs leading-relaxed">
                        Our luxury specialists are here to assist you with product authenticity, 
                        exclusive collections, personalized recommendations, and VIP services.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Status */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Clock className="w-4 h-4 text-gold" />
                  <span className="text-silver font-garamond">
                    {getStatusText()}
                  </span>
                </motion.div>

                {/* Business Hours */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-black/30 rounded-lg p-4 border border-gold/20"
                >
                  <h4 className="text-gold font-garamond text-sm mb-2 flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Business Hours</span>
                  </h4>
                  <div className="space-y-1">
                    {getBusinessHours().map((hour, index) => (
                      <p key={index} className="text-silver text-xs">
                        {hour}
                      </p>
                    ))}
                  </div>
                </motion.div>

                {/* Support Topics */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <h4 className="text-gold font-garamond text-sm">How can we assist you?</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      'Product Info',
                      'Authentication',
                      'Shipping',
                      'Payments',
                      'Custom Orders',
                      'VIP Services'
                    ].map((topic, index) => (
                      <motion.div
                        key={topic}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="bg-gold/10 text-gold px-3 py-2 rounded-lg text-center border border-gold/20"
                      >
                        {topic}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Contact Button */}
                <motion.button
                  onClick={openWhatsApp}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg font-garamond font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Start WhatsApp Chat</span>
                </motion.button>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center text-xs text-silver space-y-1"
                >
                  <p>📞 +41 44 123 4567</p>
                  <p>📧 support@laelite.com</p>
                  <p className="text-gold">🏆 Premium Support for Luxury Clients</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppSupport;
