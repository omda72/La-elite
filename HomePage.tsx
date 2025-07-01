import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Star, ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';
import { useShopping } from '../contexts/ShoppingContext';

const HomePage = () => {
  const { state, dispatch } = useShopping();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    {
      src: '/images/hero-perfume.jpg',
      title: 'Regal Essence Collection',
      subtitle: 'Medieval fragrances crafted for royalty',
      description: 'Discover the secrets of ancient perfumery with our exclusive collection of medieval-inspired fragrances.'
    },
    {
      src: '/images/perfume1.jpg',
      title: 'Antique Liquid Pens',
      subtitle: 'Writing instruments of the nobles',
      description: 'Exquisite writing instruments once owned by aristocratic families, now available to discerning collectors.'
    },
    {
      src: '/images/perfume2.jpg',
      title: 'Silver Cartridge Containers',
      subtitle: 'Lustrous containers of heritage',
      description: 'Magnificent silver containers that have graced the tables of noble houses for centuries.'
    },
    {
      src: '/images/background1.webp',
      title: 'Noble Furniture Collection',
      subtitle: 'Furniture fit for a castle',
      description: 'Authentic furniture pieces from the estates of Rich Lords and Contessas, meticulously preserved.'
    }
  ];

  const featuredProducts = state.products.filter(product => product.featured).slice(0, 4);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black"
    >
      {/* Hero Section with Carousel */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url('${heroImages[currentSlide].src}')`
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center max-w-4xl px-6">
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="mb-6"
                >
                  <Crown className="h-16 w-16 text-gold mx-auto mb-6 drop-shadow-lg" />
                </motion.div>

                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="text-6xl md:text-8xl font-cinzel font-bold text-white mb-6 tracking-wide"
                >
                  {heroImages[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="text-2xl md:text-3xl font-garamond text-gold mb-4 tracking-wide"
                >
                  {heroImages[currentSlide].subtitle}
                </motion.p>

                <motion.p
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="text-lg md:text-xl text-silver mb-12 max-w-2xl mx-auto leading-relaxed font-garamond"
                >
                  {heroImages[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gold-gradient text-black px-12 py-4 rounded-full font-cinzel font-semibold 
                               text-lg shadow-2xl hover:shadow-gold/50 transition-all duration-300 
                               flex items-center space-x-3 group"
                  >
                    <span>Explore Collection</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-2 border-gold text-gold px-12 py-4 rounded-full font-cinzel 
                                 font-semibold text-lg hover:bg-gold hover:text-black transition-all 
                                 duration-300 backdrop-blur-sm"
                    >
                      Contact Royal Advisor
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-gold scale-125' : 'bg-silver/50 hover:bg-silver'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-luxury-gradient">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-cinzel font-bold text-gold mb-6">
              Why Choose Royal Heritage
            </h2>
            <p className="text-xl text-silver max-w-3xl mx-auto font-garamond leading-relaxed">
              Experience the pinnacle of luxury with our authenticated medieval treasures, 
              backed by centuries of royal heritage and uncompromising quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: 'Authenticity Guaranteed',
                description: 'Every piece comes with complete provenance documentation and authenticity certificates from royal historians.'
              },
              {
                icon: Crown,
                title: 'Royal Heritage',
                description: 'Our collection features items once owned by nobility, bringing you authentic pieces of medieval aristocracy.'
              },
              {
                icon: Sparkles,
                title: 'Exceptional Craftsmanship',
                description: 'Each item showcases the finest medieval craftsmanship, preserved through centuries of careful stewardship.'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="text-center p-8 rounded-lg bg-black/30 backdrop-blur-sm border border-gold/20 
                           hover:border-gold/50 transition-all duration-300 group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="inline-block p-4 rounded-full bg-gold/20 mb-6 group-hover:bg-gold/30"
                >
                  <feature.icon className="h-12 w-12 text-gold" />
                </motion.div>
                <h3 className="text-2xl font-cinzel font-semibold text-gold mb-4">{feature.title}</h3>
                <p className="text-silver font-garamond leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-cinzel font-bold text-gold mb-6">
              Featured Royal Collection
            </h2>
            <p className="text-xl text-silver max-w-3xl mx-auto font-garamond leading-relaxed">
              Discover our most prized possessions, carefully curated from the finest medieval collections.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-luxury-gradient rounded-lg overflow-hidden shadow-2xl border border-gold/20 
                           hover:border-gold/50 transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                  <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-cinzel font-semibold text-gold mb-2 group-hover:text-gold-light transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-silver text-sm mb-4 font-garamond leading-relaxed">
                    {product.description.substring(0, 100)}...
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-gold fill-current" />
                      <span className="text-sm text-silver">{product.rating} ({product.reviews})</span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gold">${product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-silver line-through">${product.originalPrice}</div>
                      )}
                    </div>
                  </div>

                  <motion.button
                    onClick={() => addToCart(product)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gold text-black py-3 rounded-lg font-cinzel font-semibold 
                               hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-gold/30"
                  >
                    Add to Collection
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold-gradient text-black px-12 py-4 rounded-full font-cinzel font-semibold 
                           text-lg shadow-2xl hover:shadow-gold/50 transition-all duration-300 
                           flex items-center space-x-3 mx-auto group"
              >
                <span>View Complete Collection</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-luxury-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/background2.jpeg')] bg-cover bg-center" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-cinzel font-bold text-gold mb-6">
              Begin Your Royal Journey
            </h2>
            <p className="text-xl text-silver mb-12 font-garamond leading-relaxed">
              Join the exclusive circle of collectors who appreciate the finest medieval treasures. 
              Contact our royal advisors for personalized service and private viewings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold-gradient text-black px-12 py-4 rounded-full font-cinzel font-semibold 
                             text-lg shadow-2xl hover:shadow-gold/50 transition-all duration-300"
                >
                  Schedule Private Viewing
                </motion.button>
              </Link>
              
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gold text-gold px-12 py-4 rounded-full font-cinzel 
                             font-semibold text-lg hover:bg-gold hover:text-black transition-all 
                             duration-300 backdrop-blur-sm"
                >
                  Browse Collections
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;