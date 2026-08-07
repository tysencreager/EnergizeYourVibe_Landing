import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  MessageSquareText,
  Sparkles,
  Feather,
  RotateCcw,
} from 'lucide-react';
import Blob from './Blob.jsx';
import Reveal from './Reveal.jsx';
import { pillars, pillarColorClasses } from '../data/pillars.js';
import { assessmentScale, assessmentPillars } from '../data/assessment.js';

/*
  A taste of the membership — sample texts, a peek inside the member
  library, and a mini sneak peek of the real 7 Pillar quiz.

  NOTE: The text-message bubbles below are placeholders written in Jenn's
  voice. When Jenn provides the real screenshot of an Energize Your Vibe
  text, drop it in /public/assets (e.g. eyv-text-screenshot.png) and swap
  the bubble markup inside <PhonePreview /> for the image.
*/

const sampleTexts = [
  {
    body: 'Good morning, sister ☀️ Before you check anything else today, check in with YOU. One deep breath. What’s one thing you’re grateful for right now?',
  },
  {
    body: 'Little reminder: you don’t have to earn rest. You’re allowed to slow down and still be proud of yourself. 💛',
  },
  {
    body: 'Vibe check! Tiny action for today: drink your water, step outside for 5 minutes, and say one kind thing to yourself in the mirror. That’s it. That’s the assignment. ✨',
  },
];

const sampleResource = {
  pillar: 'ALIGN',
  title: 'Morning Alignment · Journal Prompts',
  prompts: [
    'What does my energy need most today?',
    'What’s one thought I’m choosing on purpose this morning?',
    'Where can I give myself a little more grace today?',
  ],
};

// A handful of real statements from the 7 Pillar Assessment for the sneak
// peek — one each from three different pillars.
const previewStatements = [
  { pillarKey: 'align', text: assessmentPillars[0].statements[1] },
  { pillarKey: 'think', text: assessmentPillars[2].statements[2] },
  { pillarKey: 'connect', text: assessmentPillars[4].statements[1] },
];

const pillarMeta = Object.fromEntries(pillars.map((p) => [p.key, p]));
const totalAssessmentStatements = assessmentPillars.reduce(
  (sum, p) => sum + p.statements.length,
  0
);

