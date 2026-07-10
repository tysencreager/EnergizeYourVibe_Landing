import { useEffect, useRef, useState } from 'react';
import { Mail, Sparkles, ArrowRight, CheckCircle2, MousePointerClick, Inbox } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const RESEND_COOLDOWN_SECONDS = 60;

export default function Login() {
  const location = useLocation();
  const redirectTo = location.state?.from || '/portal';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const cooldownTimer = useRef(null);

  useEffect(() => () => clearInterval(cooldownTimer.current), []);

  function startCooldown() {
    setCooldown(RESEND_COOLDOWN_SECONDS);
    clearInterval(cooldownTimer.current);
    cooldownTimer.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(cooldownTimer.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  }

  async function sendLink() {
    if (!isSupabaseConfigured) {
      setStatus('error');
      setErrorMessage(
        'Sign-in is not configured on this deployment: the Supabase environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) are missing from the build.'
      );
      return false;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Could not send the sign-in email. Try again in a moment.');
      return false;
    }
    startCooldown();
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMessage('');
    const ok = await sendLink();
    if (ok) setStatus('sent');
  }

  async function handleResend() {
    if (cooldown > 0) return;
    await sendLink();
  }

  return (
    <section className="relative min-h-[80vh] py-24 md:py-32 px-5 md:px-6 bg-soft-dawn overflow-hidden grain">
      <Sunburst
        className="absolute -right-40 -top-40 w-[520px] h-[520px] opacity-15"
        strokeColor="rgba(226,46,100,0.5)"
      />
      <Blob tone="pink" size="lg" className="-bottom-20 -left-20" opacity={20} slow />

      <div className="max-w-xl mx-auto relative z-10">
        <div className="bento-card glass border-2 border-pink/20 p-7 sm:p-10 md:p-14 shadow-2xl">
          {status === 'sent' ? (
            <div className="text-center py-2">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink/10 mb-6">
                <CheckCircle2 className="text-pink" size={36} strokeWidth={1.75} />
              </div>
              <h1 className="text-3xl md:text-4xl font-display text-gray-900 mb-4">
                Now check your <i className="text-pink">email.</i>
              </h1>
              <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-6 max-w-md mx-auto">
                We just sent an email to <strong>{email}</strong>.
              </p>

              <ol className="text-left max-w-md mx-auto space-y-3 mb-7">
                {[
                  <>Open your email inbox in a new tab or on your phone.</>,
                  <>
                    Find the email from <strong>Energize Your Vibe</strong>{' '}
                    (jenn@energizeyourvibe.com). The first time, it may land in your{' '}
                    <strong>Spam or Promotions</strong> folder — if so, mark it &ldquo;Not
                    spam.&rdquo;
                  </>,
                  <>
                    Tap the big <strong>&ldquo;Sign me in&rdquo;</strong> button inside. That&rsquo;s
                    it — no password, ever.
                  </>,
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-pink text-white text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm md:text-base text-gray-700 font-medium leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0}
                  className="inline-flex items-center gap-2 text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Mail size={14} strokeWidth={2} />
                  {cooldown > 0 ? `Didn't get it? Resend in ${cooldown}s` : "Didn't get it? Send it again"}
                </button>
                <p className="text-xs text-gray-500 font-medium">
                  Typed the wrong email?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setErrorMessage('');
                    }}
                    className="text-pink hover:text-magenta font-semibold underline underline-offset-2"
                  >
                    Start over
                  </button>
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center mb-7">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink/10 border border-pink/20 text-[10px] font-bold uppercase tracking-[0.3em] mb-5 text-magenta">
                  <Sparkles size={14} strokeWidth={1.75} />
                  Member sign in
                </div>
                <h1 className="text-3xl md:text-5xl font-display text-gray-900 mb-3 leading-tight">
                  Welcome back, <i className="text-pink">sister.</i>
                </h1>
                <p className="text-gray-600 text-base md:text-lg font-medium">
                  There&rsquo;s no password here — signing in is as easy as opening an email.
                </p>
              </div>

              {/* How it works, spelled out */}
              <div className="bg-pink/5 border border-pink/15 rounded-2xl p-5 mb-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-magenta mb-3 text-center">
                  How it works
                </p>
                <ol className="space-y-2.5">
                  {[
                    { icon: <Mail size={16} strokeWidth={2} />, text: 'Type your email below — the same one you used when you joined.' },
                    { icon: <Inbox size={16} strokeWidth={2} />, text: 'We instantly email you a personal sign-in button.' },
                    { icon: <MousePointerClick size={16} strokeWidth={2} />, text: 'Tap the button in that email — and you’re in. That’s the whole thing.' },
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 items-center text-sm text-gray-700 font-medium leading-snug">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-pink/10 text-magenta shrink-0">
                        {step.icon}
                      </span>
                      <span>
                        <strong className="text-magenta">{i + 1}.</strong> {step.text}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <label className="block">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-magenta mb-2">
                    Your email <span className="text-pink">*</span>
                  </span>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink/70 pointer-events-none">
                      <Mail size={18} strokeWidth={1.5} />
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      placeholder="you@example.com"
                      className="w-full bg-white border-2 border-gray-200 rounded-2xl pl-11 pr-4 py-3.5 text-base text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-colors"
                    />
                  </div>
                </label>

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
                  {status === 'submitting' ? 'Sending…' : 'Email me my sign-in button'}
                </button>

                <p className="text-xs text-gray-500 text-center font-medium">
                  Not a member yet?{' '}
                  <Link to="/membership" className="text-pink hover:text-magenta font-semibold inline-flex items-center gap-1">
                    Join the sisterhood <ArrowRight size={12} />
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
