import { supabase } from "@/lib/supabaseClient";

export async function deleteFriendRelation(userId: string, friendId: string) {
  const { error } = await supabase
    .from("user_friends")
    .delete()
    .or(
      `and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`,
    );

  if (error) throw error;
}
