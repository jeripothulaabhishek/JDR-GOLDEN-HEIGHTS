'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, RefreshCw, X, MessageCircle, Calendar, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

interface PlotData {
  id: string;
  number: string;
  size: string; // e.g. "200 Sq. Yds."
  price: string; // e.g. "₹18.0 L"
  status: 'Available' | 'Blocked' | 'Sold';
  x: number;
  y: number;
  width: number;
  height: number;
  facing: 'East' | 'West' | 'North' | 'Corner';
  dimensions: string;
}

// Seeding JDR layout plot details with rich meta details
const plots: PlotData[] = [
  // Row 1
  { id: 'p1', number: '101', size: '200 Sq. Yds.', price: '₹18.0 L', status: 'Available', x: 50, y: 120, width: 45, height: 60, facing: 'East', dimensions: "45' x 40'" },
  { id: 'p2', number: '102', size: '200 Sq. Yds.', price: '₹18.0 L', status: 'Available', x: 100, y: 120, width: 45, height: 60, facing: 'East', dimensions: "45' x 40'" },
  { id: 'p3', number: '103', size: '200 Sq. Yds.', price: '₹18.0 L', status: 'Blocked', x: 150, y: 120, width: 45, height: 60, facing: 'West', dimensions: "45' x 40'" },
  { id: 'p4', number: '104', size: '200 Sq. Yds.', price: '₹18.0 L', status: 'Sold', x: 200, y: 120, width: 45, height: 60, facing: 'West', dimensions: "45' x 40'" },
  { id: 'p5', number: '105', size: '250 Sq. Yds.', price: '₹22.5 L', status: 'Available', x: 250, y: 120, width: 55, height: 60, facing: 'East', dimensions: "50' x 45'" },
  { id: 'p6', number: '106', size: '250 Sq. Yds.', price: '₹22.5 L', status: 'Available', x: 310, y: 120, width: 55, height: 60, facing: 'East', dimensions: "50' x 45'" },
  { id: 'p7', number: '107', size: '300 Sq. Yds.', price: '₹27.0 L', status: 'Sold', x: 370, y: 120, width: 65, height: 60, facing: 'Corner', dimensions: "60' x 45'" },
  
  // Row 2
  { id: 'p8', number: '201', size: '180 Sq. Yds.', price: '₹16.2 L', status: 'Available', x: 50, y: 220, width: 45, height: 60, facing: 'North', dimensions: "40' x 40'" },
  { id: 'p9', number: '202', size: '180 Sq. Yds.', price: '₹16.2 L', status: 'Available', x: 100, y: 220, width: 45, height: 60, facing: 'North', dimensions: "40' x 40'" },
  { id: 'p10', number: '203', size: '180 Sq. Yds.', price: '₹16.2 L', status: 'Sold', x: 150, y: 220, width: 45, height: 60, facing: 'West', dimensions: "40' x 40'" },
  { id: 'p11', number: '204', size: '200 Sq. Yds.', price: '₹18.0 L', status: 'Available', x: 200, y: 220, width: 45, height: 60, facing: 'East', dimensions: "45' x 40'" },
  { id: 'p12', number: '205', size: '220 Sq. Yds.', price: '₹19.8 L', status: 'Available', x: 250, y: 220, width: 50, height: 60, facing: 'West', dimensions: "48' x 42'" },
  { id: 'p13', number: '206', size: '220 Sq. Yds.', price: '₹19.8 L', status: 'Blocked', x: 305, y: 220, width: 50, height: 60, facing: 'Corner', dimensions: "48' x 42'" },
  
  // Row 3 (Premium Phase 1 plots near park)
  { id: 'p14', number: '301', size: '240 Sq. Yds.', price: '₹21.6 L', status: 'Available', x: 50, y: 340, width: 50, height: 60, facing: 'East', dimensions: "48' x 45'" },
  { id: 'p15', number: '302', size: '240 Sq. Yds.', price: '₹21.6 L', status: 'Blocked', x: 105, y: 340, width: 50, height: 60, facing: 'East', dimensions: "48' x 45'" },
  { id: 'p16', number: '303', size: '300 Sq. Yds.', price: '₹27.0 L', status: 'Available', x: 300, y: 340, width: 65, height: 60, facing: 'Corner', dimensions: "60' x 45'" },
  { id: 'p17', number: '304', size: '350 Sq. Yds.', price: '₹31.5 L', status: 'Available', x: 370, y: 340, width: 75, height: 60, facing: 'West', dimensions: "65' x 48'" },
];

