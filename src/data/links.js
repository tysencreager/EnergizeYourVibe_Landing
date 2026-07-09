// Stripe-hosted Payment Link for the Energize Your Vibe membership.
// $88/mo recurring subscription + one-time $45 Setup Fee (waived for
// Founding Members through July 31, 2026 — confirm the Payment Link matches).
//
// Driven by VITE_STRIPE_CHECKOUT_URL so we can point local dev / Cloudflare
// Preview at the TEST-mode Payment Link, and Cloudflare Production at the
// LIVE-mode Payment Link. The hardcoded fallback is the live URL so a
// missing env var in production is safe (degrades to working live checkout).
export const CHECKOUT_URL =
  import.meta.env.VITE_STRIPE_CHECKOUT_URL ||
  'https://buy.stripe.com/5kQbJ0cwKd0bc3ic6k87K00';

export const CONTACT_EMAIL = 'jenn@energizeyourvibe.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/energizeyourvibe';

// Formspree endpoint for the membership waitlist form on /membership.
export const WAITLIST_FORM_ENDPOINT = 'https://formspree.io/f/mykoegpy';
