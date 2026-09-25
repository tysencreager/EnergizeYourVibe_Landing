import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays } from 'lucide-react';
import Blob from './Blob.jsx';
import Reveal from './Reveal.jsx';
import EventCard from './EventCard.jsx';
import { upcomingEvents } from '../data/events.js';

const COUNT_WORDS = ['', 'One', 'Two', 'Three', 'Four'];

// Homepage section right under the hero listing every event that is still
// open for registration (src/data/events.js). Renders nothing once the
// calendar is empty, so past events never leave a hole on the page.
export default function UpcomingEvents() {
  const upcoming = upcomingEvents();
  if (upcoming.length === 0) return null;

  const countWord = COUNT_WORDS[upcoming.length] ?? upcoming.length;

  return (
    <section id="upcoming-events" className="relative z-10 py-16 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
      <Blob tone="gold" size="lg" className="-top-24 -left-24" opacity={20} slow />
      <Blob tone="pink" size="md" className="-bottom-16 -right-16" opacity={12} />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-10 md:mb-14">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-orange mb-4">
            <CalendarDays size={14} strokeWidth={1.75} /> Upcoming events · Save your seat
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight mb-4">
            {upcoming.length === 1 ? 'Join us' : `${countWord} ways to`}{' '}
            <span className="font-serif italic text-pink font-semibold">
              {upcoming.length === 1 ? 'this month.' : 'gather this fall.'}
            </span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-medium max-w-2xl mx-auto">
            You don’t need to be a member to join us. All women are welcome, so bring a friend.
          </p>
        </Reveal>

        <div
          className={`grid gap-6 md:gap-8 ${
            upcoming.length === 1 ? 'max-w-xl mx-auto' : 'md:grid-cols-2'
          }`}
        >
          {upcoming.map((event, i) => (
            <Reveal key={event.slug} delay={i * 120} className="h-full">
              <EventCard event={event} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="text-center mt-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-magenta font-bold uppercase tracking-widest text-sm hover:text-pink transition-colors"
          >
            See the full events calendar <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
