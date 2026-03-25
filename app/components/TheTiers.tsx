import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TheTiers() {
  const tiers = [
    { name: "Budget", style: "light", desc: "Sensible and reliable for everyday travel." },
    { name: "Economy", style: "light", desc: "Sleek efficiency for the modern driver." },
    { name: "Economy+", style: "light", desc: "Added space and enhanced comfort." },
    { name: "Premium", style: "dark", desc: "Elevated materials and performance." },
    { name: "Executive", style: "dark", desc: "Command the road with authority." },
    { name: "Elite", style: "dark", desc: "The absolute pinnacle of automotive engineering." },
  ];

  return (
    <section className="py-24 bg-pure-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h2 className="text-sm text-slate-gray text-technical mb-3">THE COLLECTION</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Vehicle Tiers</h3>
          </div>
          <button className="flex items-center text-champagne-gold font-bold hover:gap-2 transition-all gap-1">
            Explore All Categories <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <Link 
              href={`/fleet?tier=${encodeURIComponent(tier.name)}`}
              key={idx} 
              className={`p-10 rounded-xl flex flex-col justify-between h-64 group hover-scale cursor-pointer ${
                tier.style === "dark" 
                  ? "bg-obsidian text-pure-white border border-transparent hover:border-champagne-gold/30 shadow-xl" 
                  : "bg-alabaster text-obsidian border border-transparent hover:border-slate-gray/20 shadow-sm"
              }`}
            >
              <div>
                <h4 className={`text-2xl font-bold mb-3 ${tier.style === "dark" ? "text-champagne-gold" : ""}`}>
                  {tier.name}
                </h4>
                <p className={tier.style === "dark" ? "text-slate-gray" : "text-slate-gray"}>
                  {tier.desc}
                </p>
              </div>
              <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={24} className={tier.style === "dark" ? "text-champagne-gold" : "text-obsidian"} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
