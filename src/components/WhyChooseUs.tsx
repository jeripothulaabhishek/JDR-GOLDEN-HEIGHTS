'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Compass, TrendingUp, Sparkles } from 'lucide-react';

interface ReasonCard {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

const reasons: ReasonCard[] = [
  {
    title: 'Prime Location',
    description: 'Located in Yadadri, one of Telangana\'s most rapidly developing spiritual and tourism hubs, enjoying direct highway connectivity.',
    icon: Compass,
  },
  {
    title: 'Trusted Developer',
    description: 'Developed by JDR Goldencity Constructions Pvt. Ltd., committed to high construction quality, complete transparency, and clear legal approvals.',
    icon: Landmark,
  },
  {
    title: 'Future Appreciation',
    description: 'Backed by government-led zoning projects, temple tourism inflow, and industrial ring road plans, guaranteeing outstanding value growth.',
    icon: TrendingUp,
  },
  {
    title: 'Modern Living Standards',
    description: 'Designed from day one to support wide paved roads, landscaped parks, underground drainage systems, and future commercial facilities.',
    icon: Sparkles,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-luxury-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Value Proposition
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Why Choose <span className="text-gold-gradient">JDR Golden Heights</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Investing in property requires trust, location values, and future vision. Here is how JDR Golden Heights satisfies all checklist items.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.3)' }}
                className="p-8 rounded-2xl bg-luxury-gray border border-white/5 shadow-xl flex flex-col sm:flex-row gap-6 items-start group"
              >
                <div className="p-4 bg-gold-950/20 border border-gold-500/10 text-gold-400 rounded-xl group-hover:border-gold-400/40 group-hover:bg-gold-950/40 transition-colors shrink-0">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif font-bold text-white tracking-wide group-hover:text-gold-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
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
