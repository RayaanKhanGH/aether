"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "The Fleet" },
  { href: "/vendor", label: "Partners" },
  { href: "/standard", label: "The Standard" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Scroll progress for that premium feedback
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileMenuOpen(false), [pathname]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 w-full z-50 transition-all duration-700 px-6 sm:px-12 py-5 h-[80px] flex items-center",
          isHome && !isScrolled && !mobileMenuOpen
            ? "bg-transparent border-transparent text-pure-white"
            : "bg-pure-white/90 backdrop-blur-xl border-b border-obsidian/5 text-obsidian shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full relative">
          <Link href="/" className="text-2xl sm:text-3xl font-heading font-black tracking-[0.3em] transition-all hover:opacity-70 flex items-center gap-3">
             AETHER
          </Link>
          
          <div className="hidden lg:flex items-center space-x-12 text-[10px] font-technical uppercase tracking-[0.25em] font-black">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group relative py-2">
                <span className={clsx(
                  "hover:text-champagne-gold transition-colors duration-500",
                  pathname === link.href && "text-champagne-gold"
                )}>{link.label}</span>
                {pathname === link.href && (
                  <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-[2px] bg-champagne-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>
          
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/fleet" className="flex items-center gap-3 bg-obsidian text-pure-white px-8 py-3 rounded-full text-[10px] font-technical tracking-[0.2em] uppercase hover:bg-champagne-gold transition-all duration-500 shadow-xl shadow-obsidian/10 group">
              Reserve <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <button
            className="lg:hidden relative z-[60] p-2 hover:bg-champagne-gold/10 rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <motion.div
           className="absolute bottom-0 left-0 right-0 h-[3px] bg-champagne-gold origin-left z-[60]"
           style={{ scaleX }}
        />
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-obsidian/40 backdrop-blur-md lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
             <motion.nav
               initial={{ x: "100%" }}
               animate={{ x: 0 }}
               exit={{ x: "100%" }}
               transition={{ type: "spring", damping: 30, stiffness: 300 }}
               className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-pure-white shadow-2xl p-12 pt-32 flex flex-col gap-8"
               onClick={(e) => e.stopPropagation()}
             >
                {NAV_LINKS.map((link, i) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={clsx("text-4xl font-heading font-black tracking-tighter border-b border-obsidian/5 pb-4", pathname===link.href ? "text-champagne-gold" : "text-obsidian")}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link href="/fleet" className="mt-auto bg-obsidian text-pure-white py-5 rounded-2xl text-center font-technical font-black uppercase tracking-widest hover:bg-champagne-gold transition-all">
                   Start Your Session
                </Link>
             </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
