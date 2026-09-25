#!/usr/bin/env node
// Generates the social share image for each event in src/data/events.js:
// the picture that Facebook, iMessage, LinkedIn, Slack and X show when an
// event link is shared. functions/events/[slug].js serves it via the
// og:image tags; the file lands in public/assets/og/<slug>.jpg.
//
// Usage:
//   node scripts/og-images.mjs             # every event
//   node scripts/og-images.mjs fall-reset  # just one
//
// Needs Playwright with Chromium (npm i -D playwright && npx playwright
// install chromium), or a global install. Commit the generated JPGs.
//
// The card is plain HTML rendered at 1200x630 with the site's brand: the
// event title, date, where, price, the guest expert headshots, and the
// event's `image` (if any) as the backdrop. Tweak the template below and
// re-run to restyle every event at once.

import { readFile, mkdir } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { EVENTS, OG_IMAGE_SIZE, isInPerson, whereLabel } from '../src/data/events.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_DIR = path.join(PUBLIC_DIR, 'assets', 'og');
const CARD = { width: 1200, height: 630 };
const TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
};

const wanted = process.argv.slice(2);
const events = wanted.length ? EVENTS.filter((e) => wanted.includes(e.slug)) : EVENTS;
if (events.length === 0) {
  console.error(`No events matched: ${wanted.join(', ')}`);
  process.exit(1);
}

const { chromium } = await loadPlaywright();

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
});
// ignoreHTTPSErrors: the web fonts come from Google Fonts / cdnfonts, which
// may sit behind a corporate or sandbox proxy with its own certificate.
const context = await browser.newContext({
  viewport: CARD,
  deviceScaleFactor: OG_IMAGE_SIZE.width / CARD.width,
  ignoreHTTPSErrors: true,
});

