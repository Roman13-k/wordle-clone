import { supabase } from "@/lib/supabaseClient";
import { OAuthType } from "@/types/auth";

export async function registerOAuth(provider: OAuthType) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}/profile`,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;

  return data.url;
}
