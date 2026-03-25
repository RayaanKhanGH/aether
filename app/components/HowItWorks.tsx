export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Select Your Car",
      description: "Filter our curated collection by tier or specialty to find the perfect match for your journey.",
    },
    {
      number: "02",
      title: "Define the Journey",
      description: "Enter your dates and select pick-up logistics. Our concierge handles the complexities.",
    },
    {
      number: "03",
      title: "Take the Keys",
      description: "Experience a frictionless digital check-in and step directly into your pristine vehicle.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-alabaster text-obsidian px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-technical text-slate-gray mb-3 tracking-widest">EFFORTLESS PROCESS</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">How It Works</h3>
          </div>
          <p className="text-slate-gray max-w-md">Three simple steps stand between you and the pinnacle of driving comfort. Designed to value your time.</p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-slate-gray/20 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="w-24 h-24 rounded bg-pure-white shadow-sm flex items-center justify-center text-3xl font-bold text-champagne-gold mb-8 group-hover:-translate-y-2 transition-transform duration-300">
                  {step.number}
                </div>
                <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
                <p className="text-slate-gray leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
