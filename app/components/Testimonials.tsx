"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function Testimonials() {
  const testimonials = [
    {
      quote: "The Elite tier experience was flawless. The car was immaculate and the concierge service anticipated every need.",
      name: "Alexander Vance",
      role: "Global Director",
    },
    {
      quote: "Aether redefines what rental means. It feels less like a transaction and more like a private club membership.",
      name: "Sophia Chen",
      role: "Architect",
    },
    {
      quote: "Frictionless from booking to drop-off. The attention to detail in their fleet is simply unmatched.",
      name: "Marcus Thorne",
      role: "Technology Executive",
    }
  ];

  return (
    <section className="relative py-16 md:py-28 bg-alabaster px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="gold-divider-center mb-6" />
          <h2 className="text-sm text-slate-gray mb-3 text-technical">VERIFIED STORIES</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">The Trust Layer</h3>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testim, idx) => (
            <motion.div 
              key={idx} 
              className="bg-obsidian rounded-xl p-6 sm:p-8 md:p-10 flex flex-col justify-between shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-1 group"
              variants={itemVariants}
            >
              <div>
                {/* Star Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-champagne-gold fill-champagne-gold" />
                  ))}
                </div>

                {/* Animated Quote Mark */}
                <motion.div 
                  className="text-champagne-gold text-6xl font-serif leading-none mb-3 select-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.1, ease: "easeOut" }}
                >
                  &ldquo;
                </motion.div>
                <p className="text-pure-white text-base md:text-lg leading-relaxed mb-6 md:mb-8 italic font-light">
                  {testim.quote}
                </p>
              </div>
              <div className="border-t border-slate-gray/20 pt-5">
                <h5 className="font-bold text-pure-white">{testim.name}</h5>
                <p className="text-champagne-gold/70 text-sm mt-1 uppercase tracking-wider font-technical">{testim.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
