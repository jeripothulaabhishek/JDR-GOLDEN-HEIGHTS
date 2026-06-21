'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Map, Info, Compass, HelpCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  description: string;
}

interface TourLocation {
  id: string;
  name: string;
  description: string;
  backgroundGradient: string; // Simulated panorama backplate
  hotspots: Hotspot[];
}

const locations: TourLocation[] = [
  {
    id: 'entrance',
    name: 'Grand Entrance',
    description: 'Entrance gateway arch looking in from the main 60-feet wide approach road.',
    backgroundGradient: 'linear-gradient(90deg, #1f2937 0%, #111827 50%, #1f2937 100%)',
    hotspots: [
      { id: 'h1', x: 25, y: 45, title: '60-Feet Wide Road', description: 'Wide paved blacktop entry road connecting the layout directly.' },
      { id: 'h2', x: 50, y: 30, title: 'Security Checkpoint', description: '24/7 manned security check post and CCTV installation points.' },
      { id: 'h3', x: 75, y: 48, title: 'Landscaped Entrance Arch', description: 'Decorative modern architecture featuring native plantations.' },
    ],
  },
  {
    id: 'roads',
    name: 'Layout Roads',
    description: 'Looking down Avenue A, showing internal blacktop roads and curb structures.',
    backgroundGradient: 'linear-gradient(90deg, #111827 0%, #030712 50%, #111827 100%)',
    hotspots: [
      { id: 'h4', x: 30, y: 75, title: 'Underground Drainage', description: 'Premium closed concrete gutters along both sides of internal roads.' },
      { id: 'h5', x: 80, y: 40, title: 'LED Street Lighting', description: 'Continuous power line backups and pole-mounted LED lighting arrays.' },
    ],
  },
  {
    id: 'parks',
    name: 'Children\'s Park',
    description: 'Planned central park area containing trees, jogging tracks, and open play lawns.',
    backgroundGradient: 'linear-gradient(90deg, #0f172a 0%, #020617 50%, #0f172a 100%)',
    hotspots: [
      { id: 'h6', x: 20, y: 40, title: 'Avenue Plantation', description: 'Premium exotic tree lines providing shade and green coverage.' },
      { id: 'h7', x: 50, y: 55, title: 'Children\'s Play Rigs', description: 'High safety standard swings, slides, and sandpit facilities.' },
      { id: 'h8', x: 75, y: 50, title: 'Jogging Track', description: 'Smooth interlocking paver track looping around the park.' },
    ],
  },
  {
    id: 'clubhouse',
    name: 'Clubhouse Zone',
    description: 'Site overview of the planned community gathering hall and sports arena.',
    backgroundGradient: 'linear-gradient(90deg, #1e1b4b 0%, #090514 50%, #1e1b4b 100%)',
    hotspots: [
      { id: 'h9', x: 50, y: 40, title: 'Multi-purpose Hall', description: 'Dedicated space for colony meetings, parties, and festive celebrations.' },
      { id: 'h10', x: 25, y: 50, title: 'Gym & Sports Court', description: 'Proposed indoor recreational fitness room and badminton courts.' },
    ],
  },
  {
    id: 'temple',
    name: 'Temple Sightline',
    description: 'Vantage point from the highest peak of the layout, offering views of Yadadri Temple.',
    backgroundGradient: 'linear-gradient(90deg, #2e1065 0%, #0c0415 50%, #2e1065 100%)',
    hotspots: [
      { id: 'h11', x: 50, y: 25, title: 'Yadadri Temple Peak', description: 'Scenic clear sightline toward the Yadagirigutta temple shrine tower.' },
      { id: 'h12', x: 80, y: 60, title: 'High-Elevation Plots', description: 'Highly premium residential plots enjoying excellent breeze and panoramic views.' },
    ],
  },
];

