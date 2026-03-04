import { createWord } from "@/client/words/createWord";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userKeys } from "../keys";
import { CustomWordI } from "@/interfaces/game";

export const useCreateWord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      params: Pick<
        CustomWordI,
        "creator_id" | "word" | "max_tries" | "access" | "difficulty"
      >,
    ) => createWord(params),
    onMutate: (variables) => {
      queryClient.cancelQueries({ queryKey: userKeys.userWords() });
      const previousWords = queryClient.getQueryData<CustomWordI[]>(
        userKeys.userWords(),
      );
      queryClient.setQueryData(
        userKeys.userWords(),
        (old: CustomWordI[] = []) => [variables, ...old, ,],
      );
      return { previousWords };
    },
    onSuccess: (data, _, context) => {
      queryClient.setQueryData(userKeys.userWords(), [
        data,
        ...(context?.previousWords || []),
      ]);
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        userKeys.userWords(),
        context?.previousWords || [],
      );
    },
  });
};
