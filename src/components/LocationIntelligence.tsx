'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, Landmark, Car, Train, Activity, Route, Map, Sparkles } from 'lucide-react';

interface LandmarkData {
  id: string;
  name: string;
  distance: string;
  time: string;
  description: string;
  icon: React.ComponentType<any>;
  x: number; // SVG coordinate
  y: number; // SVG coordinate
  mapUrl: string;
}

const landmarks: LandmarkData[] = [
  {
    id: 'temple',
    name: 'Yadadri Sri Lakshmi Narasimha Swamy Temple',
    distance: '12 km',
    time: '15 Mins',
    icon: Landmark,
    x: 420,
    y: 90,
    description: 'Renowned spiritual pilgrimage shrine receiving massive tourist influx, driving rapid local growth.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15217.151740925345!2d78.966779435345!3d17.541484435345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb658bb279a0cf%3A0xe54e6fc27d35368a!2sYadadri%20Temple%20Gopuram!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
  },
  {
    id: 'highway',
    name: 'NH-163 Hyderabad-Warangal Highway',
    distance: '6 km',
    time: '10 Mins',
    icon: Navigation,
    x: 400,
    y: 280,
    description: 'Direct high-speed four-lane access corridor connecting the layout directly to outer ring highways.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243294.6738914383!2d78.537651!3d17.435052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a24c2d3cf3b%3A0xf6a8c43916694ea5!2sNH163%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000005!5m2!1sen!2sin'
  },
  {
    id: 'aiims',
    name: 'AIIMS Bibinagar University Hospital',
    distance: '22 km',
    time: '20 Mins',
    icon: Activity,
    x: 100,
    y: 110,
    description: 'Premier national university medical institute offering top-tier healthcare & driving regional housing demand.',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.9715102553075!2d78.790906!3d17.413158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb797ad2f890cf%3A0x6b4f7a7d2f890cf!2sAIIMS%20Bibinagar!5e0!3m2!1sen!2sin!4v1700000000006!5m2!1sen!2sin'
  },
  {
    id: 'orr',
    name: 'Outer Ring Road (ORR) Ghatkesar Junction',
    distance: '42 km',
    time: '45 Mins',
    icon: Car,
    x: 80,
    y: 270,
    description: 'Provides seamless access to Hyderabad IT hubs (Pocharam Infosys SEZ, Uppal, and Gachibowli).',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5147571342677!2d78.53765107596853!3d17.435052901428383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a24c2d3cf3b%3A0xf6a8c43916694ea5!2sSnehapuri%20Colony%2C%20Habsiguda%2C%20Hyderabad%2C%20Telangana%20500076!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin'
  }
];

