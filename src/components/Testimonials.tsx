'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  photoUrl: string;
  videoUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'K. Rajender Prasad',
    role: 'Govt. Employee / Investor',
    rating: 5,
    content: 'JDR Golden Heights is my second investment, and by far the smoothest. The legal documentation was completely clear, and the registration was completed without any hassle. The proximity to Yadadri Temple will bring huge appreciation in the coming 3-5 years.',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    videoUrl: '#',
  },
  {
    id: 't2',
    name: 'Dr. Shruti Reddy',
    role: 'Consultant Cardiologist',
    rating: 5,
    content: 'I bought a Phase 1 plot for a weekend home. The infrastructure developed by JDR Goldencity is top-notch. The wide internal roads, avenue plantations, and closed drainage are exactly what they promised in the brochure. Highly recommended developer!',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    videoUrl: '#',
  },
  {
    id: 't3',
    name: 'M. Sunil Kumar',
    role: 'IT Professional (Infosys)',
    rating: 5,
    content: 'Excellent location advantage. Being just 15 minutes away from the Yadagirigutta shrine and 10 minutes from the Warangal Highway makes this project a gold mine. The ROI calculator helped me plan, and the appreciation has already started matching estimates.',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    videoUrl: '#',
  },
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[activeIdx];

  return (
    <section className="py-24 bg-luxury-dark relative overflow-hidden">
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Investor Reviews
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Trusted by <span className="text-gold-gradient">Homeowners</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Read what our smart investors and site-owners say about the development quality, legal clearances, and capital value appreciation.
          </p>
        </div>

        {/* Carousel Slider Panel */}
        <div className="relative max-w-4xl mx-auto rounded-2xl bg-luxury-gray border border-white/5 p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[350px] flex flex-col justify-between">
          <Quote className="absolute top-4 right-8 h-24 w-24 text-gold-500/5 pointer-events-none" />
          
          <div className="flex-grow flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
              >
                {/* Photo & Video link column */}
                <div className="md:col-span-4 flex flex-col items-center text-center">
                  <div className="relative w-28 h-28 rounded-full border-2 border-gold-400 p-1 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={current.photoUrl}
                      alt={current.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    
                    {current.videoUrl && (
                      <a
                        href={current.videoUrl}
                        className="absolute bottom-0 right-0 p-2 bg-gold-400 hover:bg-gold-500 text-black rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                        title="Watch video review"
                        onClick={(e) => {
                          e.preventDefault();
                          alert('Video review presentation mockup triggered.');
                        }}
                      >
                        <Play className="h-3 w-3 fill-black text-black" />
                      </a>
                    )}
                  </div>
                  <h4 className="text-white font-serif font-bold text-lg leading-tight">{current.name}</h4>
                  <p className="text-xs text-gold-400 mt-1 font-semibold uppercase tracking-wider">{current.role}</p>
                </div>

                {/* Content Column */}
                <div className="md:col-span-8 space-y-4">
                  {/* Rating Stars */}
                  <div className="flex space-x-1">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 text-gold-400 fill-gold-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-justify italic">
                    &ldquo;{current.content}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            {/* Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2 rounded-full transition-all ${
                    activeIdx === idx ? 'w-6 bg-gold-400' : 'w-2 bg-gray-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Next/Prev buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 border border-white/10 hover:border-gold-400 text-gray-400 hover:text-white rounded-lg transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 border border-white/10 hover:border-gold-400 text-gray-400 hover:text-white rounded-lg transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
