import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  // Don't throw - that would crash the entire app and blank the marketing
  // pages. Log loudly so the misconfiguration is obvious in DevTools, and
  // let auth-dependent UI render its own "not configured" state.
  // eslint-disable-next-line no-console
  console.error(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
    'Auth and the member portal will not work until both are set. ' +
    'For local dev, add them to .env.local. ' +
    'For Cloudflare Pages, set them under Settings → Environment variables.'
  );
}

// Pass safe placeholders when unconfigured so createClient doesn't throw at
// module load. Any actual API call will fail with a clear Supabase error.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
