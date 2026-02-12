import { deleteFriendRelation } from "@/client/friends/deleteFriendRelation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../keys";

type DeleteFriendArgs = {
  userId: string;
  friendId: string;
};

export function useDeleteFriendRelation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, friendId }: DeleteFriendArgs) =>
      deleteFriendRelation(userId, friendId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.profile(variables.friendId),
      });

      queryClient.invalidateQueries({
        queryKey: userKeys.me(),
      });
    },
  });
}
