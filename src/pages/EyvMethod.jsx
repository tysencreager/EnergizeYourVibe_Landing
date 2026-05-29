import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';

/*
  TODO (NP2 / Markup #56): EYV Method page.
  Client has NOT supplied final "Energize Your Vibe Method" content yet. The copy
  below is a PLACEHOLDER so the route + nav link exist. Replace with Jenn's real
  method explanation once provided, and remove the "Placeholder" notice banner.
*/
export default function EyvMethod() {
  return (
    <>
      <section className="relative pt-32 pb-14 md:pt-48 md:pb-24 px-5 md:px-6 bg-gradient-to-br from-sun via-gold/40 to-orange/60 overflow-hidden">
        <Blob tone="pink" size="xl" className="-top-20 -left-20" opacity={20} slow />
        <Blob tone="magenta" size="lg" className="-bottom-20 right-10" opacity={15} />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Sparkles className="mx-auto text-magenta mb-6" size={44} strokeWidth={1.5} />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-magenta leading-tight mb-6">
            The <span className="font-serif italic text-gradient font-semibold">EYV Method.</span>
          </h1>
          <p className="text-lg md:text-xl text-magenta/90 font-medium leading-relaxed">
            A simple, supported way to come back home to yourself and rise, together.
          </p>
        </div>
      </section>

      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-sunset overflow-hidden">
        <Sunburst
          className="absolute -right-40 -top-40 w-[500px] h-[500px] opacity-10"
          strokeColor="rgba(248,162,50,0.8)"
        />
        <div className="max-w-3xl mx-auto relative z-10">
          {/* TODO: remove this notice once real EYV Method content is in. */}
          <div className="mb-10 rounded-2xl border-2 border-dashed border-gold/60 bg-sun/30 p-5 text-center text-sm font-bold text-magenta">
            Placeholder content - final EYV Method copy coming soon.
          </div>

          <div className="bento-card bg-white p-8 md:p-12 border-2 border-gray-100 space-y-5 text-lg text-gray-700 font-medium leading-relaxed">
            <p>
              The Energize Your Vibe Method is our framework for lasting change, built on the 7 Pillars and grounded in real tools, real support, and real connection.
            </p>
            <p>
              This page will walk through the method step by step, how we help you find balance, regulate your nervous system, shift your mindset, and create change from within.
            </p>
            <p className="text-magenta font-bold">
              Full details coming soon.
            </p>
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/pillars"
              className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
            >
              Explore The 7 Pillars <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
