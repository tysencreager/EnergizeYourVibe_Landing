import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Sparkles, FileText, Download, ImageIcon } from 'lucide-react';
import Blob from '../components/Blob.jsx';
import Sunburst from '../components/Sunburst.jsx';
import { pillars, pillarColorClasses } from '../data/pillars.js';
import { pillarResources } from '../data/library.js';
import { supabase } from '../lib/supabase.js';

const SIGNED_URL_TTL = 60 * 60; // 1 hour

export default function PortalPillar() {
  const { pillarKey } = useParams();
  const pillar = pillars.find((p) => p.key === pillarKey);
  const resources = pillar ? pillarResources(pillar.key) : [];

  // Map of storage path -> inline signed URL (for image previews).
  const [previews, setPreviews] = useState({});

  useEffect(() => {
    if (!pillar || resources.length === 0) return;
    let cancelled = false;
    const paths = resources.map((r) => `${pillar.key}/${r.file}`);
    supabase.storage
      .from('library')
      .createSignedUrls(paths, SIGNED_URL_TTL)
      .then(({ data }) => {
        if (cancelled || !data) return;
        const map = {};
        data.forEach((entry) => {
          if (entry.signedUrl && !entry.error) map[entry.path] = entry.signedUrl;
        });
        setPreviews(map);
      });
    return () => {
      cancelled = true;
    };
  }, [pillar?.key]);

  if (!pillar) {
    return <Navigate to="/portal" replace />;
  }

  const palette = pillarColorClasses[pillar.color] ?? pillarColorClasses.pink;

  async function handleDownload(resource) {
    const path = `${pillar.key}/${resource.file}`;
    const { data, error } = await supabase.storage
      .from('library')
      .createSignedUrl(path, 60, { download: resource.file });
    if (error || !data?.signedUrl) return;
    const a = document.createElement('a');
    a.href = data.signedUrl;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

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
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/30 backdrop-blur-md text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white">
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

      {/* RESOURCES */}
      <section className="relative py-20 md:py-24 px-5 md:px-6 bg-soft-dawn overflow-hidden">
        <Blob tone="pink" size="lg" className="-top-20 -right-20" opacity={15} />

        <div className="max-w-5xl mx-auto relative z-10">
          {resources.length > 0 ? (
            <>
              <div className="text-center mb-12 md:mb-16">
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-magenta mb-3">
                  Your resources
                </p>
                <h2 className="text-3xl md:text-5xl font-display text-gray-900 leading-tight">
                  {pillar.name} <i className="text-pink">library.</i>
                </h2>
                <p className="text-gray-600 text-base md:text-lg font-medium mt-5 max-w-xl mx-auto">
                  Guides, prompts, and worksheets to practice this pillar. Tap any card to
                  download and print your copy.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                {resources.map((resource) => {
                  const path = `${pillar.key}/${resource.file}`;
                  return (
                    <ResourceCard
                      key={resource.file}
                      resource={resource}
                      palette={palette}
                      previewUrl={previews[path]}
                      onDownload={() => handleDownload(resource)}
                    />
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center max-w-xl mx-auto">
              <span className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${palette.chip} mb-6`}>
                <Sparkles size={30} strokeWidth={1.5} />
              </span>
              <h2 className="text-3xl md:text-4xl font-display text-gray-900 leading-tight mb-4">
                {pillar.name} resources are <i className="text-pink">on the way.</i>
              </h2>
              <p className="text-gray-600 text-base md:text-lg font-medium">
                Jenn is adding guides, prompts, and worksheets for this pillar now. Check
                back soon, sister — and explore the pillars that are ready in the meantime.
              </p>
              <Link
                to="/portal"
                className="inline-flex items-center gap-2 mt-8 text-magenta font-bold uppercase tracking-widest text-xs hover:text-pink transition-colors"
              >
                <ArrowLeft size={14} strokeWidth={2} /> Back to portal
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ResourceCard({ resource, palette, previewUrl, onDownload }) {
  const isImage = resource.kind === 'image';

  return (
    <button
      type="button"
      onClick={onDownload}
      className="group text-left bento-card glass border-2 border-pink/15 overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all"
    >
      {/* Preview */}
      <div className="relative aspect-[4/5] bg-white overflow-hidden border-b border-pink/10">
        {isImage && previewUrl ? (
          <img
            src={previewUrl}
            alt={resource.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-soft-dawn">
            <span className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${palette.chip}`}>
              {isImage ? (
                <ImageIcon size={30} strokeWidth={1.5} />
              ) : (
                <FileText size={30} strokeWidth={1.5} />
              )}
            </span>
          </div>
        )}
        {!isImage && (
          <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-[0.2em] bg-white/90 text-magenta px-2.5 py-1 rounded-full shadow-sm">
            PDF
          </span>
        )}
      </div>

      {/* Meta */}
      <div className="p-5 flex items-center justify-between gap-3">
        <h3 className="font-display text-lg text-gray-900 leading-tight">{resource.title}</h3>
        <span
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${palette.bg} text-white shrink-0 shadow-md group-hover:scale-110 transition-transform`}
          aria-hidden="true"
        >
          <Download size={17} strokeWidth={2} />
        </span>
      </div>
    </button>
  );
}
