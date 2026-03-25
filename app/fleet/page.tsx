"use client";

import { useState, useMemo, useEffect } from "react";
import Navigation from "../components/Navigation";
import { Search, SlidersHorizontal, ChevronDown, CheckCircle, MapPin, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  specs: { horsepower: string; acceleration: string; topSpeed: string };
};

const VEHICLES: Vehicle[] = [
{"id":"v1","name":"Mercedes-Benz SLS AMG","tier":"Elite","specialty":"Sports","location":"Miami","price":1284,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Gullwing doors and a roaring V8 define this modern classic.","specs":{"horsepower":"563 hp","acceleration":"3.7s","topSpeed":"197 mph"}},
{"id":"v2","name":"Range Rover Autobiography","tier":"Executive","specialty":"SUV","location":"Miami","price":594,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Command the road with ultimate British luxury and capability.","specs":{"horsepower":"523 hp","acceleration":"4.4s","topSpeed":"155 mph"}},
{"id":"v3","name":"Lamborghini Huracán EVO","tier":"Elite","specialty":"Hypercar","location":"Miami","price":1635,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"A naturally aspirated V10 screaming masterpiece.","specs":{"horsepower":"631 hp","acceleration":"2.9s","topSpeed":"202 mph"}},
{"id":"v4","name":"Honda Accord Touring","tier":"Budget","specialty":"Sedan","location":"Miami","price":81,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Spacious, responsive, and incredibly practical.","specs":{"horsepower":"252 hp","acceleration":"5.7s","topSpeed":"130 mph"}},
{"id":"v5","name":"Lexus RX 350","tier":"Economy+","specialty":"SUV","location":"Miami","price":164,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Smooth, quiet, and reliable daily luxury.","specs":{"horsepower":"295 hp","acceleration":"7.2s","topSpeed":"124 mph"}},
{"id":"v6","name":"Audi e-tron GT","tier":"Premium","specialty":"Electric","location":"Miami","price":322,"seats":4,"transmission":"Automatic","fuel":"Electric","desc":"Sleek, aerodynamic, and shockingly fast electric grand tourer.","specs":{"horsepower":"522 hp","acceleration":"3.9s","topSpeed":"152 mph"}},
{"id":"v7","name":"Ferrari F8 Tributo","tier":"Elite","specialty":"Hypercar","location":"Miami","price":1767,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"The ultimate expression of the legendary Ferrari V8.","specs":{"horsepower":"710 hp","acceleration":"2.8s","topSpeed":"211 mph"}},
{"id":"v8","name":"Mercedes-Benz SLS AMG","tier":"Elite","specialty":"Sports","location":"Monaco","price":1284,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Gullwing doors and a roaring V8 define this modern classic.","specs":{"horsepower":"563 hp","acceleration":"3.7s","topSpeed":"197 mph"}},
{"id":"v9","name":"Range Rover Autobiography","tier":"Executive","specialty":"SUV","location":"Monaco","price":594,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Command the road with ultimate British luxury and capability.","specs":{"horsepower":"523 hp","acceleration":"4.4s","topSpeed":"155 mph"}},
{"id":"v10","name":"Lamborghini Huracán EVO","tier":"Elite","specialty":"Hypercar","location":"Monaco","price":1635,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"A naturally aspirated V10 screaming masterpiece.","specs":{"horsepower":"631 hp","acceleration":"2.9s","topSpeed":"202 mph"}},
{"id":"v11","name":"Honda Accord Touring","tier":"Budget","specialty":"Sedan","location":"Monaco","price":81,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Spacious, responsive, and incredibly practical.","specs":{"horsepower":"252 hp","acceleration":"5.7s","topSpeed":"130 mph"}},
{"id":"v12","name":"Lexus RX 350","tier":"Economy+","specialty":"SUV","location":"Monaco","price":164,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Smooth, quiet, and reliable daily luxury.","specs":{"horsepower":"295 hp","acceleration":"7.2s","topSpeed":"124 mph"}},
{"id":"v13","name":"Audi e-tron GT","tier":"Premium","specialty":"Electric","location":"Dubai","price":343,"seats":4,"transmission":"Automatic","fuel":"Electric","desc":"Sleek, aerodynamic, and shockingly fast electric grand tourer.","specs":{"horsepower":"522 hp","acceleration":"3.9s","topSpeed":"152 mph"}},
{"id":"v14","name":"Ferrari F8 Tributo","tier":"Elite","specialty":"Hypercar","location":"Dubai","price":1881,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"The ultimate expression of the legendary Ferrari V8.","specs":{"horsepower":"710 hp","acceleration":"2.8s","topSpeed":"211 mph"}},
{"id":"v15","name":"Toyota Camry HEV Premium","tier":"Budget","specialty":"Sedan","location":"Dubai","price":85,"seats":5,"transmission":"Automatic","fuel":"Hybrid","desc":"Reliable, comfortable, and highly efficient.","specs":{"horsepower":"208 hp","acceleration":"7.4s","topSpeed":"115 mph"}},
{"id":"v16","name":"Tesla Model 3 Long Range","tier":"Economy","specialty":"Electric","location":"Dubai","price":121,"seats":5,"transmission":"Automatic","fuel":"Electric","desc":"The benchmark for modern electric driving.","specs":{"horsepower":"346 hp","acceleration":"4.2s","topSpeed":"145 mph"}},
{"id":"v17","name":"Mercedes-Benz E-Class","tier":"Economy+","specialty":"Sedan","location":"Dubai","price":224,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"A masterful blend of luxury, technology, and performance.","specs":{"horsepower":"255 hp","acceleration":"6.1s","topSpeed":"130 mph"}},
{"id":"v18","name":"BMW X5 xDrive40i","tier":"Premium","specialty":"SUV","location":"Dubai","price":288,"seats":5,"transmission":"Automatic","fuel":"Hybrid","desc":"Versatile luxury SUV built for both comfort and presence.","specs":{"horsepower":"335 hp","acceleration":"5.3s","topSpeed":"150 mph"}},
{"id":"v19","name":"Porsche 911 Carrera S","tier":"Executive","specialty":"Sports","location":"Dubai","price":676,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Timeless sports car silhouette with precision engineering.","specs":{"horsepower":"443 hp","acceleration":"3.5s","topSpeed":"191 mph"}},
{"id":"v20","name":"Mercedes-AMG GT","tier":"Executive","specialty":"Sports","location":"Los Angeles","price":742,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Aggressive styling meets uncompromising power on the track and road.","specs":{"horsepower":"523 hp","acceleration":"3.7s","topSpeed":"193 mph"}},
{"id":"v21","name":"Mercedes-Benz SLS AMG","tier":"Elite","specialty":"Sports","location":"Los Angeles","price":1284,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Gullwing doors and a roaring V8 define this modern classic.","specs":{"horsepower":"563 hp","acceleration":"3.7s","topSpeed":"197 mph"}},
{"id":"v22","name":"Range Rover Autobiography","tier":"Executive","specialty":"SUV","location":"Los Angeles","price":594,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Command the road with ultimate British luxury and capability.","specs":{"horsepower":"523 hp","acceleration":"4.4s","topSpeed":"155 mph"}},
{"id":"v23","name":"Lamborghini Huracán EVO","tier":"Elite","specialty":"Hypercar","location":"Los Angeles","price":1635,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"A naturally aspirated V10 screaming masterpiece.","specs":{"horsepower":"631 hp","acceleration":"2.9s","topSpeed":"202 mph"}},
{"id":"v24","name":"Honda Accord Touring","tier":"Budget","specialty":"Sedan","location":"Los Angeles","price":81,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Spacious, responsive, and incredibly practical.","specs":{"horsepower":"252 hp","acceleration":"5.7s","topSpeed":"130 mph"}},
{"id":"v25","name":"Lexus RX 350","tier":"Economy+","specialty":"SUV","location":"Los Angeles","price":164,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Smooth, quiet, and reliable daily luxury.","specs":{"horsepower":"295 hp","acceleration":"7.2s","topSpeed":"124 mph"}},
{"id":"v26","name":"Audi e-tron GT","tier":"Premium","specialty":"Electric","location":"Los Angeles","price":322,"seats":4,"transmission":"Automatic","fuel":"Electric","desc":"Sleek, aerodynamic, and shockingly fast electric grand tourer.","specs":{"horsepower":"522 hp","acceleration":"3.9s","topSpeed":"152 mph"}},
{"id":"v27","name":"Mercedes-AMG GT","tier":"Executive","specialty":"Sports","location":"London","price":742,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Aggressive styling meets uncompromising power on the track and road.","specs":{"horsepower":"523 hp","acceleration":"3.7s","topSpeed":"193 mph"}},
{"id":"v28","name":"Mercedes-Benz SLS AMG","tier":"Elite","specialty":"Sports","location":"London","price":1284,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Gullwing doors and a roaring V8 define this modern classic.","specs":{"horsepower":"563 hp","acceleration":"3.7s","topSpeed":"197 mph"}},
{"id":"v29","name":"Range Rover Autobiography","tier":"Executive","specialty":"SUV","location":"London","price":594,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Command the road with ultimate British luxury and capability.","specs":{"horsepower":"523 hp","acceleration":"4.4s","topSpeed":"155 mph"}},
{"id":"v30","name":"Lamborghini Huracán EVO","tier":"Elite","specialty":"Hypercar","location":"London","price":1635,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"A naturally aspirated V10 screaming masterpiece.","specs":{"horsepower":"631 hp","acceleration":"2.9s","topSpeed":"202 mph"}},
{"id":"v31","name":"Honda Accord Touring","tier":"Budget","specialty":"Sedan","location":"London","price":81,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Spacious, responsive, and incredibly practical.","specs":{"horsepower":"252 hp","acceleration":"5.7s","topSpeed":"130 mph"}},
{"id":"v32","name":"Honda Accord Touring","tier":"Budget","specialty":"Sedan","location":"Paris","price":81,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Spacious, responsive, and incredibly practical.","specs":{"horsepower":"252 hp","acceleration":"5.7s","topSpeed":"130 mph"}},
{"id":"v33","name":"Lexus RX 350","tier":"Economy+","specialty":"SUV","location":"Paris","price":164,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Smooth, quiet, and reliable daily luxury.","specs":{"horsepower":"295 hp","acceleration":"7.2s","topSpeed":"124 mph"}},
{"id":"v34","name":"Audi e-tron GT","tier":"Premium","specialty":"Electric","location":"Paris","price":322,"seats":4,"transmission":"Automatic","fuel":"Electric","desc":"Sleek, aerodynamic, and shockingly fast electric grand tourer.","specs":{"horsepower":"522 hp","acceleration":"3.9s","topSpeed":"152 mph"}},
{"id":"v35","name":"Ferrari F8 Tributo","tier":"Elite","specialty":"Hypercar","location":"Paris","price":1767,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"The ultimate expression of the legendary Ferrari V8.","specs":{"horsepower":"710 hp","acceleration":"2.8s","topSpeed":"211 mph"}},
{"id":"v36","name":"Toyota Camry HEV Premium","tier":"Budget","specialty":"Sedan","location":"Paris","price":80,"seats":5,"transmission":"Automatic","fuel":"Hybrid","desc":"Reliable, comfortable, and highly efficient.","specs":{"horsepower":"208 hp","acceleration":"7.4s","topSpeed":"115 mph"}},
{"id":"v37","name":"Tesla Model 3 Long Range","tier":"Economy","specialty":"Electric","location":"Paris","price":114,"seats":5,"transmission":"Automatic","fuel":"Electric","desc":"The benchmark for modern electric driving.","specs":{"horsepower":"346 hp","acceleration":"4.2s","topSpeed":"145 mph"}},
{"id":"v38","name":"Mercedes-Benz E-Class","tier":"Economy+","specialty":"Sedan","location":"Paris","price":211,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"A masterful blend of luxury, technology, and performance.","specs":{"horsepower":"255 hp","acceleration":"6.1s","topSpeed":"130 mph"}},
{"id":"v39","name":"Range Rover Autobiography","tier":"Executive","specialty":"SUV","location":"New York","price":594,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Command the road with ultimate British luxury and capability.","specs":{"horsepower":"523 hp","acceleration":"4.4s","topSpeed":"155 mph"}},
{"id":"v40","name":"Lamborghini Huracán EVO","tier":"Elite","specialty":"Hypercar","location":"New York","price":1635,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"A naturally aspirated V10 screaming masterpiece.","specs":{"horsepower":"631 hp","acceleration":"2.9s","topSpeed":"202 mph"}},
{"id":"v41","name":"Honda Accord Touring","tier":"Budget","specialty":"Sedan","location":"New York","price":81,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Spacious, responsive, and incredibly practical.","specs":{"horsepower":"252 hp","acceleration":"5.7s","topSpeed":"130 mph"}},
{"id":"v42","name":"Lexus RX 350","tier":"Economy+","specialty":"SUV","location":"New York","price":164,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"Smooth, quiet, and reliable daily luxury.","specs":{"horsepower":"295 hp","acceleration":"7.2s","topSpeed":"124 mph"}},
{"id":"v43","name":"Audi e-tron GT","tier":"Premium","specialty":"Electric","location":"New York","price":322,"seats":4,"transmission":"Automatic","fuel":"Electric","desc":"Sleek, aerodynamic, and shockingly fast electric grand tourer.","specs":{"horsepower":"522 hp","acceleration":"3.9s","topSpeed":"152 mph"}},
{"id":"v44","name":"Ferrari F8 Tributo","tier":"Elite","specialty":"Hypercar","location":"New York","price":1767,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"The ultimate expression of the legendary Ferrari V8.","specs":{"horsepower":"710 hp","acceleration":"2.8s","topSpeed":"211 mph"}},
{"id":"v45","name":"Toyota Camry HEV Premium","tier":"Budget","specialty":"Sedan","location":"New York","price":80,"seats":5,"transmission":"Automatic","fuel":"Hybrid","desc":"Reliable, comfortable, and highly efficient.","specs":{"horsepower":"208 hp","acceleration":"7.4s","topSpeed":"115 mph"}},
{"id":"v46","name":"Toyota Camry HEV Premium","tier":"Budget","specialty":"Sedan","location":"Tokyo","price":80,"seats":5,"transmission":"Automatic","fuel":"Hybrid","desc":"Reliable, comfortable, and highly efficient.","specs":{"horsepower":"208 hp","acceleration":"7.4s","topSpeed":"115 mph"}},
{"id":"v47","name":"Tesla Model 3 Long Range","tier":"Economy","specialty":"Electric","location":"Tokyo","price":114,"seats":5,"transmission":"Automatic","fuel":"Electric","desc":"The benchmark for modern electric driving.","specs":{"horsepower":"346 hp","acceleration":"4.2s","topSpeed":"145 mph"}},
{"id":"v48","name":"Mercedes-Benz E-Class","tier":"Economy+","specialty":"Sedan","location":"Tokyo","price":211,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"A masterful blend of luxury, technology, and performance.","specs":{"horsepower":"255 hp","acceleration":"6.1s","topSpeed":"130 mph"}},
{"id":"v49","name":"BMW X5 xDrive40i","tier":"Premium","specialty":"SUV","location":"Tokyo","price":272,"seats":5,"transmission":"Automatic","fuel":"Hybrid","desc":"Versatile luxury SUV built for both comfort and presence.","specs":{"horsepower":"335 hp","acceleration":"5.3s","topSpeed":"150 mph"}},
{"id":"v50","name":"Porsche 911 Carrera S","tier":"Executive","specialty":"Sports","location":"Tokyo","price":637,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Timeless sports car silhouette with precision engineering.","specs":{"horsepower":"443 hp","acceleration":"3.5s","topSpeed":"191 mph"}},
{"id":"v51","name":"Rolls-Royce Phantom VIII","tier":"Elite","specialty":"Sedan","location":"Tokyo","price":1782,"seats":4,"transmission":"Automatic","fuel":"Petrol","desc":"The absolute pinnacle of handcrafted automotive luxury.","specs":{"horsepower":"563 hp","acceleration":"5.1s","topSpeed":"155 mph"}},
{"id":"v52","name":"Mercedes-AMG GT","tier":"Executive","specialty":"Sports","location":"Tokyo","price":700,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Aggressive styling meets uncompromising power on the track and road.","specs":{"horsepower":"523 hp","acceleration":"3.7s","topSpeed":"193 mph"}},
{"id":"v53","name":"Tesla Model 3 Long Range","tier":"Economy","specialty":"Electric","location":"Geneva","price":121,"seats":5,"transmission":"Automatic","fuel":"Electric","desc":"The benchmark for modern electric driving.","specs":{"horsepower":"346 hp","acceleration":"4.2s","topSpeed":"145 mph"}},
{"id":"v54","name":"Mercedes-Benz E-Class","tier":"Economy+","specialty":"Sedan","location":"Geneva","price":224,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"A masterful blend of luxury, technology, and performance.","specs":{"horsepower":"255 hp","acceleration":"6.1s","topSpeed":"130 mph"}},
{"id":"v55","name":"BMW X5 xDrive40i","tier":"Premium","specialty":"SUV","location":"Geneva","price":288,"seats":5,"transmission":"Automatic","fuel":"Hybrid","desc":"Versatile luxury SUV built for both comfort and presence.","specs":{"horsepower":"335 hp","acceleration":"5.3s","topSpeed":"150 mph"}},
{"id":"v56","name":"Porsche 911 Carrera S","tier":"Executive","specialty":"Sports","location":"Geneva","price":676,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"Timeless sports car silhouette with precision engineering.","specs":{"horsepower":"443 hp","acceleration":"3.5s","topSpeed":"191 mph"}},
{"id":"v57","name":"Rolls-Royce Phantom VIII","tier":"Elite","specialty":"Sedan","location":"Geneva","price":1890,"seats":4,"transmission":"Automatic","fuel":"Petrol","desc":"The absolute pinnacle of handcrafted automotive luxury.","specs":{"horsepower":"563 hp","acceleration":"5.1s","topSpeed":"155 mph"}},
{"id":"v58","name":"Ferrari F8 Tributo","tier":"Elite","specialty":"Hypercar","location":"Singapore","price":1767,"seats":2,"transmission":"Automatic","fuel":"Petrol","desc":"The ultimate expression of the legendary Ferrari V8.","specs":{"horsepower":"710 hp","acceleration":"2.8s","topSpeed":"211 mph"}},
{"id":"v59","name":"Toyota Camry HEV Premium","tier":"Budget","specialty":"Sedan","location":"Singapore","price":80,"seats":5,"transmission":"Automatic","fuel":"Hybrid","desc":"Reliable, comfortable, and highly efficient.","specs":{"horsepower":"208 hp","acceleration":"7.4s","topSpeed":"115 mph"}},
{"id":"v60","name":"Tesla Model 3 Long Range","tier":"Economy","specialty":"Electric","location":"Singapore","price":114,"seats":5,"transmission":"Automatic","fuel":"Electric","desc":"The benchmark for modern electric driving.","specs":{"horsepower":"346 hp","acceleration":"4.2s","topSpeed":"145 mph"}},
{"id":"v61","name":"Mercedes-Benz E-Class","tier":"Economy+","specialty":"Sedan","location":"Singapore","price":211,"seats":5,"transmission":"Automatic","fuel":"Petrol","desc":"A masterful blend of luxury, technology, and performance.","specs":{"horsepower":"255 hp","acceleration":"6.1s","topSpeed":"130 mph"}},
{"id":"v62","name":"BMW X5 xDrive40i","tier":"Premium","specialty":"SUV","location":"Singapore","price":272,"seats":5,"transmission":"Automatic","fuel":"Hybrid","desc":"Versatile luxury SUV built for both comfort and presence.","specs":{"horsepower":"335 hp","acceleration":"5.3s","topSpeed":"150 mph"}}
];

const TIERS = ["All", "Budget", "Economy", "Economy+", "Premium", "Executive", "Elite"];
const LOCATIONS = ["All", "Miami", "Monaco", "Dubai", "Los Angeles", "London", "Paris", "New York", "Tokyo", "Geneva", "Singapore"];
const SPECIALTIES = ["All", "Electric", "Hybrid", "Petrol", "Sports", "SUV", "Sedan", "Hypercar"];
const PRICES = ["All", "Under $500", "$500 - $1500", "Above $1500"];

export default function FleetPage() {
  const [search, setSearch] = useState("");
  const [filterTier, setFilterTier] = useState("All");
  const [filterLocation, setFilterLocation] = useState("All");
  const [filterSpecialty, setFilterSpecialty] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tierParam = params.get("tier");
    if (tierParam && TIERS.includes(tierParam)) {
      setFilterTier(tierParam);
    }
  }, []);

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter(v => {
      if (search && !v.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterTier !== "All" && v.tier !== filterTier) return false;
      if (filterLocation !== "All" && v.location !== filterLocation) return false;
      if (filterSpecialty !== "All" && v.specialty !== filterSpecialty) return false;
      if (filterPrice === "Under $500" && v.price >= 500) return false;
      if (filterPrice === "$500 - $1500" && (v.price < 500 || v.price > 1500)) return false;
      if (filterPrice === "Above $1500" && v.price <= 1500) return false;
      return true;
    });
  }, [search, filterTier, filterLocation, filterSpecialty, filterPrice]);

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
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-gray transition-colors group-focus-within:text-champagne-gold" size={18} />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search the collection..." 
              className="w-full pl-11 pr-4 py-3 bg-alabaster rounded-full border border-transparent hover:border-slate-gray/20 focus:bg-pure-white focus:border-champagne-gold outline-none text-obsidian transition-all shadow-inner" 
            />
          </div>
          
          {/* Filter Toggles */}
          <div className="flex w-full lg:w-auto gap-3 overflow-x-auto custom-scrollbar pb-2 lg:pb-0">
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
              onClick={() => toggleDropdown("specialty")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filterSpecialty !== "All" || activeDropdown === "specialty" ? 'bg-alabaster border border-obsidian text-obsidian shadow-sm' : 'bg-pure-white border border-slate-gray/20 text-obsidian hover:border-obsidian hover:shadow-sm'}`}
            >
              Spec: {filterSpecialty !== "All" ? filterSpecialty : "All"}
              <ChevronDown size={14} className={activeDropdown === 'specialty' ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>

            <button 
              onClick={() => toggleDropdown("price")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${filterPrice !== "All" || activeDropdown === "price" ? 'bg-alabaster border border-obsidian text-obsidian shadow-sm' : 'bg-pure-white border border-slate-gray/20 text-obsidian hover:border-obsidian hover:shadow-sm'}`}
            >
              <SlidersHorizontal size={14} className={filterPrice !== "All" ? "text-obsidian" : "text-slate-gray"} /> 
              {filterPrice !== "All" ? filterPrice : "Price Range"}
            </button>
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
      <section className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full text-obsidian">
        <div className="flex justify-between items-end mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">The Gallery</h1>
          <p className="text-slate-gray font-technical text-sm hidden sm:block">SHOWING {filteredVehicles.length} VEHICLE{filteredVehicles.length !== 1 ? 'S' : ''}</p>
        </div>
        
        {filteredVehicles.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center">
             <h3 className="text-2xl font-bold text-slate-gray mb-2">No vehicles found.</h3>
             <p className="text-slate-gray/80 mb-6">Try adjusting your filters or search criteria.</p>
             <button onClick={() => { setSearch(""); setFilterTier("All"); setFilterLocation("All"); setFilterSpecialty("All"); setFilterPrice("All"); }} className="px-6 py-3 bg-obsidian text-pure-white rounded-md font-bold hover:bg-champagne-gold transition-colors">Clear All Filters</button>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
            {filteredVehicles.map((vehicle) => (
              <motion.div 
                key={vehicle.id} 
                layoutId={`card-${vehicle.id}`}
                onClick={() => setSelectedVehicle(vehicle)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer flex flex-col"
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-alabaster rounded-xl mb-5 flex items-center justify-center overflow-hidden border border-slate-gray/10 shadow-sm group-hover:shadow-xl transition-all duration-300 group-hover:border-champagne-gold/30">
                  <span className="text-slate-gray/50 text-sm font-technical tracking-widest">VEHICLE IMAGE PENDING</span>
                </div>
                
                <div className="flex justify-between items-start mb-2 px-1">
                  <h3 className="text-xl font-bold group-hover:text-champagne-gold transition-colors">{vehicle.name}</h3>
                  <span className="text-obsidian font-bold bg-alabaster px-3 py-1 rounded text-sm">${vehicle.price}/d</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-technical text-slate-gray uppercase tracking-wider px-1">
                  <span className="flex items-center gap-1 text-obsidian"><MapPin size={12} /> {vehicle.location}</span> •
                  <span>{vehicle.tier}</span> •
                  <span>{vehicle.fuel}</span>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 cursor-pointer"
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
              className="relative bg-pure-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden cursor-auto flex flex-col md:flex-row h-[90vh] md:max-h-[85vh]"
            >
              {/* Left side: Hero Image */}
              <div className="w-full md:w-[55%] h-64 md:h-full bg-alabaster flex items-center justify-center relative border-r border-slate-gray/10">
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
              <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col overflow-y-auto custom-scrollbar">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="text-champagne-gold font-technical text-xs tracking-widest uppercase mb-2 block">{selectedVehicle.tier} COLLECTION • {selectedVehicle.location}</span>
                      <h2 className="text-3xl md:text-4xl font-extrabold text-obsidian tracking-tight leading-none">{selectedVehicle.name}</h2>
                    </div>
                    <button className="hidden md:flex bg-alabaster p-2 rounded-full text-slate-gray hover:text-obsidian hover:bg-slate-gray/10 transition-colors" onClick={() => setSelectedVehicle(null)}>
                      <X size={24} />
                    </button>
                 </div>
                 
                 <div className="flex gap-4 text-sm font-technical text-slate-gray uppercase tracking-wider mb-8 border-b border-slate-gray/20 pb-6">
                   <span>{selectedVehicle.seats} SEATS</span> •
                   <span>{selectedVehicle.tier}</span> •
                   <span>{selectedVehicle.fuel}</span>
                 </div>
                 
                 <div className="mb-10">
                   <h3 className="text-sm font-technical text-obsidian mb-3">OVERVIEW</h3>
                   <p className="text-slate-gray leading-relaxed text-lg">
                     {selectedVehicle.desc}
                   </p>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-4 mb-10 bg-alabaster rounded-xl p-6">
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
                      <p className="text-xs font-technical text-slate-gray mb-1 uppercase tracking-wider">Daily Rate</p>
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
