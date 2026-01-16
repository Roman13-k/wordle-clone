import { getUserPlaysByRange } from "@/client/user/getUserPlaysByRange";
import { useQuery } from "@tanstack/react-query";

export const useGetUserGamesByRange = (
  startOfRange: string,
  endOfRange: string,
  user_id?: string
) => {
  return useQuery({
    queryKey: ["user-games-range"],
    queryFn: () => getUserPlaysByRange(startOfRange, endOfRange, user_id),
    staleTime: 5 * 60 * 1000,
    enabled: !!user_id,
  });
};
