import { supabase } from "@/lib/supabaseClient";

export async function sendFriendRequest(friend_id: string): Promise<void> {
  const { error } = await supabase.rpc("send_friend_request", {
    target_user: friend_id,
  });

  if (error) throw error;
}
