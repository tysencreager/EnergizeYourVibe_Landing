import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative z-10 pt-40 pb-16 md:pt-72 md:pb-32 px-5 md:px-6 overflow-hidden bg-sun">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/eyv-header-poster.jpg"
          aria-hidden="true"
        >
          <source src="/assets/eyv-header-video.webm" type="video/webm" />
          <source src="/assets/eyv-header-video.mp4" type="video/mp4" />
        </video>
        {/* Soft colorwash so the image reads */}
        <div className="absolute inset-0 hero-video-overlay" />
        {/* Dark-to-light radial vignette centered on the text for contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(60,10,30,0.32)_0%,rgba(60,10,30,0.12)_45%,transparent_75%)]" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
        <h1
          className="text-[2.2rem] sm:text-4xl md:text-[5.25rem] leading-[1.08] md:leading-[1.05] mb-5 md:mb-6 max-w-5xl font-display font-medium text-white"
          style={{
            textShadow:
              '0 2px 8px rgba(0,0,0,0.5), 0 4px 24px rgba(60,10,30,0.6), 0 1px 2px rgba(0,0,0,0.4)',
          }}
        >
          Empower your energy.
          <span className="block mt-2 md:mt-3">
            <span className="relative inline-block italic font-serif text-white"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, transparent 0%, transparent 58%, rgba(226,46,100,0.78) 58%, rgba(226,46,100,0.55) 100%)',
                backgroundRepeat: 'no-repeat',
                padding: '0 0.3em 0.08em',
                borderRadius: '0.2em',
              }}
            >
              Transform your life.
            </span>
          </span>
        </h1>

        <p className="text-sm md:text-xl text-white mb-6 md:mb-8 max-w-2xl leading-snug font-medium bg-pink/70 backdrop-blur-md rounded-2xl px-4 md:px-5 py-3 border border-white/25 shadow-lg">
          Energize Your Vibe is a high vibin&rsquo; community for women who want to connect and build meaningful relationships.
          <span className="text-sun font-semibold"> We lead with love. We live with intention. We have fun.</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <Link
            to="/membership"
            className="w-full sm:w-auto bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-base glow-pulse hover:shadow-[0_15px_40px_rgba(183,21,86,0.75)] transition-all hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            Reserve Your Spot <ArrowRight size={18} />
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto bg-white/90 backdrop-blur-sm text-magenta py-4 px-8 rounded-full font-bold uppercase tracking-widest text-base border-2 border-white/60 hover:bg-white transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            Meet Jenn
          </Link>
        </div>

        <p className="inline-flex items-center gap-3 text-xs md:text-sm font-bold text-magenta mt-6 bg-sun/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-magenta/15 shadow-[0_4px_16px_rgba(0,0,0,0.2)]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink animate-pulse" />
          <span className="uppercase tracking-[0.2em] text-[10px] md:text-xs">Launch</span>
          <span className="hidden sm:inline text-magenta/40">|</span>
          <span>Sign-ups launch July 17 · Community begins August 1. First 50 Founding Members lock in $88/mo for life, $45 Setup Fee waived through July 31.</span>
        </p>
      </div>
    </section>
  );
}