export default function MembershipPreview() {
  return (
    <section id="preview" className="relative z-10 py-20 md:py-28 px-5 md:px-6 bg-soft-sunset overflow-hidden">
      <Blob tone="pink" size="lg" className="-top-24 -left-24" opacity={12} slow />
      <Blob tone="gold" size="md" className="bottom-20 -right-16" opacity={18} />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-14 md:mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-3">
            A taste of the membership
          </p>
          <h2 className="text-4xl md:text-6xl font-display text-gray-900 mb-5 leading-tight">
            Here’s a little <span className="font-serif italic text-pink font-semibold">preview, sister.</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Texts that lift you up, a library that grows with you, and a quiz that shows
            you where to begin. This is what being inside feels like.
          </p>
        </Reveal>

        {/* Row 1: texts + library resource */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10 items-stretch">
          <Reveal direction="right" delay={80} className="h-full">
            <PhonePreview />
          </Reveal>
          <Reveal direction="left" delay={160} className="h-full">
            <LibraryPreview />
          </Reveal>
        </div>

        {/* Row 2: quiz sneak peek */}
        <Reveal delay={120}>
          <QuizPreview />
        </Reveal>

        <div className="text-center mt-12">
          <Link
            to="/membership"
            className="inline-flex items-center gap-3 bg-pink text-white py-4 px-10 rounded-full font-bold uppercase tracking-widest text-sm md:text-base hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)]"
          >
            Experience It All Inside <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Texts sisters receive — phone mockup                              */
/* ---------------------------------------------------------------- */

function PhonePreview() {
  return (
    <div className="h-full flex flex-col">
      <BlockHeader
        icon={<MessageSquareText size={16} strokeWidth={1.75} />}
        eyebrow="Texts from the sisterhood"
        title={<>A cheerleader <i className="text-pink">in your pocket.</i></>}
        blurb="Uplifting texts land during the week — inspiration, self-love reminders, and simple ways to take action."
      />

      {/* Phone frame */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-[340px] bg-white rounded-[2.5rem] border-[6px] border-gray-900 shadow-2xl overflow-hidden flex flex-col">
          {/* Status/header bar */}
          <div className="bg-gray-50 border-b border-gray-200 px-5 pt-4 pb-3 text-center relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-1.5 w-16 h-1.5 rounded-full bg-gray-900" aria-hidden="true" />
            <div className="w-9 h-9 rounded-full bg-brand-gradient mx-auto mt-2 mb-1 flex items-center justify-center text-white font-display text-sm shadow-sm">
              EYV
            </div>
            <p className="text-[11px] font-bold text-gray-900 leading-tight">Energize Your Vibe</p>
            <p className="text-[9px] text-gray-400 font-medium">Text Message</p>
          </div>

          {/* Messages */}
          <div className="px-4 py-5 space-y-3 bg-white">
            <p className="text-center text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
              Today 8:08 AM
            </p>
            {sampleTexts.map((t, i) => (
              <div
                key={i}
                className="max-w-[85%] bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 text-[13px] leading-snug text-gray-800 font-medium"
              >
                {t.body}
              </div>
            ))}
            <p className="text-center text-[10px] text-gray-400 font-medium pt-1 pb-2">
              💬 Sample texts — yours arrive all week long
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Member library resource preview                                   */
/* ---------------------------------------------------------------- */

function LibraryPreview() {
  const alignPalette = pillarColorClasses[pillarMeta.align.color];

  return (
    <div className="h-full flex flex-col">
      <BlockHeader
        icon={<BookOpen size={16} strokeWidth={1.75} />}
        eyebrow="From the member library"
        title={<>Resources that <i className="text-pink">grow with you.</i></>}
        blurb="Guides, journal prompts, worksheets, and meditations for every pillar — new resources added regularly to your member portal."
      />

      {/* Worksheet-style card */}
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-[340px] bento-card bg-white border-2 border-gold/30 overflow-hidden flex flex-col shadow-xl">
          <div className={`${alignPalette.bg} px-6 py-4 text-white`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sun mb-1">
              {sampleResource.pillar} · Spiritual Wellness
            </p>
            <h4 className="font-display text-xl leading-tight">{sampleResource.title}</h4>
          </div>
          <div className="px-6 py-5 space-y-4 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Take five quiet minutes with yourself
            </p>
            {sampleResource.prompts.map((prompt, i) => (
              <div key={i} className="flex items-start gap-3">
                <Feather size={16} strokeWidth={1.75} className="text-gold shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 leading-snug mb-1.5">{prompt}</p>
                  <div className="border-b border-dashed border-gray-300" aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 pb-5">
            <p className="text-[10px] text-gray-400 font-medium text-center">
              📖 One page from the library — members unlock it all
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* 7 Pillar quiz sneak peek — real statements, tap to try            */
/* ---------------------------------------------------------------- */

function QuizPreview() {
  const [current, setCurrent] = useState(0);
  const [value, setValue] = useState(undefined);
  const [done, setDone] = useState(false);

  const entry = previewStatements[current];
  const meta = pillarMeta[entry.pillarKey];
  const palette = pillarColorClasses[meta.color] ?? pillarColorClasses.pink;

  function answer(v) {
    setValue(v);
    setTimeout(() => {
      if (current + 1 < previewStatements.length) {
        setCurrent(current + 1);
        setValue(undefined);
      } else {
        setDone(true);
      }
    }, 350);
  }

  function restart() {
    setCurrent(0);
    setValue(undefined);
    setDone(false);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-magenta bg-magenta/5 px-5 py-2.5 rounded-full border border-magenta/15">
          <Sparkles size={14} strokeWidth={1.75} className="text-pink" />
          Sneak peek · The 7 Pillar Quiz
        </p>
        <p className="text-gray-500 font-medium mt-4 max-w-xl mx-auto">
          Every member starts with the 7 Pillar Assessment — {totalAssessmentStatements} quick
          statements that map where your energy is thriving and where it’s asking for
          attention. Try a few real ones right now:
        </p>
      </div>

      <div className="bento-card glass border-2 border-pink/15 p-7 sm:p-10 text-center shadow-xl">
        {done ? (
          <div style={{ animation: 'fade-up 0.35s ease both' }}>
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-pink/10 mb-5">
              <Sparkles className="text-pink" size={28} strokeWidth={1.75} />
            </div>
            <h3 className="text-2xl md:text-3xl font-display text-gray-900 mb-3">
              And that’s just <i className="text-pink">a taste.</i>
            </h3>
            <p className="text-gray-700 font-medium leading-relaxed mb-7 max-w-md mx-auto">
              Members answer all {totalAssessmentStatements} statements across the 7 pillars and
              receive a personalized energy map — plus a growth roadmap showing exactly
              where to start first.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/membership"
                className="inline-flex items-center gap-3 bg-magenta text-white py-3.5 px-8 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-pink transition-colors shadow-lg"
              >
                Unlock the Full Quiz <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors"
              >
                <RotateCcw size={13} strokeWidth={2} /> Try again
              </button>
            </div>
          </div>
        ) : (
          <div key={current} style={{ animation: 'fade-up 0.35s ease both' }}>
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              <span
                className={`inline-block text-[10px] font-bold uppercase tracking-[0.3em] ${palette.chip} px-3 py-1.5 rounded-full`}
              >
                {meta.name} · {meta.subtitle}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {current + 1} of {previewStatements.length}
              </span>
            </div>

            <p className="text-xl md:text-[1.75rem] leading-snug font-display text-gray-900 mb-8 min-h-[3.5rem] flex items-center justify-center">
              {entry.text}
            </p>

            <div
              className="flex items-end justify-center gap-2 sm:gap-4"
              role="radiogroup"
              aria-label="How true is this for you?"
            >
              {assessmentScale.map((s) => {
                const selected = value === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => answer(s.value)}
                    className="group flex flex-col items-center gap-2 w-12 sm:w-16"
                  >
                    <span
                      className={`inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full font-bold text-sm sm:text-base border-2 transition-all duration-150 ${
                        selected
                          ? `${palette.bg} text-white border-transparent shadow-lg scale-110`
                          : 'bg-white text-gray-600 border-gray-200 group-hover:border-pink group-hover:text-magenta group-hover:-translate-y-1'
                      }`}
                    >
                      {s.value}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-semibold leading-tight transition-colors ${
                        selected ? 'text-magenta' : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    >
                      {s.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */

function BlockHeader({ icon, eyebrow, title, blurb }) {
  return (
    <div className="text-center mb-6">
      <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-pink mb-3">
        {icon}
        {eyebrow}
      </p>
      <h3 className="text-2xl md:text-3xl font-display text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm md:text-base font-medium max-w-sm mx-auto">{blurb}</p>
    </div>
  );
}
