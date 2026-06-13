import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Blob from './Blob.jsx';
import Sunburst from './Sunburst.jsx';

const perks = [
  {
    bold: 'Lifetime pricing:',
    text: 'First 50 members lock in $88/mo for life.',
  },
  {
    bold: 'Full access:',
    text: 'Library, daily lives, podcasts, meditations, method & community, weekly texts, 7 Pillar growth calls.',
  },
  {
    bold: 'A cheerleader in your pocket:',
    text: 'Opt-in inspiration tailored to you, we gotchu, girl!',
  },
  {
    bold: 'Welcome gift:',
    text: 'A personalized gift mailed directly to you.',
  },
  {
    bold: 'Events included:',
    text: 'Monthly deep-dive call with Jenn, 7 Pillar growth calls with expert coaches, daily Lives for Vibes, weekly uplifting texts, soundbaths, launch party & select gatherings.',
  },
  {
    bold: 'Retreat discount:',
    text: 'Extremely discounted rate for the Southern Utah fall retreat. This is a thank you to the community and will never be offered this low again. The retreat is strictly for play, fun, laughter, connection & relaxation.',
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 py-20 md:py-28 bg-animated-warm overflow-hidden grain">
      <Sunburst
        className="absolute -right-48 -top-48 w-[640px] h-[640px] opacity-20"
        strokeColor="rgba(255,255,255,0.6)"
      />
      <Blob tone="magenta" size="xl" className="bottom-0 -left-40" opacity={25} slow />
      <div className="max-w-5xl mx-auto px-5 md:px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-7xl font-display mb-6 text-white drop-shadow-md leading-tight">
          Reserve your spot <br className="hidden md:block" />
          <span className="font-serif italic text-sun">in the community.</span>
        </h2>
        <p className="text-xl md:text-2xl text-white/95 mb-14 max-w-2xl mx-auto font-medium drop-shadow-sm">
          Say yes to coming back home to yourself. Stop figuring it out alone.
        </p>

        <div className="bento-card p-6 sm:p-8 md:p-16 bg-white border-none relative max-w-2xl mx-auto text-left shadow-2xl">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-magenta text-sun text-xs md:text-sm font-bold uppercase tracking-widest py-3 px-6 md:px-8 rounded-full shadow-xl whitespace-nowrap border-2 border-sun">
            First 50 Members Only
          </div>

          {/*
            TODO (H1 / Markup #62) — CONFIRM FINAL PRICING WITH CLIENT BEFORE PUBLISHING.
            The Markup feedback is internally inconsistent, so the live numbers below
            ($88/mo, +$45 reg, "$133 today") are intentionally left unchanged for now.
            Proposed structure to verify:
              • First 50 (locked for life): $88/mo + one-time $45 reg.
              • After first 50: $110/mo + one-time $25 reg = $135 first month.
              • After June:     $110/mo + one-time $45 reg = $155 to sign up.
            Open question: the stated "$47 savings for life" doesn't reconcile cleanly
            with the figures above ($110-$88=$22/mo, or $135-$88=$47 one month only).
            Do NOT hardcode these until Jenn confirms.
          */}
          <div className="text-center mb-8 pt-6">
            <h3 className="text-2xl md:text-3xl font-display text-gray-900 mb-4">
              Energize Your Vibe Membership
            </h3>
            <div className="flex justify-center items-end gap-2">
              <span className="text-7xl md:text-8xl font-display text-pink leading-none">$88</span>
              <span className="text-gray-500 font-bold text-xl mb-2">/ month</span>
            </div>
            <p className="text-sm text-gray-500 mt-3 font-medium">
              + one-time $45 registration fee
            </p>
          </div>

          <div className="space-y-3 mb-8">
            {perks.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-bg p-4 rounded-2xl border border-gray-200"
              >
                <div className="bg-pink/10 p-2 rounded-full shrink-0">
                  <Check size={20} className="text-pink" />
                </div>
                <span className="text-gray-800 text-base md:text-lg">
                  <strong>{p.bold}</strong> {p.text}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-sun/60 rounded-2xl p-5 mb-8 text-center border-2 border-gold/50">
            <p className="text-gray-900 font-display text-xl md:text-2xl mb-1">
              Today: $133 to sign up
            </p>
            <p className="text-sm font-bold text-magenta">
              (First month $88 + one-time $45 registration fee)
            </p>
          </div>

          <Link
            to="/membership"
            className="block text-center w-full bg-pink text-white py-5 md:py-6 px-8 rounded-full font-bold uppercase tracking-widest text-lg md:text-xl hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)] mb-6"
          >
            Reserve Your Spot Now
          </Link>

          <div className="text-center space-y-3">
            <p className="inline-flex items-center gap-3 text-magenta text-sm font-bold bg-magenta/5 px-5 py-3 rounded-full border border-magenta/15">
              <span className="uppercase tracking-[0.2em] text-[10px] bg-magenta text-sun px-2 py-0.5 rounded-full">Beta Vibe Deal</span>
              {/* TODO (H2 / Markup #63): client wants the "two months for the price of one" deal kept,
                  framed as getting July/August for the price of one. Current copy says June 18-July 1 signup
                  with July+August combined and billing starting Sept 1. Confirm exact dates with Jenn. */}
              <span>Sign up during the Beta window and get two months for the price of one. Your next payment won’t begin until after your first two months.</span>
            </p>
            <p className="text-gray-600 text-sm font-medium max-w-xl mx-auto">
              Membership includes a 90-day commitment. Your first two months are combined as one so you can fully experience the community, build consistency, and create real connection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
