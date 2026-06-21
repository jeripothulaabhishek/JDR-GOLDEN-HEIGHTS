'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, CheckCircle2, Award, Briefcase, Calendar } from 'lucide-react';

interface CompanyStat {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
}

const stats: CompanyStat[] = [
  { label: 'Corporate CIN', value: 'U45203TG2022PTC167590', icon: FileText },
  { label: 'Incorporation Year', value: '2022', icon: Calendar },
  { label: 'ROC Jurisdiction', value: 'ROC Hyderabad', icon: Briefcase },
  { label: 'Corporate Status', value: 'Active Status', icon: CheckCircle2 },
];

export default function DeveloperInfo() {
  return (
    <section className="py-24 bg-luxury-black relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
            Corporate Trust
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            About The <span className="text-gold-gradient">Developer</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Learn more about the corporate credentials, regulatory compliance, and construction values behind JDR Goldencity Constructions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-center">
          
          {/* Left: Brand Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-2xl font-serif font-bold text-white leading-tight">
              JDR Goldencity Constructions <br />
              <span className="text-gold-400 text-lg font-sans tracking-wide">Private Limited</span>
            </h3>
            
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed text-justify">
              Based in Hyderabad, **JDR Goldencity Constructions Pvt. Ltd.** has emerged as a premium real estate and infrastructure development company. We are focused on delivering premium-quality plotted developments, architectural excellence, and 100% legal title clarity.
            </p>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-justify">
              Customer satisfaction, transparency, and sustainable ecological planning form the foundation of our business model. Every venture is backed by comprehensive regulatory documentation, bank approvals, and strict compliance with local zoning mandates.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <ShieldCheck className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">DTCP Approved</h4>
                  <p className="text-[10px] text-gray-400 mt-1">100% compliance with Directorate of Town and Country Planning.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                <Award className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">Clear Legal Titles</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Verified land chains with links documents, ready for spot registration.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Corporate Details Card */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-luxury-gray border border-gold-500/10 shadow-2xl relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Briefcase className="h-24 w-24 text-gold-400" />
            </div>

            <h4 className="text-xs font-bold tracking-widest text-gold-400 uppercase mb-6 pb-2 border-b border-white/5">
              Ministry of Corporate Affairs (MCA) Registry
            </h4>

            <div className="divide-y divide-white/5">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="py-4 flex items-center justify-between gap-4">
                    <span className="text-xs text-gray-400 flex items-center">
                      <Icon className="h-4 w-4 text-gold-500 mr-2 shrink-0" />
                      {stat.label}
                    </span>
                    <span className="text-xs font-mono font-bold text-white text-right">
                      {stat.value}
                    </span>
                  </div>
                );
              })}
              <div className="py-4 flex items-center justify-between gap-4">
                <span className="text-xs text-gray-400 flex items-center">
                  <ShieldCheck className="h-4 w-4 text-gold-500 mr-2 shrink-0" />
                  Industry Class
                </span>
                <span className="text-xs font-bold text-white text-right">
                  Construction &amp; Civil Engineering
                </span>
              </div>
            </div>

            {/* Regulatory reassurance disclaimer */}
            <p className="text-[10px] text-gray-500 leading-normal mt-6 text-center">
              Registrations verified under registry records of Registrar of Companies (ROC) Hyderabad, Telangana.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
