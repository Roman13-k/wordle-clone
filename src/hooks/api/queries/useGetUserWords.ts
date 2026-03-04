import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../keys";
import { getUserWords } from "@/client/words/getUserWords";

export const useGetUserWords = (id?: string) => {
  return useQuery({
    queryKey: userKeys.userWords(id),
    queryFn: () => getUserWords(id),
    enabled: !!id,
  });
};
