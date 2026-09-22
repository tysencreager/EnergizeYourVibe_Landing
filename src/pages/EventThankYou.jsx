import { useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, Clock, Heart, Laptop, Link2, MailCheck, Sparkles } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { track } from '../lib/track.js';
import { getEvent } from '../data/events.js';
import { CONTACT_EMAIL } from '../data/links.js';

export default function EventThankYou() {
  const { slug } = useParams();
  const { state } = useLocation();
  const event = getEvent(slug);
  const firstName = typeof state?.firstName === 'string' ? state.firstName : '';
  const [shareStatus, setShareStatus] = useState('idle'); // idle | copied

  usePageMeta({
    title: event ? `You’re In! ${event.title} | Energize Your Vibe` : undefined,
    description: event ? `Your seat for ${event.title} is saved.` : undefined,
    noindex: true,
  });

  if (!event) return <Navigate to="/events" replace />;

  const eventUrl = `${window.location.origin}/events/${event.slug}`;

  async function handleShare() {
    track('event_share', { event: event.slug });
    const shareData = {
      title: `${event.title} | Energize Your Vibe`,
      text: `Come with me! ${event.title}: ${event.subtitle}. ${event.dateLabel}, ${event.timeLabel}. Free and all women are welcome.`,
      url: eventUrl,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(eventUrl);
      setShareStatus('copied');
      window.setTimeout(() => setShareStatus('idle'), 2500);
    } catch {
      /* share sheet dismissed or clipboard blocked - nothing to do */
    }
  }

  return (
    <>
      {/* CONFIRMATION HERO */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-5 md:px-6 bg-animated-warm overflow-hidden grain">
        <Sunburst
          className="absolute -right-32 -top-32 w-[520px] h-[520px] opacity-20"
          strokeColor="rgba(255,255,255,0.6)"
        />
        <Blob tone="magenta" size="lg" className="-bottom-20 -left-20" opacity={25} slow />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white">
            <Sparkles size={14} strokeWidth={1.75} className="text-sun" />
            Your seat is saved
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-5 md:mb-6 drop-shadow-md">
            You’re in{firstName ? `, ${firstName}` : ''}! <span className="font-serif italic text-sun">See you there.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            We’re so glad you’re joining us for <strong className="text-white">{event.title}</strong> with
            our guest expert, {event.expert.name}.
          </p>

          <ul className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 mb-10 text-white font-semibold text-sm md:text-base">
            <DetailChip icon={<CalendarDays size={16} strokeWidth={1.75} />}>{event.dateLabel}</DetailChip>
            <DetailChip icon={<Clock size={16} strokeWidth={1.75} />}>{event.timeLabel}</DetailChip>
            <DetailChip icon={<Laptop size={16} strokeWidth={1.75} />}>
              {event.formatLabel} · {event.lengthLabel}
            </DetailChip>
          </ul>

          <div className="max-w-xl mx-auto bg-white/15 border border-white/30 backdrop-blur-md rounded-3xl px-6 py-6 md:px-8 text-white">
            <MailCheck size={30} strokeWidth={1.5} className="text-sun mx-auto mb-3" />
            <p className="font-bold text-lg mb-2">Check your inbox for your Zoom link.</p>
            <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
              Your confirmation email is on its way with everything you need to join the call.
              Don’t see it in a few minutes? Peek in your spam or promotions folder, or email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sun font-bold underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* BRING A FRIEND */}
      <section className="relative py-16 md:py-24 px-5 md:px-6 bg-soft-rose overflow-hidden">
        <Sunburst
          className="absolute -left-40 -bottom-40 w-[520px] h-[520px] opacity-10"
          strokeColor="rgba(183,21,86,0.6)"
        />
        <Blob tone="gold" size="md" className="top-10 -right-16" opacity={18} slow />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bento-card glass border-2 border-pink/20 p-8 sm:p-10 md:p-14 text-center shadow-xl">
            <Heart size={32} strokeWidth={1.75} className="text-pink mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-5 leading-tight">
              Bring a <i className="text-pink">friend.</i>
            </h2>
            <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
              You don’t need to be a member to join us. All women are welcome. We weren’t
              meant to figure everything out alone, and there is so much we can learn from
              each other. Send this to a friend who could use a calmer season too.
            </p>
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-9 rounded-full font-bold uppercase tracking-widest text-sm md:text-base hover:bg-pink transition-colors shadow-lg"
            >
              {shareStatus === 'copied' ? (
                <>
                  <Check size={18} /> Link Copied
                </>
              ) : (
                <>
                  <Link2 size={18} /> Share The Invite
                </>
              )}
            </button>
            <p className="text-sm text-gray-500 font-medium mt-8">
              Curious about the community?{' '}
              <Link
                to="/membership"
                onClick={() => track('event_membership_click', { event: event.slug })}
                className="inline-flex items-center gap-1 text-magenta font-bold hover:text-pink transition-colors"
              >
                See what’s inside <ArrowRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function DetailChip({ icon, children }) {
  return (
    <li className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md">
      <span className="text-sun">{icon}</span>
      {children}
    </li>
  );
}
