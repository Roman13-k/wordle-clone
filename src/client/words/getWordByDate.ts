import { AlreadyPlayedI, DailyWordI } from "@/interfaces/game";
import { supabase } from "@/lib/supabaseClient";

type WordSBType = {
  id: string;
  date: string;
  en_words: {
    word: string;
  };
};

export async function getWordByDate(
  date: Date,
  user_id?: string
): Promise<DailyWordI | AlreadyPlayedI> {
  const isoDate = date.toISOString().split("T")[0];

  if (user_id) {
    const { data: userGame, error: userError } = await supabase
      .from("user_games")
      .select("id, is_win")
      .eq("user_id", user_id)
      .eq("game_date", isoDate)
      .maybeSingle();

    if (userError) throw userError;

    if (userGame) {
      return {
        alreadyPlayed: true,
        is_win: userGame.is_win,
        game_date: isoDate,
      };
    }
  }

  const { data, error } = await supabase
    .from("daily_words")
    .select(
      `
            id,
            date,
             en_words (
             word
    )
            `
    )
    .eq("date", isoDate)
    .single<WordSBType>();

  if (error) {
    throw error;
  }

  return { id: data.id, date: data.date, word: data.en_words.word };
}
