import { UserStatisticsI } from "@/interfaces/user";
import { supabase } from "@/lib/supabaseClient";

export async function getUserStats(user_id?: string): Promise<UserStatisticsI> {
  const { data, error } = await supabase
    .rpc("get_user_stats", {
      p_user_id: user_id,
    })
    .single<UserStatisticsI>();

  if (error) throw error;

  return data;
}
