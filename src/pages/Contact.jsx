import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, Instagram, Mail, MapPin } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Reveal from '../components/Reveal.jsx';
import BookCallCTA from '../components/BookCallCTA.jsx';
import { usePageMeta } from '../hooks/usePageMeta.js';
import { CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from '../data/links.js';

const contactMethods = [
  {
    icon: <Mail size={20} strokeWidth={1.75} />,
    label: 'Email Jenn',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    external: false,
  },
  {
    icon: <Instagram size={20} strokeWidth={1.75} />,
    label: 'Instagram',
    value: '@energizeyourvibe',
    href: INSTAGRAM_URL,
    external: true,
  },
  {
    icon: <Facebook size={20} strokeWidth={1.75} />,
    label: 'Facebook',
    value: 'Energize Your Vibe',
    href: FACEBOOK_URL,
    external: true,
  },
];

export default function Contact() {
  usePageMeta({
    title: 'Contact | Energize Your Vibe',
    description:
      'Reach out to Jenn Davis, founder of Energize Your Vibe, or book a free 30-minute call to ask questions about the community, discover what you or your body needs, or just chat with a sister.',
    canonical: 'https://www.energizeyourvibe.com/contact',
  });

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-5 md:px-6 bg-gradient-to-br from-orange via-pink to-magenta overflow-hidden grain">
        <Blob tone="sun" size="xl" className="-top-32 -right-20" opacity={30} slow />
        <Blob tone="magenta" size="lg" className="bottom-0 -left-32" opacity={25} />

        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-7/12 text-center md:text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-sun mb-4">
              Get in touch
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-6">
              We&rsquo;d love to <span className="font-serif italic text-sun font-semibold">hear from you.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed mb-4 max-w-xl mx-auto md:mx-0">
              Questions about the community? Curious whether Energize Your Vibe is
              your kind of place? Or just want to say hi? Reach out any time. Jenn
              reads and replies personally.
            </p>
            <p className="inline-flex items-center gap-2 text-sm md:text-base text-sun font-semibold mb-8">
              <MapPin size={16} strokeWidth={2} />
              Founder of Energize Your Vibe · Owner of Connected Roots Healing Space, Draper, UT
            </p>

            <div className="flex flex-col gap-3 max-w-md mx-auto md:mx-0">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/25 rounded-2xl px-5 py-3.5 text-left hover:bg-white hover:-translate-y-0.5 transition-all shadow-lg"
                >
                  <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-sun text-magenta shrink-0 shadow-sm">
                    {method.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-sun group-hover:text-orange mb-0.5">
                      {method.label}
                    </span>
                    <span className="block text-sm md:text-base font-bold text-white group-hover:text-magenta truncate">
                      {method.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <Reveal direction="left" className="w-full md:w-5/12 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-sm w-full shadow-2xl border-4 border-sun">
              <img
                src="/assets/jenn-headshot-2.png"
                alt="Jenn Davis - Founder of Energize Your Vibe"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-6 left-6 bg-pink text-white px-6 py-3 rounded-xl font-display text-2xl shadow-lg">
                Hi, I&rsquo;m Jenn!
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* BOOK A CALL FORM */}
      <BookCallCTA />

      {/* QUICK ANSWERS */}
      <section className="relative py-14 md:py-20 px-5 md:px-6 bg-white overflow-hidden">
        <Blob tone="gold" size="md" className="-top-16 -right-16" opacity={16} slow />
        <div className="max-w-3xl mx-auto relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-display text-gray-900 mb-3">
            Looking for a quick answer?
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-medium mb-7">
            The most common questions about membership, events, and the community
            are already answered on our FAQ page.
          </p>
          <Link
            to="/faq"
            className="inline-flex items-center gap-3 bg-sun text-magenta py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gold transition-colors shadow-lg"
          >
            Visit The FAQ <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
