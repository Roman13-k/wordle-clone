import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const dateStr = yesterday.toISOString().slice(0, 10);

  const { error } = await supabase
    .from("profiles")
    .update({ current_streak: 0 })
    .lt("last_played_date", dateStr);

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return new Response("Streaks updated", { status: 200 });
});
