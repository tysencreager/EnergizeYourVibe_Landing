import { Link } from 'react-router-dom';
import { ArrowRight, HelpCircle } from 'lucide-react';
import Blob from '../components/Blob.jsx';

/*
  FAQ copy supplied by Jenn (EYV_FAQ_Page.docx, July 2026).
*/
const faqs = [
  {
    q: 'What is Energize Your Vibe?',
    a: "Energize Your Vibe is a women's community designed to help you feel more connected to yourself and others. Through simple tools, meaningful conversations, online & in-person events, the framework, member library, texts, calls, daily lives, and encouragement, you'll build a life with more energy, purpose, confidence, and joy.",
  },
  {
    q: 'Who is this community for?',
    a: "Any woman who wants more. More connection. More peace. More confidence. More miracles. More growth. More laughter. More purpose. More community. Whether you're thriving, feeling stuck, starting over, in the middle, or simply wanting to become the best version of yourself, you belong here.",
  },
  {
    q: "What if I'm shy or don't know anyone?",
    a: "Perfect. I'm sure many women join feeling exactly the same way. There is never pressure to participate more than you're comfortable with. You'll find women who genuinely care, encourage one another, and understand what it's like to be new.",
  },
  {
    q: 'Is this a networking group?',
    a: "No. Friendships naturally happen, but Energize Your Vibe isn't a business networking community. It's a place where women can simply be women. If you own a business, you're welcome here, but this space is about you, not your business. If you are someone with the intention of seeking to join and meet others to grow or find new contacts for your business, this probably isn't the space for you. However, if things happen organically — that's fabulous. We want members to feel safe from pressure or spamming.",
  },
  {
    q: 'What do I receive as a member?',
    a: 'Membership includes access to women who will become your sisters and family, a growing library of resources, journal prompts, guided exercises, challenges, monthly live events, workshops, community conversations, inspiration, and exclusive member experiences. New content is added regularly.',
  },
  {
    q: 'What are the Seven Pillars?',
    a: 'A framework for everyday life that lifts you up, builds you up, and creates access to fulfill the things that matter most to you in life. Everything inside the community is built around seven areas of life & a method that can support you, if you consistently take it on: Align \u00b7 Feel \u00b7 Think \u00b7 Fuel \u00b7 Connect \u00b7 Flow \u00b7 Shine. Together they help create a more balanced, energized life.',
  },
  {
    q: 'Do I have to participate in everything?',
    a: "Not at all. Take what you need. Skip what doesn't fit. Come back whenever you're ready. This community is designed to support your life, not overwhelm it. However, I won't skip over that showing up can be half the battle, and if you aren't engaged — how do you expect life to shift in the way you want it to? I encourage you to lean in. Usually the things that confront us or feel challenging or uncomfortable are the things that will help us to grow the most. You get to choose what that is for you, and we are here to support it!",
  },
  {
    q: 'Is this like therapy?',
    a: 'No. Energize Your Vibe is not therapy or medical treatment. It provides education, personal growth tools, encouragement, and community support. Always seek licensed professionals when appropriate.',
  },
  {
    q: 'Is this faith-based?',
    a: "Women of all backgrounds are welcome. While Jenn openly shares her own faith and values around God, the community focuses on personal growth, connection, and becoming more aligned with who you were created to be. Everyone is invited to participate with respect for one another. If you aren't an open person to accept, love & co-exist with others no matter their faith, race, beliefs, etc. — it may or may not be the community for you. Again, we want a safe community.",
  },
  {
    q: 'Are there live events?',
    a: "Yes! Members have opportunities to attend live virtual events monthly & local meet-ups in person. Visit the calendar for more information. It's our goal to expand and have more in-person events as we grow. If you are a person who loves to gather and/or host — or who has a space of your own that could be utilized for gatherings in your area — perhaps you would be a great fit to be a city team lead in your own area. More info to come. Feel free to send an email to leadership@energizeyourvibe.com if this is of interest.",
  },
  {
    q: 'Why a 90-day commitment?',
    a: "Real change takes time. Ninety days gives you the opportunity to meet others, learn the tools, practice them consistently, build new habits, and experience what happens when you truly support yourself. You don't have to figure it out alone.",
  },
  {
    q: 'Can I cancel anytime?',
    a: "Yes. Beyond your 90-day commitment with recurring payments, you're free to cancel your membership whenever you choose. We hope you'll stay because of the value, friendships, and growth you experience, never because you feel locked in.",
  },
  {
    q: "What if I don't have much time?",
    a: "You're exactly who this was designed for. Even five or ten minutes can make a difference. Whether it's a quick journal prompt, an encouraging message, or a monthly workshop, you can participate at your own pace.",
  },
  {
    q: 'What makes Energize Your Vibe different?',
    a: "This isn't about becoming someone else. It's about becoming more you. Less pressure. Less comparison. More connection. More tools. More encouragement. More laughter. More life.",
  },
  {
    q: "What if I don't feel alone or like I need help?",
    a: "Wonderful. This community isn't built around fixing women. It's built around helping women grow, reconnect with themselves, and create lives they genuinely enjoy. Some come for healing. Others come for friendship, accountability, purpose, or simply because they want more joy in their everyday life. You don't have to be falling apart to deserve support. Come make more friends, contribute your energy to the community, lift others up, and allow yourself to be cheered on and empowered even more!",
  },
  {
    q: 'Can I invite a friend?',
    a: 'Absolutely! The more the merrier! Friends who play & grow together, stay together!',
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
