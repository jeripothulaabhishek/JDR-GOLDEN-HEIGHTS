'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, HelpCircle, ChevronDown, CheckCircle } from 'lucide-react';

// Import sections
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Highlights from '@/components/Highlights';
import Amenities from '@/components/Amenities';
import MasterLayout from '@/components/MasterLayout';
import VirtualTour from '@/components/VirtualTour';
import RoiCalculator from '@/components/RoiCalculator';
import Gallery from '@/components/Gallery';
import LocationIntelligence from '@/components/LocationIntelligence';
import Testimonials from '@/components/Testimonials';
import DeveloperInfo from '@/components/DeveloperInfo';
import MultiStepForm from '@/components/MultiStepForm';
import AiConcierge from '@/components/AiConcierge';
import WhatsAppButton from '@/components/WhatsAppButton';
import PopupManager from '@/components/PopupManager';
import Footer from '@/components/Footer';
import PricingSection from '@/components/PricingSection';
import LocalSeoSections from '@/components/LocalSeoSections';
import StickyMobileCta from '@/components/StickyMobileCta';

// FAQs
interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'What is the total acreage and scale of the JDR Golden Heights project?',
    a: 'JDR Golden Heights is a master-planned residential community spanning over 100+ acres of fully demarcated plotting developments with premium infrastructure provisions near Yadadri, Telangana.',
  },
  {
    q: 'Are the layouts DTCP approved and legal title cleared?',
    a: 'Yes, 100%. The layout structures fully comply with Directorate of Town and Country Planning (DTCP) norms. Every plot is backed by clear titles, link documents, and is completely free of legal issues, making them ready for spot registration.',
  },
  {
    q: 'Are bank loan facilities available for purchasing these plots?',
    a: 'Yes. We have partnerships with leading private and nationalized banks (including SBI, HDFC, and ICICI) to provide easy, low-interest plot loans for our verified customers.',
  },
  {
    q: 'How far is the site located from Hyderabad and Yadadri Temple?',
    a: 'The project is strategically positioned in the main growth corridor, just 15 minutes away from the Yadadri Temple gopuram. It is about a 60-minute drive from Hyderabad Uppal junction via the four-lane NH-163 Warangal highway.',
  },
  {
    q: 'Do you provide site visits for prospective investors?',
    a: 'Yes, we provide complimentary site visits every day (including Sundays). We arrange free luxury car pickups and drops from your home or major landmark hubs in Hyderabad. You can book a slot using any of our CTAs.',
  },
];

