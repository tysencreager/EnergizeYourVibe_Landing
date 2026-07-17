import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle2, Video, Headphones, Flower2, PartyPopper } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';

const eventTypes = [
  {
    icon: <Video />,
    title: 'Monthly Deep-Dive Call',
    desc: 'A live, virtual group call with Jenn, included with every membership.',
    chip: 'Virtual',
    color: 'magenta',
    image: '/assets/sisterhood-zoom.png',
  },
  {
    icon: <Headphones />,
    title: 'Healing Soundbath',
    desc: 'Drop in, exhale, and reset your nervous system with the sisterhood.',
    chip: 'Virtual',
    color: 'pink',
    image: '/assets/online-sisterhood.png',
  },
  {
    icon: <Flower2 />,
    title: 'Launch Party',
    desc: 'An intentional gathering to celebrate the community coming together.',
    chip: 'In-Person',
    color: 'gold',
    image: '/assets/women-boardwalk.png',
  },
];

const overlayStyles = {
  magenta: 'bg-gradient-to-t from-magenta/90 via-magenta/50 to-transparent',
  pink: 'bg-gradient-to-t from-pink/90 via-pink/50 to-transparent',
  gold: 'bg-gradient-to-t from-[#8a5a00]/90 via-gold/50 to-transparent',
  orange: 'bg-gradient-to-t from-orange/90 via-orange/50 to-transparent',
};

export default function Events() {
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
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-5 md:mb-6 drop-shadow-md">
            Where the <span className="font-serif italic text-sun">sisterhood</span> rises together.
          </h1>
          <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto">
            Join from wherever you are, and step into connection, both online and in person as our community expands.
          </p>
        </div>
      </section>

      {/* PLACEHOLDER CALENDAR */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bento-card glass border-2 border-dashed border-pink/30 p-10 md:p-16 text-center mb-16">
            <Calendar className="text-pink mx-auto mb-6" size={56} />
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-4">
              Full calendar <i className="text-pink">coming soon.</i>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-8">
              The upcoming event lineup is being finalized. Check back shortly — or become a member now so you don’t miss a thing.
            </p>
            <Link
              to="/membership"
              className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
            >
              Become a Member <ArrowRight size={18} />
            </Link>
          </div>

          {/* WHAT TO EXPECT */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-4 text-center">
              What to <i className="text-orange">expect.</i>
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-medium text-center max-w-2xl mx-auto mb-10">
              A taste of what’s included with your membership each month.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {eventTypes.map((e, i) => (
              <div
                key={i}
                className="bento-card relative overflow-hidden border-none min-h-[320px] group text-white"
              >
                <img
                  src={e.image}
                  alt={e.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className={`absolute inset-0 ${overlayStyles[e.color]}`} />
                <div className="relative z-10 p-8 flex flex-col justify-between h-full min-h-[320px]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl shrink-0 border border-white/30">
                      {e.icon}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 text-gray-800">
                      {e.chip}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl mb-2 drop-shadow-md">{e.title}</h3>
                    <p className="text-white/95 font-medium leading-relaxed drop-shadow">{e.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAUNCH PARTY CTA */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-bg">
        <div className="max-w-6xl mx-auto bento-card p-0 bg-magenta text-white relative overflow-hidden border-none min-h-[420px] group">
          <img
            src="/assets/women-laughing.png"
            alt="Women celebrating together"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-magenta/75 via-magenta/25 to-transparent" />
          <div className="relative z-10 p-10 md:p-16 max-w-2xl">
            <PartyPopper size={40} className="text-sun mb-6" />
            <h2 className="text-4xl md:text-6xl font-display italic mb-4">
              Launch Party
            </h2>
            <p className="text-sun text-sm font-bold uppercase tracking-widest mb-6">
              Stay Tuned
            </p>
            <p className="text-white/95 text-lg font-medium leading-relaxed mb-8">
              An intentional in-person gathering to celebrate the community coming together. Connection, laughter, and good energy as the sisterhood officially begins.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-3 font-bold">
                <CheckCircle2 className="text-sun" size={20} /> Members get first invites
              </li>
              <li className="flex items-center gap-3 font-bold">
                <CheckCircle2 className="text-sun" size={20} /> Date &amp; location announced soon
              </li>
              <li className="flex items-center gap-3 font-bold">
                <CheckCircle2 className="text-sun" size={20} /> More details coming soon
              </li>
            </ul>
            <Link
              to="/membership"
              className="inline-flex items-center gap-3 bg-sun text-magenta py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors shadow-lg"
            >
              Become a Member <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
