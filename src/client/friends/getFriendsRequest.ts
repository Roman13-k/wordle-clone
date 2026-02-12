import { FriendRaw } from "@/interfaces/user";
import { supabase } from "@/lib/supabaseClient";

const PAGE_SIZE = 10;

export async function getFriendsRequest(
  pageParam: number,
): Promise<FriendRaw[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not authenticated");

  const from = pageParam * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, error } = await supabase
    .from("user_friends")
    .select<string, FriendRaw>(
      `
      id,
      user_id,
      friend_id,
      status,
      created_at,
      user:profiles!user_friends_user_id_fkey (
        id,
        name,
        cover
      ),
      friend:profiles!user_friends_friend_id_fkey (
        id,
        name,
        cover
      )
    `,
    )
    .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
}
