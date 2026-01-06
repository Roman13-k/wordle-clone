import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function pickRandomWord() {
  const { data, error } = await supabase.rpc("get_random_word");

  if (error || !data || data.length === 0)
    throw new Error(error?.message || "No words found");

  return data[0].id;
}

async function insertDailyWord(wordId: string) {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const { error } = await supabase.from("daily_words").upsert({
    word_id: wordId,
    date: today,
  });

  if (error) throw new Error(error.message);

  return { word_id: wordId, date: today };
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

    const id = await pickRandomWord();
    const result = await insertDailyWord(id);

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
