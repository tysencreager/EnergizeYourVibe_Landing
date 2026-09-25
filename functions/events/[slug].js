// Per-event social sharing tags for /events/<slug>.
//
// The site is a single-page app: every route serves the same index.html and
// the browser fills in titles client-side (src/hooks/usePageMeta.js). Social
// crawlers (Facebook, iMessage, LinkedIn, Slack, X) don't run JavaScript, so
// without this every event link would preview with the site-wide image and
// title from index.html. This Pages Function serves index.html for
// /events/<slug> with the <head> tags rewritten for that event: title,
// description, canonical URL, and the event's share image. Nothing else
// changes; the React app takes over as usual once it loads.
//
// Deployed automatically by Cloudflare Pages (functions/events/[slug].js
// matches exactly one path segment, so /events and /events/<slug>/thank-you
// are untouched). Unknown slugs and any failure fall through to the normal
// static response, so this can never take an event page down.
//
// Share images: public/assets/og/<slug>.jpg, generated with
// scripts/og-images.mjs (see emails/event-registrations.md).

import { getEvent, OG_IMAGE_SIZE } from '../../src/data/events.js';

export async function onRequestGet({ request, env, params, next }) {
  const event = getEvent(String(params.slug ?? ''));
  if (!event) return next();

  let page;
  try {
    // The ASSETS binding bypasses Functions, so this can't recurse.
    // "/" (not "/index.html") because Pages redirects index.html to /.
    page = await env.ASSETS.fetch(new URL('/', request.url).toString());
  } catch (err) {
    console.error('[events-og] could not load index.html:', err);
    return next();
  }
  if (!page.ok || !(page.headers.get('content-type') || '').includes('text/html')) {
    return next();
  }

  const origin = new URL(request.url).origin;
  const pageUrl = `${origin}/events/${event.slug}`;
  const title = `${event.title} | ${event.priceLabel} | Energize Your Vibe`;
  const shareTitle = `${event.title} · ${event.dateLabel}`;
  const description = event.summary;

  const content = (value) => ({
    element(el) {
      el.setAttribute('content', value);
    },
  });

  let rewriter = new HTMLRewriter()
    .on('title', {
      element(el) {
        el.setInnerContent(title);
      },
    })
    .on('meta[name="description"]', content(description))
    .on('meta[property="og:url"]', content(pageUrl))
    .on('meta[property="og:title"]', content(shareTitle))
    .on('meta[property="og:description"]', content(description))
    .on('meta[name="twitter:title"]', content(shareTitle))
    .on('meta[name="twitter:description"]', content(description));

  if (event.ogImage) {
    const imageUrl = `${origin}${event.ogImage.src}`;
    rewriter = rewriter
      .on('meta[property="og:image"]', content(imageUrl))
      .on('meta[property="og:image:secure_url"]', content(imageUrl))
      .on('meta[property="og:image:type"]', content('image/jpeg'))
      .on('meta[property="og:image:width"]', content(String(OG_IMAGE_SIZE.width)))
      .on('meta[property="og:image:height"]', content(String(OG_IMAGE_SIZE.height)))
      .on('meta[property="og:image:alt"]', content(event.ogImage.alt))
      .on('meta[name="twitter:image"]', content(imageUrl))
      .on('meta[name="twitter:image:alt"]', content(event.ogImage.alt));
  }

  return rewriter.transform(page);
}
