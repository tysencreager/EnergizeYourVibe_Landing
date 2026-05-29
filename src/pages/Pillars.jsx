import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { pillars, pillarColorClasses } from '../data/pillars.js';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';

export default function Pillars() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-48 md:pb-24 px-5 md:px-6 bg-gradient-to-br from-sun via-gold/40 to-orange/60 overflow-hidden">
        <Blob tone="pink" size="xl" className="-top-20 -left-20" opacity={20} slow />
        <Blob tone="magenta" size="lg" className="-bottom-20 right-10" opacity={15} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-block px-4 py-1.5 bg-magenta text-sun rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
            The 7 Pillars
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-magenta leading-tight mb-6">
            What are the <span className="font-serif italic text-gradient font-semibold">7 Pillars?</span>
          </h1>
          <p className="text-lg md:text-xl text-magenta/90 font-medium leading-relaxed">
            Your brain needs structure, function, and insight on what to prioritize. The goal is balance between the pillars, a simple, whole-person approach rooted in the biopsychosocial model of well-being.
          </p>
        </div>
      </section>

      {/* TAKE OUT THE GUESSWORK */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-sunset overflow-hidden">
        <Blob tone="gold" size="xl" className="-top-40 -right-40" opacity={18} slow />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <Compass className="mx-auto text-pink mb-6" size={40} strokeWidth={1.5} />
          <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-6 leading-tight">
            We take out the <i className="text-pink">guesswork.</i>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl font-medium max-w-3xl mx-auto mb-4">
            We don’t always know which pillars we need to work on to find balance. This is where we take out the guesswork, so you know where to start, how to stay consistent, and what to prioritize next.
          </p>
        </div>
      </section>

      {/* THE 7 PILLARS GRID */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-gradient-to-br from-magenta via-[#8A1249] to-[#8A1249] text-white overflow-hidden">
        <Sunburst
          className="absolute -right-40 -top-40 w-[600px] h-[600px] opacity-15"
          strokeColor="rgba(253,224,139,0.8)"
        />
        <Blob tone="pink" size="xl" className="-bottom-40 -left-40" opacity={25} slow />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display mb-6">
              A framework built for <i className="text-sun">real life.</i>
            </h2>
            <p className="text-white/85 text-lg md:text-xl max-w-3xl mx-auto font-medium">
              Seven connected areas of your life. When one is supported, the others begin to shift too.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {pillars.map((p, idx) => {
              const c = pillarColorClasses[p.color];
              return (
                <div
                  key={p.key}
                  className={`bento-card ${c.bg} ${c.text} p-8 border-none flex flex-col gap-4`}
                >
                  <div>
                    <p className={`text-xs font-bold uppercase tracking-widest ${c.accent} mb-1`}>
                      Pillar {idx + 1} · {p.subtitle}
                    </p>
                    <h3 className="font-display text-4xl md:text-5xl">{p.name}</h3>
                  </div>
                  <p className={`font-bold italic ${c.accent}`}>{p.tagline}</p>
                  <p className="font-medium opacity-95 leading-relaxed">{p.long}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-6 leading-tight">
            If you’re ready to feel empowered in your life, <i className="text-pink">you’re in the right place.</i>
          </h2>
          <Link
            to="/membership"
            className="inline-flex items-center gap-3 bg-magenta text-white py-5 px-10 rounded-full font-bold uppercase tracking-widest text-base hover:bg-pink transition-colors shadow-lg"
          >
            Reserve Your Spot <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
