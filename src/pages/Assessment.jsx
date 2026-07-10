import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, RotateCcw, Printer, CloudUpload } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { pillars, pillarColorClasses } from '../data/pillars.js';
import {
  assessmentScale,
  assessmentPillars,
  bandForScore,
} from '../data/assessment.js';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../hooks/useAuth.jsx';

// Look up the marketing pillar (name, subtitle, color) by key.
const pillarMeta = Object.fromEntries(pillars.map((p) => [p.key, p]));

const bandToneClasses = {
  strong: 'bg-pink/10 text-magenta border-pink/25',
  growing: 'bg-gold/20 text-[#8a5a00] border-gold/40',
  attention: 'bg-orange/10 text-orange border-orange/30',
};

// Every statement flattened into one sequence for the card-by-card flow.
const flatStatements = assessmentPillars.flatMap((pillar) =>
  pillar.statements.map((text, statementIndex) => ({
    pillarKey: pillar.key,
    statementIndex,
    text,
    perPillarCount: pillar.statements.length,
  }))
);
const totalStatements = flatStatements.length;

// Build the display shape (totals, percentages, bands) from stored per-pillar
// totals — used both for a fresh submission and a result loaded from Supabase.
function resultsFromScores(scores) {
  const perPillar = assessmentPillars.map((pillar) => ({
    key: pillar.key,
    total: scores[pillar.key] ?? 0,
  }));
  const grandTotal = perPillar.reduce((s, p) => s + p.total, 0);
  return perPillar.map((p) => ({
    ...p,
    percent: grandTotal ? Math.round((p.total / grandTotal) * 100) : 0,
    band: bandForScore(p.total),
  }));
}

function focusKeysFromResults(results) {
  const sorted = [...results].sort((a, b) => a.total - b.total);
  const lowest = sorted[0]?.total;
  return sorted.filter((p) => p.total === lowest).slice(0, 2).map((p) => p.key);
}

// The 1–5 buttons grow with the rating so the scale reads at a glance.
const scaleSizes = [
  'w-10 h-10 text-sm',
  'w-11 h-11 text-sm',
  'w-12 h-12 text-base',
  'w-[3.25rem] h-[3.25rem] text-base',
  'w-14 h-14 text-lg',
];

