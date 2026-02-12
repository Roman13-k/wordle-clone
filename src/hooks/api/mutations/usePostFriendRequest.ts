import { sendFriendRequest } from "@/client/friends/sendFriendRequest";
import { useMutation } from "@tanstack/react-query";

export const useSendFriendRequest = () => {
  return useMutation({
    mutationFn: (friendId: string) => sendFriendRequest(friendId),
  });
};
