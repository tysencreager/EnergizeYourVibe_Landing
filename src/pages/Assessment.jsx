import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, RotateCcw } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { pillars, pillarColorClasses } from '../data/pillars.js';
import {
  assessmentScale,
  assessmentPillars,
  bandForScore,
} from '../data/assessment.js';

// Look up the marketing pillar (name, subtitle, color) by key.
const pillarMeta = Object.fromEntries(pillars.map((p) => [p.key, p]));

const bandToneClasses = {
  strong: 'bg-pink/10 text-magenta border-pink/25',
  growing: 'bg-gold/20 text-[#8a5a00] border-gold/40',
  attention: 'bg-orange/10 text-orange border-orange/30',
};

export default function Assessment() {
  // answers shape: { [pillarKey]: { [statementIndex]: 1..5 } }
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const totalStatements = assessmentPillars.reduce(
    (sum, p) => sum + p.statements.length,
    0
  );
  const answeredCount = useMemo(
    () =>
      Object.values(answers).reduce(
        (sum, pillar) => sum + Object.keys(pillar).length,
        0
      ),
    [answers]
  );
  const allAnswered = answeredCount === totalStatements;

  // Per-pillar totals + grand total once we have answers.
  const results = useMemo(() => {
    const perPillar = assessmentPillars.map((pillar) => {
      const given = answers[pillar.key] ?? {};
      const total = Object.values(given).reduce((s, v) => s + v, 0);
      return { key: pillar.key, total };
    });
    const grandTotal = perPillar.reduce((s, p) => s + p.total, 0);
    return perPillar.map((p) => ({
      ...p,
      percent: grandTotal ? Math.round((p.total / grandTotal) * 100) : 0,
      band: bandForScore(p.total),
    }));
  }, [answers]);

  // Lowest 1–2 pillars to focus on first.
  const focusKeys = useMemo(() => {
    const sorted = [...results].sort((a, b) => a.total - b.total);
    const lowest = sorted[0]?.total;
    return sorted.filter((p) => p.total === lowest).slice(0, 2).map((p) => p.key);
  }, [results]);

  function setAnswer(pillarKey, statementIndex, value) {
    setAnswers((prev) => ({
      ...prev,
      [pillarKey]: { ...(prev[pillarKey] ?? {}), [statementIndex]: value },
    }));
  }

  function handleSubmit() {
    if (!allAnswered) {
      // Jump to the first unanswered statement so it's obvious what's left.
      const firstMissing = document.querySelector('[data-unanswered="true"]');
      firstMissing?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleReset() {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-44 md:pb-20 px-5 md:px-6 bg-animated-warm overflow-hidden grain">
        <Sunburst
          className="absolute -right-32 -top-32 w-[520px] h-[520px] opacity-20"
          strokeColor="rgba(255,255,255,0.6)"
        />
        <Blob tone="magenta" size="lg" className="-bottom-20 -left-20" opacity={25} slow />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            to="/portal"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} /> Back to portal
          </Link>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white">
              <Sparkles size={14} strokeWidth={1.75} className="text-sun" />
              7 Pillar Assessment
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-5 md:mb-6 drop-shadow-md">
              Where is your energy <span className="font-serif italic text-sun">most supported?</span>
            </h1>

            <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed">
              Rate each statement honestly. At the end you’ll see where your energy is
              thriving — and where it may be asking for a little more attention.
            </p>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="relative py-16 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
        <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={15} />

        <div className="max-w-3xl mx-auto relative z-10">
          {submitted ? (
            <Results results={results} focusKeys={focusKeys} onReset={handleReset} />
          ) : (
            <>
              {/* How it works */}
              <div className="bento-card glass border-2 border-pink/20 p-6 sm:p-8 mb-10">
                <h2 className="text-2xl md:text-3xl font-display text-gray-900 mb-3">
                  How it <i className="text-pink">works.</i>
                </h2>
                <p className="text-gray-700 font-medium leading-relaxed mb-4">
                  Rate each statement from 1 to 5 based on how true it feels for you right now.
                </p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {assessmentScale.map((s) => (
                    <li
                      key={s.value}
                      className="flex items-center gap-3 text-sm font-medium text-gray-700"
                    >
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-pink/10 text-magenta font-bold shrink-0">
                        {s.value}
                      </span>
                      {s.label}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pillar blocks */}
              <div className="space-y-8">
                {assessmentPillars.map((pillar) => (
                  <PillarBlock
                    key={pillar.key}
                    pillar={pillar}
                    answers={answers[pillar.key] ?? {}}
                    onAnswer={setAnswer}
                  />
                ))}
              </div>

              {/* Submit */}
              <div className="mt-10 text-center">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-magenta mb-4">
                  {answeredCount} / {totalStatements} answered
                </p>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="inline-flex items-center gap-3 bg-pink text-white py-5 px-10 rounded-full font-bold uppercase tracking-widest text-base md:text-lg hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  See my results
                </button>
                {!allAnswered && (
                  <p className="text-xs text-gray-500 font-medium mt-3">
                    Answer every statement to reveal your pillar breakdown.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function PillarBlock({ pillar, answers, onAnswer }) {
  const meta = pillarMeta[pillar.key];
  const palette = pillarColorClasses[meta.color] ?? pillarColorClasses.pink;

  return (
    <div className="bento-card glass border-2 border-pink/15 p-6 sm:p-8">
      <span
        className={`inline-block text-[10px] font-bold uppercase tracking-[0.3em] ${palette.chip} px-3 py-1.5 rounded-full mb-4`}
      >
        {meta.subtitle}
      </span>
      <h3 className="text-2xl md:text-3xl font-display text-gray-900">{meta.name}</h3>
      <p className="text-pink italic font-serif text-base mb-6">{pillar.focus}</p>

      <div className="space-y-5">
        {pillar.statements.map((statement, idx) => {
          const value = answers[idx];
          const unanswered = value === undefined;
          return (
            <div
              key={idx}
              data-unanswered={unanswered ? 'true' : undefined}
              className="border-b border-pink/10 pb-5 last:border-0 last:pb-0"
            >
              <p className="text-gray-800 font-medium mb-3">{statement}</p>
              <div className="flex flex-wrap gap-2">
                {assessmentScale.map((s) => {
                  const selected = value === s.value;
                  return (
                    <button
                      key={s.value}
                      type="button"
                      onClick={() => onAnswer(pillar.key, idx, s.value)}
                      aria-pressed={selected}
                      title={s.label}
                      className={`w-11 h-11 rounded-full font-bold text-sm border-2 transition-all ${
                        selected
                          ? 'bg-pink text-white border-pink shadow-md scale-105'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-pink/50'
                      }`}
                    >
                      {s.value}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Results({ results, focusKeys, onReset }) {
  const maxTotal = 40;

  return (
    <div>
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink/10 border border-pink/20 text-[10px] font-bold uppercase tracking-[0.3em] mb-5 text-magenta">
          <Sparkles size={14} strokeWidth={1.75} />
          Your results
        </div>
        <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight">
          Your <i className="text-pink">energy map.</i>
        </h2>
        <p className="text-gray-600 text-base md:text-lg font-medium mt-4 max-w-xl mx-auto">
          Here’s how your energy is distributed across the 7 pillars right now. Numbers
          shift as you grow — this is a snapshot, not a verdict.
        </p>
      </div>

      {/* Pillar score bars */}
      <div className="space-y-4 mb-12">
        {results.map((r) => {
          const meta = pillarMeta[r.key];
          const palette = pillarColorClasses[meta.color] ?? pillarColorClasses.pink;
          return (
            <div
              key={r.key}
              className="bento-card glass border-2 border-pink/15 p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                <div>
                  <h3 className="text-xl font-display text-gray-900">{meta.name}</h3>
                  <p className="text-xs font-medium text-gray-500">{meta.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-display text-magenta leading-none">
                    {r.total}
                    <span className="text-sm text-gray-400">/40</span>
                  </p>
                  <p className="text-xs font-bold text-gray-500">{r.percent}% of your energy</p>
                </div>
              </div>
              <div className="h-3 rounded-full bg-gray-100 overflow-hidden mb-3">
                <div
                  className={`h-full rounded-full ${palette.bg}`}
                  style={{ width: `${(r.total / maxTotal) * 100}%` }}
                />
              </div>
              <span
                className={`inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${
                  bandToneClasses[r.band.tone]
                }`}
              >
                {r.band.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* What to work on first */}
      <div className="bento-card glass border-2 border-pink/20 p-7 sm:p-9 mb-10 text-center">
        <h3 className="text-2xl md:text-3xl font-display text-gray-900 mb-3">
          Where to <i className="text-pink">start first.</i>
        </h3>
        <p className="text-gray-700 font-medium leading-relaxed mb-5 max-w-xl mx-auto">
          Instead of fixing everything at once, look at your lowest pillar
          {focusKeys.length > 1 ? 's' : ''}. Ask yourself: where do I feel the most
          drained, and what would make everything else feel easier if I improved it?
          That’s where you begin.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {focusKeys.map((key) => {
            const meta = pillarMeta[key];
            const palette = pillarColorClasses[meta.color] ?? pillarColorClasses.pink;
            return (
              <Link
                key={key}
                to={`/portal/${key}`}
                className={`inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest px-5 py-3 rounded-full ${palette.bg} text-white hover:opacity-90 transition-opacity shadow-md`}
              >
                Explore {meta.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="text-center space-y-4">
        <p className="text-gray-700 font-medium max-w-xl mx-auto leading-relaxed">
          This isn’t about being perfect — it’s about awareness. When you know what needs
          support, you can actually do something about it. That’s how you start to energize
          your vibe.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors"
        >
          <RotateCcw size={14} strokeWidth={2} /> Retake the assessment
        </button>
      </div>
    </div>
  );
}
