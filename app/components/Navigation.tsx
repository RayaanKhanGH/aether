"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 border-b h-[73px]",
        isHome && !isScrolled
          ? "bg-transparent border-transparent text-pure-white"
          : "bg-pure-white border-slate-gray/10 shadow-md text-obsidian"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <Link href="/" className="text-2xl md:text-3xl font-extrabold tracking-[0.2em] transition-transform hover:scale-[1.02]">
          AETHER
        </Link>
        
        <div className="hidden md:flex items-center space-x-10 text-xs font-technical uppercase tracking-widest">
          <Link href="/" className="group relative">
            <span className="hover:text-champagne-gold transition-colors">Home</span>
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-champagne-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/fleet" className="group relative">
            <span className="hover:text-champagne-gold transition-colors">The Fleet</span>
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-champagne-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/vendor" className="group relative">
            <span className="hover:text-champagne-gold transition-colors">Partner Portal</span>
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-champagne-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <Link href="/standard" className="group relative">
            <span className="hover:text-champagne-gold transition-colors">The Standard</span>
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-champagne-gold transition-all duration-300 group-hover:w-full"></span>
          </Link>

        </div>
        
        <div className="hidden md:block">
          <Link href="/fleet" className="inline-block bg-obsidian text-pure-white px-7 py-2.5 rounded-sm text-sm font-technical tracking-widest uppercase hover:bg-champagne-gold hover:text-pure-white transition-all shadow hover:shadow-lg border border-transparent hover:border-champagne-gold">
            Book
          </Link>
        </div>
        
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}
