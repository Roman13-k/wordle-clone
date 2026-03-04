import { CustomWordI } from "@/interfaces/game";
import { supabase } from "@/lib/supabaseClient";

export async function createWord(
  params: Pick<
    CustomWordI,
    "creator_id" | "word" | "max_tries" | "access" | "difficulty"
  >,
): Promise<CustomWordI> {
  const { data, error } = await supabase
    .from("user_plays")
    .insert(params)
    .select()
    .single();

  if (error) {
    throw new Error("Failed to create word");
  }

  return data;
}
