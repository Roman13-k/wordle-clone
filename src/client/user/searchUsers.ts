import { UserI } from "@/interfaces/user";
import { supabase } from "@/lib/supabaseClient";
import { isUUID } from "@/utils/functions/isUUID";

export async function searchUsers(query: string): Promise<UserI[]> {
  if (!query) return [];

  let filter: string;

  if (isUUID(query)) {
    filter = `id.eq.${query}`;
  } else {
    filter = `name.ilike.%${query}%`;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .or(filter)
    .limit(10);

  if (error) throw error;
  return data ?? [];
}
