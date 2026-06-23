'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Compass, Award, ShieldCheck, MapPin, ChevronRight, Check } from 'lucide-react';

interface SeoTab {
  id: string;
  label: string;
  title: string;
  icon: React.ComponentType<any>;
  content: string;
  bullets: string[];
}

const seoTabs: SeoTab[] = [
  {
    id: 'yadadri',
    label: 'Open Plots in Yadadri',
    title: 'High-Appreciation Open Plots Near Yadadri Temple Corridor',
    icon: Landmark,
    content: 'Yadadri (Yadagirigutta) has witnessed an unprecedented transformation into Telangana\'s premier spiritual and tourism hub. The state government\'s massive investment in temple infrastructure has triggered rapid appreciation in land values. JDR Golden Heights is positioned directly inside this growth corridor, offering premium open plots with immediate registration availability and high appreciation prospects.',
    bullets: [
      'Located just 15 minutes from Sri Lakshmi Narasimha Swamy Temple.',
      'Excellent frontage connectivity with wide 60-feet approach roads.',
      'High appreciation potential due to continuous spiritual tourism footfall.',
      'Immediate spot registration with 100% transparent documentation.'
    ]
  },
  {
    id: 'dtcp',
    label: 'DTCP Approved Plots',
    title: '100% Legal Clearance & DTCP Approved Layouts',
    icon: Award,
    content: 'Security and legitimacy are the foundation of JDR Golden Heights. Our residential layout is fully designed and approved under Directorate of Town and Country Planning (DTCP) specifications. Every plot features clearly demarcated boundaries, closed underground drainage, and standard road layouts, ensuring your investment is completely secure from legal hurdles.',
    bullets: [
      'Approved layout parameters conforming to strict DTCP regulations (LP No. 134/2023/H).',
      'Fully cleared link document chains verified by top legal firms.',
      'Demarcated individual plot boundary stones and layout markings.',
      'Bank loan approvals active from SBI, HDFC, and other leading banks.'
    ]
  },
  {
    id: 'premium',
    label: 'Premium Villa Plots Near Hyderabad',
    title: 'Luxury Villa Plots with Modern Civic Infrastructure',
    icon: ShieldCheck,
    content: 'JDR Golden Heights offers premium villa-sized plots (ranging from 150 to 400 Sq. Yards) designed for high-end residential construct. The layout is loaded with modern civic amenities like underground pipelines, overhead water tanks, extensive children\'s play parks, and aesthetic avenue plantations, making it the perfect canvas for your dream luxury villa near Hyderabad.',
    bullets: [
      'Underground electricity conduit layouts and street lamp poles.',
      'Dedicated running water pipelines connected to every individual plot.',
      'Broad 40-feet and 33-feet internal asphalt road grids with concrete curbing.',
      'Premium corner and East/West facing plot selections available.'
    ]
  },
  {
    id: 'investment',
    label: 'Real Estate Investment in Yadadri',
    title: 'Hyderabad-Warangal NH-163 Industrial Investment Corridor',
    icon: Compass,
    content: 'The Hyderabad-to-Yadadri stretch along the Warangal Highway (NH-163) has emerged as the fastest-growing industrial and residential corridor in Telangana. With proposed Regional Ring Road (RRR) connections, industrial SEZ nodes in Ghatkesar and Pocharam, and suburban railway extensions, land values are poised to double in the coming years.',
    bullets: [
      'Direct highway approach avoiding narrow congested interior bypasses.',
      'Minutes away from AIIMS Bibinagar and Pocharam Infosys IT SEZ.',
      'Fast connectivity to Hyderabad Outer Ring Road (ORR) Exit 9.',
      'Excellent hedge against inflation with high-liquidity land assets.'
    ]
  },
  {
    id: 'layout',
    label: 'Golden Heights Layout',
    title: 'Master-Planned 100+ Acres Community Design',
    icon: MapPin,
    content: 'The Golden Heights layout features a meticulous master-planned community structure spanning over 100 acres. Built on high-elevation clear terrain, the project incorporates extensive green open zones, planned clubhouse centers, a grand entry arch, and continuous security checkpoints, providing a peaceful yet secure gated-style living space.',
    bullets: [
      'Grand entry gate arch with 24/7 security watchposts.',
      'Layout-wide CCTV coverage and boundaries protection walls.',
      'Over 10% of total acreage dedicated to parks and community recreation.',
      'Pre-planned zones for supermarkets, pharmacies, and essential utilities.'
    ]
  }
];

export default function LocalSeoSections() {
  const [activeTab, setActiveTab] = useState('yadadri');
  const currentTab = seoTabs.find(t => t.id === activeTab) || seoTabs[0];
  const Icon = currentTab.icon;

  return (
    <section className="py-24 bg-luxury-black border-t border-b border-white/5 relative overflow-hidden">
      {/* Background ambient highlights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-luxury-green-800/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-green-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-lime-gold uppercase">
            Telangana Real Estate Growth
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-white uppercase">
            Yadadri Investment <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-gold to-emerald-400">Intelligence</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Understand the local parameters, regulatory standards, and highway growth dynamics that make Yadadri the most lucrative land investment destination.
          </p>
        </div>

        {/* Desktop Tab Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Tab Selectors */}
          <div className="lg:col-span-4 flex flex-col space-y-2">
            {seoTabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-luxury-light-gray border-lime-gold text-white shadow-[0_4px_20px_rgba(186,240,51,0.15)]'
                      : 'bg-luxury-gray border-white/5 text-gray-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  <span className="flex items-center text-xs sm:text-sm font-semibold uppercase tracking-wider">
                    <TabIcon className={`h-4.5 w-4.5 mr-3 ${isActive ? 'text-lime-gold' : 'text-gray-500'}`} />
                    {tab.label}
                  </span>
                  <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isActive ? 'translate-x-1 text-lime-gold' : 'text-gray-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Content Display Panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-2xl bg-luxury-gray border border-white/5 shadow-2xl space-y-6"
              >
                {/* Header */}
                <div className="flex items-center space-x-3 text-left">
                  <div className="p-3 bg-luxury-light-gray border border-lime-gold/20 text-lime-gold rounded-xl">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-sans font-black text-white uppercase leading-tight">
                    {currentTab.title}
                  </h3>
                </div>

                {/* Body Text */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed text-justify">
                  {currentTab.content}
                </p>

                {/* Bullet Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/5 text-left">
                  {currentTab.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <span className="p-0.5 bg-luxury-light-gray border border-lime-gold/30 text-lime-gold rounded-full mt-0.5 shrink-0">
                        <Check className="h-3 w-3" />
                      </span>
                      <span className="text-xs text-gray-400 leading-normal">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
