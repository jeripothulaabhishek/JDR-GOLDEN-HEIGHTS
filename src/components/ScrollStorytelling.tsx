'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Landmark, Compass, Award, ShieldCheck, MapPin, Calendar, MessageCircle } from 'lucide-react';
import ThreeDShowcase from './ThreeDShowcase';

interface StoryStep {
  index: number;
  icon: React.ComponentType<any>;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
}

const steps: StoryStep[] = [
  {
    index: 1,
    icon: Compass,
    title: 'Just 60 Minutes from Hyderabad',
    subtitle: 'Main Highway Entrance corridor',
    description: 'JDR Golden Heights is positioned directly along the Hyderabad-Warangal NH-163 industrial growth highway. The entrance is marked by a majestic double-column archway ensuring premium security and grandeur.',
    bullets: [
      'Direct high-speed four-lane access road',
      '24/7 guarded security checkpost',
      'Grand architectural boundary wall structures'
    ]
  },
  {
    index: 2,
    icon: Landmark,
    title: 'Blessed by Divine Temple Sightlines',
    subtitle: 'Phase 1 Premium Elevated Plots',
    description: 'Experience peace and continuous capital appreciation. High-elevation plots in Phase 1 offer direct, unobstructed sightlines pointing straight to the Yadadri Lakshmi Narasimha Swamy Gopuram.',
    bullets: [
      'Elevated terrain with premium temple views',
      '15 minutes away from main temple shrine',
      'High growth node driven by continuous tourism flows'
    ]
  },
  {
    index: 3,
    icon: ShieldCheck,
    title: 'Modern Planned Clubhouse & Pool',
    subtitle: 'Exclusive Resident Amenities',
    description: 'The layout features a planned glass pavilion clubhouse, fully loaded with recreational games, a swimming pool, gymnasium, and a grand lounge for hosting layout community gatherings.',
    bullets: [
      'Planned modern clubhouse with pool area',
      'Dedicated power substations and streetlights',
      'Underground cabling grids'
    ]
  },
  {
    index: 4,
    icon: Award,
    title: '100% DTCP Approved & RERA Compliant',
    subtitle: 'Central Avenue Parks & Infrastructures',
    description: 'Approved under L.P. No. 134/2023/H, this community incorporates broad 40-feet and 33-feet internal asphalt road grids, concrete kerbs, central children\'s parks, and independent water connections for every individual plot.',
    bullets: [
      'DTCP Layout parameters with spot registration',
      'Completed closed underground drainage lines',
      'Extensive avenue tree plantations and landscaped parks'
    ]
  }
];

interface ScrollStorytellingProps {
  onOpenLeadModal: (interestText?: string) => void;
}

