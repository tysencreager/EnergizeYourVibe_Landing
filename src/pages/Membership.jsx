import { useState } from 'react';
import { ArrowRight, CheckCircle2, Mail, Phone, User, Sparkles } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { CHECKOUT_URL, WAITLIST_FORM_ENDPOINT } from '../data/links.js';

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

export default function Membership() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMessage('');
    try {
      const response = await fetch(WAITLIST_FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error('Form submission failed');
      }
      setStatus('success');
      setForm(initialForm);
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        'Something went wrong. Please try again or email jenn@energizeyourvibe.com.'
      );
    }
  }

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
            Launching July 1, 2026
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-5 md:mb-6 drop-shadow-md">
            Membership signup opens{' '}
            <span className="font-serif italic text-sun">June 18, 2026.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed">
            Doors officially open July 1, 2026. Drop your details below and we’ll send you the link the moment signup goes live on June 18, plus the inside scoop on the first 50 founding member rate.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
        <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={15} />
        <Blob tone="gold" size="md" className="bottom-10 -left-10" opacity={20} slow />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="bento-card glass border-2 border-pink/20 p-7 sm:p-10 md:p-14 shadow-2xl">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink/10 mb-6">
                  <CheckCircle2 className="text-pink" size={36} strokeWidth={1.75} />
                </div>
                <h2 className="text-3xl md:text-4xl font-display text-gray-900 mb-4">
                  You’re on the <i className="text-pink">list, sister.</i>
                </h2>
                <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-md mx-auto">
                  Welcome to the inner circle. Watch your inbox, we’ll be in touch soon with everything you need to know.
                </p>
                <a
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
                >
                  Reserve My Spot Now <ArrowRight size={18} />
                </a>
              </div>
            ) : (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-3 leading-tight">
                    Stay in the <i className="text-pink">loop.</i>
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg font-medium">
                    Add yourself to the waitlist. No spam, just the good stuff.
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
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    required
                  />

                  {status === 'error' && (
                    <p className="text-sm font-semibold text-magenta bg-magenta/5 border border-magenta/20 rounded-2xl px-4 py-3 text-center">
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="block w-full bg-pink text-white py-5 px-8 rounded-full font-bold uppercase tracking-widest text-base md:text-lg hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Sending…' : 'Keep Me Posted'}
                  </button>

                  <p className="text-xs text-gray-500 text-center font-medium">
                    By joining the waitlist, you agree to receive occasional updates from Energize Your Vibe. Unsubscribe anytime.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* READY NOW CTA */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-rose overflow-hidden">
        <Sunburst
          className="absolute -left-40 -bottom-40 w-[520px] h-[520px] opacity-10"
          strokeColor="rgba(183,21,86,0.6)"
        />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-4">
            Already a yes?
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-5 leading-tight">
            Skip the wait. <i className="text-pink">Reserve your spot now.</i>
          </h2>
          <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
            The first 50 members lock in <strong>$88/mo for life</strong>. Beta Vibe Pricing: 2 months for the price of 1, with a 90-day commitment.
          </p>
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm md:text-base hover:bg-pink transition-colors shadow-lg"
          >
            Reserve My Spot <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </>
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
