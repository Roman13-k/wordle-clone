import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFriendStatus } from "@/client/friends/updateFriendStatus";
import { FriendRequestStatus } from "@/types/user";
import { friendKeys } from "../keys";

export const useUpdateFriendStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    {
      userId: string;
      friendId: string;
      status: FriendRequestStatus;
    }
  >({
    mutationFn: ({ userId, friendId, status }) =>
      updateFriendStatus(userId, friendId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: friendKeys.requests() });
    },
  });
};
