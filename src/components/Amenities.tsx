'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Trees,
  Gamepad2,
  Users,
  Road,
  Sun,
  Droplet,
  Shuffle,
  Shield,
  Layers,
  Video,
  Activity,
  Milestone
} from 'lucide-react';

interface AmenityItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const amenities: AmenityItem[] = [
  {
    title: 'Grand Entrance Arch',
    description: 'An imposing and premium architectural gateway structure welcoming you to the community.',
    icon: Milestone,
  },
  {
    title: 'Landscaped Green Spaces',
    description: 'Beautifully manicured premium lawns, flower beds, and shaded park zones for relaxation.',
    icon: Trees,
  },
  {
    title: 'Children\'s Play Area',
    description: 'Fully equipped, safe playgrounds with premium equipment for kids to play and socialize.',
    icon: Gamepad2,
  },
  {
    title: 'Clubhouse & Community Spaces',
    description: 'Planned social gathering hall, perfect for hosting colony festivals, birthdays, and celebrations.',
    icon: Users,
  },
  {
    title: 'Wide Asphalt Roads',
    description: 'Heavy duty, broad internal layouts lined with curbing to ensure smooth traffic movement.',
    icon: Road,
  },
  {
    title: 'Modern Street Lighting',
    description: 'Bright and energy-efficient LED streetlamps strategically placed across the community layout.',
    icon: Sun,
  },
  {
    title: 'Water Supply Infrastructure',
    description: 'Dual overhead tanks connecting continuous potable water pipelines directly to every plot.',
    icon: Droplet,
  },
  {
    title: 'Underground Drainage System',
    description: 'Closed, modern underground drainage facilities preventing waterlogging during monsoons.',
    icon: Shuffle,
  },
  {
    title: 'Security Gate & Guards',
    description: 'Fully-staffed gated checkposts supervising vehicles and visitors 24 hours a day.',
    icon: Shield,
  },
  {
    title: 'CCTV Surveillance Net',
    description: 'Layout-wide security network tracking boundaries and intersections to ensure absolute safety.',
    icon: Video,
  },
  {
    title: 'Dedicated Jogging Track',
    description: 'Smooth and paved pedestrian walking pathways winding through green areas.',
    icon: Activity,
  },
  {
    title: 'Future Growth Expansion',
    description: 'Dedicated sector allocated for upcoming shopping complexes and community utilities.',
    icon: Layers,
  },
];

export default function Amenities() {
  return (
    <section id="amenities" className="py-24 bg-luxury-dark relative overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            World-class Features
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Premium <span className="text-gold-gradient">Amenities</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Designed to elevate your lifestyle. JDR Golden Heights features state-of-the-art civic planning and recreational utilities.
          </p>
        </div>

        {/* Grid of 12 Amenities with hover border glow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{
                  scale: 1.02,
                  borderColor: 'rgba(212, 175, 55, 0.4)',
                  boxShadow: '0 0 25px rgba(212, 175, 55, 0.15)',
                }}
                className="p-6 rounded-xl bg-luxury-gray border border-white/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="p-3 bg-gold-950/20 border border-gold-500/10 text-gold-400 rounded-lg w-12 h-12 flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-serif font-bold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
