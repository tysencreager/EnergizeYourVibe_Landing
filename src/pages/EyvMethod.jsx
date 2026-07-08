import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Repeat, Map, HeartHandshake } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';

/*
  NOTE: The step-by-step practice guide is still to come from Jenn; this page
  carries the approved positioning (Method = daily practice, Pillars = roadmap).
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
            A simple daily practice that helps you become more intentional, aware, and
            connected to how you move through life.
          </p>
        </div>
      </section>

      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-sunset overflow-hidden">
        <Sunburst
          className="absolute -right-40 -top-40 w-[500px] h-[500px] opacity-10"
          strokeColor="rgba(248,162,50,0.8)"
        />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bento-card bg-white p-8 md:p-12 border-2 border-gray-100 space-y-5 text-lg text-gray-700 font-medium leading-relaxed">
            <p className="font-display text-2xl md:text-3xl text-gray-900 leading-snug">
              Real transformation doesn&rsquo;t happen from simply learning something once.
              <i className="text-pink"> It happens through practice.</i>
            </p>
            <p>
              That&rsquo;s why we created the Energize Your Vibe Method — a simple daily practice
              that helps you become more intentional, aware, and connected to how you move
              through life. Combined with our 7 Pillars framework, you&rsquo;ll build habits and
              life skills that support lasting growth, one day at a time.
            </p>
            <p>
              Repeated practice helps build new habits and strengthens the pathways that
              support lasting change. As you put these tools into practice, they become part
              of how you think, respond, and live.
            </p>
          </div>

          {/* How the pieces fit together */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: <Repeat size={22} strokeWidth={1.75} />, title: 'The Method', desc: 'The daily practice.' },
              { icon: <Map size={22} strokeWidth={1.75} />, title: 'The 7 Pillars', desc: 'The roadmap.' },
              { icon: <HeartHandshake size={22} strokeWidth={1.75} />, title: 'The Community', desc: 'The people beside you.' },
            ].map((item) => (
              <div key={item.title} className="bento-card glass border border-gold/30 p-6 text-center">
                <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-pink/10 text-magenta mb-3">
                  {item.icon}
                </span>
                <h3 className="font-display text-xl text-gray-900 mb-1">{item.title}</h3>
                <p className="text-gray-600 text-sm font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm font-medium text-gray-500">
            The full step-by-step practice guide lives in the member portal.
          </p>

          <div className="mt-10 text-center">
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
