'use client';

import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-luxury-black border-t border-gold-500/10 pt-20 pb-8 text-gray-400">
      {/* Scroll to Top Trigger */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          onClick={scrollToTop}
          className="p-3 bg-luxury-gray border border-gold-500/20 hover:border-gold-400 text-gold-400 rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-glow group"
          aria-label="Back to Top"
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Brief */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold text-gold-shimmer tracking-wider">
                JDR GOLDEN HEIGHTS
              </span>
              <span className="text-[9px] tracking-[0.2em] text-gray-500 uppercase font-semibold">
                By JDR Goldencity Constructions
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A thoughtfully planned residential community developed near Yadadri, Telangana. Designed to offer modern living infrastructures, excellent connectivity, and outstanding investment returns.
            </p>
            <div className="flex space-x-4">
              {['Facebook', 'Instagram', 'YouTube', 'LinkedIn'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-xs hover:text-gold-400 transition-colors uppercase tracking-wider font-semibold border-b border-transparent hover:border-gold-400"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-6">
              Sitemap & Navigation
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'About Project', href: '#about' },
                { name: 'Highlights', href: '#highlights' },
                { name: 'Amenities', href: '#amenities' },
                { name: 'Master Layout Plan', href: '#layout' },
                { name: 'Pricing Packages', href: '#pricing' },
                { name: 'Interactive Location', href: '#location' },
                { name: 'CRM Admin Panel', href: '/admin' },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-gold-400 transition-colors flex items-center group"
                  >
                    <span className="h-1 w-0 bg-gold-400 group-hover:w-2 transition-all mr-0 group-hover:mr-2 rounded-full" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-6">
              Corporate Office Address
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gold-500 mr-3 shrink-0 mt-0.5" />
                <span>
                  4th Floor, Plot No. 134,
                  <br />
                  Ved Arcade, Snehapuri Colony,
                  <br />
                  Habsiguda, Hyderabad,
                  <br />
                  Telangana - 500076
                </span>
              </li>
              <li>
                <a
                  href="tel:+916262838353"
                  className="flex items-center hover:text-gold-400 transition-colors group"
                >
                  <Phone className="h-5 w-5 text-gold-500 mr-3 group-hover:scale-105 transition-transform" />
                  +91 62628 38353
                </a>
              </li>
              <li>
                <a
                  href="mailto:msunilvijaykar@gmail.com"
                  className="flex items-center hover:text-gold-400 transition-colors group"
                >
                  <Mail className="h-5 w-5 text-gold-500 mr-3 group-hover:scale-105 transition-transform" />
                  msunilvijaykar@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Regulatory details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-6">
              Regulatory Information
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="font-semibold text-white">CIN</p>
                <p className="text-gray-400 tracking-wider">U45203TG2022PTC167590</p>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="font-semibold text-white">Project Approvals</p>
                <p className="text-gray-400">DTCP Approved Layout Layout</p>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-lg">
                <p className="font-semibold text-white">ROC Jurisdiction</p>
                <p className="text-gray-400">ROC Hyderabad (Active Status)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/5 pt-8 pb-8 text-[11px] text-gray-500 leading-relaxed text-justify">
          <p>
            <strong>Disclaimer:</strong> The contents, layout plans, visuals, coordinates, and specifications shown on this website are illustrative and conceptual in nature. They do not constitute an offer, model contract, or assurance of layout elements. The final offering is strictly governed by the official sale agreement execution, DTCP approvals, and relevant regulatory norms. JDR Goldencity Constructions Pvt. Ltd. reserves the right to modify, adjust, or alter layout grids, plot dimensions, and pricing indices without prior announcement.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
          <p>© {currentYear} JDR Goldencity Constructions Pvt. Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-gold-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold-400 transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
