'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Sparkles } from 'lucide-react';

interface StickyDesktopCtaProps {
  onOpenLeadModal: (interestText?: string) => void;
}

export default function StickyDesktopCta({ onOpenLeadModal }: StickyDesktopCtaProps) {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:block">
      <motion.button
        onClick={() => onOpenLeadModal('Desktop Sticky Sidebar Booking')}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 24, delay: 1 }}
        whileHover={{ x: -6 }}
        className="flex items-center gap-2.5 px-4 py-3 bg-luxury-gray/90 border border-lime-gold/30 hover:border-lime-gold rounded-l-2xl text-lime-gold hover:text-white backdrop-blur-md shadow-2xl cursor-pointer group"
      >
        {/* Pulsing indicator */}
        <div className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-gold"></span>
        </div>
        
        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
          Book Site Visit <Calendar className="h-4 w-4 transition-transform group-hover:scale-110" />
        </span>
      </motion.button>
    </div>
  );
}
