"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  // Parallax translation: moves the background image vertically based on scroll
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center pt-20 overflow-hidden bg-obsidian">
      {/* Background Image Setup */}
      <motion.div 
        className="absolute inset-0 z-0 h-full w-full"
        style={{ 
          y: backgroundY,
          scale: 1.1 
        }}
      >
        <Image
          src="/images/aether-hero.webp"
          alt="Aether Luxury Hero"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-obsidian/40 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent z-10" />
      </motion.div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <motion.p 
          className="text-champagne-gold font-technical tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          AETHER EXCLUSIVE
        </motion.p>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-pure-white mb-6 tracking-tight leading-tight max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          Experience the Pinnacle of Motion.
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-alabaster mb-10 font-light max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          Trusted by thousands of global travelers, Aether offers an unparalleled fleet of luxury and performance vehicles delivered with concierge-level service.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <button 
            onClick={() => router.push('/fleet')}
            className="bg-champagne-gold text-pure-white px-8 py-4 rounded font-medium hover-scale w-full sm:w-auto text-lg transition-colors"
          >
            Book a Rental
          </button>
          <button 
            onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border border-slate-gray/50 text-pure-white px-8 py-4 rounded font-medium hover:bg-slate-gray/20 hover:border-slate-gray w-full sm:w-auto text-lg transition-all backdrop-blur-sm"
          >
            How It Works
          </button>
        </motion.div>
      </div>
    </section>
  );
}
