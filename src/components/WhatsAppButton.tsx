'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleCode } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-20 left-6 md:bottom-6 md:left-6 z-40">
      <motion.a
        href="https://wa.me/916262838353?text=Hi,%20I%20am%20interested%20in%20JDR%20Golden%20Heights."
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 border border-emerald-400 text-white font-bold text-xs uppercase tracking-wider shadow-[0_5px_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer group"
      >
        <span className="relative flex h-3.5 w-3.5 mr-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white flex items-center justify-center">
            <MessageCircleCode className="h-2.5 w-2.5 text-emerald-600" />
          </span>
        </span>
        <span className="hidden sm:inline">WhatsApp Support</span>
        <span className="inline sm:hidden">Chat</span>
      </motion.a>
    </div>
  );
}