interface MasterLayoutProps {
  onOpenLeadModal: (plotInfo?: string) => void;
}

export default function MasterLayout({ onOpenLeadModal }: MasterLayoutProps) {
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [hoveredPlot, setHoveredPlot] = useState<PlotData | null>(null);
  const [selectedPlot, setSelectedPlot] = useState<PlotData | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setHoveredPlot(null);
    setSelectedPlot(null);
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    // Only drag if not clicking a plot specifically
    if ((e.target as SVGElement).tagName === 'rect') return;
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragStart) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => {
    setDragStart(null);
  };

  // Upgraded zoom-to-plot configurator transform physics
  const handlePlotClick = (plot: PlotData) => {
    if (plot.status === 'Sold') return;
    
    setSelectedPlot(plot);

    // Centering calculation: Target zoom 2.0
    const targetZoom = 1.8;
    const plotCenterX = plot.x + plot.width / 2;
    const plotCenterY = plot.y + plot.height / 2;

    // Center in coordinates: (500 - plotCenterX * targetZoom)
    // Offset left slightly to make space for the right configurator panel
    const offsetPanelX = 350; 
    setZoom(targetZoom);
    setPanX(offsetPanelX - plotCenterX * targetZoom);
    setPanY(300 - plotCenterY * targetZoom);
  };

  return (
    <section id="layout" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Decorative Radial Green Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-luxury-green-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-lime-gold uppercase">
            Interactive Visual Configurator
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black text-white uppercase">
            Blueprint <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-gold to-emerald-400">Interactive Map</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Click on any available plot below to trigger automatic zoom and review pricing, dimensions, and reserve slots directly.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs font-semibold uppercase tracking-wider">
          <div className="flex items-center space-x-2">
            <span className="h-3.5 w-3.5 rounded bg-lime-gold border border-lime-gold/30" />
            <span className="text-white">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-3.5 w-3.5 rounded bg-amber-600 border border-amber-500" />
            <span className="text-gray-400">Blocked</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-3.5 w-3.5 rounded bg-gray-800 border border-gray-700" />
            <span className="text-gray-500">Sold Out</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-3.5 w-3.5 rounded bg-emerald-950/40 border border-emerald-500/25" />
            <span className="text-emerald-400">Parks & Green Zones</span>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl border border-white/10 overflow-hidden bg-luxury-gray aspect-[16/10] sm:aspect-[16/9] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          
          {/* Zoom Controls Overlay */}
          <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
            <button
              onClick={handleZoomIn}
              className="p-3 bg-luxury-black/85 border border-lime-gold/25 hover:border-lime-gold text-lime-gold rounded-xl backdrop-blur-md transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-3 bg-luxury-black/85 border border-lime-gold/25 hover:border-lime-gold text-lime-gold rounded-xl backdrop-blur-md transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-luxury-black/85 border border-lime-gold/25 hover:border-lime-gold text-lime-gold rounded-xl backdrop-blur-md transition-colors cursor-pointer"
              title="Reset View"
            >
              <RefreshCw className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Interactive SVG Map Visualizer */}
          <svg
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            viewBox="0 0 1000 600"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Zoom / Pan Group transform with Framer Motion spring parameters */}
            <g
              transform={`translate(${panX}, ${panY}) scale(${zoom})`}
              className="transition-transform duration-500 ease-out origin-center"
            >
              {/* Layout boundaries */}
              <rect x="20" y="20" width="960" height="560" rx="15" fill="none" stroke="rgba(186, 240, 51, 0.15)" strokeWidth="3" />
              
              {/* Grand Entrance Arch area */}
              <rect x="20" y="240" width="15" height="120" rx="3" fill="#baf033" opacity="0.8" />
              <text x="30" y="305" fill="#baf033" fontSize="11" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-90 30 305)" textAnchor="middle">
                GRAND ENTRANCE
              </text>
 
              {/* Main Avenue 60-feet road */}
              <rect x="35" y="260" width="925" height="80" fill="#111c16" />
              <text x="500" y="305" fill="#2d5041" fontSize="12" fontWeight="bold" fontFamily="sans-serif" letterSpacing="5" textAnchor="middle">
                MAIN AVENUE 60 FEET ROAD
              </text>
              <line x1="35" y1="300" x2="960" y2="300" stroke="#baf033" strokeWidth="2" strokeDasharray="15,10" opacity="0.3" />
 
              {/* Cross roads */}
              <rect x="460" y="20" width="60" height="560" fill="#111c16" />
              <line x1="490" y1="20" x2="490" y2="580" stroke="#baf033" strokeWidth="2" strokeDasharray="15,10" opacity="0.3" />
 
              {/* Green Park Zones */}
              <rect x="160" y="340" width="130" height="180" rx="10" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
              <text x="225" y="430" fill="#10b981" fontSize="12" fontWeight="bold" fontFamily="serif" textAnchor="middle">
                CHILDREN&apos;S PARK
              </text>
              <text x="225" y="445" fill="#10b981" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                &amp; GREEN AVENUE
              </text>
 
              {/* Clubhouse Area */}
              <rect x="530" y="340" width="180" height="150" rx="10" fill="rgba(186, 240, 51, 0.08)" stroke="rgba(186, 240, 51, 0.3)" strokeWidth="1.5" />
              <rect x="580" y="375" width="80" height="60" rx="5" fill="#030705" stroke="#baf033" strokeWidth="1" />
              <text x="620" y="410" fill="#baf033" fontSize="12" fontWeight="bold" fontFamily="serif" textAnchor="middle">
                CLUBHOUSE
              </text>
              <text x="620" y="450" fill="rgba(186, 240, 51, 0.6)" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                PLANNED CLUB SITE
              </text>
 
              {/* Yadadri Temple Sightline indicator */}
              <path d="M 850 50 L 920 50 L 885 20 Z" fill="rgba(186, 240, 51, 0.15)" stroke="#baf033" strokeWidth="1" />
              <text x="885" y="70" fill="#baf033" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                TEMPLE SIGHTLINE
              </text>
 
              {/* Plot grids */}
              {plots.map((plot) => {
                const isHovered = hoveredPlot?.id === plot.id;
                const isSelected = selectedPlot?.id === plot.id;
                let strokeColor = 'rgba(186, 240, 51, 0.2)';
                let fillColor = 'rgba(186, 240, 51, 0.08)';
 
                if (plot.status === 'Sold') {
                  strokeColor = '#1f2937';
                  fillColor = '#111827';
                } else if (plot.status === 'Blocked') {
                  strokeColor = '#d97706';
                  fillColor = 'rgba(217, 119, 6, 0.12)';
                } else if (isSelected) {
                  strokeColor = '#baf033';
                  fillColor = 'rgba(186, 240, 51, 0.35)';
                } else if (isHovered) {
                  strokeColor = '#baf033';
                  fillColor = 'rgba(186, 240, 51, 0.2)';
                }
 
                return (
                  <g key={plot.id} className="cursor-pointer" onClick={() => handlePlotClick(plot)}>
                    <rect
                      x={plot.x}
                      y={plot.y}
                      width={plot.width}
                      height={plot.height}
                      rx="3"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isHovered || isSelected ? 2 : 1}
                      className="transition-all duration-200"
                      onMouseEnter={() => setHoveredPlot(plot)}
                      onMouseLeave={() => setHoveredPlot(null)}
                    />
                    <text
                      x={plot.x + plot.width / 2}
                      y={plot.y + plot.height / 2 + 4}
                      fill={plot.status === 'Sold' ? '#374151' : '#ffffff'}
                      fontSize="9"
                      fontWeight="bold"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {plot.number}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Blueprint Configurator Sidebar (AnimatePresence layoutId) */}
          <AnimatePresence>
            {selectedPlot && (
              <motion.div
                initial={{ opacity: 0, x: 120 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 120 }}
                transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 1.1 }}
                className="absolute top-4 right-4 bottom-4 z-20 w-80 p-6 bg-luxury-gray/95 border border-lime-gold/30 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col justify-between text-left"
              >
                <div>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest text-lime-gold flex items-center gap-1">
                        <Sparkles className="h-3 w-3" /> Plot Configurator
                      </span>
                      <h4 className="text-xl font-serif font-black text-white mt-1">
                        Plot Details #{selectedPlot.number}
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedPlot(null)}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-lime-gold text-gray-400 hover:text-white transition-all cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Status */}
                  <div className="mb-6 flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded-xl">
                    <span className="text-xs text-gray-400">Layout Status:</span>
                    <div className="flex items-center gap-1.5">
                      {selectedPlot.status === 'Available' ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-lime-gold" />
                          <span className="text-xs text-lime-gold font-bold uppercase tracking-wide">Available</span>
                        </>
                      ) : (
                        <>
                          <ShieldAlert className="h-4 w-4 text-amber-500" />
                          <span className="text-xs text-amber-500 font-bold uppercase tracking-wide">Blocked</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Tech Specifications */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs">
                      <span className="text-gray-500">Area Dimension:</span>
                      <span className="font-bold text-white tracking-wide">{selectedPlot.dimensions}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs">
                      <span className="text-gray-500">Total Plot Size:</span>
                      <span className="font-bold text-white tracking-wide">{selectedPlot.size}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs">
                      <span className="text-gray-500">Facing Direction:</span>
                      <span className="font-bold text-white tracking-wide uppercase">{selectedPlot.facing} Facing</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5 text-xs">
                      <span className="text-gray-500">Starting Price:</span>
                      <span className="font-bold text-lime-gold tracking-wide">{selectedPlot.price}*</span>
                    </div>
                  </div>
                </div>

                {/* Reservation Actions */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  <button
                    onClick={() => onOpenLeadModal(`Reserve Plot #${selectedPlot.number}`)}
                    className="w-full py-3.5 bg-gradient-to-r from-lime-gold to-emerald-400 text-black font-black uppercase tracking-wider text-xs rounded-xl transition-all hover:brightness-110 shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" /> Reserve Plot
                  </button>

                  <a
                    href={`https://wa.me/916262838353?text=Hi!%20I%20am%20inquiring%20about%20Plot%20%23${selectedPlot.number}%20(${selectedPlot.size}%20-%20${selectedPlot.facing}%20Facing)%20at%20JDR%20Golden%20Heights.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600/25 hover:text-white font-bold uppercase tracking-wider text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Inquiry
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 text-center text-[10px] text-gray-500 hover:text-white uppercase tracking-widest font-semibold transition-colors"
                  >
                    Reset Zoom View
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drag navigation helper hint */}
          <div className="absolute bottom-4 left-4 z-10 px-3 py-1.5 bg-black/75 rounded-lg text-[10px] text-gray-500 pointer-events-none border border-white/5">
            Drag to pan map • Click plot to configure
          </div>
        </div>

      </div>
    </section>
  );
}
