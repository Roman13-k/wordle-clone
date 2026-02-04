import { getUserPlaysByRange } from "@/client/user/getUserPlaysByRange";
import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../keys";

export const useGetUserGamesByRange = (
  startOfRange: string,
  endOfRange: string,
  user_id?: string,
) => {
  return useQuery({
    queryKey: userKeys.gamesByRange(user_id, startOfRange, endOfRange),
    queryFn: () => getUserPlaysByRange(startOfRange, endOfRange, user_id),
    staleTime: 5 * 60 * 1000,
    enabled: !!user_id,
  });
};
