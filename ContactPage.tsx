import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Mail, MessageCircle, Phone, MapPin, Clock, Send, Star } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  inquiryType: string;
}

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! Our royal advisors will contact you within 24 hours.', {
        icon: '👑',
        duration: 5000,
        style: {
          background: '#000',
          color: '#d4af37',
          border: '1px solid #d4af37'
        }
      });
      reset();
      setIsSubmitting(false);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Royal Email',
      value: 'royal@perfumery.com',
      description: 'For inquiries about our collection',
      action: 'mailto:royal@perfumery.com'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '+1-555-ROYAL (76925)',
      description: 'Instant messaging with our advisors',
      action: 'https://wa.me/1555ROYAL'
    },
    {
      icon: Phone,
      title: '24/7 Concierge',
      value: '+1-555-LUXURY (589879)',
      description: 'Premium customer service',
      action: 'tel:+1555LUXURY'
    },
    {
      icon: MapPin,
      title: 'Royal Showroom',
      value: 'Heritage Lane, Royal District',
      description: 'Private viewings by appointment',
      action: '#'
    }
  ];

  const inquiryTypes = [
    'General Inquiry',
    'Product Information',
    'Custom Orders',
    'Authentication Request',
    'Private Viewing',
    'Bulk Purchase',
    'Partnership',
    'Media & Press'
  ];

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
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="h-12 w-12 text-gold mr-4" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold text-gold">
              Royal Contact
            </h1>
          </div>
          <p className="text-xl text-silver max-w-3xl mx-auto font-garamond leading-relaxed">
            Connect with our royal advisors for personalized service, private viewings, 
            and expert guidance on our exquisite medieval collection.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-cinzel font-bold text-gold mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.action}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="block bg-luxury-gradient rounded-lg p-6 border border-gold/20 
                               hover:border-gold/50 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start space-x-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                        className="p-3 rounded-full bg-gold/20 group-hover:bg-gold/30 transition-all"
                      >
                        <method.icon className="h-6 w-6 text-gold" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-lg font-cinzel font-semibold text-gold mb-1 group-hover:text-gold-light transition-colors">
                          {method.title}
                        </h3>
                        <p className="text-silver font-garamond text-lg mb-2">
                          {method.value}
                        </p>
                        <p className="text-silver/70 font-garamond text-sm">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-luxury-gradient rounded-lg p-6 border border-gold/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-6 w-6 text-gold" />
                <h3 className="text-xl font-cinzel font-semibold text-gold">
                  Business Hours
                </h3>
              </div>
              <div className="space-y-2 font-garamond">
                <div className="flex justify-between text-silver">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between text-silver">
                  <span>Saturday:</span>
                  <span>10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-silver">
                  <span>Sunday:</span>
                  <span>12:00 PM - 5:00 PM</span>
                </div>
                <div className="pt-2 border-t border-gold/20">
                  <div className="flex justify-between text-gold">
                    <span>Private Viewings:</span>
                    <span>By Appointment</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="bg-luxury-gradient rounded-lg p-6 border border-gold/20"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold fill-current" />
                ))}
              </div>
              <blockquote className="text-silver font-garamond italic leading-relaxed mb-4">
                "The service at Royal Perfumery is absolutely extraordinary. Their knowledge 
                of medieval artifacts is unparalleled, and the authentication process gives 
                complete confidence in every purchase."
              </blockquote>
              <div className="text-gold font-cinzel">
                — Lady Catherine Beaumont, Collector
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-luxury-gradient rounded-lg p-8 border border-gold/20">
              <h2 className="text-3xl font-cinzel font-bold text-gold mb-8">
                Send a Message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gold font-garamond mb-2">Name *</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                 placeholder-silver/50 focus:outline-none focus:ring-2 focus:ring-gold 
                                 focus:border-gold transition-all"
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-gold font-garamond mb-2">Email *</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                 placeholder-silver/50 focus:outline-none focus:ring-2 focus:ring-gold 
                                 focus:border-gold transition-all"
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gold font-garamond mb-2">Phone</label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="tel"
                      {...register('phone')}
                      className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                 placeholder-silver/50 focus:outline-none focus:ring-2 focus:ring-gold 
                                 focus:border-gold transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gold font-garamond mb-2">Inquiry Type *</label>
                    <motion.select
                      whileFocus={{ scale: 1.02 }}
                      {...register('inquiryType', { required: 'Please select inquiry type' })}
                      className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                                 focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
                    >
                      <option value="">Select inquiry type</option>
                      {inquiryTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </motion.select>
                    {errors.inquiryType && <p className="text-red-400 text-sm mt-1">{errors.inquiryType.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-gold font-garamond mb-2">Subject *</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                               placeholder-silver/50 focus:outline-none focus:ring-2 focus:ring-gold 
                               focus:border-gold transition-all"
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-gold font-garamond mb-2">Message *</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full px-4 py-3 bg-black/50 border border-gold/30 rounded-lg text-white 
                               placeholder-silver/50 focus:outline-none focus:ring-2 focus:ring-gold 
                               focus:border-gold transition-all resize-vertical"
                    placeholder="Please provide details about your inquiry, including any specific items you're interested in..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gold-gradient text-black py-4 rounded-lg font-cinzel font-semibold 
                             text-lg shadow-lg hover:shadow-gold/30 transition-all duration-300 
                             disabled:opacity-50 disabled:cursor-not-allowed flex items-center 
                             justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-black border-t-transparent rounded-full"
                      />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Royal Message</span>
                    </>
                  )}
                </motion.button>
              </form>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-6 border-t border-gold/20"
              >
                <div className="text-center space-y-3">
                  <p className="text-silver font-garamond text-sm">
                    <strong className="text-gold">Response Time:</strong> We typically respond within 2-4 hours during business hours
                  </p>
                  <p className="text-silver font-garamond text-sm">
                    <strong className="text-gold">Private Viewings:</strong> Available by appointment for serious collectors
                  </p>
                  <p className="text-silver font-garamond text-sm">
                    <strong className="text-gold">Expert Authentication:</strong> All inquiries reviewed by our certified historians
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16"
        >
          <div className="bg-luxury-gradient rounded-lg p-8 border border-gold/20">
            <h2 className="text-3xl font-cinzel font-bold text-gold mb-8 text-center">
              Visit Our Royal Showroom
            </h2>
            <div className="h-96 bg-black/30 rounded-lg border border-gold/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-cinzel text-gold mb-2">Royal Perfumery Showroom</h3>
                <p className="text-silver font-garamond">Heritage Lane, Royal District</p>
                <p className="text-silver/70 font-garamond text-sm mt-2">
                  Interactive map will be integrated here
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactPage;