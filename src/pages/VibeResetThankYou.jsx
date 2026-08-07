import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Download, Feather, Sparkles } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { track } from '../lib/track.js';
import {
  VIBE_RESET_PDF_URL,
  VIBE_RESET_EMAIL_DELIVERY_LIVE,
  CONTACT_EMAIL,
} from '../data/links.js';

export default function VibeResetThankYou() {
  const { state } = useLocation();
  const firstName = typeof state?.firstName === 'string' ? state.firstName : '';

  // Graceful handling while the final PDF asset is missing (dev/preview):
  // null = checking (button shows optimistically), false = confirmed missing.
  const [pdfAvailable, setPdfAvailable] = useState(null);

  usePageMeta({
    title: 'Your Vibe Reset Is Ready | Energize Your Vibe',
    description: 'Your free 10-Minute Vibe Reset from Energize Your Vibe is ready.',
    noindex: true,
  });

  useEffect(() => {
    let cancelled = false;
    fetch(VIBE_RESET_PDF_URL, { method: 'HEAD' })
      .then((res) => {
        // The SPA fallback serves index.html (an HTML 200) for unknown paths,
        // so also require a non-HTML content type.
        const type = res.headers.get('content-type') ?? '';
        if (!cancelled) setPdfAvailable(res.ok && !type.includes('text/html'));
      })
      .catch(() => {
        if (!cancelled) setPdfAvailable(null); // network hiccup — keep the button
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {/* DOWNLOAD HERO */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-5 md:px-6 bg-animated-warm overflow-hidden grain">
        <Sunburst
          className="absolute -right-32 -top-32 w-[520px] h-[520px] opacity-20"
          strokeColor="rgba(255,255,255,0.6)"
        />
        <Blob tone="magenta" size="lg" className="-bottom-20 -left-20" opacity={25} slow />

        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white">
            <Sparkles size={14} strokeWidth={1.75} className="text-sun" />
            Your reset is ready
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-5 md:mb-6 drop-shadow-md">
            Take ten minutes. <span className="font-serif italic text-sun">This time is yours{firstName ? `, ${firstName}` : ''}.</span>
          </h1>

          <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
            Your 10-Minute Vibe Reset is ready. Find a comfortable spot, grab a pen, and
            give yourself permission to tune everything else out for a few minutes.
          </p>

          {pdfAvailable === false ? (
            <p className="max-w-md mx-auto bg-white/15 border border-white/30 backdrop-blur-md rounded-2xl px-6 py-4 text-white font-medium text-sm md:text-base">
              We’re putting the final touches on your Vibe Reset. Email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-sun font-bold underline underline-offset-2">
                {CONTACT_EMAIL}
              </a>{' '}
              and we’ll send it to you directly.
            </p>
          ) : (
            <a
              href={VIBE_RESET_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('vibe_reset_download')}
              className="inline-flex items-center gap-3 bg-white text-magenta py-5 px-10 rounded-full font-bold uppercase tracking-widest text-base md:text-lg hover:bg-sun transition-colors shadow-2xl"
            >
              <Download size={20} strokeWidth={1.75} /> Open My Vibe Reset
            </a>
          )}

          {VIBE_RESET_EMAIL_DELIVERY_LIVE && pdfAvailable !== false && (
            <p className="text-white/90 text-sm md:text-base font-medium mt-6">
              We’ve also sent a copy to your inbox so you can come back to it anytime.
            </p>
          )}
        </div>
      </section>

      {/* MEMBERSHIP BRIDGE */}
      <section className="relative py-16 md:py-24 px-5 md:px-6 bg-soft-rose overflow-hidden">
        <Sunburst
          className="absolute -left-40 -bottom-40 w-[520px] h-[520px] opacity-10"
          strokeColor="rgba(183,21,86,0.6)"
        />
        <Blob tone="gold" size="md" className="top-10 -right-16" opacity={18} slow />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="bento-card glass border-2 border-pink/20 p-8 sm:p-10 md:p-14 text-center shadow-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-4">
              Ready to go deeper?
            </p>
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-5 leading-tight">
              What if you knew <i className="text-pink">where to focus next?</i>
            </h2>
            <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
              The 10-Minute Vibe Reset helps you check in with what you need right now.
              Inside Energize Your Vibe, members can take the comprehensive Pillar
              Assessment to uncover where they’re thriving, where they may need more
              support, and which resources inside the member library can help them go
              deeper.
            </p>
            <Link
              to="/membership"
              onClick={() => track('vibe_reset_membership_click')}
              className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-9 rounded-full font-bold uppercase tracking-widest text-sm md:text-base hover:bg-pink transition-colors shadow-lg"
            >
              Explore The Community <ArrowRight size={18} />
            </Link>
            <p className="flex items-center justify-center gap-2 text-xs text-gray-500 font-medium mt-6">
              <Feather size={13} strokeWidth={1.75} className="text-gold" />
              The Pillar Assessment lives inside the member experience — no pressure, it’ll be there when you’re ready.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
