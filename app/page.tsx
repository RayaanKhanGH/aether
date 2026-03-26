import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import WhyAether from "./components/WhyAether";
import HowItWorks from "./components/HowItWorks";
import TheTiers from "./components/TheTiers";
import Testimonials from "./components/Testimonials";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-pure-white selection:bg-champagne-gold selection:text-pure-white flex flex-col">
      <Navigation />
      
      <div className="flex-grow">
        <HeroSection />
        <WhyAether />
        <HowItWorks />
        <TheTiers />
        <Testimonials />
      </div>
      
      {/* Premium Editorial Footer */}
      <footer className="bg-obsidian text-pure-white mt-auto">
        {/* Gold rule */}
        <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent" />
        
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 md:py-20">
          {/* Tagline */}
          <div className="mb-14 md:mb-16">
            <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight italic max-w-xl">
              The Art<br />of Motion.
            </p>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 mb-14 md:mb-16">
            {/* Navigation */}
            <div>
              <h4 className="text-xs font-technical tracking-widest text-champagne-gold mb-5 uppercase">Navigate</h4>
              <div className="space-y-3">
                <Link href="/" className="block text-slate-gray hover:text-pure-white transition-colors duration-300 text-sm">Home</Link>
                <Link href="/fleet" className="block text-slate-gray hover:text-pure-white transition-colors duration-300 text-sm">The Fleet</Link>
                <Link href="/vendor" className="block text-slate-gray hover:text-pure-white transition-colors duration-300 text-sm">Partner Portal</Link>
                <Link href="/standard" className="block text-slate-gray hover:text-pure-white transition-colors duration-300 text-sm">The Standard</Link>
              </div>
            </div>

            {/* Locations */}
            <div>
              <h4 className="text-xs font-technical tracking-widest text-champagne-gold mb-5 uppercase">Locations</h4>
              <div className="space-y-3">
                {["Miami", "Monaco", "Dubai", "London", "Tokyo"].map((city) => (
                  <Link key={city} href={`/fleet?location=${city}`} className="flex items-center gap-2 text-slate-gray hover:text-pure-white transition-colors duration-300 text-sm group">
                    <MapPin size={12} className="text-slate-gray/50 group-hover:text-champagne-gold transition-colors duration-300" />
                    {city}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-technical tracking-widest text-champagne-gold mb-5 uppercase">Legal</h4>
              <div className="space-y-3">
                <a href="#" className="block text-slate-gray hover:text-pure-white transition-colors duration-300 text-sm">Privacy Policy</a>
                <a href="#" className="block text-slate-gray hover:text-pure-white transition-colors duration-300 text-sm">Terms of Service</a>
                <a href="#" className="block text-slate-gray hover:text-pure-white transition-colors duration-300 text-sm">Cookie Policy</a>
                <a href="#" className="block text-slate-gray hover:text-pure-white transition-colors duration-300 text-sm">Contact</a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-gray/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-pure-white font-extrabold text-2xl tracking-[0.2em]">AETHER</p>
            <p className="text-slate-gray/50 text-xs font-technical tracking-wider">© 2026 Aether Automotive. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
