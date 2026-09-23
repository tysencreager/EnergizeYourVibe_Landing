import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Clock,
  Gift,
  Laptop,
  Mail,
  Phone,
  Sparkles,
  User,
} from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import Reveal from '../components/Reveal.jsx';
import { useInView } from '../hooks/useInView.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { track, trackOnce } from '../lib/track.js';
import { getEvent, isRegistrationOpen } from '../data/events.js';
import { EVENT_REGISTER_ENDPOINT, CONTACT_EMAIL } from '../data/links.js';

export default function EventRegister() {
  const { slug } = useParams();
  const event = getEvent(slug);

  usePageMeta({
    title: event ? `${event.title} | ${event.priceLabel} | Energize Your Vibe` : undefined,
    description: event?.summary,
    canonical: event ? `https://www.energizeyourvibe.com/events/${event.slug}` : undefined,
  });

  if (!event) return <Navigate to="/events" replace />;

  const open = isRegistrationOpen(event);
  const titleWords = event.title.split(' ');
  const titleLast = titleWords.pop();

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-48 md:pb-24 px-5 md:px-6 bg-animated-warm overflow-hidden grain">
        <Sunburst
          className="absolute -right-32 -top-32 w-[520px] h-[520px] opacity-20"
          strokeColor="rgba(255,255,255,0.6)"
        />
        <Blob tone="magenta" size="lg" className="-bottom-20 -left-20" opacity={25} slow />

        <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-12 gap-10 md:gap-12 items-center">
          <div className="md:col-span-7 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white">
              <Sparkles size={14} strokeWidth={1.75} className="text-sun" />
              {event.series}
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-8xl font-display text-white leading-[0.95] mb-5 drop-shadow-md">
              {titleWords.join(' ')} <span className="font-serif italic text-sun">{titleLast}</span>
            </h1>

            <p className="text-xl md:text-2xl text-white font-semibold leading-snug mb-4 max-w-xl mx-auto md:mx-0">
              {event.subtitle}
            </p>

            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-sun mb-8">
              {event.taglines.join(' · ')}
            </p>

            <ul className="flex flex-col sm:flex-row sm:flex-wrap items-center md:items-start gap-3 mb-9 text-white font-semibold text-sm md:text-base">
              <DetailChip icon={<CalendarDays size={16} strokeWidth={1.75} />}>{event.dateLabel}</DetailChip>
              <DetailChip icon={<Clock size={16} strokeWidth={1.75} />}>{event.timeLabel}</DetailChip>
              <DetailChip icon={<Laptop size={16} strokeWidth={1.75} />}>
                {event.formatLabel} · {event.lengthLabel}
              </DetailChip>
            </ul>

            {open ? (
              <>
                <a
                  href="#register"
                  className="inline-flex items-center gap-3 bg-white text-magenta py-5 px-10 rounded-full font-bold uppercase tracking-widest text-base md:text-lg hover:bg-sun transition-colors shadow-2xl"
                >
                  Save My Free Seat <ArrowDown size={18} />
                </a>
                <p className="text-white/90 text-sm font-medium mt-4">
                  {event.priceLabel} · {event.audienceLabel}
                </p>
              </>
            ) : (
              <p className="inline-block bg-white/15 border border-white/30 backdrop-blur-md rounded-2xl px-6 py-4 text-white font-semibold">
                This workshop has wrapped. Thank you to everyone who joined us!
              </p>
            )}
          </div>

          <div className="md:col-span-5">
            <div className="relative w-full max-w-[360px] mx-auto">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-sun/70" aria-hidden="true" />
              <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-2xl">
                <img
                  src={event.expert.photo}
                  alt={event.expert.name}
                  className="w-full aspect-[9/10] object-cover"
                />
                <div className="px-6 py-5 text-center bg-gradient-to-b from-white to-pink/5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-pink mb-1">
                    Guest Expert
                  </p>
                  <p className="font-display text-3xl text-magenta leading-tight">{event.expert.name}</p>
                  <p className="text-gray-600 text-sm font-medium mt-1">{event.expert.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT + WHAT YOU'LL LEARN */}
      <section className="relative py-16 md:py-24 px-5 md:px-6 bg-white overflow-hidden">
        <Blob tone="sun" size="lg" className="-top-24 -right-24" opacity={25} slow />
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal direction="right" className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-3">
              Hosted by Jenn Davis &amp; the Energize Your Vibe community
            </p>
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight mb-5">
              {event.heading[0]} <i className="text-pink">{event.heading[1]}</i>
            </h2>
            <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-10">
              {event.description}
            </p>

            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-magenta mb-5">
              You’ll learn how to:
            </h3>
            <ul className="space-y-4">
              {event.learn.map((item) => (
                <li key={item} className="flex items-start gap-4 text-gray-700 text-base md:text-lg font-medium leading-relaxed">
                  <span className="mt-2 w-3 h-3 rounded-full bg-orange shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal direction="left" delay={120} className="lg:col-span-5 space-y-6">
            <div className="bento-card bg-soft-rose border-2 border-pink/20 p-8 md:p-10 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange/15 text-orange mb-4">
                <Gift size={26} strokeWidth={1.75} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-2">Plus</p>
              <p className="font-display text-4xl text-magenta leading-none mb-2">FREE</p>
              <p className="font-display text-2xl md:text-3xl text-gray-900 leading-tight mb-4">
                {event.bonus.title}
              </p>
              <p className="text-gray-600 font-medium leading-relaxed">{event.bonus.desc}</p>
            </div>

            <div className="bento-card bg-soft-dawn border-2 border-gold/20 p-8 md:p-10">
              <p className="font-display text-2xl text-gray-900 leading-tight mb-3">
                All women are <i className="text-pink">welcome.</i>
              </p>
              <p className="text-gray-600 font-medium leading-relaxed">
                You don’t need to be a member to join us. Bring a friend, your questions,
                and maybe a space in your home that has been driving you a little crazy.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERT QUOTE */}
      <section className="relative py-16 md:py-20 px-5 md:px-6 bg-soft-ember overflow-hidden">
        <Blob tone="pink" size="md" className="-bottom-16 -left-16" opacity={12} slow />
        <Reveal className="max-w-3xl mx-auto relative z-10 text-center">
          <p className="font-serif italic text-2xl md:text-4xl text-gray-900 leading-snug mb-6">
            “{event.expert.quote}”
          </p>
          <div className="w-16 h-0.5 bg-magenta mx-auto mb-4" aria-hidden="true" />
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta">
            {event.expert.name} · {event.expert.role}
          </p>
        </Reveal>
      </section>

      {/* REGISTRATION */}
      {open ? (
        <RegisterSection event={event} />
      ) : (
        <section className="relative py-16 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10 bento-card glass border-2 border-pink/20 p-8 sm:p-12 text-center shadow-xl">
            <h2 className="text-3xl md:text-4xl font-display text-gray-900 mb-4 leading-tight">
              Registration has <i className="text-pink">closed.</i>
            </h2>
            <p className="text-gray-600 font-medium mb-8">
              This workshop has already happened. See what’s coming up next.
            </p>
            <Link
              to="/events"
              className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
            >
              Upcoming Events <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      )}
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

function RegisterSection({ event }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState('');
  const [formRef, formInView] = useInView({ once: true });

  useEffect(() => {
    if (formInView) trackOnce('event_form_view', { event: event.slug });
  }, [formInView, event.slug]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function fail(message) {
    setStatus('error');
    setErrorMessage(message);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;

    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    if (!firstName) return fail('Please tell us your first name.');
    if (!lastName) return fail('Please tell us your last name.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return fail('Please enter a valid email address.');
    }
    if (phone && (phone.match(/\d/g) || []).length < 7) {
      return fail('Please enter a valid phone number, or leave it blank.');
    }

    setStatus('submitting');
    setErrorMessage('');
    try {
      const response = await fetch(EVENT_REGISTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: event.slug,
          firstName,
          lastName,
          email,
          phone,
          website: form.website,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      track('event_registration', { event: event.slug });
      navigate(`/events/${event.slug}/thank-you`, { state: { registered: true, firstName } });
    } catch (err) {
      fail(
        err instanceof Error && err.message && !/failed to fetch/i.test(err.message)
          ? err.message
          : `Something went wrong. Please try again, or email ${CONTACT_EMAIL} and we’ll save your seat.`
      );
    }
  }

  return (
    <section id="register" className="relative py-16 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden scroll-mt-24">
      <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={15} />
      <Blob tone="gold" size="md" className="bottom-10 -left-10" opacity={20} slow />

      <div className="max-w-xl mx-auto relative z-10" ref={formRef}>
        <div className="bento-card glass border-2 border-pink/20 p-7 sm:p-10 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-3">
              {event.priceLabel}
            </p>
            <h2 className="text-3xl md:text-4xl font-display text-gray-900 mb-3 leading-tight">
              Save your <i className="text-pink">seat.</i>
            </h2>
            <p className="text-gray-600 text-base font-medium">
              {event.dateLabel} · {event.timeLabel}
              <br />
              We’ll email your Zoom link as soon as you register.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                icon={<User size={18} strokeWidth={1.5} />}
                label="First name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                autoComplete="given-name"
                required
              />
              <Field
                icon={<User size={18} strokeWidth={1.5} />}
                label="Last name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                autoComplete="family-name"
                required
              />
            </div>
            <Field
              icon={<Mail size={18} strokeWidth={1.5} />}
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <Field
              icon={<Phone size={18} strokeWidth={1.5} />}
              label="Phone"
              hint="(optional)"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
            />

            {/* Honeypot - hidden from real visitors, tempting to bots. */}
            <div className="hidden" aria-hidden="true">
              <label>
                Website
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>
            </div>

            <div aria-live="polite">
              {status === 'error' && (
                <p className="text-sm font-semibold text-magenta bg-magenta/5 border border-magenta/20 rounded-2xl px-4 py-3 text-center">
                  {errorMessage}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="block w-full bg-pink text-white py-5 px-8 rounded-full font-bold uppercase tracking-widest text-base md:text-lg hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? 'Saving Your Seat…' : 'Register For Free'}
            </button>

            <p className="text-xs text-gray-500 text-center font-medium">
              You’ll get your workshop details plus occasional inspiration and updates
              from Energize Your Vibe. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ icon, label, hint, name, type = 'text', value, onChange, autoComplete, required }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-magenta mb-2">
        {label}
        {required && <span className="text-pink"> *</span>}
        {hint && <span className="normal-case tracking-normal font-medium text-gray-400"> {hint}</span>}
      </span>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink/70 pointer-events-none">
          {icon}
        </span>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-base text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-colors"
        />
      </div>
    </label>
  );
}
