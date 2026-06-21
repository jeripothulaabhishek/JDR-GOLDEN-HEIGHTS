'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Percent, Calendar } from 'lucide-react';

export default function RoiCalculator() {
  const [plotCost, setPlotCost] = useState(18); // In Lakhs (₹18L - ₹50L)
  const [appreciationRate, setAppreciationRate] = useState(15); // Percentage (8% - 25%)
  const [years, setYears] = useState(5); // Hold duration (1 - 10 years)

  // Calculations
  const calculations = useMemo(() => {
    const principal = plotCost * 100000; // in Rupees
    const rate = appreciationRate / 100;
    
    // Compounding Appreciation Formula: FV = P * (1 + R)^N
    const futureValue = principal * Math.pow(1 + rate, years);
    const netGain = futureValue - principal;
    const totalRoi = (netGain / principal) * 100;

    // Generate yearly data points for SVG Chart
    const chartPoints = [];
    for (let i = 0; i <= years; i++) {
      const value = principal * Math.pow(1 + rate, i);
      chartPoints.push({
        year: i,
        value: Math.round(value / 100000), // convert to Lakhs
      });
    }

    return {
      futureValue: Math.round(futureValue),
      netGain: Math.round(netGain),
      totalRoi: Math.round(totalRoi),
      chartPoints,
    };
  }, [plotCost, appreciationRate, years]);

  // Format currency in Indian Rupees format (Lakhs/Crores)
  const formatRupees = (amount: number) => {
    const formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    });
    return formatter.format(amount);
  };

  // Generate SVG coordinates for Chart
  const svgCoordinates = useMemo(() => {
    const data = calculations.chartPoints;
    const margin = { top: 20, right: 30, bottom: 40, left: 55 };
    const width = 600;
    const height = 240;
    
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Scales
    const minVal = plotCost;
    const maxVal = data[data.length - 1].value;
    const valRange = maxVal - minVal || 1;

    const points = data.map((d, idx) => {
      const x = margin.left + (idx / years) * chartWidth;
      const y = margin.top + chartHeight - ((d.value - minVal) / valRange) * chartHeight;
      return { x, y, ...d };
    });

    // Generate path strings
    const linePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    
    // Closed path for fill area
    const firstP = points[0];
    const lastP = points[points.length - 1];
    const fillPath = `
      ${linePath} 
      L ${lastP.x} ${margin.top + chartHeight} 
      L ${firstP.x} ${margin.top + chartHeight} 
      Z
    `;

    return {
      width,
      height,
      points,
      linePath,
      fillPath,
      chartWidth,
      chartHeight,
      margin,
    };
  }, [calculations.chartPoints, plotCost, years]);

  return (
    <section className="py-24 bg-luxury-dark relative overflow-hidden">
      <div className="absolute top-10 right-10 w-96 h-96 bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Investment Analytics
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            ROI <span className="text-gold-gradient">Investment Calculator</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Estimate your future returns. Play with the values below based on historic appreciation rates in the Yadadri growth corridor.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-center">
          
          {/* Left Column: Sliders */}
          <div className="lg:col-span-5 space-y-8 p-8 rounded-2xl bg-luxury-gray border border-white/5 shadow-2xl">
            <h3 className="text-lg font-serif font-semibold text-white flex items-center mb-2">
              <Calculator className="h-5 w-5 text-gold-400 mr-2" /> Investment Inputs
            </h3>

            {/* Slider 1: Plot Cost */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                <span className="text-gray-400 flex items-center"><DollarSign className="h-3.5 w-3.5 mr-1" /> Plot Purchase Price</span>
                <span className="text-gold-400 text-sm">₹{plotCost} Lakhs</span>
              </div>
              <input
                type="range"
                min="18"
                max="50"
                step="1"
                value={plotCost}
                onChange={(e) => setPlotCost(Number(e.target.value))}
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                <span>₹18L</span>
                <span>₹35L</span>
                <span>₹50L</span>
              </div>
            </div>

            {/* Slider 2: Annual Appreciation */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                <span className="text-gray-400 flex items-center"><Percent className="h-3.5 w-3.5 mr-1" /> Expected Appreciation</span>
                <span className="text-gold-400 text-sm">{appreciationRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="8"
                max="25"
                step="1"
                value={appreciationRate}
                onChange={(e) => setAppreciationRate(Number(e.target.value))}
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                <span>8% (Conservative)</span>
                <span>15% (Typical)</span>
                <span>25% (High Corridor)</span>
              </div>
            </div>

            {/* Slider 3: Holding Years */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider">
                <span className="text-gray-400 flex items-center"><Calendar className="h-3.5 w-3.5 mr-1" /> Investment Duration</span>
                <span className="text-gold-400 text-sm">{years} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-gold-400"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                <span>1 Year</span>
                <span>5 Years</span>
                <span>10 Years</span>
              </div>
            </div>
          </div>

          {/* Right Column: Output Metrics & SVG Chart */}
          <div className="lg:col-span-7 space-y-8">
            {/* Calculation Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-xl bg-luxury-gray border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Future Value</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-white block">
                  {formatRupees(calculations.futureValue)}
                </span>
                <span className="text-[10px] text-gray-400 block mt-1">Est. Asset Value</span>
              </div>

              <div className="p-5 rounded-xl bg-luxury-gray border border-white/5 text-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-1">Total Net Gain</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-gold-400 block">
                  {formatRupees(calculations.netGain)}
                </span>
                <span className="text-[10px] text-emerald-400 block mt-1 flex items-center justify-center font-medium">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" /> Profit Earned
                </span>
              </div>

              <div className="p-5 rounded-xl bg-gold-950/20 border border-gold-500/15 text-center">
                <span className="text-[10px] text-gold-400 uppercase tracking-widest font-bold block mb-1">Total ROI</span>
                <span className="text-xl sm:text-2xl font-serif font-bold text-white block">
                  {calculations.totalRoi}%
                </span>
                <span className="text-[10px] text-gray-400 block mt-1">Net Yield rate</span>
              </div>

            </div>

            {/* Interactive SVG Chart */}
            <div className="p-6 rounded-2xl bg-luxury-gray border border-white/5 shadow-2xl relative">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">Projected Capital Appreciation Growth (in Lakhs)</h4>
              
              <div className="w-full relative overflow-x-auto overflow-y-hidden">
                <svg
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${svgCoordinates.width} ${svgCoordinates.height}`}
                  className="min-w-[500px]"
                >
                  <defs>
                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[0, 1, 2, 3].map((tick) => {
                    const y = svgCoordinates.margin.top + (tick / 3) * svgCoordinates.chartHeight;
                    return (
                      <line
                        key={tick}
                        x1={svgCoordinates.margin.left}
                        y1={y}
                        x2={svgCoordinates.width - svgCoordinates.margin.right}
                        y2={y}
                        stroke="rgba(255, 255, 255, 0.05)"
                        strokeWidth="1"
                      />
                    );
                  })}

                  {/* Chart Fill Area */}
                  <path d={svgCoordinates.fillPath} fill="url(#goldGradient)" />

                  {/* Chart Line Path */}
                  <path
                    d={svgCoordinates.linePath}
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Highlight dots on points */}
                  {svgCoordinates.points.map((p, idx) => (
                    <g key={idx}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="5"
                        fill="#060606"
                        stroke="#d4af37"
                        strokeWidth="2.5"
                      />
                      {/* Tooltip value above dot */}
                      <text
                        x={p.x}
                        y={p.y - 10}
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        textAnchor="middle"
                      >
                        ₹{p.value}L
                      </text>
                    </g>
                  ))}

                  {/* X Axis Labels (Years) */}
                  {svgCoordinates.points.map((p, idx) => (
                    <text
                      key={idx}
                      x={p.x}
                      y={svgCoordinates.height - 15}
                      fill="#6b7280"
                      fontSize="9"
                      fontWeight="semibold"
                      fontFamily="sans-serif"
                      textAnchor="middle"
                    >
                      Yr {p.year}
                    </text>
                  ))}

                  {/* Y Axis line */}
                  <line
                    x1={svgCoordinates.margin.left}
                    y1={svgCoordinates.margin.top}
                    x2={svgCoordinates.margin.left}
                    y2={svgCoordinates.height - svgCoordinates.margin.bottom}
                    stroke="rgba(255, 255, 255, 0.1)"
                  />
                  {/* X Axis line */}
                  <line
                    x1={svgCoordinates.margin.left}
                    y1={svgCoordinates.height - svgCoordinates.margin.bottom}
                    x2={svgCoordinates.width - svgCoordinates.margin.right}
                    y2={svgCoordinates.height - svgCoordinates.margin.bottom}
                    stroke="rgba(255, 255, 255, 0.1)"
                  />
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
