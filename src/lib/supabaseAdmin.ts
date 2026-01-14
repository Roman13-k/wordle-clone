import { publicEnv, serverEnv } from "@/utils/env";
import { createClient } from "@supabase/supabase-js";

const {SUPABASE_SERVICE_ROLE_KEY}=serverEnv;
const {SUPABASE_URL}=publicEnv;

export const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);