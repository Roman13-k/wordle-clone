import { DailyWordI } from "@/interfaces/game";
import { supabase } from "@/lib/supabaseClient";

type WordSBType={
    id: string;
    date: string;
    en_words: {
        word: string;
    };
}

export async function getWordByDate(date: Date):Promise<DailyWordI> {
  const isoDate = date.toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("daily_words")
    .select(`
            id,
            date,
             en_words (
             word
    )
            `)
    .eq("date", isoDate)
    .single<WordSBType>()

  if (error) {
    throw error;
  }

  return {id:data.id,date:data.date,word:data.en_words.word};
}