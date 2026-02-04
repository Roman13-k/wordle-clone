import { supabase } from "@/lib/supabaseClient";
import { LetterState } from "@/types/game";

export async function getGuessStates(
  guess: string,
  date: string,
): Promise<LetterState[]> {
  const { data, error } = await supabase.rpc("check_guess_by_date", {
    p_guess: guess,
    p_date: date,
  });

  if (error) throw error;

  return data;
}
