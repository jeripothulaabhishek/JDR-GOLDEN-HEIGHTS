'use client';

import React from 'react';
import { Phone, MessageCircle, MapPin, Calendar } from 'lucide-react';

interface StickyMobileCtaProps {
  onOpenLeadModal: (interestText?: string) => void;
}

export default function StickyMobileCta({ onOpenLeadModal }: StickyMobileCtaProps) {
  const handleLocationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('location');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-md border-t border-gold-500/20 md:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
      <div className="grid grid-cols-4 items-center justify-between text-center py-2.5 px-1">
        {/* Call button */}
        <a
          href="tel:+916262838353"
          className="flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors py-1 cursor-pointer"
        >
          <Phone className="h-5 w-5 text-gold-400" />
          <span className="text-[10px] font-semibold tracking-wider mt-1.5 uppercase">Call</span>
        </a>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/916262838353?text=Hi,%20I%20am%20interested%20in%20JDR%20Golden%20Heights."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center text-gray-400 hover:text-emerald-400 transition-colors py-1 cursor-pointer"
        >
          <MessageCircle className="h-5 w-5 text-emerald-500" />
          <span className="text-[10px] font-semibold tracking-wider mt-1.5 uppercase">WhatsApp</span>
        </a>

        {/* Location scroll-to */}
        <a
          href="#location"
          onClick={handleLocationClick}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors py-1 cursor-pointer"
        >
          <MapPin className="h-5 w-5 text-gold-400" />
          <span className="text-[10px] font-semibold tracking-wider mt-1.5 uppercase">Location</span>
        </a>

        {/* Enquire button */}
        <button
          onClick={() => onOpenLeadModal('Sticky Mobile CTA Booking')}
          className="flex flex-col items-center justify-center text-gray-400 hover:text-white transition-colors py-1 focus:outline-none cursor-pointer"
        >
          <Calendar className="h-5 w-5 text-gold-400" />
          <span className="text-[10px] font-semibold tracking-wider mt-1.5 uppercase">Enquire</span>
        </button>
      </div>
    </div>
  );
}