export default function Assessment() {
  const { user } = useAuth();
  // answers shape: { [pillarKey]: { [statementIndex]: 1..5 } }
  const [answers, setAnswers] = useState({});
  const [started, setStarted] = useState(false);
  // current ranges 0..totalStatements; the final value shows the completion card.
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  // Latest saved result from Supabase: { scores, created_at } | null
  const [savedResult, setSavedResult] = useState(null);
  const [saveStatus, setSaveStatus] = useState(null); // null | saving | saved | error
  const advanceTimer = useRef(null);

  // Load the member's most recent saved result so returning visitors see it
  // without retaking anything.
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    supabase
      .from('assessment_results')
      .select('scores, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!cancelled && !error && data) setSavedResult(data);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

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

  const currentAnswer =
    current < totalStatements
      ? answers[flatStatements[current].pillarKey]?.[
          flatStatements[current].statementIndex
        ]
      : undefined;

  function goTo(index) {
    clearTimeout(advanceTimer.current);
    setCurrent(Math.max(0, Math.min(index, totalStatements)));
  }

  function setAnswer(value) {
    if (current >= totalStatements) return;
    const { pillarKey, statementIndex } = flatStatements[current];
    setAnswers((prev) => ({
      ...prev,
      [pillarKey]: { ...(prev[pillarKey] ?? {}), [statementIndex]: value },
    }));
    // A beat to see the selection land, then flow to the next statement.
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => {
      setCurrent((c) => Math.min(c + 1, totalStatements));
    }, 280);
  }

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  // Keyboard flow: 1–5 to answer, arrows to move between statements.
  useEffect(() => {
    if (!started || submitted) return;
    function onKey(e) {
      if (e.target.closest('input, textarea')) return;
      if (e.key >= '1' && e.key <= '5' && current < totalStatements) {
        setAnswer(Number(e.key));
      } else if (e.key === 'ArrowLeft') {
        goTo(current - 1);
      } else if (e.key === 'ArrowRight' && currentAnswer !== undefined) {
        goTo(current + 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  async function handleSubmit() {
    if (!allAnswered) {
      // Jump back to the first unanswered statement.
      const firstMissing = flatStatements.findIndex(
        (s) => answers[s.pillarKey]?.[s.statementIndex] === undefined
      );
      if (firstMissing !== -1) goTo(firstMissing);
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Save to the member's profile so results survive beyond this visit.
    if (user) {
      const scores = Object.fromEntries(results.map((r) => [r.key, r.total]));
      setSaveStatus('saving');
      const { error } = await supabase
        .from('assessment_results')
        .insert({ user_id: user.id, scores });
      if (error) {
        setSaveStatus('error');
      } else {
        setSaveStatus('saved');
        setSavedResult({ scores, created_at: new Date().toISOString() });
      }
    }
  }

  function handleRetake() {
    setAnswers({});
    setStarted(true);
    setCurrent(0);
    setSubmitted(false);
    setSaveStatus(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-44 md:pb-20 px-5 md:px-6 bg-animated-warm overflow-hidden grain print:hidden">
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
            <Results
              results={results}
              focusKeys={focusKeys}
              onRetake={handleRetake}
              takenAt={new Date().toISOString()}
              saveStatus={saveStatus}
            />
          ) : savedResult && !started ? (
            <Results
              results={resultsFromScores(savedResult.scores)}
              focusKeys={focusKeysFromResults(resultsFromScores(savedResult.scores))}
              onRetake={handleRetake}
              takenAt={savedResult.created_at}
              saveStatus="saved"
            />
          ) : !started ? (
            <IntroCard onStart={() => setStarted(true)} />
          ) : (
            <>
              <ProgressBar answers={answers} answeredCount={answeredCount} />

              {current < totalStatements ? (
                <QuestionCard
                  key={current}
                  entry={flatStatements[current]}
                  value={currentAnswer}
                  onAnswer={setAnswer}
                />
              ) : (
                <CompletionCard
                  allAnswered={allAnswered}
                  onSubmit={handleSubmit}
                  onBack={() => goTo(totalStatements - 1)}
                />
              )}

              {current < totalStatements && (
                <div className="flex items-center justify-between mt-8">
                  <button
                    type="button"
                    onClick={() => goTo(current - 1)}
                    disabled={current === 0}
                    className="inline-flex items-center gap-2 text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ArrowLeft size={14} strokeWidth={2} /> Back
                  </button>
                  <p className="hidden sm:block text-[11px] text-gray-400 font-medium">
                    Tip: press 1–5 to answer
                  </p>
                  <button
                    type="button"
                    onClick={() => goTo(current + 1)}
                    disabled={currentAnswer === undefined}
                    className="inline-flex items-center gap-2 text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next <ArrowRight size={14} strokeWidth={2} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

function IntroCard({ onStart }) {
  return (
    <div className="bento-card glass border-2 border-pink/20 p-7 sm:p-10 text-center">
      <h2 className="text-2xl md:text-3xl font-display text-gray-900 mb-3">
        How it <i className="text-pink">works.</i>
      </h2>
      <p className="text-gray-700 font-medium leading-relaxed mb-6 max-w-xl mx-auto">
        You’ll see one statement at a time — {totalStatements} in all, a quick minute or
        two per pillar. Rate how true each one feels for you right now. No overthinking;
        your first instinct is usually the honest one.
      </p>
      <ul className="inline-grid sm:grid-cols-2 gap-x-10 gap-y-2 text-left mb-8">
        {assessmentScale.map((s) => (
          <li key={s.value} className="flex items-center gap-3 text-sm font-medium text-gray-700">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-pink/10 text-magenta font-bold shrink-0">
              {s.value}
            </span>
            {s.label}
          </li>
        ))}
      </ul>
      <div>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-3 bg-pink text-white py-4 px-10 rounded-full font-bold uppercase tracking-widest text-base hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)]"
        >
          Begin <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

function ProgressBar({ answers, answeredCount }) {
  return (
    <div className="mb-8">
      <div className="flex gap-1.5 mb-2">
        {assessmentPillars.map((pillar) => {
          const meta = pillarMeta[pillar.key];
          const palette = pillarColorClasses[meta.color] ?? pillarColorClasses.pink;
          const done = Object.keys(answers[pillar.key] ?? {}).length;
          const pct = (done / pillar.statements.length) * 100;
          return (
            <div
              key={pillar.key}
              className="flex-1 h-2 rounded-full bg-white/70 overflow-hidden"
              title={meta.name}
            >
              <div
                className={`h-full rounded-full ${palette.bg} transition-all duration-300`}
                style={{ width: `${pct}%` }}
              />
            </div>
          );
        })}
      </div>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-magenta text-right">
        {answeredCount} / {totalStatements}
      </p>
    </div>
  );
}

function QuestionCard({ entry, value, onAnswer }) {
  const meta = pillarMeta[entry.pillarKey];
  const palette = pillarColorClasses[meta.color] ?? pillarColorClasses.pink;

  return (
    <div
      className="bento-card glass border-2 border-pink/15 p-7 sm:p-10 text-center"
      style={{ animation: 'fade-up 0.35s ease both' }}
    >
      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
        <span
          className={`inline-block text-[10px] font-bold uppercase tracking-[0.3em] ${palette.chip} px-3 py-1.5 rounded-full`}
        >
          {meta.name} · {meta.subtitle}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
          {entry.statementIndex + 1} of {entry.perPillarCount}
        </span>
      </div>

      <p className="text-2xl md:text-[2rem] leading-snug font-display text-gray-900 mb-10 min-h-[4.5rem] flex items-center justify-center">
        {entry.text}
      </p>

      <div
        className="flex items-end justify-center gap-2 sm:gap-4"
        role="radiogroup"
        aria-label="How true is this for you?"
      >
        {assessmentScale.map((s, i) => {
          const selected = value === s.value;
          return (
            <button
              key={s.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onAnswer(s.value)}
              className="group flex flex-col items-center gap-2 w-14 sm:w-16"
            >
              <span
                className={`inline-flex items-center justify-center rounded-full font-bold border-2 transition-all duration-150 ${scaleSizes[i]} ${
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
  );
}

function CompletionCard({ allAnswered, onSubmit, onBack }) {
  return (
    <div
      className="bento-card glass border-2 border-pink/20 p-8 sm:p-12 text-center"
      style={{ animation: 'fade-up 0.35s ease both' }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink/10 mb-6">
        <Sparkles className="text-pink" size={32} strokeWidth={1.75} />
      </div>
      <h2 className="text-3xl md:text-4xl font-display text-gray-900 mb-3">
        That’s all <i className="text-pink">{totalStatements} of them.</i>
      </h2>
      <p className="text-gray-700 font-medium leading-relaxed mb-8 max-w-md mx-auto">
        {allAnswered
          ? 'Beautifully done. Ready to see where your energy is thriving — and where it’s asking for attention?'
          : 'Almost there — a few statements are still unanswered. We’ll take you back to the first one.'}
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-3 bg-pink text-white py-5 px-10 rounded-full font-bold uppercase tracking-widest text-base md:text-lg hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)]"
        >
          {allAnswered ? 'See my results' : 'Finish the rest'}
        </button>
        <button
          type="button"
          onClick={onBack}
          className="text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors"
        >
          Review answers
        </button>
      </div>
    </div>
  );
}

function Results({ results, focusKeys, onRetake, takenAt, saveStatus }) {
  const maxTotal = 40;
  const takenDate = takenAt
    ? new Date(takenAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;

  return (
    <div>
      {/* Print-only letterhead */}
      <div className="hidden print:block text-center mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-magenta">
          Energize Your Vibe
        </p>
        <p className="text-sm text-gray-600 font-medium">
          7 Pillar Assessment results{takenDate ? ` · ${takenDate}` : ''}
        </p>
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink/10 border border-pink/20 text-[10px] font-bold uppercase tracking-[0.3em] mb-5 text-magenta print:hidden">
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
        {takenDate && (
          <p className="inline-flex items-center gap-2 mt-5 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 bg-white/70 border border-pink/15 rounded-full px-4 py-2 print:hidden">
            Taken {takenDate}
            {saveStatus === 'saved' && (
              <span className="inline-flex items-center gap-1 text-magenta">
                <CloudUpload size={13} strokeWidth={2} /> Saved to your profile
              </span>
            )}
            {saveStatus === 'saving' && <span className="text-gray-400">Saving…</span>}
            {saveStatus === 'error' && (
              <span className="text-orange">Couldn’t save — print a copy below</span>
            )}
          </p>
        )}
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

      <div className="text-center space-y-5">
        <p className="text-gray-700 font-medium max-w-xl mx-auto leading-relaxed">
          This isn’t about being perfect — it’s about awareness. When you know what needs
          support, you can actually do something about it. That’s how you start to energize
          your vibe.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-3 bg-magenta text-white py-3.5 px-7 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-pink transition-colors shadow-lg"
          >
            <Printer size={15} strokeWidth={2} /> Save as PDF / Print
          </button>
          <button
            type="button"
            onClick={onRetake}
            className="inline-flex items-center gap-2 text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors"
          >
            <RotateCcw size={14} strokeWidth={2} /> Retake the assessment
          </button>
        </div>
      </div>
    </div>
  );
}
