"use client";

import Navigation from "../components/Navigation";
import CustomSelect from "../components/CustomSelect";
import { Building, Shield, Globe } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function VendorPage() {
  const ref = useRef(null);
  const [idType, setIdType] = useState("");
  const [nationality, setNationality] = useState("");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const inputClasses = "w-full px-4 py-3 bg-pure-white rounded-md outline-none focus:ring-2 focus:ring-champagne-gold/40 border border-slate-gray/20 text-obsidian placeholder-slate-gray/60 transition-all shadow-sm text-sm";
  const labelClasses = "block text-xs font-medium text-obsidian mb-1 uppercase tracking-wide";

  return (
    <main className="min-h-screen bg-pure-white flex flex-col pt-[73px]">
      <Navigation />
      
      {/* Vendor Hero Banner */}
      <div ref={ref} className="w-full h-64 md:h-80 relative bg-obsidian flex items-center justify-center border-b border-slate-gray/20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center origin-top basis-full"
          style={{ 
            backgroundImage: 'url("/images/aether-vendor.png")',
            y: backgroundY,
            scale: 1.1
          }}
        >
          <div className="absolute inset-0 bg-obsidian/50 mix-blend-multiply" />
        </motion.div>
        <h1 className="relative z-10 text-5xl md:text-7xl font-extrabold tracking-tight text-pure-white text-center">Partner Portal</h1>
      </div>

      <section className="flex-grow max-w-7xl mx-auto px-6 py-16 md:py-24 w-full text-obsidian grid lg:grid-cols-2 gap-16">
        
        {/* The Proposition */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-obsidian mb-10 leading-snug">Access the most exclusive clientele in the world.</h2>
          
          <div className="space-y-10">
            <div className="flex gap-5">
              <div className="bg-alabaster p-4 rounded-full self-start text-champagne-gold">
                <Building size={28} />
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-2 text-obsidian">Unmatched Prestige</h3>
                <p className="text-slate-gray leading-relaxed text-lg">Listing your fleet on Aether associates your brand with the pinnacle of luxury, opening doors to an elite global audience.</p>
              </div>
            </div>
            
            <div className="flex gap-5">
              <div className="bg-alabaster p-4 rounded-full self-start text-champagne-gold">
                <Shield size={28} />
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-2 text-obsidian">Seamless Protection</h3>
                <p className="text-slate-gray leading-relaxed text-lg">Direct API integrations for insurance verifications ensure absolute peace of mind for every curated journey.</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="bg-alabaster p-4 rounded-full self-start text-champagne-gold">
                <Globe size={28} />
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-2 text-obsidian">Global Reach</h3>
                <p className="text-slate-gray leading-relaxed text-lg">Gain exposure to over 50,000 monthly high-net-worth individuals across 120+ countries actively seeking premium rentals.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-alabaster p-6 md:p-8 rounded-2xl shadow-sm border border-slate-gray/10">
          <h3 className="text-2xl font-bold mb-1 text-obsidian">Apply to Partner</h3>
          <p className="text-slate-gray mb-6 text-sm">Submit your details to be considered. We respond within 48 hours.</p>
          
          <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className={labelClasses}>First Name <span className="text-champagne-gold">*</span></label>
                <input id="firstName" type="text" placeholder="John" className={inputClasses} required />
              </div>
              <div>
                <label htmlFor="lastName" className={labelClasses}>Last Name <span className="text-champagne-gold">*</span></label>
                <input id="lastName" type="text" placeholder="Doe" className={inputClasses} required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="dob" className={labelClasses}>Date of Birth <span className="text-champagne-gold">*</span></label>
                <input id="dob" type="date" className={inputClasses} required />
              </div>
              <div>
                <label htmlFor="nationality" className={labelClasses}>Nationality <span className="text-champagne-gold">*</span></label>
                <CustomSelect
                  id="nationality"
                  placeholder="Select nationality"
                  value={nationality}
                  onChange={setNationality}
                  required
                  options={[
                    { value: "american", label: "American" },
                    { value: "british", label: "British" },
                    { value: "canadian", label: "Canadian" },
                    { value: "french", label: "French" },
                    { value: "german", label: "German" },
                    { value: "italian", label: "Italian" },
                    { value: "japanese", label: "Japanese" },
                    { value: "emirati", label: "Emirati" },
                    { value: "australian", label: "Australian" },
                    { value: "other", label: "Other" },
                  ]}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="idType" className={labelClasses}>ID Type <span className="text-champagne-gold">*</span></label>
                <CustomSelect
                  id="idType"
                  placeholder="Select ID type"
                  value={idType}
                  onChange={setIdType}
                  required
                  options={[
                    { value: "passport", label: "Passport" },
                    { value: "national-id", label: "National ID" },
                    { value: "drivers-license", label: "Driver's License" },
                    { value: "residence-permit", label: "Residence Permit" },
                  ]}
                />
              </div>
              <div>
                <label htmlFor="idNumber" className={labelClasses}>ID / Passport Number <span className="text-champagne-gold">*</span></label>
                <input id="idNumber" type="text" placeholder="e.g. AB1234567" className={inputClasses} required />
              </div>
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>Email Address <span className="text-champagne-gold">*</span></label>
              <input id="email" type="email" placeholder="john.doe@example.com" className={inputClasses} required />
            </div>

            <div>
              <label htmlFor="phone" className={labelClasses}>Phone Number <span className="text-champagne-gold">*</span></label>
              <input id="phone" type="tel" placeholder="+1 (555) 000-0000" className={inputClasses} required />
            </div>

            <div className="pt-3 border-t border-slate-gray/20 space-y-3">
              <label htmlFor="agreeTerms" className="flex items-start gap-3 cursor-pointer">
                <input id="agreeTerms" type="checkbox" required className="mt-1 w-4 h-4 accent-champagne-gold rounded border-slate-gray/30 cursor-pointer" />
                <span className="text-sm text-slate-gray leading-relaxed">
                  I confirm that all information is accurate and I agree to Aether&apos;s <a href="#" className="text-champagne-gold underline underline-offset-2 hover:text-obsidian transition-colors">Terms of Service</a> and <a href="#" className="text-champagne-gold underline underline-offset-2 hover:text-obsidian transition-colors">Privacy Policy</a>.
                </span>
              </label>

              <button type="submit" className="w-full bg-obsidian text-pure-white py-4 rounded-md font-bold hover-scale transition-transform text-lg">
                Submit Application
              </button>
            </div>
          </form>
        </div>

      </section>

      {/* Simple Footer */}
      <footer className="bg-obsidian text-slate-gray py-12 text-center text-sm border-t border-slate-gray/20 mt-auto">
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
    </main>
  );
}
