import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, ArrowRight, Calendar } from 'lucide-react';
import Sunburst from './Sunburst.jsx';

const STORAGE_KEY = 'eyv-launch-popup-dismissed-v1';
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
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl border border-white/40 animate-[fade-up_450ms_cubic-bezier(0.16,1,0.3,1)_both]">
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

        {/* Content */}
        <div className="relative z-10 p-7 sm:p-10 text-white text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-5">
            <Calendar size={12} strokeWidth={1.75} className="text-sun" />
            Launching June 15, 2026
          </div>

          <h2
            id="launch-popup-title"
            className="font-display text-3xl sm:text-4xl leading-[1.05] mb-4"
          >
            Step into the sisterhood, <span className="font-serif italic text-sun">at the Beta Vibe rate.</span>
          </h2>

          <p className="text-white/95 text-sm sm:text-base font-medium leading-relaxed mb-6">
            Energize Your Vibe officially launches <span className="font-bold text-sun">June 15, 2026</span>, with membership signup opening <span className="font-bold text-sun">June 8, 2026</span>. The first 50 members lock in the introductory <span className="font-bold text-sun">$88/mo</span> Beta Vibe rate <span className="font-bold text-sun">for life</span>. Once those spots are gone, pricing goes up.
          </p>

          <div className="bg-white/10 border border-white/25 rounded-2xl px-5 py-4 mb-7 backdrop-blur-sm">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] text-sun mb-1">
              Beta Vibe Pricing
            </p>
            <p className="text-sm sm:text-base font-medium">
              Sign up between June 8 and June 15, 2026 and get 2 months for the price of 1. Your next payment won’t begin until August 15, 2026. Membership includes a 90-day commitment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Link
              to="/membership"
              onClick={handleCta}
              className="w-full sm:w-auto bg-sun text-magenta font-bold uppercase tracking-widest text-xs sm:text-sm py-3.5 px-7 rounded-full hover:bg-white transition-colors shadow-lg inline-flex items-center justify-center gap-2"
            >
              Reserve My Spot <ArrowRight size={16} strokeWidth={1.75} />
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
