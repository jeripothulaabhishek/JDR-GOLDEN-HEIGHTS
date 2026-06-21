'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Gem, ShieldAlert, Sparkles, Milestone, Construction, Trees, HardHat } from 'lucide-react';

interface HighlightItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const highlights: HighlightItem[] = [
  {
    title: 'Premium Residential Development',
    description: 'Fully master-planned gated plots offering excellent layouts, landscaping, and building choices.',
    icon: Gem,
  },
  {
    title: 'Strategic Location Near Yadadri',
    description: 'Just 15 minutes away from the Yadadri Temple, offering high spiritual and physical importance.',
    icon: Compass,
  },
  {
    title: 'Excellent Investment Potential',
    description: 'Highly appreciating corridor with tremendous short and long-term resale capital margins.',
    icon: Sparkles,
  },
  {
    title: 'Well-Planned Infrastructure',
    description: 'Concealed utility pipes, well-designed plots, and environment-focused sustainable layouts.',
    icon: Construction,
  },
  {
    title: 'Future Growth Corridor',
    description: 'Situated inside the main growth pathway of the Hyderabad-Warangal industrial zone development.',
    icon: Milestone,
  },
  {
    title: 'Secure Community Environment',
    description: 'Gated entrance arch with dedicated 24/7 security guard patrol and extensive CCTV systems.',
    icon: ShieldAlert,
  },
  {
    title: 'Wide Internal Roads',
    description: 'Properly paved, heavy-vehicle load-tested wide layout roads with modern streetlights.',
    icon: HardHat,
  },
  {
    title: 'Modern Layout Amenities',
    description: 'Equipped with dedicated children\'s parks, walking tracks, green zones, and community spaces.',
    icon: Trees,
  },
];

export default function Highlights() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
  };

  return (
    <section id="highlights" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Exclusive Standard
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Project <span className="text-gold-gradient">Highlights</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            JDR Golden Heights offers carefully designed infrastructure and legal protections, making it the perfect choice for home-builders and investors alike.
          </p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: '0 12px 30px rgba(212, 175, 55, 0.1)',
                  borderColor: 'rgba(212, 175, 55, 0.35)',
                }}
                className="p-8 rounded-xl bg-luxury-gray border border-white/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-white/5 rounded-lg w-12 h-12 flex items-center justify-center border border-white/10 text-gold-400 group-hover:border-gold-400/30 group-hover:bg-gold-950/20 transition-all duration-300">
                    <Icon className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white tracking-wide group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
                {/* Index number indicator */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-bold tracking-wider text-gray-500 group-hover:text-gold-400/60 transition-colors">
                  <span>SPECIFICATION</span>
                  <span>0{index + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
