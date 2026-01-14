import { UserI } from "@/interfaces/user";
import { supabase } from "@/lib/supabaseClient";

export async function getUser() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) return null;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<UserI>();

  if (profileError) throw profileError;

  return profile;
}
