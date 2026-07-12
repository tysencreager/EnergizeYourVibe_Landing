import { Smartphone, Share, MoreVertical } from 'lucide-react';
import Reveal from './Reveal.jsx';

export default function AddToHomeScreen() {
  // Already running as an installed app — nothing to promote.
  const isStandalone =
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true);
  if (isStandalone) return null;

  return (
    <Reveal>
      <div className="bento-card glass border-2 border-gold/30 p-7 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] bg-sun/60 text-magenta px-3 py-1.5 rounded-full mb-4">
              <Smartphone size={13} strokeWidth={2} /> One-tap access
            </span>
            <h3 className="text-2xl md:text-3xl font-display text-gray-900 mb-2">
              Take the vibe with you — <i className="font-serif text-pink">save EYV to your home screen.</i>
            </h3>
            <p className="text-gray-700 text-sm md:text-base font-medium leading-relaxed">
              Add this site to your phone&rsquo;s home screen and it opens like an app: full screen, your own EYV icon, sisterhood one tap away.
            </p>
          </div>
          <div className="md:w-[300px] shrink-0 space-y-3">
            <div className="flex items-start gap-3 bg-white/70 border border-gray-200 rounded-2xl px-4 py-3">
              <Share size={18} className="text-magenta shrink-0 mt-0.5" strokeWidth={2} />
              <p className="text-sm text-gray-700 font-medium leading-snug">
                <strong className="text-magenta">iPhone:</strong> in Safari, tap <strong>Share</strong>, then <em>Add to Home Screen</em>.
              </p>
            </div>
            <div className="flex items-start gap-3 bg-white/70 border border-gray-200 rounded-2xl px-4 py-3">
              <MoreVertical size={18} className="text-magenta shrink-0 mt-0.5" strokeWidth={2} />
              <p className="text-sm text-gray-700 font-medium leading-snug">
                <strong className="text-magenta">Android:</strong> in Chrome, tap the <strong>⋮ menu</strong>, then <em>Add to Home Screen</em>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