export default function Home() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [modalInterestText, setModalInterestText] = useState('');
  
  // Page Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhase, setContactPhase] = useState('Phase 2 (₹18L+)');
  const [contactMsg, setContactMsg] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [isContactSuccess, setIsContactSuccess] = useState(false);

  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleOpenLeadModal = (interestText?: string) => {
    setModalInterestText(interestText || 'General Site Visit Booking');
    setIsLeadModalOpen(true);
  };

  const handlePageContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone || contactPhone.length < 10) return;
    setIsContactSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          phone: contactPhone,
          email: contactEmail || undefined,
          budget: contactPhase,
          message: contactMsg || 'Page Footer Contact Form',
        }),
      });

      if (response.ok) {
        setIsContactSuccess(true);
        
        // Construct and open WhatsApp template message
        const waText = `New Lead - JDR Golden Heights\n\nName: ${contactName}\nPhone: ${contactPhone}\nEmail: ${contactEmail || 'N/A'}\nBudget/Phase: ${contactPhase}\nProperty Interest: ${contactMsg || 'Page Footer Contact Form'}\n\nSubmitted from Website`;
        const waUrl = `https://wa.me/916262838353?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, '_blank');

        // Reset form
        setContactName('');
        setContactPhone('');
        setContactEmail('');
        setContactMsg('');
      } else {
        alert('Something went wrong. Please check inputs and try again.');
      }
    } catch (err) {
      console.error('Page Contact form error:', err);
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <main className="flex-grow">
      {/* Sticky Header Navigation */}
      <Navbar onOpenLeadModal={() => handleOpenLeadModal('Navbar Booking Click')} />

      {/* Cinematic Hero */}
      <Hero
        onOpenLeadModal={() => handleOpenLeadModal('Hero CTA Booking')}
        onOpenBrochureModal={() => handleOpenLeadModal('Hero Brochure Download')}
      />

      {/* About Project & Yadadri Corridor */}
      <About />

      {/* Local SEO specifications tabbed details */}
      <LocalSeoSections />

      {/* Project Highlights Grid */}
      <Highlights />

      {/* Interactive Master SVG Layout */}
      <MasterLayout onOpenLeadModal={handleOpenLeadModal} />

      {/* 360° Virtual Tour Panoramas */}
      <VirtualTour />

      {/* Premium Pricing Phase Cards & Scarcity */}
      <PricingSection onOpenLeadModal={handleOpenLeadModal} />

      {/* World-class Layout Amenities */}
      <Amenities />

      {/* ROI Appreciation Calculator */}
      <RoiCalculator />

      {/* Media filterable Lightbox Gallery */}
      <Gallery onOpenBrochureModal={() => handleOpenLeadModal('Gallery Layout Brochure')} />

      {/* Interactive Location Intelligence (Connectivity & Google Maps) */}
      <LocationIntelligence />

      {/* Developer Corporate registry trust section */}
      <DeveloperInfo />

      {/* Customer Testimonials Carousel */}
      <Testimonials />

      {/* Consolidated FAQ & Form section */}
      <section className="py-24 bg-luxury-dark border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* FAQ Accordion Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2 text-left">
                <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">
                  Frequently Asked
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                  Questions &amp; <span className="text-gold-gradient">Answers</span>
                </h3>
              </div>

              <div className="space-y-3 mt-8">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-white/5 bg-luxury-gray rounded-xl overflow-hidden transition-all duration-300 hover:border-gold-500/20"
                    >
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left text-white focus:outline-none"
                      >
                        <span className="text-sm font-semibold tracking-wide flex items-start">
                          <HelpCircle className="h-4.5 w-4.5 text-gold-400 mr-2 shrink-0 mt-0.5" />
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`h-4.5 w-4.5 text-gold-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="p-4 pt-0 pl-11 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 bg-black/25">
                          {faq.a}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* In-page Lead Generation Form Column */}
            <div className="lg:col-span-6 p-8 rounded-2xl bg-luxury-gray border border-gold-500/10 shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-300 to-gold-600" />
              
              <div className="space-y-2 text-left mb-6">
                <h4 className="text-xl font-serif font-bold text-white">Schedule Site Visit</h4>
                <p className="text-xs text-gray-400">
                  Register your coordinates below to coordinate a site visit or request callback details.
                </p>
              </div>

              {!isContactSuccess ? (
                <form onSubmit={handlePageContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-xs"
                    />
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      placeholder="Mobile Number"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-xs"
                    />
                    <select
                      value={contactPhase}
                      onChange={(e) => setContactPhase(e.target.value)}
                      className="w-full px-4 py-3 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-xs"
                    >
                      <option className="bg-luxury-gray text-white">Phase 2 (₹18L+)</option>
                      <option className="bg-luxury-gray text-white">Phase 1 (₹22L+)</option>
                      <option className="bg-luxury-gray text-white">Festive Dussehra Offer</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Tell us about your requirements (e.g. Plot size, visit date request...)"
                    rows={3}
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    className="w-full px-4 py-2.5 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-xs"
                  />

                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full flex items-center justify-center py-3 bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 disabled:opacity-50 text-black font-bold uppercase tracking-wider text-xs rounded-xl transition-all hover:brightness-110"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isContactSubmitting ? 'Registering...' : 'Request Site Visit'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-10 space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-gold-950/40 border border-gold-400/25 text-gold-400">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-white">Enquiry Received!</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto">
                    We have successfully captured your details. Our executive will connect with you via mobile shortly to coordinate coordinates.
                  </p>
                  <button
                    onClick={() => setIsContactSuccess(false)}
                    className="mt-4 px-4 py-2 bg-white/5 border border-white/10 hover:border-gold-400 text-gold-400 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider"
                  >
                    Send Another Request
                  </button>
                </div>
              )}

              {/* Quick Contacts details */}
              <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gold-500 shrink-0" />
                  <a href="tel:+916262838353" className="hover:text-gold-400">+91 62628 38353</a>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gold-500 shrink-0" />
                  <a href="mailto:msunilvijaykar@gmail.com" className="hover:text-gold-400">msunilvijaykar@gmail.com</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Widgets */}
      <WhatsAppButton />
      <AiConcierge onOpenLeadModal={handleOpenLeadModal} />
      <PopupManager />
      <StickyMobileCta onOpenLeadModal={handleOpenLeadModal} />

      {/* Multi-Step Site Booking Wizard Modal */}
      <MultiStepForm
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        initialInterest={modalInterestText}
      />

      {/* Corporate Footer */}
      <Footer />
    </main>
  );
}


