import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { pillars, pillarColorClasses } from '../data/pillars.js';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';

const quotes = [
  '“I want what’s introduced to speak to the soul.”',
  '“A space for women to gather, connect, and simply be. A place to come as you are without pressure or performance.”',
  '“Not about fixing everything. Supporting people where they are and offering tools that empower them to become their best self.”',
  '“The differentiator is that this is truly personal. We genuinely root for you.”',
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-48 md:pb-28 px-5 md:px-6 bg-gradient-to-br from-sun via-gold/40 to-orange/60 overflow-hidden">
        <Blob tone="pink" size="xl" className="-top-20 -left-20" opacity={20} slow />
        <Blob tone="magenta" size="lg" className="-bottom-20 right-10" opacity={15} />
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-magenta leading-tight mb-6">
              The heart behind <span className="font-serif italic text-gradient font-semibold">Energize Your Vibe.</span>
            </h1>
            <p className="text-lg md:text-xl text-magenta/90 font-medium leading-relaxed mb-6">
              Jenn is the founder of Energize Your Vibe, a high vibin&rsquo; community for women who want to connect and build meaningful relationships. For women who want to play, grow, and be real — who don&rsquo;t want to do life alone.
            </p>
            <Link
              to="/membership"
              className="inline-flex items-center gap-3 bg-magenta text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
            >
              Join The Sisterhood <ArrowRight size={18} />
            </Link>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] max-w-sm w-full shadow-2xl border-4 border-white">
              <img
                src="/assets/jenn-headshot.png"
                alt="Jenn - Founder of Energize Your Vibe"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* BIO */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-sunset overflow-hidden">
        <Blob tone="gold" size="xl" className="-top-40 -right-40" opacity={18} slow />
        <Blob tone="pink" size="md" className="bottom-20 -left-20" opacity={14} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Heading */}
          <div className="mb-14 grid md:grid-cols-[1.2fr_1fr] gap-10 items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-pink mb-3">
                Founder · Holistic Health Practitioner
              </p>
              <h2 className="text-4xl md:text-6xl font-display text-gray-900 mb-4 leading-tight">
                Jenn <i className="text-gradient">Davis.</i>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 font-medium">
                Founder of Energize Your Vibe & Owner of Connected Roots Healing Space in Draper, UT.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Holistic Health Practitioner', 'Applied Kinesiology', 'Reiki Master', 'Yoga Teacher', 'ICF Level 2 Life Coach'].map((cred) => (
                <span
                  key={cred}
                  className="px-4 py-2 bg-white/80 border border-gold/30 rounded-full text-xs md:text-sm font-bold text-magenta shadow-sm"
                >
                  {cred}
                </span>
              ))}
            </div>
          </div>

          {/* Main bio two-column: article + sticky photo rail */}
          <div className="grid md:grid-cols-[1fr_minmax(260px,340px)] gap-10 lg:gap-16">
            <article className="space-y-6 text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
              <p className="first-letter:font-display first-letter:text-6xl first-letter:text-pink first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:mt-1">
                Jenn Davis is a certified Holistic Health Practitioner specializing in energy and wellness, trained in the energetics of the body and the subconscious. Her work blends science-backed methods and coaching with deep emotional and energetic support, helping individuals come back home to self and heart, regulate their nervous system, shift their mindset, and create lasting change from within.
              </p>
              <p>
                Jenn has spent decades committed to personal growth, healing, and understanding what it truly means to live a fulfilling life. She is deeply passionate about supporting people in remembering who they are, that they matter, are seen, heard, and deeply loved. Creating space for others to experience peace, clarity, and genuine joy is not just her work, it is her life’s mission and passion.
              </p>

              <figure className="my-10 rounded-3xl overflow-hidden shadow-xl border border-white/40">
                <img
                  src="/assets/women-talking.png"
                  alt="Two women having a warm conversation"
                  className="w-full h-auto object-cover"
                />
                <figcaption className="bg-white/70 backdrop-blur-md px-6 py-4 text-sm text-gray-600 italic font-medium text-center">
                  Real conversations. Real support. Real growth.
                </figcaption>
              </figure>

              <p>
                Her journey has been shaped by both profound love and deep loss. Widowed at the age of 22 and left to raise her young child, Jenn faced one of life’s most defining moments early on. In the midst of grief and uncertainty, she made a choice to keep going. That choice led her into years of self-development, faith, healing work, deep inner exploration, and surrendering to allow God to guide her efforts and create the miracles she desired.
              </p>
              <p>
                Throughout her life, Jenn has also experienced the heartbreak of losing two of her childhood best friends to cancer, and has been impacted by the loss of loved ones through suicide. She has walked alongside friends, clients, and family members navigating mental health challenges and addiction, giving her a deep, personal understanding of the weight many people carry (Including herself). These experiences have shaped her perspective, strengthening her compassion and reinforcing her belief in the importance of connection, support, and truly valuing life.
              </p>

              <blockquote className="relative my-10 pl-8 md:pl-10 py-6 border-l-4 border-pink bg-white/60 rounded-r-2xl">
                <Quote className="absolute -top-3 -left-4 text-pink bg-white rounded-full p-1" size={32} />
                <p className="font-display italic text-2xl md:text-3xl text-magenta leading-snug">
                  She didn’t just learn the work. She lives it and continues to embody it. No one is exempt &amp; there’s no way around it. We are all human.
                </p>
              </blockquote>

              <p>
                Later in life, as unresolved trauma and grief surfaced, Jenn experienced another layer of transformation. What once felt light became heavy. Instead of turning away, she leaned in. Through emotional healing, therapy, mindset work & coaching, nervous system regulation, and a deep reliance on her faith in God, she found her way back to her truest self. She values practicing what she preaches, in life and with clients. She won’t tell you what you want to hear. She will share truth, and respects when she is treated the same. Communication and willingness are key.
              </p>
              <p>
                Today, Jenn lives with a grounded sense of inner peace, love, and alignment. She brings real-life experience, compassion, and clarity into every space she holds. She sees people for who they are and meets them where they are, while also guiding them forward. She thrives using her cheerleading super powers - experiencing pure joy for herself and witnessing it in others.
              </p>
              <p>
                Jenn is deeply rooted in her relationship with God and her Savior. While this is central to her life, she honors and respects each individual’s beliefs and personal journey. She believes love is the foundation of healing, and values the unique light within every person.
              </p>
              <p>
                She has been married to her sweetheart going on 24 years. She is grateful to have found love again, after such a loss, and can testify that anything is possible. She is the proud mother of 3 adult children (her baby just turned 18 and is graduating HS - talk about new bittersweet chapters!). Originally from Washington State, she has called Utah home for the past 20 years. She loves Utah and its seasons, the mountains, water, and adventure.
              </p>
            </article>

            {/* Sticky photo + facts rail */}
            <aside className="space-y-6 md:sticky md:top-32 self-start">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4]">
                <img
                  src="/assets/jenn-headshot-2.png"
                  alt="Jenn Davis"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bento-card glass border border-gold/30 p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-pink mb-4">
                  At a glance
                </p>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-magenta">Based in</dt>
                    <dd className="text-gray-700 font-medium">Draper, Utah</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-magenta">Practice</dt>
                    <dd className="text-gray-700 font-medium">Connected Roots Healing Space</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-magenta">Focus</dt>
                    <dd className="text-gray-700 font-medium">Nervous system · Mindset · Energy</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-magenta">Family</dt>
                    <dd className="text-gray-700 font-medium">Married 24 years · Mom of 3</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>

          {/* VISION CARD - photo left, text right */}
          <div className="relative mt-16 rounded-3xl overflow-hidden shadow-2xl border border-white/40 grid md:grid-cols-[1fr_1.1fr]">
            {/* Photo side */}
            <div className="relative min-h-[320px] md:min-h-[600px]">
              <img
                src="/assets/women-boardwalk.png"
                alt="Women celebrating at sunset"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 md:bg-gradient-to-r md:from-magenta/30 md:via-transparent md:to-magenta" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-magenta text-[10px] font-bold uppercase tracking-[0.3em] shadow-lg">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-pink" />
                Find your people
              </div>
            </div>

            {/* Text side */}
            <div className="relative bg-gradient-to-br from-magenta via-[#8A1249] to-[#3b0a24] text-white p-7 sm:p-8 md:p-14 flex flex-col justify-center grain">
              <Sunburst
                className="absolute -right-24 -top-24 w-[380px] h-[380px] opacity-15"
                strokeColor="rgba(253,224,139,0.8)"
              />
              <div className="relative z-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-sun mb-4">
                  The Vision
                </p>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl mb-5 md:mb-6 leading-[1.05]">
                  More than a program. <i className="text-sun">It’s a movement.</i>
                </h3>
                <div className="space-y-4 text-base md:text-lg font-medium leading-relaxed text-white/95 mb-8">
                  <p>
                    Energize Your Vibe was born through inspiration and lived experiences. It’s a space where women come as they are, are supported, grow, and rise.
                  </p>
                  <p>
                    Healing and fulfillment come through shared experiences, gathering, playing, laughing, learning, and truly living life together.
                  </p>
                  <p>
                    A community built on intention. This is not a space for gossip, blame or playing a victim. Rather, a space for support, empowerment, accountability, and real transformation.
                  </p>
                  <p className="bg-white/10 border border-white/20 rounded-2xl p-5">
                    Everyone deserves to feel good, be good, and have access to tools and resources that make a difference. Life can be loud enough. I want to support inner peace &amp; joy.
                  </p>
                </div>
                <div className="pt-6 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                  <p className="font-display italic text-xl sm:text-2xl md:text-3xl text-sun">
                    “You are welcome here. I love you.”
                  </p>
                  <Link
                    to="/membership"
                    className="shrink-0 inline-flex items-center gap-3 bg-sun text-magenta py-4 px-7 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors shadow-lg"
                  >
                    Join Us <ArrowRight size={16} strokeWidth={1.75} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR MISSION — Jenn's words */}
      <section className="relative py-20 md:py-28 px-5 md:px-6 bg-white overflow-hidden">
        <Blob tone="sun" size="xl" className="-top-40 -left-40" opacity={25} slow />
        <Blob tone="pink" size="lg" className="bottom-0 -right-32" opacity={12} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-4">
              Our Mission
            </p>
            <h2 className="text-4xl md:text-6xl font-display text-gray-900 leading-tight">
              Life is meant to be <i className="text-gradient">fully lived.</i>
            </h2>
          </div>

          <div className="space-y-6 text-lg md:text-xl text-gray-700 font-medium leading-relaxed">
            <p>
              At Energize Your Vibe, we believe life is meant to be lived fully, with heart,
              connection, and energy that lights you up from the inside out.
            </p>
            <p>
              We&rsquo;re a global community of women who choose to live intentionally, embrace
              purpose, and make joy a way of life. Women who encourage one another, celebrate
              one another, and grow stronger together. Women who know they don&rsquo;t have to do
              life alone.
            </p>
            <p>
              We&rsquo;re committed to showing up through every season of life. Whether you&rsquo;re
              celebrating a victory or walking through a difficult chapter, you&rsquo;ll find women
              who will stand beside you with love, compassion, encouragement, and genuine
              support.
            </p>
            <p>
              We believe confidence and humility can exist together. We honor our truth, remain
              open to learning, and know that when women choose love, authenticity, and
              connection, the impact reaches far beyond ourselves.
            </p>
            <p>
              Inside our community, you&rsquo;ll find meaningful relationships that go beyond the
              screen. Through online gatherings, local meetups, retreats, seminars, and
              unforgettable experiences, we create opportunities to laugh together, learn
              together, and build friendships that last.
            </p>
            <p>
              You&rsquo;ll also discover practical tools to help you navigate the areas of life that
              matter most. Our 7 Pillars framework, resource library, expert-led calls,
              community support, daily inspiration, texts, emails, social media, and the
              Energize Your Vibe Hotline are all designed to help you strengthen your life one
              step at a time.
            </p>
            <p>
              Life will always bring challenges. None of us are exempt. But with the right
              people beside you and the right tools within you, those challenges can become
              opportunities to grow stronger, wiser, and more resilient.
            </p>
            <p>
              This is your place to reconnect with yourself, build lasting friendships, and
              create a life that feels energized, intentional, and fully lived.
            </p>
          </div>

          <div className="mt-12 text-center bg-soft-dawn rounded-3xl border-2 border-pink/15 p-8 md:p-10">
            <p className="font-display text-2xl md:text-4xl text-magenta leading-snug">
              Because you matter.<br />
              You are loved.<br />
              <i className="text-pink">And life is meant to be fully expressed.</i>
            </p>
          </div>
        </div>
      </section>

      {/* QUOTES */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-bg">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-14 text-center">
            In Jenn’s <i className="text-orange">own words.</i>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {quotes.map((q, i) => (
              <div
                key={i}
                className="bento-card bg-white p-8 border-2 border-gray-100 flex gap-5 items-start"
              >
                <Quote className="text-pink shrink-0 mt-1" size={28} />
                <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed italic">
                  {q}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL 7 PILLARS */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-gradient-to-br from-magenta via-[#8A1249] to-[#3b0a24] text-white overflow-hidden">
        <Sunburst
          className="absolute -right-40 -top-40 w-[600px] h-[600px] opacity-15"
          strokeColor="rgba(253,224,139,0.8)"
        />
        <Blob tone="pink" size="xl" className="-bottom-40 -left-40" opacity={25} slow />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1.5 bg-sun text-magenta rounded-full text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              The 7 Pillars
            </div>
            <h2 className="text-4xl md:text-6xl font-display mb-6">
              A framework built for <i className="text-sun">real life.</i>
            </h2>
            <p className="text-white/85 text-lg md:text-xl max-w-3xl mx-auto font-medium">
              Your brain doesn’t respond well to vague goals like “be happier.” It needs structure and intention. The 7 Pillars give you clear areas to focus on so you know what’s going on and where to start.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {pillars.map((p, idx) => {
              const c = pillarColorClasses[p.color];
              return (
                <div
                  key={p.key}
                  className={`bento-card ${c.bg} ${c.text} p-8 border-none flex flex-col gap-4`}
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div>
                      <p className={`text-xs font-bold uppercase tracking-widest ${c.accent} mb-1`}>
                        Pillar {idx + 1} · {p.subtitle}
                      </p>
                      <h3 className="font-display text-4xl md:text-5xl">{p.name}</h3>
                    </div>
                  </div>
                  <p className={`font-bold italic ${c.accent}`}>{p.tagline}</p>
                  <p className="font-medium opacity-95 leading-relaxed">{p.long}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY THE FRAMEWORK */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 mb-4">
              Why a <i className="text-pink">framework</i> works.
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-medium max-w-3xl mx-auto">
              Because everything in life is connected. No area of your life operates on its own, and when one pillar is supported, the others begin to shift too.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            {[
              {
                eyebrow: 'Awareness',
                title: 'See it clearly.',
                desc: 'Most people feel off but don’t know why. The pillars help you name it - so you can do something about it.',
                gradient:
                  'linear-gradient(90deg, rgba(253,224,139,0.95) 0%, rgba(248,162,50,0.9) 55%, rgba(242,107,56,0.85) 100%)',
              },
              {
                eyebrow: 'Balance',
                title: 'Regulate your nervous system.',
                desc: 'When your pillars are supported, your body feels safer. That’s why you feel calmer, more focused, and more resilient.',
                gradient:
                  'linear-gradient(90deg, rgba(248,162,50,0.9) 0%, rgba(242,107,56,0.95) 55%, rgba(226,46,100,0.9) 100%)',
              },
              {
                eyebrow: 'Momentum',
                title: 'Support one, shift them all.',
                desc: 'Poor sleep affects your mood. Relationship stress affects your decisions. Everything is connected - and the pillars move with you.',
                gradient:
                  'linear-gradient(90deg, rgba(242,107,56,0.92) 0%, rgba(226,46,100,0.95) 55%, rgba(183,21,86,0.9) 100%)',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="relative rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-[0_12px_32px_-14px_rgba(226,46,100,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
                style={{
                  background: item.gradient,
                  WebkitMaskImage:
                    'linear-gradient(90deg, transparent 0, black 2%, black 98%, transparent 100%)',
                  maskImage:
                    'linear-gradient(90deg, transparent 0, black 2%, black 98%, transparent 100%)',
                }}
              >
                <div className="grid md:grid-cols-[auto_1fr] gap-x-8 gap-y-2 items-baseline">
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/85">
                    {item.eyebrow}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/95 font-medium leading-relaxed text-base md:text-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              to="/membership"
              className="inline-flex items-center gap-3 bg-magenta text-white py-5 px-10 rounded-full font-bold uppercase tracking-widest text-base hover:bg-pink transition-colors shadow-lg"
            >
              Become a Member <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
