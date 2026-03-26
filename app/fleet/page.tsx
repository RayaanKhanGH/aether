"use client";

import { useState, useMemo, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Search, SlidersHorizontal, ChevronDown, CheckCircle, MapPin, X, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { VEHICLES } from "../data/vehicles";

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
const SPECIALTIES = ["All", "Electric", "Hybrid", "Petrol", "Sports", "SUV", "Sedan", "Hypercar"];
const PRICES = ["All", "Under $500", "$500 - $1500", "Above $1500"];
const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Performance: High to Low", value: "hp-desc" }
];

export default function FleetPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterTier, setFilterTier] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterSpecialty, setFilterSpecialty] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Debounce search input
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
      if (filterSpecialty !== "All" && v.specialty !== filterSpecialty) return false;
      if (filterPrice === "Under $500" && v.price >= 500) return false;
      if (filterPrice === "$500 - $1500" && (v.price < 500 || v.price > 1500)) return false;
      if (filterPrice === "Above $1500" && v.price <= 1500) return false;
      return true;
    });

    // Sorting logic
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
  }, [debouncedSearch, filterTier, filterLocation, filterSpecialty, filterPrice, sortBy]);

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(prev => prev === dropdown ? null : dropdown);
  };

  const renderDropdownContent = () => {
    let options: string[] = [];
    let currentVal = "";
    let setter: (v: string) => void = () => {};

    if (activeDropdown === "tier") { options = TIERS; currentVal = filterTier; setter = setFilterTier; }
    if (activeDropdown === "location") { options = LOCATIONS; currentVal = filterLocation; setter = setFilterLocation; }
    if (activeDropdown === "specialty") { options = SPECIALTIES; currentVal = filterSpecialty; setter = setFilterSpecialty; }
    if (activeDropdown === "price") { options = PRICES; currentVal = filterPrice; setter = setFilterPrice; }
    if (activeDropdown === "sort") { 
      return (
        <div className="flex flex-wrap gap-3">
          {SORT_OPTIONS.map(opt => (
            <button 
              key={opt.value}
              onClick={() => { setSortBy(opt.value); setActiveDropdown(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${sortBy === opt.value ? 'bg-obsidian text-pure-white hover:bg-obsidian/90' : 'bg-pure-white border border-slate-gray/20 text-obsidian hover:border-obsidian'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-3">
        {options.map(opt => (
          <button 
            key={opt}
            onClick={() => { setter(opt); setActiveDropdown(null); }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${currentVal === opt ? 'bg-obsidian text-pure-white hover:bg-obsidian/90' : 'bg-pure-white border border-slate-gray/20 text-obsidian hover:border-obsidian'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-pure-white flex flex-col pt-[73px]">
      <Navigation />
      
      {/* Global Filter Bar */}
      <div className="sticky top-[73px] bg-pure-white/95 backdrop-blur-md z-40 border-b border-slate-gray/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col lg:flex-row gap-3 sm:gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96 group">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isSearching ? 'text-champagne-gold animate-pulse' : 'text-slate-gray'} group-focus-within:text-champagne-gold`} size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the collection..." 
              className="w-full pl-11 pr-4 py-3 bg-alabaster rounded-full border border-transparent hover:border-slate-gray/20 focus:bg-pure-white focus:border-champagne-gold outline-none text-obsidian transition-all shadow-inner" 
            />
          </div>
          
          {/* Filter Toggles */}
          <div className="flex w-full lg:w-auto gap-3 overflow-x-auto custom-scrollbar pb-2 lg:pb-0 items-center">
            <button 
              onClick={() => toggleDropdown("location")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filterLocation !== "All" || activeDropdown === "location" ? 'bg-alabaster border border-obsidian text-obsidian shadow-sm' : 'bg-pure-white border border-slate-gray/20 text-obsidian hover:border-obsidian hover:shadow-sm'}`}
            >
              <MapPin size={16} className={filterLocation !== "All" ? "text-obsidian" : "text-slate-gray"} /> 
              {filterLocation === "All" ? "Location" : filterLocation} 
              <ChevronDown size={14} className={activeDropdown === 'location' ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            
            <button 
              onClick={() => toggleDropdown("tier")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filterTier !== "All" || activeDropdown === "tier" ? 'bg-alabaster border border-obsidian text-obsidian shadow-sm' : 'bg-pure-white border border-slate-gray/20 text-obsidian hover:border-obsidian hover:shadow-sm'}`}
            >
              Tiers: {filterTier !== "All" ? filterTier : "All"}
              <ChevronDown size={14} className={activeDropdown === 'tier' ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
            
            <button 
              onClick={() => toggleDropdown("price")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filterPrice !== "All" || activeDropdown === "price" ? 'bg-alabaster border border-obsidian text-obsidian shadow-sm' : 'bg-pure-white border border-slate-gray/20 text-obsidian hover:border-obsidian hover:shadow-sm'}`}
            >
              <SlidersHorizontal size={14} className={filterPrice !== "All" ? "text-obsidian" : "text-slate-gray"} /> 
              {filterPrice !== "All" ? filterPrice : "Price Range"}
            </button>

            <div className="h-6 w-px bg-slate-gray/20 mx-1 hidden sm:block" />

            <button 
              onClick={() => toggleDropdown("sort")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${sortBy !== "recommended" || activeDropdown === "sort" ? 'bg-obsidian text-pure-white' : 'bg-pure-white border border-slate-gray/20 text-obsidian hover:border-obsidian'}`}
            >
              Sort: {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
              <ChevronDown size={14} className={activeDropdown === 'sort' ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>

            {(filterLocation !== "All" || filterTier !== "All" || filterPrice !== "All" || search !== "") && (
              <button 
                onClick={() => { setSearch(""); setFilterTier("All"); setFilterLocation("All"); setFilterPrice("All"); setSortBy("recommended"); }}
                className="text-xs font-technical uppercase tracking-widest text-slate-gray hover:text-obsidian transition-colors px-2 underline underline-offset-4"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Expanded Filter Panel */}
        <AnimatePresence>
          {activeDropdown && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-full left-0 w-full overflow-hidden bg-alabaster/95 backdrop-blur-md border-b border-slate-gray/10 shadow-lg"
            >
              <div className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase font-technical text-slate-gray tracking-wider">Select Option</span>
                  <button onClick={() => setActiveDropdown(null)} className="text-slate-gray hover:text-obsidian"><X size={16}/></button>
                </div>
                {renderDropdownContent()}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fleet Grid */}
      <section className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full text-obsidian overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">The Gallery</h1>
            <div className="flex gap-2">
              <span className="bg-alabaster px-3 py-1 rounded-full text-[10px] font-technical tracking-widest text-slate-gray uppercase">PREMIUM INVENTORY</span>
              {debouncedSearch && <span className="bg-obsidian text-pure-white px-3 py-1 rounded-full text-[10px] font-technical tracking-widest uppercase">SEARCH: "{debouncedSearch}"</span>}
            </div>
          </div>
          <p className="text-slate-gray font-technical text-sm">SHOWING {filteredVehicles.length} VEHICLE{filteredVehicles.length !== 1 ? 'S' : ''}</p>
        </div>
        
        {filteredVehicles.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
             <div className="w-16 h-16 bg-alabaster rounded-full flex items-center justify-center mb-6 text-slate-gray/30">
               <Search size={32} />
             </div>
             <h3 className="text-2xl font-bold text-obsidian mb-2">No matching vehicles.</h3>
             <p className="text-slate-gray/80 mb-8 max-w-sm mx-auto font-light">Your specific selection is currently unavailable. Our concierge can source any vehicle for you.</p>
             <div className="flex gap-4">
              <button onClick={() => { setSearch(""); setFilterTier("All"); setFilterLocation("All"); setFilterSpecialty("All"); setFilterPrice("All"); setSortBy("recommended"); }} className="px-6 py-3 border border-obsidian text-obsidian rounded-md font-bold hover:bg-alabaster transition-colors">Reset Filters</button>
              <button className="px-6 py-3 bg-obsidian text-pure-white rounded-md font-bold hover:bg-champagne-gold transition-colors shadow-lg">Contact Concierge</button>
             </div>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: {}
            }}
          >
            {filteredVehicles.map((vehicle) => (
              <motion.div 
                key={vehicle.id} 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setSelectedVehicle(vehicle)}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                className="group cursor-pointer flex flex-col h-full bg-pure-white rounded-2xl p-4 border border-transparent hover:border-slate-gray/10 hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Placeholder */}
                <div className="aspect-[16/10] bg-alabaster rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-slate-gray/10 relative">
                  <span className="text-slate-gray/50 text-xs font-technical tracking-widest uppercase opacity-40">IMAGE PENDING</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Tier Badge */}
                  <div className="absolute top-4 left-4 bg-pure-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-tighter text-obsidian shadow-sm border border-slate-gray/10">
                    {vehicle.tier.toUpperCase()}
                  </div>

                  {/* Availability Badge */}
                  <div className="absolute top-4 right-4 bg-obsidian text-pure-white px-2 py-1 rounded-sm text-[9px] font-technical tracking-widest uppercase">
                    {vehicle.availability} AVAILABLE
                  </div>
                </div>
                
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold tracking-tight text-obsidian group-hover:text-champagne-gold transition-colors">{vehicle.name}</h3>
                  <div className="text-right">
                    <span className="text-xl font-black text-obsidian">${vehicle.price}</span>
                    <span className="text-[10px] font-technical text-slate-gray block -mt-1 uppercase">PER DAY</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-gray/10 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-technical text-slate-gray uppercase tracking-widest whitespace-nowrap">
                  <span className="flex items-center gap-1.5"><MapPin size={12} className="text-slate-gray/60" /> {vehicle.location}</span>
                  <span className="flex items-center gap-1.5"><Zap size={12} className="text-slate-gray/60" /> {vehicle.specs.horsepower}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Trust Layer */}
      <section className="bg-obsidian text-pure-white py-20 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 tracking-tight text-champagne-gold">Integrity in Every Mile.</h2>
          <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
            {['500+ Vetted Vendors', '100% Privacy-Focused Fleet', 'Guaranteed Final Pricing'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 justify-center text-lg">
                <CheckCircle className="text-pure-white" size={20} />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-obsidian text-slate-gray py-12 text-center text-sm border-t border-slate-gray/20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-pure-white font-bold text-xl tracking-tight mb-4 md:mb-0 lowercase">Aether.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-champagne-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-champagne-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-champagne-gold transition-colors">Contact</a>
          </div>
          <p className="mt-6 md:mt-0">© 2026 Aether Automotive. All rights reserved.</p>
        </div>
      </footer>

      {/* Vehicle Modal (Full Page Reveal) */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-8 cursor-pointer"
            onClick={() => setSelectedVehicle(null)}
          >
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-obsidian/70 backdrop-blur-md" 
            />
            
            {/* Modal Content */}
            <motion.div 
              layoutId={`card-${selectedVehicle.id}`}
              transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-pure-white w-full max-w-6xl rounded-t-2xl sm:rounded-2xl shadow-2xl overflow-hidden cursor-auto flex flex-col md:flex-row h-[92vh] sm:h-[90vh] md:max-h-[85vh]"
            >
              {/* Left side: Hero Image */}
              <div className="w-full md:w-[55%] h-48 sm:h-64 md:h-full bg-alabaster flex items-center justify-center relative border-b md:border-b-0 md:border-r border-slate-gray/10 shrink-0">
                 <span className="text-slate-gray/50 font-technical text-sm tracking-widest z-10">VEHICLE IMAGE PENDING</span>
                 <button 
                   className="absolute top-4 left-4 text-obsidian rounded-full bg-pure-white p-2 md:hidden shadow-md z-20" 
                   onClick={() => setSelectedVehicle(null)}
                 >
                   <X size={20} />
                 </button>
                 
                 {/* Premium subtle gradient over placeholder */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-alabaster via-transparent to-transparent opacity-50" />
              </div>
              
              {/* Right side: Information */}
              <div className="w-full md:w-[45%] p-5 sm:p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-champagne-gold font-technical text-xs tracking-widest uppercase mb-2 block">{selectedVehicle.tier} COLLECTION • {selectedVehicle.location}</span>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-obsidian tracking-tight leading-none">{selectedVehicle.name}</h2>
                    </div>
                    <button className="hidden md:flex bg-alabaster p-2 rounded-full text-slate-gray hover:text-obsidian hover:bg-slate-gray/10 transition-colors" onClick={() => setSelectedVehicle(null)}>
                      <X size={24} />
                    </button>
                 </div>
                 
                 <div className="flex gap-3 sm:gap-4 text-xs sm:text-sm font-technical text-slate-gray uppercase tracking-wider mb-6 sm:mb-8 border-b border-slate-gray/20 pb-4 sm:pb-6">
                   <span>{selectedVehicle.seats} SEATS</span> •
                   <span>{selectedVehicle.tier}</span> •
                   <span>{selectedVehicle.fuel}</span>
                 </div>
                 
                 <div className="mb-6 sm:mb-10">
                   <h3 className="text-sm font-technical text-obsidian mb-3">OVERVIEW</h3>
                   <p className="text-slate-gray leading-relaxed text-lg">
                     {selectedVehicle.desc}
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-10 bg-alabaster rounded-xl p-4 sm:p-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-technical text-slate-gray mb-1">HORSEPOWER</span>
                      <span className="text-lg font-bold text-obsidian">{selectedVehicle.specs.horsepower}</span>
                    </div>
                    <div className="flex flex-col border-l border-slate-gray/20 pl-4">
                      <span className="text-[10px] font-technical text-slate-gray mb-1">0-60 MPH</span>
                      <span className="text-lg font-bold text-obsidian">{selectedVehicle.specs.acceleration}</span>
                    </div>
                    <div className="flex flex-col border-l border-slate-gray/20 pl-4">
                      <span className="text-[10px] font-technical text-slate-gray mb-1">TOP SPEED</span>
                      <span className="text-lg font-bold text-obsidian">{selectedVehicle.specs.topSpeed}</span>
                    </div>
                 </div>
                 
                 <div className="mt-auto pt-6 border-t border-slate-gray/20 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-center sm:text-left w-full sm:w-auto">
                      <p className="text-xs font-technical text-slate-gray mb-1 uppercase tracking-wider">Daily Rate • {selectedVehicle.availability} In Stock</p>
                      <span className="text-3xl font-extrabold text-obsidian">${selectedVehicle.price}</span>
                    </div>
                    <button className="w-full sm:w-auto bg-obsidian text-pure-white px-8 py-4 rounded-md font-bold hover:bg-champagne-gold transition-colors flex items-center justify-center gap-2 hover-scale">
                      Reserve Now <ArrowRight size={18} />
                    </button>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
