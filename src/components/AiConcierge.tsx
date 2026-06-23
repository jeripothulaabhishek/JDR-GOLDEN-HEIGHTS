'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, HelpCircle, Phone, Calendar } from 'lucide-react';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface AiConciergeProps {
  onOpenLeadModal: (interestText?: string) => void;
}

export default function AiConcierge({ onOpenLeadModal }: AiConciergeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [leadStep, setLeadStep] = useState<'none' | 'name' | 'phone'>('none');
  const [leadName, setLeadName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting chat
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: 'Namaste! Welcome to JDR Golden Heights. I am your gold concierge. How may I assist you with your property search today?',
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const addBotMessage = (text: string) => {
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text, timestamp: new Date() }]);
    }, 600);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text, timestamp: new Date() }]);
    setInputVal('');

    // Lead capture chat funnel state machine
    if (leadStep === 'name') {
      setLeadName(text);
      setLeadStep('phone');
      addBotMessage(`Thank you, ${text}. Please share your 10-digit mobile number so I can register your details and share the catalog.`);
      return;
    }

    if (leadStep === 'phone') {
      const phoneDigits = text.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        addBotMessage('Please share a valid 10-digit mobile number so we can register your catalog.');
        return;
      }
      setLeadStep('none');
      addBotMessage('Perfect! I have captured your request. Our executive will contact you shortly. I have updated this in our CRM.');
      
      // Save lead to database
      try {
        await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: leadName,
            phone: phoneDigits,
            message: 'AI Concierge Capture',
            chatHistory: messages.concat({ sender: 'user', text, timestamp: new Date() }),
          }),
        });
      } catch (err) {
        console.error('AI Concierge lead save error:', err);
      }
      return;
    }

    // Match keywords
    const lowerText = text.toLowerCase();

    if (lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('rate') || lowerText.includes('how much')) {
      addBotMessage('Phase 2 plots start from ₹18 Lakhs* and Phase 1 plots start from ₹22 Lakhs* (excluding registration & amenities). Would you like to schedule a free site visit to check available plot orientations?');
      return;
    }

    if (lowerText.includes('yadadri') || lowerText.includes('distance') || lowerText.includes('temple') || lowerText.includes('far')) {
      addBotMessage('JDR Golden Heights is located approximately 15 minutes away from the Yadadri Sri Lakshmi Narasimha Swamy Temple. Excellent 60ft approach road access makes commute extremely easy.');
      return;
    }

    if (lowerText.includes('legal') || lowerText.includes('dtcp') || lowerText.includes('rera') || lowerText.includes('approval')) {
      addBotMessage('Our layout is fully planned and conforms with DTCP standards. Every plot comes with 100% legal title clearance and link documents. We also have bank loan associations.');
      return;
    }

    if (lowerText.includes('visit') || lowerText.includes('book') || lowerText.includes('schedule') || lowerText.includes('brochure') || lowerText.includes('contact') || lowerText.includes('call')) {
      setLeadStep('name');
      addBotMessage('I would be happy to schedule a free site visit with pick-and-drop or send you the PDF brochure. May I know your name first?');
      return;
    }

    // Default response
    addBotMessage('I am here to guide you with plots pricing, layout designs, and connectivity details for JDR Golden Heights near Yadadri. Type "Book visit" to schedule an on-site tour!');
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-20 right-6 md:bottom-6 md:right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-4 rounded-full bg-gradient-to-tr from-gold-600 via-gold-500 to-gold-400 text-black shadow-[0_5px_25px_rgba(212,175,55,0.35)] cursor-pointer flex items-center justify-center border border-gold-300"
          aria-label="Open AI Concierge Chat"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          
          {/* Notification Glow Dot */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-gold-500 text-[9px] font-black text-black flex items-center justify-center border border-black">1</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-36 right-6 md:bottom-24 md:right-6 w-[340px] sm:w-[380px] h-[500px] rounded-2xl glass-panel border border-gold-500/20 shadow-2xl z-50 flex flex-col overflow-hidden text-left"
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-gold-950/80 to-luxury-gray border-b border-gold-500/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gold-950/40 border border-gold-500/20 text-gold-400 flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-bold text-white flex items-center">
                    Gold Concierge <Sparkles className="h-3.5 w-3.5 text-gold-400 ml-1" />
                  </h4>
                  <span className="text-[10px] text-emerald-400 flex items-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" /> Online Assistance
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Body messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-black/35 scrollbar-thin">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-gold-600 to-gold-400 text-black font-semibold rounded-tr-none'
                        : 'bg-luxury-gray border border-white/5 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions buttons list */}
            {leadStep === 'none' && (
              <div className="p-3 bg-black/65 border-t border-white/5 flex flex-wrap gap-1.5 justify-start">
                <button
                  onClick={() => handleQuickQuestion('What is the plot price?')}
                  className="px-2.5 py-1.5 bg-white/5 hover:bg-gold-500/10 border border-white/5 hover:border-gold-500/30 text-gray-300 hover:text-gold-400 rounded-lg text-[10px] transition-colors"
                >
                  ₹ Plot Price?
                </button>
                <button
                  onClick={() => handleQuickQuestion('Distance from Yadadri temple?')}
                  className="px-2.5 py-1.5 bg-white/5 hover:bg-gold-500/10 border border-white/5 hover:border-gold-500/30 text-gray-300 hover:text-gold-400 rounded-lg text-[10px] transition-colors"
                >
                  📍 Yadadri Distance?
                </button>
                <button
                  onClick={() => handleQuickQuestion('Are titles DTCP approved?')}
                  className="px-2.5 py-1.5 bg-white/5 hover:bg-gold-500/10 border border-white/5 hover:border-gold-500/30 text-gray-300 hover:text-gold-400 rounded-lg text-[10px] transition-colors"
                >
                  📜 DTCP Approved?
                </button>
                <button
                  onClick={() => handleQuickQuestion('Schedule a site visit')}
                  className="px-2.5 py-1.5 bg-gold-950/20 hover:bg-gold-400 hover:text-black border border-gold-500/30 text-gold-400 rounded-lg text-[10px] font-bold transition-all"
                >
                  📅 Book Site Visit
                </button>
              </div>
            )}

            {/* Chat Input form */}
            <div className="p-3 bg-luxury-gray border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputVal)}
                placeholder={
                  leadStep === 'name' ? 'Type your name...' :
                  leadStep === 'phone' ? 'Type 10-digit mobile...' : 'Type a query...'
                }
                className="flex-grow px-3 py-2 bg-black/60 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-xs"
              />
              <button
                onClick={() => handleSendMessage(inputVal)}
                className="p-2 bg-gold-400 hover:bg-gold-500 text-black rounded-xl transition-all"
                aria-label="Send"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
