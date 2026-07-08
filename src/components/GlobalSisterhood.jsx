import { Globe } from 'lucide-react';
import Blob from './Blob.jsx';
import Reveal from './Reveal.jsx';

const pillars = [
  { label: 'Online Haven', desc: 'Online gatherings, expert-led calls, and daily inspiration that meet you wherever you are.' },
  { label: 'In-Person Magic', desc: 'Local meetups, retreats, seminars, and unforgettable experiences that bring us together.' },
  { label: 'Truly Personal', desc: 'We know your name. We root for you. We genuinely care.' },
];

export default function GlobalSisterhood() {
  return (
    <section className="relative z-10 py-20 md:py-32 px-5 md:px-6 bg-soft-sunset overflow-hidden">
      <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={18} slow />
      <Blob tone="gold" size="md" className="bottom-0 -left-20" opacity={22} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading block */}
        <Reveal className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gold/30 text-magenta font-bold text-[11px] uppercase tracking-[0.3em] mb-6 shadow-sm">
            <Globe size={14} strokeWidth={1.75} />
            A Global Sisterhood
          </div>
          <h2 className="font-display text-4xl md:text-6xl leading-tight text-gray-900 mb-5">
            Connection <i className="text-gradient">without borders.</i>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Join from wherever you are, and step into connection, both online and in person as our community expands.
          </p>
        </Reveal>

        {/* Photo */}
        <Reveal direction="zoom" delay={120} className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/60 mb-10 group">
          <img
            src="/assets/online-sisterhood-2.png"
            alt="Women from around the world connecting online"
            className="w-full h-auto object-cover aspect-[21/9] zoom-slow"
          />
          {/* Subtle bottom gloss */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
        </Reveal>

        {/* Three supporting pillars */}
        <div className="grid md:grid-cols-3 gap-5">
          {pillars.map((p, i) => (
            <Reveal
              key={i}
              delay={80 * (i + 1)}
              className="bento-card glass border border-gold/25 p-7 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl text-pink">0{i + 1}</span>
                <span className="h-px w-10 bg-gold/70" />
              </div>
              <h3 className="font-display text-xl text-gray-900">{p.label}</h3>
              <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
