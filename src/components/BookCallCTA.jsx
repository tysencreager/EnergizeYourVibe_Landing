import { useState } from 'react';
import { Calendar, CalendarHeart, Clock, Heart, Mail, Phone, User } from 'lucide-react';
import Blob from './Blob.jsx';
import Reveal from './Reveal.jsx';
import { BOOK_CALL_ENDPOINT, CONTACT_EMAIL } from '../data/links.js';
import { track } from '../lib/track.js';

// Homepage CTA (right under the hero) to request a free 30-minute connect
// call with Jenn. Submissions go to /api/book-call (see functions/api/),
// which drops the lead into MailerLite so Jenn can reach out.

const TIME_OPTIONS = [
  'Flexible — any time works',
  'Morning (9am – 12pm)',
  'Afternoon (12pm – 4pm)',
  'Evening (4pm – 8pm)',
];

export default function BookCallCTA() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    website: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const today = new Date().toISOString().slice(0, 10);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();

    if (!name) {
      setStatus('error');
      setErrorMessage('Please tell us your name.');
      return;
    }
    if (!phone || (phone.match(/\d/g) || []).length < 7) {
      setStatus('error');
      setErrorMessage('Please enter a phone number Jenn can reach you at.');
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
      const response = await fetch(BOOK_CALL_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          preferredDate: form.preferredDate,
          preferredTime: form.preferredTime,
          website: form.website,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Request failed');
      }
      track('book_call_request', { placement: 'homepage' });
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error && err.message && !/failed to fetch/i.test(err.message)
          ? err.message
          : `Something went wrong. Please try again, or email ${CONTACT_EMAIL} and Jenn will get right back to you.`
      );
    }
  }

  return (
    <section id="book-a-call" className="relative z-10 py-16 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden scroll-mt-24">
      <Blob tone="pink" size="lg" className="-top-24 -left-24" opacity={14} slow />
      <Blob tone="gold" size="md" className="-bottom-16 -right-16" opacity={18} />

      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal>
          <div className="bento-card glass border-2 border-pink/25 p-7 sm:p-10 md:p-14 shadow-xl">
            <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
              {/* Copy */}
              <div className="text-center md:text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange mb-3">
                  Free 30-minute connect call
                </p>
                <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight mb-4">
                  Curious? Let&rsquo;s <span className="font-serif italic text-pink font-semibold">chat.</span>
                </h2>
                <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
                  Book a free 30-minute call with Jenn — no pressure, no pitch. Share
                  where you&rsquo;re at, ask anything about the community, and see if
                  Energize Your Vibe feels like your kind of place.
                </p>
                <ul className="space-y-3 text-left max-w-md mx-auto md:mx-0">
                  {[
                    { icon: <Clock size={16} strokeWidth={2} />, text: '30 minutes, totally free' },
                    { icon: <Heart size={16} strokeWidth={2} />, text: 'A real conversation with Jenn herself' },
                    { icon: <CalendarHeart size={16} strokeWidth={2} />, text: 'You pick the time that works for you' },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-3 text-sm md:text-base text-gray-700 font-medium">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink/10 text-pink shrink-0">
                        {item.icon}
                      </span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form */}
              <div>
                {status === 'success' ? (
                  <div className="bg-white rounded-3xl border-2 border-gold/40 p-8 md:p-10 text-center shadow-lg" aria-live="polite">
                    <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink/10 text-pink mb-4">
                      <Heart size={26} strokeWidth={1.75} />
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display text-gray-900 mb-3">
                      You&rsquo;re on Jenn&rsquo;s list!
                    </h3>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      Thanks for reaching out{form.name.trim() ? `, ${form.name.trim().split(' ')[0]}` : ''}.
                      Jenn will personally reach out soon to set up your free 30-minute
                      call. Keep an eye on your phone and inbox!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <Field
                      icon={<User size={18} strokeWidth={1.5} />}
                      label="Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                      required
                    />
                    <Field
                      icon={<Phone size={18} strokeWidth={1.5} />}
                      label="Phone number"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      autoComplete="tel"
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

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field
                        icon={<Calendar size={18} strokeWidth={1.5} />}
                        label="Preferred date"
                        name="preferredDate"
                        type="date"
                        value={form.preferredDate}
                        onChange={handleChange}
                        min={today}
                      />
                      <label className="block">
                        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-magenta mb-2">
                          Preferred time
                        </span>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink/70 pointer-events-none">
                            <Clock size={18} strokeWidth={1.5} />
                          </span>
                          <select
                            name="preferredTime"
                            value={form.preferredTime}
                            onChange={handleChange}
                            className="w-full appearance-none bg-white border-2 border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-base text-gray-900 font-medium focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-colors"
                          >
                            <option value="">No preference</option>
                            {TIME_OPTIONS.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </label>
                    </div>

                    {/* Honeypot — hidden from real visitors, tempting to bots. */}
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
                      className="block w-full bg-pink text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm md:text-base hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? 'Sending…' : 'Book My Free Call'}
                    </button>

                    <p className="text-xs text-gray-500 text-center font-medium">
                      Jenn will personally reach out to schedule your call. No spam, ever.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ icon, label, name, type = 'text', value, onChange, autoComplete, required, min }) {
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
          min={min}
          className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-base text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-colors"
        />
      </div>
    </label>
  );
}
