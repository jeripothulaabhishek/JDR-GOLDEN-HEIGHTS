'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Download, PhoneCall, ChevronDown } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import ThreeDShowcase with SSR disabled to optimize Lighthouse metrics
const ThreeDShowcase = dynamic(() => import('./ThreeDShowcase'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] flex items-center justify-center bg-luxury-gray/30 border border-gold-500/10 rounded-2xl backdrop-blur-md">
      <div className="text-xs font-bold uppercase tracking-widest text-gold-400/60 animate-pulse">
        Initializing 3D Visualizer...
      </div>
    </div>
  ),
});

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
}

function CounterStat({ value, suffix, label }: StatItemProps) {
  const [count, setCount] = React.useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; // ms
    const increment = Math.ceil(value / (duration / 16)); // ~60fps
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isVisible]);

  return (
    <div ref={containerRef} className="text-center p-4 rounded-xl glass-panel border border-white/5">
      <div className="text-3xl sm:text-4xl font-serif font-bold text-gold-400 mb-1 flex items-center justify-center">
        <span>{count}</span>
        <span>{suffix}</span>
      </div>
      <div className="text-[10px] sm:text-xs tracking-widest text-gray-400 uppercase font-sans font-medium">
        {label}
      </div>
    </div>
  );
}

interface HeroProps {
  onOpenLeadModal: () => void;
  onOpenBrochureModal: () => void;
}

export default function Hero({ onOpenLeadModal, onOpenBrochureModal }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Parallax scroll effects
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  // Ambient Particle Canvas effect in background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
    }> = [];

    const particleCount = 40; // Reduced for performance optimization
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        speedY: -Math.random() * 0.3 - 0.05,
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Gold particles drawing
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `rgba(212, 175, 55, ${p.opacity})`);
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
        
        ctx.fillStyle = grad;
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
        if (p.x < 0 || p.x > width) {
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = aboutSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24"
    >
      {/* Background Gold Particles */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent" />
      </motion.div>

      {/* Main Split Grid Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col flex-grow justify-center py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Heading, Copy and CTAs */}
          <motion.div
            style={{ opacity: opacityText }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-950/40 border border-gold-400/20 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-300">
                Premium Residential Community
              </span>
            </div>

            {/* Main Bold Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight">
              Own a Premium Future at <br />
              <span className="text-gold-gradient block mt-1">JDR Golden Heights</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Strategically Located Near Yadadri Temple • Premium Plotted Community • Limited Dussehra Pricing
            </p>

            <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto lg:mx-0 leading-normal">
              Experience modern living, secure investment opportunities, and future-ready infrastructure in Telangana&apos;s fastest growing temple tourism corridor.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenLeadModal}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:brightness-110 text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 shadow-[0_5px_25px_rgba(212,175,55,0.35)] cursor-pointer group"
              >
                <Calendar className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Book Site Visit
              </button>

              <button
                onClick={onOpenBrochureModal}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white/5 border border-gold-500/25 hover:border-gold-400 text-gold-400 font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 backdrop-blur-md cursor-pointer hover:shadow-gold-glow hover:bg-white/[0.08]"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Brochure
              </button>

              <a
                href="https://wa.me/916262838353?text=Hi!%20I%20am%20interested%20in%20JDR%20Golden%20Heights.%20Please%20send%20me%20the%20pricing%20sheet%20and%20brochure."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-emerald-600/10 border border-emerald-500/30 hover:bg-emerald-600/25 text-emerald-400 hover:text-white font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300"
              >
                <PhoneCall className="h-4 w-4 mr-2" />
                WhatsApp Now
              </a>
            </div>

            {/* Quick Price Tags */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 text-[10px] sm:text-xs font-semibold text-gray-400 tracking-wider pt-2">
              <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full">Starting Price ₹18 Lakhs*</span>
              <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full">DTCP Approved</span>
              <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full">Future Growth Corridor</span>
            </div>
          </motion.div>

          {/* Right Column: 3D visual showcase with subtle glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 w-full relative flex items-center justify-center"
          >
            {/* Visual Glass backdrop block */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/5 to-white/5 rounded-3xl blur-2xl pointer-events-none" />
            <div className="w-full rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md p-4 relative shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-square lg:aspect-auto">
              <ThreeDShowcase />
            </div>
          </motion.div>

        </div>

        {/* Live Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl mx-auto"
        >
          <CounterStat value={500} suffix="+" label="Happy Investors" />
          <CounterStat value={100} suffix="+" label="Acres Planned" />
          <CounterStat value={15} suffix=" Min" label="From Yadadri Temple" />
          <CounterStat value={24} suffix="/7" label="CCTV & Security" />
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <motion.button
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 hover:text-gold-400 z-10 p-2 cursor-pointer"
        aria-label="Scroll Down"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
