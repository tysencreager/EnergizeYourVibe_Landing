import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, FileText, PlayCircle, BookOpen } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { pillars, pillarColorClasses } from '../data/pillars.js';

export default function PortalPillar() {
  const { pillarKey } = useParams();
  const pillar = pillars.find((p) => p.key === pillarKey);

  if (!pillar) {
    return <Navigate to="/portal" replace />;
  }

  const palette = pillarColorClasses[pillar.color] ?? pillarColorClasses.pink;

  return (
    <>
      {/* HERO */}
      <section className="relative pt-32 pb-14 md:pt-44 md:pb-20 px-5 md:px-6 bg-animated-warm overflow-hidden grain">
        <Sunburst
          className="absolute -right-32 -top-32 w-[520px] h-[520px] opacity-20"
          strokeColor="rgba(255,255,255,0.6)"
        />
        <Blob tone={pillar.color} size="lg" className="-bottom-20 -left-20" opacity={25} slow />

        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            to="/portal"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={2} /> Back to portal
          </Link>

          <div className="text-center">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white`}>
              <Sparkles size={14} strokeWidth={1.75} className="text-sun" />
              {pillar.subtitle}
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display text-white leading-tight mb-4 drop-shadow-md">
              {pillar.name}
            </h1>
            <p className="text-xl md:text-2xl text-sun font-serif italic mb-6">
              {pillar.tagline}
            </p>
            <p className="text-base md:text-lg text-white/95 font-medium max-w-2xl mx-auto leading-relaxed">
              {pillar.long}
            </p>
          </div>
        </div>
      </section>

      {/* RESOURCES — placeholder until real content is uploaded */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
        <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={15} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-3">
              Your resources
            </p>
            <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight">
              {pillar.name} <i className="text-pink">resources are on the way.</i>
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-medium mt-5 max-w-xl mx-auto">
              We’re uploading welcome videos, downloads, and course modules now. Check back soon, sister.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <PlaceholderCard
              icon={<PlayCircle size={28} strokeWidth={1.5} />}
              palette={palette}
              label="Welcome video"
              caption="A note from Jenn on this pillar."
            />
            <PlaceholderCard
              icon={<FileText size={28} strokeWidth={1.5} />}
              palette={palette}
              label="Downloadable PDFs"
              caption="Practices, prompts, and worksheets."
            />
            <PlaceholderCard
              icon={<BookOpen size={28} strokeWidth={1.5} />}
              palette={palette}
              label="Course modules"
              caption="Guided lessons to go deeper."
            />
          </div>
        </div>
      </section>
    </>
  );
}

function PlaceholderCard({ icon, label, caption, palette }) {
  return (
    <div className="bento-card glass border-2 border-pink/15 p-7 md:p-8 opacity-90">
      <span className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${palette.chip} mb-5`}>
        {icon}
      </span>
      <h3 className="text-xl md:text-2xl font-display text-gray-900 mb-2">{label}</h3>
      <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed mb-5">
        {caption}
      </p>
      <span className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">
        Coming soon
      </span>
    </div>
  );
}
