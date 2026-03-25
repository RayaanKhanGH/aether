import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import WhyAether from "./components/WhyAether";
import HowItWorks from "./components/HowItWorks";
import TheTiers from "./components/TheTiers";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-pure-white selection:bg-champagne-gold selection:text-obsidian flex flex-col">
      <Navigation />
      
      <div className="flex-grow">
        <HeroSection />
        <WhyAether />
        <HowItWorks />
        <TheTiers />
        <Testimonials />
      </div>
      
      {/* Simple Footer */}
      <footer className="bg-obsidian text-slate-gray py-12 text-center text-sm border-t border-slate-gray/20 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-pure-white font-bold text-xl tracking-tight mb-4 md:mb-0 lowercase">Aether.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-champagne-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-champagne-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-champagne-gold transition-colors">Contact</a>
          </div>
          <p className="mt-6 md:mt-0">© 2026 Aether Automotive. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
