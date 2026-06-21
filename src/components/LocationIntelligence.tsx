'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Car, Landmark, Train, Plane, Map } from 'lucide-react';

interface RoutePoint {
  destination: string;
  distance: string;
  time: string;
  icon: React.ComponentType<any>;
  description: string;
}

const routes: RoutePoint[] = [
  {
    destination: 'Yadadri Sri Lakshmi Narasimha Swamy Temple',
    distance: '12 km',
    time: '15 Mins',
    icon: Landmark,
    description: 'Renowned spiritual pilgrimage shrine, seeing massive tourist inflow and local infrastructure growth.',
  },
  {
    destination: 'NH-163 Hyderabad-Warangal Highway',
    distance: '6 km',
    time: '10 Mins',
    icon: Navigation,
    description: 'Direct high-speed four-lane access highway linking the project site to outer ring roads.',
  },
  {
    destination: 'Hyderabad Outer Ring Road (ORR) Ghatkesar',
    distance: '42 km',
    time: '45 Mins',
    icon: Car,
    description: 'Fast entry to Hyderabad\'s main IT hubs (Pocharam Infosys SEZ, Uppal, and Gachibowli).',
  },
  {
    destination: 'Bhongir Railway Station',
    distance: '10 km',
    time: '12 Mins',
    icon: Train,
    description: 'Convenient rail connects linking to Secunderabad and upcoming MMTS extension grids.',
  },
  {
    destination: 'Rajiv Gandhi International Airport (RGIA)',
    distance: '85 km',
    time: '90 Mins',
    icon: Plane,
    description: 'Seamless flight connects reached via the Nehru Outer Ring Road corridor.',
  },
];

// Embed maps for both locations
const MAP_SITE_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15217.151740925345!2d78.966779435345!3d17.541484435345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb658bb279a0cf%3A0xe54e6fc27d35368a!2sYadadri%20Temple%20Gopuram!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin';
const MAP_OFFICE_URL = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.5147571342677!2d78.53765107596853!3d17.435052901428383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a24c2d3cf3b%3A0xf6a8c43916694ea5!2sSnehapuri%20Colony%2C%20Habsiguda%2C%20Hyderabad%2C%20Telangana%20500076!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin';

export default function LocationIntelligence() {
  const [activeMap, setActiveMap] = useState<'site' | 'office'>('site');

  return (
    <section id="location" className="py-24 bg-luxury-black relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Strategic Connectivity
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Location <span className="text-gold-gradient">Intelligence</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Conveniently positioned in Telangana&apos;s primary growth corridor. JDR Golden Heights combines serene living with excellent connectivity to core Hyderabad hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Connectivity dashboard timeline */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-serif font-semibold text-white mb-6 flex items-center">
              <MapPin className="h-5 w-5 text-gold-400 mr-2" /> Nearby Landmarks &amp; Travel times
            </h3>

            <div className="relative pl-6 border-l border-gold-500/20 space-y-8">
              {routes.map((route, idx) => {
                const Icon = route.icon;
                return (
                  <div key={route.destination} className="relative">
                    {/* Glowing Bullet point */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-luxury-gray border-2 border-gold-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                    </span>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <h4 className="font-bold text-white tracking-wide pr-2 flex items-center">
                          <Icon className="h-4 w-4 text-gold-400 mr-1.5 shrink-0" />
                          {route.destination}
                        </h4>
                        <span className="text-gold-400 font-bold shrink-0 bg-gold-950/40 border border-gold-500/25 px-2 py-0.5 rounded text-[11px]">
                          {route.time}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed text-justify">
                        {route.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Google Maps Integrations with toggle tab */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 rounded-2xl bg-luxury-gray border border-white/5 shadow-2xl">
            
            {/* Map Select Tabs */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center">
                <Map className="h-4 w-4 mr-1.5 text-gold-500" /> Google Maps Directory
              </span>
              <div className="flex bg-black/60 rounded-lg p-1 border border-white/5">
                <button
                  onClick={() => setActiveMap('site')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${
                    activeMap === 'site'
                      ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Yadadri Project Site
                </button>
                <button
                  onClick={() => setActiveMap('office')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${
                    activeMap === 'office'
                      ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Habsiguda Office
                </button>
              </div>
            </div>

            {/* Maps iframe container */}
            <div className="w-full flex-grow rounded-xl overflow-hidden border border-white/10 aspect-[16/10] bg-black">
              {activeMap === 'site' ? (
                <iframe
                  title="Yadadri Site Map Locator"
                  src={MAP_SITE_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(10%) contrast(90%)' }} // Premium Dark-styled Maps
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              ) : (
                <iframe
                  title="Habsiguda Head Office Map Locator"
                  src={MAP_OFFICE_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(10%) contrast(90%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>

            {/* Address Details summary beneath active map */}
            <div className="mt-6 pt-4 border-t border-white/5 text-xs sm:text-sm text-gray-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {activeMap === 'site' ? (
                <div>
                  <p className="font-semibold text-white">Yadadri Site Location:</p>
                  <p className="text-gray-400 mt-1">Near Sri Lakshmi Narasimha Swamy Temple, Yadadri Bhuvanagiri, Telangana.</p>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-white">Corporate Head Office Address:</p>
                  <p className="text-gray-400 mt-1">4th Floor, Plot No. 134, Ved Arcade, Habsiguda, Hyderabad, TS - 500076.</p>
                </div>
              )}
              <a
                href={activeMap === 'site' ? 'https://maps.google.com/?q=Yadadri+Temple' : 'https://maps.google.com/?q=Habsiguda+Hyderabad'}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 bg-white/5 hover:bg-gold-500/10 border border-gold-500/30 text-gold-400 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300"
              >
                Get Navigation
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
