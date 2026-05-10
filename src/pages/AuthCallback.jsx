import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase.js';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let cancelled = false;

    async function finish() {
      // Supabase JS auto-detects the session in the URL when detectSessionInUrl
      // is true. We just need to wait until it has parsed it.
      const { data, error } = await supabase.auth.getSession();
      if (cancelled) return;

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.session) {
        const next = params.get('next') || '/portal';
        navigate(next, { replace: true });
      } else {
        // Either the link was invalid/expired or it's still being parsed.
        // Give Supabase one tick to finish, then bail to /login if no session.
        setTimeout(async () => {
          const retry = await supabase.auth.getSession();
          if (cancelled) return;
          if (retry.data.session) {
            const next = params.get('next') || '/portal';
            navigate(next, { replace: true });
          } else {
            setErrorMessage('That sign-in link has expired or is invalid. Please request a new one.');
          }
        }, 500);
      }
    }

    finish();
    return () => {
      cancelled = true;
    };
  }, [navigate, params]);

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-5 py-24 bg-soft-dawn">
      <div className="text-center max-w-md">
        {errorMessage ? (
          <>
            <h1 className="text-2xl md:text-3xl font-display text-gray-900 mb-3">
              Something went wrong.
            </h1>
            <p className="text-gray-600 font-medium mb-6">{errorMessage}</p>
            <button
              onClick={() => navigate('/login', { replace: true })}
              className="inline-flex items-center gap-3 bg-magenta text-white py-3 px-6 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-pink transition-colors shadow-lg"
            >
              Back to sign in
            </button>
          </>
        ) : (
          <p className="text-magenta font-medium">Signing you in…</p>
        )}
      </div>
    </section>
  );
}
