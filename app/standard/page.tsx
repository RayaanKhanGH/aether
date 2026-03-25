"use client";

import Navigation from "../components/Navigation";
import { ShieldCheck, Sparkles, Clock, MapPin, Award, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

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
      <section className="px-6 py-20 md:py-32 bg-obsidian text-pure-white border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-champagne-gold font-technical tracking-[0.3em] uppercase mb-6 text-sm"
          >
            The Aether Protocol
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            The Standard.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-gray text-lg md:text-xl leading-relaxed font-light max-w-2xl mx-auto"
          >
            Luxury is not just the vehicle you drive—it is the precision, care, and silence that surrounds the experience.
          </motion.p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-6 py-24 md:py-32 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
          {standards.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="text-champagne-gold mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-obsidian tracking-tight">{item.title}</h3>
              <p className="text-slate-gray leading-relaxed font-light">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom Quote Section */}
      <section className="px-6 py-24 bg-alabaster border-y border-slate-gray/10">
        <div className="max-w-4xl mx-auto text-center italic text-2xl md:text-3xl font-extrabold text-obsidian/80 leading-normal">
          &quot;In the world of Aether, there is no room for compromise. Expectations are not merely met; they are redefined.&quot;
        </div>
      </section>

      {/* Footer (Simplified) */}
      <footer className="bg-obsidian text-slate-gray py-12 text-center text-sm border-t border-slate-gray/20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-pure-white font-bold text-xl tracking-tight mb-4 md:mb-0 lowercase">Aether.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-champagne-gold transition-colors text-xs uppercase tracking-widest font-technical">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors text-xs uppercase tracking-widest font-technical">Terms</a>
            <a href="#" className="hover:text-gold transition-colors text-xs uppercase tracking-widest font-technical">Contact</a>
          </div>
          <p className="mt-6 md:mt-0 opacity-50 font-technical tracking-wider">© 2026 Aether Automotive. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
