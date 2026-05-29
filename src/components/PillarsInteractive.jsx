import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { pillars } from '../data/pillars.js';
import Sunburst from './Sunburst.jsx';
import Reveal from './Reveal.jsx';

// Brightened gradients (per client #64 / H3): the dark maroon/brown tail stops
// (#3b0a24, #6a0e33, #8A2F10, #8A4C09) read as "brown" and muddy under the grain
// overlay. Ramped up to brighter, more saturated brand colors so each panel pops
// while staying fully on-palette (no new hues introduced).
const gradientMap = {
  align:   { from: '#E22E64', via: '#B71556', to: '#8A1249' },
  feel:    { from: '#E22E64', via: '#B71556', to: '#8A1249' },
  think:   { from: '#F8A232', via: '#F26B38', to: '#E22E64' },
  fuel:    { from: '#FDE08B', via: '#F8A232', to: '#F26B38' },
  connect: { from: '#E22E64', via: '#F26B38', to: '#B71556' },
  flow:    { from: '#F26B38', via: '#F8A232', to: '#B71556' },
  shine:   { from: '#FDE08B', via: '#F8A232', to: '#E22E64' },
};

export default function PillarsInteractive() {
  const [active, setActive] = useState(0);
  const contentRef = useRef(null);

  const pillar = pillars[active];
  const g = gradientMap[pillar.key];
  const bg = `radial-gradient(ellipse at 20% 20%, ${g.from}, ${g.via} 45%, ${g.to})`;

  const onKey = (e, i) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setActive((i + 1) % pillars.length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setActive((i - 1 + pillars.length) % pillars.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActive(pillars.length - 1);
    }
  };

  return (
    <section
      id="pillars"
      className="relative z-10 py-20 md:py-28 px-5 md:px-6 bg-soft-dawn overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-display mb-4 text-gray-900">
            Built on <span className="font-serif italic text-gradient font-semibold">7 Pillars.</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Real change needs clarity. Tap a pillar to explore how each area supports the whole.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-[240px_1fr] gap-6 md:gap-10 items-stretch">
          {/* Tab list */}
          <div
            role="tablist"
            aria-label="Energize Your Vibe 7 Pillars"
            aria-orientation="vertical"
            className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0 snap-x snap-mandatory pb-2 md:pb-0"
          >
            {pillars.map((p, i) => {
              const isActive = i === active;
              return (
                <button
                  key={p.key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`pillar-panel-${p.key}`}
                  id={`pillar-tab-${p.key}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`group shrink-0 snap-start flex items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 border-2 ${
                    isActive
                      ? 'bg-white border-magenta shadow-xl scale-[1.02]'
                      : 'bg-white/60 border-transparent hover:border-gold/40 hover:bg-white'
                  }`}
                >
                  <span
                    className={`font-display text-xl transition-colors ${
                      isActive ? 'text-pink' : 'text-gray-400 group-hover:text-magenta'
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="flex flex-col">
                    <span
                      className={`font-display text-lg leading-none transition-colors ${
                        isActive ? 'text-magenta' : 'text-gray-800 group-hover:text-magenta'
                      }`}
                    >
                      {p.name}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500 mt-1">
                      {p.subtitle}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id={`pillar-panel-${pillar.key}`}
            aria-labelledby={`pillar-tab-${pillar.key}`}
            className="relative rounded-3xl overflow-hidden min-h-[440px] shadow-2xl transition-[background] duration-700 grain"
            style={{ background: bg }}
          >
            <Sunburst
              className="absolute -right-24 -top-24 w-[520px] h-[520px] opacity-30"
              strokeColor="rgba(255, 255, 255, 0.5)"
            />
            <Sunburst
              className="absolute -left-32 -bottom-40 w-[420px] h-[420px] opacity-15"
              strokeColor="rgba(253, 224, 139, 0.6)"
              rays={16}
            />

            <div
              ref={contentRef}
              key={pillar.key}
              className="relative z-10 p-8 md:p-14 flex flex-col justify-between h-full min-h-[440px] text-white fade-up"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-sun mb-4">
                  Pillar 0{active + 1} · {pillar.subtitle}
                </p>
                <h3 className="font-display text-6xl md:text-8xl leading-none mb-6 drop-shadow-lg">
                  {pillar.name}
                </h3>
                <p className="font-serif italic text-2xl md:text-3xl text-sun mb-6 leading-snug">
                  {pillar.tagline}
                </p>
                <p className="text-white/95 text-lg font-medium leading-relaxed max-w-xl">
                  {pillar.long}
                </p>
              </div>
              <div className="mt-8 flex gap-1.5" aria-hidden="true">
                {pillars.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active ? 'w-8 bg-sun' : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                    aria-label={`Go to pillar ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-14">
          <Link
            to="/about"
            className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
          >
            Explore the Full Framework <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
