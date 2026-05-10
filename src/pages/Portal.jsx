import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { pillars, pillarColorClasses } from '../data/pillars.js';
import { useAuth } from '../hooks/useAuth.jsx';

export default function Portal() {
  const { user } = useAuth();
  const greetingName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'sister';

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-44 md:pb-20 px-5 md:px-6 bg-animated-warm overflow-hidden grain">
        <Sunburst
          className="absolute -right-32 -top-32 w-[520px] h-[520px] opacity-20"
          strokeColor="rgba(255,255,255,0.6)"
        />
        <Blob tone="magenta" size="lg" className="-bottom-20 -left-20" opacity={25} slow />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white">
            <Sparkles size={14} strokeWidth={1.75} className="text-sun" />
            Member portal
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-5 md:mb-6 drop-shadow-md">
            Welcome back, <span className="font-serif italic text-sun">{greetingName}.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed">
            Your sacred space. Pick a pillar below to explore the practices, downloads, and modules waiting for you.
          </p>
        </div>
      </section>

      {/* PILLAR GRID */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
        <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={15} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-3">
              The 7 Pillars
            </p>
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight">
              Your <i className="text-pink">resources, by pillar.</i>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {pillars.map((pillar) => {
              const palette = pillarColorClasses[pillar.color] ?? pillarColorClasses.pink;
              return (
                <Link
                  key={pillar.key}
                  to={`/portal/${pillar.key}`}
                  className="group bento-card glass border-2 border-pink/15 p-7 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all"
                >
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-[0.3em] ${palette.chip} px-3 py-1.5 rounded-full mb-5`}>
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display text-gray-900 mb-2">
                    {pillar.name}
                  </h3>
                  <p className="text-pink italic font-serif text-base mb-4">{pillar.tagline}</p>
                  <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed mb-6">
                    {pillar.short}
                  </p>
                  <span className="inline-flex items-center gap-2 text-magenta font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                    Explore <ArrowRight size={14} strokeWidth={2} />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
