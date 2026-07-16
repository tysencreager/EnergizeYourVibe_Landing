import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Quote } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import Reveal from '../components/Reveal.jsx';
import AddToHomeScreen from '../components/AddToHomeScreen.jsx';
import { pillars, pillarColorClasses } from '../data/pillars.js';
import { useAuth } from '../hooks/useAuth.jsx';

// One affirmation per day, rotating through the week. Jenn's voice.
const affirmations = [
  'I lead with love. I live with intention. I have fun.',
  'My energy is sacred — I protect it, and I share it on purpose.',
  'I am allowed to take up space and shine.',
  'I trust myself. I trust my timing. I trust my path.',
  'I choose thoughts that support who I am becoming.',
  'I welcome what is meant for me and release what is not.',
  'I am seen, I am heard, and I deeply matter.',
];

// Pillar-colored hover borders (literal class names so Tailwind keeps them).
const hoverBorderClasses = {
  magenta: 'hover:border-magenta/50',
  pink: 'hover:border-pink/50',
  orange: 'hover:border-orange/50',
  gold: 'hover:border-gold/70',
};

export default function Portal() {
  const { user } = useAuth();
  const greetingName = user?.user_metadata?.first_name || user?.email?.split('@')[0] || 'sister';
  const affirmation = affirmations[new Date().getDay()];

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-5 md:px-6 bg-animated-warm overflow-hidden grain">
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

          <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            Your sacred space. Pick a pillar below to explore the practices, downloads, and modules waiting for you.
          </p>

          {/* Today's affirmation */}
          <div className="inline-flex items-start sm:items-center gap-3 bg-white/15 border border-white/25 backdrop-blur-md rounded-2xl px-5 py-4 max-w-xl text-left">
            <Quote size={18} strokeWidth={2} className="text-sun shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-white font-medium text-sm md:text-base leading-snug">
              <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-sun mb-1">
                Today's affirmation
              </span>
              <span className="font-serif italic text-base md:text-lg">{affirmation}</span>
            </p>
          </div>
        </div>
      </section>

      {/* PILLAR GRID */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
        <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={15} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Start-here call-out: the 7 Pillar Assessment */}
          <Reveal>
            <Link
              to="/portal/assessment"
              className="group relative block rounded-3xl overflow-hidden p-7 sm:p-9 mb-12 md:mb-16 bg-gradient-to-r from-magenta via-pink to-orange text-white shadow-[0_16px_44px_rgba(183,21,86,0.35)] hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(183,21,86,0.45)] transition-all"
            >
              <Sunburst
                className="absolute -right-20 -top-24 w-[340px] h-[340px] opacity-20 pointer-events-none"
                strokeColor="rgba(255,255,255,0.7)"
              />
              <div className="relative flex flex-col sm:flex-row items-center gap-5 sm:gap-7 text-center sm:text-left">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 border border-white/30 text-sun shrink-0">
                  <Sparkles size={26} strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sun mb-2">
                    Start here
                  </p>
                  <h3 className="text-2xl md:text-3xl font-display mb-1">
                    Take the <i className="font-serif text-sun">7 Pillar Assessment.</i>
                  </h3>
                  <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
                    See where your energy is most supported — and where it needs attention — so you know exactly which pillar to focus on first.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 bg-white text-magenta font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-lg group-hover:gap-3 transition-all shrink-0">
                  Begin <ArrowRight size={14} strokeWidth={2} />
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Sister Snapshot call-out */}
          <Reveal>
            <Link
              to="/portal/snapshot"
              className="group block bento-card glass border-2 border-pink/20 p-6 sm:p-7 mb-12 md:mb-16 -mt-6 md:-mt-10 hover:-translate-y-1 hover:shadow-2xl transition-all"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink/10 text-pink shrink-0">
                  <Quote size={22} strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-display text-gray-900 mb-1">
                    Take your <i className="text-pink">Sister Snapshot.</i>
                  </h3>
                  <p className="text-gray-700 text-sm font-medium leading-relaxed">
                    Help Jenn get to know the real you — your favorites, your heart, and how we can best support and celebrate you. Private, optional, and worth the 15 minutes.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 text-magenta font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all shrink-0">
                  Share <ArrowRight size={14} strokeWidth={2} />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal className="text-center mb-12 md:mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-3">
              The 7 Pillars
            </p>
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight">
              Your <i className="text-pink">resources, by pillar.</i>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {pillars.map((pillar, i) => {
              const palette = pillarColorClasses[pillar.color] ?? pillarColorClasses.pink;
              const hoverBorder = hoverBorderClasses[pillar.color] ?? hoverBorderClasses.pink;
              const number = String(i + 1).padStart(2, '0');
              return (
                <Reveal key={pillar.key} delay={Math.min(i * 80, 320)}>
                  <Link
                    to={`/portal/${pillar.key}`}
                    className={`group relative block h-full overflow-hidden bento-card glass border-2 border-pink/15 ${hoverBorder} p-7 md:p-8 pt-9 md:pt-10 hover:-translate-y-1 hover:shadow-2xl transition-all`}
                  >
                    {/* Pillar color edge */}
                    <span
                      className={`absolute top-0 left-0 right-0 h-1.5 ${palette.bg} opacity-80 group-hover:opacity-100 transition-opacity`}
                    />
                    {/* Ghost number */}
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-6 -right-1 text-[6.5rem] leading-none font-display text-gray-900 opacity-[0.05] group-hover:opacity-10 select-none pointer-events-none transition-opacity"
                    >
                      {number}
                    </span>

                    <div className="relative">
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span
                          className={`inline-block text-[10px] font-bold uppercase tracking-[0.3em] ${palette.chip} px-3 py-1.5 rounded-full`}
                        >
                          {pillar.subtitle}
                        </span>
                        <span className="text-[10px] font-bold text-gray-300 tracking-widest">
                          {number}
                        </span>
                      </div>
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
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          {/* Save-to-home-screen tip (hidden when already installed as an app) */}
          <div className="mt-12 md:mt-16">
            <AddToHomeScreen />
          </div>
        </div>
      </section>
    </>
  );
}
