'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, MapPin, Landmark, TrendingUp, ChevronDown, CheckCircle } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
}

const investReasons: AccordionItem[] = [
  {
    title: 'Spiritual Hub & Mega Tourism Growth',
    content: 'Following the grand reconstruction of the Yadadri Temple (often called Telangana\'s Tirupati) by the State Government, the region has witnessed a massive influx of tourists and pilgrims. This spiritual importance guarantees consistent infrastructure funding, cleanliness, and long-term population growth.',
  },
  {
    title: 'High-Speed Connectivity & Highway Expansion',
    content: 'Located along the Hyderabad-Warangal Industrial Corridor, the project site enjoys excellent road connectivity. The expansion of highways, planned regional ring roads (RRR), and proposed MMTS suburban rail extension bring Yadadri closer to Hyderabad\'s core IT nodes.',
  },
  {
    title: 'Rapid Land Value Appreciation',
    content: 'Yadadri has emerged as one of the top investment hotspots in Telangana. Land values here have seen consistent annual appreciation of 15% to 25%. Early stage plotted developments offer the highest margins for smart investors looking to lock in growth.',
  },
];

export default function About() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="about" className="py-24 bg-luxury-dark relative overflow-hidden">
      {/* Decorative gold blur */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Text & Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-widest text-gold-400 uppercase block">
                The Heritage of Goldencity
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
                Welcome to <br />
                <span className="text-gold-gradient">JDR Golden Heights</span>
              </h2>
            </div>
            
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed text-justify">
              JDR Golden Heights is a thoughtfully planned, premium residential community developed by **JDR Goldencity Constructions Pvt. Ltd.** located in one of Telangana&apos;s fastest-growing and highly anticipated investment corridors near the holy Yadadri Temple.
            </p>
            
            <p className="text-gray-400 text-sm leading-relaxed text-justify">
              We offer clear-title, legally verified plotted developments with future-ready infrastructure like wide internal roads, underground drainage, and modern landscape planning. JDR Golden Heights is designed for discerning families who want a serene, safe environment alongside excellent appreciation potential.
            </p>

            {/* Why Invest Accordion */}
            <div className="mt-10 space-y-4">
              <h3 className="text-lg font-serif font-semibold text-white mb-2">
                Why Invest in the Yadadri Growth Corridor?
              </h3>
              
              <div className="space-y-3">
                {investReasons.map((reason, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={reason.title}
                      className="border border-white/5 bg-luxury-gray rounded-xl overflow-hidden transition-all duration-300 hover:border-gold-500/20"
                    >
                      <button
                        onClick={() => toggleAccordion(idx)}
                        className="w-full flex items-center justify-between p-4 text-left text-white focus:outline-none"
                      >
                        <span className="text-sm font-semibold tracking-wide">{reason.title}</span>
                        <ChevronDown
                          className={`h-4 w-4 text-gold-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="p-4 pt-0 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 bg-black/25">
                          {reason.content}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Statistics Grid */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Stat 1 */}
              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.4)' }}
                className="p-6 rounded-xl bg-luxury-gray border border-gold-500/10 shadow-2xl space-y-4"
              >
                <div className="p-3 bg-gold-950/40 rounded-lg w-12 h-12 flex items-center justify-center border border-gold-500/20 text-gold-400">
                  <Landmark className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white font-serif">2022+</h4>
                  <p className="text-xs text-gold-400 uppercase tracking-widest font-semibold mt-1">
                    Developer Established
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Delivering trust and quality construction values since inception.
                  </p>
                </div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.4)' }}
                className="p-6 rounded-xl bg-luxury-gray border border-gold-500/10 shadow-2xl space-y-4"
              >
                <div className="p-3 bg-gold-950/40 rounded-lg w-12 h-12 flex items-center justify-center border border-gold-500/20 text-gold-400">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white font-serif">100%</h4>
                  <p className="text-xs text-gold-400 uppercase tracking-widest font-semibold mt-1">
                    Legal Documentation
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Clear market titles with DTCP approval layouts ready for registration.
                  </p>
                </div>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.4)' }}
                className="p-6 rounded-xl bg-luxury-gray border border-gold-500/10 shadow-2xl space-y-4"
              >
                <div className="p-3 bg-gold-950/40 rounded-lg w-12 h-12 flex items-center justify-center border border-gold-500/20 text-gold-400">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white font-serif">Prime</h4>
                  <p className="text-xs text-gold-400 uppercase tracking-widest font-semibold mt-1">
                    Location Advantage
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Nestled in Telangana&apos;s fastest growing temple tourism corridor.
                  </p>
                </div>
              </motion.div>

              {/* Stat 4 */}
              <motion.div
                whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.4)' }}
                className="p-6 rounded-xl bg-luxury-gray border border-gold-500/10 shadow-2xl space-y-4"
              >
                <div className="p-3 bg-gold-950/40 rounded-lg w-12 h-12 flex items-center justify-center border border-gold-500/20 text-gold-400">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-white font-serif">High</h4>
                  <p className="text-xs text-gold-400 uppercase tracking-widest font-semibold mt-1">
                    Investment ROI
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Outstanding appreciation potential with limited premium plots.
                  </p>
                </div>
              </motion.div>

            </div>

            {/* Quick alert bar */}
            <div className="flex items-center space-x-3 p-4 rounded-xl bg-gold-950/20 border border-gold-500/15">
              <ShieldAlert className="h-5 w-5 text-gold-400 shrink-0" />
              <p className="text-xs text-gray-400">
                All legal plots are demarcated, coordinates locked, and backed by bank loan facilities.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
