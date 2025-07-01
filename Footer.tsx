import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, MessageCircle, Shield, Truck, CreditCard, Phone, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-luxury-gradient relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-gold rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-silver rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-gold rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Crown className="h-10 w-10 text-gold drop-shadow-lg" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-cinzel font-bold text-gold">laÉlite</span>
                <span className="text-xs text-silver font-garamond tracking-widest">EST. MEDIEVAL TIMES</span>
              </div>
            </div>
            <p className="text-silver text-sm leading-relaxed font-garamond">
              Curating the world's finest medieval perfumes, antique artifacts, and luxury items 
              for discerning collectors and connoisseurs of authentic royal heritage.
            </p>
            <div className="flex space-x-4">
              <motion.div 
                className="flex items-center space-x-2 group"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="h-5 w-5 text-gold group-hover:animate-pulse" />
                <span className="text-sm text-silver group-hover:text-gold transition-colors">
                  Authenticity Guaranteed
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-cinzel font-semibold text-gold relative">
              Luxury Collections
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gold-gradient"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'All Collections', href: '/products' },
                { name: 'Medieval Perfumes', href: '/products/perfumes' },
                { name: 'Antique Liquid Pens', href: '/products/liquid-pens' },
                { name: 'Silver Cartridges', href: '/products/silver-cartridges' },
                { name: 'Noble Furniture', href: '/products/noble-furniture' },
                { name: 'Featured Items', href: '/products?featured=true' }
              ].map((item, index) => (
                <motion.li 
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={item.href} 
                    className="text-silver hover:text-gold transition-colors duration-300 text-sm 
                               font-garamond relative group"
                  >
                    {item.name}
                    <motion.div
                      className="absolute inset-0 bg-gold/10 rounded -z-10"
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Service */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-cinzel font-semibold text-gold relative">
              Royal Service
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gold-gradient"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ delay: 0.7, duration: 0.8 }}
              />
            </h3>
            <ul className="space-y-4">
              <motion.li 
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="h-5 w-5 text-gold group-hover:animate-bounce" />
                <span className="text-sm text-silver group-hover:text-gold transition-colors">
                  royal@perfumery.com
                </span>
              </motion.li>
              <motion.li 
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <MessageCircle className="h-5 w-5 text-gold group-hover:animate-bounce" />
                <span className="text-sm text-silver group-hover:text-gold transition-colors">
                  WhatsApp: +1-555-ROYAL
                </span>
              </motion.li>
              <motion.li 
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="h-5 w-5 text-gold group-hover:animate-bounce" />
                <span className="text-sm text-silver group-hover:text-gold transition-colors">
                  24/7 Concierge: +1-555-LUXURY
                </span>
              </motion.li>
              <motion.li 
                className="flex items-center space-x-3 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="h-5 w-5 text-gold group-hover:animate-bounce" />
                <span className="text-sm text-silver group-hover:text-gold transition-colors">
                  Royal District, Heritage Lane
                </span>
              </motion.li>
            </ul>
          </motion.div>

          {/* Services & Payment */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-lg font-cinzel font-semibold text-gold relative">
              Our Privileges
              <motion.div
                className="absolute -bottom-1 left-0 h-0.5 bg-gold-gradient"
                initial={{ width: 0 }}
                whileInView={{ width: "60%" }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
            </h3>
            <div className="space-y-4">
              {[
                { icon: Truck, text: 'Royal Courier Delivery' },
                { icon: CreditCard, text: 'Secure Noble Payments' },
                { icon: Shield, text: 'Lifetime Authenticity' },
                { icon: Calendar, text: '30-Day Royal Return' }
              ].map((service, index) => (
                <motion.div 
                  key={service.text}
                  className="flex items-center space-x-3 group"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <service.icon className="h-5 w-5 text-gold group-hover:animate-pulse" />
                  <span className="text-sm text-silver group-hover:text-gold transition-colors">
                    {service.text}
                  </span>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-6 border-t border-gold/20">
              <h4 className="text-sm font-cinzel font-semibold text-gold mb-3">Accepted Payments</h4>
              <div className="text-xs text-silver space-y-2 font-garamond">
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ x: 3 }}
                >
                  <span className="text-gold">⚜</span>
                  <span>PayPal & Credit Cards</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ x: 3 }}
                >
                  <span className="text-gold">⚜</span>
                  <span>Physical POS Systems</span>
                </motion.div>
                <motion.div 
                  className="flex items-center space-x-2"
                  whileHover={{ x: 3 }}
                >
                  <span className="text-gold">⚜</span>
                  <span>Cryptocurrency (Premium)</span>
                </motion.div>
                <div className="flex items-center space-x-2 text-red-400">
                  <span>✗</span>
                  <span>Personal Checks Declined</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gold/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-silver font-garamond">
              © 2025 Royal Perfumery Collection. All rights reserved. 
              <span className="text-gold ml-2">Crafted with medieval excellence.</span>
            </div>
            <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Royal Service', 'Security Charter'].map((item) => (
                <motion.span 
                  key={item}
                  className="text-xs text-silver hover:text-gold transition-colors cursor-pointer font-garamond"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Decorative bottom border */}
          <motion.div
            className="mt-8 h-px bg-gold-gradient"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;