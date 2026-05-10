import { ArrowRight } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { CHECKOUT_URL } from '../data/links.js';

export default function PortalInactive() {
  const { user, signOut } = useAuth();

  return (
    <section className="relative min-h-[80vh] py-24 md:py-32 px-5 md:px-6 bg-soft-rose overflow-hidden grain">
      <Sunburst
        className="absolute -left-40 -bottom-40 w-[520px] h-[520px] opacity-10"
        strokeColor="rgba(183,21,86,0.6)"
      />
      <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={20} />

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-4">
          Almost in
        </p>
        <h1 className="text-3xl md:text-5xl font-display text-gray-900 mb-5 leading-tight">
          You’re signed in, but your <i className="text-pink">membership isn’t active yet.</i>
        </h1>
        <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed mb-8 max-w-xl mx-auto">
          Once your payment goes through ({user?.email}), the portal unlocks automatically. If you’ve already paid, give it a minute and refresh — sometimes our systems take a moment to sync.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
          >
            Reserve my spot <ArrowRight size={16} />
          </a>
          <button
            onClick={() => signOut()}
            className="text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
}
