import { postGameResult } from "@/client/words/postGameResult";
import { PostGameResultParams } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostGameResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload:PostGameResultParams) => postGameResult(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};