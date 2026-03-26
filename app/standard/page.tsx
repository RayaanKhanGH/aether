"use client";

import Navigation from "../components/Navigation";
import { ShieldCheck, Sparkles, Clock, MapPin, Award, UserCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function StandardPage() {
  const standards = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Pristine Presentation",
      description: "Every vehicle in the Aether collection undergoes a rigorous 50-point aesthetic detail before delivery, ensuring a showroom-quality experience for every journey."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Mechanical Integrity",
      description: "Beyond aesthetics, our fleet is maintained to original manufacturer specifications by certified technicians. Performance and safety are never compromised."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "The Zero-Wait Promise",
      description: "Time is the ultimate luxury. Our frictionless digital check-in and curbside delivery mean you go from reservation to the road in under three minutes."
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Elite Concierge",
      description: "Our staff is trained in high-end hospitality rather than just logistics. Expect professional discretion, local expertise, and anticipatory service."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Global Continuity",
      description: "Whether you are in London, Dubai, or New York, the Aether Standard remains identical. One account, one standard, worldwide."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Curated Specialty",
      description: "We don't just rent cars; we curate motions. Every vehicle is hand-selected for its performance, heritage, and status."
    }
  ];

  return (
    <main className="min-h-screen bg-pure-white flex flex-col pt-[73px]">
      <Navigation />
      
      {/* Header Section (No Image) */}
      <section className="relative px-5 sm:px-6 py-16 sm:py-20 md:py-32 bg-obsidian text-pure-white border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-shimmer font-technical tracking-[0.3em] uppercase mb-6 text-sm"
          >
            The Aether Protocol
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 sm:mb-8"
          >
            The Standard.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-gray text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto"
          >
            Luxury is not just the vehicle you drive—it is the precision, care, and silence that surrounds the experience.
          </motion.p>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent" />

      {/* Grid Section */}
      <section className="relative px-5 sm:px-6 py-16 sm:py-24 md:py-32 max-w-7xl mx-auto w-full">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {standards.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group relative pl-5 border-l-2 border-transparent hover:border-champagne-gold transition-all duration-500"
            >
              <div className="text-champagne-gold mb-6 transition-all duration-500 group-hover:scale-110 group-hover:translate-x-1">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-obsidian tracking-tight">{item.title}</h3>
              <p className="text-slate-gray leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Bottom Quote Section */}
      <section className="relative px-5 sm:px-6 py-16 sm:py-24 bg-alabaster border-y border-slate-gray/10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-champagne-gold text-7xl font-serif leading-none block mb-4 select-none"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            &ldquo;
          </motion.span>
          <p className="italic text-xl sm:text-2xl md:text-3xl font-bold text-obsidian/80 leading-relaxed">
            In the world of Aether, there is no room for compromise. Expectations are not merely met; they are redefined.
          </p>
          <motion.span
            className="text-champagne-gold text-7xl font-serif leading-none block mt-4 select-none"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            &rdquo;
          </motion.span>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-obsidian text-slate-gray mt-auto">
        <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent" />
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-pure-white font-extrabold text-2xl tracking-[0.2em]">AETHER</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-champagne-gold transition-colors duration-300 text-xs uppercase tracking-widest font-technical">Privacy</a>
              <a href="#" className="hover:text-champagne-gold transition-colors duration-300 text-xs uppercase tracking-widest font-technical">Terms</a>
              <a href="#" className="hover:text-champagne-gold transition-colors duration-300 text-xs uppercase tracking-widest font-technical">Contact</a>
            </div>
            <p className="text-slate-gray/50 text-xs font-technical tracking-wider">© 2026 Aether Automotive.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
