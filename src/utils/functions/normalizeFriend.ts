import { FriendNormalized, FriendRaw } from "@/interfaces/user";

export const normalizeFriend = (
  item: FriendRaw,
  currentUserId?: string,
): FriendNormalized => {
  if (!currentUserId) return {} as FriendNormalized;
  const isUserRequester = item.user_id === currentUserId;

  const otherPerson = isUserRequester ? item.friend : item.user;

  return {
    id: item.id,
    user_id: isUserRequester ? item.user_id : item.friend_id,
    friend_id: isUserRequester ? item.friend_id : item.user_id,
    status: item.status,
    created_at: item.created_at,
    name: otherPerson.name,
    cover: otherPerson?.cover,
  };
};
