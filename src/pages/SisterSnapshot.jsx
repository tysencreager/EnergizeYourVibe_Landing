import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, CheckCircle2, CloudUpload } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { snapshotIntro, snapshotSections } from '../data/snapshot.js';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../hooks/useAuth.jsx';

const inputClasses =
  'w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3 text-base text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:border-pink focus:ring-2 focus:ring-pink/20 transition-colors';

export default function SisterSnapshot() {
  const { user } = useAuth();
  const [answers, setAnswers] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [hasExisting, setHasExisting] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // null | saving | saved | error

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    supabase
      .from('sister_snapshots')
      .select('answers')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (!error && data?.answers) {
          setAnswers(data.answers);
          setHasExisting(true);
        }
        setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  function setAnswer(id, value) {
    setSaveStatus(null);
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function toggleChip(id, option) {
    setSaveStatus(null);
    setAnswers((prev) => {
      const current = Array.isArray(prev[id]) ? prev[id] : [];
      return {
        ...prev,
        [id]: current.includes(option)
          ? current.filter((o) => o !== option)
          : [...current, option],
      };
    });
  }

  async function handleSave() {
    if (!user || saveStatus === 'saving') return;
    setSaveStatus('saving');
    // Drop empty answers so the stored jsonb stays tidy.
    const cleaned = Object.fromEntries(
      Object.entries(answers).filter(([, v]) =>
        Array.isArray(v) ? v.length > 0 : String(v ?? '').trim() !== ''
      )
    );
    const { error } = await supabase
      .from('sister_snapshots')
      .upsert({ user_id: user.id, answers: cleaned });
    if (error) {
      setSaveStatus('error');
    } else {
      setSaveStatus('saved');
      setHasExisting(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
              <Heart size={14} strokeWidth={1.75} className="text-sun" />
              Sister Snapshot
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-5 md:mb-6 drop-shadow-md">
              Help us get to <span className="font-serif italic text-sun">know you.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/95 font-medium max-w-2xl mx-auto leading-relaxed">
              Every answer is optional — share as much or as little as you like. You can
              come back and update it anytime.
            </p>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="relative py-16 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
        <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={15} />

        <div className="max-w-3xl mx-auto relative z-10">
          {saveStatus === 'saved' && (
            <div className="mb-8 bento-card glass border-2 border-pink/25 p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink/10 mb-3">
                <CheckCircle2 className="text-pink" size={26} strokeWidth={1.75} />
              </div>
              <p className="font-display text-2xl text-gray-900 mb-1">
                Saved, <i className="text-pink">sister.</i>
              </p>
              <p className="text-gray-600 text-sm font-medium">
                Thank you for sharing your heart. You can come back and update your answers
                anytime.
              </p>
            </div>
          )}

          {/* Jenn's intro */}
          <div className="bento-card glass border-2 border-pink/20 p-6 sm:p-8 mb-10">
            <h2 className="text-2xl md:text-3xl font-display text-gray-900 mb-4">
              {snapshotIntro.title.replace('!', '')}
              <i className="text-pink">!</i>
            </h2>
            {snapshotIntro.body.map((p, i) => (
              <p
                key={i}
                className="text-gray-700 font-medium leading-relaxed mb-3 last:mb-0 text-sm md:text-base"
              >
                {p}
              </p>
            ))}
            {hasExisting && loaded && (
              <p className="mt-4 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-magenta bg-pink/5 border border-pink/15 rounded-full px-4 py-2">
                <CloudUpload size={13} strokeWidth={2} /> You have saved answers — edit away
              </p>
            )}
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {snapshotSections.map((section) => (
              <div key={section.title} className="bento-card glass border-2 border-pink/15 p-6 sm:p-8">
                <h3 className="text-xl md:text-2xl font-display text-gray-900 mb-6">
                  {section.title}
                </h3>
                <div className={section.twoColumn ? 'grid sm:grid-cols-2 gap-5' : 'space-y-5'}>
                  {section.fields.map((field) => (
                    <SnapshotField
                      key={field.id}
                      field={field}
                      value={answers[field.id]}
                      onChange={setAnswer}
                      onToggleChip={toggleChip}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Save */}
          <div className="mt-10 text-center">
            {saveStatus === 'error' && (
              <p className="mb-4 text-sm font-semibold text-magenta bg-magenta/5 border border-magenta/20 rounded-2xl px-4 py-3">
                Something went wrong saving your answers. Please try again — nothing you
                typed has been lost.
              </p>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saveStatus === 'saving'}
              className="inline-flex items-center gap-3 bg-pink text-white py-5 px-12 rounded-full font-bold uppercase tracking-widest text-base md:text-lg hover:bg-magenta transition-colors shadow-[0_10px_30px_rgba(226,46,100,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saveStatus === 'saving' ? 'Saving…' : hasExisting ? 'Save my updates' : 'Save my snapshot'}
            </button>
            <p className="text-xs text-gray-500 font-medium mt-4 max-w-md mx-auto">
              Your answers are private — only Jenn and the EYV team can see them. Nothing is
              shared with other members or third parties.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function SnapshotField({ field, value, onChange, onToggleChip }) {
  const label = (
    <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-magenta mb-2">
      {field.label}
    </span>
  );

  if (field.type === 'textarea') {
    return (
      <label className="block">
        {label}
        <textarea
          rows={field.rows ?? 3}
          value={value ?? ''}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          className={`${inputClasses} resize-y`}
        />
        {field.helper && (
          <span className="block text-xs text-gray-500 font-medium mt-1.5">{field.helper}</span>
        )}
      </label>
    );
  }

  if (field.type === 'select') {
    return (
      <label className="block">
        {label}
        <select
          value={value ?? ''}
          onChange={(e) => onChange(field.id, e.target.value)}
          className={`${inputClasses} appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22%3E%3Cpath d=%22M1 1l5 5 5-5%22 stroke=%22%23B71556%22 stroke-width=%222%22 fill=%22none%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center]`}
        >
          <option value="">Choose…</option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === 'chips') {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div>
        {label}
        <div className="flex flex-wrap gap-2">
          {field.options.map((o) => {
            const active = selected.includes(o);
            return (
              <button
                key={o}
                type="button"
                aria-pressed={active}
                onClick={() => onToggleChip(field.id, o)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors ${
                  active
                    ? 'bg-pink text-white border-pink'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-pink/50'
                }`}
              >
                {o}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <label className="block">
      {label}
      <input
        type="text"
        value={value ?? ''}
        onChange={(e) => onChange(field.id, e.target.value)}
        placeholder={field.placeholder}
        className={inputClasses}
      />
    </label>
  );
}
