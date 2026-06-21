'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Download, Clock, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PopupManager() {
  const [activePopup, setActivePopup] = useState<'none' | 'exit' | 'delay'>('none');
  const [hasShownExit, setHasShownExit] = useState(false);
  const [hasShownDelay, setHasShownDelay] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  // 1. Delayed Popup Trigger (30 Seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasShownDelay && activePopup === 'none') {
        setActivePopup('delay');
        setHasShownDelay(true);
      }
    }, 30000); // 30 seconds

    return () => clearTimeout(timer);
  }, [hasShownDelay, activePopup]);

  // 2. Exit Intent Trigger (Mouse leaves viewport top boundary)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 20 && !hasShownExit && activePopup === 'none') {
        setActivePopup('exit');
        setHasShownExit(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExit, activePopup]);

  const handleClose = () => {
    setActivePopup('none');
    setIsSuccess(false);
    setName('');
    setPhone('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    setIsSubmitting(true);

    try {
      const payload = {
        name: name || 'Anonymous Callback',
        phone,
        message: activePopup === 'exit' ? 'Exit Intent: Get Brochure Pack' : '30s Timeout: Call Back Request',
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSuccess(true);
        confetti({
          particleCount: 80,
          spread: 60,
          colors: ['#d4af37', '#ffffff'],
          zIndex: 999999,
        });
        
        // Auto-close success after 3 seconds
        setTimeout(() => {
          handleClose();
        }, 3000);
      }
    } catch (err) {
      console.error('Popup submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (activePopup === 'none') return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black backdrop-blur-sm"
        />

        {/* Modal body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          className="relative max-w-md w-full rounded-2xl glass-panel border border-gold-500/20 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-left"
        >
          {/* Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700" />

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-gold-400 text-gray-400 hover:text-gold-400 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              
              {/* Icon & Title based on type */}
              {activePopup === 'exit' ? (
                <div className="space-y-2">
                  <div className="inline-flex p-3 rounded-lg bg-gold-950/40 border border-gold-400/25 text-gold-400">
                    <Download className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                    Wait! Get the Price Sheet &amp; Brochure Package
                  </h3>
                  <p className="text-xs text-gray-400">
                    Before you leave, enter your mobile number to instantly receive the layouts directory and latest Phase pricing details via WhatsApp.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="inline-flex p-3 rounded-lg bg-gold-950/40 border border-gold-400/25 text-gold-400">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                    Book Your Free Site Visit Today
                  </h3>
                  <p className="text-xs text-gray-400">
                    Need help deciding? Reserve a free on-site consultation. We arrange complimentary executive car pickups and drops from Hyderabad hubs.
                  </p>
                </div>
              )}

              {/* Form Input fields */}
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-sm"
                />
                
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  placeholder="10-Digit Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-sm font-mono tracking-wider"
                />
              </div>

              {/* Action Button */}
              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={isSubmitting || phone.length < 10}
                  className="w-full text-center py-3.5 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 disabled:opacity-50 text-black font-bold uppercase tracking-wider text-xs rounded-lg transition-all shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:brightness-110"
                >
                  {isSubmitting ? 'Requesting...' : activePopup === 'exit' ? 'Get Catalog Now' : 'Request Free Callback'}
                </button>

                <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-gold-500" />
                  <span>No spam guaranteed. Safe &amp; verified legal compliance.</span>
                </div>
              </div>

            </form>
          ) : (
            /* Popup Success View */
            <div className="text-center py-8 space-y-4 pt-4">
              <div className="inline-flex p-3 rounded-full bg-gold-950/40 border border-gold-400/25 text-gold-400">
                <Sparkles className="h-8 w-8 animate-bounce" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white">Details Registered!</h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Thank you! We have logged your callback request and triggered the PDF catalog to your contact details.
              </p>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
