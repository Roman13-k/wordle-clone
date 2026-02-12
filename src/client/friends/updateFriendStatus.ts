import { supabase } from "@/lib/supabaseClient";
import { FriendRequestStatus } from "@/types/user";

export async function updateFriendStatus(
  userId: string,
  friendId: string,
  status: FriendRequestStatus,
): Promise<void> {
  const filter = `and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`;

  const { error } = await supabase
    .from("user_friends")
    .update({ status })
    .or(filter);

  if (error) throw error;
}
