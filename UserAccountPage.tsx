import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Package, 
  CreditCard, 
  Download, 
  RotateCcw, 
  Truck, 
  Tag, 
  Shield, 
  Settings,
  History,
  Eye,
  EyeOff,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useShopping } from '../contexts/ShoppingContext';
import { format } from 'date-fns';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  trackingNumber?: string;
  certificateAvailable: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const UserAccountPage = () => {
  const { state: authState } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showPassword, setShowPassword] = useState(false);

  // Mock data - replace with real data from backend
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Luxury Lane, Beverly Hills, CA 90210'
  });

  const [orders] = useState<Order[]>([
    {
      id: 'ORD-2024-001',
      date: '2024-06-15',
      total: 2299.99,
      status: 'delivered',
      items: [
        {
          id: '1',
          name: 'Premium Cambodian Oud',
          price: 1299.99,
          quantity: 1,
          image: '/images/oud1.jpg'
        },
        {
          id: '2',
          name: 'Vintage Crystal Vase',
          price: 999.99,
          quantity: 1,
          image: '/images/vase1.jpg'
        }
      ],
      trackingNumber: 'TRK123456789',
      certificateAvailable: true
    },
    {
      id: 'ORD-2024-002',
      date: '2024-06-28',
      total: 1599.99,
      status: 'shipped',
      items: [
        {
          id: '3',
          name: 'Medieval Ceremonial Bowl',
          price: 1599.99,
          quantity: 1,
          image: '/images/bowl1.jpg'
        }
      ],
      trackingNumber: 'TRK987654321',
      certificateAvailable: false
    }
  ]);

  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryDate: '12/26',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      last4: '5555',
      brand: 'Mastercard',
      expiryDate: '08/25',
      isDefault: false
    },
    {
      id: '3',
      type: 'paypal',
      isDefault: false
    }
  ]);

  const [vouchers] = useState([
    { code: 'LUXURY20', discount: '20%', expiresAt: '2024-12-31', used: false },
    { code: 'WELCOME15', discount: '15%', expiresAt: '2024-08-31', used: true }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'orders', name: 'Order History', icon: Package },
    { id: 'payments', name: 'Payment Methods', icon: CreditCard },
    { id: 'vouchers', name: 'Vouchers', icon: Tag },
    { id: 'settings', name: 'Account Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-yellow-400';
      case 'shipped': return 'text-blue-400';
      case 'delivered': return 'text-green-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-silver';
    }
  };

  const downloadReceipt = (orderId: string) => {
    // Mock download functionality
    const element = document.createElement('a');
    element.href = `data:text/plain;charset=utf-8,Receipt for Order ${orderId}`;
    element.download = `receipt-${orderId}.pdf`;
    element.click();
  };

  const downloadCertificate = (orderId: string) => {
    // Mock certificate download
    const element = document.createElement('a');
    element.href = `data:text/plain;charset=utf-8,Certificate of Authenticity for Order ${orderId}`;
    element.download = `certificate-${orderId}.pdf`;
    element.click();
  };

  const reorderItems = (order: Order) => {
    // Add items to cart
    console.log('Reordering items from order:', order.id);
    // Implementation would use shopping context to add items to cart
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-luxury-gradient rounded-2xl border border-gold/20 p-8 mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-gold" />
            </div>
            <div>
              <h1 className="text-3xl font-cinzel font-bold text-gold mb-2">
                Welcome back, {userInfo.name}
              </h1>
              <p className="text-silver">
                {userInfo.email}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-luxury-gradient rounded-xl border border-gold/20 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'bg-gold/20 text-gold border border-gold/30'
                          : 'text-silver hover:text-gold hover:bg-gold/10'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-garamond">{tab.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-luxury-gradient rounded-xl border border-gold/20 p-8"
              >
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    <h2 className="text-2xl font-cinzel font-bold text-gold mb-6">Account Overview</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-black/50 rounded-lg p-6 border border-gold/20">
                        <h3 className="text-lg font-garamond text-gold mb-4 flex items-center">
                          <Package className="w-5 h-5 mr-2" />
                          Recent Orders
                        </h3>
                        <div className="space-y-3">
                          {orders.slice(0, 3).map((order) => (
                            <div key={order.id} className="flex justify-between items-center py-2">
                              <div>
                                <p className="text-white text-sm">{order.id}</p>
                                <p className="text-silver text-xs">{format(new Date(order.date), 'MMM dd, yyyy')}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-gold font-bold">${order.total}</p>
                                <p className={`text-xs capitalize ${getStatusColor(order.status)}`}>
                                  {order.status}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-black/50 rounded-lg p-6 border border-gold/20">
                        <h3 className="text-lg font-garamond text-gold mb-4 flex items-center">
                          <Tag className="w-5 h-5 mr-2" />
                          Available Vouchers
                        </h3>
                        <div className="space-y-3">
                          {vouchers.filter(v => !v.used).map((voucher) => (
                            <div key={voucher.code} className="bg-gold/10 rounded-lg p-3 border border-gold/30">
                              <p className="text-gold font-bold">{voucher.code}</p>
                              <p className="text-silver text-sm">{voucher.discount} off</p>
                              <p className="text-silver text-xs">Expires: {voucher.expiresAt}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-cinzel font-bold text-gold mb-6">Order History</h2>
                    
                    {orders.map((order) => (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/50 rounded-lg p-6 border border-gold/20"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-garamond text-gold">{order.id}</h3>
                            <p className="text-silver">{format(new Date(order.date), 'MMMM dd, yyyy')}</p>
                            <p className={`capitalize ${getStatusColor(order.status)}`}>
                              {order.status}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gold">${order.total}</p>
                            {order.trackingNumber && (
                              <p className="text-silver text-sm">Tracking: {order.trackingNumber}</p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gold/20 rounded-lg flex items-center justify-center">
                                <Package className="w-8 h-8 text-gold" />
                              </div>
                              <div className="flex-1">
                                <p className="text-white font-garamond">{item.name}</p>
                                <p className="text-silver text-sm">Quantity: {item.quantity}</p>
                              </div>
                              <p className="text-gold font-bold">${item.price}</p>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gold/20">
                          <motion.button
                            onClick={() => downloadReceipt(order.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Download className="w-4 h-4" />
                            <span>Download Receipt</span>
                          </motion.button>
                          
                          <motion.button
                            onClick={() => reorderItems(order)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <RotateCcw className="w-4 h-4" />
                            <span>Buy Again</span>
                          </motion.button>
                          
                          {order.trackingNumber && (
                            <motion.button
                              className="flex items-center space-x-2 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Truck className="w-4 h-4" />
                              <span>Track Shipment</span>
                            </motion.button>
                          )}
                          
                          {order.certificateAvailable && (
                            <motion.button
                              onClick={() => downloadCertificate(order.id)}
                              className="flex items-center space-x-2 px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg hover:bg-purple-600/30 transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Shield className="w-4 h-4" />
                              <span>Certificate of Authenticity</span>
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-cinzel font-bold text-gold mb-6">Payment Methods</h2>
                    
                    {paymentMethods.map((method) => (
                      <motion.div
                        key={method.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-black/50 rounded-lg p-6 border border-gold/20 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                            <CreditCard className="w-6 h-6 text-gold" />
                          </div>
                          <div>
                            {method.type === 'card' ? (
                              <>
                                <p className="text-white font-garamond capitalize">
                                  {method.brand} •••• {method.last4}
                                </p>
                                <p className="text-silver text-sm">Expires {method.expiryDate}</p>
                              </>
                            ) : (
                              <p className="text-white font-garamond capitalize">{method.type}</p>
                            )}
                            {method.isDefault && (
                              <span className="inline-block bg-gold/20 text-gold text-xs px-2 py-1 rounded mt-1">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            className="px-4 py-2 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Remove
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                    
                    <motion.button
                      className="w-full py-4 border-2 border-dashed border-gold/30 rounded-lg text-gold hover:border-gold/50 hover:bg-gold/5 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      + Add New Payment Method
                    </motion.button>
                  </div>
                )}

                {activeTab === 'vouchers' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-cinzel font-bold text-gold mb-6">Vouchers & Discounts</h2>
                    
                    <div className="bg-black/50 rounded-lg p-6 border border-gold/20">
                      <h3 className="text-lg font-garamond text-gold mb-4">Apply Voucher Code</h3>
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          placeholder="Enter voucher code"
                          className="flex-1 px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                        />
                        <motion.button
                          className="px-6 py-3 bg-gold text-black rounded-lg hover:bg-gold/90 transition-colors font-bold"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Apply
                        </motion.button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {vouchers.map((voucher) => (
                        <motion.div
                          key={voucher.code}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`rounded-lg p-6 border ${
                            voucher.used 
                              ? 'bg-gray-900/50 border-gray-600/20 opacity-60' 
                              : 'bg-gold/10 border-gold/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg font-garamond text-gold">{voucher.code}</h3>
                            {voucher.used && (
                              <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded">
                                Used
                              </span>
                            )}
                          </div>
                          <p className="text-2xl font-bold text-white mb-2">{voucher.discount} OFF</p>
                          <p className="text-silver text-sm">Expires: {voucher.expiresAt}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-cinzel font-bold text-gold mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div className="bg-black/50 rounded-lg p-6 border border-gold/20">
                        <h3 className="text-lg font-garamond text-gold mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-silver text-sm mb-2">Full Name</label>
                            <input
                              type="text"
                              value={userInfo.name}
                              onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                              className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-silver text-sm mb-2">Email Address</label>
                            <input
                              type="email"
                              value={userInfo.email}
                              onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                              className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-silver text-sm mb-2">Phone Number</label>
                            <input
                              type="tel"
                              value={userInfo.phone}
                              onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                              className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-silver text-sm mb-2">Address</label>
                            <input
                              type="text"
                              value={userInfo.address}
                              onChange={(e) => setUserInfo({...userInfo, address: e.target.value})}
                              className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-black/50 rounded-lg p-6 border border-gold/20">
                        <h3 className="text-lg font-garamond text-gold mb-4">Security</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-silver text-sm mb-2">Current Password</label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold pr-12"
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3.5 text-silver hover:text-gold"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-silver text-sm mb-2">New Password</label>
                            <input
                              type="password"
                              className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-silver text-sm mb-2">Confirm New Password</label>
                            <input
                              type="password"
                              className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                            />
                          </div>
                        </div>
                      </div>

                      <motion.button
                        className="w-full py-4 bg-gold text-black rounded-lg hover:bg-gold/90 transition-colors font-bold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Save Changes
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
