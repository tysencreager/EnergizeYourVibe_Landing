import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Calendar, Check } from 'lucide-react';
import Sunburst from './Sunburst.jsx';

const STORAGE_KEY = 'eyv-launch-popup-dismissed-v2';

const foundingBenefits = [
  'Lock in the $88 monthly Founding Member rate for life (first 50 members only)',
  'Your one-time $45 Setup Fee is waived (through July 31)',
  'Start with the 7 Pillar Assessment and your personalized growth roadmap',
  'Invitations to local meetups, experiences, and community events',
  'Access to the member library, daily Lives for Vibes & inspiring texts, monthly calls',
  'Energize Your Vibe Hotline, podcast, playlists, meditations, affirmations & vibe check-ins',
  'Private FB Community & personalized welcome gift',
];
const OPEN_DELAY_MS = 900;

export default function LaunchPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (window.sessionStorage.getItem(STORAGE_KEY) === '1') return;
    } catch {
      /* sessionStorage may be unavailable; just show once per load */
    }
    const id = window.setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

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

  function handleCta(e) {
    close();
    // allow the anchor click to continue so smooth scroll fires
    // eslint-disable-next-line no-unused-expressions
    e;
  }

  if (!open) return null;

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-5">
            <Calendar size={12} strokeWidth={1.75} className="text-sun" />
            Sign-ups launch July 17 · Community begins August 1
          </div>

          <h2
            id="launch-popup-title"
            className="font-display text-3xl sm:text-4xl leading-[1.05] mb-3"
          >
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
              Join before August 1 for Founding Member benefits
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
            Community begins August 1 · Membership includes a 90-day commitment
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              to="/membership"
              onClick={handleCta}
              className="w-full sm:w-auto bg-sun text-magenta font-bold uppercase tracking-widest text-xs sm:text-sm py-3.5 px-7 rounded-full hover:bg-white transition-colors shadow-lg inline-flex items-center justify-center gap-2"
            >
              Become a Founding Member <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
            <button
              type="button"
              onClick={close}
              className="text-white/80 hover:text-white text-xs sm:text-sm font-semibold underline-offset-4 hover:underline py-2"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
