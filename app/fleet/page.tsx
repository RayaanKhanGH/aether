"use client";

import React, { useState, useMemo, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Search, SlidersHorizontal, ChevronDown, CheckCircle, MapPin, X, ArrowRight, Zap, Star, Calendar, User, Mail, ShieldCheck, Car, Database } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { VEHICLES } from "../data/vehicles";
import { HoverAuraCard } from "../components/HoverAuraCard";

type Vehicle = {
  id: string;
  name: string;
  tier: string;
  specialty: string;
  location: string;
  price: number;
  seats: number;
  transmission: string;
  fuel: string;
  desc: string;
  availability: number;
  specs: { horsepower: string; acceleration: string; topSpeed: string };
};

const TIERS = ["All", "Budget", "Economy", "Economy+", "Premium", "Executive", "Elite"];
const LOCATIONS = ["All", "Miami", "Monaco", "Dubai", "Los Angeles", "London", "Paris", "New York", "Tokyo", "Geneva", "Singapore", "San Francisco", "Bangkok"];
const PRICES = ["All", "Under $500", "$500 - $1500", "Above $1500"];
const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Performance: High to Low", value: "hp-desc" }
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function FleetPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterTier, setFilterTier] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isReserving, setIsReserving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Date Range Logic
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");

  const { duration, totalCost } = useMemo(() => {
    if (!selectedVehicle || !startDate || !endDate) return { duration: 0, totalCost: 0 };
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const finalDuration = end > start ? diffDays : 1;
    return { duration: finalDuration, totalCost: selectedVehicle.price * finalDuration };
  }, [selectedVehicle, startDate, endDate]);

  useEffect(() => {
    if (selectedVehicle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setIsReserving(false);
      setIsSuccess(false);
      setStartDate(today);
      setEndDate("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedVehicle, today]);

  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setIsSearching(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tierParam = params.get("tier");
    const locationParam = params.get("location");
    if (tierParam && TIERS.includes(tierParam)) setFilterTier(tierParam);
    if (locationParam && LOCATIONS.includes(locationParam)) setFilterLocation(locationParam);
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = VEHICLES.filter(v => {
      if (debouncedSearch && !v.name.toLowerCase().includes(debouncedSearch.toLowerCase())) return false;
      if (filterTier !== "All" && v.tier !== filterTier) return false;
      if (filterLocation !== "All" && v.location !== filterLocation) return false;
      if (filterPrice === "Under $500" && v.price >= 500) return false;
      if (filterPrice === "$500 - $1500" && (v.price < 500 || v.price > 1500)) return false;
      if (filterPrice === "Above $1500" && v.price <= 1500) return false;
      return true;
    });

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "hp-desc") {
      result.sort((a, b) => {
        const hpA = parseInt(a.specs.horsepower.split(' ')[0]);
        const hpB = parseInt(b.specs.horsepower.split(' ')[0]);
        return hpB - hpA;
      });
    }

    return result;
  }, [debouncedSearch, filterTier, filterLocation, filterPrice, sortBy]);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(prev => prev === dropdown ? null : dropdown);
  };

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!endDate || new Date(endDate) < new Date(startDate)) return;
    setIsSuccess(true);
    setTimeout(() => {
      setSelectedVehicle(null);
    }, 2500);
  };

  const renderDropdownContent = () => {
    let options: string[] = [];
    let currentVal = "";
    let setter: (v: string) => void = () => {};

    if (activeDropdown === "tier") { options = TIERS; currentVal = filterTier; setter = setFilterTier; }
    if (activeDropdown === "location") { options = LOCATIONS; currentVal = filterLocation; setter = setFilterLocation; }
    if (activeDropdown === "price") { options = PRICES; currentVal = filterPrice; setter = setFilterPrice; }
    if (activeDropdown === "sort") { 
      return (
        <div className="flex flex-wrap gap-4">
          {SORT_OPTIONS.map(opt => (
            <button 
              key={opt.value}
              onClick={() => { setSortBy(opt.value); setActiveDropdown(null); }}
              className={`px-6 py-2.5 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${sortBy === opt.value ? 'bg-obsidian text-pure-white shadow-xl' : 'bg-pure-white border border-obsidian/5 text-obsidian hover:bg-obsidian/5'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-4">
        {options.map(opt => (
          <button 
            key={opt}
            onClick={() => { setter(opt); setActiveDropdown(null); }}
            className={`px-6 py-2.5 rounded-full text-[10px] uppercase font-black tracking-widest transition-all ${currentVal === opt ? 'bg-obsidian text-pure-white shadow-xl' : 'bg-pure-white border border-obsidian/5 text-obsidian hover:bg-obsidian/5'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-pure-white flex flex-col pt-[80px]">
      <Navigation />
      
      <div className="sticky top-[80px] bg-pure-white/80 backdrop-blur-xl z-40 border-b border-obsidian/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-5 flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="relative w-full lg:w-96 group">
            <Search className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors duration-500 ${isSearching ? 'text-champagne-gold animate-pulse' : 'text-slate-gray/40'} group-focus-within:text-obsidian`} size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by series, model, or year..." 
              className="w-full pl-12 pr-6 py-4 bg-obsidian/5 rounded-2xl border-none focus:bg-pure-white focus:ring-1 focus:ring-obsidian/10 outline-none text-[12px] font-bold text-obsidian transition-all" 
            />
          </div>
          
          <div className="flex w-full lg:w-auto gap-4 overflow-x-auto custom-scrollbar pb-2 lg:pb-0 items-center no-scrollbar">
            {["location", "tier", "price", "sort"].map((type) => (
              <button 
                key={type}
                onClick={() => toggleDropdown(type)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap bg-pure-white border shadow-sm ${activeDropdown === type ? 'border-obsidian text-obsidian bg-obsidian/5 shadow-inner' : 'border-obsidian/5 text-slate-gray hover:border-obsidian hover:text-obsidian'}`}
              >
                {type === "location" && <MapPin size={14} />}
                {type === "sort" && <SlidersHorizontal size={14} />}
                {type === "location" ? (filterLocation === "All" ? "Location" : filterLocation) : 
                 type === "tier" ? (filterTier === "All" ? "Collection Tier" : filterTier) : 
                 type === "price" ? (filterPrice === "All" ? "Price Core" : filterPrice) : 
                 SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                <ChevronDown size={14} className={activeDropdown === type ? "rotate-180 transition-transform duration-500" : "transition-transform duration-500"} />
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {activeDropdown && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full bg-pure-white/95 backdrop-blur-xl border-b border-obsidian/5 shadow-2xl overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-12 py-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] uppercase font-black text-slate-gray/40 tracking-[0.4em]">Filter Refinement Protocol</span>
                  <button onClick={() => setActiveDropdown(null)} className="p-2 hover:bg-obsidian/5 rounded-full transition-all text-slate-gray hover:text-obsidian"><X size={20}/></button>
                </div>
                {renderDropdownContent()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fleet Hero */}
      <section className="bg-obsidian text-pure-white py-24 sm:py-32 px-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-champagne-gold/10 rounded-full blur-[120px] -mr-40 -mt-20"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-champagne-gold font-technical text-xs tracking-[0.4em] uppercase mb-6 font-black"
          >
            The Gallery
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-heading font-black tracking-tighter leading-[0.9] max-w-4xl"
          >
            Motion in its <br/>Purest Form.
          </motion.h1>
         </div>
      </section>

      {/* Fleet Grid */}
      <section className="flex-grow max-w-[90rem] mx-auto px-6 sm:px-12 py-20 w-full text-obsidian bg-alabaster/30 rounded-t-[4rem] -mt-20 relative z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-8">
          <div className="flex items-center gap-6">
             <div className="h-20 w-px bg-obsidian/10 hidden md:block"></div>
             <div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.5em] text-slate-gray/40 mb-2">Inventory Core</h2>
                <div className="text-3xl font-heading font-black tracking-tighter">System Roster <span className="text-champagne-gold">/</span> {filteredVehicles.length} Active</div>
             </div>
          </div>
          <p className="text-[10px] font-black text-slate-gray/40 uppercase tracking-[0.4em]">Integrated Asset Roster</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredVehicles.map((vehicle) => (
            <motion.div 
              key={vehicle.id} 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <HoverAuraCard className="bg-pure-white border border-obsidian/5 rounded-[2.5rem] p-6 h-full flex flex-col justify-between hover:shadow-2xl hover:border-champagne-gold/20 transition-all duration-700 cursor-pointer group">
                <div className="space-y-6">
                  <div className="aspect-[16/11] bg-alabaster rounded-2xl flex flex-col items-center justify-center overflow-hidden border border-obsidian/5 relative shadow-inner group/thumb">
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      <div className="bg-pure-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.2em] text-obsidian shadow-sm border border-obsidian/5 uppercase">
                        {vehicle.tier}
                      </div>
                      <div className="bg-obsidian/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.2em] text-pure-white shadow-sm border border-white/5 uppercase flex items-center gap-2">
                        <Database size={10} className="text-champagne-gold" /> {vehicle.availability} Units
                      </div>
                    </div>
                    
                    <Car size={80} strokeWidth={0.5} className="text-obsidian opacity-[0.4] group-hover/thumb:text-champagne-gold group-hover/thumb:opacity-100 transition-all duration-700" />
                    
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-heading font-black text-obsidian tracking-tighter leading-tight group-hover:text-champagne-gold transition-colors duration-500">{vehicle.name}</h3>
                      <div className="flex items-center gap-2 text-[9px] font-black text-slate-gray/40 uppercase tracking-widest">
                         <MapPin size={10} /> {vehicle.location}
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="text-2xl font-black text-obsidian tracking-tighter">${vehicle.price}</span>
                       <span className="text-[9px] font-black text-slate-gray/30 block -mt-1 tracking-widest uppercase">DAILY</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-obsidian/5 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-gray">
                         <Zap size={12} className="text-champagne-gold" /> {vehicle.specs.horsepower}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-gray border-l border-obsidian/10 pl-4">
                         <Star size={12} className="text-champagne-gold fill-champagne-gold" /> Elite
                      </div>
                   </div>
                   <div className="w-10 h-10 bg-alabaster rounded-xl flex items-center justify-center text-obsidian group-hover:bg-obsidian group-hover:text-pure-white transition-all duration-700">
                      <ArrowRight size={18} />
                   </div>
                </div>
              </HoverAuraCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vehicle Modal */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-obsidian/60 backdrop-blur-xl" onClick={() => setSelectedVehicle(null)}></div>
            <motion.div 
              initial={{ scale: 0.98, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, y: 30 }}
              className="relative bg-pure-white w-full max-w-7xl h-full max-h-[85vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Left side: Hero Image Placeholder */}
               <div className="w-full md:w-[50%] h-48 sm:h-64 md:h-full bg-alabaster relative flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-obsidian/5 overflow-hidden shrink-0 group/img">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.01)_100%)]"></div>
                  <button onClick={() => setSelectedVehicle(null)} className="absolute top-6 left-6 p-2 bg-white text-obsidian rounded-full shadow-lg hover:bg-obsidian hover:text-white transition-all z-20 focus:outline-none">
                     <X size={20} />
                  </button>
                  
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], y: [0, -5, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="flex items-center justify-center w-full h-full"
                  >
                    <Car size={300} strokeWidth={0.2} className="text-obsidian opacity-[0.1]" />
                  </motion.div>
               </div>
               
               {/* Right side: Information */}
               <div className="flex-1 p-8 sm:p-12 lg:p-16 overflow-y-auto no-scrollbar flex flex-col">
                  <AnimatePresence mode="wait">
                    {!isReserving ? (
                      <motion.div 
                        key="detail"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-10 h-full flex flex-col"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center gap-4">
                            <p className="text-[10px] font-black text-champagne-gold uppercase tracking-[0.4em] mb-1">{selectedVehicle.tier} COLLECTION</p>
                            <span className="h-px flex-1 bg-obsidian/5"></span>
                            <div className="flex items-center gap-2 text-[10px] font-black text-obsidian/40 uppercase tracking-widest">
                               <Database size={12} className="text-champagne-gold" /> {selectedVehicle.availability} Units Allocated
                            </div>
                          </div>
                          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-heading font-black text-obsidian tracking-tighter leading-[0.9]">{selectedVehicle.name}</h2>
                          <p className="text-lg text-slate-gray/80 font-light leading-relaxed max-w-xl">
                            {selectedVehicle.desc}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-6 py-8 border-y border-obsidian/5">
                           <div className="space-y-1">
                              <p className="text-[8px] font-black text-slate-gray/30 uppercase tracking-[0.3em]">Momentum</p>
                              <p className="text-2xl font-heading font-black text-obsidian tracking-tighter">{selectedVehicle.specs.horsepower}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[8px] font-black text-slate-gray/30 uppercase tracking-[0.3em]">Pulse 0-60</p>
                              <p className="text-2xl font-heading font-black text-obsidian tracking-tighter">{selectedVehicle.specs.acceleration}</p>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[8px] font-black text-slate-gray/30 uppercase tracking-[0.3em]">Velocity</p>
                              <p className="text-2xl font-heading font-black text-obsidian tracking-tighter">{selectedVehicle.specs.topSpeed}</p>
                           </div>
                        </div>

                        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-8 mt-auto">
                           <div>
                              <p className="text-[9px] font-black text-slate-gray/30 uppercase tracking-[0.3em] mb-1">Session Rate</p>
                              <div className="flex items-baseline gap-2">
                                 <span className="text-4xl font-heading font-black text-obsidian tracking-tighter">${selectedVehicle.price}</span>
                                 <span className="text-[9px] font-black text-slate-gray/20 uppercase tracking-[0.3em]">/ Day</span>
                              </div>
                           </div>
                           <button 
                             onClick={() => setIsReserving(true)}
                             className="w-full sm:w-auto bg-obsidian text-pure-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-champagne-gold transition-all duration-500 shadow-xl flex items-center justify-center gap-3 group/btn"
                           >
                              Reserve Now <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                           </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="reserve"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full flex flex-col"
                      >
                         <button onClick={() => { setIsReserving(false); setIsSuccess(false); }} className="flex items-center gap-2 text-[9px] font-black text-slate-gray uppercase tracking-widest mb-8 hover:text-obsidian transition-colors group">
                            <ArrowRight size={12} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Specs
                         </button>

                         <div className="space-y-8 flex-1">
                            <div>
                               <h3 className="text-4xl font-heading font-black text-obsidian tracking-tighter mb-2">Secure the Session.</h3>
                               <p className="text-slate-gray/60 text-sm font-light">Enter your details to finalize institutional allocation.</p>
                            </div>

                            {!isSuccess ? (
                              <form onSubmit={handleReserve} className="space-y-6">
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                       <label className="text-[9px] font-black text-slate-gray/40 uppercase tracking-[0.3em] ml-1">Identity</label>
                                       <div className="relative group/input">
                                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-gray/30 group-focus-within/input:text-obsidian transition-colors" size={14} />
                                          <input required type="text" placeholder="Johnathan Sterling" className="w-full pl-11 pr-4 py-4 bg-obsidian/5 rounded-xl border-none focus:bg-white focus:ring-1 focus:ring-obsidian/10 outline-none text-[12px] font-bold transition-all" />
                                       </div>
                                    </div>
                                    <div className="space-y-3">
                                       <label className="text-[9px] font-black text-slate-gray/40 uppercase tracking-[0.3em] ml-1">Channel</label>
                                       <div className="relative group/input">
                                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-gray/30 group-focus-within/input:text-obsidian transition-colors" size={14} />
                                          <input required type="email" placeholder="client@exclusive.com" className="w-full pl-11 pr-4 py-4 bg-obsidian/5 rounded-xl border-none focus:bg-white focus:ring-1 focus:ring-obsidian/10 outline-none text-[12px] font-bold transition-all" />
                                       </div>
                                    </div>
                                 </div>
                                 
                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
                                    <div className="space-y-3">
                                       <label className="text-[9px] font-black text-slate-gray/40 uppercase tracking-[0.3em] ml-1">Session Start</label>
                                       <div className="relative group/input">
                                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-gray/30 group-focus-within/input:text-obsidian transition-colors" size={14} />
                                          <input 
                                            required 
                                            type="date" 
                                            min={today}
                                            value={startDate}
                                            onChange={(e) => {
                                              setStartDate(e.target.value);
                                              if (endDate && new Date(e.target.value) > new Date(endDate)) {
                                                setEndDate("");
                                              }
                                            }}
                                            className="w-full pl-11 pr-4 py-4 bg-obsidian/5 rounded-xl border-none focus:bg-white focus:ring-1 focus:ring-obsidian/10 outline-none text-[12px] font-bold transition-all cursor-pointer" 
                                          />
                                       </div>
                                    </div>
                                    <div className="space-y-3">
                                       <label className="text-[9px] font-black text-slate-gray/40 uppercase tracking-[0.3em] ml-1">Session End</label>
                                       <div className="relative group/input">
                                          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-gray/30 group-focus-within/input:text-obsidian transition-colors" size={14} />
                                          <input 
                                            required 
                                            type="date" 
                                            min={startDate}
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                            className="w-full pl-11 pr-4 py-4 bg-obsidian/5 rounded-xl border-none focus:bg-white focus:ring-1 focus:ring-obsidian/10 outline-none text-[12px] font-bold transition-all cursor-pointer" 
                                          />
                                       </div>
                                    </div>
                                 </div>

                                 <div className="p-8 bg-obsidian text-white rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group/total border border-white/5 transition-all">
                                    <div className="absolute inset-0 bg-gradient-to-r from-champagne-gold/15 to-transparent pointer-events-none" />
                                    <div>
                                       <p className="text-[9px] font-black text-pure-white/40 uppercase tracking-[0.4em] mb-1">Authenticated Quote • {duration} Day{duration !== 1 ? 's' : ''}</p>
                                       <div className="flex items-baseline gap-2">
                                          <span className="text-5xl font-heading font-black tracking-tighter">${totalCost.toLocaleString()}</span>
                                          <span className="text-[9px] font-black text-pure-white/20 uppercase tracking-[0.2em]">Total</span>
                                       </div>
                                    </div>
                                    <button 
                                      type="submit" 
                                      disabled={!endDate}
                                      className="w-full sm:w-auto bg-pure-white text-obsidian px-12 py-5 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-champagne-gold hover:text-pure-white transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-20 disabled:cursor-not-allowed group"
                                    >
                                       Initiate <ShieldCheck size={16} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                 </div>
                              </form>
                            ) : (
                              <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="h-64 flex flex-col items-center justify-center text-center bg-obsidian/5 rounded-[3rem] border border-champagne-gold/20 p-10"
                              >
                                 <motion.div 
                                   animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                                   transition={{ duration: 1, ease: "anticipate" }}
                                   className="w-20 h-20 bg-champagne-gold rounded-full flex items-center justify-center text-pure-white mb-6 shadow-2xl shadow-champagne-gold/30"
                                 >
                                    <CheckCircle size={32} />
                                 </motion.div>
                                 <h4 className="text-3xl font-heading font-black tracking-tighter">Session Confirmed.</h4>
                                 <p className="text-[10px] font-black text-slate-gray/40 uppercase tracking-widest mt-2">The Aether Session is Active.</p>
                              </motion.div>
                            )}
                         </div>

                         <div className="mt-6 text-[9px] font-black text-slate-gray/10 uppercase tracking-[0.5em] text-center italic">
                            Strict Privilege Protocol
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
