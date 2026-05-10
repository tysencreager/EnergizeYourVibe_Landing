import { useState } from 'react';
import { Mail, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { supabase } from '../lib/supabase.js';

export default function Login() {
  const location = useLocation();
  const redirectTo = location.state?.from || '/portal';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | sent | error
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    setErrorMessage('');

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    });

    if (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Could not send the magic link. Try again in a moment.');
      return;
    }

    setStatus('sent');
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
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink/10 mb-6">
                <CheckCircle2 className="text-pink" size={36} strokeWidth={1.75} />
              </div>
              <h1 className="text-3xl md:text-4xl font-display text-gray-900 mb-4">
                Check your <i className="text-pink">inbox.</i>
              </h1>
              <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-2 max-w-md mx-auto">
                We just sent a magic link to <strong>{email}</strong>.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
                Click the link in that email to sign in. You can close this tab.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink/10 border border-pink/20 text-[10px] font-bold uppercase tracking-[0.3em] mb-5 text-magenta">
                  <Sparkles size={14} strokeWidth={1.75} />
                  Member sign in
                </div>
                <h1 className="text-3xl md:text-5xl font-display text-gray-900 mb-3 leading-tight">
                  Welcome back, <i className="text-pink">sister.</i>
                </h1>
                <p className="text-gray-600 text-base md:text-lg font-medium">
                  Enter your email and we’ll send you a one-tap sign-in link. No passwords to remember.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <label className="block">
                  <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-magenta mb-2">
                    Email <span className="text-pink">*</span>
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
                  {status === 'submitting' ? 'Sending…' : 'Send magic link'}
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
