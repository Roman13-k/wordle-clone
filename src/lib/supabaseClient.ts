import { publicEnv } from "@/utils/env";
import { createClient } from "@supabase/supabase-js";

const {SUPABASE_ANON_KEY,SUPABASE_URL}=publicEnv;

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
