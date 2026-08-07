import { useEffect } from 'react';

const DEFAULT_TITLE = 'Energize Your Vibe | Empower Your Energy, Transform Your Life';

// Per-route document metadata for the SPA. Sets title, meta description,
// canonical URL, and robots on mount; restores the site defaults on unmount.
//
// Note: social crawlers (Facebook/iMessage) don't run JS, so Open Graph tags
// for every route come from index.html — this hook covers search engines and
// the browser tab.
export function usePageMeta({ title, description, canonical, noindex = false }) {
  useEffect(() => {
    const prevTitle = document.title;
    if (title) document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const prevDescription = metaDescription?.getAttribute('content');
    if (description && metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    let canonicalEl = null;
    if (canonical) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      canonicalEl.setAttribute('href', canonical);
      document.head.appendChild(canonicalEl);
    }

    let robotsEl = null;
    if (noindex) {
      robotsEl = document.createElement('meta');
      robotsEl.setAttribute('name', 'robots');
      robotsEl.setAttribute('content', 'noindex, nofollow');
      document.head.appendChild(robotsEl);
    }

    return () => {
      document.title = prevTitle || DEFAULT_TITLE;
      if (prevDescription && metaDescription) {
        metaDescription.setAttribute('content', prevDescription);
      }
      canonicalEl?.remove();
      robotsEl?.remove();
    };
  }, [title, description, canonical, noindex]);
}