await mkdir(OUT_DIR, { recursive: true });
for (const event of events) {
  const page = await context.newPage();
  await page.setContent(await template(event), { waitUntil: 'load' });
  // Ask for the exact faces the card uses; fonts.ready alone can resolve
  // before a lazily loaded face has been requested.
  await page.evaluate(() =>
    Promise.race([
      Promise.all(
        ['500 40px Recoleta', 'italic 600 40px "Playfair Display"', '800 14px Inter', '600 20px Inter'].map(
          (face) => document.fonts.load(face).catch(() => null)
        )
      ),
      new Promise((resolve) => setTimeout(resolve, 15000)),
    ])
  );
  await page.evaluate(() =>
    Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((resolve) => { img.onload = img.onerror = resolve; })
      )
    )
  );
  const fontsOk = await page.evaluate(
    () => document.fonts.check('40px Recoleta') && document.fonts.check('italic 40px "Playfair Display"')
  );
  const file = path.join(OUT_DIR, `${event.slug}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 88, clip: { x: 0, y: 0, ...CARD } });
  console.log(`${path.relative(ROOT, file)}  (${OG_IMAGE_SIZE.width}x${OG_IMAGE_SIZE.height}${fontsOk ? '' : ', brand fonts did not load: rendered with fallbacks'})`);
  await page.close();
}

await browser.close();

// --- Template ---------------------------------------------------------------

// Images are inlined as data URIs so the render needs no web server (and
// can't be tripped up by a proxy).
async function template(event) {
  const words = event.title.split(' ');
  const last = words.pop();
  const many = event.experts.length > 1;
  const where = isInPerson(event) ? whereLabel(event) : `${event.formatLabel} · ${event.lengthLabel}`;
  const logo = await dataUri('/logo.png');
  const experts = await Promise.all(
    event.experts.map(async (expert) => ({ ...expert, photo: await dataUri(expert.photo) }))
  );
  const backdrop = event.image
    ? `<div class="photo" style="background-image:url('${await dataUri(event.image.src)}')"></div><div class="wash"></div>`
    : `<div class="wash gradient"></div>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<link href="https://fonts.cdnfonts.com/css/recoleta" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&family=Playfair+Display:ital,wght@1,600&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: ${CARD.width}px; height: ${CARD.height}px; overflow: hidden; }
  body { position: relative; font-family: Inter, Arial, sans-serif; color: #fff; background: #B71556; }
  .photo { position: absolute; inset: 0; background-size: cover; background-position: center; }
  .wash { position: absolute; inset: 0;
    background: linear-gradient(90deg, rgba(183,21,86,.97) 0%, rgba(183,21,86,.92) 40%, rgba(183,21,86,.6) 66%, rgba(183,21,86,.3) 100%); }
  .wash.gradient { background: linear-gradient(130deg, #F8A232 0%, #F26B38 30%, #E22E64 62%, #B71556 100%); }
  .card { position: absolute; inset: 0; padding: 52px 64px; display: flex; align-items: center; gap: 44px; }
  .text { flex: 1 1 auto; min-width: 0; }
  .brand { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; }
  .brand img { width: 46px; height: 46px; border-radius: 50%; box-shadow: 0 4px 14px rgba(0,0,0,.25); }
  .brand span { font-size: 13px; font-weight: 800; letter-spacing: .32em; text-transform: uppercase; }
  .eyebrow { font-size: 14px; font-weight: 800; letter-spacing: .3em; text-transform: uppercase; color: #FDE08B; margin-bottom: 14px; }
  h1 { font-family: Recoleta, Georgia, serif; font-weight: 500; letter-spacing: -.02em; line-height: 1.02;
    font-size: ${many ? 58 : 68}px; text-shadow: 0 2px 14px rgba(0,0,0,.28); margin-bottom: 20px; }
  h1 em { font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: 600; color: #FDE08B; }
  .meta { font-size: 20px; font-weight: 600; line-height: 1.5; text-shadow: 0 1px 6px rgba(0,0,0,.25); }
  .meta strong { font-weight: 800; }
  .pills { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 24px; }
  .pill { border-radius: 999px; padding: 9px 16px; font-size: 13px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase;
    background: rgba(255,255,255,.16); border: 1.5px solid rgba(255,255,255,.45); backdrop-filter: blur(6px); }
  .pill.sun { background: #FDE08B; color: #B71556; border-color: #FDE08B; }
  .experts { display: flex; gap: 22px; flex: 0 0 auto; }
  .expert { width: ${many ? 236 : 300}px; }
  .frame { position: relative; }
  .frame::before { content: ''; position: absolute; inset: 0; transform: translate(12px, 12px); border-radius: 28px; background: rgba(253,224,139,.85); }
  .frame img { position: relative; display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: top; border-radius: 28px; border: 5px solid #fff; box-shadow: 0 18px 40px rgba(0,0,0,.35); }
  .name { text-align: center; margin-top: 18px; }
  .name small { display: block; font-size: 10px; font-weight: 800; letter-spacing: .3em; text-transform: uppercase; color: #FDE08B; margin-bottom: 4px; }
  .name b { display: block; font-family: Recoleta, Georgia, serif; font-weight: 500; font-size: ${many ? 22 : 26}px; }
  .name span { display: block; font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; opacity: .92; margin-top: 4px; }
</style>
</head>
<body>
  ${backdrop}
  <div class="card">
    <div class="text">
      <div class="brand"><img src="${logo}" alt="" /><span>Energize Your Vibe</span></div>
      <p class="eyebrow">${esc(event.series)}</p>
      <h1>${esc(words.join(' '))} <em>${esc(last)}</em></h1>
      <p class="meta"><strong>${esc(event.dateLabel)}</strong> · ${esc(event.timeLabel)}<br />${esc(where)}</p>
      <div class="pills"><span class="pill sun">${esc(event.priceLabel)}</span><span class="pill">${esc(event.audienceLabel)}</span></div>
    </div>
    <div class="experts">
      ${experts
        .map(
          (expert) => `<div class="expert">
        <div class="frame"><img src="${expert.photo}" alt="" /></div>
        <div class="name"><small>Guest Expert</small><b>${esc(expert.name)}</b><span>${esc(expert.role)}</span></div>
      </div>`
        )
        .join('')}
    </div>
  </div>
</body>
</html>`;
}

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// --- Helpers ----------------------------------------------------------------

async function loadPlaywright() {
  try {
    return await import('playwright');
  } catch {
    try {
      const globalRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
      return await import(path.join(globalRoot, 'playwright', 'index.mjs'));
    } catch {
      console.error('Playwright is not installed. Run: npm i -D playwright && npx playwright install chromium');
      process.exit(1);
    }
  }
}

// "/assets/x.jpg" (a public/ path, as used in events.js) -> data URI
async function dataUri(publicPath) {
  const file = path.join(PUBLIC_DIR, publicPath);
  const type = TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream';
  return `data:${type};base64,${(await readFile(file)).toString('base64')}`;
}
