import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import Blob from './Blob.jsx';
import Sunburst from './Sunburst.jsx';

const perks = [
  {
    bold: 'Lifetime pricing:',
    text: 'Lock in the $88 monthly Founding Member rate for life (first 50 members only).',
  },
  {
    bold: 'Setup fee waived:',
    text: 'Your one-time $45 Setup Fee is waived through July 31.',
  },
  {
    bold: 'Your growth roadmap:',
    text: 'Start with the 7 Pillar Assessment and your personalized growth roadmap.',
  },
  {
    bold: 'Experiences:',
    text: 'Invitations to local meetups, experiences, and community events.',
  },
  {
    bold: 'Full access:',
    text: 'The member library, daily Lives for Vibes & inspiring texts, monthly calls, the Energize Your Vibe Hotline, podcast, playlists, meditations, affirmations & vibe check-ins.',
  },
  {
    bold: 'Community & a personal touch:',
    text: 'Private FB Community & a personalized welcome gift mailed directly to you.',
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
            Founding Members · First 50 Only
          </div>

          {/* NOTE: Jenn is still honing final pricing — numbers below reflect her latest notes (July 2026). */}
          <div className="text-center mb-8 pt-6">
            <h3 className="text-2xl md:text-3xl font-display text-gray-900 mb-4">
              Founding Membership
            </h3>
            <div className="flex justify-center items-end gap-2">
              <span className="text-7xl md:text-8xl font-display text-pink leading-none">$88</span>
              <span className="text-gray-500 font-bold text-xl mb-2">/ month</span>
            </div>
            <p className="text-sm text-gray-500 mt-3 font-medium">
              One-time $45 Setup Fee <strong className="text-magenta">waived through July 31</strong>
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
              Join before August 1: just $88 to sign up
            </p>
            <p className="text-sm font-bold text-magenta">
              (First month $88 · one-time $45 Setup Fee waived through July 31)
            </p>
          </div>

          <Link
            to="/membership"
            className="block text-center w-full bg-pink text-white py-5 md:py-6 px-8 rounded-full font-bold uppercase tracking-widest text-lg md:text-xl hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)] mb-6"
          >
            Become a Founding Member
          </Link>

          <div className="text-center space-y-3">
            <p className="inline-flex items-center gap-3 text-magenta text-sm font-bold bg-magenta/5 px-5 py-3 rounded-full border border-magenta/15">
              <span className="uppercase tracking-[0.2em] text-[10px] bg-magenta text-sun px-2 py-0.5 rounded-full">Launch</span>
              <span>Sign-ups are open · Community begins August 1. Real tools. Real friendships. Real growth.</span>
            </p>
            <p className="text-gray-600 text-sm font-medium max-w-xl mx-auto">
              <strong className="text-gray-800">Why 90 days?</strong> Real transformation takes practice. Membership includes a 90-day commitment — time to connect, choose in, attend gatherings, build awareness, learn new tools, create healthier habits, and experience what happens when you consistently support yourself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
