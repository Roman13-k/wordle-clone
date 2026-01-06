import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function pickRandomWord() {
  const { data, error } = await supabase
    .from("en_Words")
    .select("word")
    .order("RANDOM()")
    .limit(1)
    .single();

  if (error || !data) throw new Error(error?.message || "No words found");

  return data.word;
}

async function insertDailyWord(word: string) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const { error } = await supabase.from("daily_words").upsert({
    word,
    date: today,
  });

  if (error) throw new Error(error.message);

  return { word, date: today };
}

Deno.serve(async () => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const { data: existing, error: fetchError } = await supabase
      .from("daily_words")
      .select("*")
      .eq("date", today)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") throw fetchError;

    if (existing) {
      return new Response(JSON.stringify(existing), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const word = await pickRandomWord();
    const result = await insertDailyWord(word);

    return new Response(JSON.stringify(result), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
