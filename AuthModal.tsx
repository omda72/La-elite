import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Crown, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const AuthModal = () => {
  const { state, dispatch } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm<LoginForm>();
  const registerForm = useForm<RegisterForm>();

  const closeModal = () => {
    dispatch({ type: 'SHOW_AUTH_MODAL', payload: false });
    setMode('login');
    loginForm.reset();
    registerForm.reset();
  };

  const handleLogin = async (data: LoginForm) => {
    setIsLoading(true);
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      const mockUser = {
        id: '1',
        email: data.email,
        name: 'John Doe',
        role: 'customer' as const
      };

      dispatch({ type: 'LOGIN_SUCCESS', payload: mockUser });
      toast.success('Welcome back to laÉlite!');
      closeModal();
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const mockUser = {
        id: '2',
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        role: 'customer' as const
      };

      dispatch({ type: 'REGISTER_SUCCESS', payload: mockUser });
      toast.success('Welcome to laÉlite! Your account has been created.');
      closeModal();
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR' });
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!state.showAuthModal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={closeModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-luxury-gradient rounded-2xl border border-gold/20 p-8 w-full max-w-md relative overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-full translate-y-12 -translate-x-12" />

          {/* Close button */}
          <motion.button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 text-silver hover:text-gold transition-colors z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>

          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", damping: 20 }}
              className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Crown className="w-8 h-8 text-gold" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-cinzel font-bold text-gold mb-2"
            >
              {mode === 'login' ? 'Welcome Back' : 'Join laÉlite'}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-silver text-sm"
            >
              {mode === 'login' 
                ? 'Sign in to your luxury account' 
                : 'Create your exclusive luxury account'
              }
            </motion.p>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-black/50 rounded-lg p-1 mb-6">
            <motion.button
              onClick={() => setMode('login')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-garamond transition-all ${
                mode === 'login'
                  ? 'bg-gold text-black'
                  : 'text-silver hover:text-gold'
              }`}
              whileHover={{ scale: mode === 'login' ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In
            </motion.button>
            <motion.button
              onClick={() => setMode('register')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-garamond transition-all ${
                mode === 'register'
                  ? 'bg-gold text-black'
                  : 'text-silver hover:text-gold'
              }`}
              whileHover={{ scale: mode === 'register' ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Register
            </motion.button>
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.form
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                onSubmit={loginForm.handleSubmit(handleLogin)}
                className="space-y-4"
              >
                <div>
                  <label className="block text-silver text-sm mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      {...loginForm.register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-3 pl-12 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="your@email.com"
                    />
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gold" />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-silver text-sm mb-2">Password</label>
                  <div className="relative">
                    <input
                      {...loginForm.register('password', { required: 'Password is required' })}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 pl-12 pr-12 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gold" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-silver hover:text-gold"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-red-400 text-sm mt-1">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gold text-black rounded-lg hover:bg-gold/90 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={registerForm.handleSubmit(handleRegister)}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-silver text-sm mb-2">First Name</label>
                    <div className="relative">
                      <input
                        {...registerForm.register('firstName', { required: 'First name is required' })}
                        type="text"
                        className="w-full px-4 py-3 pl-12 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                        placeholder="John"
                      />
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-gold" />
                    </div>
                    {registerForm.formState.errors.firstName && (
                      <p className="text-red-400 text-xs mt-1">{registerForm.formState.errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-silver text-sm mb-2">Last Name</label>
                    <input
                      {...registerForm.register('lastName', { required: 'Last name is required' })}
                      type="text"
                      className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="Doe"
                    />
                    {registerForm.formState.errors.lastName && (
                      <p className="text-red-400 text-xs mt-1">{registerForm.formState.errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-silver text-sm mb-2">Email Address</label>
                  <div className="relative">
                    <input
                      {...registerForm.register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-3 pl-12 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="your@email.com"
                    />
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gold" />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-silver text-sm mb-2">Phone Number</label>
                  <div className="relative">
                    <input
                      {...registerForm.register('phone', { required: 'Phone number is required' })}
                      type="tel"
                      className="w-full px-4 py-3 pl-12 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="+1 (555) 123-4567"
                    />
                    <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gold" />
                  </div>
                  {registerForm.formState.errors.phone && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-silver text-sm mb-2">Password</label>
                  <div className="relative">
                    <input
                      {...registerForm.register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 pl-12 pr-12 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gold" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-silver hover:text-gold"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-silver text-sm mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      {...registerForm.register('confirmPassword', { required: 'Please confirm your password' })}
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="w-full px-4 py-3 pl-12 pr-12 bg-black/50 border border-gold/30 rounded-lg text-white placeholder-silver focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
                      placeholder="••••••••"
                    />
                    <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gold" />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-3.5 text-silver hover:text-gold"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gold text-black rounded-lg hover:bg-gold/90 transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6 pt-6 border-t border-gold/20"
          >
            <p className="text-silver text-xs">
              By continuing, you agree to laÉlite's Terms of Service and Privacy Policy
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AuthModal;
