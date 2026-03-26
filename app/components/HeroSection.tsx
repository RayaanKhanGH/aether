"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import Image from "next/image";

export default function HeroSection() {
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center pt-16 sm:pt-20 overflow-hidden bg-obsidian">
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
        {/* Multi-layer overlays for depth */}
        <div className="absolute inset-0 bg-obsidian/40 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent z-10" />
        {/* Vignette edges */}
        <div className="absolute inset-0 z-10" style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(26,27,32,0.4) 100%)"
        }} />
      </motion.div>

      <div className="relative z-10 px-5 sm:px-6 md:px-12 lg:px-24 max-w-7xl mx-auto w-full">
        <motion.p 
          className="text-shimmer font-technical tracking-widest mb-4 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          AETHER EXCLUSIVE
        </motion.p>
        
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-pure-white mb-4 sm:mb-6 tracking-tight leading-[1.05] max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.4 }}
        >
          Experience the Pinnacle of Motion.
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-alabaster/90 mb-10 font-light max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        >
          Trusted by thousands of global travelers, Aether offers an unparalleled fleet of luxury and performance vehicles delivered with concierge-level service.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        >
          <button 
            onClick={() => router.push('/fleet')}
            className="bg-champagne-gold text-pure-white px-10 py-4 rounded font-medium w-full sm:w-auto text-lg transition-all duration-300 hover:bg-[#d4b88a] hover:shadow-lg hover:shadow-champagne-gold/20"
          >
            Book a Rental
          </button>
          <button 
            onClick={() => {
              document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border border-pure-white/30 text-pure-white px-10 py-4 rounded font-medium hover:bg-pure-white/10 hover:border-pure-white/60 w-full sm:w-auto text-lg transition-all duration-300 backdrop-blur-sm"
          >
            How It Works
          </button>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ opacity: indicatorOpacity }}
      >
        <span className="text-pure-white/50 text-[10px] font-technical tracking-[0.3em] uppercase">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="text-pure-white/40" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
