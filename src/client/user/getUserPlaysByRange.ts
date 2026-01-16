import { AlreadyPlayedI } from "@/interfaces/game";
import { supabase } from "@/lib/supabaseClient";

export async function getUserPlaysByRange(
  startOfRange: string,
  endOfRange: string,
  user_id?: string
): Promise<Omit<AlreadyPlayedI, "alreadyPlayed">[]> {
  const { data, error } = await supabase
    .from("user_games")
    .select("is_win, game_date")
    .eq("user_id", user_id)
    .gte("game_date", startOfRange)
    .lte("game_date", endOfRange);

  if (error) throw error;

  return data;
}
