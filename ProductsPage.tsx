import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Filter, Grid3X3, List, Crown, ArrowRight } from 'lucide-react';
import { useShopping } from '../contexts/ShoppingContext';
import toast from 'react-hot-toast';

const ProductsPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { state, dispatch } = useShopping();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [showFilters, setShowFilters] = useState(false);

  const searchQuery = searchParams.get('search') || '';
  const featuredOnly = searchParams.get('featured') === 'true';

  // Filter products based on category, search, and filters
  const filteredProducts = state.products.filter(product => {
    // Category filter
    if (category && product.category !== category) return false;
    
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // Featured filter
    if (featuredOnly && !product.featured) return false;
    
    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default: // featured
        return b.featured ? 1 : -1;
    }
  });

  const addToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    toast.success(`${product.name} added to cart!`, {
      icon: '👑',
      style: {
        background: '#000',
        color: '#d4af37',
        border: '1px solid #d4af37'
      }
    });
  };

  const categoryName = state.categories.find(cat => cat.id === category)?.name || 'All Collections';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black py-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-gold mr-3" />
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold">
              {categoryName}
            </h1>
          </div>
          {searchQuery && (
            <p className="text-silver font-garamond text-lg">
              Search results for "<span className="text-gold">{searchQuery}</span>"
            </p>
          )}
          <p className="text-silver font-garamond mt-4 max-w-2xl mx-auto leading-relaxed">
            Discover our exquisite collection of authentic medieval treasures, 
            each piece carefully selected for its historical significance and unparalleled craftsmanship.
          </p>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 bg-luxury-gradient rounded-lg p-6 border border-gold/20"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-gold hover:text-gold-light transition-colors"
              >
                <Filter className="h-5 w-5" />
                <span className="font-garamond">Filters</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-silver font-garamond">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-black/50 text-gold border border-gold/30 rounded px-3 py-1 font-garamond 
                             focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-silver font-garamond">
                {sortedProducts.length} items found
              </span>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gold text-black' : 'text-gold hover:bg-gold/20'} transition-all`}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-gold text-black' : 'text-gold hover:bg-gold/20'} transition-all`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-6 pt-6 border-t border-gold/20"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-gold font-garamond mb-2">Price Range</label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        className="w-full"
                      />
                      <div className="text-silver text-sm font-garamond">
                        $0 - ${priceRange[1]}
                      </div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block text-gold font-garamond mb-2">Categories</label>
                    <div className="space-y-2">
                      {state.categories.map(cat => (
                        <label key={cat.id} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="category"
                            checked={category === cat.id}
                            onChange={() => window.location.href = `/products/${cat.id}`}
                            className="text-gold"
                          />
                          <span className="text-silver font-garamond text-sm">{cat.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Featured Items */}
                  <div>
                    <label className="block text-gold font-garamond mb-2">Special Collections</label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={featuredOnly}
                        onChange={() => {
                          const newParams = new URLSearchParams(searchParams);
                          if (featuredOnly) {
                            newParams.delete('featured');
                          } else {
                            newParams.set('featured', 'true');
                          }
                          window.location.search = newParams.toString();
                        }}
                        className="text-gold"
                      />
                      <span className="text-silver font-garamond text-sm">Featured Items Only</span>
                    </label>
                  </div>

                  {/* In Stock */}
                  <div>
                    <label className="block text-gold font-garamond mb-2">Availability</label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="text-gold" />
                      <span className="text-silver font-garamond text-sm">In Stock Only</span>
                    </label>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`bg-luxury-gradient rounded-lg overflow-hidden shadow-2xl border border-gold/20 
                         hover:border-gold/50 transition-all duration-300 group ${
                           viewMode === 'list' ? 'flex space-x-6' : ''
                         }`}
            >
              <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : ''}`}>
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                    viewMode === 'list' ? 'w-full h-full' : 'w-full h-64'
                  }`}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300" />
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-gold text-black px-3 py-1 rounded-full text-sm font-bold">
                    Featured
                  </div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Sale
                  </div>
                )}
              </div>

              <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                <div>
                  <h3 className="text-xl font-cinzel font-semibold text-gold mb-2 group-hover:text-gold-light transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-silver text-sm mb-4 font-garamond leading-relaxed">
                    {viewMode === 'list' ? product.description : `${product.description.substring(0, 100)}...`}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-gold fill-current' : 'text-gray-600'}`} 
                        />
                      ))}
                      <span className="text-sm text-silver ml-2">({product.reviews})</span>
                    </div>
                  </div>

                  {viewMode === 'list' && (
                    <div className="mb-4">
                      <h4 className="text-sm font-cinzel text-gold mb-2">Features:</h4>
                      <ul className="text-sm text-silver space-y-1 font-garamond">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <span className="text-gold">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gold">${product.price}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-silver line-through">${product.originalPrice}</div>
                      )}
                    </div>
                    
                    {!product.inStock && (
                      <span className="text-red-400 font-garamond text-sm">Out of Stock</span>
                    )}
                  </div>

                  <div className={`${viewMode === 'list' ? 'flex space-x-4' : 'space-y-2'}`}>
                    <motion.button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`bg-gold text-black py-3 px-6 rounded-lg font-cinzel font-semibold 
                                 hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-gold/30
                                 disabled:opacity-50 disabled:cursor-not-allowed
                                 ${viewMode === 'list' ? 'flex-1' : 'w-full'}`}
                    >
                      Add to Collection
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`border-2 border-gold text-gold py-3 px-6 rounded-lg font-cinzel 
                                 font-semibold hover:bg-gold hover:text-black transition-all duration-300
                                 flex items-center justify-center space-x-2
                                 ${viewMode === 'list' ? 'flex-1' : 'w-full'}`}
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Products Found */}
        {sortedProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <Crown className="h-16 w-16 text-silver/50 mx-auto mb-4" />
            <h3 className="text-2xl font-cinzel text-silver mb-4">No treasures found</h3>
            <p className="text-silver/70 font-garamond mb-8">
              Try adjusting your search criteria or explore our other collections
            </p>
            <motion.button
              onClick={() => window.location.href = '/products'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold text-black px-8 py-3 rounded-lg font-cinzel font-semibold 
                         hover:bg-gold-light transition-all duration-300"
            >
              View All Collections
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductsPage;