import { Link } from 'react-router-dom';
import { ArrowRight, Repeat, Map, HeartHandshake } from 'lucide-react';
import Blob from './Blob.jsx';
import Reveal from './Reveal.jsx';

// The three signature assets, named. Each answers a different longing:
// How do I grow? Where do I focus? Who walks beside me?
const assets = [
  {
    icon: <Repeat size={26} strokeWidth={1.75} />,
    name: 'The EYV Method',
    desc: 'A simple daily practice that helps you become more intentional in the way you think, feel, and live.',
    to: '/eyv-method',
    cta: 'The daily practice',
    accent: 'text-pink',
    chip: 'bg-pink/10',
  },
  {
    icon: <Map size={26} strokeWidth={1.75} />,
    name: 'The 7 Pillars',
    desc: 'A roadmap for strengthening the seven essential areas of your life.',
    to: '/pillars',
    cta: 'The roadmap',
    accent: 'text-orange',
    chip: 'bg-orange/10',
  },
  {
    icon: <HeartHandshake size={26} strokeWidth={1.75} />,
    name: 'The Community',
    desc: 'Real women, meaningful connection, encouragement, accountability, and shared experiences.',
    to: '/membership',
    cta: 'Your people',
    accent: 'text-magenta',
    chip: 'bg-magenta/10',
  },
];

export default function MissionIntro() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-5 md:px-6 bg-white overflow-hidden">
      <Blob tone="sun" size="xl" className="-top-32 -right-32" opacity={25} slow />
      <Blob tone="pink" size="md" className="bottom-10 -left-24" opacity={12} />

      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-4">
            Why we exist
          </p>
          <h2 className="text-4xl md:text-6xl font-display text-gray-900 leading-tight mb-7">
            For women who don&rsquo;t want to <i className="text-gradient">do life alone.</i>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-medium leading-relaxed mb-5">
            The way you move through life begins with the way you experience it. When you
            become more aware of how you think, feel, respond, and connect, small daily
            choices begin to shape lasting transformation.
          </p>
          <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed">
            Find your people. The ones you truly vibe with. The ones who cheer you on,
            celebrate your wins, lift you through life&rsquo;s challenges, and cultivate
            positivity and joy together.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {assets.map((a, i) => (
            <Reveal key={a.name} delay={80 * (i + 1)}>
              <Link
                to={a.to}
                className="group block h-full bento-card glass border-2 border-pink/15 p-7 md:p-8 hover:-translate-y-1 hover:shadow-2xl transition-all"
              >
                <span
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${a.chip} ${a.accent} mb-5`}
                >
                  {a.icon}
                </span>
                <p className={`text-[10px] font-bold uppercase tracking-[0.3em] ${a.accent} mb-2`}>
                  {a.cta}
                </p>
                <h3 className="text-2xl font-display text-gray-900 mb-3">{a.name}</h3>
                <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed mb-5">
                  {a.desc}
                </p>
                <span className="inline-flex items-center gap-2 text-magenta font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                  Explore <ArrowRight size={14} strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
