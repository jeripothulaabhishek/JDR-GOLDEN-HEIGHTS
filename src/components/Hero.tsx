'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Download, PhoneCall, ChevronDown } from 'lucide-react';

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
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  // Gold Particle Canvas effect
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

    // Create particles
    const particleCount = 65;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.5,
        speedY: -Math.random() * 0.4 - 0.1, // Floating upwards slowly
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw dark overlay grid pattern
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Render gold particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        
        // Gradient for glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `rgba(212, 175, 55, ${p.opacity})`);
        grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
        
        ctx.fillStyle = grad;
        ctx.fill();

        // Update positions
        p.y += p.speedY;
        p.x += p.speedX;

        // Reset if floats off-screen
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
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20"
    >
      {/* Background canvas for gold particles */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full block" />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/45 to-transparent" />
      </motion.div>

      {/* Main Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full flex flex-col flex-grow justify-center py-12">
        <motion.div
          style={{ opacity: opacityText }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-950/40 border border-gold-400/20 backdrop-blur-md mb-8">
            <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-300">
              Premium Residential Community
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Own a Premium Future at <br />
            <span className="text-gold-gradient block mt-2">JDR Golden Heights</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Strategically Located Near Yadadri Temple • Premium Plotted Community • Limited Dussehra Pricing
          </p>

          <p className="text-sm sm:text-base text-gray-400 mb-10 max-w-2xl mx-auto">
            Experience modern living, secure investment opportunities, and future-ready infrastructure in Telangana&apos;s fastest growing corridor.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
            {/* Primary CTA */}
            <button
              onClick={onOpenLeadModal}
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 hover:brightness-110 text-black font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 shadow-[0_5px_25px_rgba(212,175,55,0.35)] cursor-pointer group"
            >
              <Calendar className="h-4 w-4 mr-2 transition-transform group-hover:scale-110" />
              Book Site Visit
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onOpenBrochureModal}
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-white/5 border border-gold-500/25 hover:border-gold-400 text-gold-400 font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300 backdrop-blur-md cursor-pointer hover:shadow-gold-glow hover:bg-white/[0.08]"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Brochure
            </button>

            {/* WhatsApp CTA Link */}
            <a
              href="https://wa.me/916262838353?text=Hi,%20I%20am%20interested%20in%20JDR%20Golden%20Heights."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center px-8 py-4 bg-emerald-600/10 border border-emerald-500/30 hover:bg-emerald-600/25 text-emerald-400 hover:text-white font-bold uppercase tracking-widest text-xs rounded-lg transition-all duration-300"
            >
              <PhoneCall className="h-4 w-4 mr-2" />
              WhatsApp Now
            </a>
          </div>

          {/* Quick price tags */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-gray-400 tracking-wider">
            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full">Starting Price ₹18 Lakhs*</span>
            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full">DTCP Approved</span>
            <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-full">Future Growth Corridor</span>
          </div>
        </motion.div>

        {/* Live Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
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
