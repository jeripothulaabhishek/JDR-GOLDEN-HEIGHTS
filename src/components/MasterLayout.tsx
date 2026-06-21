'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoomIn, ZoomOut, RefreshCw, Sparkles, HelpCircle, CheckCircle, AlertTriangle, Ban } from 'lucide-react';

interface PlotData {
  id: string;
  number: string;
  size: string; // e.g. "250 Sq. Yds."
  price: string; // e.g. "₹25 Lakhs"
  status: 'Available' | 'Blocked' | 'Sold';
  x: number;
  y: number;
  width: number;
  height: number;
}

// Predefined mock plots for JDR Golden Heights
const plots: PlotData[] = [
  // Row 1
  { id: 'p1', number: '101', size: '200 Sq. Yds.', price: '₹22.0 L', status: 'Available', x: 50, y: 120, width: 45, height: 60 },
  { id: 'p2', number: '102', size: '200 Sq. Yds.', price: '₹22.0 L', status: 'Available', x: 100, y: 120, width: 45, height: 60 },
  { id: 'p3', number: '103', size: '200 Sq. Yds.', price: '₹22.0 L', status: 'Blocked', x: 150, y: 120, width: 45, height: 60 },
  { id: 'p4', number: '104', size: '200 Sq. Yds.', price: '₹22.0 L', status: 'Sold', x: 200, y: 120, width: 45, height: 60 },
  { id: 'p5', number: '105', size: '250 Sq. Yds.', price: '₹27.5 L', status: 'Available', x: 250, y: 120, width: 55, height: 60 },
  { id: 'p6', number: '106', size: '250 Sq. Yds.', price: '₹27.5 L', status: 'Available', x: 310, y: 120, width: 55, height: 60 },
  { id: 'p7', number: '107', size: '300 Sq. Yds.', price: '₹33.0 L', status: 'Sold', x: 370, y: 120, width: 65, height: 60 },
  
  // Row 2
  { id: 'p8', number: '201', size: '180 Sq. Yds.', price: '₹18.0 L', status: 'Available', x: 50, y: 220, width: 45, height: 60 },
  { id: 'p9', number: '202', size: '180 Sq. Yds.', price: '₹18.0 L', status: 'Available', x: 100, y: 220, width: 45, height: 60 },
  { id: 'p10', number: '203', size: '180 Sq. Yds.', price: '₹18.0 L', status: 'Sold', x: 150, y: 220, width: 45, height: 60 },
  { id: 'p11', number: '204', size: '200 Sq. Yds.', price: '₹20.0 L', status: 'Available', x: 200, y: 220, width: 45, height: 60 },
  { id: 'p12', number: '205', size: '220 Sq. Yds.', price: '₹22.0 L', status: 'Available', x: 250, y: 220, width: 50, height: 60 },
  { id: 'p13', number: '206', size: '220 Sq. Yds.', price: '₹22.0 L', status: 'Blocked', x: 305, y: 220, width: 50, height: 60 },
  
  // Row 3 (Premium Phase 1 plots near park)
  { id: 'p14', number: '301', size: '240 Sq. Yds.', price: '₹26.4 L', status: 'Available', x: 50, y: 340, width: 50, height: 60 },
  { id: 'p15', number: '302', size: '240 Sq. Yds.', price: '₹26.4 L', status: 'Blocked', x: 105, y: 340, width: 50, height: 60 },
  { id: 'p16', number: '303', size: '300 Sq. Yds.', price: '₹33.0 L', status: 'Available', x: 300, y: 340, width: 65, height: 60 },
  { id: 'p17', number: '304', size: '350 Sq. Yds.', price: '₹38.5 L', status: 'Available', x: 370, y: 340, width: 75, height: 60 },
];

interface MasterLayoutProps {
  onOpenLeadModal: (plotInfo?: string) => void;
}

