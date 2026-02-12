import { postGameResult } from "@/client/words/postGameResult";
import { PostGameResultParams } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../keys";

export const usePostGameResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PostGameResultParams) => postGameResult(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.me() });
    },
  });
};
