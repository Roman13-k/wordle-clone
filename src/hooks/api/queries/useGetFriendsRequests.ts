import { useInfiniteQuery } from "@tanstack/react-query";
import { getFriendsRequest } from "@/client/friends/getFriendsRequest";
import { friendKeys } from "../keys";

export const useGetFriendsRequests = () => {
  return useInfiniteQuery({
    queryKey: friendKeys.requests(),
    queryFn: ({ pageParam }) => getFriendsRequest(pageParam),
    initialPageParam: 0,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length;
    },

    staleTime: 5 * 60 * 1000,
  });
};
