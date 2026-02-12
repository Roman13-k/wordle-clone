import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../keys";
import { searchUsers } from "@/client/user/searchUsers";

export const useSearchUsers = (query: string) => {
  return useQuery({
    queryKey: userKeys.search(query),
    queryFn: () => searchUsers(query),
    enabled: query.trim().length > 0,
    staleTime: 5 * 60 * 1000,
  });
};
