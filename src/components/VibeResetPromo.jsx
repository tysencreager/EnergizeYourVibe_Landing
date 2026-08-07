import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Feather, Sparkles } from 'lucide-react';
import Blob from './Blob.jsx';
import Reveal from './Reveal.jsx';
import { track } from '../lib/track.js';

// Homepage promo for the free 10-Minute Vibe Reset lead magnet (/vibe-reset).
export default function VibeResetPromo() {
  return (
    <section id="vibe-reset" className="relative z-10 py-16 md:py-24 px-5 md:px-6 bg-white overflow-hidden">
      <Blob tone="gold" size="lg" className="-top-24 -right-24" opacity={18} slow />
      <Blob tone="pink" size="md" className="-bottom-16 -left-16" opacity={10} />

      <div className="max-w-5xl mx-auto relative z-10">
        <Reveal>
          <div className="bento-card glass border-2 border-gold/30 p-8 sm:p-10 md:p-14 shadow-xl">
            <div className="grid md:grid-cols-5 gap-8 md:gap-10 items-center">
              {/* Copy */}
              <div className="md:col-span-3 text-center md:text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange mb-3">
                  Free 10-minute reset
                </p>
                <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight mb-4">
                  Feeling off? Give yourself <span className="font-serif italic text-pink font-semibold">10 minutes.</span>
                </h2>
                <p className="text-gray-600 text-base md:text-lg font-medium leading-relaxed mb-7 max-w-xl mx-auto md:mx-0">
                  You don’t need to overhaul your life to shift your energy. The 10-Minute
                  Vibe Reset is a simple guided exercise to help you clear some of the
                  noise, reconnect with yourself, and intentionally choose how you want to
                  move through the rest of your day.
                </p>
                <Link
                  to="/vibe-reset"
                  onClick={() => track('vibe_reset_cta_click', { placement: 'homepage' })}
                  className="inline-flex items-center gap-3 bg-pink text-white py-4 px-9 rounded-full font-bold uppercase tracking-widest text-sm md:text-base hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)]"
                >
                  Get My Free Vibe Reset <ArrowRight size={18} />
                </Link>
                <p className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-xs md:text-sm text-gray-500 font-medium mt-5">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} strokeWidth={1.75} className="text-gold" /> 10 minutes
                  </span>
                  <span className="text-gray-300" aria-hidden="true">·</span>
                  <span>No complicated routine</span>
                  <span className="text-gray-300" aria-hidden="true">·</span>
                  <span>Use it anytime you need a reset</span>
                </p>
              </div>

              {/* Worksheet motif */}
              <div className="md:col-span-2 flex justify-center">
                <div className="relative w-full max-w-[260px]">
                  <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-sun/70" aria-hidden="true" />
                  <div className="relative rounded-3xl bg-gradient-to-br from-magenta via-pink to-orange p-7 text-white shadow-2xl">
                    <Sparkles size={26} strokeWidth={1.5} className="text-sun mb-4" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sun mb-2">
                      Free guided reset
                    </p>
                    <p className="font-display text-2xl leading-snug mb-1">
                      The 10-Minute Vibe Reset
                    </p>
                    <p className="font-serif italic text-sun/95 text-sm leading-snug mb-5">
                      Clear the noise. Come back to yourself. Choose how you want to feel.
                    </p>
                    <div className="space-y-2.5" aria-hidden="true">
                      {['Check in', 'Clear the noise', 'Come back to you', 'Choose your vibe'].map((step, i) => (
                        <div key={i} className="flex items-center gap-2.5 bg-white/10 rounded-full px-3.5 py-2">
                          <Feather size={12} strokeWidth={2} className="text-sun shrink-0" />
                          <span className="text-[11px] font-semibold tracking-wide uppercase">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
