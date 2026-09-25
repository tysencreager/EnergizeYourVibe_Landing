import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  Armchair,
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Clock,
  CreditCard,
  Gift,
  Heart,
  Laptop,
  Mail,
  MapPin,
  Navigation,
  NotebookPen,
  Phone,
  Shirt,
  Sparkles,
  Ticket,
  User,
  Utensils,
} from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import Reveal from '../components/Reveal.jsx';
import { useInView } from '../hooks/useInView.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { track, trackOnce } from '../lib/track.js';
import {
  getEvent,
  hasNonMemberPrice,
  isInPerson,
  isRegistrationOpen,
  whereLabel,
} from '../data/events.js';
import { EVENT_REGISTER_ENDPOINT, CONTACT_EMAIL } from '../data/links.js';

// Icons for the "What to bring" list (keys come from src/data/events.js).
const bringIcons = {
  lunch: Utensils,
  journal: NotebookPen,
  chair: Armchair,
  layers: Shirt,
  you: Heart,
};

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
  const inPerson = isInPerson(event);
  const priced = hasNonMemberPrice(event);
  const paragraphs = Array.isArray(event.description) ? event.description : [event.description];
  const quoteExpert = event.experts.find((expert) => expert.quote);
  const bioExperts = event.experts.filter((expert) => expert.bio);
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
              {inPerson ? (
                <DetailChip icon={<MapPin size={16} strokeWidth={1.75} />}>{whereLabel(event)}</DetailChip>
              ) : (
                <DetailChip icon={<Laptop size={16} strokeWidth={1.75} />}>
                  {event.formatLabel} · {event.lengthLabel}
                </DetailChip>
              )}
            </ul>

            {open ? (
              <>
                <a
                  href="#register"
                  className="inline-flex items-center gap-3 bg-white text-magenta py-5 px-10 rounded-full font-bold uppercase tracking-widest text-base md:text-lg hover:bg-sun transition-colors shadow-2xl"
                >
                  {priced ? 'Save My Seat' : 'Save My Free Seat'} <ArrowDown size={18} />
                </a>
                <p className="text-white/90 text-sm font-medium mt-4">
                  {event.priceLabel} · {event.audienceLabel}
                </p>
              </>
            ) : (
              <p className="inline-block bg-white/15 border border-white/30 backdrop-blur-md rounded-2xl px-6 py-4 text-white font-semibold">
                This {event.kindLabel} has wrapped. Thank you to everyone who joined us!
              </p>
            )}
          </div>

          <div className="md:col-span-5">
            {event.experts.length > 1 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-[460px] mx-auto">
                {event.experts.map((expert) => (
                  <ExpertCard key={expert.name} expert={expert} compact />
                ))}
              </div>
            ) : (
              <div className="w-full max-w-[360px] mx-auto">
                <ExpertCard expert={event.experts[0]} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT + WHAT YOU'LL LEARN / WHAT TO BRING */}
      <section className="relative py-16 md:py-24 px-5 md:px-6 bg-white overflow-hidden">
        <Blob tone="sun" size="lg" className="-top-24 -right-24" opacity={25} slow />
        <div className="max-w-6xl mx-auto relative z-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <Reveal direction="right" className="lg:col-span-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-3">
              Hosted by Jenn Davis, Founder &amp; the Energize Your Vibe community
            </p>
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight mb-5">
              {event.heading[0]} <i className="text-pink">{event.heading[1]}</i>
            </h2>
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-5 last:mb-10"
              >
                {paragraph}
              </p>
            ))}

            {event.learn && (
              <>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-magenta mt-10 mb-5">
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
              </>
            )}

            {event.bring && (
              <>
                <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-magenta mt-10 mb-5">
                  What to bring:
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {event.bring.map((item) => {
                    const Icon = bringIcons[item.icon] ?? Heart;
                    return (
                      <li key={item.title} className="flex items-start gap-4 bg-soft-dawn border border-gold/20 rounded-2xl p-4">
                        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-orange/15 text-orange shrink-0">
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <span>
                          <span className="block font-bold text-gray-900">{item.title}</span>
                          <span className="block text-gray-600 text-sm font-medium leading-relaxed">{item.desc}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {event.bringNote && (
                  <p className="text-sm text-gray-500 font-medium mt-4">{event.bringNote}</p>
                )}
              </>
            )}
          </Reveal>

          <Reveal direction="left" delay={120} className="lg:col-span-5 space-y-6">
            {event.bonus && (
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
            )}

            {priced && (
              <div className="bento-card bg-soft-rose border-2 border-pink/20 p-8 md:p-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange/15 text-orange mb-4">
                  <Ticket size={26} strokeWidth={1.75} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-4">Your spot</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/80 rounded-2xl px-3 py-4">
                    <p className="font-display text-3xl text-magenta leading-none mb-1">{event.pricing.memberLabel}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600">Members</p>
                  </div>
                  <div className="bg-white/80 rounded-2xl px-3 py-4">
                    <p className="font-display text-3xl text-magenta leading-none mb-1">{event.pricing.nonMemberPrice}</p>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-600">Non-members</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium leading-relaxed inline-flex items-start gap-2 text-left">
                  <CreditCard size={16} strokeWidth={1.75} className="text-orange shrink-0 mt-0.5" />
                  Not a member? Pay by card or Venmo right after you register.
                </p>
              </div>
            )}

            <div className="bento-card bg-soft-dawn border-2 border-gold/20 p-8 md:p-10">
              <p className="font-display text-2xl text-gray-900 leading-tight mb-3">
                All women are <i className="text-pink">welcome.</i>
              </p>
              <p className="text-gray-600 font-medium leading-relaxed">{event.welcome}</p>
            </div>

            {inPerson && event.location && (
              <div className="bento-card bg-white border-2 border-pink/20 p-8 md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-2">Getting there</p>
                <p className="font-display text-2xl text-gray-900 leading-tight mb-1">{event.location.name}</p>
                <p className="text-gray-700 font-semibold mb-4">{event.location.detail}</p>
                <p className="text-gray-600 text-sm font-medium leading-relaxed mb-5">
                  {event.location.directions}
                </p>
                {event.location.mapsUrl && (
                  <a
                    href={event.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors"
                  >
                    <Navigation size={14} strokeWidth={2} /> Open in Google Maps
                  </a>
                )}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* EXPERT QUOTE or MEET THE EXPERTS */}
      {quoteExpert ? (
        <section className="relative py-16 md:py-20 px-5 md:px-6 bg-soft-ember overflow-hidden">
          <Blob tone="pink" size="md" className="-bottom-16 -left-16" opacity={12} slow />
          <Reveal className="max-w-3xl mx-auto relative z-10 text-center">
            <p className="font-serif italic text-2xl md:text-4xl text-gray-900 leading-snug mb-6">
              “{quoteExpert.quote}”
            </p>
            <div className="w-16 h-0.5 bg-magenta mx-auto mb-4" aria-hidden="true" />
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta">
              {quoteExpert.name} · {quoteExpert.role}
            </p>
          </Reveal>
        </section>
      ) : (
        bioExperts.length > 0 && (
          <section className="relative py-16 md:py-20 px-5 md:px-6 bg-soft-ember overflow-hidden">
            <Blob tone="pink" size="md" className="-bottom-16 -left-16" opacity={12} slow />
            <div className="max-w-4xl mx-auto relative z-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-8 md:mb-10 text-center">
                Meet our guest {bioExperts.length > 1 ? 'experts' : 'expert'}
              </p>
              <div className="space-y-12 md:space-y-16">
                {bioExperts.map((expert, i) => (
                  <Reveal
                    key={expert.name}
                    delay={i * 120}
                    className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
                  >
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-full bg-sun/80" aria-hidden="true" />
                      <img
                        src={expert.photo}
                        alt={expert.name}
                        className="relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover object-top border-4 border-white shadow-xl"
                      />
                    </div>
                    <div className="text-center md:text-left">
                      <p className="font-display text-3xl md:text-4xl text-gray-900 leading-tight mb-1">{expert.name}</p>
                      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-5">{expert.role}</p>
                      {expert.bio.map((paragraph) => (
                        <p key={paragraph} className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-3 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )
      )}

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
              This {event.kindLabel} has already happened. See what’s coming up next.
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

// Hero card for a guest expert. `compact` is used when two or more experts
// share the column.
function ExpertCard({ expert, compact = false }) {
  return (
    <div className="relative">
      <div
        className={`absolute inset-0 bg-sun/70 ${
          compact ? 'translate-x-3 translate-y-3 rounded-[1.5rem]' : 'translate-x-4 translate-y-4 rounded-[2rem]'
        }`}
        aria-hidden="true"
      />
      <div className={`relative overflow-hidden bg-white shadow-2xl ${compact ? 'rounded-[1.5rem]' : 'rounded-[2rem]'}`}>
        <img
          src={expert.photo}
          alt={expert.name}
          className={`w-full object-cover object-top ${compact ? 'aspect-[4/5]' : 'aspect-[9/10]'}`}
        />
        <div className={`text-center bg-gradient-to-b from-white to-pink/5 ${compact ? 'px-3 py-4' : 'px-6 py-5'}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-pink mb-1">Guest Expert</p>
          <p className={`font-display text-magenta leading-tight ${compact ? 'text-xl sm:text-2xl' : 'text-3xl'}`}>
            {expert.name}
          </p>
          <p className={`text-gray-600 font-medium mt-1 ${compact ? 'text-xs sm:text-sm' : 'text-sm'}`}>{expert.role}</p>
        </div>
      </div>
    </div>
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
  const priced = hasNonMemberPrice(event);
  const inPerson = isInPerson(event);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    membership: '',
    website: '',
  });
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
    const membership = form.membership;
    if (!firstName) return fail('Please tell us your first name.');
    if (!lastName) return fail('Please tell us your last name.');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return fail('Please enter a valid email address.');
    }
    if (event.phoneRequired && !phone) {
      return fail('Please enter a phone number so we can text you updates.');
    }
    if (phone && (phone.match(/\d/g) || []).length < 7) {
      return fail(
        event.phoneRequired
          ? 'Please enter a valid phone number.'
          : 'Please enter a valid phone number, or leave it blank.'
      );
    }
    if (priced && !membership) {
      return fail('Please let us know whether you’re an Energize Your Vibe member.');
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
          ...(priced ? { membership } : {}),
          website: form.website,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      track('event_registration', { event: event.slug, ...(priced ? { membership } : {}) });
      navigate(`/events/${event.slug}/thank-you`, {
        state: { registered: true, firstName, email, membership },
      });
    } catch (err) {
      fail(
        err instanceof Error && err.message && !/failed to fetch/i.test(err.message)
          ? err.message
          : `Something went wrong. Please try again, or email ${CONTACT_EMAIL} and we’ll save your seat.`
      );
    }
  }

  const submitLabel = priced ? 'Save My Seat' : 'Register For Free';

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
              {inPerson
                ? 'We’ll email your confirmation with directions and what to bring.'
                : 'We’ll email your Zoom link as soon as you register.'}
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
              hint={event.phoneRequired ? '(for text updates)' : '(optional)'}
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              autoComplete="tel"
              required={Boolean(event.phoneRequired)}
            />

            {priced && (
              <fieldset>
                <legend className="block text-[11px] font-bold uppercase tracking-[0.2em] text-magenta mb-2">
                  Are you an Energize Your Vibe member?<span className="text-pink"> *</span>
                </legend>
                <div className="grid sm:grid-cols-2 gap-3">
                  <MembershipOption
                    name="membership"
                    value="member"
                    checked={form.membership === 'member'}
                    onChange={handleChange}
                    title="Yes, I’m a member"
                    detail={`${event.pricing.memberLabel} · you’re all set`}
                  />
                  <MembershipOption
                    name="membership"
                    value="non-member"
                    checked={form.membership === 'non-member'}
                    onChange={handleChange}
                    title="Not yet"
                    detail={`${event.pricing.nonMemberPrice} · pay by card or Venmo after you register`}
                  />
                </div>
              </fieldset>
            )}

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
              {status === 'submitting' ? 'Saving Your Seat…' : submitLabel}
            </button>

            <p className="text-xs text-gray-500 text-center font-medium">
              You’ll get your {event.kindLabel} details plus occasional inspiration and updates
              from Energize Your Vibe. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function MembershipOption({ name, value, checked, onChange, title, detail }) {
  return (
    <label
      className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-3.5 cursor-pointer transition-colors ${
        checked ? 'border-pink bg-pink/5' : 'border-gray-200 bg-white hover:border-pink/40'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="mt-1 accent-pink"
      />
      <span>
        <span className="block font-bold text-gray-900">{title}</span>
        <span className="block text-xs text-gray-500 font-medium leading-snug mt-0.5">{detail}</span>
      </span>
    </label>
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
