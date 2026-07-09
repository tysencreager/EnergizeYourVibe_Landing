import { Link } from 'react-router-dom';
import {
  Video,
  Heart,
  Users,
  MessageCircleHeart,
  MessageSquareText,
  Sparkles,
  Map,
  Headphones,
  Sun,
  Gift,
  Feather,
  ArrowRight,
  BookOpen,
  PhoneCall,
} from 'lucide-react';
import Blob from './Blob.jsx';
import GradientBarList from './GradientBarList.jsx';
import Reveal from './Reveal.jsx';

const itemsLeft = [
  { icon: <Video />, text: "Daily 'Lives for Vibes'", accent: 'sun' },
  { icon: <Users />, text: 'Monthly Group Call with Jenn', accent: 'gold' },
  { icon: <Sparkles />, text: 'Monthly 7 Pillar support and growth calls with Energize Your Vibe expert coaches (join as needed)', accent: 'orange' },
  { icon: <MessageSquareText />, text: 'Texts: Stay connected with uplifting texts during the week, filled with inspiration, motivation, self-love reminders, and simple ways to take action.', accent: 'pink' },
  { icon: <Heart />, text: 'Cheerleader in your pocket', accent: 'magenta' },
  { icon: <BookOpen />, text: 'Resource library in your member portal', accent: 'gold' },
];

const itemsRight = [
  { icon: <Map />, text: 'The Energize Your Vibe Method + Roadmap', accent: 'sun' },
  { icon: <Headphones />, text: 'Podcasts, Meditations & Spotify Playlist', accent: 'gold' },
  { icon: <Sun />, text: 'Affirmations & Vibe Checks', accent: 'orange' },
  { icon: <MessageCircleHeart />, text: 'Private Facebook Community', accent: 'pink' },
  { icon: <Gift />, text: 'Personalized Welcome Gift in the Mail', accent: 'magenta' },
  { icon: <PhoneCall />, text: 'The Energize Your Vibe Hotline', accent: 'pink' },
];

export default function Inclusions() {
  return (
    <section className="relative z-10 py-20 md:py-28 px-5 md:px-6 bg-soft-ember overflow-hidden">
      <Blob tone="pink" size="lg" className="-top-20 right-10" opacity={12} slow />
      <Blob tone="gold" size="md" className="bottom-40 -left-20" opacity={18} />
      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display mb-6 text-gray-900 leading-tight">
            Everything inside <span className="font-serif italic text-pink font-semibold">your membership.</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Tools for developing yourself, a community that roots for you, and little touches that remind you you’re not alone.
          </p>
        </Reveal>

        {/* Gradient bar list - two stacked columns on desktop */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-12">
          <Reveal direction="right" delay={80}>
            <GradientBarList items={itemsLeft} />
          </Reveal>
          <Reveal direction="left" delay={160}>
            <GradientBarList items={itemsRight} />
          </Reveal>
        </div>

        {/* Photo feature row: the room, the call */}
        <div className="grid md:grid-cols-5 gap-5 mb-12">
          <div className="bento-card relative overflow-hidden md:col-span-3 min-h-[280px] border-none group">
            <img
              src="/assets/women-table.png"
              alt="Women gathered around a table in a creative workspace"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-magenta/85 via-magenta/30 to-transparent" />
            <div className="relative z-10 p-8 md:p-10 flex flex-col justify-end h-full min-h-[280px] text-white">
              <Users className="text-sun mb-4" size={32} />
              <h3 className="font-display text-3xl md:text-4xl mb-3 drop-shadow-md">
                A room full of women rooting for you.
              </h3>
              <p className="text-white/95 font-medium text-base md:text-lg max-w-md drop-shadow">
                Connection, creativity, and wellness, shared openly, without comparison.
              </p>
            </div>
          </div>

          <div className="bento-card relative overflow-hidden md:col-span-2 min-h-[280px] border-none group">
            <img
              src="/assets/sisterhood-zoom.png"
              alt="Woman on a video call with the community"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink/85 via-pink/30 to-transparent" />
            <div className="relative z-10 p-8 flex flex-col justify-end h-full min-h-[280px] text-white">
              <Video className="text-sun mb-4" size={28} />
              <h3 className="font-display text-2xl md:text-3xl mb-2 drop-shadow-md">
                Live, together.
              </h3>
              <p className="text-white/95 font-medium drop-shadow">
                Monthly calls + daily lives, wherever you are in the world.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bento-card glass border border-gold/30 p-8 flex gap-6 items-center">
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-gold via-orange to-pink flex items-center justify-center shrink-0 shadow-md">
              <Gift size={44} strokeWidth={1.25} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-orange mb-2">
                A Personal Touch
              </p>
              <h3 className="font-display text-2xl text-gray-900 mb-1">A little surprise to brighten your day.</h3>
              <p className="text-gray-600 font-medium">
                Each member receives a personalized gift in the mail when they sign up. Because being part of this should feel fun, thoughtful, and a little (or a lot) spoiling.
              </p>
            </div>
          </div>

          <div className="bento-card glass border border-pink/20 p-8 flex gap-6 items-center">
            <div className="w-28 h-28 rounded-2xl bg-brand-gradient flex items-center justify-center shrink-0 shadow-md">
              <Feather size={44} strokeWidth={1.25} className="text-white" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-2">
                Tailored For You
              </p>
              <h3 className="font-display text-2xl text-gray-900 mb-1">
                Opt-in inspiration, made for you.
              </h3>
              <p className="text-gray-600 font-medium">
                Choose the support that resonates with your heart, where you are and where you’re going.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <Link
            to="/membership"
            className="bg-brand-gradient text-white py-5 px-12 rounded-full font-bold uppercase tracking-widest text-lg shadow-[0_10px_30px_rgba(242,107,56,0.4)] hover:shadow-[0_15px_40px_rgba(242,107,56,0.6)] transition-all hover:-translate-y-1 flex items-center gap-3"
          >
            Secure Your Membership <ArrowRight size={20} />
          </Link>
          <p className="mt-6 inline-flex items-center gap-3 text-pink font-bold text-sm md:text-base bg-pink/10 px-6 py-2.5 rounded-full border border-pink/20">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink animate-pulse" />
            <span className="uppercase tracking-[0.2em] text-xs">Founding Members</span>
            <span className="text-pink/40">|</span>
            <span>First 50 members lock in the $88/mo Founding Member rate for life.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
