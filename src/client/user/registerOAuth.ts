import { supabase } from "@/lib/supabaseClient";
import { OAuthType } from "@/types/auth";

export async function registerOAuth(provider:OAuthType) {
    return supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}/profile`,
    },
  });
}