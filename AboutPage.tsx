import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Shield, Star, Clock, Users, Award, Sparkles, Heart } from 'lucide-react';

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const milestones = [
    { year: '1147', event: 'Founded in medieval courts' },
    { year: '1203', event: 'Royal patronage established' },
    { year: '1456', event: 'Secret recipes preserved' },
    { year: '1789', event: 'Survived noble upheavals' },
    { year: '1892', event: 'International expansion' },
    { year: '2025', event: 'Digital heritage preservation' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Authenticity',
      description: 'Every piece in our collection comes with complete provenance documentation and historical verification.'
    },
    {
      icon: Crown,
      title: 'Royal Heritage',
      description: 'We preserve the legacy of medieval nobility through carefully curated artifacts and fragrances.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Our commitment to quality ensures that each item meets the highest standards of craftsmanship.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for medieval history drives us to discover and preserve the finest treasures of the past.'
    }
  ];

  const team = [
    {
      name: 'Lord Edmund Fitzgerald',
      role: 'Master Curator & Historian',
      description: 'PhD in Medieval Studies from Oxford, 30+ years of experience in royal artifact authentication.',
      specialization: 'Medieval Perfumery & Manuscripts'
    },
    {
      name: 'Lady Isabella Montrose',
      role: 'Chief Perfumer',
      description: 'Descended from a line of royal perfumers, expert in recreating historical fragrances.',
      specialization: 'Ancient Fragrance Reconstruction'
    },
    {
      name: 'Sir Alexander Blackwood',
      role: 'Antiquities Expert',
      description: 'Former curator at the British Museum, specialist in medieval noble artifacts.',
      specialization: 'Precious Metals & Jewelry'
    },
    {
      name: 'Dame Victoria Sterling',
      role: 'Authentication Director',
      description: 'Leading authority on medieval provenance and historical documentation.',
      specialization: 'Provenance & Documentation'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="min-h-screen bg-black py-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-20 text-center">
          <div className="flex items-center justify-center mb-6">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="h-16 w-16 text-gold mr-4" />
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-cinzel font-bold text-gold">
              Our Royal Heritage
            </h1>
          </div>
          <p className="text-2xl text-silver max-w-4xl mx-auto font-garamond leading-relaxed">
            For nearly nine centuries, Royal Perfumery has been the guardian of medieval luxury, 
            preserving the finest fragrances and artifacts from the golden age of nobility.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-cinzel font-bold text-gold mb-8">
                A Legacy Born in Royal Courts
              </h2>
              <div className="space-y-6 text-silver font-garamond text-lg leading-relaxed">
                <p>
                  In the year 1147, during the reign of Eleanor of Aquitaine, our founding masters 
                  established the first Royal Perfumery in the heart of medieval France. What began 
                  as a humble workshop serving the royal court has evolved into the world's most 
                  prestigious curator of medieval luxury.
                </p>
                <p>
                  Our perfumers discovered the secret arts of distillation and essence extraction, 
                  creating fragrances that would become legendary among European nobility. These 
                  same techniques, preserved through centuries of tradition, continue to influence 
                  our craft today.
                </p>
                <p>
                  Through wars, revolutions, and the passage of time, we have remained steadfast 
                  guardians of medieval heritage. Our collection represents not just luxury items, 
                  but windows into a world of unparalleled elegance and sophistication.
                </p>
              </div>
            </div>
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-lg overflow-hidden"
              >
                <img 
                  src="/images/background1.webp" 
                  alt="Medieval Royal Court"
                  className="w-full h-96 object-cover rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gold/20 rounded-lg" />
                <motion.div
                  className="absolute inset-0 bg-luxury-gradient opacity-30 rounded-lg"
                  animate={{ opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-gold text-black p-4 rounded-lg shadow-xl"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold">875+</div>
                  <div className="text-sm font-garamond">Years of Heritage</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-4xl font-cinzel font-bold text-gold mb-12 text-center">
            Historical Milestones
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gold/30"></div>
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-luxury-gradient rounded-lg p-6 border border-gold/20">
                      <div className="text-2xl font-bold text-gold font-cinzel mb-2">
                        {milestone.year}
                      </div>
                      <div className="text-silver font-garamond">
                        {milestone.event}
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gold 
                               rounded-full border-4 border-black z-10"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-4xl font-cinzel font-bold text-gold mb-12 text-center">
            Our Noble Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-luxury-gradient rounded-lg p-8 border border-gold/20 
                           hover:border-gold/50 transition-all duration-300 text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                  className="inline-block p-4 rounded-full bg-gold/20 mb-6 group-hover:bg-gold/30"
                >
                  <value.icon className="h-12 w-12 text-gold" />
                </motion.div>
                <h3 className="text-xl font-cinzel font-semibold text-gold mb-4">
                  {value.title}
                </h3>
                <p className="text-silver font-garamond leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-4xl font-cinzel font-bold text-gold mb-12 text-center">
            Royal Advisory Council
          </h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.02 }}
                className="bg-luxury-gradient rounded-lg p-8 border border-gold/20 
                           hover:border-gold/50 transition-all duration-300"
              >
                <div className="flex items-start space-x-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0"
                  >
                    <Crown className="h-10 w-10 text-gold" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-cinzel font-semibold text-gold mb-2">
                      {member.name}
                    </h3>
                    <div className="text-silver/80 font-garamond mb-3">
                      {member.role}
                    </div>
                    <p className="text-silver font-garamond text-sm leading-relaxed mb-3">
                      {member.description}
                    </p>
                    <div className="inline-block bg-gold/20 px-3 py-1 rounded-full">
                      <span className="text-gold text-xs font-garamond">
                        {member.specialization}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="bg-luxury-gradient rounded-lg p-12 border border-gold/20">
            <h2 className="text-4xl font-cinzel font-bold text-gold mb-12 text-center">
              By the Numbers
            </h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: '875+', label: 'Years of Heritage' },
                { number: '10,000+', label: 'Artifacts Authenticated' },
                { number: '50+', label: 'Royal Collections' },
                { number: '99.9%', label: 'Authentication Accuracy' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  className="group"
                >
                  <motion.div
                    className="text-4xl md:text-5xl font-bold text-gold mb-2 font-cinzel"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-silver font-garamond text-lg group-hover:text-gold transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-cinzel font-bold text-gold mb-8">
              Join Our Noble Legacy
            </h2>
            <p className="text-xl text-silver font-garamond leading-relaxed mb-12">
              Whether you're a seasoned collector or beginning your journey into medieval luxury, 
              our royal advisors are here to guide you toward treasures that will enrich your 
              collection and connect you to centuries of noble heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(212, 175, 55, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gold-gradient text-black px-12 py-4 rounded-full font-cinzel font-semibold 
                           text-lg shadow-2xl hover:shadow-gold/50 transition-all duration-300"
              >
                Schedule Private Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gold text-gold px-12 py-4 rounded-full font-cinzel 
                           font-semibold text-lg hover:bg-gold hover:text-black transition-all 
                           duration-300 backdrop-blur-sm"
              >
                Explore Collection
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutPage;