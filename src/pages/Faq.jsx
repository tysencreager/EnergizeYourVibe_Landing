import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';
import Blob from '../components/Blob.jsx';

/*
  TODO (NP1 / Markup #55): FAQ page.
  Client has NOT supplied final FAQ content yet. Replace `faqs` with Jenn's
  real copy once provided, and remove the "coming soon" notice banner below.
*/
const faqs = [
  {
    q: 'What is included in the membership?',
    a: 'Daily Lives for Vibes, monthly deep-dive calls with Jenn, 7 Pillar support & growth calls, weekly uplifting texts, the member library, and a personalized welcome gift mailed directly to you.',
  },
  {
    q: 'How much does it cost?',
    a: 'Founding Membership is $88/month (see the Membership page for full details). The first 50 members lock in their rate for life.',
  },
  {
    q: 'Is this only online?',
    a: 'Join from wherever you are. The sisterhood gathers online, with select in-person gatherings as the community grows.',
  },
  {
    q: 'Why is there a 90-day commitment?',
    a: 'Real transformation takes practice. Ninety days gives you time to connect, choose in, attend gatherings, build awareness, learn new tools, create healthier habits, and experience what happens when you consistently support yourself.',
  },
];

export default function Faq() {
  return (
    <>
      <section className="relative pt-32 pb-14 md:pt-48 md:pb-24 px-5 md:px-6 bg-gradient-to-br from-sun via-gold/40 to-orange/60 overflow-hidden">
        <Blob tone="pink" size="xl" className="-top-20 -left-20" opacity={20} slow />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <HelpCircle className="mx-auto text-magenta mb-6" size={44} strokeWidth={1.5} />
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-magenta leading-tight mb-6">
            Frequently asked <span className="font-serif italic text-gradient font-semibold">questions.</span>
          </h1>
          <p className="text-lg md:text-xl text-magenta/90 font-medium leading-relaxed">
            Everything you might want to know about joining the sisterhood.
          </p>
        </div>
      </section>

      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-bg">
        <div className="max-w-3xl mx-auto">
          {/* TODO: remove this notice once real FAQ content is in. */}
          <div className="mb-10 rounded-2xl border-2 border-dashed border-gold/60 bg-sun/30 p-5 text-center text-sm font-bold text-magenta">
            More questions &amp; answers coming soon.
          </div>

          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div key={i} className="bento-card bg-white p-6 md:p-8 border-2 border-gray-100">
                <h2 className="font-display text-xl md:text-2xl text-gray-900 mb-3">{item.q}</h2>
                <p className="text-gray-700 font-medium leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/membership"
              className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
            >
              Join The Sisterhood <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
