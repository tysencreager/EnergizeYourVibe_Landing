import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ArrowRight, Calendar, Check, Clock, Laptop, MapPin, Ticket } from 'lucide-react';
import Sunburst from './Sunburst.jsx';
import { DateBadge, eventCtaLabel } from './EventCard.jsx';
import { isInPerson, upcomingEvents, whereLabel } from '../data/events.js';

// Bump the version whenever the popup's content changes so visitors who
// dismissed the previous one see the new one.
const STORAGE_KEY = 'eyv-launch-popup-dismissed-v5';

const foundingBenefits = [
  'Lock in the $88 monthly Founding Member rate for life (first 50 members only)',
  'Still no sign-up fee, just $88 to join',
  'Start with the 7 Pillar Assessment and your personalized growth roadmap',
  'Invitations to local meetups, experiences, and community events',
  'Access to the member library, daily Lives for Vibes & inspiring texts, monthly calls',
  'Energize Your Vibe Hotline, podcast, playlists, meditations, affirmations & vibe check-ins',
  'Private FB Community & personalized welcome gift',
];
const COUNT_WORDS = ['', 'one', 'two', 'three', 'four'];
const OPEN_DELAY_MS = 900;

export default function LaunchPopup() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  // The Vibe Reset funnel and event registration pages are focused
  // conversion flows, and the events calendar already lists everything the
  // popup promotes - don't interrupt them.
  const suppressed = pathname.startsWith('/vibe-reset') || pathname.startsWith('/events');

  // While events are open for registration the popup features them; once the
  // calendar is empty it falls back to the Founding Member invitation.
  const upcoming = upcomingEvents();
  const featureEvents = upcoming.length > 0;

  useEffect(() => {
    if (typeof window === 'undefined' || suppressed) return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      /* sessionStorage may be unavailable; just show once per load */
    }
    const id = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [suppressed]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  function close() {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* best effort */
    }
    setOpen(false);
  }

  if (!open || suppressed) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="launch-popup-title"
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-magenta/35 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      {/* Card */}
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl border border-white/40 animate-[fade-up_450ms_cubic-bezier(0.16,1,0.3,1)_both] flex flex-col">
        {/* Gradient background + decorative sunburst */}
        <div className="absolute inset-0 bg-gradient-to-br from-magenta via-pink to-orange grain" aria-hidden="true" />
        <Sunburst
          className="absolute -right-24 -top-24 w-[360px] h-[360px] opacity-20"
          strokeColor="rgba(253,224,139,0.9)"
        />

        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 border border-white/30 text-white flex items-center justify-center backdrop-blur-md transition-colors"
        >
          <X size={18} strokeWidth={1.75} />
        </button>

        {/* Scrollable content */}
        <div className="relative z-10 min-h-0 overflow-y-auto overflow-x-hidden p-7 sm:p-10 text-white text-center">
          {featureEvents ? (
            <EventsContent events={upcoming} onPick={close} />
          ) : (
            <FoundingMemberContent onPick={close} />
          )}

          <button
            type="button"
            onClick={close}
            className="mt-4 text-white/80 hover:text-white text-xs sm:text-sm font-semibold underline-offset-4 hover:underline py-2"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

function EventsContent({ events, onPick }) {
  const countWord = COUNT_WORDS[events.length] ?? events.length;
  return (
    <>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-5">
        <Calendar size={12} strokeWidth={1.75} className="text-sun" />
        {events.length === 1 ? 'Upcoming event' : 'Upcoming events'} · All women welcome
      </div>

      <h2 id="launch-popup-title" className="font-display text-3xl sm:text-4xl leading-[1.05] mb-3">
        You’re invited to {countWord} upcoming{' '}
        <span className="font-serif italic text-sun">{events.length === 1 ? 'event.' : 'events.'}</span>
      </h2>

      <p className="text-white/95 text-sm sm:text-base font-medium leading-relaxed mb-6">
        You don’t need to be a member to join us. Save your seat, and bring a friend.
      </p>

      <ul className="space-y-3 text-left mb-5">
        {events.map((event) => (
          <li key={event.slug}>
            <Link
              to={`/events/${event.slug}`}
              onClick={onPick}
              className="group flex items-stretch gap-4 bg-white/10 hover:bg-white/20 border border-white/25 rounded-2xl p-4 backdrop-blur-sm transition-colors"
            >
              <DateBadge event={event} className="shrink-0 self-center" />
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sun mb-1">
                  {event.series}
                </p>
                <p className="font-display text-lg sm:text-xl leading-tight mb-1.5">{event.title}</p>
                <p className="text-xs sm:text-sm font-medium text-white/90 leading-snug">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} strokeWidth={2} className="text-sun" />
                    {event.dateLabel} · {event.timeLabel}
                  </span>
                  <br />
                  <span className="inline-flex items-center gap-1.5">
                    {isInPerson(event) ? (
                      <MapPin size={12} strokeWidth={2} className="text-sun" />
                    ) : (
                      <Laptop size={12} strokeWidth={2} className="text-sun" />
                    )}
                    {whereLabel(event)}
                  </span>
                  <br />
                  <span className="inline-flex items-center gap-1.5">
                    <Ticket size={12} strokeWidth={2} className="text-sun" />
                    {event.priceLabel}
                  </span>
                </p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-sun group-hover:text-white transition-colors">
                  {eventCtaLabel(event)} <ArrowRight size={14} strokeWidth={2} />
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-[11px] sm:text-xs font-medium text-white/85">
        Curious about the community?{' '}
        <Link to="/membership" onClick={onPick} className="text-sun font-bold underline underline-offset-2 hover:text-white">
          Become a Founding Member
        </Link>
      </p>
    </>
  );
}

function FoundingMemberContent({ onPick }) {
  return (
    <>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-5">
        <Calendar size={12} strokeWidth={1.75} className="text-sun" />
        Sign-ups are OPEN · The community is LIVE
      </div>

      <h2 id="launch-popup-title" className="font-display text-3xl sm:text-4xl leading-[1.05] mb-3">
        Step into the sisterhood, and become a{' '}
        <span className="font-serif italic text-sun">Founding Member</span> of Energize Your Vibe
      </h2>

      <p className="font-serif italic text-sun text-base sm:text-lg mb-4">
        Build a life you love. You don’t have to do it alone.
      </p>

      <p className="text-white/95 text-sm sm:text-base font-medium leading-relaxed mb-6">
        Support your mind. Strengthen your life. Connect with women who inspire you, cheer you on, and make the journey more fun.
      </p>

      <div className="bg-white/10 border border-white/25 rounded-2xl px-5 py-4 mb-5 backdrop-blur-sm text-left">
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-sun mb-3 text-center">
          Founding Member benefits, while spots last
        </p>
        <ul className="space-y-2">
          {foundingBenefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium leading-snug">
              <Check size={15} strokeWidth={2.5} className="text-sun shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs sm:text-sm font-semibold text-sun mb-1">
        Real tools. Real friendships. Real growth.
      </p>
      <p className="text-[11px] sm:text-xs font-medium text-white/85 mb-6">
        Membership includes a 90-day commitment
      </p>

      <Link
        to="/membership"
        onClick={onPick}
        className="w-full sm:w-auto bg-sun text-magenta font-bold uppercase tracking-widest text-xs sm:text-sm py-3.5 px-7 rounded-full hover:bg-white transition-colors shadow-lg inline-flex items-center justify-center gap-2"
      >
        Become a Founding Member <ArrowRight size={16} strokeWidth={1.75} />
      </Link>
    </>
  );
}
