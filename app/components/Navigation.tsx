"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/fleet", label: "The Fleet" },
  { href: "/vendor", label: "Partner Portal" },
  { href: "/standard", label: "The Standard" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  // Scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 py-4 border-b h-[73px]",
          isHome && !isScrolled && !mobileMenuOpen
            ? "bg-transparent border-transparent text-pure-white"
            : "bg-pure-white/95 backdrop-blur-md border-slate-gray/10 text-obsidian"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          <Link href="/" className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.2em] transition-transform hover:scale-[1.02]">
            AETHER
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10 text-xs font-technical uppercase tracking-widest">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group relative py-1">
                <span className={clsx(
                  "hover:text-champagne-gold transition-colors duration-300",
                  pathname === link.href && "text-champagne-gold"
                )}>{link.label}</span>
                <span className={clsx(
                  "absolute -bottom-1 left-0 h-[1px] bg-champagne-gold transition-all duration-500 ease-out",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </Link>
            ))}
          </div>
          
          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link href="/fleet" className="inline-block bg-obsidian text-pure-white px-7 py-2.5 rounded-sm text-sm font-technical tracking-widest uppercase hover:bg-champagne-gold hover:text-pure-white transition-all duration-300 shadow hover:shadow-lg border border-transparent hover:border-champagne-gold">
              Book
            </Link>
          </div>
          
          {/* Mobile Hamburger */}
          <button
            className="lg:hidden relative z-[60] p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-champagne-gold origin-left"
          style={{ scaleX }}
        />
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-obsidian/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 w-[80%] max-w-sm h-full bg-pure-white shadow-2xl lg:hidden flex flex-col"
          >
            <div className="h-[73px] shrink-0" />

            <div className="flex-1 flex flex-col px-8 py-8 overflow-y-auto">
              <div className="space-y-1">
                {NAV_LINKS.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={clsx(
                        "block py-4 text-2xl font-bold tracking-tight transition-colors border-b border-slate-gray/10",
                        pathname === link.href
                          ? "text-champagne-gold"
                          : "text-obsidian hover:text-champagne-gold"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/fleet"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center bg-obsidian text-pure-white py-4 rounded-md font-bold text-lg tracking-wider uppercase hover:bg-champagne-gold transition-colors duration-300"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
