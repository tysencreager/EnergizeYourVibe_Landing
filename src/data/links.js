// Stripe-hosted Payment Link for the Energize Your Vibe membership.
// $88/mo recurring subscription, no sign-up fee for now (a one-time $45
// Setup Fee gets added once Founding Member enrollment closes — confirm
// the Payment Link matches).
//
// Driven by VITE_STRIPE_CHECKOUT_URL so we can point local dev / Cloudflare
// Preview at the TEST-mode Payment Link, and Cloudflare Production at the
// LIVE-mode Payment Link. The hardcoded fallback is the live URL so a
// missing env var in production is safe (degrades to working live checkout).
export const CHECKOUT_URL =
  import.meta.env.VITE_STRIPE_CHECKOUT_URL ||
  'https://buy.stripe.com/4gM7sMgDy00a5v3fCR4wM00';

export const CONTACT_EMAIL = 'jenn@energizeyourvibe.com';
export const INSTAGRAM_URL = 'https://www.instagram.com/energizeyourvibe';
export const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61575276073421';

// Formspree endpoint for the membership waitlist form on /membership.
export const WAITLIST_FORM_ENDPOINT = 'https://formspree.io/f/mykoegpy';

// --- Free 10-Minute Vibe Reset lead funnel -----------------------------------

// The downloadable freebie. Replace the file at public/assets/ with the final
// designed PDF (same filename) — no code changes needed.
export const VIBE_RESET_PDF_URL = '/assets/10-minute-vibe-reset.pdf';

// Pages Function that adds the lead to MailerLite (see functions/api/).
export const VIBE_RESET_SIGNUP_ENDPOINT = '/api/vibe-reset-signup';

// Flip to true once the MailerLite "Vibe Reset" delivery automation is live
// (see emails/vibe-reset-sequence.md) so the thank-you page can honestly say
// "we've also sent a copy to your inbox."
export const VIBE_RESET_EMAIL_DELIVERY_LIVE = true;
