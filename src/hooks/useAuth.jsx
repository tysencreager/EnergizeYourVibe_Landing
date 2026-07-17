import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.js';

const AuthContext = createContext({
  session: null,
  user: null,
  loading: true,
  membershipStatus: null,
  refreshMembership: async () => null,
  signOut: async () => {},
});

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  // Re-fetchable so pages can poll while the Stripe webhook catches up
  // (a member who signs in seconds after paying may briefly read 'none').
  const refreshMembership = useCallback(async () => {
    if (!session?.user) {
      setMembershipStatus(null);
      return null;
    }
    const { data } = await supabase
      .from('profiles')
      .select('membership_status')
      .eq('user_id', session.user.id)
      .maybeSingle();
    const status = data?.membership_status ?? 'none';
    setMembershipStatus(status);
    return status;
  }, [session?.user?.id]);

  useEffect(() => {
    refreshMembership();
  }, [refreshMembership]);

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    membershipStatus,
    refreshMembership,
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
