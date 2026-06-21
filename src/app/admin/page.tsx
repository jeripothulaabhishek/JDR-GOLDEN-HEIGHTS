'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Download,
  Trash2,
  Calendar,
  Layers,
  MessageSquareCode,
  Globe,
  Monitor,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  TrendingUp,
  Clock,
  ArrowLeft
} from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  phone: string;
  email?: string;
  budget?: string;
  visitDate?: string;
  message?: string;
  chatHistory?: string; // JSON string of chat log
  status: 'New' | 'Contacted' | 'Site Visit Scheduled' | 'Interested' | 'Booked';
  ip?: string;
  device?: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Fetch leads on mount
  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: Lead['status']) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev =>
          prev.map(lead => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setLeads(prev => prev.filter(lead => lead.id !== id));
        setSelectedLead(null);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  // Filter leads based on search query
  const filteredLeads = leads.filter(lead => {
    const query = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(query) ||
      lead.phone.includes(query) ||
      (lead.email && lead.email.toLowerCase().includes(query)) ||
      (lead.budget && lead.budget.toLowerCase().includes(query)) ||
      lead.status.toLowerCase().includes(query)
    );
  });

  // Calculate statistics
  const stats = React.useMemo(() => {
    const total = leads.length;
    const newLeads = leads.filter(l => l.status === 'New').length;
    const siteVisits = leads.filter(l => l.status === 'Site Visit Scheduled').length;
    const booked = leads.filter(l => l.status === 'Booked').length;
    
    // Mock conversion rate
    const conversion = total > 0 ? Math.round((booked / total) * 100) : 0;

    return { total, newLeads, siteVisits, booked, conversion };
  }, [leads]);

  return (
    <div className="min-h-screen bg-luxury-black text-gray-100 font-sans p-6 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <a href="/" className="inline-flex items-center text-xs text-gold-400 uppercase tracking-widest font-bold mb-2 hover:underline">
              <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Return to Website
            </a>
            <h1 className="text-3xl font-serif font-bold text-white flex items-center">
              CRM Lead <span className="text-gold-gradient ml-2">Dashboard</span>
            </h1>
            <p className="text-xs text-gray-500 mt-1">JDR Golden Heights • Luxury Plotted Development Lead Management Panel</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={fetchLeads}
              className="py-2.5 px-4 bg-white/5 border border-white/5 hover:border-gold-400 text-gray-300 hover:text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Refresh
            </button>
            <a
              href="/api/export"
              className="inline-flex items-center py-2.5 px-4 bg-gradient-to-r from-gold-600 to-gold-400 hover:brightness-110 text-black text-xs font-bold uppercase tracking-wider rounded-lg transition-all"
            >
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-6 rounded-xl bg-luxury-gray border border-white/5 flex items-center justify-between shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Leads</span>
              <h3 className="text-3xl font-serif font-bold text-white">{stats.total}</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-gold-400"><Users className="h-6 w-6" /></div>
          </div>

          <div className="p-6 rounded-xl bg-luxury-gray border border-white/5 flex items-center justify-between shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">New Leads</span>
              <h3 className="text-3xl font-serif font-bold text-gold-400">{stats.newLeads}</h3>
            </div>
            <div className="p-3 bg-gold-950/20 border border-gold-500/25 rounded-lg text-gold-400"><Clock className="h-6 w-6" /></div>
          </div>

          <div className="p-6 rounded-xl bg-luxury-gray border border-white/5 flex items-center justify-between shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Site Visits</span>
              <h3 className="text-3xl font-serif font-bold text-white">{stats.siteVisits}</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-gold-400"><Calendar className="h-6 w-6" /></div>
          </div>

          <div className="p-6 rounded-xl bg-luxury-gray border border-white/5 flex items-center justify-between shadow-lg">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Bookings</span>
              <h3 className="text-3xl font-serif font-bold text-white">{stats.booked}</h3>
            </div>
            <div className="p-3 bg-white/5 rounded-lg text-emerald-400"><UserCheck className="h-6 w-6" /></div>
          </div>

        </div>

        {/* Search & Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Leads list table column */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-luxury-gray border border-white/5 shadow-2xl space-y-6">
            
            {/* Search inputs */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search leads by name, phone, status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-black/45 border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-sm"
              />
            </div>

            {/* Table view */}
            <div className="w-full overflow-x-auto">
              {loading ? (
                <div className="py-12 text-center text-gray-500">Loading leads from database...</div>
              ) : filteredLeads.length === 0 ? (
                <div className="py-12 text-center text-gray-500">No matching leads found.</div>
              ) : (
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-500 font-bold uppercase tracking-wider text-[10px] pb-4">
                      <th className="pb-3">Name</th>
                      <th className="pb-3">Phone</th>
                      <th className="pb-3">Interested Phase</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLeads.map((lead) => {
                      const isSelected = selectedLead?.id === lead.id;
                      return (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`cursor-pointer hover:bg-white/[0.02] transition-colors ${
                            isSelected ? 'bg-gold-950/10' : ''
                          }`}
                        >
                          <td className="py-4 font-semibold text-white">{lead.name}</td>
                          <td className="py-4 font-mono text-gray-400">{lead.phone}</td>
                          <td className="py-4 text-gray-300">{lead.budget || 'General'}</td>
                          <td className="py-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              lead.status === 'New' ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30' :
                              lead.status === 'Contacted' ? 'bg-sky-500/25 text-sky-400' :
                              lead.status === 'Site Visit Scheduled' ? 'bg-amber-600/25 text-amber-400' :
                              lead.status === 'Booked' ? 'bg-emerald-600/25 text-emerald-400' : 'bg-gray-800 text-gray-400'
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1 text-gray-500 hover:text-red-400 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Lead Detail Panel column */}
          <div className="lg:col-span-4 space-y-6">
            {selectedLead ? (
              <div className="p-6 rounded-2xl bg-luxury-gray border border-white/5 shadow-2xl space-y-6 text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gold-400" />
                
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white">{selectedLead.name}</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">Captured: {new Date(selectedLead.createdAt).toLocaleString()}</p>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">ID #{selectedLead.id}</span>
                </div>

                {/* Status selector */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500">Update Lead Status</label>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as Lead['status'])}
                    className="w-full px-3 py-2 bg-black border border-white/10 rounded-xl focus:border-gold-400 focus:outline-none text-white text-xs"
                  >
                    <option className="bg-luxury-gray text-white">New</option>
                    <option className="bg-luxury-gray text-white">Contacted</option>
                    <option className="bg-luxury-gray text-white">Site Visit Scheduled</option>
                    <option className="bg-luxury-gray text-white">Interested</option>
                    <option className="bg-luxury-gray text-white font-bold text-emerald-400">Booked</option>
                  </select>
                </div>

                {/* Core parameters list */}
                <div className="space-y-4 border-t border-b border-white/5 py-4 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-gray-500">Mobile Phone:</span>
                    <a href={`tel:${selectedLead.phone}`} className="font-mono font-bold text-white hover:underline">
                      +{selectedLead.phone}
                    </a>
                  </div>
                  {selectedLead.email && (
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-500">Email:</span>
                      <a href={`mailto:${selectedLead.email}`} className="font-semibold text-white hover:underline truncate">
                        {selectedLead.email}
                      </a>
                    </div>
                  )}
                  {selectedLead.visitDate && (
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-500">Visit Date:</span>
                      <span className="font-semibold text-gold-400 flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1" /> {selectedLead.visitDate}
                      </span>
                    </div>
                  )}
                  {selectedLead.budget && (
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-500">Int. Budget:</span>
                      <span className="font-semibold text-white">{selectedLead.budget}</span>
                    </div>
                  )}
                </div>

                {/* Message details */}
                {selectedLead.message && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">Lead Message</span>
                    <p className="p-3 bg-black/45 rounded-lg text-xs text-gray-300 leading-relaxed border border-white/5">
                      {selectedLead.message}
                    </p>
                  </div>
                )}

                {/* Chat transcript list if present */}
                {selectedLead.chatHistory ? (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block flex items-center">
                      <MessageSquareCode className="h-3.5 w-3.5 mr-1 text-gold-400" /> Chatbot Conversation history
                    </span>
                    <div className="p-3 bg-black/55 rounded-lg border border-white/5 max-h-40 overflow-y-auto space-y-2 text-[10px] scrollbar-thin">
                      {JSON.parse(selectedLead.chatHistory).map((chat: any, idx: number) => (
                        <div key={idx} className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : 'items-start'}`}>
                          <span className="text-[8px] text-gray-500 uppercase font-semibold mb-0.5">{chat.sender === 'user' ? 'Client' : 'AI Bot'}</span>
                          <span className={`px-2 py-1.5 rounded-lg leading-normal ${
                            chat.sender === 'user' ? 'bg-gold-500/20 text-gold-300' : 'bg-white/5 text-gray-300'
                          }`}>
                            {chat.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Metadata details */}
                <div className="pt-2 text-[9px] text-gray-500 space-y-1.5 font-mono border-t border-white/5">
                  <div className="flex justify-between">
                    <span className="flex items-center"><Globe className="h-3 w-3 mr-1" /> IP Address:</span>
                    <span>{selectedLead.ip || '127.0.0.1'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center"><Monitor className="h-3 w-3 mr-1" /> User Agent:</span>
                    <span className="truncate max-w-[180px]" title={selectedLead.device}>{selectedLead.device || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center"><ShieldCheck className="h-3 w-3 mr-1" /> Traffic Ref:</span>
                    <span className="truncate max-w-[180px]">{selectedLead.source || 'Direct'}</span>
                  </div>
                  {(selectedLead.utmSource || selectedLead.utmMedium || selectedLead.utmCampaign) && (
                    <div className="p-2 rounded bg-black/35 text-gold-500/70 border border-white/5 mt-2">
                      <p className="font-bold uppercase tracking-wider text-[8px]">UTM Parameters</p>
                      <p className="mt-1">Src: {selectedLead.utmSource || 'N/A'} • Med: {selectedLead.utmMedium || 'N/A'} • Camp: {selectedLead.utmCampaign || 'N/A'}</p>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-luxury-gray border border-white/5 border-dashed text-center text-gray-500 flex flex-col items-center justify-center min-h-[300px]">
                <Layers className="h-8 w-8 text-gray-600 mb-2" />
                <p className="text-sm font-semibold">No Lead Selected</p>
                <p className="text-xs text-gray-600 mt-1 max-w-[200px] mx-auto">Click on a row in the leads list table to view full coordinates and details.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
