"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Select Your Car",
      description: "Filter our curated collection by tier or specialty to find the perfect match for your journey.",
    },
    {
      number: "02",
      title: "Define the Journey",
      description: "Enter your dates and select pick-up logistics. Our concierge handles the complexities.",
    },
    {
      number: "03",
      title: "Take the Keys",
      description: "Experience a frictionless digital check-in and step directly into your pristine vehicle.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-16 md:py-28 bg-alabaster text-obsidian px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-sm font-technical text-slate-gray mb-3 tracking-widest">EFFORTLESS PROCESS</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">How It Works</h3>
          </div>
          <p className="text-slate-gray max-w-md">Three simple steps stand between you and the pinnacle of driving comfort. Designed to value your time.</p>
        </motion.div>

        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <motion.div 
            className="hidden md:block absolute top-12 left-0 w-full h-px bg-champagne-gold/30 z-0 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
          />

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {steps.map((step, idx) => (
              <motion.div key={idx} className="relative group" variants={itemVariants}>
                <div className="w-16 h-16 md:w-24 md:h-24 rounded bg-pure-white shadow-sm flex items-center justify-center text-2xl md:text-3xl font-bold text-champagne-gold mb-6 md:mb-8 group-hover:-translate-y-2 group-hover:ring-2 group-hover:ring-champagne-gold/30 transition-all duration-500">
                  {step.number}
                </div>
                <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                <p className="text-slate-gray leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