export default function LocationIntelligence() {
  const [activeId, setActiveId] = useState<string>('temple');

  const activeLandmark = landmarks.find((l) => l.id === activeId) || landmarks[0];

  return (
    <section id="location" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-luxury-green-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-lime-gold uppercase">
            Strategic Connectivity
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-white uppercase">
            Location <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-gold to-emerald-400">Intelligence</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            JDR Golden Heights is positioned directly in Telangana\'s primary growth corridor. Click on any nearby node below to check distances and connectivities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Interactive Schematic Vector Map */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-luxury-gray border border-white/5 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 left-4 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-lime-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                Interactive Connectivity Map
              </span>
            </div>

            {/* SVG Interactive Visual Grid */}
            <div className="w-full aspect-[4/3] bg-black/30 border border-white/5 rounded-2xl p-2 mt-4 relative">
              <svg className="w-full h-full" viewBox="0 0 500 380">
                {/* Background grid dots pattern */}
                <defs>
                  <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="0.8" fill="rgba(186, 240, 51, 0.08)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dotGrid)" />

                {/* Connection lines from JDR node (250, 190) */}
                {landmarks.map((l) => {
                  const isActive = l.id === activeId;
                  return (
                    <g key={`line-${l.id}`}>
                      {/* Base line */}
                      <line
                        x1="250"
                        y1="190"
                        x2={l.x}
                        y2={l.y}
                        stroke={isActive ? '#baf033' : 'rgba(255, 255, 255, 0.15)'}
                        strokeWidth={isActive ? '2.5' : '1.5'}
                        strokeDasharray={isActive ? '8,4' : '0'}
                        className="transition-all duration-300"
                      />
                      {isActive && (
                        /* Glowing overlay path animation */
                        <motion.line
                          x1="250"
                          y1="190"
                          x2={l.x}
                          y2={l.y}
                          stroke="#baf033"
                          strokeWidth="2.5"
                          strokeDasharray="8,4"
                          animate={{ strokeDashoffset: [-20, 0] }}
                          transition={{ repeat: Infinity, ease: 'linear', duration: 1.2 }}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Central Node: JDR GOLDEN HEIGHTS */}
                <g transform="translate(250, 190)" className="cursor-pointer">
                  {/* Glowing ring */}
                  <circle r="22" fill="rgba(186, 240, 51, 0.1)" stroke="rgba(186, 240, 51, 0.3)" strokeWidth="1" />
                  <motion.circle
                    r="22"
                    fill="none"
                    stroke="#baf033"
                    strokeWidth="1"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                  />
                  <circle r="12" fill="#040806" stroke="#baf033" strokeWidth="2.5" />
                  <circle r="4" fill="#baf033" />
                  <text y="-28" fill="#ffffff" fontSize="9" fontWeight="black" fontFamily="sans-serif" textAnchor="middle" letterSpacing="1">
                    JDR GOLDEN HEIGHTS
                  </text>
                </g>

                {/* Landmark Target Nodes */}
                {landmarks.map((l) => {
                  const isActive = l.id === activeId;
                  const LIcon = l.icon;
                  return (
                    <g
                      key={`node-${l.id}`}
                      transform={`translate(${l.x}, ${l.y})`}
                      className="cursor-pointer"
                      onClick={() => setActiveId(l.id)}
                    >
                      {/* Active border glow */}
                      <circle
                        r="18"
                        fill={isActive ? 'rgba(186, 240, 51, 0.15)' : '#070e0b'}
                        stroke={isActive ? '#baf033' : 'rgba(255, 255, 255, 0.15)'}
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                      {isActive && (
                        <circle r="23" fill="none" stroke="#baf033" strokeWidth="0.8" strokeDasharray="3,3" className="animate-spin-slow" />
                      )}
                      
                      {/* Node indicator */}
                      <circle r="6" fill={isActive ? '#baf033' : '#374151'} className="transition-all duration-300" />
                      
                      {/* Text label */}
                      <text
                        y={l.y > 190 ? '30' : '-24'}
                        fill={isActive ? '#baf033' : '#9ca3af'}
                        fontSize="9"
                        fontWeight={isActive ? 'black' : 'semibold'}
                        fontFamily="sans-serif"
                        textAnchor="middle"
                        className="transition-colors duration-300"
                      >
                        {l.id === 'temple' ? 'Yadadri Temple' :
                         l.id === 'highway' ? 'NH-163 Highway' :
                         l.id === 'aiims' ? 'AIIMS Hospital' : 'ORR Junction'}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Click Node Instruction */}
            <div className="mt-4 text-center text-[10px] text-gray-500 uppercase tracking-widest">
              Click nodes above to toggle distance metrics
            </div>
          </div>

          {/* Right Column: Google Maps Integrations & Address Info Card */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-3xl bg-luxury-gray border border-white/5 shadow-2xl relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-lime-gold to-emerald-400" />
            
            {/* Header info for active landmark */}
            <div className="border-b border-white/5 pb-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-lime-gold">Active Destination Details</span>
                <h3 className="text-xl font-serif font-black text-white mt-1 flex items-center gap-1.5">
                  <MapPin className="h-5 w-5 text-lime-gold shrink-0" />
                  {activeLandmark.name}
                </h3>
              </div>
              
              {/* Highlight Metrics tag */}
              <div className="flex gap-2 shrink-0">
                <div className="px-3 py-1.5 bg-luxury-green-900 border border-lime-gold/25 text-lime-gold rounded-lg text-xs font-black uppercase tracking-wider">
                  ⏱ {activeLandmark.time}
                </div>
                <div className="px-3 py-1.5 bg-white/5 border border-white/10 text-white rounded-lg text-xs font-black uppercase tracking-wider">
                  📍 {activeLandmark.distance}
                </div>
              </div>
            </div>

            {/* Maps iframe container */}
            <div className="w-full flex-grow rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-black">
              <iframe
                title={`${activeLandmark.name} Maps Guide`}
                src={activeLandmark.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(10%) contrast(90%)' }} // Premium Dark Maps
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Description Summary */}
            <div className="mt-6 pt-4 border-t border-white/5 text-xs sm:text-sm text-gray-400 text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-grow max-w-xl">
                <p className="font-semibold text-white">Landmark Growth Impact:</p>
                <p className="text-gray-400 mt-1 leading-relaxed text-justify">{activeLandmark.description}</p>
              </div>
              <a
                href={activeLandmark.id === 'temple' ? 'https://maps.google.com/?q=Yadadri+Temple' : 'https://maps.google.com/?q=Habsiguda+Hyderabad'}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 bg-gradient-to-r from-lime-gold to-emerald-400 hover:brightness-110 text-black rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 shrink-0 cursor-pointer"
              >
                Get Directions
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
