import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, PartyPopper } from 'lucide-react';
import Reveal from './Reveal.jsx';

export default function EventsTeaser() {
  return (
    <section id="events" className="relative z-10 py-20 md:py-28 bg-soft-dawn overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-6 flex flex-col lg:flex-row gap-6 md:gap-8 relative z-10">
        <Reveal direction="right" className="w-full lg:w-1/2 bento-card p-7 md:p-14 glass border border-gold/20">
          <h2 className="text-4xl md:text-5xl font-display mb-6 text-gray-900 leading-tight">
            Calls, gatherings &amp; <span className="font-serif italic text-pink font-semibold">moments to rise together.</span>
          </h2>
          <ul className="space-y-3 text-gray-700 font-medium mb-10">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-pink shrink-0" size={20} />
              Monthly deep-dive call with Jenn
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-pink shrink-0" size={20} />
              Monthly 7 Pillar support &amp; growth calls with expert coaches
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-pink shrink-0" size={20} />
              Daily Lives for Vibes
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-pink shrink-0" size={20} />
              Weekly uplifting texts for inspiration &amp; motivation
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-pink shrink-0" size={20} />
              Healing soundbaths &amp; meditations
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="text-pink shrink-0" size={20} />
              Launch Party + select in-person gatherings
            </li>
          </ul>
          <Link
            to="/events"
            className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
          >
            See Upcoming Events <ArrowRight size={18} />
          </Link>
        </Reveal>

        <Reveal direction="left" delay={120} className="w-full lg:w-1/2 bento-card p-0 bg-magenta text-white relative overflow-hidden group border-none min-h-[420px]">
          <img
            src="/assets/women-boardwalk.png"
            alt="Women celebrating together"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-magenta/75 via-magenta/25 to-transparent" />

          <div className="relative z-10 flex flex-col h-full justify-between p-7 md:p-14">
            <div>
              <PartyPopper size={40} className="text-sun mb-6" />
              <h3 className="text-5xl md:text-6xl font-display italic mb-3">Launch Party</h3>
              <h4 className="text-sm font-bold tracking-widest text-sun mb-6 uppercase bg-white/10 inline-block px-4 py-2 rounded-lg backdrop-blur-sm">
                Stay Tuned
              </h4>
              <p className="text-white/95 text-lg font-medium leading-relaxed max-w-md">
                An in-person celebration of the sisterhood coming together. Connection, laughter, and good energy as this community officially begins.
              </p>
            </div>

            <div className="mt-8 bg-white/15 border-2 border-white/25 rounded-2xl p-5 flex flex-col gap-2 backdrop-blur-md max-w-md">
              <p className="font-bold flex items-center gap-3">
                <CheckCircle2 size={20} className="text-sun" /> Members get first invites
              </p>
              <p className="font-bold flex items-center gap-3">
                <CheckCircle2 size={20} className="text-sun" /> Date &amp; location announced soon
              </p>
              <p className="font-bold flex items-center gap-3">
                <CheckCircle2 size={20} className="text-sun" /> Open celebration of the community
              </p>
              <p className="text-white/90 text-sm font-medium mt-2">
                More details coming soon.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
