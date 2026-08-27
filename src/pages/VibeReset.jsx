import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, Mail, Sparkles, User, Feather, CloudOff, Compass, Heart, Sun } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import Reveal from '../components/Reveal.jsx';
import { useInView } from '../hooks/useInView.js';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { track, trackOnce } from '../lib/track.js';
import { VIBE_RESET_SIGNUP_ENDPOINT, CONTACT_EMAIL } from '../data/links.js';

const benefits = [
  {
    icon: <Heart />,
    title: 'Check in',
    desc: 'Pause long enough to notice how you’re actually feeling.',
    accent: 'text-pink bg-pink/10',
  },
  {
    icon: <CloudOff />,
    title: 'Clear the noise',
    desc: 'Identify what’s taking up more of your energy than it deserves.',
    accent: 'text-orange bg-orange/10',
  },
  {
    icon: <Compass />,
    title: 'Come back to you',
    desc: 'Reconnect with what you need instead of everything demanding your attention.',
    accent: 'text-magenta bg-magenta/10',
  },
  {
    icon: <Sun />,
    title: 'Choose your vibe',
    desc: 'Decide how you want to feel and choose one small action that supports it.',
    accent: 'text-[#8a5a00] bg-gold/20',
  },
];

export default function VibeReset() {
  usePageMeta({
    title: 'Free 10-Minute Vibe Reset | Energize Your Vibe',
    description:
      'Feeling off? Take ten intentional minutes to clear the noise, reconnect with yourself, and choose how you want to feel with this free Vibe Reset from Energize Your Vibe.',
    canonical: 'https://www.energizeyourvibe.com/vibe-reset',
  });

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-48 md:pb-20 px-5 md:px-6 bg-animated-warm overflow-hidden grain">
        <Sunburst
          className="absolute -right-32 -top-32 w-[520px] h-[520px] opacity-20"
          strokeColor="rgba(255,255,255,0.6)"
        />
        <Blob tone="magenta" size="lg" className="-bottom-20 -left-20" opacity={25} slow />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white">
            <Sparkles size={14} strokeWidth={1.75} className="text-sun" />
            A free reset from Energize Your Vibe
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-5 md:mb-6 drop-shadow-md">
            You don’t need to fix your <span className="font-serif italic text-sun">whole life today.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            Sometimes you just need ten intentional minutes to clear the noise, check in
            with yourself, and decide how you want to feel moving forward.
          </p>

          <a
            href="#get-the-reset"
            className="inline-flex items-center gap-3 bg-white text-magenta py-5 px-10 rounded-full font-bold uppercase tracking-widest text-base md:text-lg hover:bg-sun transition-colors shadow-2xl"
          >
            Get My Free Vibe Reset <ArrowDown size={18} />
          </a>
        </div>
      </section>

      {/* INTRO + WORKBOOK VISUAL */}
      <section className="relative py-16 md:py-24 px-5 md:px-6 bg-white overflow-hidden">
        <Blob tone="sun" size="lg" className="-top-24 -right-24" opacity={25} slow />
        <div className="max-w-5xl mx-auto relative z-10 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <Reveal direction="right">
            <div className="text-center md:text-left">
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-3">
                Introducing
              </p>
              <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight mb-4">
                The 10-Minute <i className="text-pink">Vibe Reset.</i>
              </h2>
              <p className="font-serif italic text-magenta text-lg md:text-xl mb-4">
                Clear the noise. Come back to yourself. Choose how you want to feel.
              </p>
              <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed">
                A simple guided reset you can return to whenever life feels a little too
                loud. Print it, screenshot it, or keep it on your phone. It works
                anywhere you can find ten quiet minutes and a pen.
              </p>
            </div>
          </Reveal>

          {/*
            Workbook cover visual. When final designed cover art exists, drop it
            in /public/assets (e.g. vibe-reset-cover.png) and swap this styled
            card for an <img>.
          */}
          <Reveal direction="left" delay={120}>
            <div className="flex justify-center">
              <div className="relative w-full max-w-[300px]">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-sun/70" aria-hidden="true" />
                <div className="relative rounded-3xl bg-gradient-to-br from-magenta via-pink to-orange p-8 text-white shadow-2xl grain overflow-hidden">
                  <Sunburst
                    className="absolute -right-16 -top-16 w-[220px] h-[220px] opacity-25"
                    strokeColor="rgba(253,224,139,0.9)"
                  />
                  <div className="relative">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sun mb-6">
                      Energize Your Vibe
                    </p>
                    <p className="font-display text-4xl leading-[1.1] mb-3">
                      The 10-Minute Vibe Reset
                    </p>
                    <p className="font-serif italic text-sun/95 text-base leading-snug mb-8">
                      Clear the noise. Come back to yourself. Choose how you want to feel.
                    </p>
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/85">
                      <Feather size={14} strokeWidth={1.75} className="text-sun" />
                      Free guided worksheet
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="relative py-16 md:py-24 px-5 md:px-6 bg-soft-ember overflow-hidden">
        <Blob tone="pink" size="md" className="-bottom-16 -left-16" opacity={12} slow />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight">
              In 10 minutes, <i className="text-pink">you’ll…</i>
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 80}>
                <div className="bento-card bg-white border-2 border-gray-100 p-7 md:p-8 h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${b.accent}`}>
                    {b.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-display text-gray-900 mb-2 uppercase tracking-wide">
                    {b.title}
                  </h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{b.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPT-IN FORM */}
      <OptInSection />
    </>
  );
}

function OptInSection() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', email: '', website: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState('');
  const [formRef, formInView] = useInView({ once: true });

  useEffect(() => {
    if (formInView) trackOnce('vibe_reset_form_view');
  }, [formInView]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;

    const firstName = form.firstName.trim();
    const email = form.email.trim();
    if (!firstName) {
      setStatus('error');
      setErrorMessage('Please tell us your first name.');
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    try {
      const response = await fetch(VIBE_RESET_SIGNUP_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, website: form.website }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Sign-up failed');
      }
      track('vibe_reset_signup');
      navigate('/vibe-reset/thank-you', { state: { signedUp: true, firstName } });
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error && err.message && !/failed to fetch/i.test(err.message)
          ? err.message
          : `Something went wrong. Please try again, or email ${CONTACT_EMAIL} and we’ll send it to you directly.`
      );
    }
  }

  return (
    <section id="get-the-reset" className="relative py-16 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden scroll-mt-24">
      <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={15} />
      <Blob tone="gold" size="md" className="bottom-10 -left-10" opacity={20} slow />

      <div className="max-w-xl mx-auto relative z-10" ref={formRef}>
        <div className="bento-card glass border-2 border-pink/20 p-7 sm:p-10 md:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-3">
              Free instant access
            </p>
            <h2 className="text-3xl md:text-4xl font-display text-gray-900 mb-3 leading-tight">
              Get your <i className="text-pink">Vibe Reset.</i>
            </h2>
            <p className="text-gray-600 text-base font-medium">
              Pop in your name and email and we’ll take you straight to it.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
              icon={<Mail size={18} strokeWidth={1.5} />}
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
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
              {status === 'submitting' ? 'Sending…' : 'Send Me The Reset'}
            </button>

            <p className="text-xs text-gray-500 text-center font-medium">
              Get the free Vibe Reset plus occasional inspiration and updates from
              Energize Your Vibe. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ icon, label, name, type = 'text', value, onChange, autoComplete, required }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-magenta mb-2">
        {label}
        {required && <span className="text-pink"> *</span>}
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
