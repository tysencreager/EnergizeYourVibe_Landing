import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Shirt, Ticket, Gift, Bell } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';

const categories = [
  {
    icon: <Shirt />,
    title: 'Merch',
    desc: 'Wear your vibe. Apparel designed to remind you who you are every time you put it on.',
    chip: 'Coming soon',
    color: 'magenta',
    image: '/assets/women-laughing.png',
  },
  {
    icon: <Ticket />,
    title: 'Event Tickets',
    desc: 'Reserve your place at soundbaths, gatherings, and the launch party.',
    chip: 'Coming soon',
    color: 'pink',
    image: '/assets/women-boardwalk.png',
  },
  {
    icon: <Gift />,
    title: 'EYV Swag',
    desc: 'Self-care kits, journals, and little treasures to keep your energy lifted between gatherings.',
    chip: 'Coming soon',
    color: 'gold',
    image: '/assets/self-care-kit.png',
  },
];

const overlayStyles = {
  magenta: 'bg-gradient-to-t from-magenta/90 via-magenta/50 to-transparent',
  pink: 'bg-gradient-to-t from-pink/90 via-pink/50 to-transparent',
  gold: 'bg-gradient-to-t from-[#8a5a00]/90 via-gold/50 to-transparent',
  orange: 'bg-gradient-to-t from-orange/90 via-orange/50 to-transparent',
};

export default function Shop() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-48 md:pb-24 px-5 md:px-6 bg-animated-warm overflow-hidden grain">
        <Sunburst
          className="absolute -right-32 -top-32 w-[520px] h-[520px] opacity-20"
          strokeColor="rgba(255,255,255,0.6)"
        />
        <Blob tone="magenta" size="lg" className="-bottom-20 -left-20" opacity={25} slow />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white">
            <ShoppingBag size={14} strokeWidth={1.75} className="text-sun" />
            The Shop
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-5 md:mb-6 drop-shadow-md">
            Carry the <span className="font-serif italic text-sun">vibe</span> with you.
          </h1>
          <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto">
            Merch, event tickets, and EYV swag are on the way. A curated little corner to keep your energy lifted, wherever life takes you.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bento-card glass border-2 border-dashed border-pink/30 p-10 md:p-16 text-center mb-16">
            <ShoppingBag className="text-pink mx-auto mb-6" size={56} />
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-4">
              The shop is <i className="text-pink">opening soon.</i>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8">
              We&rsquo;re curating the first collection now. Become a member and you&rsquo;ll be the first to know the moment listings go live, plus first dibs and member pricing.
            </p>
            <Link
              to="/membership"
              className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
            >
              <Bell size={18} /> Notify Me at Launch
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-4 text-center">
              What&rsquo;s <i className="text-orange">coming.</i>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-medium text-center max-w-2xl mx-auto mb-10">
              A first look at the collections we&rsquo;re putting together for the community.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {categories.map((c, i) => (
              <div
                key={i}
                className="bento-card relative overflow-hidden border-none min-h-[320px] group text-white"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 ${overlayStyles[c.color]}`} />
                <div className="relative z-10 p-8 flex flex-col justify-between h-full min-h-[320px]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl shrink-0 border border-white/30">
                      {c.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 text-gray-800">
                      {c.chip}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl mb-2 drop-shadow-md">{c.title}</h3>
                    <p className="text-white/95 font-medium leading-relaxed drop-shadow">{c.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
