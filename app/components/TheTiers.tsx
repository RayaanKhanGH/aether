"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function TheTiers() {
  const tiers = [
    { name: "Budget", style: "light", desc: "Sensible and reliable for everyday travel." },
    { name: "Economy", style: "light", desc: "Sleek efficiency for the modern driver." },
    { name: "Economy+", style: "light", desc: "Added space and enhanced comfort." },
    { name: "Premium", style: "dark", desc: "Elevated materials and performance." },
    { name: "Executive", style: "dark", desc: "Command the road with authority." },
    { name: "Elite", style: "dark", desc: "The absolute pinnacle of automotive engineering." },
  ];

  return (
    <section className="relative py-16 md:py-28 bg-pure-white px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-10 md:mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="gold-divider mb-6" />
            <h2 className="text-sm text-slate-gray text-technical mb-3">THE COLLECTION</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Vehicle Tiers</h3>
          </div>
          <Link href="/fleet" className="flex items-center text-champagne-gold font-bold hover:gap-3 transition-all duration-300 gap-1.5 group">
            Explore All Categories <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {tiers.map((tier, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Link 
                href={`/fleet?tier=${encodeURIComponent(tier.name)}`}
                className={`block p-6 sm:p-8 md:p-10 rounded-xl flex flex-col justify-between h-48 sm:h-56 md:h-64 group cursor-pointer transition-all duration-500 ${
                  tier.style === "dark" 
                    ? "bg-obsidian text-pure-white border border-transparent hover:border-champagne-gold/30 shadow-xl relative overflow-hidden" 
                    : "bg-alabaster text-obsidian border border-transparent hover:border-slate-gray/20 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Inner glow on dark cards */}
                {tier.style === "dark" && (
                  <div className="absolute top-0 right-0 w-48 h-48 bg-champagne-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-champagne-gold/10 transition-all duration-700" />
                )}
                <div className="relative z-10">
                  <h4 className={`text-2xl font-bold mb-3 ${tier.style === "dark" ? "text-champagne-gold" : ""}`}>
                    {tier.name}
                  </h4>
                  <p className="text-slate-gray">
                    {tier.desc}
                  </p>
                </div>
                <div className="relative z-10 flex justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <ArrowRight size={24} className={tier.style === "dark" ? "text-champagne-gold" : "text-obsidian"} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
