'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Eye, X, ChevronLeft, ChevronRight, DownloadCloud } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'entrance' | 'roads' | 'layout' | 'amenities' | 'community';
  categoryLabel: string;
  title: string;
  url: string;
}

const galleryImages: GalleryItem[] = [
  {
    id: 'g1',
    category: 'entrance',
    categoryLabel: 'Entrance View',
    title: 'Grand Gatehouse & Boundary Arch',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g2',
    category: 'roads',
    categoryLabel: 'Roads',
    title: '60-Feet Wide Tar Avenue Road',
    url: 'https://images.unsplash.com/photo-1594913785162-e6785b49eed9?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g3',
    category: 'layout',
    categoryLabel: 'Layout Development',
    title: 'Clear-Titled Demarcated Plots',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g4',
    category: 'amenities',
    categoryLabel: 'Amenities',
    title: 'Integrated Children\'s Park Facilities',
    url: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g5',
    category: 'community',
    categoryLabel: 'Community Spaces',
    title: 'Planned Social Clubhouse & Greens',
    url: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g6',
    category: 'entrance',
    categoryLabel: 'Entrance View',
    title: 'Night Elevation & Security Wing',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g7',
    category: 'roads',
    categoryLabel: 'Roads',
    title: 'Internal Crossway 40-Feet Roads',
    url: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g8',
    category: 'amenities',
    categoryLabel: 'Amenities',
    title: 'Continuous Water Supply Overhead Tanks',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
  },
];

const categories = [
  { value: 'all', label: 'All Photos' },
  { value: 'entrance', label: 'Entrance View' },
  { value: 'roads', label: 'Layout Roads' },
  { value: 'layout', label: 'Development' },
  { value: 'amenities', label: 'Amenities' },
  { value: 'community', label: 'Community Spaces' },
];

interface GalleryProps {
  onOpenBrochureModal: () => void;
}

export default function Gallery({ onOpenBrochureModal }: GalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev! - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => (prev === filteredImages.length - 1 ? 0 : prev! + 1));
  };

  return (
    <section id="gallery" className="py-24 bg-luxury-dark relative overflow-hidden">
      {/* Blurs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Project Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Media <span className="text-gold-gradient">Gallery</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Preview current on-site layout development, road infrastructure, green parks, and architectural renderings.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto border-b border-white/5 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeCategory === cat.value
                  ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black shadow-gold-glow'
                  : 'text-gray-400 hover:text-white bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-xl overflow-hidden border border-white/5 aspect-[4/3] bg-luxury-gray cursor-pointer shadow-lg hover:border-gold-500/30 transition-all duration-300"
              >
                {/* Fallback pattern */}
                <div className="absolute inset-0 bg-gradient-to-tr from-luxury-black via-gray-900 to-luxury-gray opacity-80 flex items-center justify-center">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{img.categoryLabel}</span>
                </div>

                {/* Main image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500"
                />

                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
                  <span className="text-[9px] font-extrabold uppercase tracking-widest text-gold-400 mb-1">
                    {img.categoryLabel}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-white mb-2 leading-tight">
                    {img.title}
                  </h4>
                  <div className="flex items-center text-[10px] font-bold text-white/80 uppercase tracking-widest">
                    <Eye className="h-3.5 w-3.5 mr-1.5 text-gold-400" /> View Large
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Dynamic Brochure CTA section */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenBrochureModal}
            className="inline-flex items-center py-4 px-8 bg-white/5 hover:bg-gold-500/10 border border-gold-500/30 hover:border-gold-400 text-gold-400 hover:text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300"
          >
            <DownloadCloud className="h-4.5 w-4.5 mr-2" /> Download Full Layout Brochure &amp; Price List
          </button>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
            
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 transition-colors z-50"
              aria-label="Close Lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Nav */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 p-3 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 transition-colors z-40 hidden sm:block"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Right Nav */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 p-3 rounded-full bg-white/5 border border-white/10 hover:border-gold-400 text-white hover:text-gold-400 transition-colors z-40 hidden sm:block"
              aria-label="Next Image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Center Box */}
            <div
              className="relative max-w-4xl w-full aspect-[4/3] sm:aspect-[16/10] max-h-[80vh] flex flex-col justify-between"
              onClick={() => setLightboxIndex(null)}
            >
              <div className="flex-grow flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={filteredImages[lightboxIndex].url}
                  alt={filteredImages[lightboxIndex].title}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/15"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Caption Overlay */}
              <div
                className="mt-4 p-4 rounded-xl bg-luxury-gray/95 border border-white/10 backdrop-blur-md text-left text-xs sm:text-sm space-y-1"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400">
                    {filteredImages[lightboxIndex].categoryLabel}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold">
                    {lightboxIndex + 1} / {filteredImages.length}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-white text-base">
                  {filteredImages[lightboxIndex].title}
                </h3>
              </div>
            </div>

          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
