import { supabase } from "@/lib/supabaseClient";
import { PostGameResultParams } from "@/types/user";

export async function postGameResult({
  user_id,
  game_id,
  is_win,
  game_date,
}: PostGameResultParams) {
  const { data, error } = await supabase
    .from("user_games")
    .insert({
      user_id,
      game_id,
      is_win,
      game_date,
    });

  if (error) throw error;
  return data;
}
