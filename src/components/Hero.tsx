'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Download, PhoneCall, ChevronDown, Check } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import ThreeDShowcase with SSR disabled to optimize Lighthouse metrics
const ThreeDShowcase = dynamic(() => import('./ThreeDShowcase'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] flex items-center justify-center bg-luxury-gray/30 border border-gold-500/10 rounded-2xl backdrop-blur-md">
      <div className="text-xs font-bold uppercase tracking-widest text-lime-gold/60 animate-pulse">
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
    <div ref={containerRef} className="text-center p-5 rounded-2xl glass-panel border border-white/5">
      <div className="text-3xl sm:text-4xl font-serif font-black text-lime-gold mb-1.5 flex items-center justify-center">
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
  const textY = useTransform(scrollY, [0, 800], [0, 220]);
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

      // Lime-gold particles drawing
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `rgba(186, 240, 51, ${p.opacity})`);
        grad.addColorStop(1, 'rgba(186, 240, 51, 0)');
        
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
      {/* Background Particles */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/45 to-transparent" />
      </motion.div>

      {/* Massive Parallax Backdrop Typography */}
      <motion.div 
        style={{ y: textY }}
        className="absolute top-[18%] left-1/2 -translate-x-1/2 text-[13vw] font-sans font-black tracking-tighter text-white/[0.02] uppercase select-none pointer-events-none leading-none z-0 whitespace-nowrap"
      >
        GOLDEN HEIGHTS
      </motion.div>

      {/* Main Split Grid Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col flex-grow justify-center py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Heading, Copy and CTAs */}
          <motion.div
            style={{ opacity: opacityText }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 1.1 }}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-luxury-gray border border-lime-gold/20 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-lime-gold animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gray-300">
                Premium Plotted Development
              </span>
            </div>

            {/* Main Bold Title */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-black text-white leading-[1.05] tracking-tight uppercase">
              DTCP Approved <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-gold via-lime-gold/90 to-emerald-400 block mt-1">Open Plots Near Yadadri</span>
            </h1>

            {/* Subtitle / Starting Price */}
            <div className="flex flex-col sm:flex-row items-baseline gap-2 justify-center lg:justify-start">
              <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Starting From</span>
              <span className="text-3xl sm:text-4xl font-serif font-black text-lime-gold">₹18 Lakhs*</span>
            </div>

            {/* Trust Signals Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-gray-300 py-4 max-w-xl mx-auto lg:mx-0 border-y border-white/5">
              <div className="flex items-center space-x-2.5">
                <Check className="h-4.5 w-4.5 text-lime-gold shrink-0" />
                <span className="font-semibold tracking-wide">✔ DTCP Approved (LP No. 134/2023/H)</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Check className="h-4.5 w-4.5 text-lime-gold shrink-0" />
                <span className="font-semibold tracking-wide">✔ 100% Clear Titles & Link Documents</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Check className="h-4.5 w-4.5 text-lime-gold shrink-0" />
                <span className="font-semibold tracking-wide">✔ Prime Highway Investment Corridor</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Check className="h-4.5 w-4.5 text-lime-gold shrink-0" />
                <span className="font-semibold tracking-wide">✔ Daily Free Site Visit Pickups Available</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenLeadModal}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-lime-gold via-lime-gold/90 to-lime-gold/75 hover:brightness-110 text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 shadow-[0_5px_25px_rgba(186,240,51,0.25)] cursor-pointer group"
              >
                <Calendar className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
                Book Site Visit
              </button>

              <button
                onClick={onOpenBrochureModal}
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white/5 border border-lime-gold/20 hover:border-lime-gold text-lime-gold font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 backdrop-blur-md cursor-pointer hover:shadow-gold-glow hover:bg-white/[0.08]"
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
          </motion.div>

          {/* Right Column: 3D visual showcase with subtle glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 1.1, delay: 0.2 }}
            className="lg:col-span-5 w-full relative flex items-center justify-center animate-fade-in"
          >
            {/* Visual Glass backdrop block */}
            <div className="absolute inset-0 bg-gradient-to-tr from-lime-gold/5 to-white/5 rounded-3xl blur-2xl pointer-events-none" />
            <div className="w-full rounded-2xl border border-white/10 bg-black/45 backdrop-blur-md p-4 relative shadow-2xl overflow-hidden aspect-[4/3] sm:aspect-square lg:aspect-auto">
              <ThreeDShowcase />
            </div>
          </motion.div>

        </div>

        {/* Live Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 1.1, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-5xl mx-auto"
        >
          <CounterStat value={500} suffix="+" label="Plots Sold" />
          <CounterStat value={50} suffix="+" label="Acres Developed" />
          <CounterStat value={100} suffix="%" label="DTCP Approved Layout" />
          <CounterStat value={15} suffix=" Min" label="Near Yadadri Temple" />
        </motion.div>
      </div>

      {/* Down arrow indicator */}
      <motion.button
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        onClick={handleScrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 hover:text-lime-gold z-10 p-2 cursor-pointer"
        aria-label="Scroll Down"
      >
        <ChevronDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
