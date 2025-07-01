import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  CreditCard, 
  Shield, 
  Truck, 
  ArrowLeft, 
  Check, 
  Banknote,
  Download,
  Tag,
  Plus,
  X,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useShopping, getCartTotal } from '../contexts/ShoppingContext';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  shippingMethod: string;
  paymentMethod: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
  voucherCode?: string;
  savePaymentMethod?: boolean;
}

interface SavedPaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last4?: string;
  brand?: string;
  expiryDate?: string;
  isDefault: boolean;
}

const CheckoutPage = () => {
  const { state, dispatch } = useShopping();
  const { state: authState } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [{ isPending }] = usePayPalScriptReducer();
  const [appliedVoucher, setAppliedVoucher] = useState<{code: string, discount: number} | null>(null);
  const [showSavedCards, setShowSavedCards] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<CheckoutForm>();
  
  // Mock saved payment methods for authenticated users
  const savedPaymentMethods: SavedPaymentMethod[] = authState.isAuthenticated ? [
    { id: '1', type: 'card', last4: '4242', brand: 'Visa', expiryDate: '12/26', isDefault: true },
    { id: '2', type: 'card', last4: '5555', brand: 'Mastercard', expiryDate: '08/25', isDefault: false },
    { id: '3', type: 'paypal', isDefault: false }
  ] : [];
  
  const cartTotal = getCartTotal(state.cartItems);
  const voucherDiscount = appliedVoucher ? (cartTotal * appliedVoucher.discount / 100) : 0;
  const discountedTotal = cartTotal - voucherDiscount;
  const shipping = discountedTotal > 500 ? 0 : 50;
  const tax = discountedTotal * 0.08;
  const finalTotal = discountedTotal + shipping + tax;

  const paymentMethod = watch('paymentMethod');
  const shippingMethod = watch('shippingMethod');
  const voucherCode = watch('voucherCode');

  // Voucher application
  const applyVoucher = () => {
    if (!voucherCode) {
      toast.error('Please enter a voucher code');
      return;
    }

    // Mock voucher validation
    const mockVouchers = {
      'LUXURY20': { discount: 20, description: '20% off all items' },
      'WELCOME15': { discount: 15, description: '15% welcome discount' },
      'VIP10': { discount: 10, description: '10% VIP discount' }
    };

    const voucher = mockVouchers[voucherCode.toUpperCase() as keyof typeof mockVouchers];
    if (voucher) {
      setAppliedVoucher({ code: voucherCode.toUpperCase(), discount: voucher.discount });
      toast.success(`Voucher applied! ${voucher.description}`);
    } else {
      toast.error('Invalid voucher code');
    }
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    setValue('voucherCode', '');
    toast.success('Voucher removed');
  };

  // Wire transfer instructions download
  const downloadWireInstructions = () => {
    const instructions = `
WIRE TRANSFER INSTRUCTIONS - laÉlite

Beneficiary: laÉlite Luxury Goods Ltd.
Bank: Swiss International Bank
IBAN: CH93 0076 2011 6238 5295 7
SWIFT/BIC: UBSWCHZH80A
Reference: Order ${Math.random().toString(36).substr(2, 9).toUpperCase()}

Amount: $${finalTotal.toFixed(2)} USD

Important Notes:
- Include the reference number in your transfer
- Allow 2-3 business days for processing
- Contact support@laelite.com for assistance
- Keep your transfer receipt for records

Address:
laÉlite Luxury Goods Ltd.
Bahnhofstrasse 45
8001 Zürich, Switzerland

Phone: +41 44 123 4567
Email: support@laelite.com
    `;

    const element = document.createElement('a');
    element.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(instructions);
    element.download = `wire-transfer-instructions-${Date.now()}.txt`;
    element.click();
    toast.success('Wire transfer instructions downloaded');
  };

  // Generate payment link
  const generatePaymentLink = () => {
    const paymentLink = `https://secure.laelite.com/pay/${Math.random().toString(36).substr(2, 12)}`;
    navigator.clipboard.writeText(paymentLink);
    toast.success('Payment link copied to clipboard!');
    return paymentLink;
  };

  // Select saved payment method
  const selectSavedPaymentMethod = (method: SavedPaymentMethod) => {
    setSelectedPaymentMethod(method.id);
    if (method.type === 'card') {
      setValue('paymentMethod', 'card');
    } else {
      setValue('paymentMethod', 'paypal');
    }
    setShowSavedCards(false);
  };

  const steps = [
    { id: 1, name: 'Contact Information', completed: currentStep > 1 },
    { id: 2, name: 'Shipping Details', completed: currentStep > 2 },
    { id: 3, name: 'Payment Method', completed: currentStep > 3 },
    { id: 4, name: 'Review & Confirm', completed: orderComplete }
  ];

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      dispatch({ type: 'CLEAR_CART' });
      toast.success('Order placed successfully!', {
        icon: '👑',
        duration: 5000,
        style: {
          background: '#000',
          color: '#d4af37',
          border: '1px solid #d4af37'
        }
      });
      setIsProcessing(false);
    }, 2000);
  };

  const createPayPalOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: finalTotal.toFixed(2)
        }
      }]
    });
  };

  const onPayPalApprove = async (data: any, actions: any) => {
    setIsProcessing(true);
    try {
      const details = await actions.order.capture();
      setOrderComplete(true);
      dispatch({ type: 'CLEAR_CART' });
      toast.success('PayPal payment successful!', {
        icon: '💰',
        duration: 5000,
        style: {
          background: '#000',
          color: '#d4af37',
          border: '1px solid #d4af37'
        }
      });
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.cartItems.length === 0 && !orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black flex items-center justify-center"
      >
        <div className="text-center">
          <Crown className="h-16 w-16 text-gold mx-auto mb-6" />
          <h2 className="text-3xl font-cinzel text-gold mb-4">Your cart is empty</h2>
          <p className="text-silver font-garamond mb-8">Add some royal treasures to your collection</p>
          <Link to="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold text-black px-8 py-3 rounded-lg font-cinzel font-semibold 
                         hover:bg-gold-light transition-all duration-300"
            >
              Browse Collection
            </motion.button>
          </Link>
        </div>
      </motion.div>
    );
  }

  if (orderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-black flex items-center justify-center"
      >
        <div className="text-center max-w-2xl mx-auto px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="h-12 w-12 text-black" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-cinzel font-bold text-gold mb-6"
          >
            Order Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xl text-silver font-garamond mb-8 leading-relaxed"
          >
            Thank you for your royal purchase! Your medieval treasures will be carefully prepared 
            and shipped with the utmost care. You will receive a confirmation email shortly.
          </motion.p>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="space-y-4"
          >
            <div className="bg-luxury-gradient border border-gold/20 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-cinzel text-gold mb-4">What's Next?</h3>
              <div className="space-y-3 text-silver font-garamond">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Email confirmation sent to your inbox</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Order processing begins within 24 hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Royal courier delivery in 3-5 business days</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gold rounded-full"></div>
                  <span>Tracking information will be provided</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gold text-black px-8 py-3 rounded-lg font-cinzel font-semibold 
                             hover:bg-gold-light transition-all duration-300"
                >
                  Continue Shopping
                </motion.button>
              </Link>
              
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-gold text-gold px-8 py-3 rounded-lg font-cinzel 
                             font-semibold hover:bg-gold hover:text-black transition-all duration-300"
                >
                  Contact Support
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black py-8"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Crown className="h-8 w-8 text-gold mr-3" />
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold">
              Luxury Checkout
            </h1>
          </div>
          <p className="text-silver font-garamond text-lg">
            Complete your acquisition of these exquisite luxury goods
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 overflow-x-auto pb-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-3 ${
                    step.completed ? 'text-gold' : 
                    currentStep === step.id ? 'text-gold' : 'text-silver'
                  }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      step.completed ? 'bg-gold text-black border-gold' :
                      currentStep === step.id ? 'border-gold text-gold' : 'border-silver text-silver'
                    }`}>
                      {step.completed ? <Check className="h-5 w-5" /> : step.id}
                    </div>
                    <span className="font-garamond whitespace-nowrap">{step.name}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-px mx-4 ${
                      step.completed ? 'bg-gold' : 'bg-silver/30'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="bg-luxury-gradient rounded-lg p-8 border border-gold/20"
                  >
                    <h3 className="text-2xl font-cinzel text-gold mb-6">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gold font-garamond mb-2">Email Address *</label>
                        <input
                          type="email"
                          {...register('email', { required: 'Email is required' })}
                          className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                     focus:outline-none focus:ring-2 focus:ring-gold"
                          placeholder="your@email.com"
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gold font-garamond mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          {...register('phone', { required: 'Phone is required' })}
                          className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                     focus:outline-none focus:ring-2 focus:ring-gold"
                          placeholder="+1 (555) 123-4567"
                        />
                        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gold font-garamond mb-2">First Name *</label>
                        <input
                          type="text"
                          {...register('firstName', { required: 'First name is required' })}
                          className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                     focus:outline-none focus:ring-2 focus:ring-gold"
                          placeholder="John"
                        />
                        {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-gold font-garamond mb-2">Last Name *</label>
                        <input
                          type="text"
                          {...register('lastName', { required: 'Last name is required' })}
                          className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                     focus:outline-none focus:ring-2 focus:ring-gold"
                          placeholder="Doe"
                        />
                        {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName.message}</p>}
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 bg-gold text-black px-8 py-3 rounded-lg font-cinzel font-semibold 
                                 hover:bg-gold-light transition-all duration-300"
                    >
                      Continue to Shipping
                    </motion.button>
                  </motion.div>
                )}

                {/* Shipping Information */}
                {currentStep === 2 && (
                  <motion.div
                    key="shipping"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="bg-luxury-gradient rounded-lg p-8 border border-gold/20"
                  >
                    <h3 className="text-2xl font-cinzel text-gold mb-6">Shipping Details</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gold font-garamond mb-2">Address *</label>
                        <input
                          type="text"
                          {...register('address', { required: 'Address is required' })}
                          className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                     focus:outline-none focus:ring-2 focus:ring-gold"
                          placeholder="123 Royal Avenue"
                        />
                        {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address.message}</p>}
                      </div>
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-gold font-garamond mb-2">City *</label>
                          <input
                            type="text"
                            {...register('city', { required: 'City is required' })}
                            className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                       focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="New York"
                          />
                          {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city.message}</p>}
                        </div>
                        <div>
                          <label className="block text-gold font-garamond mb-2">State *</label>
                          <input
                            type="text"
                            {...register('state', { required: 'State is required' })}
                            className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                       focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="NY"
                          />
                          {errors.state && <p className="text-red-400 text-sm mt-1">{errors.state.message}</p>}
                        </div>
                        <div>
                          <label className="block text-gold font-garamond mb-2">ZIP Code *</label>
                          <input
                            type="text"
                            {...register('zipCode', { required: 'ZIP code is required' })}
                            className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                       focus:outline-none focus:ring-2 focus:ring-gold"
                            placeholder="10001"
                          />
                          {errors.zipCode && <p className="text-red-400 text-sm mt-1">{errors.zipCode.message}</p>}
                        </div>
                      </div>

                      {/* Shipping Method */}
                      <div>
                        <label className="block text-gold font-garamond mb-4">Shipping Method *</label>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-3 p-4 bg-black/30 rounded-lg border border-gold/20 cursor-pointer hover:border-gold/40">
                            <input
                              type="radio"
                              value="standard"
                              {...register('shippingMethod', { required: 'Please select shipping method' })}
                              className="text-gold"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-silver font-garamond">Standard Shipping (5-7 days)</span>
                                <span className="text-gold font-bold">$50</span>
                              </div>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3 p-4 bg-black/30 rounded-lg border border-gold/20 cursor-pointer hover:border-gold/40">
                            <input
                              type="radio"
                              value="express"
                              {...register('shippingMethod')}
                              className="text-gold"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-silver font-garamond">Royal Express (2-3 days)</span>
                                <span className="text-gold font-bold">$150</span>
                              </div>
                            </div>
                          </label>
                          <label className="flex items-center space-x-3 p-4 bg-black/30 rounded-lg border border-gold/20 cursor-pointer hover:border-gold/40">
                            <input
                              type="radio"
                              value="overnight"
                              {...register('shippingMethod')}
                              className="text-gold"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-silver font-garamond">Overnight Delivery</span>
                                <span className="text-gold font-bold">$300</span>
                              </div>
                            </div>
                          </label>
                        </div>
                        {errors.shippingMethod && <p className="text-red-400 text-sm mt-1">{errors.shippingMethod.message}</p>}
                      </div>
                    </div>
                    <div className="flex space-x-4 mt-6">
                      <motion.button
                        type="button"
                        onClick={() => setCurrentStep(1)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="border-2 border-gold text-gold px-6 py-3 rounded-lg font-cinzel 
                                   font-semibold hover:bg-gold hover:text-black transition-all duration-300 
                                   flex items-center space-x-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => setCurrentStep(3)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-gold text-black px-8 py-3 rounded-lg font-cinzel font-semibold 
                                   hover:bg-gold-light transition-all duration-300"
                      >
                        Continue to Payment
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Payment Method */}
                {currentStep === 3 && (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="bg-luxury-gradient rounded-lg p-8 border border-gold/20"
                  >
                    <h3 className="text-2xl font-cinzel text-gold mb-6">Payment Method</h3>
                    
                    {/* Saved Payment Methods */}
                    {authState.isAuthenticated && savedPaymentMethods.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-garamond text-gold mb-4">Saved Payment Methods</h4>
                        <div className="space-y-3">
                          {savedPaymentMethods.map((method) => (
                            <motion.div
                              key={method.id}
                              onClick={() => selectSavedPaymentMethod(method)}
                              className={`p-4 bg-black/30 rounded-lg border cursor-pointer transition-all ${
                                selectedPaymentMethod === method.id 
                                  ? 'border-gold bg-gold/10' 
                                  : 'border-gold/20 hover:border-gold/40'
                              }`}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <CreditCard className="w-6 h-6 text-gold" />
                                  <div>
                                    {method.type === 'card' ? (
                                      <>
                                        <p className="text-white font-garamond capitalize">
                                          {method.brand} •••• {method.last4}
                                        </p>
                                        <p className="text-silver text-sm">Expires {method.expiryDate}</p>
                                      </>
                                    ) : (
                                      <p className="text-white font-garamond">PayPal</p>
                                    )}
                                  </div>
                                </div>
                                {method.isDefault && (
                                  <span className="bg-gold/20 text-gold text-xs px-2 py-1 rounded">
                                    Default
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        <motion.button
                          type="button"
                          onClick={() => setShowSavedCards(!showSavedCards)}
                          className="mt-3 text-gold hover:text-gold-light transition-colors text-sm font-garamond flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add new payment method</span>
                        </motion.button>
                      </div>
                    )}
                    
                    {/* Payment Options */}
                    {(!authState.isAuthenticated || savedPaymentMethods.length === 0 || showSavedCards) && (
                      <div className="space-y-4 mb-6">
                        <label className="flex items-center space-x-3 p-4 bg-black/30 rounded-lg border border-gold/20 cursor-pointer hover:border-gold/40">
                          <input
                            type="radio"
                            value="paypal"
                            {...register('paymentMethod', { required: 'Please select payment method' })}
                            className="text-gold"
                          />
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">💰</div>
                            <span className="text-silver font-garamond">PayPal</span>
                          </div>
                        </label>
                        
                        <label className="flex items-center space-x-3 p-4 bg-black/30 rounded-lg border border-gold/20 cursor-pointer hover:border-gold/40">
                          <input
                            type="radio"
                            value="card"
                            {...register('paymentMethod')}
                            className="text-gold"
                          />
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-6 w-6 text-gold" />
                            <span className="text-silver font-garamond">Credit/Debit Card</span>
                            <div className="flex space-x-1 ml-auto">
                              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">VISA</span>
                              <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">MC</span>
                              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">AMEX</span>
                            </div>
                          </div>
                        </label>

                        <label className="flex items-center space-x-3 p-4 bg-black/30 rounded-lg border border-gold/20 cursor-pointer hover:border-gold/40">
                          <input
                            type="radio"
                            value="wire"
                            {...register('paymentMethod')}
                            className="text-gold"
                          />
                          <div className="flex items-center space-x-3">
                            <Banknote className="h-6 w-6 text-gold" />
                            <span className="text-silver font-garamond">Bank Wire Transfer</span>
                            <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded ml-auto">
                              Secure
                            </span>
                          </div>
                        </label>
                      </div>
                    )}

                    {/* PayPal */}
                    {paymentMethod === 'paypal' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6"
                      >
                        <div className="bg-black/30 rounded-lg p-6 border border-gold/20">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-cinzel text-gold">PayPal Payment</h4>
                            <Lock className="w-5 h-5 text-green-400" />
                          </div>
                          <p className="text-silver text-sm mb-4">
                            You will be redirected to PayPal to complete your payment securely.
                          </p>
                          {!isPending && (
                            <PayPalButtons
                              createOrder={createPayPalOrder}
                              onApprove={onPayPalApprove}
                              style={{ layout: "vertical" }}
                            />
                          )}
                        </div>
                      </motion.div>
                    )}

                    {/* Credit Card */}
                    {paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6"
                      >
                        <div className="bg-black/30 rounded-lg p-6 border border-gold/20">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-cinzel text-gold">Card Information</h4>
                            <div className="flex items-center space-x-2">
                              <Shield className="w-5 h-5 text-green-400" />
                              <span className="text-green-400 text-sm">SSL Secured</span>
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                              <label className="block text-gold font-garamond mb-2">Card Number *</label>
                              <input
                                type="text"
                                {...register('cardNumber', { required: paymentMethod === 'card' ? 'Card number is required' : false })}
                                className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                           focus:outline-none focus:ring-2 focus:ring-gold"
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                              />
                            </div>
                            <div>
                              <label className="block text-gold font-garamond mb-2">Expiry Date *</label>
                              <input
                                type="text"
                                {...register('expiryDate', { required: paymentMethod === 'card' ? 'Expiry date is required' : false })}
                                className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                           focus:outline-none focus:ring-2 focus:ring-gold"
                                placeholder="MM/YY"
                                maxLength={5}
                              />
                            </div>
                            <div>
                              <label className="block text-gold font-garamond mb-2">CVV *</label>
                              <input
                                type="text"
                                {...register('cvv', { required: paymentMethod === 'card' ? 'CVV is required' : false })}
                                className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                           focus:outline-none focus:ring-2 focus:ring-gold"
                                placeholder="123"
                                maxLength={4}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-gold font-garamond mb-2">Name on Card *</label>
                              <input
                                type="text"
                                {...register('cardName', { required: paymentMethod === 'card' ? 'Name on card is required' : false })}
                                className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                           focus:outline-none focus:ring-2 focus:ring-gold"
                                placeholder="John Doe"
                              />
                            </div>
                            {authState.isAuthenticated && (
                              <div className="md:col-span-2">
                                <label className="flex items-center space-x-3">
                                  <input
                                    type="checkbox"
                                    {...register('savePaymentMethod')}
                                    className="rounded border-gold/30 text-gold focus:ring-gold"
                                  />
                                  <span className="text-silver text-sm font-garamond">
                                    Save this payment method for future purchases
                                  </span>
                                </label>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Wire Transfer */}
                    {paymentMethod === 'wire' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-6"
                      >
                        <div className="bg-black/30 rounded-lg p-6 border border-gold/20">
                          <h4 className="text-lg font-cinzel text-gold mb-4">Bank Wire Transfer</h4>
                          <div className="space-y-4">
                            <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                              <p className="text-gold font-garamond mb-2">
                                ⚠️ Important Instructions:
                              </p>
                              <ul className="text-silver text-sm space-y-1 list-disc list-inside">
                                <li>Wire transfer details will be sent to your email</li>
                                <li>Payment must be received within 7 business days</li>
                                <li>Include the order reference in your transfer</li>
                                <li>Items will be shipped upon payment confirmation</li>
                              </ul>
                            </div>
                            <motion.button
                              type="button"
                              onClick={downloadWireInstructions}
                              className="w-full flex items-center justify-center space-x-2 bg-gold/20 text-gold py-3 rounded-lg hover:bg-gold/30 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Download className="w-5 h-5" />
                              <span>Download Wire Transfer Instructions</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="flex space-x-4">
                      <motion.button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="border-2 border-gold text-gold px-6 py-3 rounded-lg font-cinzel 
                                   font-semibold hover:bg-gold hover:text-black transition-all duration-300 
                                   flex items-center space-x-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back</span>
                      </motion.button>
                      
                      {(paymentMethod === 'card' || paymentMethod === 'wire') && (
                        <motion.button
                          type="submit"
                          disabled={isProcessing}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="bg-gold text-black px-8 py-3 rounded-lg font-cinzel font-semibold 
                                     hover:bg-gold-light transition-all duration-300 disabled:opacity-50 
                                     disabled:cursor-not-allowed flex items-center space-x-2"
                        >
                          {isProcessing ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                              />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Shield className="h-5 w-5" />
                              <span>{paymentMethod === 'wire' ? 'Generate Payment Link' : 'Complete Order'}</span>
                            </>
                          )}
                        </motion.button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-luxury-gradient rounded-lg p-8 border border-gold/20 sticky top-8"
            >
              <h3 className="text-2xl font-cinzel text-gold mb-6">Order Summary</h3>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {state.cartItems.map((item) => (
                  <div key={item.product.id} className="flex space-x-4 py-4 border-b border-gold/20">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-cinzel text-gold text-sm font-semibold truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-silver text-xs font-garamond">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-gold font-bold text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Voucher Code Application */}
              <div className="mb-6">
                <h4 className="text-lg font-garamond text-gold mb-3">Voucher Code</h4>
                {appliedVoucher ? (
                  <div className="bg-green-900/30 border border-green-400/30 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-garamond text-sm">
                          {appliedVoucher.code} applied
                        </span>
                      </div>
                      <motion.button
                        onClick={removeVoucher}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                    <p className="text-green-400 text-xs mt-1">
                      {appliedVoucher.discount}% discount applied
                    </p>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      {...register('voucherCode')}
                      placeholder="Enter voucher code"
                      className="flex-1 px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold text-sm"
                    />
                    <motion.button
                      type="button"
                      onClick={applyVoucher}
                      className="px-4 py-3 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 transition-colors font-garamond text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Apply
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-sm font-garamond">
                <div className="flex justify-between text-silver">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {appliedVoucher && (
                  <div className="flex justify-between text-green-400">
                    <span>Voucher Discount ({appliedVoucher.discount}%):</span>
                    <span>-${voucherDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-silver">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-silver">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gold/20 pt-3">
                  <div className="flex justify-between text-gold text-lg font-bold">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                  {appliedVoucher && (
                    <div className="text-green-400 text-sm mt-1">
                      You saved ${voucherDiscount.toFixed(2)}!
                    </div>
                  )}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 pt-6 border-t border-gold/20">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-silver">
                    <Shield className="h-5 w-5 text-gold" />
                    <span className="text-sm font-garamond">Secure SSL Encryption</span>
                  </div>
                  <div className="flex items-center space-x-3 text-silver">
                    <Truck className="h-5 w-5 text-gold" />
                    <span className="text-sm font-garamond">Insured Royal Delivery</span>
                  </div>
                  <div className="flex items-center space-x-3 text-silver">
                    <Crown className="h-5 w-5 text-gold" />
                    <span className="text-sm font-garamond">Authenticity Guaranteed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;