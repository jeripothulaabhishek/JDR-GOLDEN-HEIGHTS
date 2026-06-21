'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tag, Sparkles, Check, Hourglass, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  onOpenLeadModal: (phase?: string) => void;
}

export default function PricingSection({ onOpenLeadModal }: PricingSectionProps) {
  const [plotsRemaining, setPlotsRemaining] = useState(17);

  // Fluctuating urgency plot ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setPlotsRemaining((prev) => {
        if (prev <= 4) return 17; // Reset if too low for visual reasons
        const decrementChance = Math.random();
        if (decrementChance > 0.75) {
          return prev - 1;
        }
        return prev;
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="pricing" className="py-24 bg-luxury-dark relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Exclusive Packages
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Pricing & <span className="text-gold-gradient">Availability</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Secure your investment with transparent pricing options. Select a phase package below to reserve your plot details or schedule an on-site consultation.
          </p>
        </div>

        {/* Dussehra Special Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-gold-950/80 via-luxury-gray to-gold-950/80 border border-gold-400/30 shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3 w-3 mr-1" /> Dussehra Festival Offer
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Limited-Time Festive Benefit Pack
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">
              Phase 2 plots starting at <strong className="text-gold-400">₹18 Lakhs*</strong> only till the Dussehra festival ends. Lock in pricing now!
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end shrink-0">
            <div className="flex items-center text-xs text-gold-400 uppercase tracking-widest font-semibold mb-2">
              <Hourglass className="h-4 w-4 mr-1 text-gold-400 animate-spin-slow" /> Offer Ending Soon
            </div>
            <button
              onClick={() => onOpenLeadModal('Dussehra Festive Offer')}
              className="py-3 px-6 bg-gradient-to-r from-gold-600 to-gold-400 hover:brightness-110 text-black text-xs font-bold uppercase rounded-lg tracking-wider transition-all"
            >
              Claim Festive Benefit
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          
          {/* Phase 1 */}
          <div className="p-8 rounded-2xl bg-luxury-gray border border-white/5 flex flex-col justify-between relative group hover:border-white/10 transition-colors">
            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Premium Zone</span>
                <span className="p-2 rounded-lg bg-white/5 border border-white/10 text-gold-400"><Tag className="h-4 w-4" /></span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-white mb-2">PHASE 1</h3>
              <p className="text-xs text-gray-400 mb-6">Developed Plots with prime access avenues and fully established plantations.</p>
              
              <div className="mb-8">
                <span className="text-xs text-gray-400 block mb-1">Starting Price</span>
                <div className="flex items-baseline">
                  <span className="text-4xl font-serif font-bold text-gold-400">₹22 Lakhs</span>
                  <span className="text-xs text-gray-500 ml-1">Onwards*</span>
                </div>
                <span className="text-[10px] text-gray-500 block mt-2">*Excluding Registration &amp; Amenities Charges</span>
              </div>

              <ul className="space-y-3 mb-8 text-xs sm:text-sm text-gray-300">
                {['Immediate Plot Allotment', 'Premium Avenue Locations', 'Ready Water Tap Point', 'Standard Road Connectivity'].map((feat) => (
                  <li key={feat} className="flex items-center">
                    <Check className="h-4 w-4 text-gold-500 mr-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenLeadModal('Phase 1 Enquiry')}
              className="w-full text-center py-3.5 bg-white/5 border border-gold-500/20 hover:border-gold-400 hover:bg-gold-500/5 text-gold-400 hover:text-white font-bold uppercase tracking-wider text-xs rounded-lg transition-all"
            >
              Enquire Now
            </button>
          </div>

          {/* Phase 2 (Featured / Best Value) */}
          <div className="p-8 rounded-2xl bg-luxury-gray border-2 border-gold-400 flex flex-col justify-between relative shadow-[0_10px_40px_rgba(212,175,55,0.08)]">
            {/* Best Value Badge */}
            <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-gold-600 to-gold-400 text-black text-[10px] font-extrabold uppercase tracking-widest rounded-full shadow-lg">
              Best Value
            </div>

            <div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Limited Open Plots</span>
                <span className="p-2 rounded-lg bg-gold-950/40 border border-gold-400/30 text-gold-400"><Sparkles className="h-4 w-4" /></span>
              </div>
              
              <h3 className="text-2xl font-serif font-bold text-white mb-2">PHASE 2</h3>
              <p className="text-xs text-gray-400 mb-6">Fresh development phase near planned commercial hub and entrance parks.</p>
              
              <div className="mb-8">
                <span className="text-xs text-gray-400 block mb-1">Starting Price</span>
                <div className="flex items-baseline">
                  <span className="text-4xl font-serif font-bold text-gold-400">₹18 Lakhs</span>
                  <span className="text-xs text-gray-500 ml-1">Onwards*</span>
                </div>
                <span className="text-[10px] text-gray-500 block mt-2">*Excluding Registration &amp; Amenities Charges</span>
              </div>

              <ul className="space-y-3 mb-8 text-xs sm:text-sm text-gray-300">
                {['High Capital Growth Potential', 'Planned Drainage Connects', 'Near Club House Area', 'Flexible Payment Options'].map((feat) => (
                  <li key={feat} className="flex items-center">
                    <Check className="h-4 w-4 text-gold-400 mr-2 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => onOpenLeadModal('Phase 2 Booking')}
              className="w-full text-center py-3.5 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 text-black font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:brightness-110"
            >
              Book Site Visit
            </button>
          </div>

        </div>

        {/* Live Scarcity Counter Panel */}
        <div className="mt-12 text-center max-w-md mx-auto">
          <div className="inline-flex items-center space-x-2.5 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-gray-300 font-semibold">
              Live Allocation: <strong className="text-red-400">{plotsRemaining}</strong> Premium Plots Remaining in Phase 2
            </span>
          </div>
          <div className="mt-3 flex items-center justify-center space-x-1.5 text-[11px] text-gray-500">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Prices are subject to revision once the current block sells out.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