export default function ScrollStorytelling({ onOpenLeadModal }: ScrollStorytellingProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="storytelling" className="relative bg-luxury-black py-24 border-t border-white/5 overflow-hidden">
      {/* Radial Green Glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-luxury-green-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-lime-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-lime-gold uppercase">
            Visual Scroll Tour
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-white uppercase">
            Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-gold to-emerald-400">Scroll Storytelling</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Scroll down to fly through JDR Golden Heights layout zones and experience the premium planned infrastructure first-hand.
          </p>
        </div>

        {/* Storytelling Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          
          {/* Sticky Left Window (3D Scene) */}
          <div className="lg:col-span-6 sticky top-28 h-[55vh] sm:h-[65vh] w-full rounded-3xl border border-white/10 bg-black/45 backdrop-blur-md overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] z-20 flex flex-col justify-between">
            
            {/* Top Indicator */}
            <div className="p-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between border-b border-white/5 z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Live Layout Visualizer
              </span>
              <div className="flex items-center space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-lime-gold animate-ping" />
                <span className="text-[10px] text-lime-gold font-bold uppercase tracking-wider">
                  {activeIndex === 0 ? 'Overview' : `Phase Step ${activeIndex}`}
                </span>
              </div>
            </div>

            {/* R3F Canvas */}
            <div className="flex-grow w-full h-full relative">
              <ThreeDShowcase activeIndex={activeIndex} />
            </div>

            {/* Bottom Navigation Hint */}
            <div className="p-3 bg-black/85 text-center text-[10px] text-gray-500 border-t border-white/5 font-semibold uppercase tracking-widest">
              Drag layout to rotate. Scroll on right to fly camera.
            </div>
          </div>

          {/* Scrolling Right Column (Information Panels) */}
          <div className="lg:col-span-6 space-y-[45vh] pb-[20vh] pt-4">
            
            {/* Step 0: Overview Cover */}
            <motion.div
              initial={{ opacity: 0.3, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              onViewportEnter={() => setActiveIndex(0)}
              transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 1.1 }}
              className="p-8 rounded-3xl bg-luxury-gray/95 border border-white/5 backdrop-blur-md shadow-2xl text-left space-y-6"
            >
              <div className="inline-flex p-3 rounded-2xl bg-luxury-green-900 border border-lime-gold/20 text-lime-gold">
                <Compass className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-lime-gold">Introduction</span>
                <h3 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase leading-tight">
                  Discover JDR Golden Heights
                </h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed text-justify">
                Spread across 100+ acres near the holy town of Yadadri, JDR Golden Heights combines serene nature with urban luxury infrastructure. Scroll down to inspect the planned key assets of this gated layout.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenLeadModal('Scroll Tour Intro')}
                  className="px-6 py-3 bg-gradient-to-r from-lime-gold to-emerald-400 text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:brightness-110 shadow-lg"
                >
                  Book Priority Site Visit
                </button>
              </div>
            </motion.div>

            {/* Steps 1 to 4 */}
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.index}
                  initial={{ opacity: 0.1, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.6 }}
                  onViewportEnter={() => setActiveIndex(step.index)}
                  transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 1.1 }}
                  className="p-8 rounded-3xl bg-luxury-gray/95 border border-white/5 backdrop-blur-md shadow-2xl text-left space-y-6"
                >
                  <div className="inline-flex p-3 rounded-2xl bg-luxury-green-900 border border-lime-gold/20 text-lime-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-lime-gold">
                      {step.subtitle}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase leading-tight">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed text-justify">
                    {step.description}
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-gray-400">
                    {step.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-center space-x-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime-gold shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 flex flex-wrap gap-3">
                    <button
                      onClick={() => onOpenLeadModal(`Scroll Step ${step.index} callback`)}
                      className="px-5 py-3 bg-white/5 border border-lime-gold/20 hover:border-lime-gold text-lime-gold font-bold uppercase tracking-wider text-[10px] rounded-xl transition-all"
                    >
                      Request Callback
                    </button>
                    <a
                      href="https://wa.me/916262838353?text=Hi!%20I%20am%20interested%20in%20JDR%20Golden%20Heights%20Layout%20details."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 font-bold uppercase tracking-wider text-[10px] rounded-xl flex items-center gap-1.5 hover:bg-emerald-600/25 transition-all"
                    >
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Chat
                    </a>
                  </div>
                </motion.div>
              );
            })}

            {/* Step 5: Final CTA Panel */}
            <motion.div
              initial={{ opacity: 0.1, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.6 }}
              onViewportEnter={() => setActiveIndex(0)}
              transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 1.1 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-luxury-green-950 to-luxury-gray border border-lime-gold/30 backdrop-blur-md shadow-2xl text-left space-y-6"
            >
              <div className="inline-flex p-3 rounded-2xl bg-lime-gold text-black shadow-lg">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-lime-gold">Reserve Now</span>
                <h3 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase leading-tight">
                  Ready to See the Site?
                </h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Book a complimentary private site visit today. We arrange comfortable luxury pickup and drop-off cars from Hyderabad straight to the project site.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onOpenLeadModal('Scroll Tour End Book')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-lime-gold to-emerald-400 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all hover:brightness-110 shadow-lg text-center cursor-pointer"
                >
                  Book Free Site Visit
                </button>
                <a
                  href="tel:+916262838353"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/10 hover:border-lime-gold text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all text-center flex items-center justify-center cursor-pointer"
                >
                  Call +91 62628 38353
                </a>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
