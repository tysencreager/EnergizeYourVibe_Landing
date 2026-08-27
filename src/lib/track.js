// Funnel event tracking.
//
// The site intentionally has no analytics provider installed (Jenn's call,
// Aug 2026). These helpers mark the funnel's conversion points so that when
// a provider is added later, events start flowing without touching the
// funnel components:
//
//   - Google Analytics 4: add the gtag snippet to index.html — done.
//   - GTM: add the container snippet — events land on window.dataLayer.
//   - Plausible: add the script with the custom-events extension — done.
//
// Until then every call is a silent no-op.
//
// Funnel events fired by the Vibe Reset funnel:
//   vibe_reset_cta_click        homepage promo CTA clicked
//   vibe_reset_form_view        opt-in form scrolled into view (once/page)
//   vibe_reset_signup           backend confirmed the lead was created
//   vibe_reset_download         "Open my Vibe Reset" clicked
//   vibe_reset_membership_click membership CTA clicked from the funnel
//
// Other conversion events:
//   book_call_request           homepage "book a free call" form submitted

export function track(event, data = {}) {
  try {
    if (typeof window === 'undefined') return;
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, data);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...data });
    } else if (typeof window.plausible === 'function') {
      window.plausible(event, { props: data });
    }
  } catch {
    /* analytics must never break the page */
  }
}

// Fire an event at most once per page load (guards re-renders and
// re-triggered intersection observers).
const fired = new Set();

export function trackOnce(event, data = {}) {
  if (fired.has(event)) return;
  fired.add(event);
  track(event, data);
}
