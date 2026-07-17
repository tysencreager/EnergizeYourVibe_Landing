import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, RefreshCw } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { useAuth } from '../hooks/useAuth.jsx';
import { CHECKOUT_URL } from '../data/links.js';

// How long we keep auto-checking for the Stripe webhook to land.
const POLL_INTERVAL_MS = 4000;
const MAX_POLLS = 45; // ~3 minutes

export default function PortalInactive() {
  const { user, membershipStatus, refreshMembership, signOut } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(false);
  const polls = useRef(0);

  // A member who just paid often reaches this page seconds before the Stripe
  // webhook finishes activating them. Quietly re-check and unlock on arrival.
  useEffect(() => {
    if (membershipStatus === 'active') {
      navigate('/portal', { replace: true });
      return;
    }
    const timer = setInterval(async () => {
      polls.current += 1;
      if (polls.current > MAX_POLLS) {
        clearInterval(timer);
        return;
      }
      const status = await refreshMembership();
      if (status === 'active') {
        clearInterval(timer);
        navigate('/portal', { replace: true });
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [membershipStatus, refreshMembership, navigate]);

  async function handleCheckNow() {
    setChecking(true);
    const status = await refreshMembership();
    setChecking(false);
    if (status === 'active') navigate('/portal', { replace: true });
  }

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
          You&rsquo;re signed in — <i className="text-pink">one moment, sister.</i>
        </h1>

        {/* Just-paid path: reassure + auto-unlock */}
        <div className="bento-card glass border-2 border-pink/20 p-6 sm:p-8 mb-8">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-magenta mb-3">
            <RefreshCw size={13} strokeWidth={2} className="animate-spin [animation-duration:2.5s]" />
            Just completed checkout?
          </p>
          <p className="text-gray-700 text-base md:text-lg font-medium leading-relaxed">
            We&rsquo;re confirming your payment ({user?.email}) right now. This usually
            takes under a minute — <strong>this page will unlock automatically</strong>{' '}
            the moment it&rsquo;s confirmed. No need to refresh.
          </p>
          <button
            type="button"
            onClick={handleCheckNow}
            disabled={checking}
            className="mt-5 inline-flex items-center gap-2 text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} strokeWidth={2} className={checking ? 'animate-spin' : ''} />
            {checking ? 'Checking…' : 'Check again now'}
          </button>
        </div>

        <p className="text-gray-700 text-base font-medium leading-relaxed mb-8 max-w-xl mx-auto">
          Haven&rsquo;t joined yet? Your account is ready — it just needs a membership
          attached to unlock the portal.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
          >
            Become a member <ArrowRight size={16} />
          </a>
          <button
            onClick={() => signOut()}
            className="text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors"
          >
            Sign out
          </button>
        </div>

        <p className="text-xs text-gray-500 font-medium mt-8 max-w-md mx-auto">
          Paid more than a few minutes ago and still locked out? Make sure you signed in
          with the same email you used at checkout, or contact{' '}
          <a href="mailto:jenn@energizeyourvibe.com" className="text-pink font-semibold">
            jenn@energizeyourvibe.com
          </a>{' '}
          and we&rsquo;ll sort it out.
        </p>
      </div>
    </section>
  );
}
