import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Laptop, MapPin, Ticket } from 'lucide-react';
import { eventDateParts, isInPerson, whereLabel } from '../data/events.js';

// Calendar-style card for an upcoming event. Used by the homepage
// "Upcoming events" section and the /events calendar page.

export function DateBadge({ event, className = '' }) {
  const { weekday, month, day } = eventDateParts(event);
  return (
    <div
      className={`inline-flex flex-col items-center justify-center bg-white text-magenta rounded-2xl px-3 py-2 shadow-lg border border-pink/15 leading-none ${className}`}
      aria-hidden="true"
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-pink">{weekday}</span>
      <span className="font-display text-3xl mt-1">{day}</span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mt-1">{month}</span>
    </div>
  );
}

export function eventCtaLabel(event) {
  return event.pricing ? 'Save Your Seat' : 'Save Your Free Seat';
}

export default function EventCard({ event }) {
  const inPerson = isInPerson(event);
  return (
    <Link
      to={`/events/${event.slug}`}
      className="bento-card group bg-white border-2 border-pink/20 p-0 overflow-hidden flex flex-col h-full"
    >
      <div className="relative">
        <img
          src={event.expert.photo}
          alt={`${event.expert.name}, guest expert`}
          className="w-full aspect-[16/10] object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-magenta/70 via-transparent to-transparent" aria-hidden="true" />
        <DateBadge event={event} className="absolute top-4 left-4" />
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 text-gray-800 shadow">
          {event.formatLabel}
        </span>
        <p className="absolute bottom-4 left-5 right-5 text-white text-xs font-bold uppercase tracking-[0.25em] drop-shadow">
          with {event.expert.name}
        </p>
      </div>

      <div className="p-7 md:p-8 flex flex-col flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-2">{event.series}</p>
        <h3 className="font-display text-2xl md:text-3xl text-gray-900 leading-tight mb-2">{event.title}</h3>
        <p className="text-gray-600 font-medium leading-relaxed mb-5">{event.subtitle}</p>

        <ul className="space-y-2 text-sm text-gray-700 font-semibold mb-6">
          <li className="flex items-start gap-2.5">
            <Clock size={16} strokeWidth={1.75} className="text-orange shrink-0 mt-0.5" />
            {event.dateLabel} · {event.timeLabel}
          </li>
          <li className="flex items-start gap-2.5">
            {inPerson ? (
              <MapPin size={16} strokeWidth={1.75} className="text-orange shrink-0 mt-0.5" />
            ) : (
              <Laptop size={16} strokeWidth={1.75} className="text-orange shrink-0 mt-0.5" />
            )}
            {whereLabel(event)}
          </li>
          <li className="flex items-start gap-2.5">
            <Ticket size={16} strokeWidth={1.75} className="text-orange shrink-0 mt-0.5" />
            {event.priceLabel}
          </li>
        </ul>

        <span className="mt-auto inline-flex items-center justify-center gap-2 bg-magenta text-white py-3.5 px-6 rounded-full font-bold uppercase tracking-widest text-sm group-hover:bg-pink transition-colors shadow-lg">
          {eventCtaLabel(event)} <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
