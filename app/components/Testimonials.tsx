export default function Testimonials() {
  const testimonials = [
    {
      quote: "The Elite tier experience was flawless. The car was immaculate and the concierge service anticipated every need.",
      name: "Alexander Vance",
      role: "Global Director",
    },
    {
      quote: "Aether redefines what rental means. It feels less like a transaction and more like a private club membership.",
      name: "Sophia Chen",
      role: "Architect",
    },
    {
      quote: "Frictionless from booking to drop-off. The attention to detail in their fleet is simply unmatched.",
      name: "Marcus Thorne",
      role: "Technology Executive",
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-alabaster px-5 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm text-slate-gray mb-3 text-technical">VERIFIED STORIES</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">The Trust Layer</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testim, idx) => (
            <div key={idx} className="bg-obsidian rounded-xl p-6 sm:p-8 md:p-10 flex flex-col justify-between hover-scale shadow-2xl">
              <div>
                <div className="text-champagne-gold text-5xl font-serif leading-none mb-4">"</div>
                <p className="text-pure-white text-base md:text-lg leading-relaxed mb-6 md:mb-8 italic">
                  {testim.quote}
                </p>
              </div>
              <div>
                <h5 className="font-bold text-pure-white">{testim.name}</h5>
                <p className="text-slate-gray text-sm mt-1 uppercase tracking-wider">{testim.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
