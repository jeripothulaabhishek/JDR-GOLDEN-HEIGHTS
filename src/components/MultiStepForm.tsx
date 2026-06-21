'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Calendar, ShieldCheck, Sparkles, User, Phone, Mail, FileText, IndianRupee } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MultiStepFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string; // Phase preset, e.g. "Phase 1"
}

export default function MultiStepForm({ isOpen, onClose, initialInterest }: MultiStepFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    budget: '',
    visitDate: '',
    message: initialInterest || '',
  });

  // Reset state when opened/closed
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsSuccess(false);
      setIsSubmitting(false);
      setFormData(prev => ({
        ...prev,
        message: initialInterest || prev.message,
      }));
    }
  }, [isOpen, initialInterest]);

  // Extract UTM and source parameters
  const getUtmMetadata = () => {
    if (typeof window === 'undefined') return {};
    const searchParams = new URLSearchParams(window.location.search);
    return {
      utmSource: searchParams.get('utm_source') || undefined,
      utmMedium: searchParams.get('utm_medium') || undefined,
      utmCampaign: searchParams.get('utm_campaign') || undefined,
      source: document.referrer || 'Direct Website',
    };
  };

  const handleNext = () => {
    if (step === 1 && !formData.name.trim()) return;
    if (step === 2 && (!formData.phone.trim() || formData.phone.length < 10)) return;
    setStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const utmMeta = getUtmMetadata();
      const payload = {
        ...formData,
        ...utmMeta,
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        // Play luxury gold/silver confetti
        confetti({
          particleCount: 150,
          spread: 80,
          colors: ['#d4af37', '#ffffff', '#aa7c11', '#c5a880'],
          zIndex: 99999,
        });

        // Trigger automatic brochure PDF download
        const link = document.createElement('a');
        link.href = '/JDR_Golden_Heights_Brochure.pdf';
        link.download = 'JDR_Golden_Heights_Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert(result.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting lead form:', error);
      alert('Network error. Please check connectivity and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black backdrop-blur-md"
        />

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-lg w-full rounded-2xl glass-panel border border-gold-500/20 p-6 sm:p-8 shadow-2xl z-10 overflow-hidden text-left"
        >
          {/* Top border decoration */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-gold-400 text-gray-400 hover:text-gold-400 transition-colors"
            aria-label="Close form"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6 pt-4">
              
              {/* Header based on step */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                  Step {step} of 5 • Luxury Site Visit
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {step === 1 && 'Let\'s get to know you'}
                  {step === 2 && 'How can we contact you?'}
                  {step === 3 && 'What is your investment scale?'}
                  {step === 4 && 'When would you like to visit?'}
                  {step === 5 && 'Final details & Message'}
                </h3>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
                  animate={{ width: `${(step / 5) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Step Contents */}
              <div className="min-h-[140px] flex items-center justify-center">
                
                {/* Step 1: Full Name */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full space-y-4"
                  >
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-5 w-5 text-gold-500" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-sm"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Mobile Number */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full space-y-4"
                  >
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      10-Digit Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gold-500" />
                      <input
                        type="tel"
                        pattern="[0-9]{10}"
                        placeholder="9876543210"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        className="w-full pl-11 pr-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-sm font-mono tracking-wider"
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 block">We will share site coordinates &amp; brochure on this WhatsApp number.</span>
                  </motion.div>
                )}

                {/* Step 3: Investment Budget */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full space-y-3"
                  >
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                      Preferred Budget Range
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { val: '₹15L - ₹25L', desc: 'Looking for Phase 2 plots' },
                        { val: '₹25L - ₹40L', desc: 'Looking for Phase 1 / Corner plots' },
                        { val: '₹40L+', desc: 'Multiple plots / Commercial land' },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: item.val })}
                          className={`p-3.5 rounded-xl border text-left flex justify-between items-center transition-all ${
                            formData.budget === item.val
                              ? 'border-gold-400 bg-gold-950/20 text-white'
                              : 'border-white/10 bg-black/35 text-gray-300 hover:border-white/20'
                          }`}
                        >
                          <div>
                            <p className="text-sm font-bold">{item.val}</p>
                            <p className="text-[10px] text-gray-400">{item.desc}</p>
                          </div>
                          <IndianRupee className="h-4 w-4 text-gold-500" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Visit Date & Time */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full space-y-4"
                  >
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Preferred Date of Visit
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-gold-500" />
                      <input
                        type="date"
                        required
                        value={formData.visitDate}
                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-sm"
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 block">Our support driver provides free pickup &amp; drop facilities.</span>
                  </motion.div>
                )}

                {/* Step 5: Email & Message */}
                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        Email Address (Optional)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gold-500" />
                        <input
                          type="email"
                          placeholder="name@domain.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full pl-11 pr-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                        Custom Message (Optional)
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-3 h-5 w-5 text-gold-500" />
                        <textarea
                          placeholder="Please share brochure and pricing sheet..."
                          rows={2}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full pl-11 pr-4 py-2.5 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between gap-4 pt-4 border-t border-white/5">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center px-4 py-3 bg-white/5 border border-white/10 hover:border-gold-400 text-gold-400 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={(step === 1 && !formData.name) || (step === 2 && formData.phone.length < 10)}
                    className="flex items-center px-5 py-3 bg-gradient-to-r from-gold-600 to-gold-400 disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-lg text-xs font-bold uppercase tracking-wider transition-colors hover:brightness-105"
                  >
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 disabled:opacity-50 text-black rounded-lg text-xs font-bold uppercase tracking-widest transition-all shadow-[0_4px_15px_rgba(212,175,55,0.2)] hover:brightness-110"
                  >
                    {isSubmitting ? 'Registering...' : 'Schedule Site Visit'}
                  </button>
                )}
              </div>

            </form>
          ) : (
            /* Success View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6 pt-4"
            >
              <div className="inline-flex p-4 rounded-full bg-gold-950/40 border border-gold-400/35 text-gold-400 mb-2">
                <ShieldCheck className="h-10 w-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-white">Site Visit Scheduled!</h3>
                <p className="text-sm text-gray-300 max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our executive manager will call you shortly on <strong className="text-white font-mono">+{formData.phone}</strong> to confirm the pickup coordinates.
                </p>
              </div>
              
              <div className="p-4 bg-white/5 border border-white/5 rounded-xl max-w-sm mx-auto flex items-start space-x-3 text-left">
                <Sparkles className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400">
                  A verification confirmation and details package has been triggered to your contact number. Please keep your phone reachable.
                </p>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-gradient-to-r from-gold-600 to-gold-400 text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:brightness-110 transition-colors"
                >
                  Return to Site
                </button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