export default function MasterLayout({ onOpenLeadModal }: MasterLayoutProps) {
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [hoveredPlot, setHoveredPlot] = useState<PlotData | null>(null);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setHoveredPlot(null);
  };

  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
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

  return (
    <section id="layout" className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Decorative Gold Blurs */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Visual Guide
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Interactive <span className="text-gold-gradient">Master Plan</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Hover over plots to check size, pricing, and availability. Use zoom controls to navigate the layout road structures and park locations.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs font-semibold uppercase tracking-wider">
          <div className="flex items-center space-x-2">
            <span className="h-3.5 w-3.5 rounded bg-gold-400 border border-gold-300" />
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
            <span className="text-emerald-400">Layout Parks</span>
          </div>
        </div>

        {/* Outer Layout Map Box */}
        <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-white/10 overflow-hidden bg-luxury-gray aspect-[16/10] sm:aspect-[16/9] shadow-2xl">
          
          {/* Zoom Controls Overlay */}
          <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
            <button
              onClick={handleZoomIn}
              className="p-3 bg-luxury-black/85 border border-gold-500/20 hover:border-gold-400 text-gold-400 rounded-lg backdrop-blur-md transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-3 bg-luxury-black/85 border border-gold-500/20 hover:border-gold-400 text-gold-400 rounded-lg backdrop-blur-md transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-3 bg-luxury-black/85 border border-gold-500/20 hover:border-gold-400 text-gold-400 rounded-lg backdrop-blur-md transition-colors"
              title="Reset View"
            >
              <RefreshCw className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Map Viewer Container */}
          <svg
            className="w-full h-full cursor-grab active:cursor-grabbing select-none"
            viewBox="0 0 1000 600"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Wrapper for Zoom/Pan Transforms */}
            <g
              transform={`translate(${panX}, ${panY}) scale(${zoom})`}
              className="transition-transform duration-100 ease-out origin-center"
            >
              {/* Outer boundary wall */}
              <rect x="20" y="20" width="960" height="560" rx="15" fill="none" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="3" />
              
              {/* Grand entrance arch area */}
              <rect x="20" y="240" width="15" height="120" rx="3" fill="#d4af37" opacity="0.8" />
              <text x="30" y="305" fill="#d4af37" fontSize="11" fontWeight="bold" fontFamily="sans-serif" transform="rotate(-90 30 305)" textAnchor="middle">
                GRAND ENTRANCE ARCH
              </text>

              {/* Road Network Grid */}
              {/* Main Entry Road */}
              <rect x="35" y="260" width="925" height="80" fill="#202020" />
              <text x="500" y="305" fill="#555555" fontSize="12" fontWeight="bold" fontFamily="sans-serif" letterSpacing="5" textAnchor="middle">
                MAIN AVENUE 60 FEET ROAD
              </text>
              <line x1="35" y1="300" x2="960" y2="300" stroke="#d4af37" strokeWidth="2" strokeDasharray="15,10" opacity="0.3" />

              {/* Cross roads */}
              <rect x="460" y="20" width="60" height="560" fill="#202020" />
              <line x1="490" y1="20" x2="490" y2="580" stroke="#d4af37" strokeWidth="2" strokeDasharray="15,10" opacity="0.3" />

              {/* Green Park Zones */}
              {/* Central Park */}
              <rect x="160" y="340" width="130" height="180" rx="10" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
              <text x="225" y="430" fill="#10b981" fontSize="12" fontWeight="bold" fontFamily="serif" textAnchor="middle">
                CHILDREN&apos;S PARK
              </text>
              <text x="225" y="445" fill="#10b981" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                &amp; GREEN ZONE
              </text>

              {/* Clubhouse Site */}
              <rect x="530" y="340" width="180" height="150" rx="10" fill="rgba(212, 175, 55, 0.08)" stroke="rgba(212, 175, 55, 0.3)" strokeWidth="1.5" />
              <rect x="580" y="375" width="80" height="60" rx="5" fill="#121212" stroke="#d4af37" strokeWidth="1" />
              <text x="620" y="410" fill="#d4af37" fontSize="12" fontWeight="bold" fontFamily="serif" textAnchor="middle">
                CLUBHOUSE
              </text>
              <text x="620" y="450" fill="rgba(212, 175, 55, 0.6)" fontSize="9" fontFamily="sans-serif" textAnchor="middle">
                PLANNED INFRASTRUCTURE
              </text>

              {/* Yadadri Temple Sightline Archeological plot */}
              <path d="M 850 50 L 920 50 L 885 20 Z" fill="rgba(212, 175, 55, 0.15)" stroke="#d4af37" strokeWidth="1" />
              <text x="885" y="70" fill="#d4af37" fontSize="9" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">
                TEMPLE SITEVIEW
              </text>

              {/* Plots Grid */}
              {plots.map((plot) => {
                const isHovered = hoveredPlot?.id === plot.id;
                let strokeColor = 'rgba(212, 175, 55, 0.2)';
                let fillColor = 'rgba(212, 175, 55, 0.08)';

                if (plot.status === 'Sold') {
                  strokeColor = '#374151';
                  fillColor = '#1f2937';
                } else if (plot.status === 'Blocked') {
                  strokeColor = '#d97706';
                  fillColor = 'rgba(217, 119, 6, 0.15)';
                } else if (isHovered) {
                  strokeColor = '#d4af37';
                  fillColor = 'rgba(212, 175, 55, 0.25)';
                }

                return (
                  <g key={plot.id} className="cursor-pointer">
                    <rect
                      x={plot.x}
                      y={plot.y}
                      width={plot.width}
                      height={plot.height}
                      rx="3"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isHovered ? 2 : 1}
                      className="transition-all duration-200"
                      onMouseEnter={() => setHoveredPlot(plot)}
                      onMouseLeave={() => setHoveredPlot(null)}
                      onClick={() => {
                        if (plot.status === 'Available') {
                          onOpenLeadModal(`Plot #${plot.number} Enquiry`);
                        }
                      }}
                    />
                    <text
                      x={plot.x + plot.width / 2}
                      y={plot.y + plot.height / 2 + 4}
                      fill={plot.status === 'Sold' ? '#4b5563' : '#ffffff'}
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

          {/* Tooltip Overlay Panel */}
          {hoveredPlot && (
            <div className="absolute bottom-4 right-4 z-20 w-64 p-4 bg-luxury-black/95 border border-gold-500/25 rounded-xl backdrop-blur-md shadow-2xl pointer-events-none text-left">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-serif font-bold text-white">Plot {hoveredPlot.number}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                  hoveredPlot.status === 'Available' ? 'bg-gold-500/20 text-gold-400' :
                  hoveredPlot.status === 'Blocked' ? 'bg-amber-600/20 text-amber-400' : 'bg-gray-800 text-gray-500'
                }`}>
                  {hoveredPlot.status}
                </span>
              </div>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">Dimensions:</span>
                  <span className="font-semibold">{hoveredPlot.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Starting Price:</span>
                  <span className="font-semibold text-gold-400">{hoveredPlot.price}*</span>
                </div>
              </div>
              {hoveredPlot.status === 'Available' && (
                <div className="mt-3 pt-2.5 border-t border-white/5 text-[9px] text-center font-bold tracking-widest text-gold-400 animate-pulse">
                  CLICK TO BOOK VISIT
                </div>
              )}
            </div>
          )}

          {/* Drag navigation helper hint */}
          <div className="absolute bottom-4 left-4 z-10 px-3 py-1 bg-black/75 rounded text-[10px] text-gray-500 pointer-events-none">
            Drag to pan map, pinch/scroll to zoom
          </div>
        </div>

      </div>
    </section>
  );
}
