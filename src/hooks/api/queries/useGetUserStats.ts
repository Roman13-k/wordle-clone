import { getUserStats } from "@/client/user/getUserStats";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../keys";

export const useGetUserStats = (user_id?: string) => {
  return useQuery({
    queryKey: userKeys.stats(user_id),
    queryFn: () => getUserStats(user_id),
    staleTime: 5 * 60 * 1000,
    enabled: !!user_id,
  });
};
