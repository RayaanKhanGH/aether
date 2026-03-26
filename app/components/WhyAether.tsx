import { Globe, Headset, ShieldCheck } from "lucide-react";

export default function WhyAether() {
  const features = [
    {
      icon: <ShieldCheck size={32} strokeWidth={1.5} />,
      title: "5,000+ Active Bookings",
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
    <section className="py-16 md:py-24 bg-pure-white text-obsidian px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-technical text-slate-gray mb-3 tracking-widest">THE AETHER DIFFERENCE</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Why Choose Us</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-alabaster flex items-center justify-center text-champagne-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-slate-gray leading-relaxed text-sm block">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