export default function VirtualTour() {
  const [currentLocIdx, setCurrentLocIdx] = useState(0);
  const [panOffset, setPanOffset] = useState(0); // in percent (-20% to 20%)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const panoramaContainerRef = useRef<HTMLDivElement>(null);
  
  const currentLoc = locations[currentLocIdx];

  // Pan interaction
  const handlePanLeft = () => setPanOffset((prev) => Math.min(prev + 10, 20));
  const handlePanRight = () => setPanOffset((prev) => Math.max(prev - 10, -20));

  // Auto-scroll simulation on location change
  useEffect(() => {
    setPanOffset(0);
    setActiveHotspot(null);
  }, [currentLocIdx]);

  return (
    <section className="py-24 bg-luxury-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            360° Virtual Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Virtual <span className="text-gold-gradient">Site Visit</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Take a digital walk through the JDR Golden Heights community layout. Toggle locations and click hotspots to inspect site details.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto">
          {locations.map((loc, idx) => (
            <button
              key={loc.id}
              onClick={() => setCurrentLocIdx(idx)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all border ${
                currentLocIdx === idx
                  ? 'bg-gradient-to-r from-gold-600 to-gold-400 border-gold-400 text-black shadow-gold-glow'
                  : 'bg-luxury-gray border-white/5 text-gray-400 hover:text-white hover:border-white/10'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Virtual Tour Panorama Box */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-white/10 overflow-hidden bg-luxury-gray aspect-[16/8] sm:aspect-[16/7] shadow-2xl">
          
          {/* Pan Navigation Buttons */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-20">
            <button
              onClick={handlePanLeft}
              className="p-2 sm:p-3 bg-black/75 border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 rounded-full backdrop-blur-md transition-colors"
              aria-label="Pan Left"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-20">
            <button
              onClick={handlePanRight}
              className="p-2 sm:p-3 bg-black/75 border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 rounded-full backdrop-blur-md transition-colors"
              aria-label="Pan Right"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Panorama Screen with CSS transform pan */}
          <div
            ref={panoramaContainerRef}
            style={{
              background: currentLoc.backgroundGradient,
              transform: `scale(1.3) translateX(${panOffset}%)`,
            }}
            className="w-full h-full relative transition-transform duration-700 ease-out flex items-center justify-center"
          >
            {/* Elegant Luxury grid / blueprint elements inside the panorama to simulate landscape */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
              <Compass className="h-48 w-48 text-gold-400 animate-spin-slow" />
            </div>

            {/* Glowing lines representing roads and layout outlines in simulated landscape */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <path d="M 0 350 L 1000 350" stroke="#d4af37" strokeWidth="4" />
              <path d="M 100 200 L 900 500" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="5,5" />
            </svg>

            {/* Hotspots */}
            <AnimatePresence>
              {currentLoc.hotspots.map((hs) => {
                const isActive = activeHotspot?.id === hs.id;
                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* Hotspot Pulse Trigger */}
                    <button
                      onClick={() => setActiveHotspot(isActive ? null : hs)}
                      onMouseEnter={() => setActiveHotspot(hs)}
                      className="relative flex h-8 w-8 items-center justify-center cursor-pointer focus:outline-none"
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-gold-400 border border-white flex items-center justify-center shadow-lg">
                        <Eye className="h-2 w-2 text-black" />
                      </span>
                    </button>

                    {/* Hover Card / Tooltip */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-56 p-4 bg-luxury-black/95 border border-gold-500/35 rounded-xl backdrop-blur-md shadow-2xl pointer-events-none text-left"
                      >
                        <h4 className="text-xs font-bold text-white font-serif mb-1 flex items-center">
                          <Info className="h-3 w-3 mr-1 text-gold-400 shrink-0" />
                          {hs.title}
                        </h4>
                        <p className="text-[10px] text-gray-400 leading-normal">{hs.description}</p>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Compass / Orientation indicator overlay */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2 bg-black/60 p-2 rounded-lg border border-white/5 backdrop-blur-md">
            <Compass className="h-4 w-4 text-gold-400 animate-spin-slow" />
            <span className="text-[10px] uppercase font-bold text-white tracking-widest">
              Vantage: {currentLoc.name}
            </span>
          </div>

          {/* Helper banner at bottom */}
          <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center z-10">
            <p className="text-xs text-gray-300 font-medium">
              {currentLoc.description}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
