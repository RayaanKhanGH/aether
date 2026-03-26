"use client";

import { Globe, Headset, ShieldCheck } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }
  }
};

export default function WhyAether() {
  const features = [
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: <><AnimatedCounter target={5000} suffix="+" /> Active Bookings</>,
      description: "A testament to our reliability and scale. Every journey is backed by our guarantee of excellence and pristine vehicle condition.",
    },
    {
      icon: <Headset size={32} strokeWidth={1.5} />,
      title: "24/7 Concierge Support",
      description: "Direct access to human assistance anytime, anywhere. Our dedicated team ensures your experience is seamless from start to finish.",
    },
    {
      icon: <Globe size={32} strokeWidth={1.5} />,
      title: "The Global Collection",
      description: "Access to premium fleets worldwide. Whether in Monaco or Miami, Aether delivers uncompromising quality and distinction.",
    },
  ];

  return (
    <section className="py-16 md:py-28 bg-pure-white text-obsidian px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="gold-divider-center mb-6" />
          <h2 className="text-sm font-technical text-slate-gray mb-3 tracking-widest">THE AETHER DIFFERENCE</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Why Choose Us</h3>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx} 
              className="flex flex-col items-center text-center group"
              variants={itemVariants}
            >
              <div className="w-16 h-16 rounded-full bg-alabaster flex items-center justify-center text-champagne-gold mb-6 group-hover:bg-champagne-gold group-hover:text-pure-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-champagne-gold/20">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-slate-gray leading-relaxed text-sm block">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
