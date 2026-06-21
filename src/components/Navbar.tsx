'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ShieldCheck, HelpCircle, FileText, ChevronDown, Sparkles } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Amenities', href: '#amenities' },
  { name: 'Layout Plan', href: '#layout' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Location', href: '#location' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenLeadModal: () => void;
}

export default function Navbar({ onOpenLeadModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  // Monitor scroll to trigger navbar solid state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor intersection to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Trigger near center of viewport
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.href.replace('#', ''));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-navbar py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-gold-500/10'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex flex-col group">
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-widest text-gold-shimmer">
                JDR GOLDEN HEIGHTS
              </span>
              <span className="text-[9px] tracking-[0.25em] text-gray-400 group-hover:text-gold-400 transition-colors uppercase font-sans">
                Luxury Plotted Development
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-md ${
                      isActive ? 'text-gold-400' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavLine"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-700"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}

              {/* Mega Menu Toggle Link */}
              <div className="relative">
                <button
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                  className="flex items-center px-4 py-2 text-sm font-medium tracking-wide uppercase text-gray-300 hover:text-gold-400 transition-colors"
                >
                  Quick Info <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {megaMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.2 }}
                      onMouseLeave={() => setMegaMenuOpen(false)}
                      className="absolute right-0 mt-3 w-80 glass-panel border border-gold-500/20 rounded-xl p-6 shadow-2xl z-50 text-left"
                    >
                      <h4 className="text-xs font-semibold tracking-widest text-gold-400 uppercase mb-4 flex items-center">
                        <Sparkles className="h-3 w-3 mr-1 text-gold-400 animate-pulse" /> Project Highlights
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <ShieldCheck className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">DTCP Approved Layout</p>
                            <p className="text-xs text-gray-400">100% legal title clear documentation.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <HelpCircle className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">Why Near Yadadri?</p>
                            <p className="text-xs text-gray-400">High-appreciation temple growth corridor.</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">Dussehra Festive Offer</p>
                            <p className="text-xs text-gray-400">Starting from ₹18L (Limited Plots).</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5 pt-4 border-t border-white/5">
                        <button
                          onClick={() => {
                            setMegaMenuOpen(false);
                            onOpenLeadModal();
                          }}
                          className="w-full text-center py-2.5 px-4 bg-gradient-to-r from-gold-600 to-gold-400 text-black text-xs font-bold uppercase rounded-lg hover:brightness-110 transition-all shadow-[0_4px_15px_rgba(212,175,55,0.2)]"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="tel:+916262838353"
                className="flex items-center text-sm font-medium text-gray-300 hover:text-gold-400 transition-colors"
              >
                <Phone className="h-4 w-4 mr-2 text-gold-500" />
                +91 62628 38353
              </a>
              <button
                onClick={onOpenLeadModal}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold tracking-widest uppercase text-white rounded-lg group bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 group-hover:from-gold-300 group-hover:to-gold-700 focus:ring-2 focus:outline-none focus:ring-gold-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-luxury-black rounded-md group-hover:bg-opacity-0">
                  Book Site Visit
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Trigger */}
            <div className="flex lg:hidden items-center space-x-3">
              <a
                href="tel:+916262838353"
                className="p-2 rounded-full border border-gold-500/20 text-gold-400 bg-white/5"
                aria-label="Call JDR Golden Heights"
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                aria-label="Open Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-over Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 w-80 h-full bg-luxury-gray border-l border-gold-500/20 z-50 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/5 pb-5">
                  <div className="flex flex-col">
                    <span className="text-lg font-serif font-bold text-gold-400">JDR GOLDEN HEIGHTS</span>
                    <span className="text-[8px] tracking-[0.2em] text-gray-500 uppercase">Yadadri Corridor</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-md text-gray-400 hover:text-white"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-8 flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-base font-medium text-gray-300 hover:text-gold-400 transition-colors uppercase tracking-wider py-1"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 space-y-4">
                <a
                  href="tel:+916262838353"
                  className="flex items-center justify-center py-3 border border-white/10 rounded-lg text-sm font-semibold text-gray-300"
                >
                  <Phone className="h-4 w-4 mr-2 text-gold-500" />
                  Call Support
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLeadModal();
                  }}
                  className="w-full text-center py-3 bg-gradient-to-r from-gold-600 via-gold-50 to-gold-400 bg-[size:200%] hover:bg-[100%] text-black font-bold uppercase rounded-lg text-xs tracking-wider transition-all duration-500 shadow-gold-glow hover:shadow-gold-glow-hover"
                >
                  Schedule Site Visit
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
