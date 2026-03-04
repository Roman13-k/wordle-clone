import { CustomWordI } from "@/interfaces/game";
import { supabase } from "@/lib/supabaseClient";

export async function getUserWords(id?: string): Promise<CustomWordI[]> {
  if (!id) return [];

  const { data, error } = await supabase
    .from("user_plays")
    .select("*")
    .eq("creator_id", id);

  if (error) {
    throw new Error("Failed to fetch user words");
  }

  return data;
}
